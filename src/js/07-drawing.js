/* ---------- drawing ---------- */
const circ=(x,y,r)=>{ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill()};
function hills(col,off,base,amp,a,b){ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,VT);for(let x=0;x<=VW+30;x+=30){const wx=x+off;ctx.lineTo(x,base-(Math.sin(wx*a)+Math.sin(wx*b+1.3))*amp*.5-amp)}ctx.lineTo(VW+30,VT);ctx.fill()}
function drawBG(th,sc,t){
  const T=TH[th],gr=ctx.createLinearGradient(0,0,0,PH);gr.addColorStop(0,T.top);gr.addColorStop(1,T.bot);ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT);
  ctx.save();ctx.globalAlpha=.09;ctx.fillStyle='#fff';const span=VW+500;
  for(let i=0;i<5;i++){const x=(((i*280-sc*.05)%span)+span)%span-250,w=60+(i*37)%50;ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x+w,0);ctx.lineTo(x+w-200,PH);ctx.lineTo(x-230,PH);ctx.fill()}ctx.restore();
  if(th===7){ctx.strokeStyle='rgba(60,150,90,.55)';ctx.lineWidth=16;ctx.lineCap='round';const o=sc*.3;for(let n=Math.floor(o/120)-1;n*120-o<VW+60;n++){const x=n*120-o,sw=Math.sin(t*.9+n)*26;ctx.beginPath();ctx.moveTo(x,PH);ctx.quadraticCurveTo(x+sw,PH*.5,x+sw*1.6,PH*.08+hash(n)*120);ctx.stroke()}}
  if(th===9){const o=sc*.22;for(let n=Math.floor(o/190);n*190-o<VW+80;n++){const x=n*190-o,h=160+hash(n+7)*240;ctx.fillStyle='rgba(90,74,138,.8)';ctx.fillRect(x,PH-150-h,46,h);ctx.fillStyle='rgba(255,224,138,'+(.5+.4*Math.sin(t*2+n))+')';for(let yy=PH-150-h+16;yy<PH-170;yy+=34)ctx.fillRect(x+10,yy,26,12)}}
  if(th===6){ctx.fillStyle='rgba(190,215,200,.35)';const o=sc*.25;for(let n=Math.floor(o/260);n*260-o<VW+80;n++){const x=n*260-o,h=180+hash(n+3)*220;ctx.fillRect(x,PH-170-h,34,h);ctx.fillRect(x-8,PH-170-h,50,14);if(hash(n)>.5)ctx.fillRect(x-8,PH-184,50,14)}}
  if(th===5){ctx.fillStyle='#6a649c';const o=sc*.3;for(let n=Math.floor(o/170);n*170-o<VW+120;n++){const x=n*170-o,h=70+hash(n+5)*130;ctx.beginPath();ctx.moveTo(x-46,0);ctx.lineTo(x,h);ctx.lineTo(x+46,0);ctx.fill()}}
  if(th===3){ctx.fillStyle='rgba(255,255,255,.55)';const o=sc*.2;for(let n=Math.floor(o/220);n*220-o<VW+120;n++){const x=n*220-o,h=50+hash(n)*90;ctx.beginPath();ctx.moveTo(x-70,0);ctx.lineTo(x,h);ctx.lineTo(x+70,0);ctx.fill()}}
  if(th>=12){v2BG(th,sc,t);v2Sky(G,t)};
  hills(T.far,sc*.15,PH-170,70,.004,.011);
  if(th===1){const o=sc*.22,n=Math.floor((o+300)/1500),x=n*1500-o+400,b=PH-190;ctx.fillStyle=T.mid;ctx.beginPath();ctx.moveTo(x-170,b-70);ctx.lineTo(x+190,b-110);ctx.lineTo(x+150,b+40);ctx.lineTo(x-130,b+40);ctx.fill();ctx.fillRect(x-10,b-250,12,170);ctx.fillRect(x-70,b-200,130,9)}
  hills(T.mid,sc*.4,PH-112,48,.006,.017);
  ctx.strokeStyle=T.weed;ctx.lineCap='round';ctx.lineWidth=9;const wo=sc*.7;
  for(let n=Math.floor(wo/150)-1;n*150-wo<VW+60;n++){const x=n*150-wo+hash(n)*60,h=50+hash(n+9)*100,sw=Math.sin(t*1.6+n)*14;ctx.beginPath();ctx.moveTo(x,yMax+30);ctx.quadraticCurveTo(x+sw*.5,yMax+30-h*.5,x+sw,yMax+30-h);ctx.stroke()}
  ctx.fillStyle=T.sand;ctx.beginPath();ctx.moveTo(0,VT);for(let x=0;x<=VW+30;x+=30)ctx.lineTo(x,yMax+24+Math.sin((x+sc)*.012)*7);ctx.lineTo(VW+30,VT);ctx.fill();
  for(let n=Math.floor(sc/210)-1;n*210-sc<VW+40;n++){const x=n*210-sc+hash(n+50)*80,y=yMax+50+hash(n+3)*20,k=hash(n+77);
    if(k<.35){ctx.fillStyle='#ff9d8a';ctx.beginPath();for(let i=0;i<10;i++){const a=i*TAU/10-Math.PI/2,r=i%2?6:14;ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r)}ctx.fill()}
    else if(k<.7){ctx.fillStyle='#fff3f0';ctx.beginPath();ctx.arc(x,y+6,13,Math.PI,0);ctx.fill();ctx.strokeStyle='#f0b8a8';ctx.lineWidth=1.5;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(x,y+6);ctx.lineTo(x+i*5,y-5);ctx.stroke()}}
    else{ctx.fillStyle=T.rock2;circ(x,y,9);circ(x+10,y-8,7);circ(x-9,y-9,6)}}
  ctx.strokeStyle='rgba(255,255,255,.4)';ctx.lineWidth=1.5;
  for(let i=0;i<12;i++){const x=(((i*131-sc*.55)%(VW+60))+VW+60)%(VW+60)-30,y=PH-((t*(26+i%4*9)+i*97)%PH),r=3+i%4*1.6;ctx.beginPath();ctx.arc(x+Math.sin(t+i)*6,y,r,0,TAU);ctx.stroke()}
}
function drawFish(x,y,ang,t,o){
  o=o||{};ctx.save();ctx.translate(x,y);ctx.rotate(ang);const s=o.s||1;ctx.scale(s*(o.lx||1),s);
  const wag=Math.sin(t*14)*.35,c2=o.c2||'#ff7f1f';
  ctx.save();ctx.translate(-23,0);ctx.rotate(wag);ctx.fillStyle=c2;ctx.beginPath();ctx.moveTo(0,0);ctx.quadraticCurveTo(-16,-6,-27,-21);ctx.quadraticCurveTo(-19,0,-27,21);ctx.quadraticCurveTo(-16,6,0,0);ctx.fill();ctx.restore();
  ctx.fillStyle=c2;ctx.beginPath();ctx.moveTo(-12,-19);ctx.quadraticCurveTo(-3,-37,11,-20);ctx.fill();
  const g=ctx.createRadialGradient(-4,-8,4,0,0,30);g.addColorStop(0,o.c0||'#ffe08a');g.addColorStop(1,o.c1||'#ffa01f');if(o.glow){ctx.shadowColor='#fff27a';ctx.shadowBlur=18}ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(0,0,28,23,0,0,TAU);ctx.fill();ctx.shadowBlur=0;
  if(o.stripe){ctx.strokeStyle='rgba(0,40,60,.28)';ctx.lineWidth=4;ctx.lineCap='round';for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-34+i*10,0,30,-.55,.2);ctx.stroke()}}
  if(o.bill){ctx.strokeStyle=c2;ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(26,1);ctx.lineTo(60,-3);ctx.stroke()}
  if(o.lamp){ctx.strokeStyle=c2;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(4,-22);ctx.quadraticCurveTo(22,-44,34,-24);ctx.stroke();ctx.fillStyle='#fff27a';ctx.shadowColor='#fff27a';ctx.shadowBlur=14;circ(34,-22,5);ctx.shadowBlur=0}
  ctx.fillStyle='rgba(255,255,255,.38)';ctx.beginPath();ctx.ellipse(2,10,17,9,0,0,TAU);ctx.fill();
  ctx.fillStyle=c2;ctx.beginPath();ctx.ellipse(-5,8,8,5,.6+wag*.6,0,TAU);ctx.fill();
  if(o.dead){ctx.strokeStyle='#1b2a41';ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(8,-10);ctx.lineTo(18,0);ctx.moveTo(18,-10);ctx.lineTo(8,0);ctx.stroke()}
  else{ctx.fillStyle='#fff';circ(13,-5,o.scared?11:9.5);ctx.fillStyle='#1b2a41';circ(15,-5,o.scared?4:5.4);ctx.fillStyle='#fff';circ(16.8,-7.2,2)}
  ctx.fillStyle='rgba(255,90,120,.45)';circ(7,8,4.5);
  if(o.scared||o.dead){ctx.fillStyle='#8a3b00';circ(23,7,3.6)}else{ctx.strokeStyle='#8a3b00';ctx.lineWidth=2.2;ctx.lineCap='round';ctx.beginPath();ctx.arc(20,4,5.5,.25,1.5);ctx.stroke()}
  ctx.restore()}
function drawPal(x,y,t,turtle){ctx.save();ctx.translate(x,y);
  if(turtle){const fl=Math.sin(t*5)*.35;ctx.fillStyle='#8fe09a';for(const d of[-1,1]){ctx.save();ctx.translate(4,d*11);ctx.rotate(d*(.5+fl));ctx.beginPath();ctx.ellipse(0,d*6,5,10,0,0,TAU);ctx.fill();ctx.restore();ctx.beginPath();ctx.ellipse(-12,d*11,4,6,d*-.6,0,TAU);ctx.fill()}
    circ(-19,0,3.5);circ(18,0,8);ctx.fillStyle='#3f9a55';ctx.beginPath();ctx.ellipse(0,0,17,13,0,0,TAU);ctx.fill();
    ctx.strokeStyle='#2c7440';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-7,-11);ctx.lineTo(-7,11);ctx.moveTo(5,-12);ctx.lineTo(5,12);ctx.moveTo(-16,0);ctx.lineTo(16,0);ctx.stroke();
    ctx.fillStyle='#1b2a41';circ(21,-3,1.8);circ(21,3,1.8)}
  else{ctx.strokeStyle='#ffb24d';ctx.lineCap='round';ctx.lineWidth=10;ctx.beginPath();ctx.moveTo(2,-8);ctx.quadraticCurveTo(-11,4,-1,14);ctx.stroke();
    ctx.lineWidth=5;ctx.beginPath();ctx.arc(4,18,6,Math.PI*1.1,Math.PI*2.5);ctx.stroke();
    ctx.fillStyle='#ffb24d';circ(4,-14,9);ctx.fillRect(10,-15,12,5);ctx.beginPath();ctx.moveTo(-3,-21);ctx.lineTo(1,-30);ctx.lineTo(6,-22);ctx.fill();
    ctx.fillStyle='#ff8f2e';ctx.beginPath();ctx.ellipse(-8,2,3,6+Math.sin(t*12)*1.5,.3,0,TAU);ctx.fill();
    ctx.fillStyle='#fff';circ(6,-16,3.5);ctx.fillStyle='#1b2a41';circ(7,-16,1.8)}
  ctx.restore()}
function drawShark(x,y,t){
  ctx.save();ctx.translate(x,y);const wag=Math.sin(t*11)*.25;
  ctx.fillStyle='#5f7fa3';ctx.save();ctx.translate(104,0);ctx.rotate(wag);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(52,-46);ctx.lineTo(34,0);ctx.lineTo(50,40);ctx.closePath();ctx.fill();ctx.restore();
  ctx.beginPath();ctx.moveTo(-14,-40);ctx.lineTo(30,-90);ctx.lineTo(50,-36);ctx.fill();
  ctx.fillStyle='#7399c0';ctx.beginPath();ctx.moveTo(-122,-8);ctx.bezierCurveTo(-80,-64,60,-58,116,0);ctx.bezierCurveTo(60,54,-60,64,-122,24);ctx.closePath();ctx.fill();
  ctx.fillStyle='#eef6fb';ctx.beginPath();ctx.moveTo(-60,34);ctx.bezierCurveTo(-10,52,60,40,108,4);ctx.bezierCurveTo(50,26,-10,30,-60,34);ctx.fill();
  ctx.fillStyle='#b3263a';ctx.beginPath();ctx.moveTo(-122,-6);ctx.quadraticCurveTo(-76,2,-58,20);ctx.quadraticCurveTo(-92,44,-122,24);ctx.closePath();ctx.fill();
  ctx.fillStyle='#fff';for(let i=0;i<5;i++){const tx=-116+i*11,ty=-4+i*3.2;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(tx+10,ty+3);ctx.lineTo(tx+4,ty+12);ctx.fill()}
  for(let i=0;i<4;i++){const tx=-114+i*11,ty=27+i*1.5;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(tx+10,ty+1);ctx.lineTo(tx+5,ty-9);ctx.fill()}
  ctx.fillStyle='#fff';circ(-58,-24,10);ctx.fillStyle='#1b2a41';circ(-61,-23,5);
  ctx.strokeStyle='#33506e';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-76,-28);ctx.lineTo(-46,-38);ctx.stroke();
  ctx.lineWidth=3;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(-22+i*11,-14);ctx.lineTo(-26+i*11,8);ctx.stroke()}
  ctx.restore()}
function drawRock(sx,e,T){if(e.root)return drawRoot(sx,e,T);
  const hw=e.w/2;ctx.fillStyle=T.rock;ctx.beginPath();
  if(e.top){const y=fy(e.h);ctx.moveTo(sx-hw-12,-10);ctx.bezierCurveTo(sx-hw,y*.6,sx-hw+4,y-10,sx,y);ctx.bezierCurveTo(sx+hw-4,y-10,sx+hw,y*.6,sx+hw+12,-10)}
  else{const y=fy(1-e.h),b=yMax+46;ctx.moveTo(sx-hw-14,b);ctx.bezierCurveTo(sx-hw,lerp(b,y,.6),sx-hw+4,y+10,sx,y);ctx.bezierCurveTo(sx+hw-4,y+10,sx+hw,lerp(b,y,.6),sx+hw+14,b)}
  ctx.fill();ctx.fillStyle=T.rock2;const y0=e.top?fy(e.h):fy(1-e.h),dir=e.top?-1:1;
  for(let i=0;i<4;i++){const hx=hash(e.x+i*7),hy=hash(e.x+i*13);circ(sx+(hx-.5)*hw*1.1,y0+dir*(26+hy*Math.max(10,(yMax-yMin)*e.h-50)),5+hx*6)}}
function drawOcto(x,y,r,warn,t,e){
  const col=['#b57af2','#ff9a4d','#ff7fb0'][Math.floor(hash(e.x)*3)];ctx.save();ctx.translate(x,y);
  ctx.lineCap='round';ctx.lineWidth=9;ctx.strokeStyle=warn?(Math.sin(t*26)>0?'#fff27a':col):col;if(warn){ctx.shadowColor='#fff27a';ctx.shadowBlur=22}
  for(let i=0;i<8;i++){const a=i*TAU/8+Math.sin(t*2+i)*.15,l=r-6,mx=Math.cos(a+.35)*l*.6,my=Math.sin(a+.35)*l*.6;ctx.beginPath();ctx.moveTo(Math.cos(a)*14,Math.sin(a)*14);ctx.quadraticCurveTo(mx,my,Math.cos(a)*l,Math.sin(a)*l);ctx.stroke()}
  ctx.shadowBlur=0;ctx.fillStyle=col;circ(0,-3,25);ctx.fillStyle='rgba(255,255,255,.25)';circ(-8,-13,8);
  ctx.fillStyle='#fff';circ(-9,-3,7);circ(9,-3,7);ctx.fillStyle='#1b2a41';circ(-10,-2,3.5);circ(8,-2,3.5);
  ctx.strokeStyle='#5a2a7a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,8,5,.2,Math.PI-.2);ctx.stroke();ctx.restore()}
function drawJelly(x,y,t,e){
  const col=hash(e.x)<.5?'#ff9fe0':'#8ff0ff';ctx.save();ctx.translate(x,y);ctx.shadowColor=col;ctx.shadowBlur=18;ctx.globalAlpha=.88;ctx.fillStyle=col;
  ctx.beginPath();ctx.arc(0,0,26,Math.PI,0);ctx.quadraticCurveTo(0,12,-26,0);ctx.fill();ctx.shadowBlur=0;
  ctx.strokeStyle=col;ctx.lineWidth=4;ctx.lineCap='round';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*9,4);ctx.quadraticCurveTo(i*9+Math.sin(t*4+i)*8,20,i*9+Math.sin(t*4+i+1)*5,34);ctx.stroke()}
  ctx.globalAlpha=1;ctx.fillStyle='#1b2a41';circ(-8,-8,3);circ(8,-8,3);ctx.restore()}
function drawNet(x,y,t){
  ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(t*1.5)*.1);ctx.beginPath();ctx.arc(0,0,58,0,TAU);ctx.fillStyle='rgba(255,255,255,.14)';ctx.fill();ctx.save();ctx.clip();
  ctx.strokeStyle='#f5e6c0';ctx.lineWidth=2;for(let i=-120;i<=120;i+=17){ctx.beginPath();ctx.moveTo(i-60,-60);ctx.lineTo(i+60,60);ctx.moveTo(i+60,-60);ctx.lineTo(i-60,60);ctx.stroke()}ctx.restore();
  ctx.strokeStyle='#c79a4a';ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,58,0,TAU);ctx.stroke();ctx.fillStyle='#ff6b5a';for(let i=0;i<6;i++)circ(Math.cos(i*TAU/6)*58,Math.sin(i*TAU/6)*58,6);ctx.restore()}
function drawEntity(e,sx,y,g,T){const t=g.t;switch(e.t){
  case'pearl':{const gr=ctx.createRadialGradient(sx-4,y-4,1,sx,y,14);gr.addColorStop(0,'#fff');gr.addColorStop(1,e.air?'#ffd23f':'#ffc9e6');ctx.fillStyle=gr;ctx.shadowColor=e.air?'#ffe27a':'#fff';ctx.shadowBlur=10;circ(sx,y,13);ctx.shadowBlur=0;
    const tw=(Math.sin(t*5+e.x)+1)/2;ctx.fillStyle=`rgba(255,255,255,${tw})`;ctx.fillRect(sx+7,y-14,2,8);ctx.fillRect(sx+4,y-11,8,2)}break;
  case'rock':drawRock(sx,e,T);break;
  case'fnet':drawFnet(e,sx,g,t);break;
  case'fork':case'vent':case'lamp':a2Draw(e,sx,g,t,T);break;
  case'octo':drawOcto(sx,y,octoR(e,t),octoWarn(e,t),t,e);break;
  case'jelly':drawJelly(sx,y,t,e);break;
  case'net':if(!e.hold)drawNet(sx,y,t);break;
  case'ice':ctx.save();ctx.translate(sx,y);ctx.rotate(e.ph*5+t*.4);ctx.fillStyle='#eaf9ff';ctx.strokeStyle='#8cc8ea';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(-30,-18);ctx.lineTo(-8,-34);ctx.lineTo(28,-22);ctx.lineTo(34,12);ctx.lineTo(8,34);ctx.lineTo(-28,22);ctx.closePath();ctx.fill();ctx.stroke();ctx.strokeStyle='#fff';ctx.beginPath();ctx.moveTo(-14,-12);ctx.lineTo(6,-20);ctx.stroke();ctx.restore();break;
  case'wall':{const y0=e.top?0:fy(1-e.h),y1=e.top?fy(e.h):yMax+40;ctx.save();ctx.globalAlpha=e.broken?.25:1;ctx.shadowColor='#ffe45c';ctx.shadowBlur=e.broken?0:24;
    const gr=ctx.createLinearGradient(sx-22,0,sx+22,0);gr.addColorStop(0,'#ffb300');gr.addColorStop(.5,'#fff27a');gr.addColorStop(1,'#ffb300');ctx.fillStyle=gr;ctx.fillRect(sx-22,y0,44,y1-y0);ctx.shadowBlur=0;
    ctx.strokeStyle='#fff';ctx.lineWidth=3;ctx.beginPath();for(let yy=y0,i=0;yy<y1;yy+=22,i++)ctx.lineTo(sx+(i%2?9:-9)*Math.sin(t*8+i),yy);ctx.stroke();
    if(!e.broken&&Math.sin(t*7)>-.3){ctx.fillStyle='#fff27a';const ay=e.top?fy(e.h)+26:fy(1-e.h)-26,d=e.top?1:-1;for(let i=0;i<3;i++){const ax=sx-70-i*46;ctx.beginPath();ctx.moveTo(ax-15,ay);ctx.lineTo(ax+15,ay);ctx.lineTo(ax,ay+d*20);ctx.fill()}}ctx.restore()}break;
  case'vortex':ctx.save();ctx.translate(sx,y);ctx.rotate(-t*3.2);ctx.lineCap='round';for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(190,235,255,${.75-i*.15})`;ctx.lineWidth=7-i;ctx.beginPath();ctx.arc(0,0,16+i*24,i*1.3,i*1.3+4.2);ctx.stroke()}ctx.restore();break;
  case'shield':{const p=1+Math.sin(t*4)*.08;ctx.save();ctx.translate(sx,y+Math.sin(t*2+e.x)*6);ctx.scale(p,p);ctx.shadowColor='#ffd23f';ctx.shadowBlur=20;ctx.fillStyle='rgba(255,220,90,.35)';circ(0,0,27);ctx.shadowBlur=0;ctx.strokeStyle='#ffe27a';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,27,0,TAU);ctx.stroke();ctx.restore();
    drawFish(sx,y+Math.sin(t*2+e.x)*6,0,t,{s:.5,c0:'#fff3a8',c1:'#ffc928',c2:'#f0a400'})}break;
  case'friend':{const by=y+Math.sin(t*2+e.x)*5;drawPal(sx,by,t,hash(e.x)<.5);
    ctx.fillStyle='rgba(255,255,255,.2)';circ(sx,by,32);ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(sx,by,32,0,TAU);ctx.stroke();
    ctx.lineWidth=2;for(let i=-1;i<=1;i++){ctx.beginPath();ctx.moveTo(sx+i*14,by-28);ctx.lineTo(sx+i*14,by+28);ctx.stroke()}}break;
  case'wild':{const f=FISH[e.k];drawFish(sx,y,Math.sin(t*3+e.ph)*.12,t+e.ph,e.shiny?{...f,c0:'#fffbe0',c1:'#ffcf2e',c2:'#d99400',glow:1}:{...f,c0:f.c[0],c1:f.c[1],c2:f.c[2]});if(e.shiny&&Math.sin(t*9+e.ph)>0){ctx.fillStyle='#fff';ctx.fillRect(sx+22,y-26,3,9);ctx.fillRect(sx+19,y-23,9,3)}
    const R=34*f.s*(f.lx?1.25:1)+10;ctx.save();ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2.5;ctx.setLineDash([8,7]);ctx.lineDashOffset=t*30;ctx.beginPath();ctx.arc(sx,y,R+Math.sin(t*5)*2,0,TAU);ctx.stroke();ctx.restore();
    ctx.fillStyle='#fff';for(let i=0;i<e.hp;i++)circ(sx+(i-(e.hp-1)/2)*11,y-R-9,3.5)}break;
  case'mimic':{if(!e.aw){const gr=ctx.createRadialGradient(sx-4,y-4,1,sx,y,14);gr.addColorStop(0,'#fff');gr.addColorStop(1,'#bff0c8');ctx.fillStyle=gr;ctx.shadowColor='#dfffe0';ctx.shadowBlur=10;circ(sx,y,13);ctx.shadowBlur=0;if((t+e.x*.01)%2.2<.3){ctx.fillStyle='#1b2a41';circ(sx-4,y-1,1.8);circ(sx+4,y-1,1.8)}}
    else{const r=18+Math.min(1,e.aw*4)*22+Math.sin(t*20)*2;ctx.save();ctx.translate(sx,y);ctx.fillStyle='#d0504a';for(let i=0;i<10;i++){const a=i*TAU/10+t*2;ctx.beginPath();ctx.moveTo(Math.cos(a-.2)*r*.6,Math.sin(a-.2)*r*.6);ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);ctx.lineTo(Math.cos(a+.2)*r*.6,Math.sin(a+.2)*r*.6);ctx.fill()}ctx.fillStyle='#ff8f8a';circ(0,0,r*.62);ctx.fillStyle='#fff';circ(-7,-4,6);circ(7,-4,6);ctx.fillStyle='#1b2a41';circ(-6,-3,3);circ(8,-3,3);ctx.strokeStyle='#7a1a1a';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(-13,-12);ctx.lineTo(-3,-8);ctx.moveTo(13,-12);ctx.lineTo(3,-8);ctx.stroke();ctx.restore()}}break;
  case'cur':{ctx.save();ctx.fillStyle='rgba(180,230,255,.13)';ctx.fillRect(sx,yMin,e.w,yMax-yMin+40);ctx.strokeStyle='rgba(220,245,255,.7)';ctx.lineWidth=4;ctx.lineCap='round';
    for(let i=0;i<5;i++){const ax=sx+30+i*60,off=((t*150*e.dir+i*70)%160+160)%160;for(let yy=yMin-80+off;yy<yMax+40;yy+=160){if(yy<yMin||yy>yMax+20)continue;ctx.beginPath();ctx.moveTo(ax-10,yy-e.dir*10);ctx.lineTo(ax,yy+e.dir*8);ctx.lineTo(ax+10,yy-e.dir*10);ctx.stroke()}}ctx.restore()}break;
  case'beam':{const by=fy(.5+.3*Math.sin(t*e.sp+e.ph)),hh=(yMax-yMin)*.16;ctx.save();ctx.fillStyle='rgba(255,230,120,.1)';ctx.fillRect(sx-40,yMin,80,yMax-yMin+30);
    const gr=ctx.createRadialGradient(sx,by,6,sx,by,hh);gr.addColorStop(0,'rgba(255,240,150,.85)');gr.addColorStop(1,'rgba(255,220,90,.12)');ctx.fillStyle=gr;ctx.beginPath();ctx.ellipse(sx,by,46,hh,0,0,TAU);ctx.fill();
    ctx.strokeStyle='rgba(255,240,170,.9)';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(sx,by,46,hh,0,0,TAU);ctx.stroke();ctx.fillStyle='#c9a85a';ctx.fillRect(sx-16,yMin-6,32,16);ctx.fillStyle='#fff27a';circ(sx,yMin+12,7);ctx.restore()}break;
  case'torb':ctx.save();ctx.translate(sx,y);ctx.shadowColor='#9ff0ff';ctx.shadowBlur=26+Math.sin(t*4)*8;ctx.fillStyle='#dffaff';circ(0,0,20);ctx.shadowBlur=0;ctx.fillStyle='#9ff0ff';circ(0,0,12);ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2.5;ctx.setLineDash([8,7]);ctx.lineDashOffset=t*30;ctx.beginPath();ctx.arc(0,0,34,0,TAU);ctx.stroke();ctx.restore();break;
  case'btn':{const up=e.f<.5,by=up?yMin+18:yMax+8;ctx.save();ctx.fillStyle='#6f8a7a';ctx.fillRect(sx-9,up?yMin-10:y+8,18,up?y-yMin+2:by-y);ctx.shadowColor=e.on?'#4fe0b5':'#ff9f6b';ctx.shadowBlur=18+Math.sin(t*6)*8;ctx.fillStyle=e.on?'#4fe0b5':'#ff8a5a';circ(sx,y,24);ctx.shadowBlur=0;
    ctx.strokeStyle=e.on?'#1c9c7a':'#c9502a';ctx.lineWidth=2.5;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(sx,y+14);ctx.lineTo(sx+i*9,y-14+Math.abs(i)*4);ctx.stroke()}
    if(!e.on){ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(sx,y,32+((t*30)%14),0,TAU);ctx.stroke()}ctx.restore()}break;
  case'door':{const top=yMin-30,H2=yMax+60-top,oy=-e.a*(H2-46);ctx.save();ctx.fillStyle='#4f6a62';ctx.fillRect(sx-30,top,60,26);ctx.fillRect(sx-30,yMax+36,60,30);
    const gr=ctx.createLinearGradient(sx-24,0,sx+24,0);gr.addColorStop(0,'#7f9a8a');gr.addColorStop(.5,'#b9ccba');gr.addColorStop(1,'#7f9a8a');ctx.fillStyle=gr;ctx.fillRect(sx-24,top+oy,48,H2);
    ctx.strokeStyle='#5f7a6a';ctx.lineWidth=3;for(let yy=top+oy+40;yy<top+oy+H2;yy+=70){ctx.beginPath();ctx.moveTo(sx-24,yy);ctx.lineTo(sx+24,yy);ctx.stroke()}
    const cy=(yMin+yMax)/2+oy;ctx.shadowColor=e.open?'#4fe0b5':'#ff8a5a';ctx.shadowBlur=16;ctx.fillStyle=e.open?'#4fe0b5':'#ff8a5a';circ(sx,cy,11);ctx.shadowBlur=0;ctx.strokeStyle='#fff';ctx.lineWidth=2;ctx.beginPath();ctx.arc(sx,cy,17,0,TAU);ctx.stroke();ctx.restore()}break;
  case'cp':{const b=yMax+36;ctx.strokeStyle='#fff';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(sx,b);ctx.lineTo(sx,b-110);ctx.stroke();ctx.fillStyle=e.hit?'#4fe0b5':'#fff';ctx.beginPath();ctx.moveTo(sx,b-110);ctx.lineTo(sx+44+Math.sin(t*5)*4,b-94);ctx.lineTo(sx,b-76);ctx.fill()}break;
  case'fin':{sx+=fishSX;ctx.save();for(let yy=yMin,i=0;yy<yMax+30;yy+=22,i++){ctx.fillStyle=i%2?'#fff':'#ff7a6b';ctx.fillRect(sx,yy,11,22);ctx.fillStyle=i%2?'#ff7a6b':'#fff';ctx.fillRect(sx+11,yy,11,22)}
    ctx.fillStyle='#fff';ctx.font=`${30*Math.max(1,U*.8)}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('终点'),sx-44,yMin+44);ctx.restore()}break;
}}
function drawNode(e,sx,y,t){ctx.save();ctx.translate(sx,y);ctx.shadowColor=e.k==='salt'?'#bfe6ff':'#9fffc0';ctx.shadowBlur=22+Math.sin(t*4+e.x)*6;
  const own=drawNode2(e,t);
  if(e.k==='scallop'){const op=nodeOpen(e,t),a=op?.55:.06,up=e.f<.5?-1:1;ctx.shadowBlur=op?22:0;ctx.scale(1,up);
    for(const sg of[1,-1]){ctx.save();ctx.rotate(-sg*a*.9+(sg<0?Math.PI:0)*0);ctx.scale(1,sg);ctx.fillStyle=sg>0?'#ffb38a':'#ffc9a8';ctx.beginPath();ctx.moveTo(-26,0);ctx.quadraticCurveTo(0,-30-(sg>0?0:0),26,0);ctx.closePath();ctx.fill();ctx.strokeStyle='#e0784a';ctx.lineWidth=2;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(i*9,-17+Math.abs(i)*3);ctx.stroke()}ctx.restore()}
    if(op){ctx.fillStyle='#fff7ef';circ(0,0,8);ctx.fillStyle='#ffe0c0';circ(0,0,4)}ctx.shadowBlur=0;ctx.scale(1,up);
    if(op){ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=2.5;ctx.setLineDash([8,7]);ctx.lineDashOffset=t*30;ctx.beginPath();ctx.arc(0,0,40+Math.sin(t*5)*2,0,TAU);ctx.stroke();ctx.setLineDash([])}ctx.restore();return}
  if(own){}else if(e.k==='urchin'){ctx.strokeStyle='#3a2a70';ctx.lineWidth=3;ctx.lineCap='round';for(let i=0;i<14;i++){const a=i*TAU/14+Math.sin(t*2+i)*.05;ctx.beginPath();ctx.moveTo(Math.cos(a)*10,Math.sin(a)*10);ctx.lineTo(Math.cos(a)*27,Math.sin(a)*27);ctx.stroke()}ctx.fillStyle='#7a5ad0';circ(0,0,15);ctx.fillStyle='#b9a0f0';circ(-4,-5,5)}
  else if(e.k==='shrimp'){ctx.rotate(Math.sin(t*4+e.x)*.25);ctx.strokeStyle='#ff8f8a';ctx.lineWidth=11;ctx.lineCap='round';ctx.beginPath();ctx.arc(0,4,15,Math.PI*1.05,Math.PI*2.2);ctx.stroke();ctx.fillStyle='#d0504a';circ(13,-2,3);ctx.strokeStyle='#d0504a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(15,-6);ctx.lineTo(30,-18);ctx.moveTo(15,-4);ctx.lineTo(32,-8);ctx.stroke()}
  else if(e.k==='squid'){ctx.fillStyle='#f6ecfa';ctx.beginPath();ctx.moveTo(0,-26);ctx.lineTo(13,2);ctx.lineTo(-13,2);ctx.closePath();ctx.fill();ctx.strokeStyle='#d8c0e6';ctx.lineWidth=4;ctx.lineCap='round';for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*5,3);ctx.quadraticCurveTo(i*5+Math.sin(t*5+i)*5,14,i*6,22);ctx.stroke()}ctx.fillStyle='#1b2a41';circ(-5,-4,2.5);circ(5,-4,2.5)}
  else if(e.k==='dew'){ctx.fillStyle='#9ff0ff';ctx.beginPath();ctx.moveTo(0,-24);ctx.bezierCurveTo(18,0,14,18,0,18);ctx.bezierCurveTo(-14,18,-18,0,0,-24);ctx.fill();ctx.fillStyle='#ffffff';circ(-4,4,4)}
  else if(e.k==='salt'){ctx.fillStyle='#eaf6ff';for(const[a,b,h]of[[-14,6,22],[0,0,34],[13,7,20]]){ctx.beginPath();ctx.moveTo(a-8,b+10);ctx.lineTo(a,b-h);ctx.lineTo(a+8,b+10);ctx.closePath();ctx.fill()}ctx.shadowBlur=0;ctx.fillStyle='#9fd0f5';ctx.beginPath();ctx.moveTo(0,-30);ctx.lineTo(4,8);ctx.lineTo(0,8);ctx.fill()}
  else{ctx.fillStyle='#7fe0a0';for(let i=0;i<7;i++){const a=i*.9,r=i<1?0:i<4?11:20;circ(Math.cos(a*2.3)*r*.8,Math.sin(a*2.3)*r*.5+i*3-8,7)}ctx.shadowBlur=0;ctx.fillStyle='#d9ffe6';for(let i=0;i<7;i++){const a=i*.9,r=i<1?0:i<4?11:20;circ(Math.cos(a*2.3)*r*.8-2,Math.sin(a*2.3)*r*.5+i*3-10,2)}}
  ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=2.5;ctx.setLineDash([8,7]);ctx.lineDashOffset=t*30;ctx.beginPath();ctx.arc(0,0,40+Math.sin(t*5)*2,0,TAU);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#fff';for(let i=0;i<e.hp;i++)circ((i-(e.hp-1)/2)*11,-52,3.5);ctx.restore()}
function drawWorld(){
  const g=G,t=g.t,T=TH[g.theme],F=g.fish;ctx.save();if(g.shake>0)ctx.translate((Math.random()-.5)*10,(Math.random()-.5)*10);
  drawBG(g.theme,g.scroll,t);if(g.faded){ctx.fillStyle='rgba(140,150,160,.42)';ctx.fillRect(0,0,VW,VT)}
  for(const s of g.sharks)if(s.ph===0){const a=.16+.14*Math.sin(t*14);ctx.fillStyle=`rgba(255,60,60,${a})`;ctx.fillRect(0,s.y-58,VW,116);
    ctx.fillStyle='#5f7fa3';const fxx=VW-30-Math.sin(t*10)*8;ctx.beginPath();ctx.moveTo(fxx-34,s.y+26);ctx.lineTo(fxx+4,s.y-36);ctx.lineTo(fxx+26,s.y+26);ctx.fill()}
  for(const e of g.E){if(e.gone)continue;const sx=e.x+(e.dx||0)-g.scroll;if(sx<-200-(e.L||0)||sx>VW+200)continue;drawEntity(e,sx,entY(e,t),g,T)}
  if(g.L&&g.L.tide)drawTide(g,t);v2Surface(g,t);
  if(g.boss&&!g.boss.done&&g.boss.k!=='feed')bossDraw2(g.boss,t);
  if(g.boss&&g.boss.done&&g.boss.k==='feed'){const B=g.boss;if(B.fedAt==null)B.fedAt=t;const k=t-B.fedAt;if(k<3.4){const[bx,by]=bossPos();
    let x=bx,y=by,rot=0,sx=1,sy=1;if(k<1.3){const p=Math.sin(k*9)*.06;sx=1.08+p;sy=1.18-p;y+=Math.sin(k*5)*6}else if(k<2.1){rot=-(k-1.3)/.8*TAU;sy=1.1}else{const q=k-2.1;sx=-1;x+=q*q*520;y-=q*30}
    ctx.save();ctx.translate(x,y);ctx.rotate(rot);ctx.scale(sx,sy);drawShark(0,0,t);ctx.restore();
    if(k<2.1)for(let i=0;i<4;i++){const q=(k*.9+i*.25)%1,hx=bx-40+i*26+Math.sin(k*4+i)*8,hy=by-50-q*90;ctx.globalAlpha=1-q;ctx.fillStyle='#ff7fa8';ctx.beginPath();ctx.arc(hx-5,hy,6,0,TAU);ctx.arc(hx+5,hy,6,0,TAU);ctx.moveTo(hx-11,hy+2);ctx.lineTo(hx,hy+14);ctx.lineTo(hx+11,hy+2);ctx.fill();ctx.globalAlpha=1}
    if(k>.9&&k<1.6){const q=(k-.9)/.7;ctx.strokeStyle=`rgba(255,255,255,${1-q})`;ctx.lineWidth=3;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(bx-120-q*40-i*14,by-6-i*16-q*30,6+i*4+q*8,0,TAU);ctx.stroke()}}
    if(k>2.1){ctx.strokeStyle='rgba(255,255,255,.6)';ctx.lineWidth=3;for(let i=0;i<5;i++){const ly=y-30+i*15;ctx.beginPath();ctx.moveTo(x-200-i*20,ly);ctx.lineTo(x-90-i*10,ly);ctx.stroke()}}}}
  if(g.boss&&!g.boss.done&&g.boss.k==='feed'){const B=g.boss,[bx,by]=bossPos();
    if(B.ph==='idle'){drawShark(bx,by,t);const mx=bx-112,my=by+10,op=bossOpen(B),on=B.carry>0&&op;if(!op){ctx.fillStyle='#5f7fa3';ctx.beginPath();ctx.moveTo(bx-124,by-8);ctx.quadraticCurveTo(bx-84,by+30,bx-54,by+24);ctx.lineTo(bx-56,by+2);ctx.closePath();ctx.fill()}ctx.save();ctx.strokeStyle=on?'#4fe0b5':'rgba(255,255,255,.75)';ctx.globalAlpha=op?1:.25;ctx.lineWidth=on?5:3;ctx.setLineDash([10,8]);ctx.lineDashOffset=-t*40;ctx.beginPath();ctx.arc(mx,my,44+Math.sin(t*6)*3,0,TAU);ctx.stroke();ctx.restore();
      ctx.fillStyle='#fff';ctx.font=`${20*Math.max(1,U*.85)}px ${FONT}`;ctx.textAlign='center';ctx.lineWidth=4;ctx.strokeStyle='rgba(6,40,70,.6)';const tx=on?'点我喂！':op?'咕——':'……';ctx.strokeText(tx,bx-30,by-78);ctx.fillText(tx,bx-30,by-78)}
    for(let i=0;i<B.carry;i++)drawFish(fishSX-50-i*28,F.y+22+Math.sin(t*6+i)*3,0,t+i,{s:.45,c0:'#bff0ff',c1:'#56b8f0',c2:'#2f8fd0'})}
  const dead=state==='dying';
  if(!(g.inv>0&&!g.trap&&Math.sin(t*30)>0)||dead){
    drawFish(fishSX,F.y,dead?Math.PI:clamp(F.vy/520,-.5,.5)+(g.trap?Math.sin(t*30)*.2:0),dead?0:t,{dead,scared:g.sharks.length>0||!!g.trap,...skin()})}
  if(g.orb){const o=g.orb;if(!(o.inv>0&&Math.sin(t*30)>0)){ctx.save();ctx.translate(fishSX-78,o.y);ctx.shadowColor='#9ff0ff';ctx.shadowBlur=26+Math.sin(t*4)*8;ctx.fillStyle='#dffaff';circ(0,0,15);ctx.shadowBlur=0;ctx.fillStyle='#9ff0ff';circ(0,0,9);ctx.fillStyle='#fff';for(let i=0;i<o.hp;i++)circ((i-(o.hp-1)/2)*11,-26,3.5);ctx.restore()}}
  if(g.shield){ctx.save();ctx.translate(fishSX,F.y);ctx.fillStyle='rgba(255,220,80,.2)';circ(0,0,44);ctx.strokeStyle='rgba(255,226,122,.95)';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,44,0,TAU);ctx.stroke();ctx.rotate(t*3);ctx.strokeStyle='#fff';ctx.beginPath();ctx.arc(0,0,44,0,.9);ctx.stroke();ctx.restore()}
  if(g.whale){ctx.save();ctx.translate(fishSX,F.y);ctx.fillStyle='rgba(120,200,255,.16)';circ(0,0,54);ctx.strokeStyle='rgba(160,225,255,.95)';ctx.lineWidth=4;ctx.setLineDash([14,9]);ctx.lineDashOffset=-t*40;ctx.beginPath();ctx.arc(0,0,54,0,TAU);ctx.stroke();ctx.setLineDash([]);
    ctx.translate(-8,-70+Math.sin(t*3)*3);ctx.fillStyle='#4a90d9';ctx.beginPath();ctx.ellipse(0,0,20,12,0,0,TAU);ctx.fill();ctx.beginPath();ctx.moveTo(-17,0);ctx.lineTo(-30,-10);ctx.lineTo(-27,0);ctx.lineTo(-30,9);ctx.fill();
    ctx.fillStyle='#d9efff';ctx.beginPath();ctx.ellipse(3,6,13,5,0,0,TAU);ctx.fill();ctx.fillStyle='#1b2a41';circ(11,-2,2.2);ctx.strokeStyle='#d9efff';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(2,-12);ctx.lineTo(-2,-20);ctx.moveTo(2,-12);ctx.lineTo(6,-20);ctx.stroke();ctx.restore()}
  if(g.magnet&&!dead){ctx.strokeStyle=`rgba(255,255,255,${.18+.1*Math.sin(t*5)})`;ctx.lineWidth=2;ctx.beginPath();ctx.arc(fishSX,F.y,115,0,TAU);ctx.stroke()}
  if(g.trap){if(g.trap.e.lamp){ctx.save();ctx.strokeStyle='rgba(255,240,170,.85)';ctx.lineWidth=4;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(fishSX,F.y,40+i*12+Math.sin(t*8+i)*4,0,TAU);ctx.stroke()}ctx.restore()}else drawNet(fishSX,F.y,t*6)}
  if(g.lcap)a2CapDraw(g,t);
  for(const s of g.sharks)if(s.ph===1)drawShark(s.sx,s.y,t);
  for(const p of g.parts){ctx.globalAlpha=clamp(p.l*2,0,1);if(p.k){ctx.strokeStyle=p.c;ctx.lineWidth=1.5;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,TAU);ctx.stroke()}else{ctx.fillStyle=p.c;circ(p.x,p.y,p.r)}}
  ctx.globalAlpha=1;ctx.textAlign='center';ctx.font=`${20*Math.max(1,U*.85)}px ${FONT}`;
  for(const x of g.texts){ctx.globalAlpha=clamp(x.t*2,0,1);ctx.lineWidth=4;ctx.strokeStyle='rgba(6,40,70,.6)';ctx.strokeText(x.s,x.x+40,x.y);ctx.fillStyle=x.c;ctx.fillText(x.s,x.x+40,x.y)}
  ctx.globalAlpha=1;ctx.restore();
  if(g.L&&g.L.dark){const r=230,gr=ctx.createRadialGradient(fishSX,F.y,r*.5,fishSX,F.y,r);gr.addColorStop(0,'rgba(6,6,22,0)');gr.addColorStop(1,'rgba(6,6,22,.94)');ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT);
}
  if(g.L&&g.L.nodes)for(const e of g.E){if(e.gone||e.t!=='node')continue;const sx=e.x-g.scroll;if(sx>-80&&sx<VW+80)drawNode(e,sx,entY(e,t),t)}
  if(g.sharks.length){const a=.25+.2*Math.sin(t*12),gr=ctx.createRadialGradient(VW/2,VT/2,Math.min(VW,VT)*.35,VW/2,VT/2,Math.max(VW,VT)*.75);gr.addColorStop(0,'rgba(255,0,0,0)');gr.addColorStop(1,`rgba(255,40,40,${a})`);ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT)}
  if(g.trap){const tr=g.trap,R=62*U,cx=VW/2,cy=Math.min(VT*.62,yMax-R*.4),pu=1+Math.sin(t*12)*.05,red=tr.t<=3&&Math.sin(t*16)>0;
    ctx.fillStyle='rgba(6,40,70,.35)';ctx.fillRect(0,0,VW,VT);
    ctx.fillStyle='#ffd23f';ctx.shadowColor='#ffd23f';ctx.shadowBlur=24*U;circ(cx,cy,R*pu);ctx.shadowBlur=0;
    ctx.strokeStyle='rgba(255,255,255,.5)';ctx.lineWidth=9*U;ctx.beginPath();ctx.arc(cx,cy,R+12*U,0,TAU);ctx.stroke();
    ctx.strokeStyle='#4fe0b5';ctx.lineCap='round';ctx.beginPath();ctx.arc(cx,cy,R+12*U,-Math.PI/2,-Math.PI/2+TAU*clamp(tr.p/tr.need,0,1));ctx.stroke();
    ctx.fillStyle='#6a4500';ctx.textAlign='center';ctx.font=`${(SAVE.lang==='zh'?23:/^(ru|de|fr|it|es)$/.test(SAVE.lang)?14:18)*U}px ${FONT}`;ctx.fillText(tl(g.mode==='simple'?'最后机会！':'快点我！'),cx,cy-2*U);ctx.font=`${15*U}px ${FONT}`;ctx.fillText(tl('连续点击'),cx,cy+22*U);
    ctx.font=`${44*U}px ${FONT}`;ctx.fillStyle=red?'#ff4d4d':'#fff';ctx.lineWidth=5*U;ctx.strokeStyle='rgba(6,40,70,.6)';const s=tl(Math.ceil(tr.t)+' 秒');ctx.strokeText(s,cx,cy-R-34*U);ctx.fillText(s,cx,cy-R-34*U)}
  if(g.boss&&!g.boss.done&&g.boss.k!=='feed')bossHud2(g.boss,t);
  if(g.boss&&!g.boss.done&&g.boss.k==='feed'){const B=g.boss,w=Math.min(VW-40*U,300*U),x0=(VW-w)/2,y0=yMin+8*U,h=22*U,sg=w/B.need;ctx.fillStyle='rgba(6,40,70,.55)';ctx.fillRect(x0-4*U,y0-4*U,w+8*U,h+8*U);
    for(let i=0;i<B.need;i++){ctx.fillStyle=i<B.hun?'#4fe0b5':'rgba(255,255,255,.25)';ctx.fillRect(x0+i*sg+2*U,y0,sg-4*U,h)}ctx.fillStyle='#fff';ctx.font=`${14*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText('大白的肚子  '+B.hun+' / '+B.need,VW/2,y0+h+18*U)}
  if(g.flash>0){ctx.fillStyle=`rgba(255,255,255,${g.flash})`;ctx.fillRect(0,0,VW,VT)}
}
function updateHUD(){
  const g=G,hi=g.mode==='hard'?1:0,m=Math.floor(g.scroll/60),endless=g.mode==='endless';
  const key=[g.life,g.pearls,g.rescued,m,g.shield,g.combo,g.lvl,g.whale,g.nCaught,g.magnet,Object.keys(g.buff).filter(k=>g.buff[k]).join('')].join();if(key===g.hudKey)return;g.hudKey=key;
  let s='';for(let i=0;i<g.maxLife;i++)s+=`<i class="st ${g.life>=i+1?'f':g.life>=i+.5?'h':''}"></i>`;$('stars').innerHTML=s;
  let goal;if(endless)goal=`⚪ ${g.pearls} · ${score()} 分`;else{const k=g.L.goal;goal=k.k==='pearl'?`⚪ ${g.pearls} / ${k.n[hi]}`:k.k==='rescue'?`🐢 ${g.rescued} / ${k.n[hi]} · ⚪ ${g.pearls}`:k.k==='boss'?(g.L.friends?`🐢 ${g.rescued} · ⚪ ${g.pearls}`:`✨ ${gcount(g)} · ⚪ ${g.pearls}`):k.k==='gather'?`✨ ${gcount(g)} / ${k.n[hi]} · ⚪ ${g.pearls}`:`⚪ ${g.pearls}`}
  $('cGoal').textContent=goal;$('cDist').textContent=endless?`${m} 米 · Lv.${g.lvl+1}`:`${m} / ${g.L.len} 米`;
  $('cShield').hidden=!g.shield;$('cWhale').hidden=!g.whale;{const bf=ITEMS.filter(it=>g.buff[it.id]||(it.id==='magnet'&&g.magnet)).map(it=>it.ic).join(' ');$('cBuff').hidden=!bf;$('cBuff').textContent=bf}$('cFish').hidden=!g.nCaught;$('cFish').textContent='🎣 '+g.nCaught;$('cCombo').hidden=g.combo<3;$('cCombo').textContent=`连击 ${g.combo}`;
  if(!endless)$('prog').firstElementChild.style.width=clamp(g.scroll/(g.L.len*60)*100,0,100)+'%';
}

