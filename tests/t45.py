import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
ST={k:1 for k in ["pro","pre0","pre1","post0","post1"]}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        sv={"simple":{"st":[3,3,0,0,0,0,0,0,0,0,0,0],"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":100,"story":ST,"rep":100,"fish":{"sard":6,"bream":2}}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        await pg.click('#bKit');await pg.click('[data-kt=menu]');await pg.screenshot(path='m1.png')
        print('old links left:',await pg.locator('.rcpb').count(),'rows:',await pg.locator('#kitList .it.tap').count())
        await pg.locator('#kitList .it.tap b').nth(1).click();await pg.wait_for_timeout(100);await pg.screenshot(path='m2.png');print('open panels:',await pg.locator('.card.rcp').count())
        w0=await pg.evaluate("JSON.parse(localStorage.getItem('xiaoyu_kuaipao_v1')).wallet");await pg.locator('[data-cook]:not([disabled])').first.click();await pg.wait_for_timeout(100)
        print('takeaway still works:',await pg.evaluate("JSON.parse(localStorage.getItem('xiaoyu_kuaipao_v1')).wallet")>w0,errs)
        await b.close()
asyncio.run(main())
