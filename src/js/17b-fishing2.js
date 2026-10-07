/* ---------- 钓鱼第二步：钓点、新鱼、天气月相、打窝、传说鱼、意外收获、拍照、伊瓦 ---------- */
/* 四个钓点：船尾和潟湖浅滩跟着钓鱼一起解锁，红树林要通关第三章，礁盘外沿要通关第四章 */
const SPOTS=[{id:'stern',n:'船尾',ic:'⛵',d:'坐在船沿上，什么鱼都有一点',li:VOL1+1},{id:'lagoon',n:'潟湖浅滩',ic:'🏝️',d:'盘腿坐在沙滩上，水浅，鱼在近处',li:VOL1+1},
 {id:'mangrove',n:'红树林',ic:'🌳',d:'坐在树根上，夜里有劲大的笛鲷',li:VOL1+2},{id:'reef',n:'礁盘外沿',ic:'🪨',d:'站在礁石上，浪大鱼也大',li:VOL1+3}];
const fsSpot=()=>SPOTS.find(s=>s.id===(SAVE.fsh.spot||'stern'))||SPOTS[0];
Object.assign(FISH,{bonefish:{n:'硬头鱼',c:['#ffffff','#cfd8e0','#7c8a98'],s:1,x:1},snapper:{n:'笛鲷',c:['#ffd8c8','#e86a5a','#a83a3a'],s:1,x:1},
 barra:{n:'梭鱼',c:['#f2f6f8','#a8b8c4','#3c4a58'],s:1,x:1},surgeon:{n:'刺尾鲷',c:['#cfe8ff','#3a6ad0','#ffd23f'],s:1,x:1},
 mjack:{n:'红树林笛鲷',c:['#f8c8a0','#b8603a','#6a3020'],s:1,x:1},bluefin:{n:'蓝鳍鲹',c:['#e8f4ff','#9ab8d0','#2a8cff'],s:1,x:1}});
/* 传说鱼和意外收获只画图，不进菜篮 */
const FXC={gt:['#e8eef2','#8e9caa','#34404e'],moonfish:['#ffe8ee','#c4d2ea','#e0503f'],bottle:['#d8fff0','#6ac8a0','#2a7a5a'],sandal:['#ffb0b0','#e0607a','#8a2a3a'],coconut:['#f2e2c0','#8a5a2b','#5a3a1a']};
FSP.push(
 {id:'bonefish',n:'硬头鱼',k:'dart',len:[30,75],kg:10,sh:'bone',zone:[.45,.95],w:[2,1,.5,3],tip:'清晨的浅滩最多，银白色，一咬钩就狂奔',zw:.2,nokeep:1},
 {id:'snapper',n:'笛鲷',k:'sink',len:[25,70],kg:15,sh:'snap',zone:[.4,.9],w:[1,3,1.5,1],tip:'傍晚在礁石边，咬住就往石头缝里钻',zw:.22},
 {id:'barra',n:'梭鱼',k:'dart',len:[50,140],kg:5,sh:'barra',zone:[.1,.6],w:[1.5,.8,.3,3],tip:'清晨在外海巡游，牙尖，冲得很快',zw:.18},
 {id:'surgeon',n:'刺尾鲷',k:'calm',len:[15,40],kg:20,sh:'surg',zone:[.5,.97],w:[3,1,.3,1.5],tip:'白天在珊瑚旁啄藻，尾巴两边各藏一把小刀',zw:.28},
 {id:'mjack',n:'红树林笛鲷',k:'sink',len:[25,80],kg:16,sh:'snap',zone:[.5,.97],w:[.6,2,3,1],tip:'夜里躲在红树根下，劲很大',zw:.19},
 {id:'bluefin',n:'蓝鳍鲹',k:'dart',len:[30,90],kg:14,sh:'trev',zone:[.2,.7],w:[1.5,3,.5,1],tip:'黄昏在礁盘外沿成群捕猎，鳍是电光蓝',zw:.18},
 {id:'gt',n:'礁王',k:'dart',len:[140,170],kg:16,sh:'trev',zone:[.15,.45],w:[0,0,0,0],tip:'传说鱼：暴风雨过后的清晨，礁盘外沿，挂最好的饵',zw:.14,leg:1},
 {id:'moonfish',n:'月鱼',k:'calm',len:[100,130],kg:30,sh:'moon',zone:[.4,.75],w:[0,0,0,0],tip:'传说鱼：满月的夜里，船尾，什么饵都不挂',zw:.14,leg:1});
/* 每种鱼在各钓点的多少 */
{const SPW={milkfish:{stern:1,lagoon:2,mangrove:1},flyfish:{stern:1.5},skipjack:{stern:1,reef:.8},parrot:{stern:.6,lagoon:1,reef:1},grouper:{stern:1,reef:1,mangrove:.6},mahi:{stern:1,reef:.8},
  bonefish:{lagoon:2.5},snapper:{reef:2,stern:.4},barra:{reef:1.5,stern:.5,mangrove:.8},surgeon:{lagoon:1.5,reef:1},mjack:{mangrove:3},bluefin:{reef:2}};
 FSP.forEach(s=>s.sp=SPW[s.id]||{})}
DISH.push({id:'d75',ic:'🐟',n:'盐烤笛鲷',need:{snapper:1},p:58},{id:'d76',ic:'🍲',n:'姜葱红树林笛鲷',need:{mjack:1},p:62},{id:'d77',ic:'🐟',n:'香煎梭鱼',need:{barra:1},p:54},
 {id:'d78',ic:'🥥',n:'椰香刺尾鲷',need:{surgeon:1,coco:1},p:52},{id:'d79',ic:'🍣',n:'蓝鳍鲹刺身',need:{bluefin:1},p:66});
Object.assign(UNL,{d75:[15,2],d76:[14,2],d77:[15,2],d78:[13,2],d79:[15,2]});METHOD.grill.push('d75','d77');METHOD.pot.push('d76');METHOD.umu.push('d78');METHOD.cut.push('d79');
Object.assign(RCP,{
d75:['整条笛鲷、粗盐、青柠',['鱼去鳞去内脏，擦干，两面划几刀。','里外抹一层粗盐，静置十分钟。','炭火或烤箱 200 度烤二十分钟左右，挤青柠汁。'],'笛鲷在太平洋岛屿和东南亚都常见，红色的品种最受欢迎，整条盐烤最能吃出鲜甜。'],
d76:['红树林笛鲷一条、姜、葱、酱油、少许糖',['鱼两面划刀，铺姜片大火蒸十分钟。','倒掉蒸出的水，铺上葱丝。','淋一勺烧到冒烟的热油，再淋酱油和一点糖。'],'红树林笛鲷在澳大利亚叫 mangrove jack，是钓鱼佬最爱的“根下猛鱼”，肉质结实。'],
d77:['梭鱼鱼排、盐、黑胡椒、黄油、柠檬',['鱼排擦干，撒盐和黑胡椒。','平底锅放黄油，中火煎鱼皮那面三分钟，翻面再煎两分钟。','挤柠檬汁，趁热吃。'],'梭鱼又叫“海狼”，大的梭鱼可能带雪卡毒，现实里只吃中小个头的。'],
d78:['刺尾鲷两条、椰浆、香蕉叶、盐',['鱼去内脏，小心尾巴两边的硬刺，先剪掉。','抹盐，淋椰浆，用香蕉叶包好。','放进地炉或烤箱焖烤二十五分钟。'],'太平洋岛民常把刺尾鲷包在叶子里放进地炉，夏威夷叫它 manini 或 kala。'],
d79:['新鲜蓝鳍鲹一块、酱油、青柠、葱',['鱼必须很新鲜，去皮去血线。','切成薄片，摆盘。','配酱油和青柠汁，撒葱花。'],'夏威夷人管蓝鳍鲹叫 ʻōmilu，生吃、做 poke 都很常见。']});

/* 鱼饵多一种：空钩 */
BAIT.push({id:'none',ic:'🪝',n:'空钩',d:'什么都不挂。普通的鱼不太理你，只有一种鱼会来'});
const CHUMP=15,CHUMK=5;

/* 剧情：伊瓦上船（第三章结尾），两条传说鱼的过场 */
SCN.fMoon={bg:'shore',deck:1,night:1,stars:1,cast:[['kid',.45,'g']]};
STORY.fish2=[['旁白','船离开红树林的时候，一只黑色的大鸟一直跟在后面。','fDeck'],['小帆','又是它！在红树林里抢了你三次抄网的那只。','fDeck',{em:'!'}],
 ['旁白','大鸟落在船尾的栏杆上，喉咙下面挂着一个红色的小囊，嘴巴“嗒嗒嗒”地磕着。','fDeck'],['小鱼','……它是在要鱼吗？','fDeck',{em:'?'}],
 ['小帆','爷爷说，这种鸟叫“伊瓦”，就是小偷的意思。它自己不爱下水，专抢别的鸟嘴里的鱼。','fDeck'],
 ['小鱼','那就叫你伊瓦吧。先说好，只许叼我放回去的小鱼。','fDeck'],['伊瓦','嗒嗒嗒。','fDeck',{em:'♪'}],['旁白','从那天起，船尾的栏杆上多了一位常客。','fDeck']];
STORY.legGT=[['旁白','鱼被拉到礁石边。月白色的大鱼侧过身，嘴角挂着一枚磨得发亮的贝壳钩。','fRack'],['老舵','……是它。','fRack',{em:'…'}],
 ['老舵','五十年前，从我手里跑掉的那条。','fRack'],['小鱼','它嘴上的钩子，和小帆给我的那枚一模一样。','fRack'],['老舵','放了吧。它比我们都老。','fRack'],
 ['旁白','礁王慢慢沉回深蓝里。老舵站了很久，一句话也没说。','fRack',{cut:1}]];
STORY.legMoon=[['旁白','满月底下，一条圆圆的银色大鱼浮到船边。它的鳍是红的，身上像撒了一层月光。','fMoon'],['小鱼','……原来月亮真的会掉进海里。','fMoon',{em:'…'}],
 ['旁白','它在灯下停了一会儿，又慢慢游走了。海面上留下一道亮亮的路。','fMoon']];
{const i=GAL.findIndex(g=>g[0]==='fish1')+1;GAL.splice(i,0,['fish2','第三章之后 · 伊瓦上船'],['legGT','礁盘外沿 · 礁王'],['legMoon','满月 · 月鱼'])}

/* 意外收获 */
const JUNK=[{id:'bottle',n:'漂流瓶',k:'calm',zw:.34,tv:3},{id:'sandal',n:'旧拖鞋',k:'calm',zw:.36,tv:1},{id:'coconut',n:'椰子',k:'calm',zw:.36,tv:0}];
const LETTERS=['“如果你捡到这个瓶子，请替我看一眼今天的晚霞。”','“我在灯塔岛等一条船。等到了，就把这个瓶子扔掉。”……看来是等到了。','一张小孩画的画：一条橙色的鱼，在笑。','“今天钓了一整天，一条都没有。明天还来。”','“海很大，可是总有人会捡到。你好呀。”'];

/* 天气和月相：雨偶尔下，夜里更容易下；每过一个夜晚月亮变一点，八个夜晚一轮，第四夜满月 */
const fsMoon=()=>(SAVE.fsh.nights||0)%8;
function fsWeather(dt){const f=FS,ph=fsPhase(f.tod);
  if(f.lph!==ph){if(ph===2&&f.lph!==undefined){SAVE.fsh.nights=(SAVE.fsh.nights||0)+1;f.rainNight=0;persist()}if(ph===0)f.rainNight=0;f.lph=ph}
  if((f.wxT-=dt)<=0){f.wxT=40+Math.random()*50;const p=ph===2?.4:.18;f.rain=Math.random()<p?1:0;if(f.rain&&ph===2)f.rainNight=1}
  f.rainA=clamp((f.rainA||0)+(f.rain?dt:-dt)*.4,0,1);if(f.rainA>.3&&Math.random()<dt*6)nz(.02,'highpass',2500,0,.02*f.rainA)}
/* 传说鱼：条件满了，隔一阵在附近冒出一个发光的大鱼影 */
function fsLegendWant(){const f=FS,sp=fsSpot().id,ph=fsPhase(f.tod),bt=fsBait();
  if(sp==='reef'&&ph===3&&f.rainNight&&(bt==='squid'||bt==='glow'))return FSP.find(s=>s.id==='gt');
  if(sp==='stern'&&ph===2&&fsMoon()===4&&bt==='none')return FSP.find(s=>s.id==='moonfish');return null}
function fsLegend(dt){const f=FS;if((f.legT-=dt)>0)return;f.legT=8;const s=fsLegendWant();if(!s||f.sh.some(x=>x.s.leg)||f.legDone===s.id)return;
  if(Math.random()<.45){const z=s.zone[0]+Math.random()*(s.zone[1]-s.zone[0]);f.sh.push({s,fr:1,len:Math.round(s.len[0]+Math.random()*(s.len[1]-s.len[0])),st:3,z,x:Math.random()<.5?-.05:1.05,tz:z,tx:.3+Math.random()*.4,st2:'roam',cool:0,ph:0,leg:1})}}
/* 打窝：在浮漂附近撒一把窝料，一分钟里鱼影聚过来、咬钩快 */
function fsChum(){const f=FS,c=SAVE.fsh.chum||0;if(!c||f.ph==='fight'||f.ph==='card')return;const x=f.bob?f.bob.x:f.aim,z=f.bob?f.bob.z:.5;SAVE.fsh.chum=c-1;persist();
  f.chumAt={x,z,t:60};for(let i=0;i<3;i++)fsSpawn(false,{x,z:clamp(z+(Math.random()-.5)*.15,.03,.95)});f.rip.push({x,z,t:0,r:1.6});CSND.splash();toast('撒了一把窝料，鱼会慢慢聚过来',2);fsChumBtn()}
function fsChumBtn(){const e=$('fhChum'),c=SAVE.fsh.chum||0,ph=FS&&FS.ph;e.hidden=!FS||!c||!(ph==='idle'||ph==='wait')||!$('fhPanel').hidden||!$('fhCard').hidden;e.textContent=`🪣 打窝 ×${c}`}
$('fhChum').onclick=()=>{SFX.tap();fsChum()};

/* 伊瓦：停在栏杆上，点它会嗒嗒嗒；偶尔叼走放回去的小鱼 */
/* 伊瓦：几个落脚点之间飞来飞去，摸它会有不同反应 */
function fsPerch(sp,gy){const c=p=>Math.round(CW*p);
  if(sp==='stern')return[{x:c(.2),y:gy-10},{x:c(.6),y:gy-10},{x:c(.86)-4,y:gy-24},{x:c(.12),y:gy+5}];
  if(sp==='lagoon')return[{x:c(.2),y:gy-7,stake:1},{x:c(.62),y:gy-1},{x:c(.42)-12,y:gy-6},{x:c(.9)-12,y:gy-29}];
  if(sp==='mangrove')return[{x:c(.2),y:gy-7,stake:1},{x:c(1/6)+2,y:gy-16},{x:c(4/6)-5,y:gy-10}];
  return[{x:c(.2),y:gy-7,stake:1},{x:c(.65),y:gy},{x:c(.88),y:gy}]}
function fsIw(){const f=FS;if(!f.iw)f.iw={i:0,m:'sit',k:0,d:0,dir:1,nx:6+Math.random()*8,pets:[],sulk:0,gcd:40,shell:0,last:''};return f.iw}
/* 换个动作：m 动作名，d 时长，b 落到第几个落脚点 */
function fsIwSet(m,d,b){const w=fsIw();if(w.b!=null){w.i=w.b;w.b=null}w.m=m;w.k=0;w.d=d;if(b!=null){w.a=w.i;w.b=b<0?w.i:b}}
function fsIwaUpd(dt){const f=FS,w=fsIw();if(!SAVE.story.fish2)return;w.sulk=Math.max(0,w.sulk-dt);w.gcd-=dt;if(w.shell>0)w.shell-=dt;
  if(w.m!=='sit'){w.k+=dt/w.d;if(w.k>=1){const m=w.m;if(w.b!=null){w.i=w.b;w.b=null}
    if(m==='gift'){w.shell=3.5;SAVE.fsh.tide+=1;SAVE.fsh.tideAll=(SAVE.fsh.tideAll||0)+1;persist();fhTop();toast('伊瓦叼来一枚小贝壳，放在你脚边 · 🌊 +1 潮印',2.2);snd(1500,.06,'triangle',.06)}
    if(m==='nap'&&Math.random()<.5){fsIwSet('nap',6+Math.random()*8);return}
    w.m='sit';w.k=0;w.nx=6+Math.random()*9}return}
  if((w.nx-=dt)>0)return;const n=fsPerch(fsSpot().id,FL.gy||100).length,other=()=>{let j=w.i;while(n>1&&j===w.i)j=Math.floor(Math.random()*n);return j},r=Math.random();
  if((f.nightV||0)>.6&&f.ph!=='fight'&&r<.45)fsIwSet('nap',8+Math.random()*10);
  else if(r<.5)fsIwSet('fly',1.6,other());else if(r<.75)fsIwSet('preen',2.2);else{fsIwSet('hop',.6);w.dir=-w.dir}}
/* 叼走放回的小鱼：俯冲到海里再飞回来 */
function fsIwaSnatch(){const w=fsIw();fsIwSet('snatch',2.2,-1)}
function fsIwaPos(sp,gy,t){const w=fsIw(),P=fsPerch(sp,gy);if(w.i>=P.length)w.i=0;if(w.b!=null&&w.b>=P.length)w.b=0;const A=P[w.a!=null&&w.b!=null?w.a:w.i],u=w.k,m=w.m;
  if(m==='fly'){const B=P[w.b];return{x:lerp(A.x,B.x,u),y:lerp(A.y,B.y,u)-Math.sin(u*Math.PI)*14,air:1,dir:B.x>=A.x?1:-1}}
  if(m==='lap'){const s=A.x<CW/2?1:-1;return{x:A.x+Math.sin(u*Math.PI*2)*18*s,y:A.y-4-Math.sin(u*Math.PI)*16,air:1,dir:Math.cos(u*Math.PI*2)*s>=0?1:-1}}
  if(m==='snatch'||m==='gift'){const B=P[w.b],S={x:CW*(m==='gift'?.3:.55),y:(FL.hy||40)+8};const v=u<.5?u*2:(u-.5)*2,a=u<.5?A:S,b=u<.5?S:B;
    return{x:lerp(a.x,b.x,v),y:lerp(a.y,b.y,v)-Math.sin(v*Math.PI)*(u<.5?6:12),air:1,dir:b.x>=a.x?1:-1,fish:m==='snatch'&&u>=.5,shell:m==='gift'&&u>=.5}}
  return{x:A.x,y:A.y,dir:w.dir}}
function drawIwa(x,y,t,o){x=Math.round(x);y=Math.round(y);o=o||{};const dir=o.dir||1,m=o.m||'sit',k=o.k||0,K='#1c1c28',G='#9aa0b0',P=(dx,dy,w,h,c)=>R(dir>0?x+dx:x+4-dx-w,y+dy,w,h,c);
  if(o.air){const fl=Math.sin(t*14)>0?-2:2;P(-1,0,5,2,K);P(-6,fl,5,1,K);P(-8,fl*1.5,2,1,K);P(4,-fl,5,1,K);P(8,-fl*1.5,2,1,K);P(4,0,2,1,G);P(-3,1,2,1,K);
    if(o.fish){P(4,2,1,2,'#c8d8e8');P(4,4,2,1,'#c8d8e8')}if(o.shell){P(4,2,2,2,'#ffd2c0')}return}
  let bob=Math.round(Math.sin(t*1.3)*.5);if(m==='hop'||m==='startle')bob=-Math.round(Math.sin(k*Math.PI)*(m==='hop'?4:6));if(m==='nap')bob=0;
    if(m==='wings'){const s=Math.sin(Math.min(1,k*4)*Math.PI/2)*(k>.8?(1-k)*5:1),wl=Math.round(2+s*7);P(-wl,-7+bob,wl,2,K);P(-wl-1,-8+bob-Math.round(s*2),2,1,K);P(4,-7+bob,wl,2,K);P(3+wl,-8+bob-Math.round(s*2),2,1,K)}
  const ruf=m==='grumpy';P(ruf?-1:0,(ruf?-7:-6)+bob,ruf?6:4,ruf?6:5,K);P(-2,-4+bob,3,2,K);P(-3,-3+bob,2,1,K);if(ruf){P(-1,-8+bob,1,1,K);P(2,-8+bob,1,1,K);P(4,-7+bob,1,1,K)}
  if(m==='preen'){const h=Math.sin(k*Math.PI*3)>0?1:0;P(0,-8+bob+h,3,3,K);P(-1,-6+bob+h,2,1,G);P(1,-8+bob+h,1,1,'#ffffff')}
  else if(m==='nap'){P(2,-7,3,2,K);P(3,-6,2,1,'#a02030');const z=(t*.8)%1;P(6,-10-Math.round(z*4),2,1,`rgba(255,255,255,${1-z})`);P(7,-11-Math.round(z*4),1,1,`rgba(255,255,255,${1-z})`)}
  else if(m==='nuzzle'){const l=Math.round(Math.sin(Math.min(1,k*2)*Math.PI/2)*2);P(3+l,-7+bob+l,3,3,K);P(5+l,-6+bob+l,2,1,G);P(6+l,-5+bob+l,1,1,G);P(4+l,-7+bob+l,1,1,'#ffffff');P(3,-5+bob,2,2,'#e0303a')}
  else{P(3,-8+bob,3,3,K);P(5,-7+bob,2,1,G);P(6,-6+bob,1,1,G);P(4,-8+bob,1,1,ruf?'#ff6a5a':'#ffffff');P(3,-5+bob,2,2,o.pet||Math.sin(t*.7)>.6?'#e0303a':'#a02030')}
  if(m==='puff'){const s=Math.sin(Math.min(1,k*3)*Math.PI/2)*(k>.85?(1-k)*6.6:1),r=Math.round(s*2);P(3,-5+bob,2+r,2+r,'#e0303a');if(r>1)P(4,-4+bob,1,1,'#ff8a8a')}
  P(1,-1,1,2,'#3a3a44');P(3,-1,1,2,'#3a3a44');
  if(m==='nuzzle'||m==='puff'&&k>.3){for(let i=0;i<2;i++)R(x+2+i*4-Math.round(k*2),y-11-Math.round(k*8)-i*2,1,1,'#ff7aa8')}
  if(ruf||m==='startle'){R(x+2,y-15+bob,1,3,'#ff6a5a');R(x+2,y-11+bob,1,1,'#ff6a5a')}}
function fsIwaDraw(sp,gy,t){const f=FS,w=fsIw(),P=fsPerch(sp,gy);for(const p of P)if(p.stake){R(p.x,p.y,2,gy-p.y+3,'#7a5a3a');R(p.x-1,p.y,4,1,'#8a6a4a')}
  const q=fsIwaPos(sp,gy,t);drawIwa(q.x,q.y,t,{dir:q.dir,m:w.m,k:w.k,air:q.air,fish:q.fish,shell:q.shell,pet:w.m!=='sit'});f.iwaPos=q.air?null:{x:Math.round(q.x),y:Math.round(q.y)};
  if(w.shell>0){const kx=Math.round(CW*.42)-8,ky=(sp==='reef'?gy-6:gy)-1;R(kx,ky,3,2,'#ffd2c0');R(kx+1,ky-1,1,1,'#ffe8dc')}}
function fsPet(){const f=FS,w=fsIw();f.iwaPet=1.2;const tap=(a,n,s)=>{for(let i=0;i<n;i++)setTimeout(()=>snd(a+i*s,.03,'square',.05),i*90)};
  if(w.m==='nap'){fsIwSet('startle',.8);toast('伊瓦被你吵醒了，迷迷糊糊地看着你',1.8);tap(900,2,60);return}
  if(w.sulk>0){toast('伊瓦扭过头去，不理你',1.4);w.dir=-w.dir;return}
  if(w.m!=='sit'&&w.m!=='hop'&&w.m!=='preen')return;
  SAVE.fsh.pets=(SAVE.fsh.pets||0)+1;w.pets=w.pets.filter(x=>f.t-x<12);w.pets.push(f.t);
  if(w.pets.length>=5){w.pets=[];w.sulk=10;const P=fsPerch(fsSpot().id,FL.gy||100);let far=w.i,fd=-1;for(let j=0;j<P.length;j++){const d=Math.abs(P[j].x-P[w.i].x);if(d>fd){fd=d;far=j}}
    fsIwSet('grumpy',.9);setTimeout(()=>{if(FS&&w.m==='grumpy'||FS&&w.m==='sit')fsIwSet('fly',1.4,far)},900);toast('嘎！伊瓦嫌你摸太多了，飞到一边去了',1.8);snd(420,.12,'sawtooth',.06);return}
  const opts=[['nuzzle',3,1.2,'伊瓦用脑袋蹭了蹭你的手'],['puff',2,1.8,'伊瓦鼓起红红的喉囊，嗒嗒嗒！'],['wings',2,1.6,'伊瓦张开翅膀，比你还宽'],['hop',1.2,.6,'伊瓦蹦了一下，转过身去'],['lap',1.2,2.4,'伊瓦绕着你飞了一圈']];
  if(w.gcd<=0&&SAVE.fsh.pets>=4)opts.push(['gift',1.2,3.2,'']);let tot=0;const ok=opts.filter(o=>o[0]!==w.last);for(const o of ok)tot+=o[1];let r=Math.random()*tot,pick=ok[0];for(const o of ok){if((r-=o[1])<=0){pick=o;break}}
  const [m,,d,msg]=pick;w.last=m;if(m==='gift'){w.gcd=150;fsIwSet('gift',d,-1)}else if(m==='lap')fsIwSet('lap',d,-1);else{fsIwSet(m,d);if(m==='hop')w.dir=-w.dir}
  if(msg)toast(msg,1.5);if(m==='puff'){snd(300,.25,'sine',.07);setTimeout(()=>tap(1200,3,80),250)}else if(m==='wings')snd(600,.15,'triangle',.05);else tap(1200,3,80)}

/* 收竿：换钓点或回主菜单 */
function fsSpots(){const cur=fsSpot().id;
  $('fhPanel').innerHTML=`<h3>换个地方钓</h3>${SPOTS.map(s=>{const ok=cleared(s.li),on=s.id===cur;return `<div class="fdk"><span class="ic">${s.ic}</span><div><b>${s.n}</b><span>${s.d}</span></div>${on?'<button class="btn sm off" disabled>在这儿</button>':ok?`<button class="btn sm mint" data-fs="${s.id}">去这儿</button>`:`<span class="note">${s.li===VOL1+2?'第三章以后':'第四章以后'}</span>`}</div>`}).join('')}
   <div class="rowb"><button class="btn sm" data-fp="x">接着钓</button><button class="btn sm sun" data-fq="1">回主菜单</button></div>`;$('fhPanel').hidden=false}
function fsGo(id){const f=FS;SAVE.fsh.spot=id;persist();f.sh=[];f.bob=null;f.ph='idle';f.bite=null;f.F=null;f.chumAt=null;f.iw=null;for(let i=0;i<4;i++)fsSpawn(true);$('fhPanel').hidden=true;toast(`${fsSpot().ic} ${fsSpot().n}`,1.6);fhTop()}

/* 拍照：小鱼和鱼的合影，存到手机相册 */
function fsPhoto(sh){const c=document.createElement('canvas'),S=4,w=90,h=120;c.width=w*S;c.height=h*S;const g=c.getContext('2d'),[k0,k1,s0,s1]=todCol(FS.tod);
  for(let i=0;i<12;i++){g.fillStyle=mixc(k0,k1,i/11);g.fillRect(0,i*5*S,w*S,5*S+1)}for(let i=0;i<8;i++){g.fillStyle=mixc(s0,s1,i/7);g.fillRect(0,(60+i*4)*S,w*S,4*S+1)}
  g.fillStyle='#fff8ec';g.fillRect(0,92*S,w*S,28*S);const t=document.createElement('canvas');t.width=w;t.height=92;const tc=t.getContext('2d');drawFsp(tc,sh.s.id,48,52,54,1,0,sh.st);
  g.imageSmoothingEnabled=false;g.drawImage(t,0,0,w,92,0,0,w*S,92*S);g.fillStyle='#2a2a44';g.textAlign='center';g.font=`bold ${8*S}px sans-serif`;g.fillText(sh.s.n+' '+'★'.repeat(sh.st),w*S/2,102*S);
  g.font=`${5*S}px sans-serif`;const d=new Date();g.fillText(`${sh.len} 厘米 · ${fsSpot().n} · ${d.getFullYear()}.${d.getMonth()+1}.${d.getDate()}`,w*S/2,110*S);g.fillStyle='#8a8a9a';g.font=`${4*S}px sans-serif`;g.fillText('小鱼快跑 · 钓鱼手帐',w*S/2,116*S);
  c.toBlob(b=>{if(!b)return;const name=`小鱼快跑-${sh.s.n}-${sh.len}cm.png`;try{const file=new File([b],name,{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[file]})){navigator.share({files:[file]}).catch(()=>{});return}}catch(e){}
    const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500);toast('照片存好了',1.6)},'image/png');SAVE.fsh.photos=(SAVE.fsh.photos||0)+1;persist()}

/* 各钓点的远景和近景 */
function fsHorizon(sp,hy,night,se1,t){
  if(sp==='stern'){const isl=night>.5?'#1a2448':mixc(se1,'#2a4a3a',.5);for(let i=0;i<CW;i++){const h=Math.max(0,Math.round(2.2*Math.sin(i*.09+1)+Math.sin(i*.23)*1.2-.6));if(h>0)R(i,hy-h,1,h,isl)}
    const lx=Math.round(CW*.82);R(lx,hy-7,1,7,night>.5?'#3a4468':'#f1f1f1');if(night>.3&&Math.sin(t*2.4)>-.2){R(lx-1,hy-8,3,1,'#fff6c0');R(lx+2,hy-8,6,1,'rgba(255,240,170,.4)')}return}
  if(sp==='lagoon'){const c=night>.5?'#1a2a40':'#3f7a5a';for(let i=0;i<CW;i++){const h=Math.max(0,Math.round(1.5+Math.sin(i*.07)*1.2));R(i,hy-h,1,h,c)}
    for(const px0 of [.12,.3,.7]){const x=Math.round(CW*px0);R(x,hy-9,1,8,c);for(let k=-1;k<=1;k+=2){R(x+k,hy-10,3*k,1,c);R(x+k*3,hy-9,2*k,1,c)}R(x-1,hy-11,3,1,c)}return}
  if(sp==='mangrove'){const c=night>.5?'#0e1a20':'#244a30',c2=night>.5?'#16242a':'#34603e';for(let i=0;i<CW;i++){const h=Math.round(6+Math.sin(i*.21)*2+Math.sin(i*.07+2)*2);R(i,hy-h,1,h+1,c);if((i*7)%5<2)R(i,hy-h-1,1,1,c2)}
    for(let i=0;i<CW;i+=4)R(i,hy+1,1,2,c);return}
  /* 礁盘外沿：远处的浪一排排碎开 */
  const c=night>.5?'#1a2448':mixc(se1,'#2a4a6a',.4);for(let i=0;i<CW;i++)if(Math.sin(i*.05)>.6)R(i,hy-1,1,1,c);
  for(let i=0;i<CW;i++){const u=(Math.sin(i*.3+t*2)+Math.sin(i*.11-t))*.5;if(u>.2)R(i,hy+2+Math.round(u*2),1,1,`rgba(255,255,255,${.4+u*.4})`)}}
function fsSea(sp,se0,se1,day){if(sp==='lagoon')return[mixc(se0,'#7fe0d8',.4*day),mixc(se1,'#2fb0b8',.45*day)];if(sp==='mangrove')return[mixc(se0,'#3a5a46',.45),mixc(se1,'#1e3a2e',.5)];
  if(sp==='reef')return[mixc(se0,'#2a6ab0',.2),mixc(se1,'#0a2a66',.35)];return[se0,se1]}
/* 近景：沙滩、树根、礁石（船尾在 17a 里画） */
function fsFore(sp,gy,night,t){const dk=c=>night>0?mixc(c,'#1a1830',.55*night):c;
  if(sp==='lagoon'){R(0,gy-3,CW,CH2-gy+3,dk('#e6d3a0'));R(0,gy-3,CW,2,dk('#c9b480'));for(let x=0;x<CW;x+=3){const o=Math.round(Math.sin(t*1.5+x*.3)*1.5);R(x+o,gy-5,2,1,'rgba(255,255,255,.65)')}
    for(let i=0;i<9;i++)R((i*37+5)%CW,gy+3+(i*13)%Math.max(4,CH2-gy-6),2,1,dk('#d2bc88'));R(Math.round(CW*.18),gy+6,2,2,dk('#f4a0a0'));R(Math.round(CW*.7),gy+10,3,1,dk('#ffd9a0'));R(Math.round(CW*.7)+1,gy+9,1,3,dk('#ffd9a0'));
    const px0=Math.round(CW*.9);for(let i=0;i<30;i++)R(px0-Math.round(i*.25),gy-i,2,1,dk('#8a6a3a'));const tx=px0-8,ty=gy-30,fc=dk('#3f8a4a');for(let k=0;k<6;k++){const a=k/6*Math.PI*2+Math.sin(t)*.05;for(let r=1;r<9;r++)R(tx+Math.cos(a)*r,ty+Math.sin(a)*r*.5+r*r*.04,1,1,fc)}
    R(Math.round(CW*.42)-12,gy-6,5,5,dk('#4a8ad0'));R(Math.round(CW*.42)-12,gy-6,5,1,dk('#7ab0ea'));return}
  if(sp==='mangrove'){R(0,gy,CW,CH2-gy,dk('#3a2a1c'));R(0,gy,CW,2,dk('#5a4028'));
    R(0,gy,CW,3,dk('#6a4a30'));R(0,gy,CW,1,dk('#8a6440'));for(let i=0;i<7;i++){const x0=Math.round(CW*(i/6))+((i%2)?4:-3),w=12+(i%3)*5,h=10+(i%2)*6;for(let k=0;k<=w;k++){const u=k/w,y=gy-Math.round(Math.sin(u*Math.PI)*h);R(x0-w/2+k,y,1,2,dk('#5a4030'));if(k%4===0)R(x0-w/2+k,y,1,1,dk('#7a5a3a'))}}
    for(const s of [-1,1]){const x=s<0?2:CW-5;R(x,0,4,gy,dk('#2a1e14'));for(let r=0;r<14;r++)R(x+s*r*.8,Math.round(gy*.15+r),1,1,dk('#2a1e14'))}
    const cc=dk('#1e3a24');for(let i=0;i<CW;i++){const h=Math.round(5+Math.sin(i*.4)*2+(i<CW*.2||i>CW*.8?6:0));R(i,0,1,h,cc)}return}
  /* 礁石 */
  R(0,gy,CW,CH2-gy,dk('#5a5a66'));for(let i=0;i<CW;i++){const h=Math.round(Math.sin(i*.37)*1.5+Math.sin(i*.13)*1.5);if(h>0)R(i,gy-h,1,h,dk('#5a5a66'))}
  for(let i=0;i<4;i++)El(Math.round(CW*(.12+i*.24)),gy+6+(i%2)*6,4+(i%2),1.5,dk('#3a7ab0'));for(let i=0;i<10;i++)R((i*29+7)%CW,gy+3+(i*11)%Math.max(4,CH2-gy-6),1,1,dk(['#ff8a7a','#ffd23f','#8ef5b4'][i%3]));
  if(Math.random()<.02){for(let i=0;i<6;i++)FS.spl.push({x:Math.random()*CW,y:gy-2,vx:(Math.random()-.5)*20,vy:-20-Math.random()*15,t:0})}}
/* 画图鉴里的新鱼形状 */
function drawFsp2(c,sh,cx,cy,L,H,d,f){
  if(sh==='barra')for(let i=0;i<5;i++)fR(c,cx-L*.3+i*L*.14,cy-H*.4,1,H*.5,f[2]);
  if(sh==='snap')fR(c,cx-d*L*.05-(d<0?L*.3:0),cy-H/2-1,L*.3,Math.max(1,H*.14),f[2]);
  if(sh==='surg'){fR(c,cx-d*L*.34-(d<0?2:0),cy-1,2,2,'#ffffff');fR(c,cx-L*.3,cy-H*.4,L*.6,1,f[2])}
  if(sh==='trev'){fR(c,cx-d*L*.1-(d<0?L*.36:0),cy-H/2-1,L*.36,Math.max(1,H*.16),f[2]);fR(c,cx-d*L*.1-(d<0?L*.36:0),cy+H/2,L*.36,Math.max(1,H*.12),f[2])}
  if(sh==='moon'){for(let i=0;i<8;i++)fR(c,cx-L*.3+((i*37)%10)/10*L*.6,cy-H*.3+((i*23)%10)/10*H*.5,1,1,'#ffffff');fR(c,cx-d*L*.05-(d<0?L*.2:0),cy-H/2-2,L*.2,2,f[2]);fR(c,cx-d*L*.05-(d<0?L*.2:0),cy+H/2,L*.2,2,f[2])}
  if(sh==='bone')fR(c,cx-L*.36,cy,L*.7,1,f[2])}
function drawJunk(c,id,cx,cy,L){const f=FXC[id];
  if(id==='bottle'){fR(c,cx-L*.35,cy-L*.12,L*.55,L*.24,f[1]);fR(c,cx+L*.2,cy-L*.06,L*.18,L*.12,f[1]);fR(c,cx+L*.38,cy-L*.07,L*.06,L*.14,'#a8703f');fR(c,cx-L*.25,cy-L*.06,L*.3,L*.1,'#f4ecd0');fR(c,cx-L*.3,cy-L*.1,L*.4,1,f[0])}
  else if(id==='sandal'){fE(c,cx,cy,L*.42,L*.16,f[1]);fE(c,cx,cy,L*.36,L*.11,f[0]);fR(c,cx-L*.05,cy-L*.12,L*.1,L*.1,f[2]);fR(c,cx-L*.18,cy-L*.06,L*.36,1,f[2])}
  else{fE(c,cx,cy,L*.32,L*.3,f[1]);fR(c,cx-L*.1,cy-L*.12,2,2,f[2]);fR(c,cx+L*.04,cy-L*.12,2,2,f[2]);fR(c,cx-L*.03,cy-L*.02,2,2,f[2])}}
