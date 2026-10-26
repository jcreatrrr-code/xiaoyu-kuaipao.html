/* ---------- 第三卷 第二幕、第三幕：漩涡海峡、沉钟湾、雾坊、哨岛、大潮滩、锚链海、雾心、散雾 ---------- */
TH.push(
 {n:'漩涡海峡',top:'#6a8a9a',bot:'#0e2230',far:'#4e6e80',mid:'#345468',sand:'#5a5a58',rock:'#3e4a52',rock2:'#28323a',weed:'#5a7a6a'},
 {n:'沉钟湾',top:'#5e7480',bot:'#0c1820',far:'#46606c',mid:'#304a56',sand:'#6a6458',rock:'#4a4a44',rock2:'#30302c',weed:'#6a7a5a'},
 {n:'雾坊',top:'#a0a4aa',bot:'#2a2c32',far:'#84888e',mid:'#62666e',sand:'#5a5650',rock:'#46464c',rock2:'#2e2e34',weed:'#6a7268'},
 {n:'哨岛',top:'#c8cdd2',bot:'#5a6470',far:'#aab0b8',mid:'#8a929c',sand:'#7a7670',rock:'#5a5c62',rock2:'#3e4046',weed:'#7a8a80'},
 {n:'大潮滩',top:'#b0aa98',bot:'#3e3a32',far:'#948e7c',mid:'#76705e',sand:'#5e5244',rock:'#6e5e4a',rock2:'#4e4234',weed:'#7e8a62'},
 {n:'锚链海',top:'#64788a',bot:'#0e1a26',far:'#4a5e70',mid:'#344858',sand:'#4e4c4a',rock:'#3e4248',rock2:'#26292e',weed:'#5a6a6a'},
 {n:'雾心',top:'#7a7488',bot:'#141220',far:'#5e5a6e',mid:'#423e54',sand:'#4a4652',rock:'#3a3644',rock2:'#24222c',weed:'#8a6a9a'},
 {n:'散雾',top:'#8ab0d0',bot:'#1a2a40',far:'#6a90b0',mid:'#4a7090',sand:'#9a8a9a',rock:'#7a5a8a',rock2:'#5a3e6a',weed:'#a070c0'});
LV.push(
 {name:'漩涡海峡',vol:3,fish:['mack','saury','sard'],len:210,theme:28,nodes:['abalone'],gname:'鲍鱼',pool:{pearls:2,whirl:8,rockB:2,rockT:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'沉钟湾',vol:3,fish:['cod','bream','yellow'],len:210,theme:29,nodes:['oyster'],gname:'牡蛎',pool:{pearls:2,sbell:9,rockB:1,octo:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'雾坊',vol:3,fish:['sard','mack','eel'],len:210,theme:30,spray:1,nodes:['cod3'],gname:'大头鳕',pool:{pearls:2,rockB:3,rockT:3,gate:3,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'哨岛',vol:3,fish:['sard','bream'],len:200,theme:31,fog:1,boss:'whistle',gtxt:'听哨声从哪边来，就往哪边游',pool:{pearls:2,rockB:2,rockT:1,jelly:1,shield:1},goal:{k:'boss'},extra:[20,30]},
 {name:'大潮滩',vol:3,fish:['eel','yellow','bream'],len:210,theme:32,ebb:2,nodes:['mudskip'],gname:'弹涂鱼',pool:{pearls:2,rockB:5,octo:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'锚链海',vol:3,fish:['cod','mack','tuna'],len:220,theme:33,nodes:['seacuc'],gname:'海参',pool:{pearls:2,chain:9,rockB:1,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'雾心',vol:3,fish:['sard','saury','yellow'],len:220,theme:34,fog:1,pilot:1,nodes:['laver'],gname:'紫菜',pool:{pearls:2,rockB:3,rockT:3,gate:2,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'散雾',vol:3,fish:['sard','bream'],len:200,theme:35,fog:1,boss:'fogbell',gtxt:'等钟摆到正中间再敲，把雾一层层敲散',pool:{pearls:2,rockB:2,rockT:1,jelly:1,shield:1},goal:{k:'boss'},extra:[20,30]});
Object.assign(FISH,{abalone:{n:'鲍鱼',c:['#e8f0e0','#7a8a6a','#4a5a3a'],s:1,x:1},oyster:{n:'牡蛎',c:['#f4f0e8','#a8a090','#6a6458'],s:1,x:1},cod3:{n:'大头鳕',c:['#f0ece0','#a89a7a','#5a4e3a'],s:1,x:1},
 mudskip:{n:'弹涂鱼',c:['#e8dcc0','#8a7a5a','#4a3e2a'],s:1,x:1},seacuc:{n:'海参',c:['#c8b8a8','#5a4a3e','#2e2420'],s:1,x:1},laver:{n:'紫菜',c:['#e0c8f0','#7a4a9a','#4a2a6a'],s:1,x:1}});
Object.assign(NODE,{abalone:{tool:'',hp:2,f:.9,no:''},oyster:{tool:'',hp:3,f:.88,no:''},cod3:{tool:'',hp:2,f:.5,no:''},
 mudskip:{tool:'',hp:1,timed:1,f:.9,wait:'等弹涂鱼跳出泥洞再点',no:''},seacuc:{tool:'',hp:1,f:.92,no:''},laver:{tool:'',hp:2,f:.1,no:''}});
Object.assign(BOSSMSG,{whistle:'阿岚躲在雾里吹哨。哨声从哪边来，就点哪边。后面会有假回声：声音小、波纹淡的那个是假的',
 fogbell:'水下几口雾钟在来回摇。等一口钟摆到正中间再点它，敲响一口就散一点雾。一共五层雾'});
Object.assign(TIPS,{whirl:'前面是漩涡！离它远一点。被卷进去就快速连点屏幕挣出来',sbell:'沉钟会来回摆。钟身会撞人，吊钟的铁链不会',chain:'锚链一上一下地拉动。等锚提上去，从下面钻过去'});
Object.assign(V3TIP,{spray:'雾坊会一阵阵喷雾，喷雾时什么都看不见。趁雾没来，先记住前面的路',ebb2:'一年最大的退潮！水面会一直往下降，不会再涨回来。趁水还没干，游到头',
 pilot:'远洋号跟在你后面，沿着你游过的路走。船比你大，别让它擦到礁石'});
/* 漩涡：靠近会被往中间吸，掉进漩涡眼就被卷住，连点才能挣出来；沉钟：吊在横梁上来回摆；锚链：一上一下地拉动 */
Object.assign(PAT,{
 whirl(g,x,d){const hd=g.mode!=='simple',f=g.r(.3,.7);g.E.push({t:'whirl',x,f,r:hd?118:100,ph:g.r(0,6)});const f2=f<.5?clamp(f+.42,.1,.9):clamp(f-.42,.1,.9);arc(g,x-130,f2,f2,6)},
 sbell(g,x,d){const hd=g.mode!=='simple',n=d>.5&&hd?2:1;for(let i=0;i<n;i++){const len=g.r(.32,.66);g.E.push({t:'sbell',x:x+i*210,len,amp:hd?120:95,sp:g.r(1.5,2.1)*(hd?1.15:1),ph:g.r(0,6)});
   const f=len<.5?clamp(len+.32,.1,.9):clamp(len-.34,.1,.9);arc(g,x+i*210-150,f,f,5)}g.x+=(n-1)*210},
 chain(g,x,d){const hd=g.mode!=='simple',n=hd&&d>.4?3:2,sp=hd?1.9:1.5,ph=g.r(0,6);for(let i=0;i<n;i++)g.E.push({t:'chain',x:x+i*170,lo:.12,hi:hd?.8:.74,sp,ph:ph+i*Math.PI*.8});arc(g,x-160,.86,.86,4+n*2);g.x+=(n-1)*170}});
const SB={pos:(e,sx,t)=>{const a=Math.sin(t*e.sp+e.ph);return[sx+a*e.amp,fy(e.len)]},R:44},CHN={y:(e,t)=>fy(e.lo+(e.hi-e.lo)*(.5-.5*Math.cos(t*e.sp+e.ph)))};
function v3bHit(g,e,sx,y,dx,dist,dt,k){const F=g.fish;
  if(e.t==='whirl'){const R=e.r*1.8;if(dist<R&&!g.trap){const pull=230*k*(1-dist/R);F.y+=Math.sign(y-F.y)*Math.min(Math.abs(y-F.y),pull*dt)}
    if(dist<e.r*.42&&!g.trap&&g.inv<=0){if(g.shield||g.whale){absorb();e.gone=1;burst(sx,y,'#dff4ff',14);return}
      const T=g.mode==='simple'?6:8;g.trap={t:T,T,p:0,need:g.mode==='simple'?7:12,e};e.hold=1;g.combo=0;SFX.hit();toast(g.mode==='simple'?'被漩涡卷住了！快速连点屏幕！':'被漩涡卷住了！连点挣出来！',2,1)}return}
  if(e.t==='sbell'){const[bx,by]=SB.pos(e,sx,g.t);if(Math.hypot(bx-fishSX,by-F.y)<SB.R+14&&hurt(1)){SFX.hit();bellSnd()}return}
  if(e.t==='chain'){const ay=CHN.y(e,g.t);if(Math.abs(dx)<20&&F.y-16<ay+18)hurt(1)}}
function v3bDraw(e,sx,g,t,T){
  if(e.t==='whirl'){const y=fy(e.f);ctx.save();ctx.translate(sx,y);if(e.hold){ctx.restore();return}
    for(let i=0;i<5;i++){const r=e.r*(1.75-i*.3);ctx.strokeStyle=`rgba(220,236,244,${.12+i*.1})`;ctx.lineWidth=3+i;ctx.beginPath();for(let a=0;a<TAU*1.1;a+=.2){const q=r*(1-a/TAU*.35);ctx.lineTo(Math.cos(a-t*(2+i*.6)+e.ph)*q,Math.sin(a-t*(2+i*.6)+e.ph)*q*.8)}ctx.stroke()}
    ctx.fillStyle='rgba(10,20,30,.75)';ctx.beginPath();ctx.ellipse(0,0,e.r*.38,e.r*.3,0,0,TAU);ctx.fill();ctx.restore();return}
  if(e.t==='sbell'){const[bx,by]=SB.pos(e,sx,t);ctx.save();ctx.fillStyle=T.rock2;ctx.fillRect(sx-140,yMin-4,280,12);ctx.strokeStyle='#5a5448';ctx.lineWidth=4;ctx.setLineDash([7,4]);ctx.beginPath();ctx.moveTo(sx,yMin+6);ctx.lineTo(bx,by-36);ctx.stroke();ctx.setLineDash([]);
    ctx.translate(bx,by);ctx.rotate((sx-bx)/e.amp*-.35);ctx.fillStyle='#7a6a3a';ctx.beginPath();ctx.moveTo(-40,26);ctx.quadraticCurveTo(-36,-30,0,-38);ctx.quadraticCurveTo(36,-30,40,26);ctx.closePath();ctx.fill();
    ctx.fillStyle='#5a4e2a';ctx.fillRect(-44,22,88,8);ctx.strokeStyle='#a8945a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-6,12,0,TAU);ctx.stroke();ctx.beginPath();ctx.moveTo(-12,-6);ctx.lineTo(12,-6);ctx.moveTo(0,-18);ctx.lineTo(0,6);ctx.stroke();
    ctx.fillStyle='rgba(90,140,110,.5)';circ(-22,10,5);circ(18,14,4);ctx.restore();return}
  if(e.t==='chain'){const ay=CHN.y(e,t);ctx.save();ctx.strokeStyle='#4a4e54';ctx.lineWidth=5;for(let y=yMin-10;y<ay-14;y+=16){ctx.beginPath();ctx.ellipse(sx,y+8,5,9,0,0,TAU);ctx.stroke()}
    ctx.fillStyle='#3a3e44';ctx.fillRect(sx-4,ay-18,8,30);ctx.beginPath();ctx.moveTo(sx-30,ay+4);ctx.quadraticCurveTo(sx,ay+34,sx+30,ay+4);ctx.lineTo(sx+24,ay+2);ctx.quadraticCurveTo(sx,ay+24,sx-24,ay+2);ctx.closePath();ctx.fill();
    ctx.fillRect(sx-16,ay-14,32,6);ctx.beginPath();ctx.moveTo(sx-34,ay+4);ctx.lineTo(sx-26,ay-6);ctx.lineTo(sx-24,ay+6);ctx.fill();ctx.beginPath();ctx.moveTo(sx+34,ay+4);ctx.lineTo(sx+26,ay-6);ctx.lineTo(sx+24,ay+6);ctx.fill();ctx.restore()}}
/* 大潮滩：水面跟着游过的路一直往下降，不再涨回来 */
const ebb2D=hd=>hd?.55:.48,ebb2At=(g,x,L)=>ebb2D(g.mode!=="simple")*clamp(x/((L||g.L).len*60*.85),0,1);
function v3bBuild(L,g){const hd=g.mode!=='simple';
  if(L.ebb===2){for(const e of g.E){const dd=ebb2At(g,e.x,L);if(e.t==='rock')e.h=Math.min(e.h,Math.max(.08,1-dd-(hd?.24:.28)));else if(e.f!=null&&e.t!=='node'){e.f=Math.max(e.f,dd+.1);if(e.amp)e.amp=Math.min(e.amp,(1-dd-.1)*.2)}}}
  if(L.pilot)for(const e of g.E)if(e.t==='rock')e.h=Math.min(e.h,.36);
  if(L.spray)g.spT=4}
function v3bTick(g,dt){const L=g.L,F=g.fish,hd=g.mode!=='simple';
  if(L.spray&&!g.boss){if(g.spT==null)g.spT=4;g.spT-=dt;if(g.spT<=0){if(g.spP==='warn'){g.spP='fog';g.spT=hd?2.4:1.8;CSND.crash()}else if(g.spP==='fog'){g.spP='';g.spT=hd?4.5:6}else{g.spP='warn';g.spT=1.2;SFX.alarm();if(!g.tips.spray&&g.mode==='simple'){g.tips.spray=1;toast(V3TIP.spray,3.4)}}}}
  if(L.ebb===2&&!g.trap){const c=yMin+ebb2At(g,g.scroll+fishSX)*(yMax-yMin);if(F.y<c+22){F.y=c+22;if(F.vy<0)F.vy=0}if(!g.tips.v3ebb2&&g.t>2&&g.mode==='simple'){g.tips.v3ebb2=1;toast(V3TIP.ebb2,3.4)}}
  if(L.pilot){const tr=g.trail=g.trail||[];tr.push([g.scroll,F.y]);while(tr.length>2&&tr[1][0]<g.scroll-260)tr.shift();g.shipInv=Math.max(0,(g.shipInv||0)-dt);
    if(!g.tips.pilot&&g.t>2&&g.mode==='simple'){g.tips.pilot=1;toast(V3TIP.pilot,3.4)}
    const sy=pilotY(g);if(sy!=null&&g.shipInv<=0&&!(g.boss&&!g.boss.done))for(const e of g.E){if(e.gone||e.t!=='rock')continue;const sx=e.x+(e.dx||0)-g.scroll,hw=e.w/2-10,ry=e.top?fy(e.h)-10:fy(1-e.h)+10;
      if(Math.abs(sx-(fishSX-PILOT.d))<hw+30&&(e.top?sy-14<ry:sy+14>ry)){g.shipInv=1.6;if(hurt(1)){ftext(tl('船擦到礁石了！'),fishSX-PILOT.d-40,sy-40,'#ffb3b3');CSND.crash()}break}}}}
const PILOT={d:170},pilotY=g=>{const tr=g.trail;if(!tr||!tr.length)return null;const x=g.scroll-PILOT.d;if(tr[0][0]>x)return tr[0][1];for(let i=tr.length-1;i>0;i--)if(tr[i-1][0]<=x){const a=tr[i-1],b=tr[i],k=(x-a[0])/Math.max(1,b[0]-a[0]);return lerp(a[1],b[1],k)}return tr[0][1]};
function v3bOver(g,t){const L=g.L,F=g.fish,hd=g.mode!=='simple';
  if(L.ebb===2){const c=yMin+ebb2At(g,g.scroll+fishSX)*(yMax-yMin);ctx.save();ctx.fillStyle='#c8c0ac';ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(VW,0);for(let x=VW;x>=-20;x-=20){const cx=yMin+ebb2At(g,g.scroll+x)*(yMax-yMin);ctx.lineTo(x,cx+Math.sin(x*.05+t*2)*3)}ctx.fill();
    ctx.fillStyle='rgba(110,90,70,.5)';for(let n=Math.floor(g.scroll*.6/150)-1;n*150-g.scroll*.6<VW+60;n++){const x=n*150-g.scroll*.6+hash(n+3)*40,cx=yMin+ebb2At(g,g.scroll+x)*(yMax-yMin);ctx.beginPath();ctx.ellipse(x,cx-8,46,6,0,0,TAU);ctx.fill()}
    ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=3;ctx.beginPath();for(let x=0;x<=VW+20;x+=20){const cx=yMin+ebb2At(g,g.scroll+x)*(yMax-yMin);ctx.lineTo(x,cx+Math.sin(x*.05+t*2)*3)}ctx.stroke();
    const p=clamp((g.scroll+fishSX)/(L.len*60),0,1);ctx.fillStyle='rgba(60,50,40,.75)';ctx.font=`${14*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl(p<.85?'水还在退':'快到头了！'),VW/2,c-14);ctx.restore()}
  if(L.pilot){const sy=pilotY(g);if(sy!=null){const x=fishSX-PILOT.d;ctx.save();if(g.shipInv>0&&Math.sin(t*30)>0)ctx.globalAlpha=.4;ctx.translate(x,sy);
      ctx.fillStyle='rgba(30,26,40,.85)';ctx.beginPath();ctx.moveTo(-46,-10);ctx.lineTo(40,-10);ctx.quadraticCurveTo(52,-8,46,4);ctx.quadraticCurveTo(0,20,-40,8);ctx.closePath();ctx.fill();
      ctx.fillStyle='#ffd870';ctx.shadowColor='#ffd870';ctx.shadowBlur=14;circ(34,-14,4);ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,236,170,.5)';ctx.setLineDash([3,6]);ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(48,0);ctx.lineTo(PILOT.d-30,F.y-sy);ctx.stroke();ctx.setLineDash([]);ctx.restore()}}
  if(L.spray&&(g.spP==='warn'||g.spP==='fog')){ctx.save();if(g.spP==='warn'){const a=.25+.25*Math.sin(t*16);ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.fillRect(0,yMin,VW,10*U);ctx.fillStyle='#fff';ctx.font=`bold ${16*U}px ${FONT}`;ctx.textAlign='center';ctx.fillText(tl('雾坊要喷雾了！'),VW/2,yMin+34*U)}
    else{const k=Math.min(1,(hd?2.4:1.8)-g.spT<.3?((hd?2.4:1.8)-g.spT)/.3:g.spT/.3);const gr=ctx.createRadialGradient(fishSX,F.y,30,fishSX,F.y,110);gr.addColorStop(0,`rgba(244,246,248,${.3*k})`);gr.addColorStop(1,`rgba(244,246,248,${.97*k})`);ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT)}ctx.restore()}}
function v3bBG(th,sc,t){
  if(th===28){ctx.strokeStyle='rgba(200,220,230,.18)';ctx.lineWidth=3;for(let n=0;n<4;n++){const x=((n*300-sc*.3)%(VW+300)+VW+300)%(VW+300)-150,y=PH*.45+n%2*60;ctx.beginPath();for(let a=0;a<TAU*2;a+=.25){const r=10+a*9;ctx.lineTo(x+Math.cos(a-t*1.5)*r,y+Math.sin(a-t*1.5)*r*.4)}ctx.stroke()}}
  if(th===29){ctx.fillStyle='rgba(60,56,40,.45)';const o=sc*.25;for(let n=Math.floor(o/260)-1;n*260-o<VW+100;n++){const x=n*260-o+hash(n+9)*80,y=PH-120-hash(n)*40,r=30+hash(n+4)*24;ctx.save();ctx.translate(x,y);ctx.rotate((hash(n+2)-.5)*.9);ctx.beginPath();ctx.moveTo(-r,r*.7);ctx.quadraticCurveTo(-r*.9,-r*.8,0,-r);ctx.quadraticCurveTo(r*.9,-r*.8,r,r*.7);ctx.fill();ctx.restore()}}
  if(th===30){ctx.fillStyle='rgba(50,50,56,.6)';const o=sc*.2;for(let n=Math.floor(o/420)-1;n*420-o<VW+200;n++){const x=n*420-o+hash(n+13)*120;ctx.fillRect(x-60,PH-260,120,110);ctx.fillRect(x+20,PH-340,24,90);
    ctx.fillStyle=`rgba(230,232,236,${.3+.2*Math.sin(t*2+n)})`;for(let i=0;i<4;i++){const q=(t*.25+i/4)%1;circ(x+32+Math.sin(q*4+n)*20,PH-350-q*200,16+q*40)}ctx.fillStyle='rgba(50,50,56,.6)'}}
  if(th===32){ctx.fillStyle='rgba(100,84,64,.45)';for(let n=Math.floor(sc*.3/120)-1;n*120-sc*.3<VW+60;n++){const x=n*120-sc*.3+hash(n+51)*30;ctx.beginPath();ctx.ellipse(x,PH-130,54,12,0,0,TAU);ctx.fill()}}
  if(th===33){ctx.fillStyle='rgba(20,24,30,.55)';const o=sc*.12;for(let n=Math.floor(o/600)-1;n*600-o<VW+300;n++){const x=n*600-o+hash(n+17)*200;ctx.beginPath();ctx.moveTo(x-200,yMin*.6);ctx.lineTo(x+200,yMin*.6);ctx.lineTo(x+160,yMin*.6+40);ctx.lineTo(x-170,yMin*.6+40);ctx.fill()}}
  if(th===34||th===35){ctx.fillStyle=th===35?'rgba(160,110,200,.22)':'rgba(120,90,150,.25)';for(let n=Math.floor(sc*.4/90)-1;n*90-sc*.4<VW+60;n++){const x=n*90-sc*.4+hash(n+61)*30;circ(x,PH-150+hash(n)*20,10+hash(n+1)*12)}}}
function v3bNode(e,t){
  if(e.k==='abalone'){ctx.fillStyle='#5a6a4a';ctx.beginPath();ctx.ellipse(0,4,24,14,-.2,0,TAU);ctx.fill();ctx.strokeStyle='#9aaa8a';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(-4,4,8+i*6,4+i*4,-.2,0,TAU);ctx.stroke()}ctx.fillStyle='#d8e8f0';for(let i=0;i<4;i++)circ(-14+i*8,-4-i,2);return 1}
  if(e.k==='oyster'){ctx.rotate(Math.sin(t*.6+e.x)*.05);ctx.fillStyle='#8a8478';ctx.beginPath();ctx.moveTo(-24,6);ctx.quadraticCurveTo(-20,-16,6,-14);ctx.quadraticCurveTo(26,-8,22,8);ctx.quadraticCurveTo(0,18,-24,6);ctx.fill();ctx.strokeStyle='#c8c0b0';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-2,8,10+i*6,Math.PI*1.1,Math.PI*1.9);ctx.stroke()}return 1}
  if(e.k==='cod3'){ctx.rotate(Math.sin(t*1.3+e.x)*.1);ctx.fillStyle='#a89a7a';ctx.beginPath();ctx.ellipse(0,0,26,11,0,0,TAU);ctx.fill();ctx.fillStyle='#f0ece0';ctx.beginPath();ctx.ellipse(2,5,20,4,0,0,TAU);ctx.fill();ctx.fillStyle='#5a4e3a';for(let i=0;i<5;i++)circ(-14+i*7,-4+(i%2)*2,1.8);ctx.beginPath();ctx.moveTo(-24,0);ctx.lineTo(-36,-9);ctx.lineTo(-36,9);ctx.fill();ctx.strokeStyle='#5a4e3a';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(22,6);ctx.lineTo(24,14);ctx.stroke();ctx.fillStyle='#1b2a41';circ(16,-3,2.4);return 1}
  if(e.k==='mudskip'){const op=nodeOpen(e,t),k=op?Math.abs(Math.sin(((t+e.x*.01)%3.2)/1.9*Math.PI)):0;ctx.fillStyle='#4e4234';ctx.beginPath();ctx.ellipse(0,16,26,7,0,0,TAU);ctx.fill();ctx.fillStyle='#2a2018';ctx.beginPath();ctx.ellipse(0,15,8,3,0,0,TAU);ctx.fill();
    ctx.save();ctx.translate(0,12-k*30);ctx.rotate(-.3*k);ctx.fillStyle='#8a7a5a';ctx.beginPath();ctx.ellipse(0,0,16,7,0,0,TAU);ctx.fill();ctx.fillStyle='#bfe0ff';circ(8,-7,3.5);circ(3,-7,3.5);ctx.fillStyle='#1b2a41';circ(8,-7,1.6);circ(3,-7,1.6);ctx.fillStyle='#6a5a3a';ctx.beginPath();ctx.moveTo(-6,-6);ctx.lineTo(0,-12);ctx.lineTo(4,-6);ctx.fill();ctx.restore();if(!op)ctx.globalAlpha=.45;return 1}
  if(e.k==='seacuc'){ctx.fillStyle='#5a4a3e';ctx.beginPath();ctx.ellipse(0,6,26,9,Math.sin(t+e.x)*.05,0,TAU);ctx.fill();ctx.fillStyle='#7a6a5a';for(let i=0;i<7;i++)circ(-20+i*7,0+Math.sin(i)*2,2.5);ctx.fillStyle='#e8d8c8';for(let i=0;i<4;i++)circ(24+Math.cos(i*1.6)*4,4+Math.sin(i*1.6)*4,1.5);return 1}
  if(e.k==='laver'){ctx.fillStyle='#6a5a6a';ctx.fillRect(-28,-16,56,8);for(let i=-2;i<=2;i++){ctx.fillStyle=i%2?'#7a4a9a':'#9a6aba';ctx.beginPath();ctx.moveTo(i*10-4,-8);ctx.quadraticCurveTo(i*10+Math.sin(t*2+i)*8,8,i*10+Math.sin(t*2+i+1)*4,22);ctx.lineTo(i*10+4,-8);ctx.fill()}return 1}
  return 0}
/* ---------- 海女哨 Boss：满屏大雾，阿岚在上下左右某一边吹哨，点对方向就钻过一层雾 ---------- */
const WH={D:[[0,-1],[1,0],[0,1],[-1,0]],N:['上','右','下','左'],need:()=>G.mode==='hard'?14:10,fake:()=>G.mode==='hard'?3:5};
function whSnd(d,v){if(SAVE.mute)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=='running')AC.resume();const t=AC.currentTime,o=AC.createOscillator(),gn=AC.createGain();
  const f0=d===0?1900:d===2?1300:1600,f1=d===0?2500:d===2?1000:1750;o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.linearRampToValueAtTime(f1,t+.55);gn.gain.setValueAtTime(.0001,t);gn.gain.linearRampToValueAtTime(.12*v,t+.05);gn.gain.exponentialRampToValueAtTime(.001,t+.7);
  let nd=gn;if(AC.createStereoPanner&&(d===1||d===3)){const p=AC.createStereoPanner();p.pan.value=d===1?.9:-.9;gn.connect(p);nd=p}o.connect(gn);nd.connect(AC.destination);o.start(t);o.stop(t+.75)}catch(e){}}
function whistleMk(g,hd,fin){const B={k:'whistle',mini:1,fin,tries:0,
  reset(){const hd=G.mode==='hard';this.hp=hd?3:4;this.n=0;this.t=this.seen?-3:-6.5;this.seen=1;this.cur=null;this.wt=1.2;this.dz=0;this.dash=0;this.rings=[];this.layer=0}};B.reset();return B}
function whNext(B){const n=B.n,d=Math.floor(Math.random()*4);let f=-1;if(n>=WH.fake()){f=(d+1+Math.floor(Math.random()*3))%4}B.cur={d,f,rp:0};whPlay(B)}
function whPlay(B){const c=B.cur;c.rp=3.2;whSnd(c.d,1);B.rings.push({d:c.d,t:0,big:1});if(c.f>=0)setTimeout(()=>{if(B.cur===c){whSnd(c.f,.3);B.rings.push({d:c.f,t:0,big:0})}},260)}
function whistleUpd(B,dt){const g=G;B.t+=dt;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;B.dz=Math.max(0,B.dz-dt);B.dash=Math.max(0,B.dash-dt);for(const r of B.rings)r.t+=dt;B.rings=B.rings.filter(r=>r.t<1.4);
  if(B.t<0)return;if(!B.cur){B.wt-=dt;if(B.wt<=0)whNext(B);return}B.cur.rp-=dt;if(B.cur.rp<=0)whPlay(B)}
function whistlePt(cx,cy){const B=G.boss;if(B.t<-3){B.t=-3;return}if(B.t<0||!B.cur||B.dz>0)return;const r=cv.getBoundingClientRect(),ux=(cx-r.left)/S-VW/2,uy=(cy-r.top)/S-(yMin+yMax)/2,d=Math.hypot(ux,uy);if(d<20)return;
  let di=0,bs=-2;WH.D.forEach((D,i)=>{const q=(ux*D[0]+uy*D[1])/d;if(q>bs){bs=q;di=i}});whistleTry(B,di)}
function whistleTry(B,di){const g=G,c=B.cur;if(!c)return;
  if(di===c.d){B.n++;B.cur=null;B.wt=G.mode==='hard'?.8:1.1;B.dash=.5;B.dd=di;g.bonus+=20;SFX.free();burst(VW/2+WH.D[di][0]*80,(yMin+yMax)/2+WH.D[di][1]*80,'#ffffff',16,1);
    if(B.n>=WH.need()){bossWin(B,'阿岚收起了哨子。雾里，她第一次开口说话');g.fish.y=(yMin+yMax)/2;g.inv=2;return}ftext(tl('钻过了一层雾！'),VW/2-70,(yMin+yMax)/2-70,'#ffffff')}
  else{B.hp--;B.dz=.7;g.flash=.4;g.shake=.3;SFX.hit();ftext(tl(c.f===di?'那是假回声！':'哨声不是从那边来的'),VW/2-90,(yMin+yMax)/2-70,'#ffb3b3');if(B.hp<=0){die('whistle');return}c.rp=1}}
function whistleHud(B,t){const g=G,cx=VW/2,cy=(yMin+yMax)/2,k=B.n/WH.need();ctx.save();
  ctx.fillStyle=`rgb(${Math.round(232-30*k)},${Math.round(236-24*k)},${Math.round(240-10*k)})`;ctx.fillRect(0,0,VW,VT);
  for(let i=0;i<9;i++){ctx.fillStyle=`rgba(255,255,255,${.35-.25*k})`;const x=((i*170+t*(20+i*4))%(VW+300))-150,y=yMin+((i*97)%(yMax-yMin));ctx.beginPath();ctx.ellipse(x,y,140,30,0,0,TAU);ctx.fill()}
  for(const r of B.rings){const D=WH.D[r.d],ex=cx+D[0]*(VW/2-10),ey=cy+D[1]*((yMax-yMin)/2-10),q=r.t/1.4;for(let i=0;i<(r.big?3:2);i++){const rr=(r.big?40:26)+q*(r.big?220:120)+i*(r.big?28:18);
      ctx.strokeStyle=r.big?`rgba(40,70,100,${.75*(1-q)})`:`rgba(90,110,130,${.3*(1-q)})`;ctx.lineWidth=r.big?5:2;ctx.beginPath();ctx.arc(ex,ey,rr,0,TAU);ctx.stroke()}}
  for(let i=0;i<4;i++){const D=WH.D[i],ax=cx+D[0]*110,ay=cy+D[1]*Math.min(110,(yMax-yMin)/2-40);ctx.save();ctx.translate(ax,ay);ctx.rotate(Math.atan2(D[1],D[0]));ctx.globalAlpha=.35;ctx.fillStyle='#34506a';ctx.beginPath();ctx.moveTo(26,0);ctx.lineTo(0,-20);ctx.lineTo(0,20);ctx.fill();ctx.restore()}
  ctx.save();const off=B.dash>0?(1-B.dash/.5)*60:0,dd=WH.D[B.dd||0];ctx.translate(cx+dd[0]*off,cy+dd[1]*off);drawFish(0,0,0,t,{s:.8,scared:B.dz>0,...skin()});ctx.restore();
  ctx.textAlign='center';ctx.fillStyle='#1b2a41';const y0=yMin+22*U;ctx.font=`${17*U}px ${FONT}`;
  if(B.t>=0){ctx.fillText(tl('哨声 '+B.n+' / '+WH.need())+'  '+'♥'.repeat(Math.max(0,B.hp)),cx,y0);ctx.fillStyle='#34506a';ctx.font=`${14*U}px ${FONT}`;ctx.fillText(tl(B.cur?(B.cur.f>=0?'有回声！点声音大、波纹深的那一边':'哨声从哪边来，就点哪边'):'听……'),cx,y0+24*U)}
  else{ctx.fillStyle='rgba(6,40,70,.66)';ctx.fillRect(0,cy-70*U,VW,140*U);ctx.fillStyle='#fff';ctx.font=`${(VW<500?14:17)*U}px ${FONT}`;
    const L2=B.t<-3?[tl('海面白茫茫一片，什么都看不见。'),tl('雾里传来一声长哨。'),tl('点屏幕跳过')]:[tl('哨声从哪边来，就点屏幕的哪一边'),tl('后面会有假回声：声音小、波纹淡'),tl(Math.ceil(-B.t)+' 秒后开始')];L2.forEach((x,i)=>ctx.fillText(x,cx,cy-28*U+i*30*U))}
  ctx.restore()}
/* ---------- 雾钟 Boss：几口钟在水下来回摇，摆到正中间时点它；五层雾，敲完一层散一层 ---------- */
const FB={L:()=>G.mode==='hard'?[3,4,5,6,7]:[2,3,3,4,5],win:()=>G.mode==='hard'?.17:.24,geo(){const y0=yMin+30,len=Math.min((yMax-yMin)*.5,260);return{y0,len}},
 pos(b,i,n){const o=FB.geo(),px=VW*(i+1)/(n+1),a=b.A*Math.sin(b.ph);return[px+Math.sin(a)*o.len,o.y0+Math.cos(a)*o.len,px,a]}};
function fogbellMk(g,hd,fin){const B={k:'fogbell',mini:1,fin,tries:0,
  reset(){const hd=G.mode==='hard';this.hp=hd?3:5;this.ly=0;this.t=this.seen?-3:-6.5;this.seen=1;this.dz=0;this.clr=0;this.nx=0;fbLayer(this)}};B.reset();return B}
function fbLayer(B){const n=FB.L()[B.ly],hd=G.mode==='hard';B.bells=Array.from({length:n},(_,i)=>({A:hd?.62:.55,w:(hd?2.6:2.1)+Math.random()*(hd?1.6:1.1),ph:Math.random()*TAU,rung:0,glow:0,bad:0}))}
function fogbellUpd(B,dt){const g=G;B.t+=dt;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;B.dz=Math.max(0,B.dz-dt);B.clr=Math.max(0,B.clr-dt);if(B.nx>0){B.nx-=dt;if(B.nx<=0)fbLayer(B)}if(B.t<0)return;
  for(const b of B.bells){if(!b.rung)b.ph+=b.w*dt;b.glow=Math.max(0,b.glow-dt);b.bad=Math.max(0,b.bad-dt)}}
function fogbellPt(cx,cy){const B=G.boss;if(B.t<-3){B.t=-3;return}if(B.t<0||B.dz>0||B.clr>0)return;const r=cv.getBoundingClientRect(),x=(cx-r.left)/S,y=(cy-r.top)/S,n=B.bells.length;
  let best=-1,bd=1e9;B.bells.forEach((b,i)=>{if(b.rung)return;const[bx,by]=FB.pos(b,i,n),d=Math.hypot(bx-x,by-y);if(d<bd){bd=d;best=i}});if(best>=0&&bd<80*Math.max(1,U*.8))fogbellTry(B,best)}
function fogbellTry(B,i){const g=G,b=B.bells[i],n=B.bells.length,[bx,by]=FB.pos(b,i,n),a=Math.sin(b.ph);
  if(Math.abs(a)<=FB.win()){b.rung=1;b.glow=1;b.ph=0;bellSnd();g.bonus+=15;burst(bx,by,'#fff8d0',16,1);
    if(B.bells.every(q=>q.rung)){B.ly++;g.bonus+=40;SFX.free();g.flash=.5;if(B.ly>=FB.L().length){bossWin(B,'雾散开了一半……第一缕太阳照在礁石上');g.fish.y=(yMin+yMax)/2;g.inv=2;return}
      B.clr=1.4;ftext(tl('散了一层雾！'),VW/2-60,(yMin+yMax)/2-60,'#ffe27a');B.nx=.7}}
  else{B.hp--;b.bad=.6;B.dz=.6;g.flash=.35;g.shake=.3;SFX.hit();ftext(tl('还没摆到正中间'),bx-60,by-60,'#ffb3b3');if(B.hp<=0){die('fogbell');return}}}
function fogbellHud(B,t){const g=G,o=FB.geo(),n=B.bells.length,k=B.ly/FB.L().length;ctx.save();
  {const gr=ctx.createLinearGradient(0,0,0,VT);gr.addColorStop(0,mixc('#8a96a2','#8ab0d8',k));gr.addColorStop(1,mixc('#2a323e','#1a2a48',k));ctx.fillStyle=gr;ctx.fillRect(0,0,VW,VT)}
  if(k>0){ctx.fillStyle=`rgba(160,110,200,${.35*k})`;for(let i=0;i<14;i++)circ((i*83)%VW,yMax-10-(i*13)%40,14+i%3*6)}
  ctx.fillStyle='#3a3e46';ctx.fillRect(0,o.y0-10,VW,10);
  B.bells.forEach((b,i)=>{const[bx,by,px,a]=FB.pos(b,i,n),inw=!b.rung&&Math.abs(Math.sin(b.ph))<=FB.win();
    ctx.strokeStyle='rgba(255,226,140,.5)';ctx.lineWidth=2;ctx.setLineDash([4,6]);ctx.beginPath();ctx.moveTo(px,o.y0);ctx.lineTo(px,o.y0+o.len+40);ctx.stroke();ctx.setLineDash([]);
    ctx.strokeStyle='#5a5448';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(px,o.y0);ctx.lineTo(bx,by-30);ctx.stroke();
    ctx.save();ctx.translate(bx,by);ctx.rotate(-a);if(b.rung||b.glow){ctx.shadowColor='#ffe27a';ctx.shadowBlur=30}else if(inw&&G.mode==='simple'){ctx.shadowColor='#9ff0ff';ctx.shadowBlur=22}
    ctx.fillStyle=b.bad>0?'#a85a4a':b.rung?'#c8a050':'#7a6a3a';ctx.beginPath();ctx.moveTo(-34,22);ctx.quadraticCurveTo(-30,-26,0,-32);ctx.quadraticCurveTo(30,-26,34,22);ctx.closePath();ctx.fill();ctx.shadowBlur=0;
    ctx.fillStyle='#5a4e2a';ctx.fillRect(-38,18,76,7);ctx.strokeStyle='#d8c48a';ctx.lineWidth=2;ctx.beginPath();ctx.arc(0,-4,10,0,TAU);ctx.stroke();ctx.restore();
    ctx.fillStyle='#ffd870';ctx.beginPath();ctx.moveTo(px,o.y0+o.len+44);ctx.lineTo(px-7,o.y0+o.len+56);ctx.lineTo(px+7,o.y0+o.len+56);ctx.fill()});
  const fl=FB.L().length-B.ly;for(let i=0;i<fl;i++){ctx.fillStyle=`rgba(225,230,236,${.12+.03*i})`;ctx.fillRect(0,0,VW,VT)}
  ctx.textAlign='center';const cx=VW/2,cy=(yMin+yMax)/2,y0=yMax-30*U;ctx.font=`${17*U}px ${FONT}`;ctx.fillStyle='#fff';ctx.lineWidth=4*U;ctx.strokeStyle='rgba(6,40,70,.7)';
  if(B.t>=0&&B.ly<FB.L().length){const s1=tl('第 '+(B.ly+1)+' / '+FB.L().length+' 层雾 · '+n+' 口钟')+'  '+'♥'.repeat(Math.max(0,B.hp)),s2=tl('等钟摆到正中间（金色记号）再点');ctx.strokeText(s1,cx,y0-24*U);ctx.fillText(s1,cx,y0-24*U);ctx.fillStyle='#ffe27a';ctx.strokeText(s2,cx,y0);ctx.fillText(s2,cx,y0)}
  if(B.t<0){ctx.fillStyle='rgba(6,40,70,.66)';ctx.fillRect(0,cy-70*U,VW,140*U);ctx.fillStyle='#fff';ctx.font=`${(VW<500?14:17)*U}px ${FONT}`;
    const L2=B.t<-3?[tl('雾心的水底下，挂着几口很老的钟。'),tl('阿岚游到你身边，比了一个“敲”的手势。'),tl('点屏幕跳过')]:[tl('钟摆到正中间的时候点它'),tl('一层的钟全敲响，雾就散一层'),tl(Math.ceil(-B.t)+' 秒后开始')];L2.forEach((x,i)=>ctx.fillText(x,cx,cy-28*U+i*30*U))}
  ctx.restore()}
function v3MiniPt(cx,cy){const B=G.boss;if(B.k==='whistle'){whistlePt(cx,cy);return 1}if(B.k==='fogbell'){fogbellPt(cx,cy);return 1}return 0}
