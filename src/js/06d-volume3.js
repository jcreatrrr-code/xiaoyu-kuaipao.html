/* ---------- 第三卷 雾海群屿 第一幕：雾湾、退潮滩、钟声礁、潮门 ---------- */
const VOL2=24,v3Open=()=>cleared(VOL2-1),volStart=v=>v===3?VOL2:v===2?VOL1:0;
TH.push(
 {n:'雾湾',top:'#9aa6b0',bot:'#28323e',far:'#7a8692',mid:'#5a6672',sand:'#6a6460',rock:'#3a3c42',rock2:'#26282e',weed:'#7a8a7a'},
 {n:'退潮滩',top:'#a8a69a',bot:'#3a3a36',far:'#8a8a7e',mid:'#6a6a60',sand:'#5a5044',rock:'#6a5a48',rock2:'#4a3e30',weed:'#7a8a6a'},
 {n:'钟声礁',top:'#5a6878',bot:'#10161e',far:'#465464',mid:'#344250',sand:'#3a3c40',rock:'#2e3036',rock2:'#1e2026',weed:'#5a6a6a'},
 {n:'潮门',top:'#7a8898',bot:'#18222e',far:'#5e6c7c',mid:'#465464',sand:'#4a4a4a',rock:'#34363c',rock2:'#22242a',weed:'#6a7a7a'});
LV.push(
 {name:'雾湾',vol:3,fish:['sard','yellow','mack'],len:200,theme:24,fog:1,nodes:['croaker'],gname:'大黄鱼',pool:{pearls:3,rockB:2,rockT:2,octo:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'退潮滩',vol:3,fish:['eel','bream','yellow'],len:210,theme:25,ebb:1,tool:'chook',nodes:['razor'],gname:'蛏子',pool:{pearls:2,rockB:6,octo:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'钟声礁',vol:3,fish:['cod','mack','saury'],len:210,theme:26,bell:1,nodes:['kelp'],gname:'海带',pool:{pearls:2,rockB:3,rockT:3,gate:2,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'潮门',vol:3,fish:['sard','mack'],len:200,theme:27,fog:1,boss:'bore',gtxt:'听钟声选路，躲过涌潮',pool:{pearls:2,rockB:2,rockT:1,jelly:1,shield:1},goal:{k:'boss'},extra:[20,30]});
Object.assign(FISH,{croaker:{n:'大黄鱼',c:['#fff4c0','#e8b830','#9a7010'],s:1,x:1},razor:{n:'蛏子',c:['#fff6e6','#d8b888','#8a6a40'],s:1,x:1},kelp:{n:'海带',c:['#d8e8c8','#5a7a4a','#34502a'],s:1,x:1}});
Object.assign(NODE,{croaker:{tool:'',hp:2,f:.62,no:''},razor:{tool:'chook',hp:1,timed:1,f:.9,wait:'等蛏子从泥里冒头再点',no:'蛏子钻在泥里，需要蛏钩'},kelp:{tool:'',hp:2,f:.2,no:''}});
Object.assign(BOSSMSG,{bore:'涌潮来了！阿蓑在船上敲钟：响一声走上面，响两声走下面。雾里看不见潮，只能信钟声'});
const V3TIP={fog:'雾太大了！只看得见身边一圈。跟着雾里发光的珍珠游，听到“咕咕”声的地方就是大黄鱼',
 ebb:'退潮了！头顶的水面会一点点往下压，跟着潮沟游，别被挤在泥滩和水面之间',
 bell:'看不见礁石！点右下角的钟，回声会把前面的礁石照出来一会儿'};
const ebbH=(t,hd)=>(hd?.36:.3)*(.5-.5*Math.cos(t*TAU/12)),ebbY=g=>yMin+ebbH(g.t,g.mode!=='simple')*(yMax-yMin);
function v3Build(L,g){const hd=g.mode!=='simple';v3bBuild(L,g);
  if(L.ebb===1){const lo=hd?.4:.36;g.E=g.E.filter(e=>!(e.t==='rock'&&e.top));
    for(const e of g.E){if(e.t==='rock')e.h=Math.min(e.h,hd?.36:.32);else if(e.f!=null&&e.t!=='node'){e.f=Math.max(e.f,lo);if(e.amp)e.amp=Math.min(e.amp,(1-lo)*.2)}}}}
/* 每帧：退潮的水面、敲钟的回声 */
function v3Tick(g,dt){const L=g.L,F=g.fish;if(!L||L.vol!==3)return;
  {const k=L.ebb===1?'ebb':L.bell?'bell':L.theme===24?'fog':'';if(k&&!g.tips['v3'+k]&&g.t>2.5&&g.mode==='simple'){g.tips['v3'+k]=1;toast(V3TIP[k],3.4)}}
  v3bTick(g,dt);
  if(L.ebb===1&&!g.trap){const c=ebbY(g);if(F.y<c+22){F.y=c+22;if(F.vy<0)F.vy=0}}
  if(L.bell){g.bellCd=Math.max(0,(g.bellCd||0)-dt);const p=g.ping;if(p){p.r+=900*dt;const hd=g.mode!=='simple';
      for(const e of g.E){if(e.gone||e.lp===p.id||!(e.t==='rock'||e.t==='octo'||e.t==='jelly'))continue;const sx=e.x+(e.dx||0)-g.scroll;if(sx>fishSX-120&&sx-fishSX<p.r){e.lp=p.id;e.lit=g.t+(hd?2.2:3.2)}}
      if(p.r>VW)g.ping=null}}}
const V3B=()=>[VW-52*U,yMax+30*U,26*U];
function bellSnd(){snd(1046,1.1,'sine',.11);snd(1568,.6,'sine',.04);snd(523,1.4,'sine',.05)}
function v3Ring(g){if(g.bellCd>0){SFX.tap();return}g.bellCd=g.mode==='simple'?2.2:3.5;g.ping={r:0,id:(g.ping&&g.ping.id||0)+1};bellSnd()}
function v3Tap(ev){const g=G;if(state!=='play'||!g||!g.L||!g.L.bell||g.trap)return false;const r=cv.getBoundingClientRect(),ux=(ev.clientX-r.left)/S,uy=(ev.clientY-r.top)/S,[bx,by,br]=V3B();
  if(Math.hypot(ux-bx,uy-by)>br+14*U)return false;v3Ring(g);return true}
/* 雾、退潮的泥滩、回声：画在所有东西上面，节点前面 */
function v3Over(g,t){const L=g.L;if(!L||L.vol!==3)return;const F=g.fish,hd=g.mode!=='simple';v3bOver(g,t);
  if(L.ebb===1){const c=ebbY(g);ctx.save();const gr=ctx.createLinearGradient(0,0,0,c);gr.addColorStop(0,'#b8bec2');gr.addColorStop(1,'#d8dcd8');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(VW,0);
    for(let x=VW;x>=-20;x-=20)ctx.lineTo(x,c+Math.sin(x*.05+t*2+g.scroll*.02)*3);ctx.fill();
    ctx.fillStyle='rgba(120,100,80,.45)';for(let n=Math.floor(g.scroll*.5/170)-1;n*170-g.scroll*.5<VW+60;n++){const x=n*170-g.scroll*.5+hash(n+11)*50;ctx.beginPath();ctx.ellipse(x,c-6,40+hash(n)*30,5,0,0,TAU);ctx.fill()}
    ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.beginPath();for(let x=0;x<=VW+20;x+=20)ctx.lineTo(x,c+Math.sin(x*.05+t*2+g.scroll*.02)*3);ctx.stroke();
    if(ebbH(t+1.5,hd)>ebbH(t,hd)+.02){ctx.fillStyle='rgba(60,60,60,.7)';ctx.font=`${14*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('退潮中'),VW/2,c-14)}ctx.restore()}
  if(!L.fog&&!L.bell)return;
  const bossOn=g.boss&&!g.boss.done,r=L.bell?(hd?110:130):bossOn?(hd?210:240):L.pilot?(hd?270:310):(hd?200:250),fx=L.pilot?fishSX-80:fishSX,a=L.bell?.95:(hd?.9:.86),col=L.bell?'52,60,72':'196,204,212';
  ctx.save();const gr=ctx.createRadialGradient(fx,F.y,r*.5,fx,F.y,r);gr.addColorStop(0,`rgba(${col},0)`);gr.addColorStop(1,`rgba(${col},${a})`);ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT);
  ctx.fillStyle=`rgba(${L.bell?'90,100,112':'235,238,240'},.18)`;for(let i=0;i<5;i++){const x=((i*260-g.scroll*.35-t*20)%(VW+400)+VW+400)%(VW+400)-200,y=yMin+(i*137)%(yMax-yMin);ctx.beginPath();ctx.ellipse(x,y,160,26,0,0,TAU);ctx.fill()}
  /* 珍珠在雾里发着微光，照着它们游 */
  for(const e of g.E){if(e.gone||e.t!=='pearl')continue;const sx=e.x+(e.dx||0)-g.scroll;if(sx<-20||sx>VW+20)continue;const y=entY(e,t);if(Math.hypot(sx-fx,y-F.y)<r*.7)continue;
    ctx.globalAlpha=.5+.2*Math.sin(t*3+e.x);ctx.fillStyle='#fff8ee';ctx.shadowColor='#fff';ctx.shadowBlur=10;circ(sx,y,5);ctx.shadowBlur=0}ctx.globalAlpha=1;
  if(L.fog&&L.nodes)for(const e of g.E){if(e.gone||e.t!=='node'||e.k!=='croaker')continue;const sx=e.x-g.scroll;if(sx<-60||sx>VW+60)continue;const y=entY(e,t),q=(t*.8+e.x*.003)%1;
    ctx.strokeStyle=`rgba(255,236,160,${.8*(1-q)})`;ctx.lineWidth=3;ctx.beginPath();ctx.arc(sx,y,24+q*70,0,TAU);ctx.stroke();if(q<.4){ctx.fillStyle='rgba(120,90,20,.85)';ctx.font=`${15*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('咕咕'),sx,y-40)}}
  if(L.bell){const T=TH[g.theme];
    for(const e of g.E){if(e.gone||!(e.lit>t))continue;const sx=e.x+(e.dx||0)-g.scroll;if(sx<-200||sx>VW+200)continue;ctx.globalAlpha=Math.min(1,(e.lit-t)/.6);
      if(e.t==='rock'){drawRock(sx,e,T);ctx.strokeStyle='rgba(190,230,255,.85)';ctx.lineWidth=3;const hw=e.w/2,y0=e.top?yMin-10:fy(1-e.h),y1=e.top?fy(e.h):yMax+30;ctx.strokeRect(sx-hw,y0,e.w,y1-y0)}else drawEntity(e,sx,entY(e,t),g,T)}
    ctx.globalAlpha=1;
    if(g.ping){ctx.strokeStyle=`rgba(200,235,255,${Math.max(0,.8-g.ping.r/VW)})`;ctx.lineWidth=4;ctx.beginPath();ctx.arc(fishSX,F.y,g.ping.r,0,TAU);ctx.stroke()}
    const[bx,by,br]=V3B(),cd=g.bellCd||0,full=g.mode==='simple'?2.2:3.5;ctx.fillStyle=cd>0?'rgba(120,110,80,.8)':'#e8c060';ctx.shadowColor='#ffe8a0';ctx.shadowBlur=cd>0?0:16;circ(bx,by,br);ctx.shadowBlur=0;
    ctx.fillStyle='#5a4010';ctx.beginPath();ctx.moveTo(bx-11*U,by+8*U);ctx.quadraticCurveTo(bx-10*U,by-12*U,bx,by-13*U);ctx.quadraticCurveTo(bx+10*U,by-12*U,bx+11*U,by+8*U);ctx.closePath();ctx.fill();circ(bx,by+11*U,3*U);
    if(cd>0){ctx.strokeStyle='#fff';ctx.lineWidth=4*U;ctx.beginPath();ctx.arc(bx,by,br+5*U,-Math.PI/2,-Math.PI/2+TAU*(1-cd/full));ctx.stroke()}
    ctx.fillStyle='#fff';ctx.font=`${12*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('敲钟'),bx,by-br-8*U)}
  ctx.restore()}
function v3BG(th,sc,t){if(th<24)return;v3bBG(th,sc,t);
  ctx.fillStyle=th===26?'rgba(30,34,40,.7)':'rgba(50,54,60,.55)';const o=sc*.2;for(let n=Math.floor(o/320)-1;n*320-o<VW+120;n++){const x=n*320-o+hash(n+21)*90,h=110+hash(n+5)*150;ctx.beginPath();ctx.moveTo(x-90,PH-150);ctx.lineTo(x-30,PH-150-h);ctx.lineTo(x+20,PH-150-h*.8);ctx.lineTo(x+80,PH-150);ctx.fill()}
  if(th===24||th===26){ctx.strokeStyle='rgba(70,90,70,.5)';ctx.lineWidth=8;ctx.lineCap='round';const wo=sc*.45;for(let n=Math.floor(wo/110)-1;n*110-wo<VW+60;n++){const x=n*110-wo,h=90+hash(n+31)*130,sw=Math.sin(t*1.1+n)*16;ctx.beginPath();ctx.moveTo(x,PH);ctx.quadraticCurveTo(x+sw,PH-h*.6,x+sw*1.4,PH-h);ctx.stroke()}}
  if(th===25){ctx.fillStyle='rgba(90,76,60,.5)';for(let n=Math.floor(sc*.3/140)-1;n*140-sc*.3<VW+60;n++){const x=n*140-sc*.3+hash(n+41)*40;ctx.beginPath();ctx.ellipse(x,PH-140,60,14,0,0,TAU);ctx.fill()}}
  if(th===27){ctx.strokeStyle='rgba(230,236,240,.25)';ctx.lineWidth=3;for(let i=0;i<6;i++){const y=yMin+40+i*70,x=((t*120+i*90)%(VW+200))-100;ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+40,y-14,x+80,y);ctx.stroke()}}}
function v3Node(e,t){
  if(e.k==='croaker'){ctx.rotate(Math.sin(t*1.4+e.x)*.1);ctx.fillStyle='#e8b830';ctx.beginPath();ctx.ellipse(0,0,24,10,0,0,TAU);ctx.fill();ctx.fillStyle='#fff0b0';ctx.beginPath();ctx.ellipse(2,4,18,4,0,0,TAU);ctx.fill();ctx.fillStyle='#9a7010';ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(-34,-9);ctx.lineTo(-34,9);ctx.fill();ctx.beginPath();ctx.moveTo(-6,-9);ctx.lineTo(8,-15);ctx.lineTo(10,-8);ctx.fill();ctx.fillStyle='#1b2a41';circ(15,-2,2.4);return 1}
  if(e.k==='razor'){const op=nodeOpen(e,t),k=op?Math.sin(((t+e.x*.01)%3.2)/1.9*Math.PI):0;ctx.fillStyle='#4a3e30';ctx.beginPath();ctx.ellipse(0,14,24,7,0,0,TAU);ctx.fill();ctx.fillStyle='#2a2018';ctx.beginPath();ctx.ellipse(0,13,7,3,0,0,TAU);ctx.fill();
    ctx.save();ctx.beginPath();ctx.rect(-30,-60,60,73);ctx.clip();ctx.translate(0,13-k*34);ctx.fillStyle='#d8b888';ctx.fillRect(-6,-30,12,30);ctx.fillStyle='#f4e0c0';ctx.fillRect(-5,-30,4,30);ctx.fillStyle='#fff6e6';ctx.beginPath();ctx.ellipse(0,-31,5,3,0,0,TAU);ctx.fill();ctx.restore();if(!op)ctx.globalAlpha=.45;return 1}
  if(e.k==='kelp'){ctx.strokeStyle='#5a7a4a';ctx.lineCap='round';for(let i=-1;i<=1;i++){ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(i*8,26);ctx.quadraticCurveTo(i*8+Math.sin(t*2+i)*10,0,i*6+Math.sin(t*2+i+1)*6,-26);ctx.stroke()}ctx.strokeStyle='#8aa870';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,24);ctx.quadraticCurveTo(Math.sin(t*2)*10,0,Math.sin(t*2+1)*6,-24);ctx.stroke();return 1}
  return v3bNode(e,t)}
/* ---------- 涌潮 Boss：岔口从雾里推过来，钟响一声走上面、两声走下面 ---------- */
function boreMk(g,hd,fin){const hp=hd?3:4;return{k:'bore',hp,hp0:hp,n:0,need:hd?12:8,fk:[],made:0,sp:1.6,t:-2.5,wall:0,ring:0,done:0,fin,
  reset(){this.hp=this.hp0;this.n=0;this.fk=[];this.made=0;this.sp=1.6;this.t=-2;this.wall=0;this.ring=0}}}
function boreRing(c){for(let i=0;i<c;i++)setTimeout(bellSnd,i*420)}
const BORE={v:()=>G.mode==='hard'?185:150,show:()=>G.mode==='hard'?1.3:2.4,mid:()=>(yMin+yMax)/2};
function boreUpd(B,dt){const g=G,F=g.fish,hd=g.mode==='hard';B.t+=dt;B.ring=Math.max(0,B.ring-dt);if(B.t<0)return;
  if(B.made<B.need){B.sp-=dt;if(B.sp<=0){B.sp=hd?2.3:3.1;const c=Math.random()<.5?1:2;B.fk.push({x:VW+110,c,born:B.t});B.made++;B.ring=1;B.rc=c;boreRing(c)}}
  for(const f of B.fk){f.x-=BORE.v()*dt;
    if(!f.done&&f.x<=fishSX){f.done=1;const up=F.y<BORE.mid(),ok=f.c===1?up:!up;
      if(ok){B.n++;g.bonus+=40;SFX.save();burst(fishSX,F.y,'#dff4ff',14,1);ftext(tl('走对了！'),fishSX-20,F.y-56,'#bff6e6')}
      else{f.bad=1;B.hp--;B.wall=Math.min(1,B.wall+.25);g.shake=.5;SFX.hit();CSND.crash();burst(fishSX,F.y,'#ffffff',22);ftext(tl(f.c===1?'钟响一声，该走上面！':'钟响两声，该走下面！'),fishSX-30,F.y-56,'#ffb3b3');if(B.hp<=0){die('bore');return}}}}
  B.fk=B.fk.filter(f=>f.x>-160);
  if(B.made>=B.need&&!B.fk.some(f=>!f.done))bossWin(B,'涌潮过去了！落水的小工被你推回了岸边')}
function boreDraw(B,t){const g=G,T=TH[g.theme],m=BORE.mid(),hh=(yMax-yMin)*.09;ctx.save();
  for(const f of B.fk){const x=f.x,near=f.x-fishSX<150;
    ctx.fillStyle=T.rock;ctx.beginPath();ctx.moveTo(x-30,m);ctx.lineTo(x+40,m-hh);ctx.lineTo(x+170,m-hh*.8);ctx.lineTo(x+170,m+hh*.8);ctx.lineTo(x+40,m+hh);ctx.closePath();ctx.fill();
    ctx.fillStyle=T.rock2;ctx.fillRect(x-10,yMin-20,180,24);ctx.fillRect(x-10,yMax+10,180,40);
    if(near||f.done){const top=f.c===2,y0=top?yMin:m+hh,y1=top?m-hh:yMax+20;ctx.fillStyle='rgba(240,246,250,.75)';ctx.fillRect(x+10,y0,150,y1-y0);ctx.strokeStyle='#fff';ctx.lineWidth=3;
      for(let i=0;i<5;i++){const yy=y0+(y1-y0)*(i+.5)/5;ctx.beginPath();ctx.moveTo(x+10,yy);for(let k=0;k<=6;k++)ctx.lineTo(x+10+k*25,yy+Math.sin(t*10+k+i)*6);ctx.stroke()}}}
  const wx=20+B.wall*90+Math.sin(t*3)*6;ctx.fillStyle='rgba(235,242,248,.85)';ctx.beginPath();ctx.moveTo(0,yMin-20);ctx.lineTo(wx,yMin-20);for(let y=yMin;y<yMax+40;y+=24)ctx.lineTo(wx+Math.sin(t*8+y*.05)*10,y);ctx.lineTo(0,yMax+40);ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.3)';ctx.setLineDash([6,8]);ctx.beginPath();ctx.moveTo(0,m);ctx.lineTo(VW,m);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
function boreHud(B,t){const g=G,w=Math.min(VW-40*U,300*U),x0=(VW-w)/2,y0=yMax+58*U,h=12*U;ctx.save();ctx.textAlign='center';
  for(const f of B.fk){if(f.done||B.t-f.born>BORE.show())continue;const x=clamp(f.x+60,60*U,VW-50*U),y=yMin+44*U,al=Math.min(1,(BORE.show()-(B.t-f.born))/.4);ctx.globalAlpha=al;
    ctx.fillStyle='rgba(20,30,40,.6)';ctx.beginPath();ctx.ellipse(x,y,46*U,26*U,0,0,TAU);ctx.fill();ctx.fillStyle='#ffd870';ctx.font=`bold ${18*U}px ${FONT}`;ctx.fillText(tl(f.c===1?'当':'当 当'),x,y-2*U);
    ctx.font=`${12*U}px ${FONT}`;ctx.fillStyle='#fff';ctx.fillText(tl(f.c===1?'走上面':'走下面'),x,y+15*U)}
  ctx.globalAlpha=1;if(B.ring>0){ctx.strokeStyle=`rgba(255,226,140,${B.ring})`;ctx.lineWidth=4*U;for(let i=0;i<B.rc;i++){ctx.beginPath();ctx.arc(VW/2,yMin+44*U,(30+i*16+(1-B.ring)*30)*U,0,TAU);ctx.stroke()}}
  ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,y0-4*U,w+8*U,h+8*U);const sg=w/B.need;for(let i=0;i<B.need;i++){ctx.fillStyle=i<B.n?'#4fe0b5':i<B.made-B.fk.filter(f=>!f.done).length?'#ff8a7a':'rgba(255,255,255,.25)';ctx.fillRect(x0+i*sg+2*U,y0,sg-4*U,h)}
  ctx.fillStyle='#fff';ctx.font=`${14*U}px ${FONT}`;ctx.fillText(tl('❤'.repeat(Math.max(0,B.hp))+' · 还差 '+Math.max(0,B.need-B.made+B.fk.filter(f=>!f.done).length)+' 个岔口'),VW/2,y0+h+16*U);ctx.restore()}
