import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
keys=["pro","guest","banq"]+[f"pre{i}" for i in range(12)]+[f"post{i}" for i in range(12)]
SIM="""
(args)=>{const [mode,li,react]=args;const T=window.__T;T.startGame(mode,li);const g=T.G,d=T.dims(),S=document.getElementById('c').clientWidth/d.VW,r=document.getElementById('c').getBoundingClientRect();
 const bossE=g.E.find(e=>e.t==='boss');g.scroll=bossE.x-d.fishSX-300;g.inv=3;T.press();T.release();let fr=0,minGap=999,seen=0,HE=['wall','net','door','fog'];
 while(T.state==='play'&&fr<60*240){const B=g.boss,mid=(d.yMin+d.yMax)/2;let ty=mid,best=1e9;
   for(const e of g.E){if(e.gone)continue;const sx=e.x-g.scroll-d.fishSX;if((e.t==='pearl'||e.t==='torb')&&sx>-10&&sx<260&&sx<best){best=sx;ty=T.entY(e,g.t)}}
   if(B&&!B.done&&B.k==='pipe')ty=B.by;
   for(const e of g.E){if(e.gone||e.t!=='jelly')continue;const sx=e.x-g.scroll-d.fishSX;if(sx>-40&&sx<140){const jy=T.entY(e,g.t);if(Math.abs(ty-jy)<80&&!(B&&B.k==='pipe'))ty=jy+(jy>mid?-110:110)}}
   if(g.fish.y>ty)T.press();else T.release();
   if(B&&!B.done&&B.k==='team'&&B.obs&&B.obs[0]&&B.obs[0].x<d.VW*(1.15-react*.5)){seen+=1/60;if(seen>=.08){seen=0;const i=HE.indexOf(B.obs[0].ty),bx=d.VW*(.14+.24*i),by=Math.min(document.getElementById('c').clientHeight/S-48/S,d.yMax+56);window.__tap(r.left+bx*S,r.top+by*S)}}else seen=0;
   if(B&&B.k==='chase')minGap=Math.min(minGap,B.gap);
   T.update(1/60);fr++; if(B&&B.done&&T.state!=='play')break}
 const B=g.boss||{};return {mode,li:li+1,k:B.k,done:B.done,sec:Math.round(fr/60),tries:B.tries||0,state:T.state,life:g.life,minGap:Math.round(minGap),n:B.n,i:B.i,orbs:B.orbs}}
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        sv={"simple":{"st":[3]*12,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":0,"story":{k:1 for k in keys},"tools":{k:1 for k in ["lamp","chisel","scissors","knife","tongs","trap","lure","bottle"]},"banq":1}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        for li in (2,8,11):
            for mode,react in [('simple',.5),('simple',1.0),('hard',.5)]:
                print(await pg.evaluate(SIM,[mode,li,react]))
        print(errs)
        # screenshots with god mode
        await pg.evaluate("(()=>{const s=JSON.parse(localStorage.getItem('xiaoyu_kuaipao_v1'));s.dev=1;s.god=1;localStorage.setItem('xiaoyu_kuaipao_v1',JSON.stringify(s))})()");await pg.goto(u)
        for li,name,wait in [(2,'bc',7000),(8,'bp',6000),(11,'bt',7500)]:
            await pg.evaluate("i=>{const T=window.__T;T.startGame('simple',i);const g=T.G,d=T.dims();g.scroll=g.E.find(e=>e.t==='boss').x-d.fishSX-150;T.press();T.release()}",li)
            await pg.mouse.move(120,420)
            t=0
            while t<wait:
                await pg.mouse.down();await pg.wait_for_timeout(220);await pg.mouse.up();await pg.wait_for_timeout(260);t+=480
            await pg.screenshot(path=name+'.png')
        print(errs);await b.close()
asyncio.run(main())
