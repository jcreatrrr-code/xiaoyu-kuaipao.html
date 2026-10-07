import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v2.3.0：船尾钓鱼。v2.4.0：绿区会动、放回得潮印、钓具箱、托竿。第二卷第二章通关后接解锁剧情；抛竿、试探、真咬钩、遛鱼、渔获卡、留下或放回、手帐、饮品
import asyncio, sys
from playwright.async_api import async_playwright
SHOTS=os.environ.get('XK_SHOTS')
SETUP="""()=>{const K=window.__K,S=K.SAVE;for(let i=0;i<14;i++)S.simple.st[i]=Math.max(S.simple.st[i],1);Object.assign(S.story,{pro:1,pro2:1,post0:1,pre12:1,post12:1,pre13:1,post13:1});S.wallet=500;S.dev=1}"""
# 机器人：浮漂真沉下去才点；遛鱼时线太紧就松手
BOT="""async (o)=>{const F=window.__F,f=F.FS,log=[];let i=0,peak=0,inz=0;for(;i<200&&f.ph!=='idle';i++)F.update(1/60);
  F.fsDown(o.aim);for(;i<200&&f.pow<o.pow;i++)F.update(1/60);F.fsUp();
  for(i=0;i<60*60&&f.ph!=='fight'&&f.ph!=='idle';i++){F.update(1/60);const b=f.bite;if(b&&!log.includes(b.k))log.push(b.k);
    if(b&&b.k===(o.early?'dip':'sink')){F.fsDown(.5);if(o.early){log.push('spook');o.early=0}}}
  if(f.ph!=='fight')return {log,ph:f.ph,secs:Math.round(i/60)};
  const k=f.F.sh.s.k;let t=0;
  for(i=0;i<(o.stop||60*90)&&f.ph==='fight';i++){const F2=f.F;if(F2.jump>0&&!F2.ok)F.fsDown(.5);
    const want=o.greedy?true:F2.T+F2.v*.35<F2.c;if(want&&!f.hold)F.fsDown(.5);if(!want&&f.hold)F.fsUp();peak=Math.max(peak,F2.T);if(Math.abs(F2.T-F2.c)<=F2.zw/2)inz++;F.update(1/60);t++}
  if(o.stop)return {stopped:f.ph==='fight'};F.fsUp();for(i=0;i<120&&f.ph==='land';i++)F.update(1/60);
  return {log,k,ph:f.ph,fight:Math.round(t/60),peak:+peak.toFixed(2),inz:+(inz/Math.max(1,t)).toFixed(2),card:!document.getElementById('fhCard').hidden}}"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780});pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME);await pg.wait_for_timeout(400)
        hid=await pg.evaluate("()=>document.getElementById('bFish').hidden");print('menu button hidden before ch2:',hid)
        if not hid:ok=False;print('  !! fishing should be locked before volume 2 chapter 2')
        await pg.evaluate(SETUP)
        # 通关第二卷第二章 → 先播第二章结尾（已看过则跳过）再接钓鱼解锁剧情
        await pg.evaluate("()=>{window.__T.startGame('simple',13);document.querySelector('#devPause [data-dp=win]').click()}")
        await pg.wait_for_timeout(900)
        st=await pg.evaluate("()=>({on:document.getElementById('sStory').classList.contains('on'),who:document.getElementById('stWho').textContent,txt:document.getElementById('stText').textContent})")
        print('after ch2 clear:',st)
        if not(st['on'] and st['txt'].startswith('那天傍晚')):ok=False;print('  !! unlock story should play after chapter 2')
        if SHOTS:await pg.screenshot(path=SHOTS+'/剧情.png')
        await pg.evaluate("()=>{const S=window.__K.SAVE;S.story.fish0=1;localStorage.setItem('xiaoyu_kuaipao_v1',JSON.stringify(S))}")
        await pg.goto(GAME);await pg.wait_for_timeout(400)
        hid=await pg.evaluate("()=>document.getElementById('bFish').hidden");print('menu button hidden after ch2:',hid)
        if hid:ok=False;print('  !! fishing button should show')
        if SHOTS:await pg.screenshot(path=SHOTS+'/主菜单.png')
        await pg.click('#bFish');await pg.wait_for_timeout(1200)
        if SHOTS:await pg.screenshot(path=SHOTS+'/船尾-黄昏.png')
        caught=[];kinds=set()
        for n in range(8):
            r=await pg.evaluate(BOT,{'aim':.3+n*.06,'pow':.2+(n%4)*.22,'early':n==0,'greedy':False});print('cast',n,r)
            if r.get('card'):
                c=await pg.evaluate("()=>{const s=window.__F.FS.cur;return {id:s.s.id,len:s.len,st:s.st}}");caught.append(c);kinds.add(r['k'])
                if n==1 and SHOTS:await pg.wait_for_timeout(300);await pg.screenshot(path=SHOTS+'/渔获卡.png')
                await pg.click('#fhCard [data-fk=%s]'%('keep' if n%2 else 'rel'))
        print('caught',caught,'kinds',kinds)
        if len(caught)<5:ok=False;print('  !! a patient player should land most fish')
        sv=await pg.evaluate("()=>{const S=window.__K.SAVE;return {kept:S.fsh.kept,n:S.fsh.n,fish:Object.fromEntries(window.__F.FSP.map(s=>[s.id,S.fish[s.id]||0])),dex:Object.keys(S.fsh.dex).length}}")
        print('save',sv)
        if sv['n']!=len(caught) or sum(sv['fish'].values())!=sv['kept'] or sv['kept']<1:ok=False;print('  !! keep should put fish in the basket')
        # 一直按住不松手：线绷太紧，鱼会跑掉（不会断线）
        r=await pg.evaluate(BOT,{'aim':.5,'pow':.5,'early':False,'greedy':True});print('greedy',r)
        if r.get('ph')=='fight' or r.get('card'):ok=False;print('  !! holding forever should lose the fish')
        tide=await pg.evaluate("()=>window.__K.SAVE.fsh.tide");print('tide after releases',tide)
        if tide<1:ok=False;print('  !! releasing should give 潮印')
        # 钓具箱：潮印换尼龙线，珍珠买虾仁，托竿第三章前锁着
        await pg.evaluate("()=>{window.__K.SAVE.fsh.tide=200}");await pg.click('#fhGear');await pg.wait_for_timeout(200)
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓具箱.png',full_page=True)
        lock=await pg.evaluate("()=>!document.querySelector('#fhPanel [data-gr]')");print('rack locked before ch3',lock)
        if not lock:ok=False
        await pg.click('#fhPanel [data-gb="line:nylon"]');await pg.click('#fhPanel [data-bb=shrimp]')
        g=await pg.evaluate("()=>{const f=window.__K.SAVE.fsh;return {line:f.gear.line,bait:f.gear.bait,n:f.baits.shrimp,tide:f.tide,w:window.__K.SAVE.wallet}}");print('gear',g)
        if g['line']!='nylon' or g['bait']!='shrimp' or g['n']!=10 or g['tide']!=180:ok=False;print('  !! gear purchase')
        await pg.click('#fhPanel [data-fp]')
        r=await pg.evaluate(BOT,{'aim':.5,'pow':.5,'early':False,'greedy':False});print('shrimp cast',r)
        n=await pg.evaluate("()=>window.__K.SAVE.fsh.baits.shrimp");print('shrimp left',n)
        if r.get('card'):
            if n!=9:ok=False;print('  !! a bite should use one bait')
            await pg.click('#fhCard [data-fk=rel]')
        if SHOTS:
            r=await pg.evaluate(BOT,{'aim':.45,'pow':.4,'early':False,'greedy':False,'stop':150})
            if r.get('stopped'):await pg.wait_for_timeout(250);await pg.screenshot(path=SHOTS+'/遛鱼.png')
            await pg.evaluate("()=>{const F=window.__F,f=F.FS;for(let i=0;i<60*90&&f.ph==='fight';i++){F.fsUp();F.update(1/60)}for(let i=0;i<200&&f.ph!=='card'&&f.ph!=='idle';i++)F.update(1/60)}")
            if await pg.evaluate("()=>!document.getElementById('fhCard').hidden"):await pg.click('#fhCard [data-fk=rel]')
        # 第三章通关后：换托竿架 → 老舵剧情 → 回到船尾；离开一阵回来有托竿的收获
        await pg.evaluate("()=>{const S=window.__K.SAVE;S.simple.st[14]=1}");await pg.click('#fhGear');await pg.click('#fhPanel [data-gr]');await pg.wait_for_timeout(600)
        st=await pg.evaluate("()=>({on:document.getElementById('sStory').classList.contains('on'),who:document.getElementById('stWho').textContent})");print('rack story',st)
        if not(st['on'] and st['who']=='老舵'):ok=False;print('  !! 老舵 story should play')
        if SHOTS:await pg.screenshot(path=SHOTS+'/老舵的托竿架.png')
        for _ in range(40):
            if not await pg.evaluate("()=>document.getElementById('sStory').classList.contains('on')"):break
            await pg.click('#stText');await pg.wait_for_timeout(120)
        back=await pg.evaluate("()=>!document.getElementById('fishHud').hidden&&window.__K.SAVE.fsh.auto.own&&window.__K.SAVE.fsh.auto.on");print('back on deck with rack',back)
        if not back:ok=False
        t0=await pg.evaluate("()=>{const f=window.__F.FS,S=window.__K.SAVE.fsh;f.at=0;const t=S.tide;for(let i=0;i<60*3;i++)window.__F.update(1/60);return S.tide-t}");print('auto catch tide',t0)
        if t0<1:ok=False;print('  !! auto rod should catch and release')
        await pg.wait_for_timeout(300)
        if SHOTS:await pg.screenshot(path=SHOTS+'/托竿.png')
        a=await pg.evaluate("()=>{const S=window.__K.SAVE.fsh;S.auto.ts=Date.now()-11*60000;const t=S.tide;window.__F.fsAway();return {d:S.tide-t,txt:document.getElementById('fhPanel').textContent}}");print('away',a['d'],a['txt'][:40])
        if a['d']<4 or '4 条' not in a['txt']:ok=False;print('  !! away catches')
        if SHOTS:await pg.screenshot(path=SHOTS+'/离开以后.png')
        await pg.click('#fhPanel [data-fp]')
        # 手帐和饮品
        await pg.click('#fhBook');await pg.wait_for_timeout(200)
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼手帐.png')
        await pg.click('#fhPanel [data-fp]')
        w0=await pg.evaluate("()=>window.__K.SAVE.wallet")
        await pg.click('#fhCup');await pg.wait_for_timeout(200)
        if SHOTS:await pg.screenshot(path=SHOTS+'/来一杯.png')
        await pg.click('#fhPanel [data-dk=coffee]');await pg.click('#fhCup');await pg.click('#fhPanel [data-dk=tea]')
        w1=await pg.evaluate("()=>window.__K.SAVE.wallet");cup=await pg.evaluate("()=>window.__F.FS.cup.id");print('drinks wallet',w0,'->',w1,'cup',cup)
        if w0-w1!=10 or cup!='tea':ok=False;print('  !! first cup free, second costs 10')
        # 夜里和横屏
        await pg.evaluate("()=>{window.__F.FS.tod=.6}");await pg.wait_for_timeout(500)
        if SHOTS:await pg.screenshot(path=SHOTS+'/船尾-夜里.png')
        await pg.evaluate("()=>{const F=window.__F,f=F.FS;f.tod=.12;F.fsDown(.6);for(let i=0;i<40;i++)F.update(1/60)}");await pg.wait_for_timeout(200)
        if SHOTS:await pg.screenshot(path=SHOTS+'/蓄力抛竿.png')
        await pg.evaluate("()=>window.__F.fsUp()")
        await pg.set_viewport_size({'width':844,'height':390});await pg.wait_for_timeout(500)
        if SHOTS:await pg.screenshot(path=SHOTS+'/横屏.png')
        await pg.click('#fhQuit');await pg.wait_for_timeout(300)
        menu=await pg.evaluate("()=>document.getElementById('sMenu').classList.contains('on')&&document.getElementById('fishHud').hidden");print('back to menu',menu)
        if not menu:ok=False
        print('errors',errs)
        await b.close()
        if errs or not ok:sys.exit(1)
asyncio.run(main())
