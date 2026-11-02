import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v3.1.1 选关地图上的提示不被顶部标签栏挡住；没解锁的海域有遮挡；长页面有“回到顶部”按钮
import asyncio, json, sys
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
from t63 import save
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        for vp,tag in [({'width':390,'height':780},'portrait'),({'width':844,'height':390},'landscape')]:
            pg=await b.new_page(viewport=vp,has_touch=True);pg.on('pageerror',lambda e:errs.append(str(e)))
            await pg.goto(GAME);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(26)));await pg.goto(GAME);await pg.wait_for_timeout(300)
            await pg.click('#bSail');await pg.wait_for_timeout(300);await pg.click('[data-vol="3"]');await pg.wait_for_timeout(800)
            veils=await pg.evaluate("document.querySelectorAll('#lvGrid .wmVeil').length");print(tag,'locked regions veiled:',veils)
            if veils<1:ok=False
            await pg.click('#lvHead [data-mode="hard"]');await pg.wait_for_timeout(500);await pg.click('[data-vol="3"]');await pg.wait_for_timeout(400)
            r=await pg.evaluate("(()=>{const t=document.getElementById('toast'),h=document.getElementById('lvHead').getBoundingClientRect(),r=t.getBoundingClientRect();return {on:t.className.includes('on'),top:Math.round(r.top),head:Math.round(h.bottom),z:+getComputedStyle(t).zIndex}})()")
            print(tag,'toast',r)
            if not(r['on'] and r['top']>=r['head']):ok=False;print('  !! toast under the header')
            await pg.goto(GAME);await pg.click('#bKit');await pg.wait_for_timeout(300)
            await pg.evaluate("document.querySelector('.scr.on').scrollTop=2000");await pg.wait_for_timeout(700)
            on=await pg.evaluate("document.getElementById('toTop').classList.contains('on')")
            if on:
                await pg.click('#toTop');await pg.wait_for_timeout(1200)
            top=await pg.evaluate("document.querySelector('.scr.on').scrollTop");off=await pg.evaluate("!document.getElementById('toTop').classList.contains('on')")
            print(tag,'back-to-top shown',on,'scrolled to',top,'hidden after',off)
            if not(on and top==0 and off):ok=False
            await pg.click('text=返回主菜单') if await pg.is_visible('text=返回主菜单') else None
            await pg.wait_for_timeout(700)
            if await pg.evaluate("document.getElementById('toTop').classList.contains('on')"):ok=False;print('  !! button left on menu')
            await pg.close()
        if errs:ok=False;print('errors',errs[:3])
        await b.close();print('OK' if ok else 'FAIL');sys.exit(0 if ok else 1)
if __name__=="__main__":asyncio.run(main())
