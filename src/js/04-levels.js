/* ---------- levels ---------- */
const TH=[
 {n:'珊瑚湾',top:'#4fd6ea',bot:'#0d78b8',far:'#2fa9d2',mid:'#1a8cc0',sand:'#f5dca4',rock:'#ff8f80',rock2:'#e2635c',weed:'#35c492'},
 {n:'沉船秘境',top:'#37b6c8',bot:'#0a4f78',far:'#1f84a2',mid:'#136383',sand:'#d9c391',rock:'#b07a44',rock2:'#7d5229',weed:'#3c9a6a'},
 {n:'深海',top:'#1e56a6',bot:'#0a1444',far:'#183d82',mid:'#112a62',sand:'#34437e',rock:'#666cc0',rock2:'#3f4590',weed:'#4fd6c9'},
 {n:'冰海',top:'#c4f1ff',bot:'#3f8fd0',far:'#a4def6',mid:'#79c4ea',sand:'#eef9ff',rock:'#e2f6ff',rock2:'#9fd2ee',weed:'#8fd9e8'},
 {n:'黄金海沟',top:'#3cc4c0',bot:'#0c4a6a',far:'#c99a2e',mid:'#a87a1e',sand:'#f0c75a',rock:'#f4bb3a',rock2:'#c98a1a',weed:'#ffe066'},
 {n:'钟乳洞',top:'#3d3868',bot:'#12102a',far:'#4a4478',mid:'#2e2a55',sand:'#5a5378',rock:'#8a84b8',rock2:'#5f5a90',weed:'#7fe0d0'},
 {n:'石门遗迹',top:'#3aa39a',bot:'#0f3a4a',far:'#3a7f78',mid:'#27605f',sand:'#c9b88a',rock:'#a9bcaa',rock2:'#6f8a7a',weed:'#e0cc72'},
 {n:'海藻迷林',top:'#4fbf8a',bot:'#0f4a3a',far:'#2f8a5f',mid:'#1f6a4a',sand:'#d9c98a',rock:'#7fae6a',rock2:'#4f7f4a',weed:'#9fe06a'},
 {n:'逆潮海沟',top:'#2a6aa8',bot:'#081a3a',far:'#1f4f8a',mid:'#143a6a',sand:'#3f5a8a',rock:'#5f7fb0',rock2:'#3a5a8a',weed:'#7fd0f0'},
 {n:'沉灯之城',top:'#3f3478',bot:'#120f2a',far:'#5a4a8a',mid:'#3a2f5f',sand:'#6a5a8a',rock:'#c9a85a',rock2:'#8a6f3a',weed:'#ffe08a'},
 {n:'潮心井',top:'#1f8a9a',bot:'#061f3a',far:'#2f6a8a',mid:'#1f4a6a',sand:'#4f7a9a',rock:'#7fd0e0',rock2:'#4f9ab0',weed:'#bff6ff'},
 {n:'归潮',top:'#5fe0f0',bot:'#1a7fc0',far:'#3fb0e0',mid:'#2a95cf',sand:'#f7e0a8',rock:'#ff9f8f',rock2:'#e06a60',weed:'#3fd09a'}];
const LV=[
 {name:'珊瑚湾',fish:['sard','bream','yellow'],len:120,theme:0,pool:{pearls:3,rockB:3,rockT:2,octo:2,shield:1},goal:{k:'pearl',n:[10,16]},extra:[15,24]},
 {name:'沉船秘境',fish:['sard','bream','salmon','mack','eel'],len:150,theme:1,pool:{pearls:2,gate:3,net:3,rockB:1,octo:1,shield:1},goal:{k:'pearl',n:[15,22]},extra:[20,30]},
 {name:'深海追逐',fish:['puffer','tuna','angler','eel','saury'],len:180,theme:2,boss:'chase',pool:{pearls:2,shark:3,vortex:2,jelly:2,rockB:1,shield:1},goal:{k:'dist'},extra:[20,30]},
 {name:'冰海之旅',fish:['salmon','cod','saury','tuna','mack'],len:200,theme:3,spd:1.15,pool:{pearls:2,ice:3,net:2,gate:2,jelly:1,shield:1},goal:{k:'pearl',n:[25,34]},extra:[30,42]},
 {name:'黄金海沟',fish:['gold','sword','puffer','tuna','bream','yellow'],len:220,theme:4,pool:{pearls:2,wall:3,shark:2,octo:2,gate:1,net:1,shield:2},goal:{k:'boss'},gtxt:'喂饱大白，让它撞开黄色墙',friends:[4,5],boss:'feed',extra:[25,36]},
 {name:'钟乳洞',fish:['sard','eel','angler'],len:200,theme:5,dark:1,tool:'lamp',nodes:['salt','grape'],gname:'洞穴食材',pool:{pearls:2,rockB:3,rockT:3,gate:3,jelly:2,octo:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'石门遗迹',fish:['mack','cod','tuna'],len:210,theme:6,tool:'knife',nodes:['scallop'],gname:'潮汐扇贝',pool:{pearls:2,door:5,rockB:2,rockT:2,octo:2,jelly:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'海藻迷林',fish:['sard','yellow','mack'],len:210,theme:7,tool:'tongs',nodes:['urchin'],gname:'海胆',pool:{pearls:1,mimic:5,rockB:2,rockT:2,octo:1,jelly:2,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'逆潮海沟',fish:['tuna','saury','cod'],len:220,theme:8,nodes:['shrimp'],gname:'逆潮虾',boss:'pipe',gtxt:'充爆收光船的四根光管',pool:{pearls:1,cur:5,rockB:2,rockT:2,jelly:1,mimic:1,shield:1},goal:{k:'boss'},extra:[20,30]},
 {name:'沉灯之城',fish:['eel','angler','gold'],len:220,theme:9,tool:'lure',need:'banq',nodes:['squid'],gname:'灯下鱿鱼',pool:{pearls:1,beam:5,gate:2,door:1,octo:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'潮心井',fish:['sword','puffer','salmon'],len:230,theme:10,tool:'bottle',escort:1,nodes:['dew'],gname:'潮心露',pool:{pearls:3,rockB:3,rockT:3,gate:2,jelly:2,cur:1,shield:1},goal:{k:'gather',n:[2,3]},extra:[20,30]},
 {name:'归潮',fish:['sard','salmon','tuna','gold'],len:260,theme:11,helpers:1,boss:'team',pool:{pearls:2,door:2,cur:2,beam:2,mimic:2,wall:1,net:1,shark:1,rockB:1,shield:2},goal:{k:'dist'},extra:[30,40]}];
const goalText=(L,hi)=>L.goal.k==='boss'?L.gtxt:L.goal.k==='pearl'?`收集 ${L.goal.n[hi]} 颗珍珠`:L.goal.k==='rescue'?`救出 ${L.goal.n[hi]} 只小伙伴`:L.goal.k==='gather'?`采到 ${L.goal.n[hi]} 份${L.gname}`:L.helpers?`游到 ${L.len} 米，把潮心送回去`:`游到 ${L.len} 米，逃离鲨鱼`;

const NODE={salt:{tool:'chisel',hp:3,no:'盐花太硬了，需要凿子'},grape:{tool:'scissors',hp:1,no:'海葡萄要用剪刀剪下来'},scallop:{tool:'knife',hp:1,timed:1,no:'扇贝要用贝刀撬开'},urchin:{tool:'tongs',hp:2,no:'海胆扎手，需要长夹子'},shrimp:{tool:'trap',hp:1,no:'逆潮虾游得快，需要虾笼'},squid:{tool:'lure',hp:2,no:'鱿鱼躲在暗处，需要诱鱼灯'},dew:{tool:'bottle',hp:1,no:'潮心露要用琉璃瓶接'}};
const gcount=g=>Object.keys(g.caught).reduce((a,k)=>a+(FISH[k].x?g.caught[k]:0),0),nodeOpen=(e,t)=>(t+e.x*.01)%3.2<1.9;
function rng(seed){let a=seed>>>0;const f=()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  return(lo,hi)=>lo===undefined?f():lo+f()*(hi-lo)}
function arc(g,x,f0,f1,n){for(let i=0;i<n;i++){const k=n>1?i/(n-1):0;g.E.push({t:'pearl',x:x+i*50,f:clamp(lerp(f0,f1,k),.05,.95)})}}
const PAT={
 pearls(g,x){const a=g.r(.2,.8);arc(g,x-120,a,clamp(a+g.r(-.2,.2),.1,.9),6)},
 rockB(g,x,d){const h=g.r(.22,.34+.1*d);g.E.push({t:'rock',x,w:g.r(90,130),h,top:0});arc(g,x-100,1-h-.17,1-h-.17,5)},
 rockT(g,x,d){const h=g.r(.22,.34+.1*d);g.E.push({t:'rock',x,w:g.r(90,130),h,top:1});arc(g,x-100,h+.17,h+.17,5)},
 gate(g,x,d){const gap=(g.mode==='simple'?.5:.4)-.06*d,c=g.r(.32,.68);g.E.push({t:'rock',x,w:100,h:c-gap/2,top:1},{t:'rock',x,w:100,h:1-c-gap/2,top:0});arc(g,x-100,c,c,5)},
 octo(g,x){const f=g.r(.2,.8);g.E.push({t:'octo',x,f,ph:g.r(0,3)});const f2=f<.5?f+.38:f-.38;arc(g,x-100,f2,f2,5)},
 jelly(g,x,d){const n=d>.5?3:2;for(let i=0;i<n;i++)g.E.push({t:'jelly',x:x-70+i*150,f:g.r(.35,.65),amp:g.r(.12,.22),ph:g.r(0,6),sp:g.r(.9,1.4)});arc(g,x-250,.5,.5,3)},
 net(g,x){const f=g.r(.3,.7);g.E.push({t:'net',x:x+60,f,amp:.1,ph:g.r(0,6)});const f2=f<.5?.88:.12;arc(g,x-100,f2,f2,5)},
 shark(g,x){g.E.push({t:'sharkT',x});const a=g.r(.3,.7);arc(g,x-100,a,a+g.r(-.15,.15),5)},
 wall(g,x){const top=g.r()<.5?1:0;g.E.push({t:'wall',x,top,h:.6});if(g.r()<.65){g.E.push({t:'shield',x:x-300,f:top?.4:.6});arc(g,x+70,top?.3:.7,top?.3:.7,4)}const fs=top?.84:.16;arc(g,x-120,fs,fs,5)},
 vortex(g,x){const top=g.r()<.5?1:0;g.E.push({t:'rock',x,w:110,h:.22,top},{t:'vortex',x,f:top?.3:.7,r:95});const f2=top?.86:.14;arc(g,x-100,f2,f2,5)},
 ice(g,x,d){const n=d>.5?3:2;for(let i=0;i<n;i++)g.E.push({t:'ice',x:x-60+i*150,ph:g.r(0,1.3),sp:g.r(.09,.16)*(g.r()<.5?1:-1)});arc(g,x-260,.5,.5,3)},
 door(g,x){const top=g.r()<.5,d={t:'door',x:x+120,open:0,a:0};g.E.push(d,{t:'btn',x:x-330,f:top?.14:.86,d,on:0});arc(g,x-560,.5,top?.2:.8,5);arc(g,x-200,top?.3:.7,.5,5)},
 mimic(g,x){const a=g.r(.25,.75),b=clamp(a+g.r(-.15,.15),.15,.85),m=1+Math.floor(g.r()*3);for(let i=0;i<5;i++){const f=lerp(a,b,i/4);g.E.push(i===m?{t:'mimic',x:x-100+i*56,f,aw:0}:{t:'pearl',x:x-100+i*56,f})}},
 cur(g,x){const up=g.r()<.5;g.E.push({t:'cur',x:x-150,w:300,dir:up?-1:1},{t:'rock',x:x+60,w:110,h:.26,top:up?1:0});const f=up?.72:.28;arc(g,x-200,.5,f,4);arc(g,x+20,f,f,4)},
 beam(g,x){g.E.push({t:'beam',x,ph:g.r(0,6),sp:g.r(1.1,1.6)});arc(g,x-220,.5,.5,3);arc(g,x+70,.5,.5,3)},
 shield(g,x){const f=g.r(.25,.75);g.E.push({t:'shield',x,f});arc(g,x-170,f,f,3)}};
function genSlot(g){
  const x=g.x,d=g.diff(x);let name='pearls';
  if(g.i>=2){const ents=Object.entries(g.pool(x));let tot=0;
    for(const[k,w]of ents)if(k!==g.last||k==='pearls')tot+=w;let q=g.r()*tot;
    for(const[k,w]of ents){if(k===g.last&&k!=='pearls')continue;q-=w;if(q<=0){name=k;break}}
    if(g.mode==='simple'&&g.r()<.22)name='pearls'}
  PAT[name](g,x,d);g.last=name;
  const gap=g.gap(d);
  if(g.mode!=='simple'&&g.i>=4&&name!=='shark'&&name!=='pearls'&&name!=='jelly'&&name!=='ice'&&g.r()<.2+.25*d)
    g.E.push({t:'jelly',x:x+gap*.5,f:g.r(.35,.65),amp:.14,ph:g.r(0,6),sp:1.1});
  if(g.i>=2&&g.r()<.5){const ks=g.fish(x),k=ks[(g.wi=(g.wi||0)+1+0*g.r())%ks.length];const w={t:'wild',k,x:x+gap*.55,f:g.r(.15,.85),ph:g.r(0,6),hp:FISH[k].hp,shiny:Math.random()<.04};g.E.push(w);if(g.bait)g.E.push({...w,x:w.x+150,f:clamp(1.05-w.f,.15,.85),ph:w.ph+2})}
  g.i++;g.x+=gap*g.r(.95,1.1)}
function buildLevel(li,mode){
  const L=LV[li],hard=mode==='hard',len=L.len*60,pool={...L.pool};if(!hard&&pool.shield)pool.shield*=2;
  if(hard){if(li>=1)pool.net=(pool.net||0)+li*.5;if(li>=3)pool.wall=(pool.wall||0)+(li-2)*.5}
  const g={mode,r:rng(1000+li*77+(hard?13:0)),x:700,i:0,E:[],last:'',pool:()=>pool,fish:()=>L.fish,gap:()=>hard?350-li*8:450,diff:x=>x/len};
  while(g.x<len-450)genSlot(g);
  for(let x=2400;x<len-900;x+=2400){let cx=x;for(let pass=0;pass<4;pass++){let moved=false;
    for(const e of g.E){if(e.t==='btn'&&cx>e.x-470&&cx<e.d.x+90){cx=e.x-500;moved=true}}
    for(const e of g.E){if((e.t==='wall'||e.t==='door')&&e.x>cx&&e.x-cx<430){const b=g.E.find(q=>q.t==='btn'&&q.d===e);cx=(b?b.x:e.x)-500;moved=true}}
    if(!moved)break}
    g.E.push({t:'cp',x:cx})}
  if(L.goal.k==='rescue'||L.friends){const n=L.friends?L.friends[hard?1:0]:L.goal.n[hard?1:0]+(hard?2:1);for(let k=0;k<n;k++)g.E.push({t:'friend',x:900+(len-1800)*(k+.5)/n+g.gap()*.5,f:g.r(.3,.7)})}
  if(!hard&&(SAVE.simple.st[li]>0||SAVE.hard.st[li]>0)){let c=0;g.E=g.E.filter(e=>!((e.t==='net'||e.t==='wall')&&(c++%2===0)))}
  if(L.nodes){const n=(L.goal.n?L.goal.n[hard?1:0]:2)+2,m=L.nodes.length;for(let k=0;k<n;k++)L.nodes.forEach((nk,q)=>g.E.push({t:'node',k:nk,x:800+((L.boss?len-1700:len)-1600)*(k+(q+.4)/m)/n,f:NODE[nk].f!=null?NODE[nk].f:(k+q)%2?(nk==='grape'?.14:.9):(nk==='grape'?.86:.1),hp:NODE[nk].hp}))}
  if(L.boss){const bx=len-1500;g.E=g.E.filter(e=>e.x<bx-150);g.E.push({t:'boss',x:bx})}
  if(L.helpers)[['鲸婆婆','whale',.14],['墨墨','gold',.36],['大白','clear',.58],['石蟹','doors',.8]].forEach(h=>g.E.push({t:'help',x:len*h[2],who:h[0],k:h[1]}));
  if(L.vol===2)v2Build(L,g);g.E.push({t:'fin',x:len});return g}
function buildEndless(){
  const lv=x=>Math.floor(x/60/200);
  return{mode:'endless',r:rng((Math.random()*1e9)|0),x:700,i:0,E:[],last:'',
    pool:x=>{const l=lv(x),p={pearls:3,rockB:2,rockT:2,octo:2,shield:1};if(l>=1)Object.assign(p,{gate:2,jelly:2,net:2});if(l>=2)Object.assign(p,{shark:2,vortex:1});if(l>=3)Object.assign(p,{wall:2,ice:2});return p},
    fish:x=>{const l=lv(x);return l<1?['sard','bream','yellow']:l<2?['sard','bream','yellow','salmon','mack','saury']:l<3?['salmon','mack','eel','cod','puffer','tuna']:Object.keys(FISH).filter(k=>!FISH[k].x)},
    gap:d=>430-130*d,diff:x=>clamp(lv(x)/6,0,1)}}

