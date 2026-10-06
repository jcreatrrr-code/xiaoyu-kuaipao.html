import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        keys=["pro","pre0","post0","pre1","post1","pre2","post2","pre3","post3","pre4","post4","guest","pre5","post5","pre6","post6","pre7"]
        sv={"simple":{"st":[3]*7+[0]*5,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":500,"story":{k:1 for k in keys},"rep":300,"fish":{"sard":6,"bream":3,"tuna":1,"salt":2,"grape":1},"dishes":{"d1":3,"d2":1,"d7":1},"dex":{"x_sard":1},"stat":{"nodmg":1}}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u);await pg.wait_for_timeout(200)
        await pg.click('#bBook');await pg.wait_for_timeout(200);await pg.screenshot(path='d_fish.png')
        print(await pg.evaluate("[document.getElementById('bookProg').textContent,[...document.querySelectorAll('#bookTabs .tab')].map(t=>t.textContent),document.querySelectorAll('#bookGrid .pcd').length]"))
        await pg.click('#bookGrid .pcd.unk');await pg.wait_for_timeout(60);print('unk detail:',await pg.evaluate("document.getElementById('bookInfo').innerText.replace(/\\n/g,' | ')"))
        for t in ['dish','who','sea','feat']:
            await pg.click(f'[data-bt={t}]');await pg.wait_for_timeout(120);await pg.screenshot(path=f'd_{t}.png');print(t,await pg.evaluate("[document.querySelectorAll('#bookGrid .pcd').length,document.querySelectorAll('#bookGrid .pcd.unk').length,document.querySelector('#bookInfo h3').textContent]"))
        await pg.click('[data-bt=fish]');await pg.click('[data-card=x_sard]');await pg.wait_for_timeout(80);await pg.screenshot(path='d_shiny.png')
        # shiny in level
        await pg.evaluate("(()=>{const T=window.__T;T.startGame('simple',0);const g=T.G,e=g.E.find(e=>e.t==='wild');e.shiny=true;g.scroll=e.x-300;g.inv=9})()")
        await pg.mouse.move(200,400);await pg.mouse.down();await pg.wait_for_timeout(400);await pg.mouse.up();await pg.wait_for_timeout(300);await pg.screenshot(path='d_lvshiny.png')
        print(errs);await b.close()
asyncio.run(main())
