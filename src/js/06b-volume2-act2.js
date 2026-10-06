/* ---------- 第二卷 第二幕：星路海、火山岛、灯塔环、灯下鱼群 ---------- */
TH.push(
 {n:'星路海',top:'#2a4a7a',bot:'#0a1838',far:'#1f3a66',mid:'#183058',sand:'#c8c0a0',rock:'#5a6a8a',rock2:'#3a4a6a',weed:'#4fa0a0'},
 {n:'火山岛',top:'#5a7a8a',bot:'#1a1a24',far:'#4a4a52',mid:'#33333c',sand:'#3a3634',rock:'#4a3a36',rock2:'#2a2220',weed:'#6a8a5a'},
 {n:'灯塔环',top:'#3a4a7a',bot:'#0e1430',far:'#2a3260',mid:'#1f2650',sand:'#a8a088',rock:'#6a6a80',rock2:'#45455a',weed:'#5a8a8a'},
 {n:'灯下鱼群',top:'#34507a',bot:'#0c1630',far:'#25406a',mid:'#1c3258',sand:'#b8b090',rock:'#5a6a80',rock2:'#3a465a',weed:'#4f9a90'});
LV.push(
 {name:'星路海',vol:2,fish:['saury','yellow','bream'],len:210,theme:16,nodes:['turbo'],gname:'夜光螺',pool:{pearls:2,fork:9,rockB:2,rockT:2,jelly:2,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'火山岛',vol:2,fish:['mack','eel','tuna'],len:210,theme:17,tool:'lpot',nodes:['lobster'],gname:'龙虾',pool:{pearls:2,vent:8,rockB:2,rockT:2,octo:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'灯塔环',vol:2,fish:['sard','mack','saury'],len:210,theme:18,tool:'rod',nodes:['skipjack'],gname:'鲣鱼',pool:{pearls:2,lamp:7,rockB:1,rockT:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'灯下鱼群',vol:2,fish:['sard','saury'],len:200,theme:19,boss:'herd',gtxt:'把鱼群赶回潟湖',pool:{pearls:2,lamp:2,lampv:3,vent:1,rockB:2,jelly:1,shield:1},goal:{k:'boss'},extra:[20,30]});
Object.assign(FISH,{turbo:{n:'夜光螺',c:['#fff4e0','#c89a5a','#7a5a30'],s:1,x:1},lobster:{n:'龙虾',c:['#ffe0d0','#d0603a','#8a3020'],s:1,x:1},skipjack:{n:'鲣鱼',c:['#e8f0ff','#4a6aa0','#2a3a60'],s:1,x:1}});
Object.assign(NODE,{turbo:{tool:'',hp:1,f:.88,no:''},lobster:{tool:'lpot',hp:2,f:.9,no:'龙虾躲在石缝里，需要龙虾笼'},skipjack:{tool:'rod',hp:1,f:.22,no:'鲣鱼要用钓竿一条一条钓'}});
Object.assign(BOSSMSG,{herd:'鱼群被灯光困住了！拖着小鱼去赶，把鱼群赶进潟湖口'});
Object.assign(TIPS,{fork:'前面分成上下两条路！跟着星星的倒影游，走错的那条尽头只剩一道窄缝',vent:'海底的热泉冒小泡泡时，马上要喷热水了，别待在它上面',lamp:'别游进灯光的虚线圈里！有的灯大得躲不开，被吸住了就按箭头方向点屏幕挣脱'});
const FORK={L:640,th:.07,a:.5,b:.78,gh:()=>G&&G.mode==='hard'?66:84,W:()=>G&&G.mode==='hard'?96:120};
/* 岔路弯道：前半段石墙往对的那条路拱，后半段对的那条路外侧再长出一块石头，整条路是个 S 形 */
const a2C=(e,xr)=>e.c+(e.up?-1:1)*(e.A||0)*(xr>0&&xr<e.L*.5?Math.sin(Math.PI*xr/(e.L*.5)):0),
 a2D=(e,xr)=>{if(!e.A||xr<=e.L*.5||xr>=e.L)return 0;const B=Math.max(0,(e.up?e.c:1-e.c)-FORK.th-FORK.W()/(yMax-yMin));return B*Math.sin(Math.PI*(xr-e.L*.5)/(e.L*.5))},
 a2Lane=(e,xr)=>{const c=a2C(e,xr),D=a2D(e,xr);return e.up?[D,c-FORK.th]:[c+FORK.th,1-D]};
Object.assign(PAT,{
 fork(g,x,d){const c=g.r(.42,.58),up=g.r()<.5,L=FORK.L,e={t:'fork',x,c,up,L,gs:g.r(.25,.75),A:g.mode==='simple'?.11:.13};g.E.push(e);
   const no=up?(1+c+FORK.th)/2:(c-FORK.th)/2;arc(g,x-280,c,c,3);for(let i=0;i<10;i++){const xr=60+i*55,[a,b]=a2Lane(e,xr);g.E.push({t:'pearl',x:x+xr,f:(a+b)/2})}arc(g,x+60,no,no,3);
   if(g.mode!=='simple')g.E.push({t:'jelly',x:x+L*.3,f:no,amp:.05,ph:g.r(0,6),sp:1});g.x+=L-200},
 vent(g,x,d){const hd=g.mode!=='simple',n=(hd?3:2)+(g.r()<d?1:0),p0=g.r(0,3);let top=g.r()<.5;for(let i=0;i<n;i++){g.E.push({t:'vent',x:x+i*210,ph:p0+i*1.15,top,h:hd?.5:.45});top=g.r()<.65?!top:top}arc(g,x-200,.5,.5,4);g.x+=(n-1)*210},
 lamp(g,x,d){const hd=g.mode!=='simple',top=g.r()<.55,must=(g.lampN=(g.lampN||0)+1)%3===0;
   if(must){g.E.push({t:'lamp',x,top,f:top?.04:.96,rx:g.r(210,250),ry:1.2,must:1});arc(g,x-420,.5,.5,4);g.x+=200;return}
   g.E.push({t:'lamp',x,top,f:top?.04:.96,rx:g.r(260,340),ry:g.r(hd?.5:.44,hd?.62:.56)});const f=top?.86:.14;arc(g,x-170,f,f,6);
   if(hd||g.r()<d*.8){g.E.push({t:'lamp',x:x+620,top:!top,f:top?.96:.04,rx:g.r(220,280),ry:g.r(.36,.46)});arc(g,x+310,.5,.5,3);g.x+=620}},
 /* 灯下鱼群：灯光底下的热泉，时不时喷一下 */
 lampv(g,x,d){const top=g.r()<.5;g.E.push({t:'lamp',x,top,f:top?.04:.96,rx:g.r(240,300),ry:g.r(.42,.5)});
   const p0=g.r(0,3);for(let i=0;i<2;i++)g.E.push({t:'vent',x:x-170+i*340,ph:p0+i*1.6,top:!top,h:.42});const f=top?.8:.2;arc(g,x-420,f,f,4);g.x+=260}});
const a2Slit=e=>{const cy=fy(e.c),h=fy(FORK.th)-yMin,t=e.up?cy+h:yMin,b=e.up?yMax:cy-h,gh=FORK.gh();return{t,b,h:gh,y:t+gh/2+8+(b-t-gh-16)*e.gs}};
function a2Hit(g,e,sx,y,dx,dist,dt,k){const F=g.fish;
  if(e.t==='fork'){const xr=fishSX-sx,cy=fy(a2C(e,xr)),ins=xr>0&&xr<e.L;
    if(ins&&Math.abs(F.y-cy)<fy(FORK.th)-yMin+16)hurt(1);
    {const D=a2D(e,xr)*(yMax-yMin);if(D>8&&(e.up?F.y<yMin+D+14:F.y>yMax-D-14))hurt(1)}
    if(fishSX>sx&&fishSX<sx+40&&e.lane==null)e.lane=F.y<cy?1:0;
    if(e.lane!=null&&e.lane!==(e.up?1:0)){if(!e.warn&&fishSX>sx+60){e.warn=1;g.combo=0;toast('走错路了！前面只剩一道窄缝，小心游过去',2.4,1)}
      const s=a2Slit(e);if(fishSX>sx+e.L*FORK.a-14&&fishSX<sx+e.L*FORK.b+14&&Math.abs(F.y-s.y)>s.h/2-15)hurt(1)}
    if(fishSX>sx+e.L)e.lane=null;return}
  if(e.t==='vent'){const s=a2Vent(e,g.t);if(s===2&&Math.abs(dx)<40&&(e.top?F.y<fy(e.h)+10:F.y>fy(1-e.h)-10))hurt(1);return}
  if(e.t==='lamp'){if(e.off||g.lcap||g.trap)return;const ry=e.ry*(yMax-yMin),q=(dx/e.rx)**2+((F.y-y)/ry)**2;
    if(q<1&&g.inv<=0){if(g.shield||g.whale){absorb();e.off=1;burst(sx,y,'#ffe9a8',16)}else a2CapStart(g,e)}}}
/* 灯光吸住小鱼：按箭头方向点屏幕挣脱，被拖到灯心就掉一颗星 */
const CAPD=[[0,-1],[1,0],[0,1],[-1,0]];
function a2CapStart(g,e){const hd=g.mode!=='simple',lx=e.x-g.scroll,ly=fy(e.f),d0=Math.hypot(lx-fishSX,ly-g.fish.y);
  g.lcap={e,k:0,need:hd?4:3,di:Math.floor(Math.random()*4),v:Math.max(70,d0/(hd?2.4:3.2)),ok:0};g.combo=0;g.fish.vy=0;SFX.hit();g.shake=.2;
  if(!g.tips.lcap){g.tips.lcap=1;toast('被灯光吸住了！看箭头，朝箭头的方向点屏幕，连点对几下就能挣脱',3.2,1)}}
function a2CapUpd(g,dt){const c=g.lcap,e=c.e,F=g.fish,lx=e.x-g.scroll,ly=fy(e.f),vx=lx-fishSX,vy=ly-F.y,d=Math.hypot(vx,vy);c.ok=Math.max(0,c.ok-dt);F.vy=0;
  if(d<34){g.lcap=null;e.off=1;g.inv=0;burst(fishSX,F.y,'#fff3b0',20);hurt(1);g.inv=Math.max(g.inv,1.6);if(state==='play')toast('被吸到灯心，掉了一颗星',1.8,1);return}
  const st=Math.min(d,c.v*dt);g.scroll+=vx/d*st;F.y=clamp(F.y+vy/d*st,yMin+22,yMax-18)}
function a2CapTap(cx,cy){const g=G,c=g.lcap;if(!c)return;const r=cv.getBoundingClientRect(),ux=(cx-r.left)/S-fishSX,uy=(cy-r.top)/S-g.fish.y,D=CAPD[c.di];
  if(Math.hypot(ux,uy)>24&&(ux*D[0]+uy*D[1])/Math.hypot(ux,uy)>.64)a2CapGo(g,c.di);else a2CapGo(g,-1)}
function a2CapGo(g,di){const c=g.lcap;if(!c)return;const e=c.e,F=g.fish,lx=e.x-g.scroll,ly=fy(e.f),vx=lx-fishSX,vy=ly-F.y,d=Math.hypot(vx,vy)||1;
  if(di===c.di){c.k++;c.ok=.25;SFX.tap();burst(fishSX,F.y,'#fff',6,1);g.scroll-=vx/d*55;F.y=clamp(F.y-vy/d*55,yMin+22,yMax-18);
    if(c.k>=c.need){g.lcap=null;e.off=1;g.inv=1.4;SFX.free();burst(fishSX,F.y,'#ffd23f',22);ftext('挣脱啦！',fishSX,F.y-50,'#ffe27a');return}
    let n;do n=Math.floor(Math.random()*4);while(n===c.di);c.di=n}
  else{SFX.hit();g.shake=.25;g.scroll+=vx/d*40;F.y=clamp(F.y+vy/d*40,yMin+22,yMax-18)}}
function a2CapDraw(g,t){const c=g.lcap,F=g.fish,e=c.e,lx=e.x-g.scroll,ly=fy(e.f),D=CAPD[c.di],ax=fishSX+D[0]*95,ay=clamp(F.y+D[1]*95,yMin+34,yMax-30);ctx.save();
  ctx.strokeStyle='rgba(255,240,170,.55)';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(fishSX,F.y);ctx.stroke();
  ctx.strokeStyle='rgba(255,240,170,.85)';ctx.lineWidth=3;for(let i=0;i<2;i++){ctx.beginPath();ctx.arc(fishSX,F.y,40+i*12+Math.sin(t*8+i)*4,0,TAU);ctx.stroke()}
  ctx.translate(ax,ay);ctx.rotate(Math.atan2(D[1],D[0]));const pu=1+Math.sin(t*14)*.08;ctx.scale(pu,pu);ctx.shadowColor='#4fe0b5';ctx.shadowBlur=18;ctx.fillStyle='#4fe0b5';ctx.strokeStyle='#fff';ctx.lineWidth=3;
  ctx.beginPath();ctx.moveTo(30,0);ctx.lineTo(4,-24);ctx.lineTo(4,-10);ctx.lineTo(-26,-10);ctx.lineTo(-26,10);ctx.lineTo(4,10);ctx.lineTo(4,24);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.stroke();ctx.restore();
  ctx.save();ctx.fillStyle='#fff';for(let i=0;i<c.need;i++){ctx.globalAlpha=i<c.k?1:.35;circ(fishSX+(i-(c.need-1)/2)*16,F.y-62,5)}ctx.restore()}
const a2Vent=(e,t)=>{const P=G&&G.mode==='hard'?2.8:3.4,c=(t+e.ph)%P;return c>P-1.1?2:c>P-2.1?1:0};
function a2Draw(e,sx,g,t,T){
  if(e.t==='fork'){const cy=fy(e.c),h=fy(FORK.th)-yMin,okY=e.up?(yMin+cy-h)/2:(cy+h+yMax)/2,H=yMax-yMin,tp=xr=>Math.min(1,xr/60,(e.L-xr)/40)**.6;ctx.save();ctx.fillStyle=T.rock;ctx.beginPath();
    for(let xr=0;xr<=e.L;xr+=16)ctx.lineTo(sx+xr,fy(a2C(e,xr))-h*tp(xr));for(let xr=e.L;xr>=0;xr-=16)ctx.lineTo(sx+xr,fy(a2C(e,xr))+h*tp(xr));ctx.fill();
    if(a2D(e,e.L*.75)*H>8){const y0=e.up?yMin-40:yMax+46;ctx.beginPath();ctx.moveTo(sx+e.L*.5,y0);for(let xr=e.L*.5;xr<=e.L;xr+=16){const D=a2D(e,xr)*H;ctx.lineTo(sx+xr,e.up?yMin+D:yMax-D)}ctx.lineTo(sx+e.L,y0);ctx.fill();
      ctx.fillStyle=T.rock2;for(let i=0;i<4;i++){const xr=e.L*(.6+i*.09),D=a2D(e,xr)*H;circ(sx+xr,e.up?yMin+D-14:yMax-D+14,5+hash(e.x+i)*4)}}
    ctx.fillStyle=T.rock2;for(let i=0;i<Math.floor(e.L/60);i++){const xr=80+i*60+hash(e.x+i)*20;if(xr<e.L-30)circ(sx+xr,fy(a2C(e,xr))+(hash(i+e.x*.1)-.5)*h,6+hash(i)*5)}
    const big=g.mode==='simple',r=(big?16:11)+Math.sin(t*4)*2,hx=sx-70;ctx.translate(hx,okY);ctx.rotate(t*.6);ctx.shadowColor='#fff8c0';ctx.shadowBlur=22;ctx.fillStyle='#fff8d0';ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,q=i%2?r*.35:r;ctx.lineTo(Math.cos(a)*q,Math.sin(a)*q)}ctx.fill();ctx.restore();
    ctx.save();ctx.globalAlpha=.25+.1*Math.sin(t*3);ctx.fillStyle='#fff8d0';ctx.fillRect(hx+20,okY-2,Math.max(0,sx+10-hx-20),4);ctx.restore();
    {const S=a2Slit(e),x0=sx+e.L*FORK.a,x1=sx+e.L*FORK.b;ctx.fillStyle=T.rock;ctx.fillRect(x0,S.t-30,x1-x0,S.y-S.h/2-S.t+30);ctx.fillRect(x0,S.y+S.h/2,x1-x0,S.b+30-S.y-S.h/2);ctx.fillStyle=T.rock2;for(let i=0;i<4;i++){circ(x0+18+i*(x1-x0-36)/3,S.y-S.h/2-14,5);circ(x0+18+i*(x1-x0-36)/3,S.y+S.h/2+14,5)}}
    const wy=e.up?(cy+h+yMax)/2:(yMin+cy-h)/2,wx=sx+e.L*.3;ctx.save();ctx.strokeStyle='rgba(20,30,60,.55)';ctx.lineWidth=4;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(wx,wy,14+i*12,t*3+i,t*3+i+4.2);ctx.stroke()}ctx.restore();return}
  if(e.t==='vent'){const s=a2Vent(e,t),b=yMax+30,top=fy(1-e.h);ctx.save();if(e.top){ctx.translate(0,yMin+yMax);ctx.scale(1,-1)}ctx.fillStyle=T.rock;ctx.beginPath();ctx.moveTo(sx-46,b);ctx.lineTo(sx-14,b-44);ctx.lineTo(sx+14,b-44);ctx.lineTo(sx+46,b);ctx.fill();ctx.fillStyle='#ff7a3a';ctx.globalAlpha=.6+.3*Math.sin(t*5);ctx.fillRect(sx-10,b-48,20,6);ctx.globalAlpha=1;
    if(s===1){ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=2;for(let i=0;i<6;i++){const q=((t*1.6+i/6)%1),yy=b-50-q*(b-50-top)*.5;ctx.beginPath();ctx.arc(sx+Math.sin(i*2+t*6)*10,yy,3+i%3,0,TAU);ctx.stroke()}}
    if(s===2){const gr=ctx.createLinearGradient(0,top,0,b);gr.addColorStop(0,'rgba(255,240,220,.15)');gr.addColorStop(1,'rgba(255,160,90,.75)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(sx-18,b-44);ctx.quadraticCurveTo(sx-34+Math.sin(t*20)*4,(top+b)/2,sx-26,top);ctx.lineTo(sx+26,top);ctx.quadraticCurveTo(sx+34+Math.sin(t*20+1)*4,(top+b)/2,sx+18,b-44);ctx.fill()}ctx.restore();return}
  if(e.t==='lamp'){const y=fy(e.f),R=e.rx||230,ry=(e.ry||.4)*(yMax-yMin);ctx.save();if(!e.off){ctx.save();ctx.translate(sx,y);ctx.scale(1,ry/R);const gr=ctx.createRadialGradient(0,0,4,0,0,R);gr.addColorStop(0,'rgba(255,240,170,.6)');gr.addColorStop(.75,'rgba(255,240,170,.22)');gr.addColorStop(1,'rgba(255,240,170,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(0,0,R,0,TAU);ctx.fill();
      ctx.strokeStyle='rgba(255,240,170,.45)';ctx.lineWidth=3*R/ry;ctx.setLineDash([10,10]);ctx.lineDashOffset=-t*20;ctx.beginPath();ctx.arc(0,0,R,0,TAU);ctx.stroke();ctx.restore()}
    ctx.strokeStyle='#c8c0b0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx,e.top?yMin-40:yMax+40);ctx.lineTo(sx,y);ctx.stroke();ctx.fillStyle='#6a6a80';ctx.fillRect(sx-12,y-(e.top?16:-4),24,12);
    ctx.fillStyle=e.off?'#556':'#fff3b0';if(!e.off){ctx.shadowColor='#ffe27a';ctx.shadowBlur=26}circ(sx,y+(e.top?6:-6),13);ctx.restore();return}}
function a2Node(e,t){
  if(e.k==='turbo'){ctx.rotate(Math.sin(t*1.5+e.x)*.1);ctx.fillStyle='#c89a5a';ctx.beginPath();ctx.arc(0,2,18,0,TAU);ctx.fill();ctx.fillStyle='#e8c890';ctx.beginPath();ctx.arc(-3,-2,11,0,TAU);ctx.fill();ctx.fillStyle='#fff8e8';circ(-5,-4,5);ctx.strokeStyle='#7a5a30';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,2,18,.4,2.6);ctx.stroke();return 1}
  if(e.k==='lobster'){ctx.fillStyle='#d0603a';ctx.beginPath();ctx.ellipse(0,0,22,9,0,0,TAU);ctx.fill();ctx.fillStyle='#b0482a';for(let i=0;i<3;i++)ctx.fillRect(-18+i*9,-8,5,16);ctx.strokeStyle='#d0603a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(18,-4);ctx.quadraticCurveTo(40,-24+Math.sin(t*3)*4,46,-6);ctx.moveTo(18,2);ctx.quadraticCurveTo(42,-10,48,8);ctx.stroke();ctx.fillStyle='#1b2a41';circ(16,-5,2);return 1}
  if(e.k==='skipjack'){const a=t*1.8+e.x*.01;ctx.translate(Math.cos(a)*14,Math.sin(a)*6);ctx.fillStyle='#4a6aa0';ctx.beginPath();ctx.ellipse(0,0,22,9,0,0,TAU);ctx.fill();ctx.fillStyle='#e8f0ff';ctx.beginPath();ctx.ellipse(2,4,16,4,0,0,TAU);ctx.fill();ctx.strokeStyle='#2a3a60';ctx.lineWidth=1.5;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-8+i*7,2);ctx.lineTo(-4+i*7,7);ctx.stroke()}ctx.fillStyle='#2a3a60';ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(-30,-9);ctx.lineTo(-30,9);ctx.fill();ctx.fillStyle='#1b2a41';circ(14,-2,2);return 1}
  return 0}
function a2Build(L,g){const lp=g.E.filter(e=>e.t==='lamp');if(lp.length)g.E=g.E.filter(e=>!(e.t==='rock'||e.t==='jelly'||e.t==='octo')||!lp.some(l=>Math.abs(e.x-l.x)<l.rx+90));
  const fk=g.E.filter(e=>e.t==='fork');if(!fk.length)return;g.E=g.E.filter(e=>{if(e.t==='fork'||e.t==='pearl'||e.t==='node'||e.t==='cp'||e.t==='fin'||e.t==='boss')return true;return!fk.some(f=>e.x>f.x-60&&e.x<f.x+f.L+60&&!(e.t==='jelly'&&e.x===f.x+f.L*.45))});
  for(const e of g.E)if(e.t==='node'){const f=fk.find(q=>e.x>q.x-40&&e.x<q.x+q.L+40);if(f)e.x=f.x-140}}
function a2BG(th,sc,t){
  if(th===16||th===18||th===19){ctx.fillStyle='rgba(255,255,240,.7)';for(let i=0;i<26;i++){const x=(((i*83-sc*.04)%(VW+40))+VW+40)%(VW+40)-20,y=yMin+((i*47)%140);ctx.globalAlpha=.25+.25*Math.sin(t*2+i);ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1}
  if(th===17){const o=sc*.18;for(let n=Math.floor(o/600)-1;n*600-o<VW+300;n++){const x=n*600-o+hash(n+11)*120,b=PH-150;ctx.fillStyle='rgba(40,34,36,.8)';ctx.beginPath();ctx.moveTo(x-180,b);ctx.lineTo(x-30,b-210);ctx.lineTo(x+30,b-210);ctx.lineTo(x+180,b);ctx.fill();ctx.fillStyle='rgba(255,110,50,'+(.25+.15*Math.sin(t*2+n))+')';ctx.fillRect(x-24,b-214,48,8);
    ctx.fillStyle='rgba(200,200,200,.12)';for(let i=0;i<4;i++){const q=(t*.15+i/4)%1;ctx.beginPath();ctx.arc(x+Math.sin(q*6+n)*20,b-220-q*200,16+q*30,0,TAU);ctx.fill()}}}
  if(th===18||th===19){const o=sc*.2;for(let n=Math.floor(o/420)-1;n*420-o<VW+200;n++){const x=n*420-o+hash(n+3)*80,b=PH-150;ctx.fillStyle='rgba(30,36,70,.85)';ctx.fillRect(x-10,b-190,20,190);ctx.fillRect(x-18,b-200,36,12);
    ctx.save();ctx.globalAlpha=.12;ctx.fillStyle='#fff3b0';const a=Math.sin(t*.8+n)*.6;ctx.beginPath();ctx.moveTo(x,b-196);ctx.lineTo(x+Math.cos(a-.12)*600,b-196+Math.sin(a-.12)*600);ctx.lineTo(x+Math.cos(a+.12)*600,b-196+Math.sin(a+.12)*600);ctx.fill();ctx.restore();ctx.fillStyle='#fff3b0';circ(x,b-196,7)}}}
/* ---------- 牧鱼 Boss：俯视潟湖口的赶鱼小游戏 ----------
   按住拖动小鱼，鱼群躲着小鱼走；灯光会把鱼群吸回去转圈。把够数的鱼赶进右边的潟湖口。 */
const HD={A:()=>({x0:16,x1:VW-16,y0:yMin+8,y1:yMax-8}),
 geo(){const a=HD.A(),vert=(a.y1-a.y0)>(a.x1-a.x0)*1.2,U0=vert?a.y0:a.x0,U1=vert?a.y1:a.x1,V0=vert?a.x0:a.y0,V1=vert?a.x1:a.y1,uw=U1-Math.max(vert?120:70,(U1-U0)*.11);
  return{a,vert,U0,U1,V0,V1,uw,lu:U0+(uw-U0)*.4,lv:(V0+V1)/2,R:Math.min(uw-U0,V1-V0)*.15,
   toL:(x,y)=>vert?[a.y0+a.y1-y,x]:[x,y],toS:(u,v)=>vert?[v,a.y0+a.y1-u]:[u,v]}}};
function herdMk(g,hd,fin){const B={k:'herd',mini:1,fin,tries:0,
  reset(){const hd=G.mode==='hard',o=HD.geo(),N=hd?28:24;this.n=0;this.need=hd?20:16;this.T=hd?75:85;this.t=this.seen?-3:-9;this.seen=1;this.ba=0;
    this.pu=o.U0+30;this.pv=o.lv;this.tu=this.pu;this.tv=this.pv;this.mc=.5;
    this.f=Array.from({length:N},(_,i)=>{const q=i/N*TAU,r=o.R*(.5+Math.random()*.6);return{u:o.lu+Math.cos(q)*r,v:o.lv+Math.sin(q)*r,vu:0,vv:0,in:0,ph:Math.random()*6}})}};
  B.reset();return B}
function herdMouth(B,o){const L=o.V1-o.V0,h=L*(G.mode==='hard'?.26:.34),c=o.V0+L*B.mc;return[c-h/2,c+h/2]}
function herdPt(cx,cy){const B=G.boss;if(B.t<-3){B.t=-3;B.pu=B.tu=HD.geo().U0+60;B.pv=B.tv=HD.geo().lv;return}const r=cv.getBoundingClientRect(),[u,v]=HD.geo().toL((cx-r.left)/S,(cy-r.top)/S);B.tu=u;B.tv=v}
function herdUpd(B,dt){const g=G,hd=g.mode==='hard',o=HD.geo(),lu=o.lu,lv=o.lv,R=o.R,uw=o.uw;B.t+=dt;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;
  if(hd)B.mc=.5+Math.sin(B.t*.35)*.2;B.ba+=dt*(hd?.75:0);const[m0,m1]=herdMouth(B,o);
  if(B.t<-3){const k=clamp((B.t+6.2)/2.4,0,1),e=1-(1-k)*(1-k);B.pu=B.tu=lerp(o.U0-(o.vert?240:100),o.U0+60,e);B.pv=B.tv=lv+Math.sin(B.t*2)*18;B.pdu=1}
  else{const du=B.tu-B.pu,dv=B.tv-B.pv,d=Math.hypot(du,dv),s=Math.min(d,560*dt);if(d>1){B.pu+=du/d*s;B.pv+=dv/d*s;B.pdu=du}B.pu=clamp(B.pu,o.U0+10,uw-14);B.pv=clamp(B.pv,o.V0+10,o.V1-10)}
  const live=B.f.filter(f=>!f.in);let cu=0,cv2=0;for(const f of live){cu+=f.u;cv2+=f.v}cu/=live.length||1;cv2/=live.length||1;const FR=hd?140:150;
  for(const f of live){let au=0,av=0;const pu=f.u-B.pu,pv=f.v-B.pv,pd=Math.hypot(pu,pv)||1;
    if(pd<FR){const k=(1-pd/FR)*(hd?1000:1100);au+=pu/pd*k;av+=pv/pd*k}
    const qu=f.u-lu,qv=f.v-lv,qd=Math.hypot(qu,qv)||1;
    if(qd<R*2.1){const rk=(qd-R*.75)/R*(hd?330:300);au-=qu/qd*rk;av-=qv/qd*rk;au+=-qv/qd*150;av+=qu/qd*150}
    else{const pull=hd?80:70;au-=qu/qd*pull;av-=qv/qd*pull}
    if(hd){const an=Math.atan2(qv,qu),df=Math.atan2(Math.sin(an-B.ba),Math.cos(an-B.ba));if(Math.abs(df)<.16&&qd<(o.U1-o.U0)*.8){au-=qu/qd*500;av-=qv/qd*500;f.lit=.2}}
    au+=(cu-f.u)*.25;av+=(cv2-f.v)*.25;au+=Math.sin(B.t*1.3+f.ph)*40;av+=Math.cos(B.t*1.1+f.ph*1.7)*40;
    f.vu=(f.vu+au*dt)*Math.max(0,1-1.6*dt);f.vv=(f.vv+av*dt)*Math.max(0,1-1.6*dt);const sp=Math.hypot(f.vu,f.vv),mx=hd?240:220;if(sp>mx){f.vu*=mx/sp;f.vv*=mx/sp}
    f.u+=f.vu*dt;f.v+=f.vv*dt;f.lit=Math.max(0,(f.lit||0)-dt);
    if(f.v<o.V0+6){f.v=o.V0+6;f.vv=Math.abs(f.vv)}if(f.v>o.V1-6){f.v=o.V1-6;f.vv=-Math.abs(f.vv)}if(f.u<o.U0+6){f.u=o.U0+6;f.vu=Math.abs(f.vu)}
    if(f.u>uw-6){if(f.v>m0+4&&f.v<m1-4){if(f.u>uw+16){f.in=1;B.n++;SFX.save();const[x,y]=o.toS(f.u,f.v);burst(x,y,'#bff6e6',8,1);g.bonus+=15}}else if(f.u<uw+6){f.u=uw-6;f.vu=-Math.abs(f.vu)*.6}}}
  if(B.t<0)return;
  if(B.n>=B.need){for(const f of B.f)f.in=1;bossWin(B,'鱼群游回了潟湖！');g.fish.y=(yMin+yMax)/2;g.inv=2;return}
  if(B.t>=B.T)die('herd')}
function herdDraw(B,t){}
/* 进 Boss 前的小动画：鱼群围着灯打转，小鱼游过来，决定帮它们回潟湖。点屏幕可跳过 */
function herdIntro(B,t,o){const a=o.a,cy=(a.y0+a.y1)/2,fs=(VW<500?15:18)*U,box=(y,h)=>{ctx.fillStyle='rgba(6,40,70,.66)';ctx.fillRect(0,y,VW,h)};ctx.textAlign='center';
  const[lx,ly]=o.toS(o.lu,o.lv);ctx.strokeStyle=`rgba(255,240,170,${.35+.25*Math.sin(t*4)})`;ctx.lineWidth=3;ctx.setLineDash([6,8]);ctx.lineDashOffset=t*30;ctx.beginPath();ctx.arc(lx,ly,o.R*1.5,0,TAU);ctx.stroke();ctx.setLineDash([]);
  ctx.font=`${fs}px ${FONT}`;ctx.fillStyle='#fff';
  if(B.t<-6.2){const y=o.vert?a.y0+(a.y1-a.y0)*.28:a.y1-72*U;box(y,64*U);ctx.fillStyle='#fff';ctx.globalAlpha=clamp((B.t+9)*2,0,1);ctx.fillText(tl('灯塔底下，一大群鱼围着灯光打转，'),VW/2,y+26*U);ctx.fillText(tl('怎么也游不出去。'),VW/2,y+50*U);ctx.globalAlpha=1}
  else if(B.t>-4.6){const[px,py]=o.toS(B.pu,B.pv),L=[tl('它们被困住了！'),tl('我来帮它们游回潟湖！')],w=Math.max(...L.map(x=>ctx.measureText(x).width))+28*U,h=58*U,bx=clamp(px,w/2+8,VW-w/2-8),by=py-50*U-h;
    ctx.fillStyle='#fff';ctx.beginPath();if(ctx.roundRect)ctx.roundRect(bx-w/2,by,w,h,14*U);else ctx.rect(bx-w/2,by,w,h);ctx.fill();ctx.beginPath();ctx.moveTo(px-8,by+h-1);ctx.lineTo(px,by+h+12*U);ctx.lineTo(px+8,by+h-1);ctx.fill();
    ctx.fillStyle='#1b2a41';L.forEach((x,i)=>ctx.fillText(x,bx,by+24*U+i*24*U))}
  ctx.font=`${12*U}px ${FONT}`;ctx.fillStyle='rgba(255,255,255,.7)';ctx.fillText(tl('点屏幕跳过'),VW/2,o.vert?a.y0+24*U:a.y0+20*U)}
function herdHud(B,t){const g=G,o=HD.geo(),a=o.a,R=o.R,uw=o.uw,[m0,m1]=herdMouth(B,o),hd=g.mode==='hard';ctx.save();
  {const gr=ctx.createLinearGradient(0,0,0,VT);gr.addColorStop(0,'#1c3a66');gr.addColorStop(1,'#0b1a38');ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT)}
  ctx.fillStyle='rgba(255,255,240,.5)';for(let i=0;i<40;i++){ctx.globalAlpha=.2+.2*Math.sin(t*1.5+i);ctx.fillRect((i*97)%VW,a.y0+(i*61)%(a.y1-a.y0),2,2)}ctx.globalAlpha=1;
  ctx.save();if(o.vert){ctx.translate(0,a.y0+a.y1);ctx.rotate(-Math.PI/2)}
  const E0=o.V0-400,E1=o.V1+400;{const gr=ctx.createLinearGradient(uw,0,o.U1+40,0);gr.addColorStop(0,'#2fb59a');gr.addColorStop(1,'#7fe0c8');ctx.fillStyle=gr;ctx.fillRect(uw,E0,o.U1+400-uw,E1-E0)}
  ctx.fillStyle='#c26a5a';ctx.fillRect(uw-10,E0,26,m0-E0);ctx.fillRect(uw-10,m1,26,E1-m1);ctx.fillStyle='#e8907a';for(let v=m0-10;v>o.V0-30;v-=22)circ(uw+3,v,7);for(let v=m1+10;v<o.V1+30;v+=22)circ(uw+3,v,7);
  ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.setLineDash([8,6]);ctx.lineDashOffset=-t*20;ctx.beginPath();ctx.moveTo(uw+3,m0);ctx.lineTo(uw+3,m1);ctx.stroke();ctx.setLineDash([]);
  ctx.save();ctx.translate(uw+Math.max(34,(o.U1-uw)/2+8),(m0+m1)/2);ctx.rotate(o.vert?Math.PI/2:-Math.PI/2);ctx.fillStyle='#fff';ctx.font=`${15*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('潟湖口'),0,0);ctx.restore();
  {const gr=ctx.createRadialGradient(o.lu,o.lv,6,o.lu,o.lv,R*2.1);gr.addColorStop(0,'rgba(255,240,170,.65)');gr.addColorStop(.45,'rgba(255,240,170,.22)');gr.addColorStop(1,'rgba(255,240,170,0)');ctx.fillStyle=gr;ctx.beginPath();ctx.arc(o.lu,o.lv,R*2.1,0,TAU);ctx.fill()}
  if(hd){ctx.save();ctx.globalAlpha=.22;ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.moveTo(o.lu,o.lv);ctx.arc(o.lu,o.lv,(o.U1-o.U0)*.8,B.ba-.16,B.ba+.16);ctx.fill();ctx.restore()}
  ctx.fillStyle='#4a4a62';circ(o.lu,o.lv,16);ctx.fillStyle='#fff3b0';ctx.shadowColor='#ffe27a';ctx.shadowBlur=24;circ(o.lu,o.lv,9);ctx.shadowBlur=0;
  for(const f of B.f){if(f.in)continue;ctx.save();ctx.translate(f.u,f.v);ctx.rotate(Math.atan2(f.vv,f.vu));ctx.fillStyle=f.lit>0?'#fff3b0':'#cfe0f0';ctx.beginPath();ctx.ellipse(0,0,9,3.6,0,0,TAU);ctx.fill();ctx.beginPath();ctx.moveTo(-8,0);ctx.lineTo(-14,-4);ctx.lineTo(-14,4);ctx.fill();ctx.restore()}
  ctx.save();ctx.translate(B.pu,B.pv);if((B.pdu||1)<0)ctx.scale(-1,1);drawFish(0,0,0,t,{s:.75,...skin()});ctx.restore();
  if(B.t>=-3){ctx.strokeStyle='rgba(255,255,255,.16)';ctx.lineWidth=2;ctx.setLineDash([4,8]);ctx.beginPath();ctx.arc(B.pu,B.pv,hd?140:150,0,TAU);ctx.stroke();ctx.setLineDash([])}ctx.restore();
  if(B.t<-3){herdIntro(B,t,o);ctx.restore();return}
  ctx.fillStyle='#fff';ctx.textAlign='center';const tl0=Math.max(0,Math.ceil(B.T-Math.max(0,B.t))),y0=o.vert?a.y1-46*U:a.y0+22*U;ctx.font=`${18*U}px ${FONT}`;ctx.lineWidth=4*U;ctx.strokeStyle='rgba(6,40,70,.7)';
  const s1=tl('回家的鱼 '+B.n+' / '+B.need),s2=tl('还剩 '+tl0+' 秒');ctx.strokeText(s1,VW/2,y0);ctx.fillText(s1,VW/2,y0);ctx.fillStyle=tl0<=10?'#ff9f8f':'#fff';ctx.strokeText(s2,VW/2,y0+26*U);ctx.fillText(s2,VW/2,y0+26*U);
  if(B.t<0){ctx.fillStyle='rgba(6,40,70,.6)';ctx.fillRect(0,(a.y0+a.y1)/2-70*U,VW,140*U);ctx.fillStyle='#fff';ctx.font=`${(VW<500?14:17)*U}px ${FONT}`;
    const L=[tl('按住屏幕拖动小鱼，鱼群会躲着你走'),tl('别让鱼群回到灯光里，把它们赶进潟湖口'),tl(Math.ceil(-B.t)+' 秒后开始')];L.forEach((x,i)=>ctx.fillText(x,VW/2,(a.y0+a.y1)/2-28*U+i*30*U))}
  ctx.restore()}
cv.addEventListener('pointermove',e=>{const B=G&&G.boss;if(state==='play'&&B&&B.mini&&!B.done&&B.t>=-3&&(e.buttons||e.pointerType==='mouse'))herdPt(e.clientX,e.clientY)});
