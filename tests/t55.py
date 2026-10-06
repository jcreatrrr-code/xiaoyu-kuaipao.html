import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# 第二卷第三幕（第 9–12 章、还光、石焖宴）：英文界面里不该再露出中文
import asyncio, json, sys, re
from playwright.async_api import async_playwright
keys=["pro","pro2","guest","banq"]+[f"pre{i}" for i in range(24)]+[f"post{i}" for i in range(24)]+["feast2","v2end"]
CJK=re.compile(r'[㐀-鿿]')
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        await pg.add_init_script("(()=>{window.__cjk=new Set();const P=CanvasRenderingContext2D.prototype,o=P.fillText;P.fillText=function(s,...a){if(typeof s==='string'&&/[\\u3400-\\u9fff]/.test(s))window.__cjk.add(s);return o.call(this,s,...a)}})()")
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        sv={"simple":{"st":[3]*24,"s4":[0]*24},"hard":{"st":[0]*24,"s4":[0]*24},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":1000,"lang":"en",
            "story":{k:1 for k in keys},"rep":3000,"fish":{"coco":3,"grouper":2,"tako":2,"parrot":2},"dex":{"grouper":1,"tako":1,"parrot":1},"dishes":{f"d{i}":1 for i in range(66,73)},"tools":{"scoop":1,"hook":1,"lpot":1,"rod":1,"opot":1},"feast2":1,"stat":{"feast12":1}}
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
        for bt in ['fish','ing','dish','who','sea','feat']:
            await pg.click(f'[data-bt={bt}]');await pg.wait_for_timeout(60)
            for cid in await pg.evaluate("[...document.querySelectorAll('#bookGrid [data-card]')].map(e=>e.dataset.card).filter(c=>['grouper','tako','parrot','d66','d67','d68','d69','d70','d71','d72','s_20','s_21','s_22','s_23','f_feast2','f_feast12'].includes(c))"):
                await pg.click(f'[data-card="{cid}"]');await pg.wait_for_timeout(40);await scan('book '+cid)
        await pg.goto(GAME);await pg.click('#bMore');await pg.click('#bStory');await pg.wait_for_timeout(100);await scan('gallery')
        lines=0
        for k in [f'pre{i}' for i in range(20,24)]+[f'post{i}' for i in range(20,24)]+['feast2','v2end']:
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
        for li in [20,21,22,23]:
            await pg.evaluate("li=>{const T=window.__T;window.__K.SAVE.god=1;window.__K.SAVE.dev=1;T.startGame('simple',li);const g=T.G;g.started=true;const b=g.E.find(e=>e.t==='boss');if(b)g.scroll=b.x-T.dims().fishSX-300}",li)
            for i in range(16):
                await pg.mouse.down() if i%2==0 else await pg.mouse.up()
                await pg.wait_for_timeout(400)
        # 石焖宴
        await pg.evaluate("()=>{const K=window.__K;K.startServe(2);K.svTick(.1);for(let i=0;i<60;i++)K.svTick(.2)}")
        await pg.wait_for_timeout(300);await scan('feast');t=await pg.evaluate("document.getElementById('toast')?.innerText||''");print('feast toast:',t)
        if CJK.search(t):bad.append(('feast toast',t))
        await pg.evaluate("()=>{const K=window.__K;K.SV.served=12;K.SV.t=0;K.svTick(.1)}");await pg.wait_for_timeout(300);t=await scan('feast end');print('feast end:',t.replace('\n',' | ')[:200])
        await pg.goto(GAME);await pg.click('#bSail');await pg.wait_for_timeout(100);await pg.click('[data-vol="2"]');await pg.wait_for_timeout(100);t=await scan('levels feast');print('feast button:',[l for l in t.split('\n') if 'Feast' in l or 'feast' in l])
        drawn=await pg.evaluate("[...window.__cjk]")
        print('canvas CJK after translation:',drawn)
        for x in bad:print('  CJK left:',x)
        print('errors',errs[:3])
        await b.close()
        sys.exit(1 if errs else 0)
asyncio.run(main())
