import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
SIM="""
(mode)=>{const K=window.__K;K.SAVE.spd=1;K.startServe();const v=K.SV;if(!v)return 'no shift';let n=0,greets=0;
 while(!v.over&&n<1300){K.svTick(.1);n++;if(v.over)break;
   if(mode==='idle')continue;
   // garnish every plate as soon as it lands
   if(mode!=='nofin')v.shelf.forEach((p,j)=>{if(!p.fin)K.svGarnish(j)});
   // greet impatient guests
   v.seats.forEach((s,i)=>{if(s&&!s.greet&&!(v.gcd>0)&&s.p/s.P<.6&&!v.shelf.some(p=>p.d===s.d)){K.svSeatTap(i);greets++}});
   // hand-make signature orders
   if(n%4===0){for(const id of new Set(v.seats.filter(x=>x&&x.sig).map(x=>x.d))){if(K.svSigNeed(id)>0&&K.svPending(id)>0&&v.st.some(x=>x.k===K.methodOf(id)&&!x.d)){K.svStart(id,1);break}}
     for(const s of v.st){if(s.d&&s.hand&&(s.ph==='work'||s.ph==='perfect')){K.svTapSt(s);break}}}
   if(!v.staff.waiter&&n%5===0)v.seats.forEach((s,i)=>{if(s&&v.shelf.some(p=>p.d===s.d))K.svServe(i)});
 }
 return {mode,served:v.served,lost:v.lost,income:v.earn+v.tips,wage:v.wage,net:v.earn+v.tips-v.wage,fins:v.fins||0,sigs:v.sigs||0,greets}}
"""
ST={k:1 for k in ["pro","pre0","pre1","pre2","pre3","post0","post1","post2","post3"]}
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':780})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        u=GAME
        async def run(mode,staff,reps=4):
            tot=[]
            for r in range(reps):
                sv={"simple":{"st":[3,3,3,3,0,0,0,0,0,0,0,0],"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":800,"story":ST,"rep":200,"fish":{"sard":14,"bream":8,"yellow":8,"salmon":8,"mack":5,"puffer":4,"tuna":3},"staff":staff,"tipFin":1,"dishes":{f"d{i}":1 for i in range(1,37)}}
                await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
                tot.append(await pg.evaluate(SIM,mode))
            avg=lambda k:round(sum(t[k] for t in tot)/len(tot),1)
            print(mode,staff,{k:avg(k) for k in ['served','lost','income','wage','net','fins','sigs','greets']})
        await run('idle',{"waiter":1,"chef":1})
        await run('engaged',{"waiter":1,"chef":1})
        await run('engaged',{"waiter":1,"chef":0})
        await run('idle',{"waiter":1,"chef":0})
        print(errs)
        # screenshot real UI
        sv={"simple":{"st":[3,3,3,3,0,0,0,0,0,0,0,0],"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":800,"story":ST,"rep":200,"fish":{"sard":14,"bream":8,"yellow":8,"salmon":8},"staff":{"waiter":1,"chef":1}}
        await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
        await pg.click('#bKit');await pg.click('#bServe')
        for i in range(40):
            await pg.wait_for_timeout(500)
            st=await pg.evaluate("(()=>{const v=window.__K.SV;return [v.shelf.length,v.seats.filter(s=>s&&s.sig).length,document.querySelectorAll('.sb.greet').length]})()")
            if st[0]>0 and st[1]>0: break
        await pg.screenshot(path='kt1.png')
        n=await pg.locator('.plate.raw').count()
        if n: await pg.locator('.plate.raw').first.dispatch_event('pointerdown')
        await pg.wait_for_timeout(250);await pg.screenshot(path='kt2.png');print('plates raw before tap',n,'fin now',await pg.locator('.plate.fin').count(),errs)
        await b.close()
asyncio.run(main())
