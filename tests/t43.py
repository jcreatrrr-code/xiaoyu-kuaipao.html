import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
ST={k:1 for k in ["pro","pre0","pre1","pre2","pre3","post0","post1","post2","post3"]}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        for rep in (200,2000,12000):
            sv={"simple":{"st":[3,3,3,3,0,0,0,0,0,0,0,0],"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":3000,"story":ST,"rep":rep,"fish":{"sard":14,"bream":8,"puffer":2},"up":{"seat":2,"grill":0,"pot":0}}
            await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
            await pg.click('#bKit');print(rep,await pg.evaluate("document.getElementById('restCard').innerText.replace(/\\n/g,' | ')"))
            await pg.click('[data-kt=team]');print('  seat upgrade:',await pg.evaluate("[...document.querySelectorAll('#svPanel .it')].filter(e=>e.innerText.includes('桌子')).map(e=>e.innerText.replace(/\\n/g,' '))"))
            if rep==200: await pg.screenshot(path='lv1.png')
        await pg.click('[data-kt=menu]');n=await pg.locator('[data-rcp]').count();await pg.locator('[data-rcp=d1]').click();await pg.wait_for_timeout(100);await pg.screenshot(path='rc1.png')
        print('recipe buttons',n,'|',await pg.evaluate("document.querySelector('.card.rcp').innerText.replace(/\\n/g,' / ')"))
        # every dish has a recipe
        print('missing recipes:',await pg.evaluate("window.__K.DISH.filter(d=>!RCP[d.id]).map(d=>d.id)"),errs)
        await b.close()
asyncio.run(main())
