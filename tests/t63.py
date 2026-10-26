import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v3.1.0 第三卷第 5–12 章：八关、海女哨和雾钟首领战、发酵坛、百日汤宴、第三卷困难模式、英文界面不露中文
import asyncio, json, sys, re
from playwright.async_api import async_playwright
CJK=re.compile(r'[㐀-鿿]')
N=36
keys=["pro","pro2","pro3","guest","banq","feast3","v3end"]+[f"pre{i}" for i in range(N)]+[f"post{i}" for i in range(N)]
def save(n,lang='zh',story=True,extra=None):
    s={"simple":{"st":[3]*n+[0]*(N-n),"s4":[0]*N},"hard":{"st":[0]*N,"s4":[0]*N},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":3000,"lang":lang,
       "story":{k:1 for k in keys} if story else {},"rep":3000,"dev":1,"tools":{"scoop":1,"hook":1,"lpot":1,"rod":1,"chook":1}}
    s.update(extra or {});return s
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780},has_touch=True);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME)
        await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(36)));await pg.goto(GAME);await pg.wait_for_timeout(300)
        # 八关各跑一会儿，简单和困难都跑
        for mode in ['simple','hard']:
            for li in range(28,36):
                r=await pg.evaluate("""async([m,li])=>{const T=window.__T;window.__K.SAVE.god=1;T.startGame(m,li);const g=T.G;g.started=true;const d=T.dims();
                  const b=g.E.find(e=>e.t==='boss');if(b)g.scroll=b.x-d.fishSX-300;let trapped=0,above=0,spray=0,ship=0,kinds=new Set();
                  for(let i=0;i<900;i++){T.update(1/60);if(g.trap&&g.trap.e&&g.trap.e.t==='whirl')trapped=1;if(g.spP)spray=1;if(g.trail&&g.trail.length)ship=1;
                    for(const e of g.E)kinds.add(e.t);if(T.state!=='play')break}
                  return {theme:g.theme,state:T.state,trapped,spray,ship,boss:g.boss&&g.boss.k,kinds:[...kinds].filter(k=>['whirl','sbell','chain','node'].includes(k))}}""",[mode,li])
                print(mode,li,r)
                if r['theme']!=li:ok=False;print('  !! wrong theme')
        # 海女哨：每次都点对 → 赢；一直点错 → 心掉光
        for mode in ['simple','hard']:
            for right in [True,False]:
                r=await pg.evaluate("""async([m,right])=>{const T=window.__T,S=window.__K.SAVE,V=T.v3b;S.god=0;S.dev=1;T.startGame(m,31);const g=T.G;g.started=true;
                  const b=g.E.find(e=>e.t==='boss');g.scroll=b.x-T.dims().fishSX-5;let fake=0;
                  for(let i=0;i<60*240;i++){T.update(1/60);const B=g.boss;if(T.state!=='play'||B&&(B.done||B.tries))break;
                    if(B&&B.k==='whistle'&&B.t>=0&&B.cur&&B.dz<=0&&i%20===0){if(B.cur.f>=0)fake=1;V.whistleTry(B,right?B.cur.d:(B.cur.d+2)%4)}}
                  const B=g.boss;return {state:T.state,k:B&&B.k,done:B&&B.done,n:B&&B.n,hp:B&&B.hp,tries:B&&B.tries||0,fake}}""",[mode,right])
                print('whistle',mode,'right' if right else 'wrong',r)
                if r['k']!='whistle':ok=False;print('  !! boss did not start')
                elif right and (not r['done'] or not r['fake']):ok=False;print('  !! could not win / no fake echo')
                elif not right and (r['done'] or not r['tries']):ok=False;print('  !! wrong taps did not end the try')
        # 雾钟：钟摆到正中时敲 → 赢；摆到边上时敲 → 心掉光
        for mode in ['simple','hard']:
            for right in [True,False]:
                r=await pg.evaluate("""async([m,right])=>{const T=window.__T,S=window.__K.SAVE,V=T.v3b;S.god=0;S.dev=1;T.startGame(m,35);const g=T.G;g.started=true;
                  const b=g.E.find(e=>e.t==='boss');g.scroll=b.x-T.dims().fishSX-5;let maxL=0;
                  for(let i=0;i<60*240;i++){T.update(1/60);const B=g.boss;if(T.state!=='play'||B&&(B.done||B.tries))break;
                    if(B&&B.k==='fogbell'&&B.t>=0&&B.dz<=0&&B.clr<=0&&B.bells){maxL=Math.max(maxL,B.ly);const k=B.bells.findIndex(q=>!q.rung);
                      if(k>=0){const a=Math.sin(B.bells[k].ph);if(right?Math.abs(a)<V.FB.win()*.8:Math.abs(a)>.8)V.fogbellTry(B,k)}}}
                  const B=g.boss;return {state:T.state,k:B&&B.k,done:B&&B.done,ly:maxL,hp:B&&B.hp,tries:B&&B.tries||0}}""",[mode,right])
                print('fogbell',mode,'right' if right else 'wrong',r)
                if r['k']!='fogbell':ok=False;print('  !! boss did not start')
                elif right and not r['done']:ok=False;print('  !! could not win')
                elif not right and (r['done'] or not r['tries']):ok=False;print('  !! wrong taps did not end the try')
        # 发酵坛：放进去 → 营业一次 → 取出 → 做菜卖价 ×1.5
        await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(36,extra={"fish":{"abalone":3}})));await pg.goto(GAME);await pg.wait_for_timeout(300)
        r=await pg.evaluate("""async()=>{const S=window.__K.SAVE;document.querySelector('#bKitchen,#bRest,[data-go=kitchen]')?.click();await new Promise(r=>setTimeout(r,200));
          const c=document.getElementById('jarCard');window.__T.v3b.jarRender();const shown=c&&!c.hidden;const btn=c.querySelector('[data-jin=abalone]');btn&&btn.click();
          const inJar=S.jar.filter(Boolean).length,left=S.fish.abalone;const ready0=!!c.querySelector('[data-jout]');S.svN=(S.svN||0)+1;window.__T.v3b.jarRender();
          c.querySelector('[data-jout]')?.click();return {shown,inJar,left,ready0,aged:S.aged.abalone,back:S.fish.abalone}}""")
        print('jar',r)
        if not(r['shown'] and r['inJar']==1 and r['left']==2 and not r['ready0'] and r['aged']==1 and r['back']==3):ok=False;print('  !! jar flow wrong')
        # 百日汤宴：十二位客人，最后一道是百日汤；上满九道算成功
        r=await pg.evaluate("""async()=>{const K=window.__K;K.startServe(3);const v=K.SV;const q=[...v.q];v.served=12;return {f3:v.f3,banq:v.banq,n:q.length,last:q[11],ids:q}}""")
        print('feast3',r)
        if not(r['f3']==1 and r['n']==12 and r['last']=='d98' and all(80<=int(x[1:])<=98 for x in r['ids'])):ok=False;print('  !! feast3 queue wrong')
        r=await pg.evaluate("""async()=>{const K=window.__K;const s=K.SAVE;await new Promise(r=>setTimeout(r,300));const v=K.SV;v.t=0;for(let i=0;i<3;i++)K.svTick(.1);await new Promise(r=>setTimeout(r,200));
          return {feast3:!!s.feast3,f12:!!s.stat.feast3_12,end:document.getElementById('svEnd')?.innerText||''}}""")
        print('feast3 end',r)
        if not(r['feast3'] and '百日汤宴' in r['end']):ok=False;print('  !! feast3 end wrong')
        # 第三卷困难模式：第三卷普通全通才开
        for n,want in [(35,False),(36,True)]:
            await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(n)));await pg.goto(GAME);await pg.wait_for_timeout(200)
            h=await pg.evaluate("window.__T.v3b.hard3Open()");print('cleared',n,'hard3Open',h)
            if h!=want:ok=False
        # 英文：第五到十二章的过场和关卡里不该露出中文
        await pg.add_init_script("(()=>{window.__cjk=new Set();const P=CanvasRenderingContext2D.prototype,o=P.fillText;P.fillText=function(s,...a){if(typeof s==='string'&&/[\\u3400-\\u9fff]/.test(s))window.__cjk.add(s);return o.call(this,s,...a)}})()")
        await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(36,'en',extra={"feast3":1,"fish":{"abalone":2}})));bad=[];lines=0
        for k in [f'pre{i}' for i in range(28,36)]+[f'post{i}' for i in range(28,36)]+['feast3','v3end']:
            await pg.goto(GAME);await pg.click('#bMore');await pg.click('#bStory');
            if not await pg.evaluate(f"!!document.querySelector('[data-gal={k}]')"):bad.append((k,'no gallery entry'));continue
            await pg.click(f'[data-gal={k}]');await pg.wait_for_timeout(250)
            for i in range(80):
                if not await pg.evaluate("!!document.querySelector('#sStory.on')"):break
                w,x=await pg.evaluate("[document.getElementById('stWho').textContent,document.getElementById('stText').textContent]")
                if CJK.search(w+x):bad.append((k,w+' '+x))
                lines+=1
                await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(40);await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(60)
        print('story lines read:',lines)
        await pg.goto(GAME);await pg.evaluate("window.__cjk.clear()")
        for li in range(28,36):
            await pg.evaluate("li=>{const T=window.__T;window.__K.SAVE.god=1;T.startGame('simple',li);const g=T.G;g.started=true;const b=g.E.find(e=>e.t==='boss');if(b)g.scroll=b.x-T.dims().fishSX-5}",li)
            await pg.wait_for_timeout(2500 if li in (31,35) else 1500)
            if li in (31,35):await pg.evaluate("()=>{const B=window.__T.G.boss;if(B)B.t=0}");await pg.wait_for_timeout(1500)
        await pg.goto(GAME);await pg.evaluate("()=>{window.__T.v3b.jarRender()}")
        jt=await pg.evaluate("document.getElementById('jarCard')?.innerText||''")
        if CJK.search(jt):bad.append(('jar',jt))
        await pg.click('#bBook');await pg.wait_for_timeout(100)
        prog=await pg.evaluate("document.getElementById('bookProg').textContent");print('book:',prog)
        if CJK.search(prog):bad.append(('book',prog))
        drawn=[s for s in await pg.evaluate("[...window.__cjk]")]
        print('canvas CJK:',drawn)
        if drawn or bad:ok=False
        for x in bad:print('  CJK left:',x)
        if errs:ok=False;print('errors',errs[:5])
        await b.close();print('OK' if ok else 'FAIL');sys.exit(0 if ok else 1)
if __name__=="__main__":asyncio.run(main())
