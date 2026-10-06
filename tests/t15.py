import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)+' '+str(getattr(e,'stack',''))[:600]))
        await pg.goto(GAME);await pg.wait_for_timeout(1200)
        print(errs[:2]);print(await pg.evaluate("[document.querySelector('.scr.on')?.id, typeof window.__T]"))
        await b.close()
        return errs
import sys
sys.exit(1 if asyncio.run(main()) else 0)
