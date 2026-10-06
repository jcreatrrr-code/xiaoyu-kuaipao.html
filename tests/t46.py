import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
keys=["pro","guest","banq"]+[f"pre{i}" for i in range(12)]+[f"post{i}" for i in range(12)]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        async def load(sv):
            await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        base=lambda **k: dict({"simple":{"st":[3]*12,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":1000,"story":{k:1 for k in keys},"rep":700,"fish":{"sard":14,"bream":8,"yellow":6,"salmon":6,"puffer":3,"cod":3},"dishes":{f"d{i}":1 for i in range(1,52)}},**k)
        on=lambda: pg.evaluate("document.querySelector('.scr.on')?.id||null")
        # 1 endless payout + 8 end buttons
        await load(base());await pg.evaluate("(()=>{const T=window.__T;T.startGame('endless',0);const g=T.G;g.pearls=100;g.life=1;g.inv=0;T.press();T.release()})()")
        for i in range(80):
            if await on()=='sEnd': break
            await pg.wait_for_timeout(250)
        print('1) endless 100 pearls ->',await pg.evaluate("[...document.querySelectorAll('#endCard .stat')].map(e=>e.innerText.replace(/\\n/g,' ')).filter(t=>t.includes('钱包'))"),'| buttons:',await pg.evaluate("[...document.querySelectorAll('#endBtns button')].map(b=>b.textContent)"))
        # 4 stars: win a level with a fresh star
        sv=base();sv['simple']['st']=[2]+[0]*11;sv['story']={"pro":1,"pre0":1,"post0":1}
        await load(sv);await pg.evaluate("(()=>{const T=window.__T;T.startGame('simple',0);const g=T.G;g.pearls=99;g.inv=99;g.scroll=g.L.len*60-150;T.press()})()")
        for i in range(40):
            if await on()=='sEnd': break
            await pg.wait_for_timeout(250)
        print('4) win card:',(await pg.evaluate("document.getElementById('endCard').innerText.replace(/\\n/g,' | ')"))[-230:])
        print('   buttons:',await pg.evaluate("[...document.querySelectorAll('#endBtns button')].map(b=>b.textContent)"))
        await pg.click('[data-act=menu]');await pg.click('#bSail');print('   level header:',await pg.evaluate("document.getElementById('starInfo').textContent"));await pg.screenshot(path='x_lv.png')
        # 7 checkpoint respawn keeps checkpoint life
        await load(base());r=await pg.evaluate("""()=>{const T=window.__T;T.startGame('simple',0);const g=T.G,d=T.dims();T.press();T.release();g.life=2;const cp=g.E.find(e=>e.t==='cp');g.scroll=cp.x-d.fishSX-40;g.inv=3;for(let i=0;i<120;i++){g.fish.y=(d.yMin+d.yMax)/2;g.fish.vy=0;T.update(1/60)}
            const a=[g.cp>0,g.cpLife];g.inv=0;g.life=1;g.shield=false;g.whale=false;const m0=Math.floor(g.scroll/60);g.fish.y=d.yMax+50;T.update(1/60);for(let i=0;i<5;i++)T.update(1/60);
            return {passedCp:a[0],cpLife:a[1],stateAfterDeath:T.state,lifeAfter:g.life,meters:[m0,Math.floor(g.scroll/60)]}}""")
        print('7)',r)
        # 3 salt button, 5 staff, 6 banquet
        await load(base(staff={"waiter":1,"chef":1}));await pg.click('#bKit');await pg.click('[data-kt=team]');print('5) staff:',await pg.evaluate("[...document.querySelectorAll('#svPanel .it b')].slice(0,2).map(e=>e.textContent)"))
        await pg.click('[data-kt=open]');await pg.click('#bServe');await pg.wait_for_timeout(1500)
        print('3) salt button:',await pg.evaluate("[document.getElementById('svSalt').hidden,document.getElementById('svSalt').textContent]"),'| chips:',await pg.evaluate("document.getElementById('svStaff').innerText.replace(/\\n/g,' ')"));await pg.screenshot(path='x_sv.png')
        print('6) banquet:',await pg.evaluate("""()=>{const K=window.__K;K.SAVE.spd=1;K.startServe(1);const v=K.SV,tot=v.q.length,seats=v.seats.length,T=v.t;let n=0,moved=0;
            while(!v.over&&n<1400){K.svTick(.1);n++;if(v.over)break;
              if(n%3===0){for(const id of new Set(v.seats.filter(Boolean).map(s=>s.d))){if(K.svPending(id)>0&&v.st.some(x=>x.k===startKindT(id)&&!x.d)){K.svStart(id,1);break}}}
              for(const s of v.st){if(s.d&&(s.ph==='work'||s.ph==='perfect')){if(s.stg)moved++;K.svTapSt(s);break}}
              v.seats.forEach((s,i)=>{if(s&&v.shelf.some(p=>p.d===s.d))K.svServe(i)})}
            function startKindT(id){return ({d2:'cut',d23:'cut',d18:'asm',d46:'asm',d11:'asm',d15:'grill'})[id]||K.methodOf(id)}
            return {guests:tot,seats,time:T,served:v.served,stage2taps:moved,result:document.querySelector('#svEnd h3').textContent}}"""))
        # two-stage dish explicitly
        print('6b) two-step:',await pg.evaluate("""()=>{const K=window.__K;K.startServe();const v=K.SV;v.seats[0]={d:'d2',p:99,P:99,face:'x',name:'',o:null,look:v.seats[0]?v.seats[0].look:{},x:0};K.svStart('d2',1);const a=v.st.filter(s=>s.d).map(s=>s.k+':'+s.ph);
            const c=v.st.find(s=>s.d==='d2');for(let i=0;i<8;i++)K.svTapSt(c);const b=v.st.filter(s=>s.d).map(s=>s.k+':'+s.ph+':stg'+(s.stg||0));return {afterStart:a,afterChopping:b,shelf:v.shelf.length}}"""))
        # 10 NEW badge
        sv=base();sv['dexRead']={"sard":1};sv['dex']={"sard":3,"bream":2}
        await load(sv);print('10) menu dot:',await pg.evaluate("document.getElementById('bBook').classList.contains('hasNew')"));await pg.click('#bBook');await pg.wait_for_timeout(150);await pg.screenshot(path='x_bk.png')
        print('   NEW badges on fish tab:',await pg.locator('.pcd .nw').count());await pg.click('[data-card=bream]');await pg.wait_for_timeout(100);print('   after reading bream:',await pg.locator('#bookGrid .pcd .nw').count())
        # 9 shock + 5 story
        await pg.click('#sBook .float');await pg.click('#bMore');await pg.click('#bStory');await pg.click('[data-gal=post10]');await pg.wait_for_timeout(300)
        for i in range(6):
            await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(60);await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(120)
        await pg.wait_for_timeout(500);print('9) line:',await pg.evaluate("document.getElementById('stText').textContent"));await pg.screenshot(path='x_shock.png')
        await pg.goto(u);await pg.click('#bMore');await pg.click('#bStory');await pg.click('[data-gal=post3]');await pg.wait_for_timeout(300);txt=[]
        for i in range(12):
            txt.append(await pg.evaluate("document.getElementById('stWho').textContent"));
            if i==5: await pg.wait_for_timeout(400);await pg.screenshot(path='x_crew.png')
            await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(60);await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(100)
        print('5) post3 speakers:',txt);print(errs);await b.close()
asyncio.run(main())
