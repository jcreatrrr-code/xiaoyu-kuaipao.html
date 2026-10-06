import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v2.2.1：石焖宴上完 12 道就结束（地炉剩菜不再拖住）、店员单靠自己办不成、章鱼罐三步抓章鱼、熔岩海岸火山喷发
import asyncio, json, sys, re
from playwright.async_api import async_playwright
CJK=re.compile(r'[㐀-鿿]')
PLAY="""()=>{const K=window.__K,v=K.SV;if(!v||v.over)return 1;
 for(const s of v.seats)if(s)K.svStart(s.d,true);
 for(const s of v.st){if(!s.d)continue;if(s.ph==='work'||s.ph==='perfect'||s.ph==='burn'||(s.open&&v.seats.some(x=>x&&x.d===s.d)&&!v.shelf.some(p=>p.d===s.d)))K.svTapSt(s)}
 v.seats.forEach((s,i)=>{if(s&&v.shelf.some(p=>p.d===s.d))K.svServe(i)});K.svTick(.1);return 0}"""
IDLE="()=>{const K=window.__K,v=K.SV;if(!v||v.over)return 1;K.svTick(.1);return 0}"
async def feast(pg,staff,step):
    await pg.evaluate("s=>{const K=window.__K,S=K.SAVE;S.story.post1=S.story.post3=S.story.post17=S.story.pro2=1;S.rep=99999;S.staff={waiter:s,chef:s};S.wallet=9999;K.startServe(2)}",staff)
    for _ in range(1700):
        if await pg.evaluate(step):break
    return await pg.evaluate("()=>{const v=window.__K.SV;return {t:Math.round(v.t),served:v.served,lost:v.lost,staff:Object.keys(v.staff).join(',')}}")
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780});pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME);await pg.wait_for_timeout(400)
        r=await feast(pg,0,PLAY);print('feast by hand:',r)
        if r['served']!=12 or r['t']<20:ok=False;print('  !! feast should end soon after the 12th dish')
        await pg.goto(GAME);await pg.wait_for_timeout(300)
        r=await feast(pg,1,IDLE);print('feast staff only:',r)
        if r['served']>=9 or r['staff']!='waiter,chef':ok=False;print('  !! staff alone should not win the feast')
        # 章鱼罐
        await pg.add_init_script("(()=>{window.__cjk=new Set();const P=CanvasRenderingContext2D.prototype,o=P.fillText;P.fillText=function(s,...a){if(typeof s==='string'&&/[\\u3400-\\u9fff]/.test(s))window.__cjk.add(s);return o.call(this,s,...a)}})()")
        POT="""async ([lang,mode])=>{const T=window.__T,K=window.__K;K.SAVE.lang=lang;K.SAVE.tools.opot=1;T.startGame('simple',21);const g=T.G;g.started=true;g.inv=1e9;
              const e=g.E.find(e=>e.t==='node'&&e.k==='tako');g.scroll=e.x-T.dims().fishSX-60;T.update(1/60);
              const sx=e.x-g.scroll,y=T.entY(e,g.t),r=document.querySelector('canvas').getBoundingClientRect(),S=T.dims().S;window.__tap(r.left+sx*S,r.top+y*S);
              const c=()=>g.tcap?g.tcap.s:'none',log=[c()],sc0=g.scroll,fr=async n=>{for(let i=0;i<n;i++){T.update(1/60);await new Promise(r=>requestAnimationFrame(r))}};
              if(mode==='wrong0'){T.potgo(0);log.push(c())}
              else{T.potgo(2);log.push(c());
                if(mode==='rush'){await fr(10);T.potgo(-1);log.push(c())}
                else{for(let i=0;i<200&&g.tcap&&g.tcap.s!==2;i++)await fr(1);log.push(c());const frozen=Math.abs(g.scroll-sc0)<1;
                  if(mode==='slow'){for(let i=0;i<300&&g.tcap;i++)T.update(1/60);log.push(c())}else if(mode==='wrong2'){T.potgo(2);log.push(c())}else{T.potgo(0);log.push(c());log.push(frozen)}}}
              const ink=+(g.ink||0).toFixed(1);await fr(160);return {log,caught:g.caught.tako||0,gone:!!e.gone,ink,inkAfter:+(g.ink||0).toFixed(1)}}"""
        want={'ok':([0,1,2,'none',True],1,0),'wrong0':([0,'none'],0,2.5),'rush':([0,1,'none'],0,2.5),'slow':([0,1,2,'none'],0,2.5),'wrong2':([0,1,2,'none'],0,2.5)}
        for lang in ['zh','en']:
            for mode,(lg,ca,ink) in want.items():
                await pg.goto(GAME);await pg.wait_for_timeout(250)
                res=await pg.evaluate(POT,[lang,mode]);print(lang,mode,res)
                if res['log']!=lg or res['caught']!=ca or not res['gone'] or (ink and not(2.0<=res['ink']<=2.5)) or res['inkAfter']>0:ok=False;print('  !! octopus pot',mode,'wrong')
        bad=[s for s in await pg.evaluate("[...window.__cjk]") if s!='小鱼快跑']
        print('en canvas cjk:',bad[:5])
        # 熔岩海岸：火山喷发
        await pg.goto(GAME);await pg.wait_for_timeout(300)
        er=await pg.evaluate("""()=>{const T=window.__T;T.startGame('hard',20);const g=T.G;g.started=true;g.inv=1e9;let n=0,last=0;
          for(let i=0;i<60*20;i++){g.inv=1e9;g.fish.y=(T.dims().yMin+T.dims().yMax)/2;T.update(1/60);if(g.erF>.99&&last<.99)n++;last=g.erF||0}
          return {eruptions:n,er:g.E.filter(e=>e.er).length,lava:g.E.filter(e=>e.t==='lava').length}}""")
        print('lava coast 20s:',er)
        if not(er['eruptions']>=3 and er['er']>=6):ok=False;print('  !! volcano should erupt every few seconds')
        print('errors',errs)
        await b.close()
        if errs or bad or not ok:sys.exit(1)
asyncio.run(main())
