import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v2.5.1：伊瓦在几个落脚点之间飞来飞去；摸它有不同反应；摸太多会生气飞走；夜里打盹，摸了会醒；偶尔叼来贝壳
import asyncio, sys
from playwright.async_api import async_playwright
SHOTS=os.environ.get('XK_SHOTS')
SETUP="""()=>{const K=window.__K,S=K.SAVE;for(let i=0;i<16;i++)S.simple.st[i]=Math.max(S.simple.st[i],1);Object.assign(S.story,{pro:1,pro2:1,post0:1,pre12:1,post12:1,pre13:1,post13:1,pre14:1,post14:1,pre15:1,post15:1,fish0:1,fish2:1});S.wallet=500;S.dev=1;localStorage.setItem('xiaoyu_kuaipao_v1',JSON.stringify(S))}"""
STEP="(n)=>{for(let i=0;i<n;i++)window.__F.update(1/60)}"
async def tap_iwa(pg):
    pos=await pg.evaluate("()=>{const f=window.__F.FS;return f.iwaPos&&{x:f.iwaPos.x,y:f.iwaPos.y,ps:f.ps}}")
    if not pos:return None
    await pg.mouse.click((pos['x']+2)*pos['ps'],(pos['y']-4)*pos['ps']);return pos
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780});pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME);await pg.wait_for_timeout(400);await pg.evaluate(SETUP);await pg.goto(GAME);await pg.wait_for_timeout(400)
        await pg.click('#bFish');await pg.wait_for_timeout(700);await pg.evaluate("()=>{const f=window.__F.FS;f.noJunk=1;f.tod=.3}")
        # 落脚点：每个钓点都能飞到不同位置
        seen={}
        for sp in ['stern','lagoon','mangrove','reef']:
            await pg.evaluate(f"()=>window.__F.fsGo('{sp}')");pts=set()
            for j in range(6):
                await pg.evaluate(f"()=>{{const w=window.__F.fsIw();window.__F.fsIwSet('fly',1.6,{j}%4)}}");await pg.evaluate(STEP,120);await pg.wait_for_timeout(60)
                q=await pg.evaluate("()=>window.__F.FS.iwaPos");pts.add((q['x'],q['y']) if q else None)
                if SHOTS and j<4:await pg.screenshot(path=SHOTS+f'/伊瓦落脚-{sp}-{j}.png')
            seen[sp]=sorted([x for x in pts if x]);print(sp,'perches',seen[sp])
            if len(seen[sp])<3:ok=False;print('  !! expected ≥3 perches')
        await pg.evaluate("()=>window.__F.fsGo('stern')")
        # 自己会动：放着不管 60 秒，应该换过地方或做过动作
        ms=await pg.evaluate("()=>{const F=window.__F,w=F.fsIw(),s=new Set();for(let i=0;i<60*120;i++){F.update(1/60);s.add(w.m)}return [...s]}");print('idle modes',ms)
        if len(ms)<3:ok=False;print('  !! 伊瓦 should do things on its own')
        # 摸：真的点在它身上，看反应
        got=[]
        for i in range(14):
            await pg.evaluate("()=>{const F=window.__F,w=F.fsIw();w.m='sit';w.b=null;w.k=0;w.sulk=0;w.pets=[];w.nx=99;F.update(1/60)}");await pg.wait_for_timeout(80)
            if not await tap_iwa(pg):continue
            m=await pg.evaluate("()=>window.__F.fsIw().m");got.append(m)
            if SHOTS and m not in got[:-1]:
                await pg.evaluate(STEP,{'puff':40,'wings':30,'nuzzle':30,'lap':50,'gift':40}.get(m,10));await pg.wait_for_timeout(60);await pg.screenshot(path=SHOTS+f'/摸伊瓦-{m}.png')
        print('pet reactions',got)
        if len(set(got))<4:ok=False;print('  !! pet reactions should vary')
        # 摸太多会生气
        await pg.evaluate("()=>{const F=window.__F,w=F.fsIw();w.m='sit';w.b=null;w.sulk=0;w.pets=[];w.last='lap'}")
        ms=[]
        for i in range(5):
            await pg.evaluate("()=>{const F=window.__F,w=F.fsIw();if(w.m!=='grumpy'){w.m='sit';w.b=null};F.update(1/60)}");await pg.wait_for_timeout(80);await tap_iwa(pg);ms.append(await pg.evaluate("()=>window.__F.fsIw().m"))
        print('5 quick pets',ms);
        if ms[-1]!='grumpy':ok=False;print('  !! should get grumpy')
        if SHOTS:await pg.evaluate(STEP,20);await pg.screenshot(path=SHOTS+'/摸伊瓦-生气.png')
        await pg.wait_for_timeout(1000);await pg.evaluate(STEP,120)
        r=await pg.evaluate("()=>{const w=window.__F.fsIw();return {i:w.i,sulk:w.sulk>0,m:w.m}}");print('after sulk',r)
        if not r['sulk']:ok=False
        await tap_iwa(pg);t=await pg.evaluate("()=>document.getElementById('toast')?.textContent||''");print('pet while sulking ->',t)
        # 夜里打盹，摸了会醒
        await pg.evaluate("()=>{const F=window.__F,w=F.fsIw();w.sulk=0;F.FS.tod=.7;F.fsIwSet('nap',20);F.update(1/60)}")
        if SHOTS:await pg.wait_for_timeout(60);await pg.screenshot(path=SHOTS+'/伊瓦打盹.png')
        await tap_iwa(pg);m=await pg.evaluate("()=>window.__F.fsIw().m");print('tap napping ->',m)
        if m!='startle':ok=False
        # 贝壳礼物 +1 潮印
        t0=await pg.evaluate("()=>{const F=window.__F;F.FS.tod=.3;F.fsIwSet('gift',3.2,-1);return window.__K.SAVE.fsh.tide}")
        await pg.evaluate(STEP,200);t1=await pg.evaluate("()=>window.__K.SAVE.fsh.tide");print('gift tide',t0,'->',t1)
        if t1!=t0+1:ok=False
        if SHOTS:await pg.wait_for_timeout(60);await pg.screenshot(path=SHOTS+'/伊瓦送贝壳.png')
        print('errors',errs)
        if errs:ok=False
        await b.close();sys.exit(0 if ok else 1)
if __name__=="__main__":asyncio.run(main())
