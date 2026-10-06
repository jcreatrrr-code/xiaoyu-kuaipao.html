/* ---------- 第二卷 第三幕：熔岩海岸、浮石海、星光海、同席 ---------- */
TH.push(
 {n:'熔岩海岸',top:'#7a4a3a',bot:'#1a0e10',far:'#5a3030',mid:'#40222a',sand:'#2e2624',rock:'#4a3430',rock2:'#2a1c1a',weed:'#7a6a3a'},
 {n:'浮石海',top:'#8a9aa8',bot:'#1e2a38',far:'#6a7a8a',mid:'#4a5a6a',sand:'#a8a090',rock:'#7a7468',rock2:'#5a564c',weed:'#6a9a8a'},
 {n:'星光海',top:'#1a2448',bot:'#04060f',far:'#141c3a',mid:'#0e1430',sand:'#3a3a50',rock:'#3a4060',rock2:'#262a40',weed:'#3a6a7a'},
 {n:'同席',top:'#3a6a9a',bot:'#0c2238',far:'#2f5a80',mid:'#234a6a',sand:'#d8cca8',rock:'#6a7a8a',rock2:'#4a5a6a',weed:'#5fb0a0'});
LV.push(
 {name:'熔岩海岸',vol:2,fish:['mack','tuna','bream'],len:210,theme:20,nodes:['grouper'],gname:'石斑鱼',pool:{pearls:2,lava:12,rockB:2,rockT:1,octo:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'浮石海',vol:2,fish:['sard','saury','mack'],len:210,theme:21,tool:'opot',nodes:['tako'],gname:'小章鱼',pool:{pearls:2,pumice:8,lava:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'星光海',vol:2,fish:['sard','yellow','saury'],len:220,theme:22,night:1,nodes:['parrot'],gname:'鹦嘴鱼',pool:{pearls:1,sline:9,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'同席',vol:2,fish:['sard','bream'],len:200,theme:23,boss:'light',gtxt:'把灯塔的光还给大海',pool:{pearls:2,lava:2,pumice:2,lamp:1,rockB:1,shield:1},goal:{k:'boss'},extra:[20,30]});
Object.assign(FISH,{grouper:{n:'石斑鱼',c:['#f6e2c8','#a8643a','#5a3018'],s:1,x:1},tako:{n:'小章鱼',c:['#ffe0d8','#e0705a','#9a3a2a'],s:1,x:1},parrot:{n:'鹦嘴鱼',c:['#e0fff4','#3fc8a8','#2a7aa0'],s:1,x:1}});
Object.assign(NODE,{grouper:{tool:'',hp:2,f:.86,no:''},tako:{tool:'opot',hp:1,f:.3,no:'小章鱼躲在浮石底下，要用章鱼罐',pot:1},parrot:{tool:'',hp:1,f:.5,no:''}});
Object.assign(BOSSMSG,{light:'灯塔的光在一明一暗地跳！点灯塔游过去，在它暗下去的那一下再点一次，把光还给大海'});
Object.assign(TIPS,{lava:'海面上出现黑影，就是熔岩块要掉下来了！别待在黑影正下方',pumice:'浮石会慢慢往下压，从它底下钻过去，别被挤到',sline:'太黑了！顺着星星连成的线游，线上没有礁石，还会加速'});
/* 熔岩块：先在海面投下影子，再砸进海里，落到海底变成一块烫石头 */
const LAVA={W:()=>G&&G.mode==='hard'?.75:.95,fall:1};
SFX.boom=()=>{snd(110,.45,'sawtooth',.13,35);setTimeout(()=>snd(70,.5,'square',.08,30),90)};
Object.assign(PAT,{
 lava(g,x,d){const hd=g.mode!=='simple',n=(hd?3:2)+(g.r()<d?1:0);const sp=hd?125:150,q0=g.r(.3,.9);for(let i=0;i<n;i++)g.E.push({t:'lava',x:x+i*sp,r:g.r(24,34),q:clamp(q0+g.r(-.08,.08),.2,.95),k:0,y:0});arc(g,x-240,.5,.5,3);g.x+=(n-1)*sp},
 pumice(g,x,d){const hd=g.mode!=='simple',w=g.r(240,hd?440:360),h1=g.r(hd?.4:.32,hd?.52:.42),gap=hd?.24:.3;g.E.push({t:'pumice',x,w,h0:.06,h1});
   if(g.r()<.45+d*.4){const hb=g.r(.12,Math.max(.13,1-h1-gap));g.E.push({t:'rock',x:x+g.r(-w*.2,w*.2),w:g.r(90,130),h:hb,top:0});arc(g,x-w/2-60,h1+(1-h1-hb)/2,h1+(1-h1-hb)/2,6)}
   else arc(g,x-w/2-60,(h1+1)/2,(h1+1)/2,6)},
 sline(g,x,d){const hd=g.mode!=='simple',n=5,pts=[];let f=g.r(.3,.7);for(let i=0;i<n;i++){pts.push([i*150,f]);f=clamp(f+g.r(-.3,.3),.18,.82)}
   g.E.push({t:'sline',x,pts,L:(n-1)*150});
   for(let i=0;i<n-1;i++){const xr=i*150+75,m=(pts[i][1]+pts[i+1][1])/2,gap=hd?.14:.17;
     if(m>.42)g.E.push({t:'rock',x:x+xr,w:g.r(70,100),h:clamp(m-gap,.08,.6),top:1});if(m<.58)g.E.push({t:'rock',x:x+xr,w:g.r(70,100),h:clamp(1-m-gap,.08,.6),top:0})}
   for(const p of pts)g.E.push({t:'pearl',x:x+p[0],f:p[1],star:1});g.x+=(n-1)*150-100}});
const a3SlY=(e,xr)=>{const p=e.pts;if(xr<=0)return p[0][1];for(let i=0;i<p.length-1;i++)if(xr<=p[i+1][0]){const k=(xr-p[i][0])/(p[i+1][0]-p[i][0]);return lerp(p[i][1],p[i+1][1],k)}return p[p.length-1][1]};
const a3Pd=(e,sx)=>{const p=clamp(1-(sx-fishSX)/(VW*.85),0,1);return e.h0+(e.h1-e.h0)*(1-(1-p)*(1-p))};
/* 熔岩海岸：火山隔几秒喷一次，震屏、泛红，前方连着砸下几块熔岩 */
function a3Tick(g,dt){if(g.ink>0)g.ink-=dt;if(!g.L||g.L.theme!==20||g.boss)return;const hd=g.mode!=='simple';g.erF=Math.max(0,(g.erF||0)-dt*1.6);
  if(g.erT==null)g.erT=3;g.erT-=dt;if(g.erT>0||g.t<2)return;g.erT=(hd?3.6:5.5)+Math.random()*2;g.erF=1;g.shake=Math.max(g.shake,.45);SFX.boom();
  if(!g.tips.erupt){g.tips.erupt=1;toast('火山喷发了！看清海面上的黑影，一块接一块躲开',2.6,1)}
  const n=hd?3+(Math.random()<.5?1:0):2,x0=g.scroll+fishSX+g.speed*(LAVA.W()+.3*LAVA.fall)+60;
  for(let i=0;i<n;i++)g.E.push({t:'lava',x:x0+i*(hd?115:160)+Math.random()*30,r:24+Math.random()*10,q:.3,k:0,y:0,er:1})}
function a3Hit(g,e,sx,y,dx,dt){const F=g.fish,H=yMax-yMin;
  if(e.t==='lava'){if(e.k===0&&sx-fishSX<g.speed*(LAVA.W()+e.q*LAVA.fall)+20){e.k=1;e.w=0}
    if(e.k===1){e.w+=dt;if(e.w>=LAVA.W()){e.k=2;e.y=yMin-40;burst(sx,yMin,'#ff9a5a',10)}}
    else if(e.k===2){e.y+=H/LAVA.fall*dt;if(Math.random()<.5)g.parts.push({x:sx+(Math.random()-.5)*16,y:e.y-e.r,vx:0,vy:-30,l:.6,c:'rgba(255,255,255,.8)',r:2+Math.random()*3,k:1});
      if(e.y>=yMax-e.r*.6){e.y=yMax-e.r*.6;e.k=3;g.shake=Math.max(g.shake,.22);burst(sx,e.y,'#ffb070',20)}}
    if(e.k===3&&e.er&&(e.lt=(e.lt||0)+dt)>1.5){e.gone=1;burst(sx,e.y,'#8a6a5a',8);return}
    if(e.k>=2&&Math.hypot(dx,F.y-e.y)<e.r+18)hurt(1);return}
  if(e.t==='pumice'){const h=a3Pd(e,sx)*H;if(e.node)e.node.f=a3Pd(e,sx)+.07;if(Math.abs(dx)<e.w/2+12&&F.y<yMin+h+16)hurt(1);return}
  if(e.t==='sline'){const xr=fishSX-sx;if(xr>=0&&xr<=e.L&&Math.abs(F.y-fy(a3SlY(e,xr)))<34){if(!(g.boost>0)&&!g.tips.boost){g.tips.boost=1;ftext('顺着星线，加速！',fishSX,F.y-50,'#fff8c0')}g.boost=.35;e.lit=1}return}}
function a3Draw(e,sx,g,t,T){const H=yMax-yMin;
  if(e.t==='lava'){ctx.save();
    if(e.k===1){const k=e.w/LAVA.W(),bl=Math.sin(t*20)>0;ctx.fillStyle=`rgba(20,8,8,${.25+.4*k})`;ctx.beginPath();ctx.ellipse(sx,yMin+6,e.r*(1.6-k*.5),7,0,0,TAU);ctx.fill();
      ctx.strokeStyle=`rgba(255,120,60,${bl?.7:.35})`;ctx.lineWidth=3;ctx.setLineDash([10,10]);ctx.beginPath();ctx.moveTo(sx,yMin+14);ctx.lineTo(sx,yMax);ctx.stroke();ctx.setLineDash([]);
      ctx.fillStyle='#ffd0a0';ctx.font=`${22*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText('!',sx,yMin+40)}
    if(e.k>=2){const hot=e.k===2?1:.55+.25*Math.sin(t*3);ctx.translate(sx,e.y);ctx.rotate(e.x*.01);ctx.shadowColor='#ff6a2a';ctx.shadowBlur=18*hot;ctx.fillStyle='#3a2420';ctx.beginPath();
      for(let i=0;i<7;i++){const a=i*TAU/7,r=e.r*(.8+hash(e.x+i)*.35);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath();ctx.fill();ctx.shadowBlur=0;
      ctx.strokeStyle=`rgba(255,${120+60*hot},60,${hot})`;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-e.r*.5,-e.r*.2);ctx.lineTo(0,e.r*.1);ctx.lineTo(e.r*.4,-e.r*.3);ctx.moveTo(0,e.r*.1);ctx.lineTo(e.r*.1,e.r*.5);ctx.stroke()}
    ctx.restore();return}
  if(e.t==='pumice'){const h=a3Pd(e,sx)*H,b=yMin+h,bob=Math.sin(t*1.5+e.x)*3;ctx.save();ctx.fillStyle='#c8bea8';ctx.beginPath();ctx.moveTo(sx-e.w/2-10,yMin-40);
    for(let x=-e.w/2-10;x<=e.w/2+10;x+=18)ctx.lineTo(sx+x,b+bob-Math.abs(x)/(e.w/2)*h*.25+hash(e.x+x)*14);ctx.lineTo(sx+e.w/2+10,yMin-40);ctx.fill();
    ctx.fillStyle='#9a927e';for(let i=0;i<Math.floor(e.w/22);i++){const xx=sx-e.w/2+12+i*22,yy=yMin+hash(e.x+i)*Math.max(10,h*.75);circ(xx,yy,3+hash(i+e.x)*4)}
    ctx.fillStyle='#e8e0cc';for(let x=-e.w/2;x<=e.w/2;x+=36)circ(sx+x,b+bob-Math.abs(x)/(e.w/2)*h*.25,6+hash(e.x+x*3)*5);ctx.restore();return}
  if(e.t==='sline'){ctx.save();g.slines=g.slines||[];g.slines.push([e,sx]);ctx.restore()}}
function a3SlDraw(g,t){if(!g.slines)return;ctx.save();ctx.globalCompositeOperation='lighter';
  for(const[e,sx]of g.slines){ctx.strokeStyle=`rgba(255,248,200,${e.lit?.75:.4+.1*Math.sin(t*3)})`;ctx.lineWidth=e.lit?5:3;ctx.setLineDash([2,10]);ctx.lineDashOffset=-t*40;ctx.beginPath();
    for(const p of e.pts)ctx.lineTo(sx+p[0],fy(p[1]));ctx.stroke();ctx.setLineDash([]);
    for(const p of e.pts){const r=10+Math.sin(t*4+p[0])*2,x=sx+p[0],y=fy(p[1]),hg=ctx.createRadialGradient(x,y,2,x,y,r*2.6);hg.addColorStop(0,'rgba(255,240,150,.55)');hg.addColorStop(1,'rgba(255,240,150,0)');ctx.fillStyle=hg;circ(x,y,r*2.6);ctx.fillStyle='#fff8d0';ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,q=i%2?r*.4:r;ctx.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}ctx.fill()}}
  ctx.restore();g.slines=null}
/* 星光海：灯全熄了，只看得见小鱼身边和星线 */
function a3Night(g,t){const F=g.fish,r=g.mode==='hard'?170:200,gr=ctx.createRadialGradient(fishSX,F.y,r*.45,fishSX,F.y,r);gr.addColorStop(0,'rgba(4,6,18,0)');gr.addColorStop(1,'rgba(4,6,18,.93)');ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT);
  ctx.fillStyle='rgba(255,255,240,.8)';for(let i=0;i<30;i++){const x=(((i*97-g.scroll*.03)%(VW+40))+VW+40)%(VW+40)-20,y=yMin+((i*53)%Math.max(60,(yMax-yMin)*.9));ctx.globalAlpha=.2+.25*Math.sin(t*2+i);ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1;a3SlDraw(g,t)}
function a3Node(e,t){
  if(e.k==='grouper'){ctx.rotate(Math.sin(t*1.2+e.x)*.08);ctx.fillStyle='#a8643a';ctx.beginPath();ctx.ellipse(0,0,24,12,0,0,TAU);ctx.fill();ctx.fillStyle='#5a3018';for(let i=0;i<6;i++)circ(-14+i*6,(i%2?-4:3),2.5);ctx.beginPath();ctx.moveTo(-22,0);ctx.lineTo(-34,-10);ctx.lineTo(-34,10);ctx.fill();ctx.fillStyle='#f6e2c8';ctx.beginPath();ctx.ellipse(16,4,6,3,0,0,TAU);ctx.fill();ctx.fillStyle='#1b2a41';circ(14,-3,2.4);return 1}
  if(e.k==='tako'){const w=Math.sin(t*3+e.x);ctx.fillStyle='#e0705a';ctx.strokeStyle='#e0705a';ctx.lineWidth=4;ctx.lineCap='round';for(let i=0;i<6;i++){const a=.4+i*.47;ctx.beginPath();ctx.moveTo(Math.cos(a)*8,Math.sin(a)*6);ctx.quadraticCurveTo(Math.cos(a)*16+w*3,Math.sin(a)*14+8,Math.cos(a)*20,Math.sin(a)*18+10);ctx.stroke()}
    circ(0,-4,13);ctx.fillStyle='#fff';circ(-5,-4,4);circ(5,-4,4);ctx.fillStyle='#1b2a41';circ(-5,-3,2);circ(5,-3,2);return 1}
  if(e.k==='parrot'){ctx.rotate(Math.sin(t*1.6+e.x)*.1);ctx.fillStyle='#3fc8a8';ctx.beginPath();ctx.ellipse(0,0,22,11,0,0,TAU);ctx.fill();ctx.fillStyle='#2a7aa0';ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(-32,-9);ctx.lineTo(-32,9);ctx.fill();for(let i=0;i<3;i++){ctx.fillStyle=['#ffd23f','#ff8fc0','#7fd8ff'][i];circ(-8+i*7,-2+(i%2)*4,3)}
    ctx.fillStyle='#e8fff8';ctx.beginPath();ctx.moveTo(19,-3);ctx.lineTo(27,0);ctx.lineTo(19,4);ctx.fill();ctx.fillStyle='#1b2a41';circ(13,-3,2.2);return 1}
  return 0}
function a3Build(L,g){
  const pm=g.E.filter(e=>e.t==='pumice');if(pm.length){g.E=g.E.filter(e=>!((e.t==='jelly'||e.t==='octo'||e.t==='rock'&&e.top)&&pm.some(p=>Math.abs(e.x-p.x)<p.w/2+80)));
    let j=0;for(const e of g.E)if(e.t==='node'&&e.k==='tako'){const p=pm.slice().sort((a,b)=>Math.abs(a.x-e.x)-Math.abs(b.x-e.x)).find(q=>!q.node);if(p){p.node=e;e.x=p.x+(j++%2?-1:1)*p.w*.18;e.f=p.h1+.07}}}
  const sl=g.E.filter(e=>e.t==='sline');if(sl.length){g.E=g.E.filter(e=>!((e.t==='jelly'||e.t==='octo'||e.t==='wild')&&sl.some(s=>e.x>s.x-60&&e.x<s.x+s.L+60)));
    for(const e of g.E)if(e.t==='node'){const s=sl.find(q=>e.x>q.x-80&&e.x<q.x+q.L+80);if(s){e.x=s.x+s.pts[2][0];e.f=s.pts[2][1]}}}
  const lv=g.E.filter(e=>e.t==='lava');for(const e of g.E)if(e.t==='node'&&lv.some(l=>Math.abs(e.x-l.x)<80))e.x-=160}
function a3BG(th,sc,t){
  if(th===20){const o=sc*.15;for(let n=Math.floor(o/700)-1;n*700-o<VW+300;n++){const x=n*700-o+hash(n+21)*140,b=PH-150;ctx.fillStyle='rgba(30,16,16,.85)';ctx.beginPath();ctx.moveTo(x-200,b);ctx.lineTo(x-34,b-230);ctx.lineTo(x+34,b-230);ctx.lineTo(x+200,b);ctx.fill();
      ctx.fillStyle=`rgba(255,90,30,${.45+.2*Math.sin(t*3+n)})`;ctx.beginPath();ctx.moveTo(x-30,b-232);ctx.lineTo(x-60,b-120);ctx.lineTo(x-40,b-120);ctx.lineTo(x-10,b-200);ctx.fill();
      ctx.fillStyle='rgba(60,50,50,.35)';for(let i=0;i<5;i++){const q=(t*.2+i/5)%1;ctx.beginPath();ctx.arc(x+Math.sin(q*5+n)*30,b-240-q*240,20+q*44,0,TAU);ctx.fill()}}
    ctx.fillStyle='rgba(255,140,60,.8)';for(let i=0;i<14;i++){const x=(((i*131-sc*.3)%(VW+40))+VW+40)%(VW+40)-20,y=((t*40+i*67)%(yMax-yMin))+yMin;ctx.globalAlpha=.3+.3*Math.sin(t*5+i);ctx.fillRect(x,y,2,3)}ctx.globalAlpha=1;
    if(G&&G.erF>0){ctx.fillStyle=`rgba(255,70,20,${.28*G.erF})`;ctx.fillRect(0,0,VW,PH);ctx.fillStyle=`rgba(255,160,60,${.9*G.erF})`;for(let i=0;i<10;i++){const q=1-G.erF;circ(VW*(.15+i*.08)+Math.sin(i*7)*40,yMin*.6+40-q*120+i%3*20,4+i%3*2)}}
    const gr=ctx.createLinearGradient(0,yMax-30,0,yMax+40);gr.addColorStop(0,'rgba(255,90,30,0)');gr.addColorStop(1,'rgba(255,90,30,.35)');ctx.fillStyle=gr;ctx.fillRect(0,yMax-30,VW,90)}
  if(th===21){ctx.fillStyle='rgba(200,190,170,.5)';const o=sc*.5;for(let n=Math.floor(o/90)-1;n*90-o<VW+60;n++){const x=n*90-o+hash(n+7)*40;circ(x,yMin+4+hash(n)*8,5+hash(n+2)*8)}}
  if(th===22||th===23){ctx.fillStyle='rgba(255,255,240,.8)';for(let i=0;i<34;i++){const x=(((i*83-sc*.04)%(VW+40))+VW+40)%(VW+40)-20,y=yMin*.2+((i*41)%Math.max(60,yMin*.8+120));ctx.globalAlpha=.3+.3*Math.sin(t*2+i);ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1}}
/* ---------- 还光 Boss：一排灯塔一明一暗地跳，在暗下去的那一下点它，把光还给海 ---------- */
const LT={geo(){const x0=16,x1=VW-16,y0=yMin+8,y1=yMax-8,vert=(y1-y0)>(x1-x0)*1.2;return{x0,x1,y0,y1,vert}},
 pos(i,n){const o=LT.geo(),cols=Math.ceil(n/2),top=i%2===0,c=Math.floor(i/2),w=o.x1-o.x0,h=o.y1-o.y0;
  return o.vert?[o.x0+w*(i%2?.74:.26),o.y0+h*(.2+.62*(i/(n-1)))]:[o.x0+w*(.1+.8*(c+(top?.25:.75))/cols),o.y0+h*(top?.2:.8)]}};
function lightMk(g,hd,fin){const B={k:'light',mini:1,fin,tries:0,
  reset(){const hd=G.mode==='hard',n=hd?8:6;this.n=0;this.need=n;this.T=hd?80:90;this.hp=3;this.t=this.seen?-3:-7;this.seen=1;this.slow=0;this.mark=0;this.big=0;this.help=0;this.dz=0;
    const o=LT.geo();this.px=(o.x0+o.x1)/2;this.py=(o.y0+o.y1)/2;this.tx=this.px;this.ty=this.py;
    this.L=Array.from({length:n},(_,i)=>({i,P:(hd?2:2.4)+Math.random()*.9,ph:Math.random()*4,dw:hd?.42:.6,done:0,ba:Math.random()*TAU,fk:hd?Math.random()*3:99}))}};
  B.reset();return B}
const ltC=(B,l)=>{const s=B.slow>0?.7:1;return((B.t*s+l.ph)%l.P+l.P)%l.P},ltDim=(B,l)=>l.done||B.big>0&&B.bigL===l||ltC(B,l)>l.P-l.dw,ltSoon=(B,l)=>{const c=ltC(B,l);return c>l.P-l.dw-.55&&c<=l.P-l.dw};
function lightPt(cx,cy,down){const B=G.boss;if(B.t<-3){if(down){B.t=-3}return}const r=cv.getBoundingClientRect(),x=(cx-r.left)/S,y=(cy-r.top)/S;
  if(!down){B.tx=x;B.ty=y;return}if(B.t<0)return;
  const n=B.L.length;let best=null,bd=1e9;B.L.forEach((l,i)=>{if(l.done)return;const[lx,ly]=LT.pos(i,n),d=Math.hypot(lx-x,ly-y);if(d<bd){bd=d;best=l}});
  if(best&&bd<80*Math.max(1,U*.8)){const[lx,ly]=LT.pos(best.i,n);if(Math.hypot(B.px-lx,B.py-ly)<70){lightTry(B,best);return}B.tx=lx;B.ty=ly;B.go=best;return}
  B.tx=x;B.ty=y;B.go=null}
function lightTry(B,l){const g=G,n=B.L.length,[lx,ly]=LT.pos(l.i,n);
  if(ltDim(B,l)){l.done=1;B.n++;SFX.free();burst(lx,ly,'#fff8c0',24);burst(lx,ly,'#9ff0ff',16,1);g.bonus+=20;ftext('光回到海里了！',B.px-40,B.py-40,'#fff8c0');
    if(B.n>=B.need){bossWin(B,'灯塔的光都回到了海里！');g.fish.y=(yMin+yMax)/2;g.inv=2;return}
    const h=[[2,'xiaofan'],[4,'laoduo'],[G.mode==='hard'?6:5,'dabai']].find(q=>q[0]===B.n);if(h)lightHelp(B,h[1])}
  else{B.hp--;B.dz=.8;g.flash=.4;g.shake=.3;SFX.hit();const dx=B.px-lx,dy=B.py-ly,d=Math.hypot(dx,dy)||1;B.px+=dx/d*90;B.py+=dy/d*90;B.tx=B.px;B.ty=B.py;
    ftext('太亮了，看不见！',B.px-40,B.py-40,'#ffb3b3');if(B.hp<=0)die('light')}}
function lightHelp(B,who){B.help={who,t:3.2};if(who==='xiaofan')B.mark=10;if(who==='laoduo')B.slow=10;if(who==='dabai'){const left=B.L.filter(l=>!l.done);const l=left[Math.floor(Math.random()*left.length)];if(l){B.big=3;B.bigL=l}}}
function lightUpd(B,dt){const g=G,hd=g.mode==='hard',o=LT.geo(),n=B.L.length;B.t+=dt;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;B.slow=Math.max(0,B.slow-dt);B.mark=Math.max(0,B.mark-dt);B.big=Math.max(0,B.big-dt);B.dz=Math.max(0,B.dz-dt);if(B.help){B.help.t-=dt;if(B.help.t<=0)B.help=0}
  if(B.t<-3){const k=clamp((B.t+5.5)/2,0,1),e=1-(1-k)*(1-k);B.px=B.tx=lerp(o.x0-80,(o.x0+o.x1)/2,e);B.py=B.ty=(o.y0+o.y1)/2;return}
  {const dx=B.tx-B.px,dy=B.ty-B.py,d=Math.hypot(dx,dy),s=Math.min(d,(B.dz>0?140:430)*dt);if(d>1){B.px+=dx/d*s;B.py+=dy/d*s;B.pdx=dx}B.px=clamp(B.px,o.x0+10,o.x1-10);B.py=clamp(B.py,o.y0+10,o.y1-10)}
  if(B.t<0)return;
  for(const l of B.L){if(l.done)continue;l.ba+=dt*(hd?.9:.6)*(B.slow>0?.6:1);const[lx,ly]=LT.pos(l.i,n),dx=B.px-lx,dy=B.py-ly,d=Math.hypot(dx,dy);
    if(B.dz<=0&&!ltDim(B,l)&&d>70&&d<(o.vert?o.x1-o.x0:o.y1-o.y0)*.75){const a=Math.atan2(dy,dx),df=Math.atan2(Math.sin(a-l.ba),Math.cos(a-l.ba));if(Math.abs(df)<.12){B.hp--;B.dz=1;g.flash=.35;SFX.hit();ftext('被灯光扫到了！',B.px-40,B.py-40,'#ffb3b3');if(B.hp<=0){die('light');return}}}}
  if(B.t>=B.T)die('light')}
function lightDraw(B,t){}
function lightHud(B,t){const g=G,o=LT.geo(),n=B.L.length,hd=g.mode==='hard',L=Math.max(o.x1-o.x0,o.y1-o.y0);ctx.save();
  {const gr=ctx.createLinearGradient(0,0,0,VT);gr.addColorStop(0,'#101a3a');gr.addColorStop(1,'#06101e');ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT)}
  ctx.fillStyle='#fff';for(let i=0;i<50;i++){ctx.globalAlpha=.15+.2*Math.sin(t*1.5+i);ctx.fillRect((i*97)%VW,o.y0+(i*61)%(o.y1-o.y0),2,2)}ctx.globalAlpha=1;
  {const k=B.n/B.need,y=o.vert?o.y0+4:o.y0+4;ctx.strokeStyle=`rgba(255,248,200,${.15+.6*k})`;ctx.lineWidth=2+3*k;ctx.setLineDash([2,10]);ctx.beginPath();ctx.moveTo(o.x0,y+30);for(let i=0;i<=8;i++)ctx.lineTo(o.x0+(o.x1-o.x0)*i/8,y+30+Math.sin(i*1.7)*10);ctx.stroke();ctx.setLineDash([])}
  for(const l of B.L){const[lx,ly]=LT.pos(l.i,n),dim=ltDim(B,l);
    if(!l.done&&!dim&&B.t>=0){ctx.save();ctx.globalAlpha=.16;ctx.fillStyle='#fff3b0';ctx.beginPath();ctx.moveTo(lx,ly);ctx.arc(lx,ly,L*.75,l.ba-.12,l.ba+.12);ctx.fill();ctx.restore()}
    ctx.fillStyle='#3a3a52';ctx.beginPath();ctx.moveTo(lx-14,ly+30);ctx.lineTo(lx-8,ly-6);ctx.lineTo(lx+8,ly-6);ctx.lineTo(lx+14,ly+30);ctx.fill();ctx.fillStyle='#5a5a72';ctx.fillRect(lx-12,ly-14,24,8);
    ctx.fillStyle='#4a4a62';ctx.beginPath();ctx.ellipse(lx,ly+32,26,8,0,0,TAU);ctx.fill();
    if(l.done){ctx.fillStyle='#556';circ(lx,ly-20,9);ctx.save();ctx.globalCompositeOperation='lighter';ctx.fillStyle='rgba(160,240,255,.5)';circ(lx,ly-46,6+Math.sin(t*3+l.i)*2);ctx.restore()}
    else{const soon=ltSoon(B,l),fake=hd&&((t+l.fk)%3.3)<.12,b=dim?.12:fake?.5:soon?.75+.25*Math.sin(t*40):1;ctx.save();ctx.shadowColor='#ffe27a';ctx.shadowBlur=30*b;ctx.fillStyle=dim?'#5a5a40':`rgba(255,243,176,${b})`;circ(lx,ly-20,10+b*4);ctx.restore();
      if(!dim){const gr=ctx.createRadialGradient(lx,ly-20,4,lx,ly-20,70*b);gr.addColorStop(0,'rgba(255,240,170,.45)');gr.addColorStop(1,'rgba(255,240,170,0)');ctx.fillStyle=gr;circ(lx,ly-20,70*b)}
      if(B.mark>0&&soon){ctx.strokeStyle='#4fe0b5';ctx.lineWidth=3;ctx.beginPath();ctx.arc(lx,ly-20,30+Math.sin(t*10)*3,0,TAU);ctx.stroke()}}}
  if(B.help){const h=B.help,nm={xiaofan:'小帆',laoduo:'老舵',dabai:'大白'}[h.who],tx={xiaofan:'我看得见！绿圈圈住的灯，马上就要暗了！',laoduo:'慢慢来。灯跳得再快，也有喘气的时候。',dabai:'（大白一头撞上灯塔，那盏灯暗了好一会儿）'}[h.who];
    ctx.fillStyle='rgba(6,40,70,.7)';const y=o.y1-56*U;ctx.fillRect(0,y,VW,50*U);ctx.fillStyle='#ffe27a';ctx.font=`${14*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl(nm),VW/2,y+18*U);ctx.fillStyle='#fff';ctx.fillText(tl(tx),VW/2,y+38*U)}
  ctx.save();ctx.translate(B.px,B.py);if((B.pdx||1)<0)ctx.scale(-1,1);drawFish(0,0,0,t,{s:.7,scared:B.dz>0,...skin()});ctx.restore();
  ctx.fillStyle='#fff';ctx.textAlign='center';const tl0=Math.ceil(B.T-Math.max(0,B.t)),y0=o.y0+22*U;ctx.font=`${17*U}px ${FONT}`;ctx.lineWidth=4*U;ctx.strokeStyle='rgba(6,40,70,.7)';
  if(B.t>=-3){const s1=tl('还回去的光 '+B.n+' / '+B.need)+'  '+'♥'.repeat(Math.max(0,B.hp)),s2=tl('还剩 '+Math.max(0,tl0)+' 秒');ctx.strokeText(s1,VW/2,y0);ctx.fillText(s1,VW/2,y0);ctx.fillStyle=tl0<=10?'#ff9f8f':'#fff';ctx.strokeText(s2,VW/2,y0+24*U);ctx.fillText(s2,VW/2,y0+24*U)}
  if(B.t<0){const cy=(o.y0+o.y1)/2,fs=(VW<500?14:17)*U;ctx.fillStyle='rgba(6,40,70,.66)';ctx.fillRect(0,cy-70*U,VW,140*U);ctx.fillStyle='#fff';ctx.font=`${fs}px ${FONT}`;
    const L2=B.t<-3?[tl('海面上的灯塔一明一暗地跳着。'),tl('每一盏的光，都是从潮心里抽出来的。'),tl('点屏幕跳过')]:[tl('点一盏灯塔，小鱼就游过去'),tl('等它暗下去的那一下，再点一次'),tl(Math.ceil(-B.t)+' 秒后开始')];
    L2.forEach((x,i)=>ctx.fillText(x,VW/2,cy-28*U+i*30*U))}
  ctx.restore()}
cv.addEventListener('pointermove',e=>{const B=G&&G.boss;if(state==='play'&&B&&B.k==='light'&&!B.done&&B.t>=0&&e.buttons)lightPt(e.clientX,e.clientY,false)});

/* 章鱼罐：朝下点沉罐子 → 别动，等章鱼钻进去 → 朝上点提起来；只有一次机会，错一步章鱼就喷墨逃走 */
function a3PotStart(g,e){const hd=g.mode!=='simple';g.tcap={e,s:0,w:0,W:hd?2.2:1.6,win:0,Wn:hd?1:1.4,ok:0};g.fish.vy=0;e.inPot=1;SFX.tap();
  if(!g.tips.tcap){g.tips.tcap=1;toast('章鱼罐只有一次机会：先朝下点沉罐子，别乱点等它钻进去，再朝上点提起来。错一步，它就喷你一脸墨跑掉',4.5,1)}}
function a3PotUpd(g,dt){const c=g.tcap;g.fish.vy=0;g.inv=Math.max(g.inv,.2);c.ok=Math.max(0,c.ok-dt);
  if(c.s===1){c.w+=dt;if(c.w>=c.W){c.s=2;c.win=c.Wn;SFX.shield()}}
  else if(c.s===2){c.win-=dt;if(c.win<=0)a3PotFail(g,'提慢了！章鱼喷了你一脸墨')}}
function a3PotFail(g,txt){const e=g.tcap.e,sx=e.x-g.scroll,y=entY(e,g.t);g.tcap=null;e.inPot=0;e.gone=1;g.combo=0;SFX.hit();g.shake=.35;burst(sx,y,'#14141e',24);g.inkT=txt;
  g.ink=2.5;g.inkB=Array.from({length:9},(_,i)=>[VW*(.18+.64*Math.random()),yMin+(yMax-yMin)*(.15+.7*Math.random()),(70+Math.random()*60)*Math.max(1,VW/520)])}
function a3PotSay(g,txt,col){const e=g.tcap.e;ftext(txt,e.x-g.scroll-60,entY(e,g.t)-70,col||'#fff')}
function a3PotTap(cx,cy){const g=G,c=g.tcap;if(!c)return;const r=cv.getBoundingClientRect(),ux=(cx-r.left)/S-fishSX,uy=(cy-r.top)/S-g.fish.y,d=Math.hypot(ux,uy);
  let di=-1;if(d>24){for(let i=0;i<4;i++){const D=CAPD[i];if((ux*D[0]+uy*D[1])/d>.64)di=i}}a3PotGo(g,di)}
function a3PotGo(g,di){const c=g.tcap;if(!c)return;const e=c.e;
  if(c.s===0){if(di===2){c.s=1;c.w=0;SFX.tap();a3PotSay(g,'罐子沉下去了，别动……','#fff')}else a3PotFail(g,'方向错了！章鱼喷了你一脸墨');return}
  if(c.s===1){a3PotFail(g,'太心急！章鱼喷了你一脸墨');return}
  if(di===0){g.tcap=null;e.inPot=0;e.gone=1;const f=FISH[e.k],sx=e.x-g.scroll,y=entY(e,g.t);g.caught[e.k]=(g.caught[e.k]||0)+1;g.nCaught++;g.bonus+=30;SFX.save();burst(sx,y,f.c[1],16);ftext('捕获 '+f.n+'！',sx-40,y-40,'#fff');
    if(e.shiny){SAVE.dex['x_'+e.k]=(SAVE.dex['x_'+e.k]||0)+1;persist();setTimeout(()=>toast('是金鳞'+f.n+'！《奇珍书》多了一张隐藏卡',3.4),700)}}
  else a3PotFail(g,'方向错了！章鱼喷了你一脸墨')}
function a3PotDraw(g,t){const c=g.tcap,e=c.e,F=g.fish,ox=e.x-g.scroll,oy=entY(e,t),k=c.s===1?c.w/c.W:c.s===2?1:0,py=c.s===0?oy-70+Math.sin(t*3)*4:oy;ctx.save();
  ctx.strokeStyle='rgba(240,220,180,.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(fishSX+10,F.y);ctx.quadraticCurveTo((fishSX+ox)/2,Math.min(F.y,py)-30,ox,py-26);ctx.stroke();
  if(c.s>0){const q=1-k*.85;ctx.save();ctx.translate(ox+18*k,oy+6*k);ctx.scale(q,q);a3Node(e,t);ctx.restore()}else{ctx.save();ctx.translate(ox,oy);a3Node(e,t);ctx.restore()}
  ctx.translate(ox,py);ctx.rotate(c.s>0?-1.2:0);ctx.fillStyle='#b0643a';ctx.beginPath();ctx.ellipse(0,0,22,18,0,0,TAU);ctx.fill();ctx.fillStyle='#8a4a2a';ctx.fillRect(-9,-26,18,10);ctx.fillStyle='#d88a5a';ctx.fillRect(-16,-6,32,3);ctx.fillStyle='#3a2014';ctx.beginPath();ctx.ellipse(0,-26,9,3,0,0,TAU);ctx.fill();
  if(c.s===2){ctx.strokeStyle='#e0705a';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-3,-26);ctx.quadraticCurveTo(-8+Math.sin(t*9)*3,-36,-2,-40);ctx.stroke()}
  ctx.rotate(c.s>0?1.2:0);if(c.s>0){ctx.lineWidth=5;ctx.strokeStyle=c.s===1?'rgba(255,255,255,.9)':'#ffd23f';ctx.beginPath();ctx.arc(0,0,36,-Math.PI/2,-Math.PI/2+TAU*(c.s===1?k:c.win/c.Wn));ctx.stroke()}ctx.restore();
  if(c.s!==1){const D=CAPD[c.s===0?2:0],ax=fishSX+D[0]*95,ay=clamp(F.y+D[1]*95,yMin+34,yMax-30);ctx.save();ctx.translate(ax,ay);ctx.rotate(Math.atan2(D[1],D[0]));const pu=1+Math.sin(t*14)*.08;ctx.scale(pu,pu);ctx.shadowColor='#4fe0b5';ctx.shadowBlur=18;ctx.fillStyle='#4fe0b5';ctx.strokeStyle='#fff';ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(30,0);ctx.lineTo(4,-24);ctx.lineTo(4,-10);ctx.lineTo(-26,-10);ctx.lineTo(-26,10);ctx.lineTo(4,10);ctx.lineTo(4,24);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.stroke();ctx.restore()}
  ctx.save();ctx.textAlign='center';ctx.font=`bold ${18*U}px ${FONT}`;const tx=c.s===0?'朝下点：把罐子沉下去':c.s===1?'别动……等它钻进罐子':'它进去了！朝上点：提罐子';const tw=ctx.measureText(tl(tx)).width+28;
  ctx.fillStyle='rgba(10,30,50,.75)';ctx.fillRect(VW/2-tw/2,yMax-78*U,tw,32*U);ctx.fillStyle=c.s===2?'#ffd23f':'#fff';ctx.fillText(tl(tx),VW/2,yMax-56*U);ctx.restore()}
function a3InkDraw(g,t){const a=Math.min(1,g.ink/.5);ctx.save();ctx.globalAlpha=.94*a;ctx.fillStyle='#0d0d18';
  for(const b of g.inkB){circ(b[0],b[1],b[2]);for(let i=0;i<5;i++){const an=i*1.3+b[0];circ(b[0]+Math.cos(an)*b[2]*.9,b[1]+Math.sin(an)*b[2]*.9,b[2]*.35)}ctx.fillRect(b[0]-b[2]*.12,b[1],b[2]*.24,b[2]*1.1+(2.5-g.ink)*30);circ(b[0],b[1]+b[2]*1.1+(2.5-g.ink)*30,b[2]*.14)}
  ctx.globalAlpha=a;ctx.textAlign='center';ctx.font=`bold ${22*U}px ${FONT}`;ctx.fillStyle='#ffd0c0';ctx.lineWidth=5*U;ctx.strokeStyle='#0d0d18';ctx.strokeText(tl(g.inkT||''),VW/2,(yMin+yMax)/2);ctx.fillText(tl(g.inkT||''),VW/2,(yMin+yMax)/2);ctx.restore()}
