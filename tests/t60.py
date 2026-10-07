import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
# v2.6.0：钓鱼第三步。钓鱼节（准入证 → 老舵的考核 → 通行卡 → 每天一场比赛）、船尾装饰、钓鱼成就
import asyncio, sys
from playwright.async_api import async_playwright
SHOTS=os.environ.get('XK_SHOTS')
SETUP="""()=>{const K=window.__K,S=K.SAVE;for(let i=0;i<16;i++)S.simple.st[i]=Math.max(S.simple.st[i],1);Object.assign(S.story,{pro:1,pro2:1,post0:1,pre12:1,post12:1,pre13:1,post13:1,pre14:1,post14:1,pre15:1,post15:1,fish0:1,fish2:1});S.wallet=3000;S.dev=1;localStorage.setItem('xiaoyu_kuaipao_v1',JSON.stringify(S))}"""
HOOK="""(o)=>{const F=window.__F,f=F.FS,sp=F.FSP.find(s=>s.id===o.id);f.ph='wait';f.bob={x:.5,z:.4,fly:1};const sh={s:sp,fr:o.fr??.5,len:Math.round(sp.len[0]+(o.fr??.5)*(sp.len[1]-sp.len[0])),st:o.st||1,z:.4,x:.5,st2:'nib',cool:0,ph:0,tx:.5,tz:.4};f.sh.push(sh);f.bite={sh,k:'sink',t:1};F.fsHook();F.fsUp()}"""
CATCH="""async (o)=>{const F=window.__F,f=F.FS;(%s)(o);let i=0;
  for(;i<60*120&&f.ph==='fight';i++){const X=f.F;if(X.jump>0&&!X.ok)F.fsDown(.5);const want=X.T+X.v*.35<X.c;if(want&&!f.hold)F.fsDown(.5);if(!want&&f.hold)F.fsUp();F.update(1/60)}
  F.fsUp();for(let j=0;j<200&&f.ph==='land';j++)F.update(1/60);return f.ph}"""%HOOK
ESC="""async (o)=>{const F=window.__F,f=F.FS;(%s)(o);let i=0;for(;i<60*120&&f.ph==='fight';i++){F.fsUp();F.update(1/60)}return f.ph}"""%HOOK
REL="()=>{const b=document.querySelector('#fhCard [data-fk=rel]');if(b&&!document.getElementById('fhCard').hidden)b.click()}"
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();ok=True;errs=[]
        pg=await b.new_page(viewport={'width':390,'height':780});pg.on('pageerror',lambda e:errs.append(str(e)+' '+(e.stack or '')[:300]))
        await pg.goto(GAME);await pg.wait_for_timeout(400);await pg.evaluate(SETUP);await pg.goto(GAME);await pg.wait_for_timeout(400)
        await pg.click('#bFish');await pg.wait_for_timeout(700);await pg.evaluate("()=>{const f=window.__F.FS;f.noJunk=1;window.__K.SAVE.fsh.tide=400}")
        # 收竿面板里有钓鱼节
        await pg.click('#fhQuit');await pg.click('#fhPanel [data-ff]');await pg.wait_for_timeout(150)
        t=await pg.evaluate("()=>document.getElementById('fhPanel').textContent");print('fest panel:',t[:60])
        if '准入证' not in t:ok=False
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼节-准入证.png')
        await pg.click('#fhPanel [data-fe=buy]');w=await pg.evaluate("()=>[window.__K.SAVE.wallet,window.__K.SAVE.fsh.fest.pass]");print('after buy wallet/pass',w)
        if w!=[1000,1]:ok=False
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼节-考核说明.png')
        # 考核一：跑掉三条 → 没过
        await pg.click('#fhPanel [data-fe=exam]')
        for i in range(3):
            r=await pg.evaluate(ESC,{'id':'milkfish'});
        await pg.evaluate("()=>{for(let i=0;i<30;i++)window.__F.update(1/60)}");await pg.wait_for_timeout(100)
        t=await pg.evaluate("()=>document.getElementById('fhPanel').textContent");print('exam1:',t[:40])
        if '没过' not in t:ok=False;print('  !! 3 escapes should fail the exam')
        await pg.click('#fhPanel [data-fe=res]')
        # 考核二：四条，其中一条两星
        await pg.click('#fhQuit');await pg.click('#fhPanel [data-ff]');await pg.click('#fhPanel [data-fe=exam]')
        for i,st in enumerate([1,2,1]):
            await pg.evaluate(CATCH,{'id':'milkfish','st':st});await pg.evaluate(REL)
            if i==1 and SHOTS:await pg.wait_for_timeout(100);await pg.screenshot(path=SHOTS+'/钓鱼节-考核中.png')
        hud=await pg.evaluate("()=>document.getElementById('fhEv').textContent");print('hud',hud)
        await pg.evaluate(CATCH,{'id':'milkfish','st':1});await pg.evaluate(REL);await pg.evaluate("()=>{for(let i=0;i<30;i++)window.__F.update(1/60)}");await pg.wait_for_timeout(100)
        t=await pg.evaluate("()=>document.getElementById('fhPanel').textContent");print('exam2:',t[:50])
        if '通过' not in t or not await pg.evaluate("()=>window.__K.SAVE.fsh.fest.card"):ok=False;print('  !! exam should pass')
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼节-通行卡.png')
        await pg.click('#fhPanel [data-fe=res]')
        # 比赛
        await pg.click('#fhQuit');await pg.click('#fhPanel [data-ff]');await pg.click('#fhPanel [data-fe=cont]')
        w0=await pg.evaluate("()=>window.__K.SAVE.wallet")
        await pg.evaluate(CATCH,{'id':'milkfish','fr':1,'st':2});await pg.evaluate(REL)
        await pg.evaluate("()=>{const F=window.__F,f=F.FS;for(let i=0;i<60*160;i++){F.update(1/60)}}");await pg.wait_for_timeout(80)
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼节-比赛中.png')
        await pg.evaluate("()=>{const F=window.__F,f=F.FS;for(let i=0;i<60*150&&f.ev;i++){if(f.ph==='fight'){f.F.d=999}if(!document.getElementById('fhCard').hidden){document.querySelector('#fhCard [data-fk=rel]')?.click()}F.update(1/60)}}");await pg.wait_for_timeout(100)
        t=await pg.evaluate("()=>document.getElementById('fhPanel').textContent");print('result:',t[:120])
        if '老舵' not in t or '小鱼' not in t:ok=False;print('  !! contest result')
        d=await pg.evaluate("()=>({fest:window.__K.SAVE.fsh.fest,deco:window.__K.SAVE.fsh.deco,wallet:window.__K.SAVE.wallet})");print(d,'wallet +',d['wallet']-w0)
        if not d['deco']['own'].get('flag'):ok=False
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼节-结果.png')
        await pg.click('#fhPanel [data-fe=res]')
        await pg.click('#fhQuit');await pg.click('#fhPanel [data-ff]')
        dis=await pg.evaluate("()=>document.querySelector('#fhPanel [data-fe=cont]').disabled");print('second contest today disabled',dis)
        if not dis:ok=False
        await pg.click('#fhPanel [data-fp]')
        # 船尾装饰
        await pg.evaluate("()=>{window.__K.SAVE.fsh.tide=500}")
        await pg.click('#fhGear')
        for id in ['cushion','lights','chime','plant','board']:await pg.click(f'#fhPanel [data-dc={id}]')
        o=await pg.evaluate("()=>window.__K.SAVE.fsh.deco");print('deco',o)
        if len([k for k,v in o['on'].items() if v])<6:ok=False
        await pg.click('#fhPanel [data-fp]')
        for tod,nm in [(.3,'白天'),(.7,'夜里')]:
            await pg.evaluate(f"()=>{{window.__F.FS.tod={tod}}}");await pg.wait_for_timeout(200)
            if SHOTS:await pg.screenshot(path=SHOTS+f'/船尾装饰-{nm}.png')
        # 成就
        await pg.click('#fhBook');await pg.click('#fhPanel [data-fa]');t=await pg.evaluate("()=>document.getElementById('fhPanel').textContent");print('ach:',t[:40])
        a=await pg.evaluate("()=>window.__K.SAVE.fsh.ach");print('ach got',a)
        if not (a.get('first') and a.get('card')):ok=False;print('  !! achievements')
        if SHOTS:await pg.screenshot(path=SHOTS+'/钓鱼成就.png')
        await pg.click('#fhPanel [data-fp]')
        # 中途回主菜单：考核作废
        print('errors',errs)
        if errs:ok=False
        await b.close();sys.exit(0 if ok else 1)
if __name__=="__main__":asyncio.run(main())
