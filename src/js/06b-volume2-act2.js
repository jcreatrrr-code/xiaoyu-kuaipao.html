/* ---------- 第二卷 第二幕：星路海、火山岛、灯塔环、灯下鱼群 ---------- */
TH.push(
 {n:'星路海',top:'#2a4a7a',bot:'#0a1838',far:'#1f3a66',mid:'#183058',sand:'#c8c0a0',rock:'#5a6a8a',rock2:'#3a4a6a',weed:'#4fa0a0'},
 {n:'火山岛',top:'#5a7a8a',bot:'#1a1a24',far:'#4a4a52',mid:'#33333c',sand:'#3a3634',rock:'#4a3a36',rock2:'#2a2220',weed:'#6a8a5a'},
 {n:'灯塔环',top:'#3a4a7a',bot:'#0e1430',far:'#2a3260',mid:'#1f2650',sand:'#a8a088',rock:'#6a6a80',rock2:'#45455a',weed:'#5a8a8a'},
 {n:'灯下鱼群',top:'#34507a',bot:'#0c1630',far:'#25406a',mid:'#1c3258',sand:'#b8b090',rock:'#5a6a80',rock2:'#3a465a',weed:'#4f9a90'});
LV.push(
 {name:'星路海',vol:2,fish:['saury','yellow','bream'],len:210,theme:16,nodes:['turbo'],gname:'夜光螺',pool:{pearls:2,fork:4,rockB:2,rockT:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'火山岛',vol:2,fish:['mack','eel','tuna'],len:210,theme:17,tool:'lpot',nodes:['lobster'],gname:'龙虾',pool:{pearls:2,vent:5,rockB:1,rockT:2,octo:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'灯塔环',vol:2,fish:['sard','mack','saury'],len:210,theme:18,tool:'rod',nodes:['skipjack'],gname:'鲣鱼',pool:{pearls:2,lamp:5,rockB:1,rockT:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'灯下鱼群',vol:2,fish:['sard','saury'],len:200,theme:19,boss:'herd',gtxt:'把鱼群赶回潟湖',pool:{pearls:2,lamp:2,vent:1,rockB:2,jelly:1,shield:1},goal:{k:'boss'},extra:[20,30]});
Object.assign(FISH,{turbo:{n:'夜光螺',c:['#fff4e0','#c89a5a','#7a5a30'],s:1,x:1},lobster:{n:'龙虾',c:['#ffe0d0','#d0603a','#8a3020'],s:1,x:1},skipjack:{n:'鲣鱼',c:['#e8f0ff','#4a6aa0','#2a3a60'],s:1,x:1}});
Object.assign(NODE,{turbo:{tool:'',hp:1,f:.88,no:''},lobster:{tool:'lpot',hp:2,f:.9,no:'龙虾躲在石缝里，需要龙虾笼'},skipjack:{tool:'rod',hp:1,f:.22,no:'鲣鱼要用钓竿一条一条钓'}});
Object.assign(BOSSMSG,{herd:'鱼群被灯光困住了！你在鱼群上面，它就往下躲；在下面，它就往上躲。把鱼群赶进灯光帘的暗缝里'});
Object.assign(TIPS,{fork:'前面分成上下两条路！跟着星星的倒影游，走错了会被暗流冲回来',vent:'海底的热泉冒小泡泡时，马上要喷热水了，别待在它上面',lamp:'灯会把小鱼往它那边拉，顶着光游，别被吸进去'});
const FORK={L:720,th:.07};
Object.assign(PAT,{
 fork(g,x,d){const c=g.r(.4,.6),up=g.r()<.5,L=FORK.L;g.E.push({t:'fork',x,c,up,L});
   const ok=up?(c-FORK.th)/2:(1+c+FORK.th)/2,no=up?(1+c+FORK.th)/2:(c-FORK.th)/2;arc(g,x-280,c,c,3);arc(g,x+60,ok,ok,8);arc(g,x+60,no,no,4);
   if(g.mode!=='simple')g.E.push({t:'jelly',x:x+L*.45,f:no,amp:.05,ph:g.r(0,6),sp:1});g.x+=L-120},
 vent(g,x,d){const n=d>.5&&g.mode!=='simple'?2:1;for(let i=0;i<n;i++)g.E.push({t:'vent',x:x+i*230,ph:g.r(0,3),h:g.mode==='simple'?.42:.34});arc(g,x-200,.3,.3,4);arc(g,x+n*230-120,.3,.5,3)},
 lamp(g,x,d){const top=g.r()<.6;g.E.push({t:'lamp',x,top,f:top?.05:.95});const f=top?.8:.2;arc(g,x-160,f,f,6)}});
const a2Pull=g=>(g.mode==='simple'?135:175);
function a2Hit(g,e,sx,y,dx,dist,dt,k){const F=g.fish;
  if(e.t==='fork'){const cy=fy(e.c),ins=fishSX>sx&&fishSX<sx+e.L;
    if(ins&&Math.abs(F.y-cy)<fy(FORK.th)-yMin+16)hurt(1);
    if(fishSX>sx&&fishSX<sx+40&&e.lane==null)e.lane=F.y<cy?1:0;
    if(e.lane!=null&&e.lane!==(e.up?1:0)&&fishSX>sx+e.L*.55){e.lane=null;g.scroll=e.x-fishSX-430;F.vy=0;g.inv=Math.max(g.inv,1);g.combo=0;g.flash=.35;CSND.crash&&CSND.crash();
      toast('绕远路了！被暗流冲回了岔路口。跟着星星的倒影游',2.6,1)}
    if(fishSX>sx+e.L)e.lane=null;return}
  if(e.t==='vent'){const s=a2Vent(e,g.t);if(s===2&&Math.abs(dx)<40&&F.y>fy(1-e.h)-10)hurt(1);return}
  if(e.t==='lamp'){if(e.off||g.trap)return;const R=230;if(Math.abs(dx)<R){const p=a2Pull(g)*k*(1-Math.abs(dx)/R);F.y+=Math.sign(y-F.y)*Math.min(Math.abs(y-F.y),p*dt)}
    if(dist<58&&g.inv<=0){if(g.shield||g.whale){absorb();e.off=1;burst(sx,y,'#ffe9a8',16)}
      else{const T=g.mode==='simple'?6:9;g.trap={t:T,T,p:0,need:g.mode==='simple'?8:13,e:{lamp:1}};g.combo=0;SFX.hit();toast(g.mode==='simple'?'被灯光吸住了！快速连点屏幕！':'被灯光吸住了！快速连点挣脱！',2,1)}}}}
const a2Vent=(e,t)=>{const P=G&&G.mode==='hard'?2.8:3.4,c=(t+e.ph)%P;return c>P-1.1?2:c>P-2.1?1:0};
function a2Draw(e,sx,g,t,T){
  if(e.t==='fork'){const cy=fy(e.c),h=fy(FORK.th)-yMin,okY=e.up?(yMin+cy-h)/2:(cy+h+yMax)/2;ctx.save();ctx.fillStyle=T.rock;ctx.beginPath();ctx.moveTo(sx,cy);ctx.quadraticCurveTo(sx+30,cy-h,sx+70,cy-h);ctx.lineTo(sx+e.L-40,cy-h);ctx.quadraticCurveTo(sx+e.L,cy,sx+e.L-40,cy+h);ctx.lineTo(sx+70,cy+h);ctx.quadraticCurveTo(sx+30,cy+h,sx,cy);ctx.fill();
    ctx.fillStyle=T.rock2;for(let i=0;i<Math.floor(e.L/60);i++)circ(sx+80+i*60+hash(e.x+i)*20,cy+(hash(i+e.x*.1)-.5)*h,6+hash(i)*5);
    const big=g.mode==='simple',r=(big?16:11)+Math.sin(t*4)*2,hx=sx-70;ctx.translate(hx,okY);ctx.rotate(t*.6);ctx.shadowColor='#fff8c0';ctx.shadowBlur=22;ctx.fillStyle='#fff8d0';ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,q=i%2?r*.35:r;ctx.lineTo(Math.cos(a)*q,Math.sin(a)*q)}ctx.fill();ctx.restore();
    ctx.save();ctx.globalAlpha=.25+.1*Math.sin(t*3);ctx.fillStyle='#fff8d0';ctx.fillRect(hx+20,okY-2,Math.max(0,sx+e.L*.5-hx-20),4);ctx.restore();
    const wy=e.up?(cy+h+yMax)/2:(yMin+cy-h)/2,wx=sx+e.L*.6;ctx.save();ctx.strokeStyle='rgba(20,30,60,.55)';ctx.lineWidth=4;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(wx,wy,14+i*12,t*3+i,t*3+i+4.2);ctx.stroke()}ctx.restore();return}
  if(e.t==='vent'){const s=a2Vent(e,t),b=yMax+30,top=fy(1-e.h);ctx.save();ctx.fillStyle=T.rock;ctx.beginPath();ctx.moveTo(sx-46,b);ctx.lineTo(sx-14,b-44);ctx.lineTo(sx+14,b-44);ctx.lineTo(sx+46,b);ctx.fill();ctx.fillStyle='#ff7a3a';ctx.globalAlpha=.6+.3*Math.sin(t*5);ctx.fillRect(sx-10,b-48,20,6);ctx.globalAlpha=1;
    if(s===1){ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=2;for(let i=0;i<6;i++){const q=((t*1.6+i/6)%1),yy=b-50-q*(b-50-top)*.5;ctx.beginPath();ctx.arc(sx+Math.sin(i*2+t*6)*10,yy,3+i%3,0,TAU);ctx.stroke()}}
    if(s===2){const gr=ctx.createLinearGradient(0,top,0,b);gr.addColorStop(0,'rgba(255,240,220,.15)');gr.addColorStop(1,'rgba(255,160,90,.75)');ctx.fillStyle=gr;ctx.beginPath();ctx.moveTo(sx-18,b-44);ctx.quadraticCurveTo(sx-34+Math.sin(t*20)*4,(top+b)/2,sx-26,top);ctx.lineTo(sx+26,top);ctx.quadraticCurveTo(sx+34+Math.sin(t*20+1)*4,(top+b)/2,sx+18,b-44);ctx.fill()}ctx.restore();return}
  if(e.t==='lamp'){const y=fy(e.f),R=230;ctx.save();if(!e.off){const gr=ctx.createRadialGradient(sx,y,4,sx,y,R);gr.addColorStop(0,'rgba(255,240,170,.55)');gr.addColorStop(1,'rgba(255,240,170,0)');ctx.fillStyle=gr;ctx.fillRect(sx-R,y-R,R*2,R*2)}
    ctx.strokeStyle='#c8c0b0';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx,e.top?yMin-40:yMax+40);ctx.lineTo(sx,y);ctx.stroke();ctx.fillStyle='#6a6a80';ctx.fillRect(sx-12,y-(e.top?16:-4),24,12);
    ctx.fillStyle=e.off?'#556':'#fff3b0';if(!e.off){ctx.shadowColor='#ffe27a';ctx.shadowBlur=26}circ(sx,y+(e.top?6:-6),13);ctx.restore();return}}
function a2Node(e,t){
  if(e.k==='turbo'){ctx.rotate(Math.sin(t*1.5+e.x)*.1);ctx.fillStyle='#c89a5a';ctx.beginPath();ctx.arc(0,2,18,0,TAU);ctx.fill();ctx.fillStyle='#e8c890';ctx.beginPath();ctx.arc(-3,-2,11,0,TAU);ctx.fill();ctx.fillStyle='#fff8e8';circ(-5,-4,5);ctx.strokeStyle='#7a5a30';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,2,18,.4,2.6);ctx.stroke();return 1}
  if(e.k==='lobster'){ctx.fillStyle='#d0603a';ctx.beginPath();ctx.ellipse(0,0,22,9,0,0,TAU);ctx.fill();ctx.fillStyle='#b0482a';for(let i=0;i<3;i++)ctx.fillRect(-18+i*9,-8,5,16);ctx.strokeStyle='#d0603a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(18,-4);ctx.quadraticCurveTo(40,-24+Math.sin(t*3)*4,46,-6);ctx.moveTo(18,2);ctx.quadraticCurveTo(42,-10,48,8);ctx.stroke();ctx.fillStyle='#1b2a41';circ(16,-5,2);return 1}
  if(e.k==='skipjack'){const a=t*1.8+e.x*.01;ctx.translate(Math.cos(a)*14,Math.sin(a)*6);ctx.fillStyle='#4a6aa0';ctx.beginPath();ctx.ellipse(0,0,22,9,0,0,TAU);ctx.fill();ctx.fillStyle='#e8f0ff';ctx.beginPath();ctx.ellipse(2,4,16,4,0,0,TAU);ctx.fill();ctx.strokeStyle='#2a3a60';ctx.lineWidth=1.5;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-8+i*7,2);ctx.lineTo(-4+i*7,7);ctx.stroke()}ctx.fillStyle='#2a3a60';ctx.beginPath();ctx.moveTo(-20,0);ctx.lineTo(-30,-9);ctx.lineTo(-30,9);ctx.fill();ctx.fillStyle='#1b2a41';circ(14,-2,2);return 1}
  return 0}
function a2Build(L,g){const fk=g.E.filter(e=>e.t==='fork');if(!fk.length)return;g.E=g.E.filter(e=>{if(e.t==='fork'||e.t==='pearl'||e.t==='node'||e.t==='cp'||e.t==='fin'||e.t==='boss')return true;return!fk.some(f=>e.x>f.x-60&&e.x<f.x+f.L+60&&!(e.t==='jelly'&&e.x===f.x+f.L*.45))});
  for(const e of g.E)if(e.t==='node'){const f=fk.find(q=>e.x>q.x-40&&e.x<q.x+q.L+40);if(f)e.x=f.x-140}}
function a2BG(th,sc,t){
  if(th===16||th===18||th===19){ctx.fillStyle='rgba(255,255,240,.7)';for(let i=0;i<26;i++){const x=(((i*83-sc*.04)%(VW+40))+VW+40)%(VW+40)-20,y=yMin+((i*47)%140);ctx.globalAlpha=.25+.25*Math.sin(t*2+i);ctx.fillRect(x,y,2,2)}ctx.globalAlpha=1}
  if(th===17){const o=sc*.18;for(let n=Math.floor(o/600)-1;n*600-o<VW+300;n++){const x=n*600-o+hash(n+11)*120,b=PH-150;ctx.fillStyle='rgba(40,34,36,.8)';ctx.beginPath();ctx.moveTo(x-180,b);ctx.lineTo(x-30,b-210);ctx.lineTo(x+30,b-210);ctx.lineTo(x+180,b);ctx.fill();ctx.fillStyle='rgba(255,110,50,'+(.25+.15*Math.sin(t*2+n))+')';ctx.fillRect(x-24,b-214,48,8);
    ctx.fillStyle='rgba(200,200,200,.12)';for(let i=0;i<4;i++){const q=(t*.15+i/4)%1;ctx.beginPath();ctx.arc(x+Math.sin(q*6+n)*20,b-220-q*200,16+q*30,0,TAU);ctx.fill()}}}
  if(th===18||th===19){const o=sc*.2;for(let n=Math.floor(o/420)-1;n*420-o<VW+200;n++){const x=n*420-o+hash(n+3)*80,b=PH-150;ctx.fillStyle='rgba(30,36,70,.85)';ctx.fillRect(x-10,b-190,20,190);ctx.fillRect(x-18,b-200,36,12);
    ctx.save();ctx.globalAlpha=.12;ctx.fillStyle='#fff3b0';const a=Math.sin(t*.8+n)*.6;ctx.beginPath();ctx.moveTo(x,b-196);ctx.lineTo(x+Math.cos(a-.12)*600,b-196+Math.sin(a-.12)*600);ctx.lineTo(x+Math.cos(a+.12)*600,b-196+Math.sin(a+.12)*600);ctx.fill();ctx.restore();ctx.fillStyle='#fff3b0';circ(x,b-196,7)}}}
/* ---------- 牧鱼 Boss：鱼群躲着小鱼走，要把它赶进灯光帘的暗缝 ---------- */
const HD={hx:()=>fishSX+190,R:()=>170};
function herdMk(g,hd,fin){const mid=(yMin+yMax)/2;return{k:'herd',hp:3,n:0,need:hd?9:6,cur:[],made:0,t:-2.5,sp:1,sy:mid,svy:0,cnt:30,lastC:.5,done:0,fin,
  reset(){this.hp=3;this.n=0;this.cur=[];this.made=0;this.t=-2;this.sp=1;this.sy=(yMin+yMax)/2;this.svy=0;this.cnt=30;this.lastC=.5}}}
function herdUpd(B,dt){const g=G,F=g.fish,hd=g.mode==='hard',hx=HD.hx(),R=HD.R();B.t+=dt;
  const d=B.sy-F.y,ad=Math.abs(d);if(ad<R)B.svy+=Math.sign(d||1)*(hd?560:620)*(1-ad/R)*dt;
  B.svy+=Math.sin(B.t*.8)*(hd?70:45)*dt;
  for(const r of B.cur)if(!r.done&&r.x>hx&&r.x-hx<150){const f=(B.sy-yMin)/(yMax-yMin);if(Math.abs(f-r.c)>r.gap/2)B.svy+=Math.sign(f-r.c)*(hd?90:55)*dt}
  B.svy*=Math.max(0,1-2.4*dt);B.sy+=B.svy*dt;if(B.sy<yMin+40){B.sy=yMin+40;B.svy=Math.abs(B.svy)*.3}if(B.sy>yMax-40){B.sy=yMax-40;B.svy=-Math.abs(B.svy)*.3}
  if(B.t<0)return;
  if(B.n+B.cur.filter(r=>!r.done).length<B.need&&B.made<B.need+6){B.sp-=dt;if(B.sp<=0){B.sp=hd?2.3+Math.random()*.8:3+Math.random()*1.1;
    const s=Math.random()<.5?-1:1,c=clamp(B.lastC+s*(.22+Math.random()*.22),.22,.78);B.lastC=c;B.cur.push({x:VW+60,c,gap:(hd?.24:.32)*Math.max(1,760/(yMax-yMin))});B.made++}}
  for(const r of B.cur){r.x-=(hd?125:100)*dt;
    if(!r.done&&r.x<=hx){r.done=1;const f=(B.sy-yMin)/(yMax-yMin);
      if(Math.abs(f-r.c)<=r.gap/2-.03){B.n++;SFX.save();burst(hx,B.sy,'#bff6ff',16);g.bonus+=40;ftext('鱼群穿过去了！',hx-40,B.sy-50,'#bff6e6')}
      else{r.bad=1;B.hp--;B.cnt=Math.max(6,B.cnt-8);g.shake=.4;g.flash=.25;SFX.hit();ftext('鱼群被灯光吸走了一些！',hx-60,B.sy-50,'#ffb3b3');if(B.hp<=0){die('herd');return}}}}
  B.cur=B.cur.filter(r=>r.x>-80);
  if(B.n>=B.need&&!B.cur.some(r=>!r.done))bossWin(B,'鱼群游回了潟湖！')}
function herdDraw(B,t){const g=G,hx=HD.hx(),nx=B.cur.find(r=>!r.done);ctx.save();
  for(const r of B.cur){const g0=fy(r.c-r.gap/2),g1=fy(r.c+r.gap/2),w=46;
    for(const[a,b]of[[yMin-20,g0],[g1,yMax+30]]){const gr=ctx.createLinearGradient(r.x-w,0,r.x+w,0);gr.addColorStop(0,'rgba(255,240,170,0)');gr.addColorStop(.5,r.bad?'rgba(255,200,150,.55)':'rgba(255,240,170,.6)');gr.addColorStop(1,'rgba(255,240,170,0)');ctx.fillStyle=gr;ctx.fillRect(r.x-w,a,w*2,b-a)}
    ctx.fillStyle='#fff3b0';ctx.shadowColor='#ffe27a';ctx.shadowBlur=18;circ(r.x,yMin-4,10);ctx.shadowBlur=0;
    if(r===nx){ctx.strokeStyle='rgba(255,255,255,.9)';ctx.lineWidth=3;ctx.setLineDash([8,6]);ctx.lineDashOffset=-t*30;ctx.strokeRect(r.x-28,g0,56,g1-g0);ctx.setLineDash([])}}
  for(let i=0;i<B.cnt;i++){const a=t*(1.4+(i%5)*.12)+i*2.39,rr=12+(i*7)%30,x=hx+Math.cos(a)*rr*1.3,y=B.sy+Math.sin(a)*rr*.8,dir=Math.cos(a+Math.PI/2)>0?1:-1;
    ctx.fillStyle=i%3?'#cfe0f0':'#9fb8d0';ctx.beginPath();ctx.ellipse(x,y,7,3,0,0,TAU);ctx.fill();ctx.beginPath();ctx.moveTo(x-6*dir,y);ctx.lineTo(x-11*dir,y-3);ctx.lineTo(x-11*dir,y+3);ctx.fill()}
  ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=2;ctx.setLineDash([4,8]);ctx.beginPath();ctx.arc(fishSX,g.fish.y,HD.R(),-.7,.7);ctx.stroke();ctx.setLineDash([]);ctx.restore()}
function herdHud(B,t){const w=Math.min(VW-40*U,300*U),x0=(VW-w)/2,y0=yMax+14*U,h=16*U;ctx.save();ctx.textAlign='center';ctx.font=`${14*U}px ${FONT}`;
  ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,y0-4*U,w+8*U,h+8*U);const sg=w/B.need;for(let i=0;i<B.need;i++){ctx.fillStyle=i<B.n?'#4fe0b5':'rgba(255,255,255,.25)';ctx.fillRect(x0+i*sg+2*U,y0,sg-4*U,h)}
  ctx.fillStyle='#fff';ctx.fillText(tl('鱼群 '+'❤'.repeat(Math.max(0,B.hp))+' · 还差 '+Math.max(0,B.need-B.n)+' 道灯光'),VW/2,y0+h+18*U);ctx.restore()}
