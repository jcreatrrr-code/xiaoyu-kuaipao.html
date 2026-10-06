import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
keys=["pro","guest","banq"]+[f"pre{i}" for i in range(12)]+[f"post{i}" for i in range(12)]
SIM="""
(args)=>{const [mode,skill]=args;const T=window.__T;T.startGame(mode,4);const g=T.G,d=T.dims(),S=document.getElementById('c').clientWidth/d.VW,r=document.getElementById('c').getBoundingClientRect();
 const bossE=g.E.find(e=>e.t==='boss');g.scroll=bossE.x-d.fishSX-300;g.inv=3;T.press();T.release();let fr=0,acc=0,retries=0,lastHun=0,log=[];
 while(T.state==='play'&&fr<60*200){const B=g.boss;
   // dodge: stay away from shark lane, else hover mid
   let ty=(d.yMin+d.yMax)/2;for(const s of g.sharks){if(s.ph===1||s.t>s.T*.6)ty=s.y>(d.yMin+d.yMax)/2?s.y-170:s.y+170;else ty=g.fish.y}
   for(const e of g.E){if(e.gone||e.t!=='jelly')continue;const sx=e.x-g.scroll-d.fishSX;if(sx>-40&&sx<150){const jy=T.entY(e,g.t);if(Math.abs(ty-jy)<95)ty=jy+(jy>(d.yMin+d.yMax)/2?-120:120)}}
   if(g.fish.y>ty)T.press();else T.release();
   acc+=1/60;if(B&&!B.done&&acc>=skill){acc=0;
     if(B.ph==='idle'&&B.carry>0&&B.t>0&&B.t%2.6<1.5){window.__tap(r.left+(d.VW-Math.min(170,d.VW*.3)-30)*S,r.top+B.by*S)}
     else if(B.carry<3){const e=g.E.find(e=>e.t==='wild'&&!e.gone&&(e.x+(e.dx||0)-g.scroll)>40&&(e.x+(e.dx||0)-g.scroll)<d.VW-200);if(e)window.__tap(r.left+(e.x+(e.dx||0)-g.scroll)*S,r.top+T.entY(e,g.t)*S)}}
   if(B&&B.hun<lastHun)retries++;if(B)lastHun=B.hun;
   T.update(1/60);fr++}
 return {mode,skill,state:T.state,cause:g.cause,sec:Math.round(fr/60),hun:g.boss&&g.boss.hun,done:g.boss&&g.boss.done,retries,life:g.life,m:Math.floor(g.scroll/60)}}
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        sv={"simple":{"st":[3]*4+[0]*8,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":0,"story":{k:1 for k in keys}}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        for mode,skill in [('simple',.5),('simple',1.2),('hard',.5),('hard',1.0)]:
            print(await pg.evaluate(SIM,[mode,skill]))
            await pg.evaluate("document.querySelector('#sStory.on')&&0")
        # no-input player in normal mode: should be retried, never a game over
        print('idle player:',await pg.evaluate("""()=>{const T=window.__T;T.startGame('simple',4);const g=T.G,d=T.dims();g.scroll=g.E.find(e=>e.t==='boss').x-d.fishSX-300;let fr=0;T.press();T.release();while(T.state==='play'&&fr<60*60){T.update(1/60);fr++}return [T.state,g.life,g.boss&&g.boss.hun]}"""))
        # screenshots (real time)
        await pg.evaluate("(()=>{const T=window.__T;T.startGame('simple',4);const g=T.G,d=T.dims();g.scroll=g.E.find(e=>e.t==='boss').x-d.fishSX-200})()")
        await pg.mouse.move(120,400);await pg.mouse.down();await pg.wait_for_timeout(300);await pg.mouse.up();await pg.wait_for_timeout(3800);await pg.screenshot(path='boss1.png')
        await pg.evaluate("window.__T.G.boss.carry=2");await pg.wait_for_timeout(200);await pg.screenshot(path='boss2.png')
        await pg.wait_for_timeout(2600);await pg.screenshot(path='boss3.png')
        print(errs);await b.close()
asyncio.run(main())
