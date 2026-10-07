import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v2.8.3：从海图返回主菜单后，海图必须真的消失，不能盖在主菜单、杂货铺等界面上面
import asyncio, sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        for vp in [{'width':390,'height':780},{'width':844,'height':390}]:
            pg=await b.new_page(viewport=vp,has_touch=True);pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(GAME);await pg.wait_for_timeout(400)
            await pg.evaluate("()=>{const S=window.__K.SAVE;for(const k of ['pro','pro2','post0'])S.story[k]=1;S.simple.st[0]=1;localStorage.setItem('xiaoyu_kuaipao_v1',JSON.stringify(S))}")
            await pg.reload();await pg.wait_for_timeout(500)
            for mode in ['simple','hard','endless']:
                await pg.click('#bSail');await pg.wait_for_timeout(400)
                await pg.click(f'#modeTabs .tab[data-mode="{mode}"]');await pg.wait_for_timeout(400)
                sel='#lvBack' if mode!='endless' else '#sLevels .float'
                bb=await pg.locator(sel).bounding_box();await pg.touchscreen.tap(bb['x']+bb['width']/2,bb['y']+bb['height']/2);await pg.wait_for_timeout(300)
                r=await pg.evaluate("""()=>{const L=document.getElementById('sLevels'),hit=[];for(const [x,y] of [[.5,.5],[.5,.2],[.5,.85]]){const e=document.elementFromPoint(innerWidth*x,innerHeight*y);hit.push(!!(e&&L.contains(e)))}
                  return {on:document.querySelector('.scr.on')?.id,shown:getComputedStyle(L).display!=='none',hit}}""")
                print(vp['width'],mode,r)
                if r['on']!='sMenu' or r['shown'] or any(r['hit']):ok=False;print('  !! map still covers the menu')
                await pg.click('#bShop');await pg.wait_for_timeout(300)
                if await pg.evaluate("document.querySelector('.scr.on')?.id")!='sShop':ok=False;print('  !! shop did not open')
                await pg.evaluate("document.querySelector('#sShop .float').click()");await pg.wait_for_timeout(200)
            await pg.close()
        if errs:ok=False;print('errors',errs[:3])
        await b.close();print('OK' if ok else 'FAIL');sys.exit(0 if ok else 1)
asyncio.run(main())
