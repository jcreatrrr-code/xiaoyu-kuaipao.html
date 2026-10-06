import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# 第二卷第二幕（第 5–8 章）：英文界面里不该再露出中文
import asyncio, json, sys, re
from playwright.async_api import async_playwright
keys=["pro","pro2","guest","banq"]+[f"pre{i}" for i in range(20)]+[f"post{i}" for i in range(20)]
CJK=re.compile(r'[㐀-鿿]')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        await pg.add_init_script("(()=>{window.__cjk=new Set();const P=CanvasRenderingContext2D.prototype,o=P.fillText;P.fillText=function(s,...a){if(typeof s==='string'&&/[\\u3400-\\u9fff]/.test(s))window.__cjk.add(s);return o.call(this,s,...a)}})()")
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        sv={"simple":{"st":[3]*20,"s4":[0]*20},"hard":{"st":[0]*20,"s4":[0]*20},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":1000,"lang":"en",
            "story":{k:1 for k in keys},"rep":3000,"fish":{"coco":3,"turbo":2,"lobster":2,"skipjack":2,"tuna":2},"dex":{"turbo":1,"lobster":1,"skipjack":1},"dishes":{f"d{i}":1 for i in range(58,66)},"tools":{"scoop":1,"hook":1,"lpot":1,"rod":1}}
        await pg.goto(GAME);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(GAME)
        bad=[]
        async def scan(tag):
            t=await pg.evaluate("document.querySelector('.scr.on')?.innerText||''")
            for ln in t.split('\n'):
                if CJK.search(ln):bad.append((tag,ln.strip()))
            return t
        await pg.click('#bSail');await pg.wait_for_timeout(100)
        print('tabs shown:',await pg.evaluate("!document.getElementById('volTabs').hidden"))
        await pg.click('[data-vol="2"]');await pg.wait_for_timeout(100);t=await scan('levels v2');print('v2 levels:',[l for l in t.split('\n') if 'Level' in l or '.' in l][:6])
        await pg.click('[data-vol="1"]');await pg.wait_for_timeout(100);await scan('levels v1')
        await pg.goto(GAME);await pg.click('#bBook');await pg.wait_for_timeout(100)
        print('book:',await pg.evaluate("document.getElementById('bookProg').textContent"))
        for bt in ['fish','ing','dish','who','sea']:
            await pg.click(f'[data-bt={bt}]');await pg.wait_for_timeout(60)
            for cid in await pg.evaluate("[...document.querySelectorAll('#bookGrid [data-card]')].map(e=>e.dataset.card).filter(c=>['turbo','lobster','skipjack','d58','d59','d60','d61','d62','d63','d64','d65','s_16','s_17','s_18','s_19'].includes(c))"):
                await pg.click(f'[data-card="{cid}"]');await pg.wait_for_timeout(40);await scan('book '+cid)
        await pg.goto(GAME);await pg.click('#bMore');await pg.click('#bStory');await pg.wait_for_timeout(100);await scan('gallery')
        lines=0
        for k in [f'pre{i}' for i in range(16,20)]+[f'post{i}' for i in range(16,20)]:
            await pg.goto(GAME);await pg.click('#bMore');await pg.click('#bStory');await pg.click(f'[data-gal={k}]');await pg.wait_for_timeout(250)
            for i in range(40):
                if not await pg.evaluate("!!document.querySelector('#sStory.on')"):break
                w,x=await pg.evaluate("[document.getElementById('stWho').textContent,document.getElementById('stText').textContent]")
                if CJK.search(w+x):bad.append((k,w+' '+x))
                lines+=1
                await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(40);await pg.evaluate("document.querySelector('#sStory.on .card')?.click()");await pg.wait_for_timeout(60)
        print('story lines read:',lines)
        # 游戏画面里的字
        await pg.goto(GAME);await pg.evaluate("window.__cjk.clear()")
        for li in [16,17,18,19]:
            await pg.evaluate("li=>{const T=window.__T;window.__K.SAVE.god=1;window.__K.SAVE.dev=1;T.startGame('simple',li);const g=T.G;g.started=true;const b=g.E.find(e=>e.t==='boss');if(b)g.scroll=b.x-T.dims().fishSX-300}",li)
            for i in range(16):
                await pg.mouse.down() if i%2==0 else await pg.mouse.up()
                await pg.wait_for_timeout(400)
        # 小馆：地炉台子
        await pg.evaluate("()=>{const K=window.__K;K.startServe();const v=K.SV;v.seats[0]={d:'d64',p:99,P:99,face:'x',name:'',o:null,look:v.seats[0]?v.seats[0].look:{H:'#333',T:'#e33',L:'#333',D:'#fd9',hat:0},x:0};K.svStart('d64',0);K.svTick(.1)}")
        await pg.wait_for_timeout(300);await scan('serve umu')
        await pg.evaluate("()=>{const K=window.__K,s=K.SV.st.find(x=>x.k==='umu');K.svTapSt(s)}");await pg.wait_for_timeout(200)
        t=await pg.evaluate("document.getElementById('toast')?.innerText||''");print('umu toast:',t)
        if CJK.search(t):bad.append(('umu toast',t))
        await pg.evaluate("()=>{const K=window.__K,s=K.SV.st.find(x=>x.k==='umu');K.svTick(17);K.svTapSt(s);K.svTick(.1)}");await pg.wait_for_timeout(300);await scan('serve umu open')
        drawn=await pg.evaluate("[...window.__cjk]")
        print('canvas CJK after translation:',drawn)
        for x in bad:print('  CJK left:',x)
        print('errors',errs[:3])
        await b.close()
        sys.exit(1 if errs else 0)
asyncio.run(main())
