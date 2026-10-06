import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# 第二卷第 1–4 章（潮位、跃出水面/浮网、根缝、风暴引航 Boss）的模拟通关
import asyncio, json, sys
from playwright.async_api import async_playwright
BOT = """
async (args)=>{const [mode,li,secs]=args;const T=window.__T,K=window.__K;K.SAVE.tools.scoop=1;K.SAVE.tools.hook=1;T.startGame(mode,li);let fr=0,lastScroll=0,rest=0,taps=0;
 const fy=f=>{const d=T.dims();return d.yMin+f*(d.yMax-d.yMin)};
 while(T.state==='play'||T.state==='dying'){const g=T.G,d=T.dims();if(!g)break;if(g.scroll<lastScroll-50)rest++;lastScroll=g.scroll;
  let ty=null,best=1e9;
  for(const e of g.E){if(e.gone)continue;const sx=e.x+(e.dx||0)-g.scroll-d.fishSX;if(sx<-10||sx>300)continue;
    if((e.t==='pearl'&&!e.air&&sx<240)||e.t==='node'){if(sx<best){best=sx;ty=T.entY(e,g.t)}}
    if(e.t==='node'&&Math.abs(sx)<90&&fr%8===0){T.tap(d.fishSX+sx,T.entY(e,g.t));taps++}}
  if(ty===null)ty=(d.yMin+d.yMax)/2;
  const roots=g.E.filter(e=>e.root&&!e.gone).map(e=>({e,sx:e.x-g.scroll-d.fishSX})).filter(o=>o.sx>-40&&o.sx<170).sort((a,b)=>a.sx-b.sx);
  if(roots.length>=2){const x0=roots[0].e.x,pair=roots.filter(o=>o.e.x===x0);if(pair.length===2){const tp=pair.find(o=>o.e.top).e,bt=pair.find(o=>!o.e.top).e;ty=(fy(tp.h)+fy(1-bt.h))/2}}
  for(const e of g.E){if(e.gone||e.t!=='fnet')continue;const sx=e.x+(e.dx||0)-g.scroll-d.fishSX;if(sx>-e.w/2-40&&sx<e.w/2+260&&!g.leap)ty=d.yMin}
  for(const e of g.E){if(e.gone||e.t!=='rock'||e.root)continue;const sx=e.x-g.scroll-d.fishSX;if(sx>-80&&sx<160){if(e.top)ty=Math.max(ty,fy(e.h)+50);else ty=Math.min(ty,fy(1-e.h)-50)}}
  for(const e of g.E){if(e.gone||(e.t!=='jelly'&&e.t!=='octo'))continue;const sx=e.x-g.scroll-d.fishSX;if(sx>-60&&sx<150){const ey=T.entY(e,g.t);if(Math.abs(ty-ey)<90)ty=ey+(ey>(d.yMin+d.yMax)/2?-100:100)}}
  if(g.L.tide){const fl=d.yMax-T.tideH(g.t+.6)*(d.yMax-d.yMin);ty=Math.min(ty,fl-55)}
  const B=g.boss;if(B&&B.k==='guide'&&!B.done){const z=fy(.46);ty=Math.min(ty,z-50);const cx=d.fishSX+150;
    const nx=B.reefs.find(r=>!r.ok&&!r.hit);if(B.t>0&&nx&&nx.x-cx<200&&nx.c!==T.gci(B)&&fr%10==0){const U=1/d.S,nc=(mode==='hard'||B.made>=3)?3:2,sp=58*U;T.tap(d.VW/2-(nc-1)*sp/2+nx.c*sp,d.yMax+28*U);taps++}}
  ty=Math.max(ty===d.yMin?d.yMin:d.yMin+40,Math.min(d.yMax-40,ty));
  if(g.trap){if(fr%6==0)T.press();}else{ if(g.fish.y>ty)T.press();else T.release(); }
  T.update(1/60);fr++; if(fr>60*secs)break;}
 const g=T.G;return {mode,li,state:T.state,cause:g.cause,stars:K.SAVE[mode].st[li],m:Math.floor(g.scroll/60),pearls:g.pearls,life:g.life,got:Object.keys(g.caught).filter(k=>['coco','flyfish','mudcrab'].includes(k)).map(k=>k+':'+g.caught[k]).join(','),rest,taps,leaps:g.leapN||0,boss:g.boss?{n:g.boss.n,hp:g.boss.hp,tries:g.boss.tries||0}:null}}
"""
async def main():
    bad=0
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME);await pg.wait_for_timeout(800)
        for vp in [(390,780),(844,390)]:
            await pg.set_viewport_size({'width':vp[0],'height':vp[1]})
            for li in [12,13,14,15]:
                r=await pg.evaluate(BOT,['simple',li,260]);print(vp,json.dumps(r,ensure_ascii=False))
                if not r['stars']:bad+=1
                await pg.evaluate("window.__K.SAVE.simple.st[%d]=0"%li)
        print('errors',errs[:3])
        await b.close()
    sys.exit(1 if errs else 0)
asyncio.run(main())
