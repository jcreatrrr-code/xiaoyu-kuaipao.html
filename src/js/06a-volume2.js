/* ---------- 第二卷 南方环礁：海域、关卡、新情况 ---------- */
const VOL1=12,volOf=li=>li<VOL1?1:2,v2Open=()=>cleared(VOL1-1);
TH.push(
 {n:'碧色潟湖',top:'#7fe6e0',bot:'#1a8fb0',far:'#5fcfd8',mid:'#3fb0c8',sand:'#f8ecc8',rock:'#ece4d6',rock2:'#cfc3ae',weed:'#6fe0b0'},
 {n:'飞鱼水道',top:'#6fd8f0',bot:'#1570b0',far:'#4fb8e0',mid:'#2f98c8',sand:'#f5e2b0',rock:'#d9a070',rock2:'#a8703f',weed:'#4fd0a0'},
 {n:'红树林',top:'#7fc8a0',bot:'#1f4f3a',far:'#4f8a60',mid:'#3a6f4a',sand:'#8a7a5a',rock:'#6a4a30',rock2:'#4a3020',weed:'#7fbf5f'},
 {n:'风暴夜',top:'#2a3a5a',bot:'#081020',far:'#1f2f4a',mid:'#18243a',sand:'#3a4050',rock:'#4a5a70',rock2:'#2f3a4a',weed:'#3f6a6a'});
LV.push(
 {name:'碧色潟湖',vol:2,fish:['sard','yellow','bream'],len:200,theme:12,tide:1,nodes:['coco'],gname:'椰子',pool:{pearls:3,rockB:2,rockT:2,octo:2,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'飞鱼水道',vol:2,fish:['saury','mack','tuna'],len:210,theme:13,leap:1,tool:'scoop',nodes:['flyfish'],gname:'飞鱼',pool:{pearls:2,fnet:5,rockB:2,rockT:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'红树林',vol:2,fish:['eel','bream','yellow'],len:210,theme:14,leap:1,tool:'hook',nodes:['mudcrab'],gname:'泥蟹',pool:{pearls:2,roots:5,fnet:1,octo:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'风暴夜',vol:2,fish:['sard','mack'],len:200,theme:15,leap:1,boss:'guide',gtxt:'把小帆的独木舟带回船边',pool:{pearls:2,fnet:2,roots:1,rockB:2,rockT:1,jelly:2,shield:1},goal:{k:'boss'},extra:[20,30]});
Object.assign(FISH,{coco:{n:'椰子',c:['#fff8e6','#a8743f','#6a4520'],s:1,x:1},flyfish:{n:'飞鱼',c:['#eaf6ff','#5f9fe0','#2f5fa8'],s:1,x:1},mudcrab:{n:'泥蟹',c:['#f0e0c0','#5f6a3a','#3a4020'],s:1,x:1}});
Object.assign(NODE,{coco:{tool:'',hp:1,f:.1,no:''},flyfish:{tool:'scoop',hp:1,timed:1,f:.05,wait:'等飞鱼跳出水面再点',no:'飞鱼要等它跳出水面，用抄网接'},mudcrab:{tool:'hook',hp:2,f:.9,no:'泥蟹躲在根缝里，需要蟹钩'}});
Object.assign(BOSSMSG,{guide:'风暴来了！点下方的颜色按钮，在独木舟碰到浮标之前，把吊坠换成浮标的颜色，再游到虚线上方让小帆看见'});
Object.assign(TIPS,{fnet:'水面上挂着浮网！贴着水面冲出去跳过它，或者从底下绕过',tide:'落潮了，海底的礁盘会露出来，别贴着底游！',leap:'贴着水面多游一会儿，小鱼就会跃出水面！空中的金珍珠一颗算两颗',roots:'红树林的根缝很窄，还会上下移动，跟着珍珠穿过去'});
Object.assign(PAT,{
 fnet(g,x,d){const hd=g.mode==='hard',w=g.r(110,hd?250:200)+40*(d||0),h=g.r(.3,.78);g.E.push({t:'fnet',x,w,h});arc(g,x-w/2-150,.55,.55,3);
   const n=7,span=LEAP.T*(hd?205:150);for(let i=0;i<n;i++){const q=(i+.5)/n;g.E.push({t:'pearl',x:x-span/2+q*span,f:LEAP.fs-Math.sin(Math.PI*q)*(LEAP.fs-LEAP.fp),air:1})}},
 roots(g,x,d){const gap=(g.mode==='simple'?.42:.34)-.05*d;let c=g.r(.35,.65);
   for(let i=0;i<3;i++){const mv={ph:g.r(0,6),amp:g.mode==='simple'?.07:.1},xx=x+i*170;g.E.push({t:'rock',root:1,mv,x:xx,w:56,h:c-gap/2,top:1},{t:'rock',root:1,mv,x:xx,w:56,h:1-c-gap/2,top:0});
     for(const dx of[-70,-20])g.E.push({t:'pearl',mv,x:xx+dx,f:c});c=clamp(c+g.r(-.18,.18),.32,.68)}}});
const TIPS2={node:'发光的是要带回小馆的食材，用手指点它！',rock:'绕开礁石和树根，跟着珍珠游！'};
const LEAPSAFE={rock:1,octo:1,jelly:1,net:1,fnet:1,ice:1,mimic:1};
const SURF=.3,surfY=()=>fy(SURF),LEAP={T:1.5,fs:SURF+.04,fp:.03};
const tideH=t=>.2*(.5-.5*Math.cos(t*TAU/11));
function v2Build(L,g){a2Build(L,g);a3Build(L,g);if(L.tide)for(const e of g.E)if(e.t==='pearl'||e.t==='wild')e.f=Math.min(e.f,.74);
  if(!L.leap)return;const m=v=>SURF+(1-SURF)*v;g.E=g.E.filter(e=>!(e.t==='rock'&&e.top&&!e.root));
  for(const e of g.E){if(e.f!=null&&!e.air)e.f=m(e.f);if(e.amp!=null&&e.t!=='net')e.amp*=1-SURF;
    if(e.t==='fnet')e.h=m(e.h);else if(e.t==='rock')e.h=e.top?m(e.h):e.h*(1-SURF)}}
/* 会上下动的根缝石头 */
function v2Mv(g,leap){for(const e of g.E)if(e.mv&&e.x>g.scroll-200&&e.x<g.scroll+VW+300){const o=e.mv.amp*(leap?1-SURF:1)*Math.sin(g.t*1.2+e.mv.ph);if(e.h0==null)e.h0=e.t==='pearl'?e.f:e.h;
    if(e.t==='pearl')e.f=e.h0+o;else e.h=e.top?e.h0+o:e.h0-o}}
/* 每帧：潮位、跃出水面 */
function v2Move(g,dt,k){const F=g.fish,L=g.L,t=g.t;a3Tick(g,dt);
  if(L.tide){if(!g.tips.tide&&t>3){g.tips.tide=1;toast(TIPS.tide,3)}const fl=yMax-tideH(t)*(yMax-yMin);
    if(F.y>fl-18){F.y=fl-18;if(g.inv<=0&&!g.trap){hurt(1);F.vy=-300*k}else if(F.vy>0)F.vy=0}}
  v2Mv(g,L.leap);
  if(!L.leap||g.trap)return;const sy=surfY();
  if(g.leap){const lp=g.leap;lp.t+=dt;const q=Math.min(1,lp.t/lp.T);F.y=fy(LEAP.fs-Math.sin(Math.PI*q)*(LEAP.fs-LEAP.fp));F.vy=0;
    if(q>=1){g.leap=null;F.y=sy+24;F.vy=120*k;burst(fishSX,sy+8,'#fff',10,1)}return}
  if(F.y<sy+22){F.y=sy+22;if(F.vy<0)F.vy=0}
  if(hold&&F.y<=sy+24&&!(g.boss&&!g.boss.done)){g.surf=(g.surf||0)+dt;if(g.surf>.45){g.surf=0;g.leap={t:0,T:LEAP.T};g.leapN=(g.leapN||0)+1;SFX.free();burst(fishSX,sy+8,'#fff',14,1);if(!SAVE.sight.leap){SAVE.sight.leap=1;ftext('跃出水面！',fishSX,sy+30,'#ffe27a')}}}
  else g.surf=0;
  if(g.mode==='simple'&&!g.tips.leap&&t>4&&L===LV[VOL1+1]){g.tips.leap=1;toast(TIPS.leap,3.2)}}
function v2Hit(g,e,sx,y,dx,dt){const F=g.fish;
  if(e.t==='fnet'){if(!g.trap)e.dx=(e.dx||0)-20*dt;if(!e.gone&&!g.trap&&g.inv<=0&&Math.abs(dx)<e.w/2&&F.y-14<fy(e.h)&&F.y>surfY()){
    if(g.shield||g.whale){absorb();e.gone=1;burst(sx,fy(e.h/2),'#f5e6c0',14)}
    else if(g.buff.scissors){g.buff.scissors=false;e.gone=1;g.inv=1.2;SFX.free();ftext('剪刀剪开了浮网！',fishSX,F.y-56,'#ffe27a')}
    else{const T=g.mode==='simple'?6:10;g.trap={t:T,T,p:0,need:g.mode==='simple'?8:14,e};g.combo=0;SFX.hit();toast(g.mode==='simple'?'最后机会！快速连点屏幕！':'被浮网缠住了！快速连点挣脱！',2,1)}}}}
/* 绘制 */
function v2BG(th,sc,t){
  if(th===12){const o=sc*.25;for(let n=Math.floor(o/230)-1;n*230-o<VW+80;n++){const x=n*230-o+hash(n+4)*60,b=PH-150,h=60+hash(n)*70;ctx.strokeStyle='rgba(245,240,230,.55)';ctx.lineWidth=7;ctx.lineCap='round';
    for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x,b);ctx.quadraticCurveTo(x+i*10,b-h*.5,x+i*22,b-h+Math.abs(i)*12);ctx.stroke()}}}
  if(th===13){ctx.fillStyle='rgba(30,70,120,.25)';for(let i=0;i<3;i++){const x=VW-((t*90+i*260+sc*.1)%(VW+200))+100,y=yMin+30+i*22;ctx.beginPath();ctx.ellipse(x,y,22,6,0,0,TAU);ctx.fill();ctx.beginPath();ctx.moveTo(x-4,y);ctx.lineTo(x+10,y-16);ctx.lineTo(x+14,y);ctx.fill()}}
  if(th===14){ctx.strokeStyle='rgba(60,40,25,.55)';ctx.lineCap='round';const o=sc*.3;for(let n=Math.floor(o/140)-1;n*140-o<VW+60;n++){const x=n*140-o,h=120+hash(n+2)*160;ctx.lineWidth=10;
    for(const s of[-1,1]){ctx.beginPath();ctx.moveTo(x,0);ctx.quadraticCurveTo(x+s*30,h*.6,x+s*44,h);ctx.stroke()}}}
  a2BG(th,sc,t);a3BG(th,sc,t);
  if(th===15){ctx.strokeStyle='rgba(200,220,255,.18)';ctx.lineWidth=1.5;for(let i=0;i<40;i++){const x=((i*97+t*60)%(VW+80))-40,y=((i*53+t*700)%(PH+60))-30;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-6,y+18);ctx.stroke()}}}
function v2Sky(g,t){if(!g||!g.L||!g.L.leap)return;const y=surfY(),st=g.theme===15;ctx.save();const gr=ctx.createLinearGradient(0,0,0,y);
  gr.addColorStop(0,st?'#141c2c':'#bfe9ff');gr.addColorStop(1,st?'#3a4a62':'#eaf8ff');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(VW,0);
  for(let x=VW;x>=-20;x-=20)ctx.lineTo(x,y+Math.sin(x*.05+t*3+g.scroll*.02)*(st?6:3));ctx.fill();
  if(!st){ctx.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<3;i++){const cx=((i*260-g.scroll*.15)%(VW+200)+VW+200)%(VW+200)-100,cy=yMin+18+i*14;ctx.beginPath();ctx.ellipse(cx,cy,34,9,0,0,TAU);ctx.ellipse(cx+20,cy-6,20,8,0,0,TAU);ctx.fill()}}ctx.restore()}
function v2Surface(g,t){if(!g.L||!g.L.leap)return;const y=surfY(),st=g.theme===15;ctx.save();
  ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=3;ctx.beginPath();for(let x=0;x<=VW+20;x+=20)ctx.lineTo(x,y+Math.sin(x*.05+t*3+g.scroll*.02)*(st?6:3));ctx.stroke();ctx.restore()}
function drawTide(g,t){const h=tideH(t),fl=yMax-h*(yMax-yMin),T=TH[g.theme];ctx.save();ctx.fillStyle=T.rock2;ctx.beginPath();ctx.moveTo(0,VT);
  for(let x=0;x<=VW+30;x+=30)ctx.lineTo(x,fl+6+Math.sin((x+g.scroll)*.03)*6);ctx.lineTo(VW+30,VT);ctx.fill();ctx.fillStyle=T.rock;
  for(let n=Math.floor(g.scroll/90)-1;n*90-g.scroll<VW+40;n++){const x=n*90-g.scroll+hash(n)*40;circ(x,fl+12+hash(n+3)*10,8+hash(n+5)*7)}
  const nx=tideH(t+1.5);if(nx>h+.02&&h>.02){ctx.fillStyle='rgba(255,255,255,.85)';ctx.font=`${14*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('落潮中'),VW/2,fl-10)}ctx.restore()}
function drawFnet(e,sx,g,t){const y0=surfY(),y1=fy(e.h),w=e.w||88,n=Math.max(4,Math.round(w/16));ctx.save();ctx.strokeStyle='rgba(245,230,192,.9)';ctx.lineWidth=2;
  for(let i=0;i<=n;i++){const x=sx-w/2+i*w/n;ctx.beginPath();ctx.moveTo(x,y0-4);ctx.quadraticCurveTo(x+Math.sin(t*2+i)*5,(y0+y1)/2,x,y1+Math.sin(t*2+i)*4);ctx.stroke()}
  for(let j=1;j<=4;j++){const yy=lerp(y0,y1,j/4);ctx.beginPath();ctx.moveTo(sx-w/2,yy);ctx.lineTo(sx+w/2,yy+Math.sin(t*2+j)*3);ctx.stroke()}
  ctx.fillStyle='#ffcf5a';const m=Math.max(3,Math.round(w/30));for(let i=0;i<=m;i++)circ(sx-w/2+i*w/m,y0-4,6);ctx.restore()}
function drawRoot(sx,e,T){const hw=e.w/2,y=e.top?fy(e.h):fy(1-e.h),b=e.top?yMin-60:yMax+50;ctx.save();ctx.strokeStyle=T.rock;ctx.lineCap='round';
  for(let i=-1;i<=1;i++){ctx.lineWidth=i?11:16;ctx.beginPath();ctx.moveTo(sx+i*hw*.7,b);ctx.quadraticCurveTo(sx+i*hw*1.1,lerp(b,y,.5),sx+i*hw*.25,y);ctx.stroke()}
  ctx.fillStyle=T.rock2;circ(sx,y,9);ctx.restore()}
function drawNode2(e,t){
  if(e.k==='coco'){ctx.rotate(Math.sin(t*2+e.x)*.15);ctx.fillStyle='#8a5a2f';circ(0,0,17);ctx.fillStyle='#a8743f';circ(-5,-5,9);ctx.fillStyle='#3a2414';circ(-5,3,2.5);circ(3,5,2.5);circ(1,-3,2.5);return 1}
  if(e.k==='flyfish'){const op=nodeOpen(e,t),k=op?Math.sin(((t+e.x*.01)%3.2)/1.9*Math.PI):0;ctx.translate(0,-k*46);ctx.rotate(-.2);ctx.fillStyle='#5f9fe0';ctx.beginPath();ctx.ellipse(0,0,20,7,0,0,TAU);ctx.fill();
    ctx.fillStyle='rgba(220,240,255,.85)';ctx.beginPath();ctx.moveTo(-4,-2);ctx.lineTo(10,-22-k*4);ctx.lineTo(14,-2);ctx.fill();ctx.beginPath();ctx.moveTo(-4,2);ctx.lineTo(8,18);ctx.lineTo(12,2);ctx.fill();ctx.fillStyle='#2f5fa8';ctx.beginPath();ctx.moveTo(-18,0);ctx.lineTo(-28,-8);ctx.lineTo(-28,8);ctx.fill();ctx.fillStyle='#1b2a41';circ(13,-1,2);if(!op){ctx.globalAlpha=.35}return 1}
  if(e.k==='mudcrab'){ctx.fillStyle='#5f6a3a';ctx.beginPath();ctx.ellipse(0,0,20,13,0,0,TAU);ctx.fill();ctx.strokeStyle='#3a4020';ctx.lineWidth=4;ctx.lineCap='round';for(const s of[-1,1]){for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(s*14,2+i*4);ctx.lineTo(s*26,10+i*5);ctx.stroke()}ctx.fillStyle='#7a8a4a';circ(s*24,-12,7)}ctx.fillStyle='#1b2a41';circ(-5,-10,2.5);circ(5,-10,2.5);return 1}
  return a2Node(e,t)}
/* ---------- 风暴引航 Boss：浪把独木舟推向暗礁，小鱼游到水面附近点一下发光，把船叫回航道 ---------- */
const GC=[['红','#ff5a5a'],['绿','#4fe07a'],['黄','#ffd23f']],gNc=B=>G.mode==='hard'||B.made>=3?3:2,gCi=B=>B.pc%gNc(B);
const GD={cx:()=>fishSX+150,sy:()=>surfY()-8,zone:()=>fy(SURF+.16),win:hd=>hd?80:95,
  btn:i=>{const n=gNc(G.boss),sp=58*U;return[VW/2-(n-1)*sp/2+i*sp,yMax+28*U,20*U]}};
function guideMk(g,hd,fin){return{k:'guide',hp:3,n:0,need:hd?12:8,reefs:[],made:0,ct:0,pc:0,t:-2.5,sp:1,cd:0,glow:0,wave:6,wt:0,swerve:0,done:0,fin,
  reset(){this.hp=3;this.n=0;this.reefs=[];this.made=0;this.pc=0;this.t=-2;this.sp=1;this.cd=0;this.glow=0;this.wave=6;this.wt=0}}}
function guideUpd(B,dt){const g=G,F=g.fish,hd=g.mode==='hard',k=clamp((yMax-yMin)/544,.85,1.45),cx=GD.cx();B.t+=dt;B.cd=Math.max(0,B.cd-dt);B.glow=Math.max(0,B.glow-dt);B.swerve=Math.max(0,B.swerve-dt);B.ct+=dt;
  if(B.t<0)return;
  if(B.n+B.reefs.length<B.need){B.sp-=dt;if(B.sp<=0){B.sp=hd?1.6+Math.random()*1:2.2+Math.random()*1.2;B.reefs.push({x:VW+60,ok:0,c:Math.floor(Math.random()*gNc(B))});B.made++}}
  for(const r of B.reefs){r.x-=(hd?140:110)*dt;
    if(!r.ok&&!r.hit&&r.x<=cx){const cOk=gCi(B)===r.c,up=F.y<=GD.zone();
      if(cOk&&up){r.ok=1;B.n++;B.glow=.5;B.swerve=.6;SFX.save();burst(cx,GD.sy(),'#ffe9a8',18);g.bonus+=40;ftext(B.n%2?'往右压桨！':'往左压桨！',cx-40,GD.sy()+40,'#bff6e6')}
      else{r.hit=1;B.hp--;g.shake=.5;SFX.hit();CSND.crash();ftext(cOk?'小帆没看见灯光！游到虚线上方':'颜色不对！这处浮标是'+GC[r.c][0]+'灯',fishSX-20,F.y-56,'#ffb3b3');ftext('独木舟撞上暗礁了！',cx-60,GD.sy()+50,'#ffb3b3');if(B.hp<=0){die('canoe');return}}}}
  B.reefs=B.reefs.filter(r=>r.x>-80);
  B.wave-=dt;if(B.wave<=0&&!B.wt){B.wt=2.2;B.wave=hd?4:5.5;toast('大浪要压下来了！',1.2,1)}
  if(B.wt){B.wt=Math.max(0,B.wt-dt);if(B.wt<1.2&&F.y<GD.zone()+40&&!g.trap&&!g.leap)F.y+=260*k*dt}
  if(B.n>=B.need&&!B.reefs.some(r=>!r.ok&&!r.hit))bossWin(B,'小帆的独木舟平安回到了船边！')}
function guideTap(B,ux,uy){if(B.t<0)return false;
  for(let i=0;i<gNc(B);i++){const[bx,by,br]=GD.btn(i);if(Math.hypot(ux-bx,uy-by)<br+10*U){if(B.pc!==i){B.pc=i;SFX.tap()}return true}}
  return false}
function guideDraw(B,t){const g=G,F=g.fish,cx=GD.cx(),hd=g.mode==='hard',sy=GD.sy()+6;ctx.save();
  for(const r of B.reefs){const top=GD.sy()-4,inW=r===B.reefs.find(q=>!q.ok&&!q.hit);ctx.fillStyle=r.ok?'rgba(120,140,160,.5)':'#55606f';ctx.beginPath();ctx.moveTo(r.x-46,yMax+40);ctx.lineTo(r.x-22,top+30);ctx.lineTo(r.x-6,top);ctx.lineTo(r.x+12,top+18);ctx.lineTo(r.x+40,yMax+40);ctx.fill();
    if(!r.ok&&!r.hit){ctx.strokeStyle=inW?'#ffffff':'rgba(255,255,255,.35)';ctx.lineWidth=inW?5:3;ctx.setLineDash([8,6]);ctx.lineDashOffset=-t*30;ctx.beginPath();ctx.arc(r.x,top+4,30+(inW?Math.sin(t*12)*4:0),0,TAU);ctx.stroke();ctx.setLineDash([])}
    if(!r.hit){const bc=GC[r.c][1],on=1;ctx.strokeStyle='#ddd';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(r.x-6,top);ctx.lineTo(r.x-6,top-22);ctx.stroke();if(on){ctx.fillStyle=bc;ctx.shadowColor=bc;ctx.shadowBlur=18;circ(r.x-6,top-30,12+(r.ok?0:Math.sin(t*6)*2));ctx.shadowBlur=0}}}
  const sw=B.swerve>0?Math.sin(B.swerve/.6*Math.PI)*18:0,by=GD.sy()+Math.sin(t*2.6)*6;ctx.translate(cx,by-sw);ctx.rotate(Math.sin(t*2.6)*.12);
  ctx.fillStyle='#7a4a24';ctx.beginPath();ctx.moveTo(-46,0);ctx.quadraticCurveTo(0,18,46,0);ctx.lineTo(40,-6);ctx.lineTo(-40,-6);ctx.fill();ctx.fillStyle='#a8743f';ctx.fillRect(-30,8,60,4);
  ctx.fillStyle='#ffd9b3';circ(4,-20,7);ctx.fillStyle='#ff9f1c';ctx.fillRect(-2,-14,12,10);ctx.strokeStyle='#5a3a22';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(10,-12);ctx.lineTo(26,12);ctx.stroke();ctx.restore();
  {const pc=GC[gCi(B)][1];ctx.save();ctx.strokeStyle=pc;ctx.shadowColor=pc;ctx.shadowBlur=14;ctx.lineWidth=4;ctx.beginPath();ctx.arc(fishSX,F.y,34+Math.sin(t*6)*2,0,TAU);ctx.stroke();ctx.restore()}
  if(B.glow>0){ctx.save();ctx.globalAlpha=B.glow*1.6;const gr=ctx.createRadialGradient(fishSX,F.y,4,fishSX,F.y,170);gr.addColorStop(0,'rgba(255,240,180,.9)');gr.addColorStop(1,'rgba(255,240,180,0)');ctx.fillStyle=gr;ctx.fillRect(fishSX-170,F.y-170,340,340);ctx.restore()}
  if(B.wt&&B.wt<1.2){ctx.fillStyle='rgba(220,235,255,.18)';ctx.fillRect(0,yMin,VW,GD.zone()-yMin+40)}
  if(Math.sin(t*.9)>.985||Math.sin(t*1.7+1)>.992){ctx.fillStyle='rgba(230,240,255,.35)';ctx.fillRect(0,0,VW,VT)}
  ctx.strokeStyle='rgba(255,255,255,.25)';ctx.setLineDash([6,8]);ctx.beginPath();ctx.moveTo(0,GD.zone());ctx.lineTo(VW,GD.zone());ctx.stroke();ctx.setLineDash([])}
function guideHud(B,t){const w=Math.min(VW-40*U,300*U),x0=(VW-w)/2,y0=yMax+58*U,h=12*U;ctx.save();ctx.textAlign='center';ctx.font=`${14*U}px ${FONT}`;
  ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,y0-4*U,w+8*U,h+8*U);const sg=w/B.need;for(let i=0;i<B.need;i++){ctx.fillStyle=i<B.n?'#4fe0b5':'rgba(255,255,255,.25)';ctx.fillRect(x0+i*sg+2*U,y0,sg-4*U,h)}
  ctx.fillStyle='#fff';ctx.fillText(tl('独木舟')+' '+'❤'.repeat(Math.max(0,B.hp))+' · '+tl('还差')+' '+Math.max(0,B.need-B.n)+' '+tl('处暗礁'),VW/2,y0+h+16*U);
  const nc=gNc(B),ci=gCi(B);{const[bx,by,br]=GD.btn(0);ctx.textAlign='right';ctx.fillText(tl('吊坠'),bx-br-10*U,by+5*U)}
  for(let i=0;i<nc;i++){const[bx,by,br]=GD.btn(i),on=i===ci;ctx.globalAlpha=on?1:.45;ctx.fillStyle=GC[i][1];if(on){ctx.shadowColor=GC[i][1];ctx.shadowBlur=16}circ(bx,by,on?br:br*.8);ctx.shadowBlur=0;
    if(on){ctx.globalAlpha=1;ctx.strokeStyle='#fff';ctx.lineWidth=3*U;ctx.beginPath();ctx.arc(bx,by,br+4*U,0,TAU);ctx.stroke()}}
  ctx.restore()}
