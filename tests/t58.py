import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v2.5.0：钓鱼第二步。伊瓦上船剧情、四个钓点、新鱼、硬头鱼只能放回、天气月相、打窝、传说鱼和过场、意外收获、拍照、摸伊瓦
import asyncio, sys
from playwright.async_api import async_playwright
SHOTS=os.environ.get('XK_SHOTS')
SETUP="""()=>{const K=window.__K,S=K.SAVE;for(let i=0;i<16;i++)S.simple.st[i]=Math.max(S.simple.st[i],1);Object.assign(S.story,{pro:1,pro2:1,post0:1,pre12:1,post12:1,pre13:1,post13:1,pre14:1,post14:1,pre15:1,post15:1,fish0:1});S.wallet=500;S.dev=1}"""
# 指定一种鱼咬钩，用好手的方式遛到底
CATCH="""async (o)=>{const F=window.__F,f=F.FS,sp=F.FSP.find(s=>s.id===o.id);f.ph='wait';f.bob={x:.5,z:.4,fly:1};const sh={s:sp,fr:o.fr??.5,len:sp.len[0]+5,st:o.st||1,z:.4,x:.5,st2:'nib',cool:0,ph:0,tx:.5,tz:.4};f.sh.push(sh);f.bite={sh,k:'sink',t:1};
  const R0=Math.random;if(o.junk){f.noJunk=0;Math.random=()=>.01}F.fsHook();Math.random=R0;f.noJunk=1;F.fsUp();let i=0;
  for(;i<60*120&&f.ph==='fight';i++){const X=f.F;if(X.jump>0&&!X.ok)F.fsDown(.5);const want=X.T+X.v*.35<X.c;if(want&&!f.hold)F.fsDown(.5);if(!want&&f.hold)F.fsUp();F.update(1/60)}
  F.fsUp();for(let j=0;j<200&&f.ph==='land';j++)F.update(1/60);return {ph:f.ph,secs:Math.round(i/60),card:!document.getElementById('fhCard').hidden,txt:document.getElementById('fhCard').textContent}}"""
async def story_done(pg):
    for _ in range(40):
        if not await pg.evaluate("()=>document.getElementById('sStory').classList.contains('on')"):return
        await pg.click('#stText');await pg.wait_for_timeout(120)
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780},accept_downloads=True);pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto(GAME);await pg.wait_for_timeout(400);await pg.evaluate(SETUP)
        # 第三章通关 → 伊瓦上船
        await pg.evaluate("()=>{window.__T.startGame('simple',14);document.querySelector('#devPause [data-dp=win]').click()}");await pg.wait_for_timeout(900)
        st=await pg.evaluate("()=>({on:document.getElementById('sStory').classList.contains('on'),txt:document.getElementById('stText').textContent})");print('after ch3:',st)
        if not(st['on'] and st['txt'].startswith('船离开红树林')):ok=False;print('  !! 伊瓦 story should play after chapter 3')
        if SHOTS:await pg.screenshot(path=SHOTS+'/伊瓦上船.png')
        await story_done(pg)
        f2=await pg.evaluate("()=>window.__K.SAVE.story.fish2");print('fish2 seen',f2)
        if not f2:ok=False
        await pg.evaluate("()=>{localStorage.setItem('xiaoyu_kuaipao_v1',JSON.stringify(window.__K.SAVE))}");await pg.goto(GAME);await pg.wait_for_timeout(400)
        await pg.click('#bFish');await pg.wait_for_timeout(800);await pg.evaluate("()=>{window.__F.FS.noJunk=1;window.__K.SAVE.fsh.tide=300}")
        # 钓点
        await pg.click('#fhQuit');await pg.wait_for_timeout(200)
        n=await pg.evaluate("()=>document.querySelectorAll('#fhPanel [data-fs]').length");print('spots to go',n)
        if n!=3:ok=False;print('  !! all four spots should be open after chapter 4')
        if SHOTS:await pg.screenshot(path=SHOTS+'/换钓点.png')
        for sp,tod in [('lagoon',.12),('mangrove',.6),('reef',.3)]:
            await pg.click(f'#fhPanel [data-fs={sp}]');await pg.evaluate(f"()=>{{window.__F.FS.tod={tod}}}");await pg.wait_for_timeout(500)
            if SHOTS:await pg.screenshot(path=SHOTS+f'/钓点-{sp}.png')
            await pg.click('#fhQuit');await pg.wait_for_timeout(150)
        await pg.click('#fhPanel [data-fp]')
        # 通过生成鱼影来看各钓点的鱼
        sp_fish=await pg.evaluate("""()=>{const f=window.__F.FS,K=window.__K,out={};for(const sp of ['stern','lagoon','mangrove','reef']){K.SAVE.fsh.spot=sp;const c=new Set();for(const tod of [.1,.3,.6,.85]){f.tod=tod;for(let i=0;i<80;i++){f.sh=[];window.__F.fsGo(sp);f.sh.forEach(s=>c.add(s.s.id))}}out[sp]=[...c].sort()}K.SAVE.fsh.spot='stern';window.__F.fsGo('stern');return out}""")
        print('fish per spot',sp_fish)
        if 'bonefish' not in sp_fish['lagoon'] or 'mjack' not in sp_fish['mangrove'] or 'bluefin' not in sp_fish['reef'] or 'mjack' in sp_fish['stern'] or any(x in sum(sp_fish.values(),[]) for x in ('gt','moonfish')):ok=False;print('  !! spot fish pools')
        # 硬头鱼只能放回
        r=await pg.evaluate(CATCH,{'id':'bonefish'});print('bonefish',r['ph'],r['secs'],r['txt'][:60])
        dis=await pg.evaluate("()=>document.querySelector('#fhCard [data-fk=keep]').disabled");print('bonefish keep disabled',dis)
        if not dis:ok=False
        if SHOTS:await pg.screenshot(path=SHOTS+'/渔获卡-硬头鱼.png')
        # 拍照
        async with pg.expect_download() as dl:await pg.click('#fhCard [data-fk=cam]')
        d=await dl.value;print('photo',d.suggested_filename)
        if SHOTS:await d.save_as(SHOTS+'/拍照.png')
        await pg.click('#fhCard [data-fk=rel]')
        # 意外收获
        t0=await pg.evaluate("()=>window.__K.SAVE.fsh.tide")
        r=await pg.evaluate(CATCH,{'id':'milkfish','junk':True});print('junk',r['ph'],r['txt'][:40])
        if '意外收获' not in r['txt']:ok=False;print('  !! junk card')
        if SHOTS:await pg.screenshot(path=SHOTS+'/意外收获.png')
        await pg.click('#fhCard [data-fk=junk]')
        # 打窝
        await pg.click('#fhGear');await pg.click('#fhPanel [data-gc]');await pg.click('#fhPanel [data-fp]')
        c=await pg.evaluate("()=>{const F=window.__F,f=F.FS;f.ph='idle';f.bob=null;const n0=f.sh.length;F.fsChum();return {chum:window.__K.SAVE.fsh.chum,at:!!f.chumAt,more:f.sh.length-n0}}");print('chum',c)
        if c['chum']!=4 or not c['at'] or c['more']<3:ok=False;print('  !! chum')
        # 摸伊瓦（真的点在它身上）
        pos=await pg.evaluate("()=>{const f=window.__F.FS;window.__F.update(1/60);return f.iwaPos&&{x:f.iwaPos.x,y:f.iwaPos.y,ps:f.ps}}")
        await pg.wait_for_timeout(200);pos=await pg.evaluate("()=>{const f=window.__F.FS;return f.iwaPos&&{x:f.iwaPos.x,y:f.iwaPos.y,ps:f.ps}}");print('iwa at',pos)
        await pg.mouse.click((pos['x']+2)*pos['ps'],(pos['y']-4)*pos['ps']);pet=await pg.evaluate("()=>window.__F.FS.iwaPet");print('pet',pet)
        if not pet or pet<=0:ok=False;print('  !! tapping 伊瓦 should pet it')
        await pg.wait_for_timeout(150)
        if SHOTS:await pg.screenshot(path=SHOTS+'/摸伊瓦.png')
        # 下雨
        await pg.evaluate("()=>{const f=window.__F.FS;f.rain=1;f.rainA=1;f.wxT=99;f.tod=.6}");await pg.wait_for_timeout(400)
        if SHOTS:await pg.screenshot(path=SHOTS+'/夜雨.png')
        # 月鱼：满月夜、船尾、空钩
        w=await pg.evaluate("()=>{const K=window.__K,f=window.__F.FS;K.SAVE.fsh.nights=4;K.SAVE.fsh.gear.bait='none';f.tod=.6;f.lph=2;f.rain=0;f.rainA=0;f.legT=0;for(let i=0;i<20;i++){f.legT=0;window.__F.update(1/60)}return f.sh.filter(s=>s.leg).map(s=>s.s.id)}");print('moon legend shadow',w)
        if w!=['moonfish']:ok=False;print('  !! 月鱼 should show on full moon')
        if SHOTS:await pg.wait_for_timeout(300);await pg.screenshot(path=SHOTS+'/满月.png')
        # 礁王：雨后清晨、礁盘外沿、好饵；用最好的钓具拉
        await pg.evaluate("()=>{const K=window.__K,F=window.__F;F.fsGo('reef');const f=F.FS,S=K.SAVE.fsh;S.baits.squid=3;S.gear.bait='squid';Object.assign(S.gear,{rod:'bamboo',line:'braid'});S.own.bamboo=1;S.own.braid=1;f.rainNight=1;f.tod=.85;f.lph=3;f.rain=0;f.wxT=99}")
        w=await pg.evaluate("()=>{const f=window.__F.FS;for(let i=0;i<20;i++){f.legT=0;window.__F.update(1/60)}return f.sh.filter(s=>s.leg).map(s=>s.s.id)}");print('gt shadow',w)
        if w!=['gt']:ok=False;print('  !! 礁王 should show after a rainy night')
        t0=await pg.evaluate("()=>window.__K.SAVE.fsh.tide")
        r=await pg.evaluate(CATCH,{'id':'gt','fr':1,'st':3});print('gt',r['ph'],r['secs'],r['txt'][:50])
        if not r['card']:ok=False;print('  !! a good player with the best gear should land 礁王')
        else:
            dis=await pg.evaluate("()=>document.querySelector('#fhCard [data-fk=keep]').disabled");print('legend keep disabled',dis)
            if SHOTS:await pg.screenshot(path=SHOTS+'/礁王.png')
            await pg.click('#fhCard [data-fk=rel]');await pg.wait_for_timeout(500)
            st=await pg.evaluate("()=>({on:document.getElementById('sStory').classList.contains('on'),who:document.getElementById('stWho').textContent,tide:window.__K.SAVE.fsh.tide})");print('gt story',st,'tide +',st['tide']-t0)
            if not(st['on'] and dis and st['tide']-t0==40):ok=False;print('  !! legend release + story')
            if SHOTS:await pg.screenshot(path=SHOTS+'/礁王过场.png')
            await story_done(pg)
        await pg.click('#fhQuit');await pg.click('#fhPanel [data-fq]');await pg.wait_for_timeout(300)
        menu=await pg.evaluate("()=>document.getElementById('sMenu').classList.contains('on')");print('menu',menu)
        if not menu:ok=False
        print('errors',errs)
        await b.close()
        if errs or not ok:sys.exit(1)
asyncio.run(main())
