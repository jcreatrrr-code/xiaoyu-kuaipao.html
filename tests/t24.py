import os
GAME=os.environ.get('XK_GAME') or 'file://'+os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','index.html'))
import asyncio, json
from playwright.async_api import async_playwright
BOT=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'t5c.py'),encoding='utf-8').read().split('BOT = """')[1].split('"""')[0]
keys=["pro","guest","banq"]+[f"pre{i}" for i in range(12)]+[f"post{i}" for i in range(12)]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();errs=[]
        for vp in [(390,780),(844,390)]:
            pg=await b.new_page(viewport={'width':vp[0],'height':vp[1]});pg.on('pageerror',lambda e:errs.append(str(e)))
            u=GAME
            sv={"simple":{"st":[3]*12,"s4":[0]*12},"hard":{"st":[0]*12,"s4":[0]*12},"end":{"score":0,"dist":0,"combo":0},"mute":1,"music":0,"wallet":9000,"story":{k:1 for k in keys},"rep":1000,"fish":{"sard":6},"tools":{k:1 for k in ["lamp","chisel","scissors","knife","tongs","trap","lure","bottle"]},"banq":1}
            await pg.goto(u);await pg.evaluate("s=>localStorage.setItem('xiaoyu_kuaipao_v1',s)",json.dumps(sv));await pg.goto(u)
            for mode in ['simple','hard'] if vp[0]==390 else ['simple']:
                for li in range(7,12):
                    r=await pg.evaluate(BOT,[mode,li,240]);orb=await pg.evaluate("window.__T.G.orb&&window.__T.G.orb.hp")
                    print(vp,mode,li,r['state'],r['cause'],r['m'],'life',r['life'],'restores',r['rest'],'orb',orb)
            await pg.close()
        print(errs);await b.close()
asyncio.run(main())
