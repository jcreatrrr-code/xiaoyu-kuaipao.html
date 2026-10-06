import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        for name,st in [('first 5 cleared',[3]*5+[0]*7),('11 cleared',[3]*11+[0]),('all 12 cleared',[3]*12)]:
            sv={"simple":{"st":st,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":0,"story":{"pro":1,"guest":1}}
            await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
            await pg.click('#bSail');await pg.click('[data-mode=hard]');await pg.wait_for_timeout(150)
            print(name,'-> hard tab active:',await pg.evaluate("document.querySelector('#modeTabs .tab.on').dataset.mode"),'| toast:',await pg.evaluate("document.getElementById('toast').className.includes('on')?document.getElementById('toast').textContent:''"))
        print(errs);await b.close()
asyncio.run(main())
