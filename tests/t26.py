import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
keys=["pro","guest"]+[f"pre{i}" for i in range(9)]+[f"post{i}" for i in range(9)]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        sv={"simple":{"st":[3]*9+[0,0,0],"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":320,"dist":40,"combo":0},"mute":1,"music":0,"wallet":3000,"story":{k:1 for k in keys},"rep":400,"fish":{"sard":6,"bream":3,"yellow":2},"tools":{k:1 for k in ["lamp","chisel","scissors","knife","tongs","trap","lure"]},"staff":{"waiter":1,"chef":1},"inv":{"gold":2},"conch":1}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        on=lambda: pg.evaluate("document.querySelector('.scr.on')?.id||null")
        await pg.wait_for_timeout(300);await pg.screenshot(path='u_menu.png')
        await pg.click('#bMore');await pg.screenshot(path='u_more.png');print('more',await on());await pg.click('#bSet');print(await on());await pg.click('#sSet .float')
        await pg.click('#bSail');await pg.wait_for_timeout(100);await pg.screenshot(path='u_lv.png');print('sail',await on(),await pg.evaluate("[...document.querySelectorAll('#modeTabs .tab')].map(t=>t.className)"))
        await pg.click('[data-mode=hard]');await pg.wait_for_timeout(100);print('hard tab',await pg.evaluate("[...document.querySelectorAll('#modeTabs .tab.on')].map(t=>t.dataset.mode)"))
        await pg.click('[data-mode=endless]');await pg.wait_for_timeout(100);await pg.screenshot(path='u_end.png');print('endless panel',await pg.evaluate("[!document.getElementById('endPanel').hidden,document.getElementById('bestTxt').textContent]"))
        await pg.click('#bEndGo');await pg.wait_for_timeout(300);print('endless started',await pg.evaluate("[window.__T.state,window.__T.G.mode]"));await pg.click('#bPause');await pg.click('#bQuit')
        await pg.click('#bShop');await pg.wait_for_timeout(100);await pg.screenshot(path='u_shop1.png')
        await pg.click('[data-sel=whale]');await pg.click('[data-buy=whale]');print('bought',await pg.evaluate("JSON.parse(localStorage.getItem('xiaoyu_kuaipao_v1')).inv"))
        for t in ['help','tool','skin']:
            await pg.click(f'[data-stab={t}]');await pg.wait_for_timeout(80);await pg.screenshot(path=f'u_shop_{t}.png');print(t,await pg.evaluate("document.querySelectorAll('.gd').length"))
        await pg.click('[data-sel=s1]');await pg.click('[data-skin="1"]');print('skin',await pg.evaluate("JSON.parse(localStorage.getItem('xiaoyu_kuaipao_v1')).skin"))
        await pg.click('#sShop .float');await pg.click('#bKit');await pg.wait_for_timeout(100);await pg.screenshot(path='u_kit_open.png')
        for t in ['menu','team','bask']:
            await pg.click(f'[data-kt={t}]');await pg.wait_for_timeout(80);await pg.screenshot(path=f'u_kit_{t}.png')
        await pg.click('[data-kt=menu]');n=await pg.locator('[data-cook]:not([disabled])').count();print('takeaway buttons',n)
        await pg.click('[data-kt=open]');await pg.click('#bServe');await pg.wait_for_timeout(400);print('serve',await on(),await pg.evaluate("JSON.stringify(window.__K.SV.staff)"))
        await pg.locator('#svQuit').dispatch_event('pointerdown');await pg.locator('#svBack').dispatch_event('pointerdown');await pg.click('#sKit .float')
        # banquet without staff
        await pg.click('#bSail');await pg.click('[data-mode=simple]');await pg.click('[data-lv="9"]');await pg.wait_for_timeout(300)
        for i in range(8): await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(40)
        await pg.wait_for_timeout(300);print('banquet staff:',await pg.evaluate("JSON.stringify([window.__K.SV.banq,window.__K.SV.staff,document.getElementById('svStaff').hidden])"))
        # language check on menu
        await pg.goto(u);await pg.click('#bMore');await pg.click('#bSet');await pg.click('[data-lang=en]');await pg.click('#sSet .float');await pg.wait_for_timeout(100);print(await pg.evaluate("document.getElementById('sMenu').innerText.replace(/\\n/g,' | ')"));await pg.screenshot(path='u_menu_en.png')
        print(errs);await b.close()
asyncio.run(main())
