import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v3.0.0 第三卷第 1–4 章：雾、退潮、敲钟、涌潮首领战都能玩，选关第三卷标签、英文界面不露中文
import asyncio, json, sys, re
from playwright.async_api import async_playwright
CJK=re.compile(r'[㐀-鿿]')
keys=["pro","pro2","pro3","guest","banq"]+[f"pre{i}" for i in range(28)]+[f"post{i}" for i in range(28)]
def save(n,lang='zh',story=True):
    return {"simple":{"st":[3]*n+[0]*(28-n),"s4":[0]*28},"hard":{"st":[0]*28,"s4":[0]*28},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":3000,"lang":lang,
            "story":{k:1 for k in keys} if story else {},"rep":3000,"tools":{"scoop":1,"hook":1,"lpot":1,"rod":1,"chook":1}}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780},has_touch=True);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME)
        # 选关：第二卷没打完时看不到第三卷标签，打完后能看到并能进
        for n,want in [(23,False),(24,True)]:
            await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(n)));await pg.goto(GAME);await pg.wait_for_timeout(300)
            await pg.click('#bSail');await pg.wait_for_timeout(300)
            vis=await pg.evaluate("!document.querySelector('[data-vol=\"3\"]').hidden");print('cleared',n,'vol3 tab shown',vis)
            if vis!=want:ok=False;print('  !! vol3 tab visibility wrong')
        await pg.click('[data-vol="3"]');await pg.wait_for_timeout(300)
        t=await pg.evaluate("document.querySelector('.scr.on')?.innerText||''");print('vol3 map has 雾湾:', '雾湾' in t)
        if '雾湾' not in t:ok=False
        # 四关各跑一会儿，简单和困难都跑
        for mode in ['simple','hard']:
            for li in [24,25,26,27]:
                r=await pg.evaluate("""async([m,li])=>{const T=window.__T;window.__K.SAVE.god=1;T.startGame(m,li);const g=T.G;g.started=true;
                  const b=g.E.find(e=>e.t==='boss');if(b)g.scroll=b.x-T.dims().fishSX-300;let lowest=1e9,lit=0,pinged=0,below=1;
                  for(let i=0;i<600;i++){if(i%40===0&&g.L.bell){T.v3.ring(g);pinged=1}T.update(1/60);
                    if(g.L.ebb){const ey=T.v3.ebbY(g);if(g.fish.y<ey-2)below=0;lowest=Math.min(lowest,ey)}
                    if(g.E.some(e=>e.lit>0))lit=1}
                  return {theme:g.theme,ents:g.E.length,ebbOk:below,ebbTop:lowest,pinged,lit,boss:!!g.boss,mus:!!window.__M&&true}}""",[mode,li])
                print(mode,li,r)
                if li==25 and not r['ebbOk']:ok=False;print('  !! fish above ebb water line')
                if li==26 and not r['lit']:ok=False;print('  !! bell did not light anything')
        # 涌潮首领战：每个岔口都选对 → 赢；全选错 → 心掉光
        for mode in ['simple','hard']:
            for right in [True,False]:
                r=await pg.evaluate("""async([m,right])=>{const T=window.__T,S=window.__K.SAVE;S.god=0;T.startGame(m,27);const g=T.G;g.started=true;
                  const b=g.E.find(e=>e.t==='boss');g.scroll=b.x-T.dims().fishSX-5;const d=T.dims(),mid=(d.yMin+d.yMax)/2;let maxF=0;
                  for(let i=0;i<60*90;i++){const B=g.boss;if(B&&B.k==='bore'){const f=B.fk.find(f=>!f.done);const up=f?(f.c===1)===right:true;g.fish.y=up?mid-80:mid+80;g.fish.vy=0;maxF=Math.max(maxF,B.made)}else{g.fish.y=mid;g.fish.vy=0}
                    T.update(1/60);if(T.state!=='play'||(g.boss&&g.boss.done)||(g.boss&&g.boss.tries))break}
                  const B=g.boss;return {state:T.state,k:B&&B.k,done:B&&B.done,n:B&&B.n,hp:B&&B.hp,tries:B&&B.tries||0,need:B&&B.need,made:maxF}}""",[mode,right])
                print('bore',mode,'right' if right else 'wrong',r)
                if right and not r['done']:ok=False;print('  !! could not win with all right picks')
                if not right and (r['done'] or not r['tries']):ok=False;print('  !! wrong picks did not end the try')
        # 英文：第三卷的过场和关卡里不该露出中文
        await pg.add_init_script("(()=>{window.__cjk=new Set();const P=CanvasRenderingContext2D.prototype,o=P.fillText;P.fillText=function(s,...a){if(typeof s==='string'&&/[\\u3400-\\u9fff]/.test(s))window.__cjk.add(s);return o.call(this,s,...a)}})()")
        await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(save(28,'en')));bad=[];lines=0
        for k in ['pro3']+[f'pre{i}' for i in range(24,28)]+[f'post{i}' for i in range(24,28)]:
            await pg.goto(GAME);await pg.click('#bMore');await pg.click('#bStory');await pg.click(f'[data-gal={k}]');await pg.wait_for_timeout(250)
            for i in range(60):
                if not await pg.evaluate("!!document.querySelector('#sStory.on')"):break
                w,x=await pg.evaluate("[document.getElementById('stWho').textContent,document.getElementById('stText').textContent]")
                if CJK.search(w+x):bad.append((k,w+' '+x))
                lines+=1
                await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(40);await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(60)
        print('story lines read:',lines)
        await pg.goto(GAME);await pg.evaluate("window.__cjk.clear()")
        for li in [24,25,26,27]:
            await pg.evaluate("li=>{const T=window.__T;window.__K.SAVE.god=1;T.startGame('simple',li);const g=T.G;g.started=true;const b=g.E.find(e=>e.t==='boss');if(b)g.scroll=b.x-T.dims().fishSX-300}",li)
            await pg.wait_for_timeout(2500)
        await pg.goto(GAME);await pg.click('#bBook');await pg.wait_for_timeout(100)
        prog=await pg.evaluate("document.getElementById('bookProg').textContent");print('book:',prog)
        if CJK.search(prog):bad.append(('book',prog))
        drawn=[s for s in await pg.evaluate("[...window.__cjk]")]
        print('canvas CJK:',drawn)
        if drawn or bad:ok=False
        for x in bad:print('  CJK left:',x)
        if errs:ok=False;print('errors',errs[:3])
        await b.close();print('OK' if ok else 'FAIL');sys.exit(0 if ok else 1)
asyncio.run(main())
