/* ---------- cutscene sound ---------- */
const AMB={buf:null,ch:{},on:0};
function ambInit(){if(!AC||AMB.buf)return;try{const n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;AMB.buf=b;
  for(const[k,ty,f]of[['rain','highpass',2200],['wind','bandpass',420],['wave','lowpass',650],['deep','lowpass',170]]){const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;s.loop=true;fl.type=ty;fl.frequency.value=f;g.gain.value=0;s.connect(fl);fl.connect(g);g.connect(AC.destination);s.start(0,Math.random());AMB.ch[k]={fl,g}}}catch(e){}}
function ambSet(lv,t){if(!AC||AC.state!=='running')return;ambInit();if(!AMB.buf)return;AMB.on=1;const now=AC.currentTime;for(const k in AMB.ch){let v=SAVE.mute?0:lv[k]||0;if(k==='wave')v*=.6+.4*Math.sin(t*.9);AMB.ch[k].g.gain.setTargetAtTime(v,now,.25)}AMB.ch.wind.fl.frequency.setTargetAtTime(380+220*Math.sin(t*.6),now,.3)}
function ambOff(){if(!AMB.on||!AC)return;AMB.on=0;for(const k in AMB.ch)AMB.ch[k].g.gain.setTargetAtTime(0,AC.currentTime,.3)}
function nz(dur,type,f0,f1,vol){if(SAVE.mute||!AC)return;ambInit();if(!AMB.buf)return;try{const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain(),t=AC.currentTime;s.buffer=AMB.buf;fl.type=type;fl.frequency.setValueAtTime(f0,t);if(f1)fl.frequency.exponentialRampToValueAtTime(f1,t+dur);g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(fl);fl.connect(g);g.connect(AC.destination);s.start(t,Math.random()*1.5);s.stop(t+dur+.05)}catch(e){}}
const CSND={thunder(){nz(.12,'highpass',1800,0,.3);nz(2.2,'lowpass',260,60,.55);snd(70,1.4,'sine',.22,35)},splash(){nz(.5,'bandpass',900,300,.3);nz(.9,'highpass',2500,0,.08)},
 chime(){[880,1320,1760].forEach((f,i)=>setTimeout(()=>snd(f,.5,'sine',.08),i*90))},bubble(){for(let i=0;i<6;i++)setTimeout(()=>snd(300+i*90+Math.random()*60,.09,'sine',.09,700+i*120),i*80)},
 growl(){snd(75,.9,'sawtooth',.13,48);setTimeout(()=>snd(62,.5,'sawtooth',.1,45),350)},crash(){nz(.6,'lowpass',900,120,.5);snd(90,.5,'square',.12,40)},whoosh(){nz(.22,'bandpass',500,2600,.16)},
 em(c){c==='!'?snd(880,.09,'square',.06,1320):c==='?'?(snd(520,.08,'triangle',.08),setTimeout(()=>snd(780,.1,'triangle',.08),90)):snd(260,.18,'sine',.06,200)}};
const VOICE={'小鱼':[520,'square'],'阿潮':[170,'triangle'],'阿珍':[720,'square'],'阿强':[130,'triangle'],'墨墨':[330,'sawtooth'],'老龟':[105,'sine'],'鲸婆婆':[240,'sine'],'海生':[200,'triangle'],'老船医':[270,'sine'],'石蟹':[310,'square'],'阿澄':[400,'sine'],'奶奶':[300,'triangle']};
const TSPD={'老龟':9,'鲸婆婆':40,'海生':15,'阿强':10,'大白':8};
let last=0;
const SHOP={t:0,w:-1,joy:0,wave:0};
$('shopCv').onclick=()=>{SHOP.wave=1.2;SFX.tap();toast('墨墨：“亏了！亏大了！”',1.6)};
function drawShopScene(dt){
  const S=SHOP;S.t+=dt;const t=S.t;if(S.w>=0&&SAVE.wallet<S.w)S.joy=1.6;S.w=SAVE.wallet;S.joy=Math.max(0,S.joy-dt);S.wave=Math.max(0,S.wave-dt);
  const a=CW,b=CH2;CW=120;CH2=44;if(pcv.width!==CW||pcv.height!==CH2){pcv.width=CW;pcv.height=CH2}
  for(let x=0;x<CW;x+=6){R(x,0,6,CH2,(x/6)%2?'#4a3220':'#553a25');R(x,0,1,CH2,'#3a2616')}
  for(let y=0;y<CH2;y++)R(0,y,CW,1,`rgba(30,110,150,${.18+.22*y/CH2})`);
  R(0,4,CW,2,'#3a2616');R(0,26,CW,1,'#3a2616');
  for(const [px0,ph] of [[17,0],[103,2]]){const cy=14;El(px0,cy,8,8,'#c9a85a');El(px0,cy,6,6,'#2f8fc4');El(px0,cy+2,6,4,'#3fa9d8');R(px0-3,cy-4,2,1,'#bfe6ff');
    const fx=px0-6+((t*6+ph*4)%16);if(fx>px0-6&&fx<px0+5){R(Math.round(fx),cy+1,3,2,'#ffa01f');R(Math.round(fx)-1,cy+1,1,2,'#ff7f1f')}
    for(let k=0;k<4;k++){const an=k*Math.PI/2+.8;R(Math.round(px0+Math.cos(an)*7),Math.round(cy+Math.sin(an)*7),1,1,'#8a6f3a')}}
  R(32,10,22,2,'#7d5229');R(66,10,22,2,'#7d5229');
  [['#7fe0a0',34],['#ff8f80',40],['#9fd0ff',46],['#ffd23f',68],['#d9bdfa',74],['#f4ecfd',80]].forEach(([c,x],i)=>{const h=4+i%2*2;R(x,10-h,4,h,c);R(x,10-h,4,1,'#ffffff');R(x+1,10-h-1,2,1,'#c9a85a')});
  const sw=Math.round(Math.sin(t*1.3)*2),lx=60+sw;R(60,0,1,6,'#2a1a10');El(lx,9,6,4,'rgba(255,220,120,.18)');R(lx-2,6,5,5,'#ffd23f');R(lx-1,7,3,3,'#fff27a');R(lx-2,6,5,1,'#8a6f3a');R(lx-2,10,5,1,'#8a6f3a');
  const jy=S.joy>0?-Math.round(Math.abs(Math.sin(S.joy*9))*2):0,ox=60,oy=24+jy;
  SPR.octo(ox,oy,0,t);
  const arm=S.joy>0?Math.sin(t*18):Math.sin(t*2.2);R(ox+6,oy+1,2,2,'#9a6ad6');R(ox+8,oy-1-Math.round(arm*2),2,3,'#9a6ad6');R(ox-8,oy+1,2,2,'#9a6ad6');
  R(ox-10,oy+(S.wave>0?-3+Math.round(Math.sin(t*14)):0),2,3,'#9a6ad6');
  if(Math.sin(t*.9)>.97){R(ox-4,oy-3,2,1,'#b57af2');R(ox+2,oy-3,2,1,'#b57af2')}
  if(S.joy>0){for(let k=0;k<5;k++){const an=k*1.26+t*3,r=10+(1.6-S.joy)*6;if(S.joy>.2)R(Math.round(ox+Math.cos(an)*r),Math.round(oy-4+Math.sin(an)*r*.6),1,1,k%2?'#fff27a':'#ffffff')}}
  R(0,30,CW,CH2-30,'#8a5a2b');R(0,30,CW,2,'#b07a44');R(0,32,CW,1,'#6b4226');for(let x=8;x<CW;x+=16)R(x,33,1,CH2-33,'#6b4226');
  for(let i=0;i<5;i++){const x=24+(i%3)*3,y=28-Math.floor(i/3)*2;R(x,y,2,2,'#f4ecfd');R(x,y,1,1,'#ffffff')}
  El(94,26,4,4,'rgba(191,230,255,.5)');R(92,23,1,1,'#ffffff');R(100,27,3,3,'#e0503f');R(101,25,1,2,'#3fa870');
  for(let i=0;i<6;i++){const x=(i*23+7)%CW,y=CH2-((t*(5+i%3*2)+i*13)%(CH2+4));R(x,y,1,1,'rgba(255,255,255,.6)');R(x+1,y-1,1,1,'rgba(255,255,255,.35)')}
  const c=$('shopCv').getContext('2d');c.imageSmoothingEnabled=false;c.clearRect(0,0,120,44);c.drawImage(pcv,0,0);CW=a;CH2=b}
function frame(ts){
  const dt=Math.min(.034,(ts-last)/1000||0);last=ts;musTick();
  if(G){if(state==='play'||state==='dying')update(dt);if(G){drawWorld();if(state==='play'||state==='dying')updateHUD()}}
  if(!G){menuT+=dt;drawBG(0,menuT*45,menuT);const y=VT*.8+Math.sin(menuT*1.4)*18;
    drawFish(VW*.5,y,Math.sin(menuT*1.4+1.5)*.15,menuT,{s:1.5,...skin()});drawFish(VW*.5-110,y+34,Math.sin(menuT*1.4+1)*.15,menuT+1,{s:.7,c0:'#bff0ff',c1:'#56b8f0',c2:'#2f8fd0'})}
  if(!stQ&&$('sShop').classList.contains('on'))drawShopScene(dt);
  if(stQ)drawCut(dt);else ambOff();if(SV&&!SV.over)svTick(dt*(SAVE.spd||1));
  requestAnimationFrame(frame)}
const _rm=refreshMenu;refreshMenu=()=>{_rm();$('bBook').classList.toggle('hasNew',typeof DEX!=='undefined'&&DEX.some(c=>!c.hid||c.got()?dexNew(c):false));$('bDev').hidden=!SAVE.dev;$('devPause').hidden=!SAVE.dev;$('bConch').hidden=!SAVE.conch;$('bBook').hidden=!SAVE.story.post0;$('bAlways').textContent='进关剧情：'+(SAVE.always?'每次都播':'只播一次');$('bMusic').textContent='音乐：'+(SAVE.music===0?'关':'开');const h=hardOpen(),e=endOpen(),hb=document.querySelector('[data-mode=hard]'),eb=document.querySelector('[data-mode=endless]');
  hb.classList.toggle('locked',!h);eb.classList.toggle('locked',!e);$('hardSub').textContent=h?'挑战极限，成为海底高手！':'🔒 通关普通模式全部关卡后解锁';if(!e)$('bestTxt').textContent='🔒 通关第 1 关后解锁'};
resize();refreshMenu();applyLang();requestAnimationFrame(frame);
if(!SAVE.story.pro){show('sStart');$('sStart').onclick=()=>{initAudio();playStory(STORY.pro,()=>{SAVE.story.pro=1;persist();show('sMenu')})}}
window.__M=MUS;window.__tap=(x,y)=>{const ev={clientX:x,clientY:y},B=G&&G.boss;if(!(B&&B.carry>0?bossTap(ev)||tryCatch(ev):tryCatch(ev)||bossTap(ev)))press()};window.__K={get SV(){return SV},startServe,svTick,svStart,svTapSt,svServe,svGarnish,svSeatTap,svSigNeed,svPending,methodOf,canMake,DISH,get SAVE(){return SAVE}};window.__cut=k=>{const who={shore:'旁白',dAchao:'阿潮',s3whale:'鲸婆婆',ice:'旁白',s4dish:'旁白',shEnd:'海生'}[k];playStory([[who,'这是一句用来检查过场画面的测试对白。',k]],()=>show('sMenu'))};window.__T={startGame,update,press,release:()=>{hold=false},get G(){return G},get state(){return state},dims:()=>({yMin,yMax,fishSX,VW,S}),entY,LV,tap:(ux,uy)=>{const r=cv.getBoundingClientRect();window.__tap(r.left+ux*S,r.top+uy*S)},tideH,gci:gCi,a2v:a2Vent,hd:HD,fork:FORK,lane:a2Lane,capgo:i=>a2CapGo(G,i),slit:a2Slit};
})();
