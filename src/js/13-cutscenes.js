/* ---------- pixel cutscenes ---------- */
const pcv=document.createElement('canvas'),px=pcv.getContext('2d');let CW=98,CH2=195,cutT=0,cutCur='',cutFade=0;
const R=(x,y,w,h,c)=>{px.fillStyle=c;px.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const El=(cx,cy,rx,ry,c)=>{px.fillStyle=c;cx=Math.round(cx);cy=Math.round(cy);for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(y*y)/(ry*ry+.3))));px.fillRect(cx-w,cy+y,w*2+1,1)}};
const hx=c=>[1,3,5].map(i=>parseInt(c.slice(i,i+2),16)),mixc=(a,b,t)=>{const A=hx(a),B=hx(b);return'#'+A.map((v,i)=>Math.round(v+(B[i]-v)*t).toString(16).padStart(2,'0')).join('')};
const HT=["....HHHH....","...HHHHHH...","..HHHHHHHH..","..HSSSSSSH..","..SSKSSKSS..","..SSSSSSSS..","...SSDDSS...","....TTTT....","..TTTTTTTT..",".ATTTTTTTTA.",".ATTTTTTTTA.",".S.TTTTTT.S.","...LLLLLL...","...LL..LL...","...LL..LL...","..FFF..FFF.."];
const PEOPLE={kid:{H:'#5a3a22',T:'#ff9f1c',L:'#3f6fb0',D:'#ffd9b3',pend:1},achao:{H:'#e8e2d0',T:'#3f7f9a',L:'#5a4a3a',D:'#f4f4f4',hat:'#d9b45a'},
 xiaoman:{H:'#6a3a2a',T:'#f7f7f7',L:'#c9608a',D:'#ffd9b3',hat:'#ffffff',pony:1},haisheng:{H:'#2c2c3a',T:'#27406e',L:'#1f2c44',D:'#ffd9b3',hat:'#f4f4f4'},doctor:{H:'#f1f1f1',T:'#f7f7f7',L:'#4a5a6a',D:'#f1f1f1'},achen:{H:'#d9d2e8',T:'#c9a85a',L:'#5a4a8a',D:'#ffd9b3'},gran:{H:'#e8e2d0',T:'#9a6ad6',L:'#5a4a6a',D:'#ffd9b3'}};
function human(k,x,y,flip){const P=typeof k==='string'?PEOPLE[k]:k;x=Math.round(x-6);y=Math.round(y-16);
  for(let r=0;r<16;r++)for(let c=0;c<12;c++){const ch=HT[r][flip?11-c:c];if(ch==='.')continue;
    let col=ch==='H'?P.H:ch==='S'||ch==='A'?'#ffd9b3':ch==='K'?'#1b2a41':ch==='T'?P.T:ch==='L'?P.L:ch==='F'?'#3a2a20':P.D;if(P.hat&&r<2)col=P.hat;R(x+c,y+r,1,1,col)}
  if(P.hat)R(x+1,y+2,10,1,mixc(P.hat,'#000000',.2));if(P.pony){const hx=flip?x+10:x+1;R(hx,y+3,1,7,P.H);R(flip?hx+1:hx-1,y+5,1,5,P.H);R(hx,y+3,1,1,'#ff7aa8')}if(P.pend){R(x+5,y+8,2,1,'#fff27a');R(x+5,y+9,2,1,'#f0b400')}}
const SPR={
 heart(x,y,f,t){const p=Math.sin(t*3)>0?1:0;El(x,y,5+p,5+p,'rgba(159,240,255,.35)');El(x,y,4,4,'#9ff0ff');El(x,y,2,2,'#ffffff')},
 cage(x,y,f,t){SPR.heart(x,y,f,t);R(x-8,y-9,17,1,'#c9a85a');R(x-8,y+8,17,2,'#c9a85a');for(let i=0;i<5;i++)R(x-8+i*4,y-8,1,16,'#8a6f3a');R(x-2,y+10,5,3,'#8a6f3a')},
 granny(x,y,f,t){const d=f?-1:1,w=Math.sin(t*4)>0?1:0;R(x-d*8-(d<0?2:0),y+6+w,3,5,'#2bb5a0');El(x-d*3,y+5,5,3,'#2bb5a0');El(x,y+1,4,4,'#9a6ad6');El(x,y-5,4,4,'#ffd9b3');R(x-4,y-9,9,3,'#e8e2d0');El(x-d*4,y-9,2,2,'#e8e2d0');R(x+d*1-(d<0?1:0),y-5,1,1,'#1b2a41');R(x+d*3-(d<0?1:0),y-5,1,1,'#1b2a41');R(x-1,y,3,2,'#fff27a')},
 crab(x,y,f,t){const w=Math.sin(t*5)>0?1:0;for(const d of[-1,1]){R(x+d*9-(d<0?1:0),y-6-w,2,4,'#e0784a');R(x+d*10-(d<0?2:0),y-9-w,3,3,'#ff9f6b');for(let i=0;i<3;i++)R(x+d*(5+i*2)-(d<0?1:0),y+3+(i+w)%2,2,2,'#c9603a')}
   El(x,y,7,4,'#9fb3a0');El(x,y-2,6,4,'#b9ccba');R(x-3,y-4,2,1,'#6f8a7a');R(x+1,y-2,2,1,'#6f8a7a');R(x-4,y+2,9,2,'#e0784a');R(x-3,y-8,1,3,'#e0784a');R(x+2,y-8,1,3,'#e0784a');R(x-4,y-9,2,2,'#ffffff');R(x+2,y-9,2,2,'#ffffff');R(x-3,y-8,1,1,'#1b2a41');R(x+3,y-8,1,1,'#1b2a41')},
 fish(x,y,f,t){const d=f?-1:1,w=Math.sin(t*9)>0?1:0;R(x-d*9-(d<0?1:0),y-3+w,2,6-w,'#ff7f1f');R(x-d*7-(d<0?0:0),y-2,1,4,'#ff7f1f');El(x,y,6,4,'#ffa01f');R(x-3,y+2,6,1,'#ffd36b');R(x-1,y-5,3,1,'#ff7f1f');
   R(x+d*3-(d<0?1:0),y-2,2,2,'#ffffff');R(x+d*4-(d<0?0:0),y-1,1,1,'#1b2a41')},
 turtle(x,y,f,t){const d=f?-1:1,w=Math.sin(t*4)>0?1:0;R(x-5,y+3+w,3,2,'#8fe09a');R(x+3,y+3+(1-w),3,2,'#8fe09a');El(x+d*9,y-1,2,2,'#8fe09a');R(x+d*10,y-2,1,1,'#1b2a41');
   El(x,y,7,4,'#3f9a55');R(x-4,y-3,8,1,'#5fc070');R(x-2,y-1,1,3,'#2c7440');R(x+2,y-1,1,3,'#2c7440')},
 octo(x,y,f,t){for(let i=0;i<5;i++){const w=Math.round(Math.sin(t*4+i)*1);R(x-6+i*3+w,y+2,2,5,'#9a6ad6');R(x-6+i*3+w*2,y+7,2,2,'#7d4fbf')}El(x,y-3,6,5,'#b57af2');R(x-3,y-7,3,1,'#d9bdfa');
   R(x-4,y-3,2,2,'#ffffff');R(x+2,y-3,2,2,'#ffffff');R(x-3+(f?-1:0),y-2,1,1,'#1b2a41');R(x+3+(f?-1:0),y-2,1,1,'#1b2a41')},
 whale(x,y,f,t){const d=f?-1:1,w=Math.sin(t*2)>0?1:0;R(x-d*22-(d<0?3:0),y-6+w,4,4,'#3f6aa8');R(x-d*22-(d<0?3:0),y+1+w,4,3,'#3f6aa8');R(x-d*19-(d<0?2:0),y-2,3,4,'#3f6aa8');
   El(x,y,18,8,'#4a78b8');El(x+d*2,y+5,14,3,'#cfe4f7');R(x+d*11-(d<0?1:0),y-3,2,2,'#ffffff');R(x+d*12-(d<0?0:0),y-2,1,1,'#1b2a41');R(x+d*10-(d<0?2:0),y-5,3,1,'#cfe4f7');
   if(Math.sin(t*1.5)>.3){R(x+d*4,y-12,1,3,'#dff4ff');R(x+d*3,y-13,3,1,'#dff4ff')}},
 shark(x,y,f,t){const d=f?-1:1,w=Math.sin(t*6)>0?1:0;R(x-d*18-(d<0?2:0),y-5+w,3,10-w,'#5f7fa3');R(x-d*16-(d<0?1:0),y-2,2,4,'#5f7fa3');El(x,y,15,5,'#7399c0');El(x+d*2,y+3,11,2,'#eef6fb');
   for(let i=0;i<5;i++)R(x-d*2+i-2,y-6-i,5-i,1,'#5f7fa3');R(x+d*9-(d<0?4:0),y+1,5,2,'#b3263a');for(let i=0;i<3;i++)R(x+d*9+(i*2-2)*1,y+1,1,1,'#ffffff');
   R(x+d*8-(d<0?1:0),y-3,2,2,'#ffffff');R(x+d*9-(d<0?0:0),y-2,1,1,'#1b2a41')},
 ship(x,y,f,t){const b=Math.round(Math.sin(t*1.5)*1);y+=b;for(let i=0;i<5;i++)R(x-20+i,y-5+i,40-i*2,1,'#5f7080');R(x-20,y-6,40,1,'#3d4a58');R(x-8,y-14,14,8,'#f1f1f1');R(x-6,y-12,3,3,'#3fa9d8');R(x,y-12,3,3,'#3fa9d8');
   R(x+8,y-19,4,13,'#b3263a');R(x+8,y-19,4,2,'#3d4a58');R(x-18,y-16,1,10,'#3d4a58');for(let i=0;i<7;i++){R(x-19+i*2-14,y-1,1,9,'#f5e6c0')}for(let j=0;j<4;j++)R(x-33,y+j*2+1,14,1,'#f5e6c0')},
 letter(x,y,f,t){R(x-5,y-7,10,7,'#ffffff');R(x-5,y-7,10,1,'#d9d2c0');R(x-3,y-5,6,1,'#9aa8b5');R(x-3,y-3,5,1,'#9aa8b5');R(x+2,y-2,2,2,'#e0503f')},
 pendant(x,y,f,t){El(x,y,3,2,'#fff27a');R(x-1,y-4,2,2,'#f0b400');R(x-2,y,1,2,'#f0b400');R(x+1,y,1,2,'#f0b400');if(Math.sin(t*6)>0){R(x-6,y-5,1,1,'#ffffff');R(x+5,y+3,1,1,'#ffffff');R(x+6,y-3,1,1,'#ffffff')}},
 dish(x,y,f,t){R(x-5,y-2,10,2,'#ffffff');R(x-3,y-4,6,2,'#ff9a6a');R(x-1,y-5,3,1,'#ffd36b');if(Math.sin(t*3)>0)R(x,y-8,1,2,'#ffffff');else R(x+1,y-9,1,2,'#ffffff')},
 book(x,y,f,t){R(x-5,y-6,10,6,'#8a5a2b');R(x-4,y-5,8,4,'#fff3d6');R(x,y-5,1,4,'#8a5a2b')}};
const WHO={'大白':['shark'],'阿强':['aqiang'],'阿澄':['achen'],'奶奶':['granny','gran'],'石蟹':['crab'],'老船医':['doctor'],'小鱼':['kid','fish'],'阿潮':['achao'],'阿珍':['xiaoman'],'海生':['haisheng'],'老龟':['turtle'],'墨墨':['octo'],'鲸婆婆':['whale'],'奶奶的信':['letter']};
const SCN={dQiang:{bg:'diner',cast:[['kid',.26,'g'],['aqiang',.56,'g',1]]},dCrew:{bg:'diner',cast:[['kid',.2,'g'],['xiaoman',.42,'g',1],['aqiang',.62,'g',1]]},nShore:{bg:'shore',night:1,cast:[['gran',.42,'g']]},nShore2:{bg:'shore',night:1,cast:[['gran',.2,'w']]},nGlow:{bg:'shore',night:1,glow:1,cast:[]},dAchao0:{bg:'diner',cast:[['kid',.26,'g'],['achao',.52,'g',1]]},shPend:{bg:'shore',cast:[['kid',.56,'g'],['pendant',.3,'g']]},
 s7:{bg:'sea',i:7,cast:[['fish',.3,.3]]},s7octo:{bg:'sea',i:7,cast:[['fish',.27,.3],['octo',.7,.31,1]]},s7cage:{bg:'sea',i:7,cast:[['fish',.25,.32],['cage',.66,.3]]},
 shHai:{bg:'shore',cast:[['kid',.3,'g'],['haisheng',.52,'g',1],['ship',.3,'h']]},s8:{bg:'sea',i:8,cast:[['fish',.3,.3]]},s8ship:{bg:'sea',i:8,cast:[['ship',.6,.1],['cage',.62,.36],['fish',.22,.34]]},
 s9:{bg:'sea',i:9,cast:[['fish',.3,.3]]},s9achen:{bg:'sea',i:9,cast:[['fish',.25,.3],['achen',.66,'g',1]]},s10:{bg:'sea',i:10,cast:[['fish',.34,.3],['heart',.2,.3]]},s10gran:{bg:'sea',i:10,cast:[['fish',.24,.32],['granny',.62,.3,1],['heart',.82,.24]]},
 s11:{bg:'sea',i:11,cast:[['fish',.2,.34],['turtle',.42,.42,0],['whale',.68,.2,1],['shark',.72,.42,1]]},shAchen:{bg:'shore',dusk:1,cast:[['kid',.3,'g'],['achen',.55,'g',1]]},s6crab:{bg:'sea',i:6,cast:[['fish',.27,.3],['crab',.7,.5]]},s6mural:{bg:'sea',i:6,mural:1,cast:[['fish',.22,.34]]},dGuest:{bg:'diner',cast:[['kid',.26,'g'],['doctor',.52,'g',1]]},dGuest2:{bg:'diner',cast:[['kid',.26,'g'],['doctor',.52,'g',1],['dish',.78,'c']]},s5cave:{bg:'sea',i:5,cast:[['fish',.3,.3]]},s5octo:{bg:'sea',i:5,cast:[['fish',.27,.3],['octo',.7,.31,1]]},s5ok:{bg:'sea',i:5,cast:[['fish',.3,.3],['pendant',.62,.22]]},
 shore:{bg:'shore',cast:[['kid',.38,'g']]},dLetter:{bg:'diner',cast:[['kid',.28,'g'],['letter',.7,'c']]},
 s0fish:{bg:'sea',i:0,fd:1,cast:[['fish',.5,.3],['pendant',.5,.2]]},s0turtle:{bg:'sea',i:0,fd:1,cast:[['fish',.27,.3],['turtle',.72,.34,1]]},
 dAchao:{bg:'diner',cast:[['kid',.26,'g'],['achao',.52,'g',1],['dish',.78,'c']]},s0ok:{bg:'sea',i:0,cast:[['turtle',.6,.3,1]]},
 dKid:{bg:'diner',cast:[['kid',.36,'g'],['book',.72,'c']]},s1octo:{bg:'sea',i:1,fd:1,cast:[['fish',.25,.3],['octo',.72,.31,1]]},s1octo2:{bg:'sea',i:1,cast:[['fish',.25,.3],['octo',.6,.31,1],['dish',.42,.33]]},
 dMan:{bg:'diner',cast:[['kid',.26,'g'],['xiaoman',.52,'g',1]]},s1ok:{bg:'sea',i:1,cast:[['octo',.7,.33,1]]},
 s2turtle:{bg:'sea',i:2,fd:1,cast:[['fish',.27,.3],['turtle',.72,.34,1]]},s2ok:{bg:'sea',i:2,cast:[['shark',.72,.2,1]]},
 s3whale:{bg:'sea',i:3,fd:1,cast:[['fish',.18,.36],['whale',.66,.25,1]]},ice:{bg:'shore',ice:1,cast:[['ship',.58,'h'],['haisheng',.4,'d']]},
 shAchao:{bg:'shore',cast:[['kid',.24,'g'],['achao',.46,'g'],['ship',.3,'h']]},shOk:{bg:'shore',cast:[['achao',.3,'g'],['xiaoman',.5,'g',1]]},
 s4turtle:{bg:'sea',i:4,fd:1,cast:[['fish',.27,.3],['turtle',.72,.34,1]]},s4shark:{bg:'sea',i:4,fd:1,cast:[['fish',.24,.32],['shark',.7,.28,1]]},
 s4dish:{bg:'sea',i:4,fd:1,cast:[['fish',.24,.32],['dish',.44,.33],['shark',.7,.28,1]]},
 shEnd:{bg:'shore',dusk:1,cast:[['kid',.16,'g'],['achao',.36,'g'],['haisheng',.56,'g',1],['xiaoman',.8,'g',1]]},s4ok:{bg:'sea',i:4,cast:[['shark',.3,.22],['turtle',.7,.34,1],['whale',.6,.12,1]]}};
function bgShore(t,gy,hy,o){
  if(o.deck){deckScene(t,gy,hy,o);return}
  const sky=o.dusk?['#ff9f6b','#ffe0a0']:o.ice?['#b8d8ec','#eef8ff']:['#7fcbff','#dff4ff'];for(let i=0;i<6;i++)R(0,Math.floor(hy*i/6),CW,Math.ceil(hy/6)+1,mixc(sky[0],sky[1],i/5));
  El(CW*(o.dusk?.78:.2),hy*(o.dusk?.8:.4),5,5,o.dusk?'#ff6b4a':'#fff27a');
  for(let i=0;i<3;i++){const cx=((i*47+t*2.5)%(CW+30))-15,cy=hy*(.2+i*.22);El(cx,cy,6,2,'#ffffff');El(cx+4,cy-1,4,2,'#ffffff')}
  const sea=o.dusk?['#c9668a','#7a4a9a']:o.ice?['#8fc4e0','#5f9cc4']:['#3fa9d8','#2f8fc4'];R(0,hy,CW,gy-hy,sea[0]);R(0,hy+Math.floor((gy-hy)/2),CW,gy-hy,sea[1]);
  for(let i=0;i<9;i++){const y=hy+1+(i*5)%(gy-hy-1),x=((i*23+t*(4+i%3))%(CW+8))-4;R(x,y,4,1,'#bfe6ff')}
  if(o.ice){for(let i=0;i<5;i++){const x=((i*29-t*1.5)%(CW+20)+CW+20)%(CW+20)-10;R(x,hy+3+(i*7)%(gy-hy-6),8+i%3*3,2,'#ffffff')}R(0,gy,CW,CH2-gy,'#e6f4fb');R(0,gy,CW,2,'#ffffff');return}
  R(0,gy,CW,CH2-gy,o.dusk?'#e0b080':'#f3d9a0');R(0,gy,CW,1,'#fff3d6');for(let i=0;i<14;i++)R((i*37)%CW,gy+3+(i*11)%30,2,1,'#d9b98a');
  if(o.atoll){atollShore(t,gy,hy,o);return}
  for(let i=0;i<3;i++){R(4+i*6,hy+4,1,gy-hy-2,'#6b4226')}R(2,hy+4,18,2,'#8a5a2b');
  const hxp=Math.round(CW*.74);R(hxp-11,gy-15,23,15,'#fff3d6');for(let i=0;i<6;i++)R(hxp-13+i*2,gy-16-i,27-i*4,1,'#e0503f');R(hxp-3,gy-9,6,9,'#8a5a2b');R(hxp+5,gy-11,5,4,'#7fcbff');R(hxp-10,gy-11,5,4,'#7fcbff');
  R(hxp-6,gy-22,13,5,'#27406e');R(hxp-3,gy-21,5,3,'#ffa01f');R(hxp-5,gy-20,2,1,'#ffa01f');R(hxp+3,gy-20,1,1,'#ffffff')}
function bgDiner(t,gy){
  R(0,0,CW,gy,'#f6e7c4');R(0,gy-12,CW,12,'#d9b98a');R(0,gy-12,CW,1,'#b8935e');R(0,gy,CW,CH2-gy,'#b07a44');for(let i=0;i<8;i++)R(0,gy+6+i*9,CW,1,'#8f5f33');
  R(7,12,30,20,'#8a5a2b');R(9,14,26,16,'#7fcbff');R(9,23,26,7,'#3fa9d8');R(21,14,1,16,'#8a5a2b');for(let i=0;i<3;i++)R(((i*11+t*3)%22)+10,25+i,3,1,'#bfe6ff');
  const sw=Math.round(Math.sin(t*1.2)*2),lx=Math.round(CW*.5);R(lx,0,1,9,'#5a4a3a');R(lx-4+sw,9,9,3,'#ffd23f');R(lx-2+sw,12,5,1,'#fff27a');
  const cx=Math.round(CW*.58);R(cx,gy-10,CW-cx,10,'#8a5a2b');R(cx,gy-10,CW-cx,2,'#b07a44');
  R(cx+4,10,CW-cx-8,2,'#8a5a2b');for(let i=0;i<4;i++)R(cx+7+i*7,4,3,6,['#4fc98a','#e0503f','#ffd23f','#3fa9d8'][i])}
function bgSea(t,gy,o){
  const T=TH[o.i],c=x=>o.fd?mixc(x,'#8f9aa3',.5):x,fl=Math.round(gy*1.12);
  for(let i=0;i<8;i++)R(0,Math.floor(fl*i/8),CW,Math.ceil(fl/8)+1,c(mixc(T.top,T.bot,i/7)));
  if(o.i<2||o.i===4)for(let i=0;i<3;i++){const x=(i*37+10)%CW;for(let y=0;y<fl;y+=2)R(x-y*.35+Math.sin(t+i)*2,y,3,1,'rgba(255,255,255,.07)')}
  for(let x=0;x<CW;x++){const h=Math.round(8+Math.sin(x*.11)*4+Math.sin(x*.31+2)*3);R(x,fl-h,1,h,c(T.far))}
  for(let x=0;x<CW;x++){const h=Math.round(4+Math.sin(x*.17+1)*2+Math.sin(x*.4)*2);R(x,fl-h,1,h,c(T.mid))}
  R(0,fl,CW,CH2-fl,c(T.sand));R(0,fl,CW,1,c(mixc(T.sand,'#ffffff',.4)));
  if(o.i===0||o.i===4)for(let i=0;i<5;i++){const x=6+i*((CW-12)/4),col=c(o.i===4?'#f4bb3a':['#ff8f80','#ff7fb0','#ffb24d'][i%3]);R(x,fl-7,2,7,col);R(x-3,fl-5,2,5,col);R(x+3,fl-6,2,6,col);R(x-3,fl-2,8,2,col)}
  if(o.i===1){const x=Math.round(CW*.42);for(let i=0;i<7;i++)R(x-16+i,fl-9+i,34-i*2,1,c('#7d5229'));R(x-16,fl-10,34,1,c('#5a3a1a'));R(x-2,fl-26,2,17,c('#5a3a1a'));R(x-9,fl-22,16,2,c('#5a3a1a'));R(x+6,fl-7,3,3,c('#2a1a0a'))}
  if(o.i===2)for(let i=0;i<(o.fd?5:14);i++)if(Math.sin(t*2+i*1.7)>-.2)R((i*29)%CW,(i*17)%fl,1,1,'#8ff0ff');
  if(o.i===5){for(let i=0;i<7;i++){const x=i*(CW/6),h=8+(i*7)%12;for(let j=0;j<h;j++)R(x-(h-j)/3,j,(h-j)/1.5,1,'#6a649c')}for(let i=0;i<8;i++)if(Math.sin(t*2+i*1.9)>-.3)R((i*23+9)%CW,6+(i*13)%(fl-10),1,1,i%2?'#bfe6ff':'#9fffc0');for(let y=0;y<fl;y+=1)R(0,y,CW,1,`rgba(6,6,22,${.25+.25*y/fl})`)}
  if(o.i===7)for(let i=0;i<6;i++){const x=Math.round(4+i*(CW-8)/5),sw=Math.round(Math.sin(t*1.2+i)*2);for(let y=2;y<fl;y+=2)R(x+Math.round(sw*(1-y/fl)),y,2,2,c(i%2?'#2f8a5f':'#3fa870'))}
  if(o.i===9)for(let i=0;i<5;i++){const x=Math.round(3+i*(CW-10)/4),h=Math.round(fl*.5+(i*7)%10);R(x,fl-h,6,h,'#5a4a8a');for(let y=fl-h+2;y<fl-2;y+=4)if(Math.sin(t*2+i+y)>-.6)R(x+2,y,2,2,'#ffe08a')}
  if(o.i===10){El(CW/2,fl*.45,Math.round(CW*.3),Math.round(fl*.3),'rgba(159,240,255,.12)')}
  if(o.i===6){for(let i=0;i<4;i++){const x=Math.round(6+i*(CW-14)/3),h=fl-10-(i%2)*8;R(x,fl-h,5,h,'#5f8a80');R(x-1,fl-h,7,2,'#7fa89c');R(x-1,fl-3,7,3,'#7fa89c')}
    if(o.mural){const mx=Math.round(CW*.42),my=Math.round(fl*.3),mw=Math.round(CW*.5),mh=Math.round(fl*.4);R(mx,my,mw,mh,'#b9ccba');R(mx,my,mw,1,'#7f9a8a');R(mx,my+mh-1,mw,1,'#7f9a8a');['#ff8f80','#b07a44','#666cc0','#bfe6ff','#f4bb3a'].forEach((c,k)=>{const cx=mx+3+k*((mw-7)/4),cy=my+mh/2+(k%2?3:-3);El(cx,cy,3,2,'#3a7f78');if(Math.sin(t*3+k)>-.5)R(cx,cy-1,1,2,c)})}}
  if(o.i===3)for(let i=0;i<7;i++){const x=i*(CW/6),h=6+(i*5)%9;for(let j=0;j<h;j++)R(x-(h-j)/2,j,h-j,1,'#ffffff')}
  if(o.i===4&&o.fd){const x=Math.round(CW*.88);R(x,0,4,fl,Math.sin(t*8)>0?'#fff27a':'#ffd23f');R(x+1,0,2,fl,'#ffffff')}
  for(let i=0;i<7;i++){const x=(i*31+7)%CW,y=fl-((t*(7+i%3*2)+i*23)%fl);R(x,y,2,1,'rgba(255,255,255,.55)');R(x,y+2,2,1,'rgba(255,255,255,.55)');R(x-1,y+1,1,1,'rgba(255,255,255,.55)');R(x+2,y+1,1,1,'rgba(255,255,255,.55)')}}
function drawCut(dt){
  const q=stQ,ln=q.lines[q.i];cutT+=dt;const t=cutT,id=ln[2]||'shore',sc=SCN[id]||SCN.shore;if(id!==cutCur){cutCur=id;cutFade=1}cutFade=Math.max(0,cutFade-dt*3);
  if(q.n<ln[1].length){q.n=Math.min(ln[1].length,q.n+dt*(TSPD[ln[0]]||26)*({en:2.4,ru:2.4,ar:2.2,ja:1.4,it:2.4,de:2.4,es:2.4,fr:2.4,ko:1.6,th:2.2}[SAVE.lang]||1));const k=Math.floor(q.n);if(k!==q.k){q.k=k;$('stText').textContent=ln[1].slice(0,k);const vo=VOICE[ln[0]];if(vo&&k%2===0)snd(vo[0]*(.94+Math.random()*.12),.045,vo[1],.03)}}
  ambSet(sc.stars?{wave:.06,wind:.01}:sc.night?{rain:.07,wind:.07,wave:.05}:sc.bg==='shore'?{wave:.06,wind:.012}:sc.bg==='sea'?{deep:.14}:{},t);
  const ps=Math.max(2,Math.ceil(Math.max(W,H)/150));CW=Math.ceil(W/ps);CH2=Math.ceil(H/ps);if(pcv.width!==CW||pcv.height!==CH2){pcv.width=CW;pcv.height=CH2}
  const cr=$('sStory').querySelector('.card').getBoundingClientRect(),gy=Math.round(Math.min(CH2*.6,Math.max(22,(cr.top-cv.getBoundingClientRect().top)/ps-9))),hy=Math.round(gy*.66);
  if(sc.bg==='shore')bgShore(t,gy,hy,sc);else if(sc.bg==='diner')bgDiner(t,gy);else bgSea(t,gy,sc);
  const sp=WHO[ln[0]]||[],fxo=ln[3]||{};q.lt=(q.lt||0)+dt;let spk=null;
  if(fxo.shake&&q.lt<.45){px.save();px.translate(Math.round((Math.random()-.5)*4),Math.round((Math.random()-.5)*3))}
  (sc.cast||[]).forEach((a,i)=>{const[k,xf,yf,fl]=a,isSp=sp.includes(k),talk=isSp&&q.n<ln[1].length;let x=Math.round(CW*xf),y;
    if(PEOPLE[k]){y=yf==='d'?hy-2:yf==='w'?gy-5:gy+5;if(isSp&&!spk)spk=[k,x,y-18,fl];human(k,x,y-(talk&&Math.sin(t*14)>0?1:0),fl);if(yf==='w')R(x-8,gy-9,16,4,'#2f8fc4')}
    else{y=yf==='g'?gy:yf==='c'?gy-10:yf==='h'?hy+3:Math.round(gy*2*yf);if(typeof yf==='number'&&k!=='pendant')y+=Math.round(Math.sin(t*2+i*2)*1.5);if(talk)y-=Math.sin(t*14)>0?1:0;if(isSp&&!spk)spk=[k,x,y-(k==='whale'?12:k==='shark'?9:9),fl];SPR[k](x,y,fl,t)}});
  if(fxo.shake&&q.lt<.45)px.restore();
  if(sc.night){px.fillStyle='rgba(8,14,44,.62)';px.fillRect(0,0,CW,CH2);const hxp=Math.round(CW*.74);if(sc.atoll)lhLamps(t,hy,sc);if(sc.stars)for(let i=0;i<22;i++){const sx=(i*37+11)%CW,sy=(i*19+5)%Math.max(4,hy-2);R(sx,sy,1,1,Math.sin(t*2+i)>.6?'#ffffff':'#bcd0ff')}else if(!sc.atoll){R(hxp+5,gy-11,5,4,'#ffe27a');R(hxp-10,gy-11,5,4,'#ffe27a')}if(!sc.stars)for(let i=0;i<26;i++){const rx=((i*37+t*90)%(CW+20))-10,ry=((i*53+t*160)%CH2);R(rx,ry,1,3,'rgba(200,220,255,.5)')}
    if(sc.glow){const gx=Math.round(CW*.3),gy2=Math.round((hy+gy)/2),p=Math.round(Math.sin(t*3)*1);El(gx,gy2,9+p,3+p,'rgba(159,240,255,.35)');El(gx,gy2,5,2,'#9ff0ff');El(gx,gy2,2,1,'#ffffff')}
    if(!sc.stars&&Math.sin(t*1.7)>.985){R(0,0,CW,CH2,'rgba(255,255,255,.5)');if(!q.th){q.th=1;CSND.thunder()}}else q.th=0}
  if(spk&&fxo.em&&q.lt>.05){const bob=q.lt<.3?Math.round((.3-q.lt)*10):0,ex=spk[1]+7,ey=spk[2]-6-bob;R(ex-4,ey-5,9,9,'#ffffff');R(ex-5,ey-4,11,7,'#ffffff');R(ex-2,ey+4,2,2,'#ffffff');
    const c=fxo.em;if(c==='!'){R(ex,ey-3,1,4,'#e0503f');R(ex,ey+2,1,1,'#e0503f')}else if(c==='?'){R(ex-1,ey-3,3,1,'#3f8fd0');R(ex+1,ey-2,1,2,'#3f8fd0');R(ex,ey,1,1,'#3f8fd0');R(ex,ey+2,1,1,'#3f8fd0')}else{R(ex-3,ey,1,1,'#5f7080');R(ex,ey,1,1,'#5f7080');R(ex+3,ey,1,1,'#5f7080')}}
  if(spk&&fxo.cut){const k=spk[0],e=Math.min(1,q.lt/.22),bh=Math.round(gy*.42),by=Math.round(CH2*.07),ox=Math.round((1-e)*-CW);R(ox,by,CW,bh,'#1b2a41');R(ox,by,CW,1,'#ffd23f');R(ox,by+bh-1,CW,1,'#ffd23f');for(let i=0;i<7;i++)R(ox+((i*29+t*140)%CW),by+3+i*Math.floor((bh-6)/7),10,1,'rgba(255,255,255,.25)');
    px.save();px.beginPath();px.rect(ox,by+1,CW,bh-2);px.clip();px.translate(ox+Math.round(CW*.3),by+bh-2);const z=PEOPLE[k]?Math.max(2,Math.floor((bh-4)/9)):Math.max(2,Math.floor(bh/14));px.scale(z,z);if(PEOPLE[k]){px.beginPath();px.rect(-8,-(bh-3)/z,16,(bh-3)/z);px.clip();human(k,0,7,0)}else SPR[k](0,-Math.round(bh/z/2)+1,0,t);px.restore()}
  if(fxo.shock){const cx=Math.round(CW/2),cy=Math.round(gy*.52),jx=Math.round((Math.random()-.5)*3),jy=Math.round((Math.random()-.5)*3);R(0,0,CW,CH2,'#140a2e');
    for(let i=0;i<90;i++){const a=i*.42+t*5,r=3+i*1.05;R(cx+Math.cos(a)*r,cy+Math.sin(a)*r*.8,2,2,['#5a3ad0','#b03ad0','#3a7ad0','#ffffff'][i%4])}
    for(let i=0;i<10;i++){const a=i*Math.PI/5+t*1.5;for(let k=0;k<5;k++)R(cx+Math.cos(a)*(34+k*4),cy+Math.sin(a)*(28+k*3),1,1,'#ffe27a')}
    const x=cx+jx,y=cy+jy;R(x-27,y-8,6,16,'#ff7a1a');R(x-23,y-5,5,10,'#ff7a1a');El(x,y,21,15,'#ff9f1c');R(x-12,y+10,24,3,'#ffd9a0');R(x-3,y-18,8,4,'#ff7a1a');
    const ex=Math.round((Math.random()-.5)*2),ey=Math.round((Math.random()-.5)*2);El(x+4,y-5,6,6,'#ffffff');El(x+15,y-5,5,6,'#ffffff');R(x+4+ex,y-5+ey,2,2,'#1b2a41');R(x+15+ex,y-5+ey,2,2,'#1b2a41');
    El(x+12,y+7,5,6,'#5a1a1a');R(x+10,y+9,5,3,'#ff7a8a');R(x-8,y-15,1,3,'#9fd8ff');R(x-13,y-11,1,3,'#9fd8ff');R(x+22,y-14,1,4,'#9fd8ff');
    if(Math.sin(t*20)>0){R(x+19,y-17,1,5,'#ffffff');R(x+23,y-12,4,1,'#ffffff')}}
  if(fxo.flash&&q.lt<.5){px.fillStyle=`rgba(255,255,255,${Math.ceil((1-q.lt*2)*4)/4})`;px.fillRect(0,0,CW,CH2)}
  R(0,0,CW,Math.round(CH2*.045),'#0b1a2a');
  if(cutFade>0){px.fillStyle=`rgba(11,26,42,${Math.ceil(cutFade*4)/4})`;px.fillRect(0,0,CW,CH2)}
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(pcv,0,0,CW,CH2,0,0,CW*ps*cv.width/W,CH2*ps*cv.width/W);ctx.restore()}

