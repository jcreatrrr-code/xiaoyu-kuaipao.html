import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
BOT = """
async (args)=>{const [mode,li,secs]=args;const T=window.__T;T.startGame(mode,li);let fr=0,rest=0,lastScroll=0,log=[];
 while(T.state==='play'||T.state==='dying'){const g=T.G,d=T.dims();if(!g)break;
  if(g.scroll<lastScroll-50){rest++;log.push(Math.floor(lastScroll/60))}lastScroll=g.scroll;
  let ty=null,best=1e9,fb=1e9,fyy=null;
  const walls=g.E.filter(e=>e.t==='wall'&&!e.broken);
  for(const e of g.E){if(e.gone)continue;const sx=e.x-g.scroll-d.fishSX;if(sx<-10||sx>420)continue;
    if(e.t==='friend'&&sx<fb){fb=sx;fyy=T.entY(e,g.t)}
    if(e.t!=='pearl'||sx>240)continue;
    if(!g.shield&&walls.some(w=>e.x>w.x&&e.x<w.x+260&&((w.top&&e.f<.62)||(!w.top&&e.f>.38))))continue;
    if(sx<best){best=sx;ty=T.entY(e,g.t)}}
  if(fyy!==null)ty=fyy; if(ty===null)ty=(d.yMin+d.yMax)/2;
  for(const e of g.E){if(e.t==='btn'&&!e.on){const sx=e.x-g.scroll-d.fishSX;if(sx>-40&&sx<420){ty=T.entY(e,g.t)+(e.f<.5?6:-6);break}}}
  for(const w of walls){const sx=w.x-g.scroll-d.fishSX;if(sx>-40&&sx<200&&!g.shield)ty=w.top?d.yMax-60:d.yMin+60}
  for(const e of g.E){if(e.gone)continue;const sx=e.x+(e.dx||0)-g.scroll-d.fishSX;
    if(e.t==='mimic'&&sx>-60&&sx<170){const my=T.entY(e,g.t);if(Math.abs(ty-my)<95)ty=my+(my>(d.yMin+d.yMax)/2?-115:115)}
    if(e.t==='beam'&&sx>-50&&sx<150){const by=d.yMin+(.5+.3*Math.sin(g.t*e.sp+e.ph))*(d.yMax-d.yMin),hh=(d.yMax-d.yMin)*.16;if(Math.abs(ty-by)<hh+30)ty=by>(d.yMin+d.yMax)/2?by-hh-55:by+hh+55}}
  for(const s of g.sharks){ty=s.y>(d.yMin+d.yMax)/2?d.yMin+40:d.yMax-40}
  if(g.trap){if(fr%6==0)T.press();}else{ if(g.fish.y>ty)T.press();else T.release(); }
  T.update(1/60);fr++; if(fr>60*secs)break;}
 const g=T.G;return {mode,li,state:T.state,cause:g.cause,m:Math.floor(g.scroll/60),pearls:g.pearls,life:g.life,resc:g.rescued,rest,log:log.slice(0,6)}}
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':390,'height':780})
        await pg.goto(GAME)
        for vp in [(390,780),(844,390)]:
            await pg.set_viewport_size({'width':vp[0],'height':vp[1]})
            for mode in ['simple','hard']:
                for li in [2,3,4]:
                    print(vp,json.dumps(await pg.evaluate(BOT,[mode,li,200]),ensure_ascii=False))
        await b.close()
asyncio.run(main())
