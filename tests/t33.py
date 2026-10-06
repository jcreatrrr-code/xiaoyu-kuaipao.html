import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
keys=["pro","guest","banq"]+[f"pre{i}" for i in range(12)]+[f"post{i}" for i in range(12)]
CHK="""
()=>{const T=window.__T,out=[];
 for(const mode of ['simple','hard'])for(let li=0;li<12;li++){T.startGame(mode,li);const g=T.G,E=g.E,cps=E.filter(e=>e.t==='cp').map(e=>e.x).sort((a,b)=>a-b);
  const doors=E.filter(e=>e.t==='btn').map(b=>({b:b.x,d:b.d.x}));
  for(const c of cps){
    for(const p of doors)if(p.b<=c+260&&p.d>c)out.push([mode,li+1,'cp between button and door',Math.round(c/60),Math.round(p.b/60),Math.round(p.d/60)]);
    // hazards that restart you sitting right after a checkpoint (inside the 2s grace is fine; just report very close ones)
    for(const e of E){if((e.t==='wall'||e.t==='door')&&e.x>c&&e.x-c<140)out.push([mode,li+1,e.t+' right after cp',Math.round(c/60),Math.round(e.x/60)])}
  }
  // finish line vs gather nodes: any node placed after the finish?
  const fin=E.find(e=>e.t==='fin');for(const e of E)if((e.t==='node'||e.t==='friend'||e.t==='btn')&&fin&&e.x>fin.x-200)out.push([mode,li+1,e.t+' too close to finish',Math.round(e.x/60)]);
  // required count reachable?
  const L=g.L;if(L.goal.k==='gather'){const n=E.filter(e=>e.t==='node').length;if(n<L.goal.n[mode==='hard'?1:0])out.push([mode,li+1,'not enough nodes',n])}
  if(L.goal.k==='rescue'){const n=E.filter(e=>e.t==='friend').length;if(n<L.goal.n[mode==='hard'?1:0])out.push([mode,li+1,'not enough friends',n])}
  if(L.goal.k==='pearl'){const n=E.filter(e=>e.t==='pearl').length;if(n<L.extra[mode==='hard'?1:0])out.push([mode,li+1,'not enough pearls for star 2',n])}
 }
 return out}
"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        sv={"simple":{"st":[0]*12,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":0,"story":{k:1 for k in keys},"tools":{k:1 for k in ["lamp","chisel","scissors","knife","tongs","trap","lure","bottle"]},"banq":1}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        r=await pg.evaluate(CHK)
        for x in r: print(x)
        print('issues:',len(r),errs)
        await b.close()
asyncio.run(main())
