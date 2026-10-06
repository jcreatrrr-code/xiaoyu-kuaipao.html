/* ---------- more bosses: chase / pipe / team ---------- */
function mkBoss(g){const k=g.L.boss===1?'feed':g.L.boss,hd=g.mode==='hard',fin=g.E.find(q=>q.t==='fin'),mid=(yMin+yMax)/2;
  if(k==='guide')return guideMk(g,hd,fin);if(k==='herd')return herdMk(g,hd,fin);if(k==='light')return lightMk(g,hd,fin);
  if(k==='feed')return{k,hun:0,need:hd?11:8,js:3,carry:0,ph:'idle',t:-2.5,by:mid,sp:1,done:0,fin};
  if(k==='chase')return{k,gap:60,dur:hd?46:38,t:-1.5,nx:0,sy:mid,done:0,fin,reset(){this.gap=60;this.t=-1.5;this.nx=0}};
  if(k==='pipe')return{k,n:0,need:4,chg:0,t:0,js:4,by:mid,hh:60,done:0,fin,reset(){this.n=0;this.chg=0;this.t=0}};
  const chart=hd?[[100,[4,4,2]],[120,[2,2,2,2]],[138,[2,1,2,1,2]],[150,[2,2]]]:[[92,[4,4,4]],[110,[2,2,2,2]],[124,[2,2,2]]];
  return{k:'team',chart,total:chart.reduce((a,c)=>a+c[1].length,0),i:0,obs:[],orbs:0,cd:{},t:-2.5,bt:0,half:0,ci:0,gi:0,cnt:2,sp:0,bpm:chart[0][0],done:0,fin,
    reset(){this.i=0;this.obs=[];this.orbs=0;this.t=-2;this.msg=0;this.cd={};this.bt=0;this.half=0;this.ci=0;this.gi=0;this.cnt=2;this.sp=0;this.bpm=this.chart[0][0];this.ot=2.5}}}
const TPROG=[[52,[0,3,7]],[48,[0,4,7]],[55,[0,4,7]],[50,[0,4,7]]],TLINE=()=>fishSX+56;
function teamTick(B){const g=G,h=B.half++,beat=h>>1,on=h%2===0,au=AC&&MUS.out&&AC.state==='running'&&SAVE.music!==0,t=au?AC.currentTime+.02:0,ch=TPROG[(beat>>2)%4],bl=60/B.bpm;
  if(au){if(on){mKick(t);mNote(ch[0]-12,t,bl*.9,'sine',.16);if(beat%2===1){const sn=AC.createBufferSource(),f=AC.createBiquadFilter(),gn=AC.createGain();sn.buffer=MUS.noise;f.type='bandpass';f.frequency.value=1900;gn.gain.setValueAtTime(.09,t);gn.gain.exponentialRampToValueAtTime(.001,t+.13);sn.connect(f);f.connect(gn);gn.connect(MUS.out);sn.start(t);sn.stop(t+.15)}}
    else mHat(t);const ar=ch[1][h%3]+(h%4>1?12:0);mNote(ch[0]+12+ar,t,bl*.45,'triangle',.05);if(on&&beat%4===0)mNote(ch[0]+24+ch[1][2],t,bl*1.8,'sine',.06)}
  if(!on)return;B.pulse=1;
  if(B.sp<B.total&&--B.cnt<=0){const ty=['wall','net','door','fog'],k=ty[Math.floor(Math.random()*4)],x0=VW+130,lead=4;B.obs.push({ty:k,x:x0,v:(x0-TLINE())/(lead*bl)});B.sp++;
    if(au)mNote({wall:55,net:62,door:67,fog:74}[k]+12,t,.25,'square',.07);
    let sec=B.chart[B.ci];B.cnt=sec[1][B.gi];B.gi++;if(B.gi>=sec[1].length&&B.ci<B.chart.length-1){B.ci++;B.gi=0;B.bpm=B.chart[B.ci][0];toast(B.bpm>=120?'节奏加快了！':'跟上节拍',1.4)}}}

const BOSSMSG={feed:'大白来了，它饿坏了！点游过的鱼抓住它，再点大白把鱼喂给它',chase:'大白追上来了！沿着珍珠游才能甩开它，撞到东西会被它追近',pipe:'收光船的光管垂下来了！稳稳待在光带里把它充爆，一共四根',team:'最后一段路一个人过不去——看清前面是什么，点对帮手！'};
const HELPERS=[['🦈','wall','大白'],['🐙','net','墨墨'],['🦀','door','石蟹'],['🐋','fog','鲸婆婆']];
const teamBtn=i=>[VW*(.14+.24*i),Math.min(VT-48*U,yMax+56),Math.max(36,32*U)];
function bossWin(B,msg){const g=G;B.done=1;g.sharks=[];g.inv=3;g.flash=.6;g.shake=.5;g.bonus+=300;CSND.crash();SFX.win();for(const e of g.E)if(e.x>g.scroll-100&&(e.t==='wild'||e.t==='jelly'||e.t==='rock'||e.t==='torb'))e.gone=1;if(B.fin)B.fin.x=g.scroll+VW+500;toast(msg,3.4)}
function bossUpd(B,dt){if(B.k==='guide')return guideUpd(B,dt);if(B.k==='herd')return herdUpd(B,dt);if(B.k==='light')return lightUpd(B,dt);const g=G,F=g.fish,hd=g.mode==='hard',k=clamp((yMax-yMin)/544,.85,1.45);B.t+=dt;
  if(B.k==='chase'){B.sy+=(F.y-B.sy)*Math.min(1,dt*3);if(B.t<0)return;
    if(!B.nx||B.nx<g.scroll+VW)B.nx=g.scroll+VW+260;while(B.nx<g.scroll+VW+900){const nm=['pearls','pearls','rockB','rockT','gate','jelly'];PAT[nm[Math.floor(Math.random()*nm.length)]](g.gen,B.nx,.6);B.nx+=hd?330:390}
    B.gap-=(hd?3.7:2.9)*dt;if(B.gap<=0){die('shark');return}
    if(B.t>=B.dur)bossWin(B,'甩开了！大白慢了下来——它已经饿得游不动了')}
  else if(B.k==='pipe'){const w=Math.min(1,.55+.16*B.n),f=.5+.25*Math.sin(B.t*w+B.n*2)+.03*Math.sin(B.t*2.7),hh=(yMax-yMin)*(hd?.084:.1);B.by=fy(f);B.hh=hh;B.inb=Math.abs(F.y-B.by)<hh;
    B.chg=clamp(B.chg+(B.inb?dt/(hd?5.5:4.5):-dt*.22),0,1);B.dir=Math.floor(B.t/2.8)%2?1:-1;if(B.t>1.5)F.y+=B.dir*(hd?112:90)*k*dt;
    B.js-=dt;if(B.js<=0){B.js=hd?4.8:4;g.E.push({t:'jelly',x:g.scroll+VW+60,f:clamp(f+(Math.random()<.5?-1:1)*(.16+Math.random()*.1),.12,.88),amp:.08,ph:Math.random()*6,sp:1.2})}
    if(B.chg>=1){B.n++;B.chg=0;g.flash=.4;g.shake=.3;CSND.crash();if(B.n>=B.need)bossWin(B,'四根光管都断开了！收光船失去了动力');else toast(`断开了第 ${B.n} 根！还剩 ${B.need-B.n} 根，光带更快了`,2.4)}}
  else{if(B.t<0)return;for(const h in B.cd)B.cd[h]=Math.max(0,B.cd[h]-dt);B.pulse=Math.max(0,(B.pulse||0)-dt*3.2);
    B.bt+=dt;const hl=30/B.bpm;while(B.bt>=hl){B.bt-=hl;teamTick(B)}
    for(const o of B.obs)o.x-=o.v*dt;
    while(B.obs.length&&B.obs[0].x<TLINE()){B.obs.shift();B.i++;ftext('没叫对帮手！',fishSX+20,F.y-56,'#ffb3b3');g.inv=0;hurt(1);if(state!=='play'||B!==g.boss||B.i===0)return}
    B.ot=(B.ot===undefined?2.5:B.ot)-dt;if(B.ot<=0&&B.orbs<5&&!g.E.some(e=>e.t==='torb'&&!e.gone&&e.x>g.scroll)){B.ot=3.2;g.E.push({t:'torb',x:g.scroll+VW+60,f:.2+Math.random()*.6})}
    if(B.i>=B.total&&!B.obs.length){if(B.orbs>=5)bossWin(B,'五颗潮心都接住了！大家一起把它们送了回去');else if(!B.msg){B.msg=1;toast('难关都过了！把剩下的潮心接住',2.6)}}}}
function bossTap2(B,ux,uy){if(B.k==='guide')return guideTap(B,ux,uy);if(B.k==='herd'||B.k==='light'){return true}if(B.k!=='team'||B.t<0)return false;const g=G;
  for(let i=0;i<4;i++){const[bx,by,r]=teamBtn(i);if(Math.hypot(ux-bx,uy-by)>r*1.25)continue;const h=HELPERS[i],o=B.obs[0];if(B.cd[h[1]]>0)return true;
    if(o&&o.ty===h[1]){const fr=B.bt/(30/B.bpm),beat=(B.half%2===1?fr<.3:fr>.7);burst(o.x,(yMin+yMax)/2,'#ffd23f',26);ftext(h[2]+(beat?'：合拍！+30':'：交给我！'),Math.min(o.x,VW-170),yMin+74,beat?'#bff6e6':'#ffe27a');if(beat)g.bonus+=30;SFX.save();if(h[1]==='wall')CSND.crash();g.shake=.2;B.obs.shift();B.i++}
    else{B.cd[h[1]]=1.8;SFX.hit();ftext(o?'不是'+h[2]+'的活儿！':'还没到时候',bx-40,by-60,'#ffb3b3')}
    return true}
  return false}
function bossDraw2(B,t){if(B.k==='guide')return guideDraw(B,t);if(B.k==='herd')return herdDraw(B,t);if(B.k==='light')return lightDraw(B,t);const g=G,F=g.fish;
  if(B.k==='chase'){const sx=fishSX-70-Math.max(0,B.gap)*2.4;ctx.save();ctx.translate(sx,B.sy+Math.sin(t*9)*4);ctx.scale(-1,1);drawShark(0,0,t*1.6);ctx.restore()}
  else if(B.k==='pipe'){ctx.save();ctx.fillStyle=B.inb?'rgba(255,236,140,.3)':'rgba(255,236,140,.15)';ctx.fillRect(0,B.by-B.hh,VW,B.hh*2);ctx.strokeStyle='rgba(255,240,170,.9)';ctx.lineWidth=3;ctx.setLineDash([18,12]);ctx.lineDashOffset=-t*90;
    ctx.beginPath();ctx.moveTo(0,B.by-B.hh);ctx.lineTo(VW,B.by-B.hh);ctx.moveTo(0,B.by+B.hh);ctx.lineTo(VW,B.by+B.hh);ctx.stroke();ctx.setLineDash([]);
    const px2=VW*.72;ctx.fillStyle='#5f7080';ctx.fillRect(px2-13,0,26,B.by-B.hh);ctx.fillStyle='#c9a85a';ctx.fillRect(px2-20,B.by-B.hh-14,40,14);
    ctx.strokeStyle='rgba(220,245,255,.6)';ctx.lineWidth=4;ctx.lineCap='round';for(let i=0;i<3;i++){const ax=30+i*((VW-60)/2),ay=((t*140*B.dir+i*90)%220+220)%220+yMin+40;ctx.beginPath();ctx.moveTo(ax-10,ay-B.dir*10);ctx.lineTo(ax,ay+B.dir*8);ctx.lineTo(ax+10,ay-B.dir*10);ctx.stroke()}
    ctx.strokeStyle='rgba(255,255,255,.35)';ctx.lineWidth=7;ctx.beginPath();ctx.arc(fishSX,F.y,40,0,TAU);ctx.stroke();ctx.strokeStyle=B.inb?'#ffd23f':'#ffb38a';ctx.beginPath();ctx.arc(fishSX,F.y,40,-Math.PI/2,-Math.PI/2+TAU*B.chg);ctx.stroke();ctx.restore()}
  else if(B.k==='team'&&B.t>=0){const lx=TLINE(),p=B.pulse||0;ctx.save();ctx.strokeStyle=`rgba(255,255,255,${.35+.5*p})`;ctx.lineWidth=3+5*p;ctx.setLineDash([14,12]);ctx.beginPath();ctx.moveTo(lx,yMin);ctx.lineTo(lx,yMax+30);ctx.stroke();ctx.setLineDash([]);
    for(const o of B.obs){const x=o.x,ty=o.ty,y0=yMin,y1=yMax+40;ctx.save();
      if(ty==='wall'){ctx.shadowColor='#ffe45c';ctx.shadowBlur=24;const gr=ctx.createLinearGradient(x-24,0,x+24,0);gr.addColorStop(0,'#ffb300');gr.addColorStop(.5,'#fff27a');gr.addColorStop(1,'#ffb300');ctx.fillStyle=gr;ctx.fillRect(x-24,y0-40,48,y1-y0+40)}
      else if(ty==='net'){for(let yy=y0+60;yy<y1;yy+=120)drawNet(x,yy,t)}
      else if(ty==='door'){const gr=ctx.createLinearGradient(x-26,0,x+26,0);gr.addColorStop(0,'#7f9a8a');gr.addColorStop(.5,'#b9ccba');gr.addColorStop(1,'#7f9a8a');ctx.fillStyle=gr;ctx.fillRect(x-26,y0-40,52,y1-y0+40);ctx.fillStyle='#ff8a5a';circ(x,(y0+y1)/2,12)}
      else{ctx.fillStyle='rgba(20,14,50,.92)';for(let yy=y0;yy<y1+40;yy+=70)circ(x+Math.sin(t*2+yy)*10,yy,64);ctx.fillStyle='#ff5a5a';for(let i=0;i<3;i++){const ey=y0+120+i*(y1-y0-200)/2;circ(x-14,ey,5);circ(x+14,ey,5)}}
      ctx.restore()}
    ctx.restore()}}
function bossHud2(B,t){if(B.k==='guide')return guideHud(B,t);if(B.k==='herd')return herdHud(B,t);if(B.k==='light')return lightHud(B,t);const g=G,hd=g.mode==='hard',w=Math.min(VW-40*U,300*U),x0=(VW-w)/2,y0=yMin+8*U,h=20*U;ctx.save();ctx.textAlign='center';ctx.font=`${14*U}px ${FONT}`;
  const bar=(f,col,lab,yy)=>{ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,yy-4*U,w+8*U,h+8*U);ctx.fillStyle=col;ctx.fillRect(x0,yy,w*clamp(f,0,1),h);ctx.fillStyle='#fff';ctx.fillText(lab,VW/2,yy+h-5*U)};
  if(B.k==='chase'){bar(B.gap/100,B.gap<25?'#ff7a6b':'#4fe0b5','和大白的距离',y0);bar(Math.max(0,B.t)/B.dur,'#ffd23f','再坚持 '+Math.max(0,Math.ceil(B.dur-B.t))+' 秒',y0+h+12*U);
    if(B.gap<25){const a=.25+.2*Math.sin(t*12),gr=ctx.createLinearGradient(0,0,VW*.5,0);gr.addColorStop(0,`rgba(255,40,40,${a})`);gr.addColorStop(1,'rgba(255,0,0,0)');ctx.fillStyle=gr;ctx.fillRect(0,0,VW*.5,VT)}}
  else if(B.k==='pipe'){ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,y0-4*U,w+8*U,h+8*U);const sg=w/B.need;for(let i=0;i<B.need;i++){ctx.fillStyle=i<B.n?'#4fe0b5':'rgba(255,255,255,.25)';ctx.fillRect(x0+i*sg+2*U,y0,sg-4*U,h);if(i===B.n){ctx.fillStyle='#ffd23f';ctx.fillRect(x0+i*sg+2*U,y0,(sg-4*U)*B.chg,h)}}
    ctx.fillStyle='#fff';ctx.fillText(B.inb?'稳住！正在充能':'回到光带里！',VW/2,y0+h+18*U)}
  else{ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,y0-4*U,w+8*U,h+8*U);ctx.fillStyle='#fff';ctx.fillText(B.total?`还剩 ${Math.max(0,B.total-B.i)} 道难关 · 潮心 ${B.orbs} / 5`:'准备——',VW/2,y0+h-5*U);
    const hint=!hd&&B.i<3&&B.obs[0]?B.obs[0].ty:null,pu=B.pulse||0;
    for(let i=0;i<4;i++){const[bx,by,r]=teamBtn(i),hp=HELPERS[i],cd=B.cd[hp[1]]>0;ctx.globalAlpha=cd?.4:1;ctx.fillStyle=hint===hp[1]?'#ffd23f':'#fffdf4';ctx.shadowColor='rgba(6,40,70,.5)';ctx.shadowBlur=0;ctx.beginPath();ctx.arc(bx,by+4*U,r,0,TAU);ctx.fillStyle='rgba(6,40,70,.35)';ctx.fill();ctx.fillStyle=hint===hp[1]?'#ffd23f':'#fffdf4';circ(bx,by,r*(1+.1*pu)+(hint===hp[1]?Math.sin(t*10)*3:0));
      ctx.font=`${r*1.05}px serif`;ctx.textBaseline='middle';ctx.fillStyle='#000';ctx.fillText(hp[0],bx,by+2);ctx.textBaseline='alphabetic';ctx.globalAlpha=1}}
  ctx.restore()}
function bossPos(){return[VW-Math.min(170,VW*.3),G.boss.by]}
const bossOpen=B=>B.ph==='idle'&&B.t>0&&B.t%2.6<1.5;
function bossTap(ev){const g=G;if(state!=='play'||!g||!g.boss||g.boss.done||g.trap)return false;const B=g.boss,r=cv.getBoundingClientRect(),ux=(ev.clientX-r.left)/S,uy=(ev.clientY-r.top)/S;if(B.k!=='feed')return bossTap2(B,ux,uy);const[bx,by]=bossPos();
  if(B.ph!=='idle'||Math.abs(ux-bx+30)>150||Math.abs(uy-by)>95)return false;
  if(B.carry<=0){toast('先点游过的鱼，抓到了再喂它',1.6);return true}
  if(!bossOpen(B)){toast('它闭着嘴呢，等它张嘴再喂',1.3);SFX.tap();return true}
  B.carry--;B.hun++;SFX.save();CSND.growl();burst(bx-110,by+10,'#ffd23f',14);ftext(B.hun>=B.need?'吃饱了！':'咕！还要！',bx-170,by-70,'#ffe27a');
  if(B.hun>=B.need){B.done=1;g.sharks=[];g.inv=3;g.flash=.6;g.shake=.5;g.bonus+=300;CSND.crash();SFX.win();for(const e of g.E)if(e.t==='wild'&&e.x>g.scroll)e.gone=1;if(B.fin)B.fin.x=g.scroll+VW+500;toast('大白吃饱了！它转身撞开了黄色的墙',3.4)}
  return true}
function bossRetry(){const g=G,B=g.boss;if(B.k!=='feed'){g.life=Math.max(1,g.cpLife||1);g.inv=2.5;g.sharks=[];g.trap=null;g.flash=.5;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;SFX.hit();for(const e of g.E)if(e.x>g.scroll-100&&(e.t==='jelly'||e.t==='rock'||e.t==='torb'||e.t==='pearl'&&B.k==='chase'))e.gone=1;B.reset();toast('再来一次！（第 '+(B.tries+1)+' 次挑战）',2.6,1);return}
  g.life=Math.max(1,g.cpLife||1);g.inv=2.5;g.sharks=[];g.trap=null;g.flash=.5;B.hun=0;B.carry=0;B.ph='idle';B.t=-2;B.dbl=0;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;SFX.hit();for(const e of g.E)if((e.t==='jelly'||e.t==='wild')&&e.x>g.scroll-100)e.gone=1;toast('被大白顶了回来。从头再喂一次！（第 '+(B.tries+1)+' 次挑战）',2.8,1)}
function score(){const g=G;return Math.floor(g.scroll/60)*10+g.pearls*20+g.bonus}

function entY(e,t){switch(e.t){
  case'pearl':return fy(e.f)+Math.sin(t*3+e.x)*4+(e.py||0);
  case'octo':return fy(e.f)+Math.sin(t*1.2+e.ph)*14;
  case'jelly':return fy(clamp(e.f+Math.sin(t*e.sp+e.ph)*e.amp,.07,.93));
  case'net':return fy(e.f+Math.sin(t*.9+e.ph)*e.amp);
  case'wild':return fy(clamp(e.f+Math.sin(t*1.3+e.ph)*.05,.06,.94));
  case'ice':return fy(((e.ph+t*e.sp)%1.3+1.3)%1.3-.15);
  default:return fy(e.f||.5)}}
const octoR=(e,t)=>{const c=(t+e.ph)%3.4;return c<2.8?38:38+34*Math.sin((c-2.8)/.6*Math.PI)};
const octoWarn=(e,t)=>{const c=(t+e.ph)%3.4;return c>=2&&c<2.8};

function update(dt){
  const g=G;g.t+=dt;const t=g.t,F=g.fish;
  g.inv=Math.max(0,g.inv-dt);g.slowT=Math.max(0,g.slowT-dt);g.shake=Math.max(0,g.shake-dt);g.flash=Math.max(0,g.flash-dt);
  for(const p of g.parts){p.x+=p.vx*dt;p.y+=p.vy*dt;p.l-=dt;if(p.k)p.vy-=200*dt;else p.vy+=260*dt}
  if(g.parts.length>160)g.parts.splice(0,g.parts.length-160);
  g.parts=g.parts.filter(p=>p.l>0);for(const x of g.texts){x.t-=dt;x.y-=40*dt}g.texts=g.texts.filter(x=>x.t>0);
  if(state==='dying'){g.dead-=dt;F.y=Math.max(yMin+20,F.y-50*dt);if(g.dead<=0)showEnd(false);return}
  if(g.boss&&!g.boss.done&&g.boss.mini){if(g.boss.fin)g.boss.fin.x=g.scroll+VW+4000;bossUpd(g.boss,dt);return}
  const ph=yMax-yMin,k=clamp(ph/544,.85,1.45),endless=g.mode==='endless';
  if(endless){
    const lv=Math.floor(g.scroll/60/200);if(lv!==g.lvl){g.lvl=lv;g.theme=lv%5;g.flash=.4;toast(`难度提升！Lv.${lv+1} · ${TH[g.theme].n}`,2.2)}
    g.speed=Math.min(290,165+16*g.lvl);while(g.gen.x<g.scroll+VW+1400)genSlot(g.gen);
    g.pruneT+=dt;if(g.pruneT>2){g.pruneT=0;const lim=g.scroll-500;g.E=g.gen.E=g.E.filter(e=>!e.gone&&e.x+(e.dx||0)>lim)}
  }else g.speed=(g.mode==='hard'?205:150)*(g.L.spd||1);
  if(g.buff.slow)g.speed*=.85;if(g.boost>0){g.speed*=1.45;g.boost-=dt}if(g.boss&&!g.boss.done&&g.boss.k==='chase'&&g.boss.t>0)g.speed*=1.35;
  if(g.lcap)a2CapUpd(g,dt);else if(g.trap){const tr=g.trap;tr.t-=dt;if(g.mode!=='simple')tr.p=Math.max(0,tr.p-1.5*dt);F.vy=0;
    if(tr.t<=0){if(g.mode==='simple'){tr.e.gone=1;g.trap=null;g.life=Math.max(0,g.life-1);g.noDmg=false;g.combo=0;g.inv=1.8;SFX.hit();
        if(g.life<=0)die('net');else toast('渔网松开了，下次点快一点！',2)}else die('net')}
  }else{
    g.scroll+=g.speed*dt;
    const up=(g.slowT>0?180:330)*k*(g.boss&&!g.boss.done?1-.13*(g.boss.carry||0):1),dn=(g.mode==='simple'?165:215)*k,tv=hold?-up:g.started?dn:0;
    F.vy+=(tv-F.vy)*Math.min(1,dt*7);F.y+=F.vy*dt;
    if(F.y<yMin+22){F.y=yMin+22;F.vy=0}if(g.orb){const o=g.orb;if(!o.y)o.y=F.y;o.y+=(F.y-o.y)*Math.min(1,dt*2.4);o.inv=Math.max(0,o.inv-dt)}if(F.y>yMax-18){F.y=yMax-18;if(g.inv<=0){hurt(1);F.vy=-300*k;if(!g.tips.floor){g.tips.floor=1;toast('碰到海底也会掉星！',2.2,1)}}else if(F.vy>0)F.vy=0}
    if(g.L&&g.L.vol===2)v2Move(g,dt,k);
    g.bubT-=dt;if(g.bubT<=0){g.bubT=.22;g.parts.push({x:fishSX-34,y:F.y,vx:-40,vy:-20,l:.9,c:'#fff',r:2+Math.random()*3,k:1})}
  }
  const fx=fishSX;
  for(const e of g.E){
    if(e.gone)continue;const sx=e.x+(e.dx||0)-g.scroll;if(sx<-200-(e.L||0)||sx>VW+320)continue;
    if(!SAVE.sight[e.t]&&sx<VW-20)SAVE.sight[e.t]=1;
    {const tp=g.L&&g.L.vol===2&&TIPS2[e.t]||TIPS[e.t];if(g.mode==='simple'&&!g.boss&&tp&&!g.tips[e.t]&&sx<VW-20&&t>5){g.tips[e.t]=1;toast(tp,2.6)}}
    const y=entY(e,t),dx=sx-fx,dy=y-F.y,dist=Math.hypot(dx,dy);
    if(g.leap&&LEAPSAFE[e.t])continue;
    if(g.orb&&g.orb.inv<=0){const ox=fx-78,oy=g.orb.y,od=Math.hypot(sx-ox,y-oy);let hit=false;
      if(e.t==='rock'){const hw=e.w/2-12,ry=e.top?fy(e.h)-12:fy(1-e.h)+12;hit=Math.abs(sx-ox)<hw+12&&(e.top?oy-14<ry:oy+14>ry)}
      else if(e.t==='octo')hit=od<octoR(e,t)+12;else if(e.t==='jelly')hit=od<40;else if(e.t==='ice')hit=od<44;
      if(hit&&!(SAVE.god&&SAVE.dev)){g.orb.hp--;g.orb.inv=1.6;SFX.hit();g.shake=.25;burst(ox,oy,'#bff6ff',12);ftext('潮心被撞到了！',fx,F.y-56,'#ffb3b3');if(g.orb.hp<=0){die('orb');if(state!=='play')return;g.orb.hp=2}}}
    switch(e.t){
    case'fnet':v2Hit(g,e,sx,y,dx,dt);break;
    case'fork':case'vent':case'lamp':a2Hit(g,e,sx,y,dx,dist,dt,k);break;
    case'lava':case'pumice':case'sline':a3Hit(g,e,sx,y,dx,dt);break;
    case'pearl':if(sx>fx)e.miss=0;else if(sx<fx-(g.magnet?120:50)&&!e.miss&&!e.air){e.miss=1;if(g.combo>=3)ftext('连击断了',fx+30,F.y-56,'#b8c7d9');g.combo=0}
      if(g.magnet&&dist<190&&dist>=38&&!g.trap){const k=Math.min(1,dt*(dist<115?9:5));e.dx=(e.dx||0)-dx*k;e.py=(e.py||0)-dy*k}
      if(dist<38&&!g.trap){e.gone=1;if(g.boss&&g.boss.k==='chase'&&!g.boss.done)g.boss.gap=Math.min(100,g.boss.gap+1.05);g.pearls+=e.air?2:1;if(e.air)burst(sx,y,'#ffe27a',6,1);g.combo++;g.comboT=3.5;g.maxCombo=Math.max(g.maxCombo,g.combo);SFX.pearl(g.combo);burst(sx,y,'#fff',4,1);
        if(g.combo%10===0){g.pearls+=5;ftext(`连击 ${g.combo}！+5 ⚪`,fx+30,F.y-56,'#ffe27a');SFX.pearl(12)}}break;
    case'rock':{const hw=e.w/2-12,ry=e.top?fy(e.h)-12:fy(1-e.h)+12;
        if(Math.abs(dx)<hw+16&&(e.top?F.y-18<ry:F.y+18>ry))hurt(1)}break;
    case'octo':if(dist<octoR(e,t)+16)hurt(1);break;
    case'jelly':if(dist<46&&hurt(1))g.slowT=1.5;break;
    case'ice':if(dist<48)hurt(1);break;
    case'net':if(!g.trap)e.dx=(e.dx||0)-35*dt;
        if(dist<66&&!g.trap&&g.inv<=0){if(g.shield||g.whale){absorb();e.gone=1;burst(sx,y,'#f5e6c0',14)}
          else if(g.buff.scissors){g.buff.scissors=false;e.gone=1;g.inv=1.2;SFX.free();burst(sx,y,'#f5e6c0',16);ftext('剪刀剪开了渔网！',fx,F.y-56,'#ffe27a')}
          else{const T=g.mode==='simple'?6:endless?Math.max(4,10-g.lvl):10;g.trap={t:T,T,p:0,need:g.mode==='simple'?8:14,e};e.hold=1;g.combo=0;SFX.hit();
            toast(g.mode==='simple'?'最后机会！快速连点屏幕！':'被网住了！快速连点挣脱！',2,1)}}break;
    case'sharkT':if(!e.trig&&sx<VW+150&&!g.trap&&!g.E.some(w=>w.t==='wall'&&!w.broken&&!w.gone&&w.x-g.scroll-fx>-60&&w.x-g.scroll-fx<620)){e.trig=1;const T=(g.mode==='simple'?2.3:1.6)+(g.buff.radar?1:0);
        g.sharks.push({ph:0,t:0,T,y:F.y,sx:0,v:g.mode==='simple'?620:endless?Math.min(900,700+20*g.lvl):820,al:0});toast('注意！鲨鱼来了！',1.6,1)}break;
    case'wall':if(!e.broken&&g.inv<=0&&Math.abs(dx)<34&&(e.top?F.y-16<fy(e.h):F.y+16>fy(1-e.h))){
        if(g.shield||g.whale){absorb();e.broken=1;burst(sx,F.y,'#ffd23f',18)}
        else if(endless){e.broken=1;hurt(1)}else restoreCP()}break;
    case'mimic':if(!e.aw&&dist<135){e.aw=.01;SFX.hit()}if(e.aw){e.aw+=dt;if(e.aw>1.9)e.gone=1;else if(e.aw>.25&&dist<60)hurt(1)}break;
    case'cur':if(fx>sx&&fx<sx+e.w&&!g.trap)F.y+=e.dir*150*k*dt;break;
    case'beam':{const by=fy(.5+.3*Math.sin(t*e.sp+e.ph)),hh=(yMax-yMin)*.16;if(Math.abs(dx)<42&&Math.abs(F.y-by)<hh&&hurt(1))toast('被探照灯照到了！',1.4,1)}break;
    case'help':if(!e.hit&&dx<0){e.hit=1;SFX.win();toast(e.who+'来帮忙了！',2.2);
        if(e.k==='whale')g.whale=true;else if(e.k==='gold')g.shield=true;else if(e.k==='doors'){for(const q of g.E)if(q.t==='door')q.open=1}
        else for(const q of g.E)if(q.x>e.x&&q.x<e.x+2600){if(q.t==='net')q.gone=1;if(q.t==='sharkT')q.trig=1;if(q.t==='wall')q.broken=1}}break;
    case'boss':if(!g.boss&&dx<0){e.gone=1;g.cp=e.x-fishSX;g.sharks=[];g.tips.wild=1;g.cpLife=g.life;g.boss=mkBoss(g);g.flash=.4;CSND.growl();
        toast(BOSSMSG[g.boss.k],4.4)}break;
    case'torb':if(dist<50){e.gone=1;if(g.boss)g.boss.orbs++;SFX.shield();burst(sx,y,'#9ff0ff',16);ftext('接住了一颗潮心！',fx+20,F.y-56,'#bff6ff')}break;
    case'btn':if(!e.on&&dist<50){e.on=1;e.d.open=1;SFX.shield();burst(sx,y,'#4fe0b5',14);ftext('石门打开了！',fx+20,F.y-56,'#bff6e6')}break;
    case'door':if(e.open)e.a=Math.min(1,e.a+dt*2.5);else if(g.inv<=0&&Math.abs(dx)<34){
        if(g.shield||g.whale){absorb();e.open=1;burst(sx,F.y,'#ffd23f',18)}else if(endless){e.open=1;hurt(1)}else restoreCP('石门关着！先碰亮贝壳按钮，回到检查点')}break;
    case'vortex':{const R=e.r*1.7;if(dist<R&&!g.trap){const pull=190*k*(1-dist/R);F.y+=Math.sign(dy)*Math.min(Math.abs(dy),pull*dt)}}break;
    case'shield':if(dist<46){e.gone=1;if(g.shield)g.bonus+=50;g.shield=true;SFX.shield();burst(sx,y,'#ffd23f',14);toast('金鱼结界已开启！',1.6)}break;
    case'friend':if(dist<54){e.gone=1;g.rescued++;g.bonus+=100;SFX.save();burst(sx,y,'#fff',14,1);ftext('救出小伙伴！',fx+20,F.y-56,'#bff6ff')}break;
    case'wild':if(!g.trap)e.dx=(e.dx||0)+FISH[e.k].v*dt;if(!g.tips.wild&&sx<VW-40&&t>4){g.tips.wild=1;toast('用手指点一下带圆圈的鱼，就能捕获它！',3)}break;
    case'cp':if(!e.hit&&dx<0){e.hit=1;g.cp=e.x-fishSX;g.cpLife=g.life;SFX.shield()}break;
    case'fin':if(dx+fishSX<0){finish();return}break;
    }
    if(state!=='play')return;
  }
  if(g.boss&&!g.boss.done&&g.boss.k!=='feed'){if(g.boss.fin)g.boss.fin.x=g.scroll+VW+4000;bossUpd(g.boss,dt);if(state!=='play')return}
  if(g.boss&&!g.boss.done&&g.boss.k==='feed'){const B=g.boss,hd=g.mode==='hard';B.t+=dt;B.sp-=dt;B.by+=(((yMin+yMax)/2+Math.sin(g.t*.9)*(yMax-yMin)*.22)-B.by)*Math.min(1,dt*2);if(B.fin)B.fin.x=g.scroll+VW+4000;
    if(B.sp<=0){B.sp=hd?1.5:2;const ks=g.L.fish.filter(k=>k!=='gold'&&k!=='sword'),k=ks[Math.floor(Math.random()*ks.length)];g.E.push({t:'wild',k,x:g.scroll+VW+70,f:.12+Math.random()*.76,ph:Math.random()*6,hp:Math.min(2,FISH[k].hp)})}
    B.js-=dt;if(B.js<=0){B.js=(hd?2.4:3.4)-B.hun/B.need;g.E.push({t:'jelly',x:g.scroll+VW+60,f:.25+Math.random()*.5,amp:.2,ph:Math.random()*6,sp:1.2})}
    if(B.ph==='idle'&&B.t>(B.dbl===1?.7:(hd?3.2:4.5)-1.4*B.hun/B.need)){B.ph='dash';B.t=0;B.dbl=B.dbl===1?2:(B.hun>=B.need/2?1:0);g.sharks.push({ph:0,t:0,T:hd?1.3:1.8,y:F.y,sx:0,v:hd?880:680,al:0});toast('大白冲过来了！躲开红色水带',1.5,1)}
    else if(B.ph==='dash'&&!g.sharks.length){B.ph='idle';B.t=0;if(B.dbl===2)B.dbl=0}}
  for(const s of g.sharks){s.t+=dt;
    if(s.ph===0){if(s.t<s.T*.6)s.y=lerp(s.y,F.y,Math.min(1,dt*5));s.al-=dt;if(s.al<=0){s.al=.5;SFX.alarm()}
      if(s.t>=s.T){s.ph=1;s.sx=VW+260}}
    else{s.sx-=s.v*dt;if(!g.trap&&!s.blk&&((fx-s.sx+10)/128)**2+((F.y-s.y)/60)**2<1){if(g.whale){s.blk=1;useWhale(1)}else{die('shark');return}}}}
  g.sharks=g.sharks.filter(s=>s.ph===0||s.sx>-320);
}
function finish(){
  const g=G,L=g.L,hi=g.mode==='hard'?1:0,ok=L.goal.k==='pearl'?g.pearls>=L.goal.n[hi]:L.goal.k==='rescue'?g.rescued>=L.goal.n[hi]:L.goal.k==='gather'?gcount(g)>=L.goal.n[hi]:true;
  if(!ok){g.cause='goal';showEnd(false);return}
  const prev=SAVE[g.mode].st[g.li]>0,s2=g.pearls>=L.extra[hi],s3=g.life>=(hi?1:2),s4=prev&&g.noDmg&&s2;
  if(g.noDmg)SAVE.stat.nodmg=1;const sv=SAVE[g.mode];sv.st[g.li]=Math.max(sv.st[g.li],1+s2+s3);if(s4)sv.s4[g.li]=1;persist();SFX.win();
  const end0=()=>showEnd(true,[1,s2,s3,s4],prev),k='post'+g.li,end=()=>{if(g.li===VOL1+11&&!SAVE.feast2&&!SAVE.story.feast2){state='over';hud.hidden=true;startFeast2()}else end0()};
  if(!SAVE.story[k]||SAVE.always){state='over';hud.hidden=true;$('toast').className='';playStory(SAVE.story[k]?seenLines(k):STORY[k],()=>{SAVE.story[k]=1;if(g.li===10)SAVE.conch=1;persist();end()})}else end()}

