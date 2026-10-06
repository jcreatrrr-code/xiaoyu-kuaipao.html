import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
ST={"pro":1,"post1":1}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        for staff in [{"waiter":1,"chef":1},{"waiter":0,"chef":1}]:
            sv={"simple":{"st":[3,3,3,0,0,0],"s4":[0]*6},"hard":{"st":[0]*6,"s4":[0]*6},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":500,"story":ST,"rep":200,"fish":{"sard":8,"bream":5,"yellow":5,"salmon":4},"staff":staff}
            await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
            print(staff,await pg.evaluate("(()=>{const K=window.__K;K.startServe();const v=K.SV;let n=0;while(!v.over&&n<1200){K.svTick(.1);n++}return {served:v.served,lost:v.lost,earn:v.earn,tips:v.tips,wage:v.wage,shelf:v.shelf.length}})()"))
        await pg.goto(u);await pg.click('#bKit');await pg.click('#bServe');await pg.wait_for_timeout(9000);await pg.screenshot(path='auto.png')
        print(errs);await b.close()
asyncio.run(main())
