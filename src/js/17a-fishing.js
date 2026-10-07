/* ---------- 船尾钓鱼（第二卷第二章通关后解锁） ---------- */
Object.assign(FISH,{milkfish:{n:'遮目鱼',c:['#f2f8fa','#a9c6d0','#5d8796'],s:1,x:1},mahi:{n:'鲯鳅',c:['#fff3a8','#5cc47a','#2f7fc0'],s:1,x:1}});
DISH.push({id:'d73',ic:'🍲',n:'椰浆遮目鱼',need:{milkfish:1,coco:1},p:56},{id:'d74',ic:'🐟',n:'炭烤鲯鳅',need:{mahi:1},p:60});
Object.assign(UNL,{d73:[14,2],d74:[14,2]});METHOD.pot.push('d73');METHOD.grill.push('d74');
Object.assign(RCP,{
d73:['遮目鱼一条、椰浆、姜、青葱、盐',['遮目鱼刺多，买的时候请鱼贩去刺，或者只用鱼肚。','姜片下锅，倒入椰浆小火煮开，加一点盐。','放入鱼块，盖上盖子焖八分钟，撒葱花。'],'遮目鱼在台湾叫“虱目鱼”，在菲律宾是最常吃的鱼，常用来煮酸汤或煎鱼肚。'],
d74:['鲯鳅鱼排、盐、青柠',['鱼排擦干，两面抹盐。','烤架或平底锅中大火，每面三四分钟，烤到鱼肉刚好不透明。','挤上青柠汁。'],'鲯鳅在夏威夷叫 mahi-mahi，肉白而结实，最常见的做法就是烤。']});
/* 鱼：性格 k，长度范围（厘米），体重系数 kg（每米长度的立方），出没的远近 zone（0 天边，1 船边），各时段的多少 w：白天、黄昏、夜里、清晨 */
const FSP=[
 {id:'milkfish',n:'遮目鱼',k:'calm',len:[35,100],kg:9,sh:'slim',zone:[.35,.85],w:[3,3,2,3],tip:'成群在船边慢慢游，什么时候都有',zw:.3},
 {id:'flyfish',n:'飞鱼',k:'jump',len:[18,40],kg:6,sh:'wing',zone:[.25,.7],w:[1,4,1,2],tip:'傍晚最多，咬钩以后会跳出水面',zw:.25},
 {id:'skipjack',n:'鲣鱼',k:'dart',len:[40,90],kg:14,sh:'tuna',zone:[.03,.4],w:[3,1,.3,2],tip:'白天在远处成群，力气大，会突然乱窜',zw:.21},
 {id:'parrot',n:'鹦嘴鱼',k:'calm',len:[25,70],kg:16,sh:'parrot',zone:[.6,.97],w:[3,1,.4,2],tip:'白天在船边的珊瑚旁',zw:.26},
 {id:'grouper',n:'石斑鱼',k:'sink',len:[35,100],kg:17,sh:'grouper',zone:[.6,.97],w:[.5,1,3,1],tip:'夜里在船底附近，咬住了就往下钻',zw:.18},
 {id:'mahi',n:'鲯鳅',k:'jump',len:[60,140],kg:8,sh:'mahi',zone:[.03,.35],w:[1.5,.6,.2,1],tip:'白天在最远的地方，个头最大，也会跳',zw:.17}];
const FK={calm:'老实',dart:'乱窜',sink:'下沉',jump:'跃水'},FKEEP=5;
const DRK=[{id:'tea',ic:'🍋',n:'冰柠檬茶',who:'阿珍',say:'我算过了，这杯算你的。',e:'水下的鱼影看得更清楚，稀有的鱼身上会闪光'},
 {id:'coffee',ic:'☕',n:'热咖啡',who:'阿强',say:'可以。',e:'真咬钩时浮漂会亮一圈，点的时间也更宽'},
 {id:'coco',ic:'🥥',n:'椰子水',who:'小帆',say:'刚从树上摘的！',e:'遛鱼时线的安全区更宽，绷紧也能多撑一会儿'}];
const DRKP=10,DRKT=240;
/* 钓具箱：鱼竿、鱼线、鱼钩各选一样，鱼饵一次用一种；潮印是放鱼回海换来的 */
const GEAR={rod:{n:'鱼竿',l:[{id:'hand',n:'贝壳钩手线',d:'小帆偷拿来的，只有一根线'},{id:'mm',n:'墨墨钓竿',d:'收线快一些，绿区宽一点',shop:1},{id:'bamboo',n:'老舵的老竹竿',d:'收线最快，绿区最宽',tide:90,ch3:1}]},
 line:{n:'鱼线',l:[{id:'coir',n:'椰子纤维线',d:'绷进红色很快就会断开'},{id:'nylon',n:'尼龙线',d:'线绷紧时能多撑一会儿',tide:20},{id:'braid',n:'编织线',d:'线绷紧时能撑很久',tide:60}]},
 hook:{n:'鱼钩',l:[{id:'shell',n:'贝壳钩',d:'爷爷磨的'},{id:'iron',n:'铁钩',d:'真咬钩时点的时间更宽；鱼跳起来时扬竿更从容，没扬到也只掉一点',tide:30}]}};
const BAIT=[{id:'dough',ic:'🍙',n:'面团',d:'什么鱼都吃一点，用不完'},{id:'shrimp',ic:'🦐',n:'虾仁',d:'鱼来得快一倍',p:20,pk:10},
 {id:'squid',ic:'🦑',n:'鱿鱼条',d:'大鱼更爱咬，远处的鲣鱼和鲯鳅更多',p:25,pk:5},{id:'glow',ic:'✨',n:'萤光饵',d:'发光的三星鱼多来三倍',tide:10,pk:5}];
const RACKP=120;
SAVE=Object.assign({fsh:{dex:{},day:'',kept:0,n:0,air:0,airMax:0,free:'',dr:null}},SAVE);
function fsInit(){const f=SAVE.fsh,d={tide:0,tideAll:0,rel:0,gear:{rod:'hand',line:'coir',hook:'shell',bait:'dough'},own:{},baits:{},auto:{own:0,on:0,ts:0}};for(const k in d)if(f[k]===undefined)f[k]=d[k];
  if(SAVE.tools.rod&&!f.own.mm){f.own.mm=1;if(f.gear.rod==='hand')f.gear.rod='mm'}}
const gOwn=(slot,it)=>!it.tide&&!it.shop||!!SAVE.fsh.own[it.id];
const gLv=slot=>GEAR[slot].l.findIndex(x=>x.id===SAVE.fsh.gear[slot]);
const fsBait=()=>{const g=SAVE.fsh.gear;if(g.bait!=='dough'&&g.bait!=='none'&&!(SAVE.fsh.baits[g.bait]>0))g.bait='dough';return g.bait};
/* 解锁剧情：小帆用爷爷磨的贝壳钩教小鱼钓鱼 */
Object.assign(SCN,{fDeck:{bg:'shore',deck:1,dusk:1,cast:[['kid',.3,'g'],['xiaofan',.58,'g',1]]},
 fCrew:{bg:'shore',deck:1,dusk:1,cast:[['kid',.16,'g'],['xiaofan',.36,'g',1],['xiaoman',.56,'g',1],['aqiang',.72,'g',1],['octo',.9,'g',1]]},
 fNight:{bg:'shore',deck:1,night:1,stars:1,cast:[['kid',.36,'g'],['xiaofan',.6,'g',1]]}});
STORY.fish0=[['旁白','那天傍晚，船尾挂起一盏灯。小鱼抱着抄网，看着空空的鱼篓发呆。','fDeck'],['小帆','抄网捞了一下午，捞上来几条？','fDeck'],
 ['小鱼','……三条。还有一条是自己跳进船里的。','fDeck',{em:'…'}],['小帆','坐下。','fDeck'],['旁白','小帆从口袋里摸出一枚亮闪闪的贝壳钩，钩上拴着一卷椰子纤维搓的细线。','fDeck'],
 ['小帆','爷爷年轻时磨的。我偷拿的，你别告诉他。','fDeck',{cut:1}],['小鱼','就这么一根线？连竿子都没有？','fDeck',{em:'?'}],
 ['小帆','爷爷说，鱼不是抓来的，是请来的。你一急，它就不来。','fDeck'],
 ['阿珍','钓鱼？那我得算算——钓上来的鱼，算小馆的还是算你的？','fCrew',{em:'!'}],['阿珍','……算了。冰柠檬茶，我算过了，这杯算你的。','fCrew'],
 ['阿强','可以。','fCrew'],['旁白','阿强在小鱼脚边放下一杯热咖啡，又走了。','fCrew'],
 ['墨墨','钓鱼？好啊！饵、钩、小板凳，我那儿都有……亏本卖！','fCrew',{em:'!'}],
 ['小帆','还有一条规矩：今天要几条，就留几条。剩下的，放回去。','fNight'],['小鱼','……奶奶也是这么说的。','fNight',{em:'…'}],
 ['旁白','浮漂沉下去的那一刻，小鱼忽然知道，水下那条鱼在想什么。','fNight'],
 ['小鱼','明天就把这钩子还给你——它咬了！它咬了！','fNight',{em:'!',shake:1}],['旁白','主菜单多了一个去处：船尾钓鱼。','fNight']];
GAL.splice(GAL.findIndex(g=>g[0]==='post13')+1,0,['fish0','第二章之后 · 船尾的贝壳钩']);
/* 托竿架：第三章遇到老舵以后，用潮印找他换 */
SCN.fRack={bg:'shore',deck:1,dusk:1,cast:[['kid',.3,'g'],['laoduo',.62,'g',1]]};
STORY.fish1=[['老舵','听说船尾有个小子，钓上来的鱼大半都放回去了。','fRack'],['小鱼','……是我。菜篮装不下了。','fRack',{em:'…'}],
 ['老舵','我年轻的时候也这样。后来做了这个。','fRack'],['旁白','老舵把一个旧木架绑在栏杆上，架子顶上挂着一个小铜铃。','fRack'],
 ['老舵','竿子架上去，铃一响，它自己会收。你不在船上的时候，它也替你守着。','fRack'],['老舵','钓上来的，它都替你放回去。规矩不能坏。','fRack',{cut:1}],
 ['小鱼','那我呢？','fRack',{em:'?'}],['老舵','你？喝你的柠檬茶去。','fRack'],['旁白','船尾多了一根托竿。','fRack']];
GAL.splice(GAL.findIndex(g=>g[0]==='fish0')+1,0,['fish1','船尾 · 老舵的托竿架']);
/* 低保真的钓鱼音乐 */
TRK.fish={bpm:70,root:51,mo:12,bell:1,kick:1,ch:[[0,4,11],[-3,3,7],[-7,0,4],[-5,2,5]],
 A:'7 . . 4 . 2 . 0 - - . . 4 . 7 . 11 - . 9 . 7 . 4 - - . 2 . . . .',
 B:'12 - . 11 . 7 . 4 - . . 7 . 9 . 11 - . . 9 . 7 . 4 2 - . 0 - - . .'};
{const t=TRK.fish,a=t.A.split(' '),b=t.B.split(' ');t.seq=[...a,...a,...b,...a]}

const fR=(c,x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.max(1,Math.round(w)),Math.max(1,Math.round(h)))};
const fE=(c,cx,cy,rx,ry,col)=>{c.fillStyle=col;cx=Math.round(cx);cy=Math.round(cy);rx=Math.max(1,Math.round(rx));ry=Math.max(0,Math.round(ry));for(let y=-ry;y<=ry;y++){const w=Math.round(rx*Math.sqrt(Math.max(0,1-(y*y)/(ry*ry+.3))));c.fillRect(cx-w,cy+y,w*2+1,1)}};
/* 一条鱼的像素画：c 画布，(cx,cy) 中心，L 身长（像素），d 朝向（1 向右），st 星级 */
function drawFsp(c,id,cx,cy,L,d,t,st){if(JUNK.some(j=>j.id===id)){drawJunk(c,id,cx,cy,L);return}const f=(FISH[id]||{c:FXC[id]}).c,sp=FSP.find(s=>s.id===id),sh=sp?sp.sh:'slim',H=L*({slim:.27,wing:.28,tuna:.34,parrot:.44,grouper:.4,mahi:.38,bone:.26,snap:.38,barra:.17,surg:.56,trev:.44,moon:.66}[sh]),b=cx-d*L/2,fx=cx+d*L/2,w=Math.sin(t*10)>0?1:0;
  const tl=Math.max(2,Math.round(L*.2));for(let k=0;k<=tl;k++){const x=b-d*k-(d<0?0:1),o=Math.round(k*.9);fR(c,x,cy-1-o-w,1,2,f[2]);fR(c,x,cy+o-1+w,1,2,f[2])}fR(c,b-(d<0?0:1),cy-1,1,2,f[2]);
  if(sh==='mahi')fR(c,cx-d*L*.38-(d<0?L*.72:0),cy-H/2-1,L*.72,Math.max(1,H*.18),f[2]);else fR(c,cx-d*L*.12-(d<0?L*.24:0),cy-H/2-1,L*.24,Math.max(1,H*.14),f[2]);
  fE(c,cx,cy,L/2,H/2,f[1]);fE(c,cx,cy+H*.22,L*.4,H*.22,f[0]);fR(c,cx-L*.36,cy-H/2+1,L*.72,1,f[2]);
  if(sh==='tuna')for(let i=0;i<3;i++)fR(c,cx-L*.28+i*L*.17,cy+H*.12,L*.11,1,f[2]);
  if(sh==='grouper')for(let i=0;i<7;i++)fR(c,cx-L*.3+((i*37)%10)/10*L*.55,cy-H*.3+((i*17)%10)/10*H*.5,1,1,f[2]);
  if(sh==='parrot'){for(let i=0;i<5;i++)fR(c,cx-L*.25+i*L*.12,cy-H*.1+(i%2),1,1,f[0]);fR(c,fx-(d>0?2:0),cy,2,2,'#f2f2e0')}
  if(sh==='mahi'){fR(c,fx-(d>0?2:0)-d*1,cy-H/2+1,2,H*.7,f[1]);for(let i=0;i<4;i++)fR(c,cx-L*.2+i*L*.14,cy-H*.05+(i%2),1,1,'#2f7fc0')}
  if(sh==='wing')fE(c,cx-d*L*.06,cy-H*.55,L*.32,H*.45,'rgba(205,232,255,.9)');
  drawFsp2(c,sh,cx,cy,L,H,d,f);const ex=fx-d*L*.18-(d<0?1:0),ey=cy-H*.18;if(L>=14)fR(c,ex-(d>0?0:1),ey-1,2,2,'#ffffff');fR(c,ex,ey,1,1,'#1b2a41');
  if(st>=3)for(let i=0;i<4;i++)if(Math.sin(t*5+i*1.7)>.2)fR(c,cx+Math.cos(i*1.6+t)*L*.55,cy+Math.sin(i*1.6+t)*H*.8,1,1,'#fff6b0')}

let FS=null;
const fsPhase=tod=>tod<.25?0:tod<.45?1:tod<.8?2:3;
function fshDay(){const f=SAVE.fsh;if(f.day!==today()){f.day=today();f.kept=0}}
function fsRoll(spot){spot=spot||fsSpot().id;const ph=fsPhase(FS.tod),sq=fsBait()==='squid',wt=s=>s.leg?0:s.w[ph]*(s.sp[spot]||0)*(sq&&s.zone[1]<.5?2:1),tot=FSP.reduce((a,s)=>a+wt(s),0);let r=Math.random()*tot;for(const s of FSP){r-=wt(s);if(r<=0)return s}return FSP[0]}
function fsSpawn(init,near){const s=fsRoll(),bt=fsBait(),fr=Math.pow(Math.random(),bt==='squid'?.8:1.6),r=Math.random(),tea=FS.cup&&FS.cup.id==='tea',s3=(tea?.08:.05)*(bt==='glow'?3:1);
  const z=near?near.z:s.zone[0]+Math.random()*(s.zone[1]-s.zone[0]);
  const sh={s,fr,len:Math.round(s.len[0]+fr*(s.len[1]-s.len[0])),st:r<s3?3:r<.3?2:1,z,x:init?Math.random():near?near.x:(Math.random()<.5?-.08:1.08),tz:z,tx:Math.random(),st2:'roam',cool:0,ph:Math.random()*9};
  if(near){sh.x=clamp(near.x+(Math.random()<.5?-1:1)*.18,0,1)}FS.sh.push(sh);return sh}
function startFish(){G=null;state='menu';hud.hidden=true;$('toast').className='';fsInit();fshDay();
  FS={t:0,tod:.3,ph:'idle',sh:[],bob:null,hold:false,pow:0,pdir:1,aim:.5,F:null,bite:null,pity:0,air:0,wt:0,chk:0,hint:'',rip:[],spl:[],cup:SAVE.fsh.dr&&SAVE.fsh.dr.left>0?SAVE.fsh.dr:null,clk:0,ps:4,at:20+Math.random()*25,ab:null,wxT:5,rain:0,rainA:0,legT:4,cnt:0,iwaPet:0};
  for(let i=0;i<4;i++)fsSpawn(true);$('fhCard').hidden=true;$('fhPanel').hidden=true;show('');$('fishHud').hidden=false;fhTop();
  if(!SAVE.fsh.n)setTimeout(()=>{if(FS)toast('慢慢来。这里没有倒计时',2.6)},600);fsAway()}
function quitFish(){if(!FS)return;const cnt=FS.cnt||0;setTimeout(()=>{if(cnt>=8)toast(`今天爆护了！一共上了 ${cnt} 条`,3)},400);SAVE.fsh.dr=FS.cup&&FS.cup.left>0?FS.cup:null;SAVE.fsh.auto.ts=Date.now();persist();FS=null;$('fishHud').hidden=true;toMenu()}
function fhTop(){fshDay();const f=SAVE.fsh,bt=BAIT.find(b=>b.id===fsBait());$('fhKeep').textContent=`🌊 ${f.tide}`;$('fhKeep').title='潮印';$('fhBait').textContent=`${bt.ic}${bt.id==='dough'||bt.id==='none'?' '+bt.n:' ×'+f.baits[bt.id]}`;const c=FS&&FS.cup,dk=c&&DRK.find(d=>d.id===c.id);
  $('fhDrink').hidden=!dk;if(dk)$('fhDrink').textContent=`${dk.ic} ${dk.n} 还剩 ${Math.max(1,Math.ceil(c.left/60))} 分钟`}
function fhHint(s){if(FS.hint===s)return;FS.hint=s;$('fhHint').textContent=s;$('fhHint').hidden=!s}
/* 坐标：鱼影和浮漂用 x（0 到 1，左到右）和 z（0 天边，1 船边） */
let FL={hy:60,gy:150};
const fsY=z=>FL.hy+3+z*(FL.gy-FL.hy-7),fsP=z=>.45+.55*z,fsTip=()=>({x:Math.round(CW*.42)+15,y:FL.gy-30-(FL.lift||0)});
function fsCast(){const p=FS.pow;FS.bob={x:FS.aim,z:clamp(.92-p*.9,.02,.92),fly:0,dip:0,sink:0};FS.ph='fly';FS.hold=false;CSND.whoosh();SAVE.fsh.cast=(SAVE.fsh.cast||0)+1}
function fsBack(empty){if(empty){FS.air++;FS.pity=Math.min(3,FS.pity+1);SAVE.fsh.air++;SAVE.fsh.airMax=Math.max(SAVE.fsh.airMax,FS.air);
    if(FS.air===5)toast('小帆：“爷爷说，空军的日子，海在教你耐心。”',3.4);persist()}
  if(FS.bite&&FS.bite.sh)FS.bite.sh.st2='roam';FS.bite=null;FS.F=null;FS.ph='back';FS.backT=0}
function fsDown(x){if(!FS||!$('fhCard').hidden||!$('fhPanel').hidden)return;const ph=FS.ph;
  if(ph==='idle'){FS.ph='charge';FS.hold=true;FS.pow=0;FS.pdir=1;FS.aim=clamp(x,.06,.94);SFX.tap();return}
  if(ph==='wait'){const b=FS.bite;if(b&&b.k==='sink'){fsHook();return}
    if(b){b.sh.st2='flee';b.sh.cool=6;FS.bite=null;toast('太急了！它吓跑了',1.8);snd(300,.25,'sine',.06,180);return}
    fsBack(FS.wt>3);return}
  if(ph==='fight'){FS.hold=true;const F=FS.F;if(F.jump>0&&!F.ok){F.ok=1;F.d=Math.max(0,F.d-8);F.flash=.4;snd(880,.12,'triangle',.1,1320)}}}
function fsMove(x){if(FS&&FS.ph==='charge')FS.aim=clamp(x,.06,.94)}
function fsUp(){if(!FS)return;FS.hold=false;if(FS.ph==='charge')fsCast()}
/* 遛鱼：白线是松紧，按住往右、松开往左，有惯性；绿区是鱼让你收线的空当，鱼一挣扎绿区就跑。白线在绿区里才收得动线 */
const fsZw=sh=>{const c=FS.cup&&FS.cup.id==='coco';return sh.s.zw*(1-.2*sh.fr)+[0,.02,.04][Math.max(0,gLv('rod'))]+(c?.05:0)};
function fsUse(){const g=SAVE.fsh.gear,b=g.bait;if(b==='dough'||b==='none')return;SAVE.fsh.baits[b]=Math.max(0,(SAVE.fsh.baits[b]||0)-1);if(!SAVE.fsh.baits[b]){g.bait='dough';toast(`${BAIT.find(x=>x.id===b).n}用完了，换回面团`,2)}persist();fhTop()}
function fsHook(){const b=FS.bite;let sh=b.sh;if(!sh.s.leg&&!FS.noJunk&&Math.random()<.05){const j=JUNK[Math.floor(Math.random()*JUNK.length)];sh.st2='roam';sh.cool=4;sh={s:Object.assign({sh:'junk',len:[0,0],kg:0,tip:'',sp:{},w:[0,0,0,0],zone:[.5,.5],junk:1},j),fr:.2,len:0,st:1,z:sh.z,x:sh.x}}
  const k=sh.s.k,str=sh.s.leg?1.15:sh.s.junk?.3:{calm:.5,dart:.72,sink:.95,jump:.68}[k]*(.6+.8*sh.fr),dmax=sh.s.leg?150:100;FS.bite=null;fsUse();const zw=fsZw(sh);$('toast').className='';
  FS.F={sh,d:dmax,dmax,T:.15,v:0,c:.5,tc:.5,zw,ct:.8,danger:0,str,bt:1.5+Math.random()*1.5,burst:0,jt:2+Math.random()*1.5,jump:0,ok:0,z0:FS.bob.z,x0:FS.bob.x,first:1};FS.ph='fight';sh.st2='hook';
  snd(520,.16,'triangle',.12,1040);CSND.splash();if(navigator.vibrate)try{navigator.vibrate(40)}catch(e){}}
function fsLand(){const F=FS.F;FS.ph='land';FS.landT=0;FS.land=F.sh;FS.sh=FS.sh.filter(s=>s!==F.sh);FS.F=null;FS.air=0;FS.pity=0;FS.cnt++;CSND.splash();SFX.win()}
function fsEscape(msg){const F=FS.F,sh=F.sh;sh.st2='roam';sh.cool=5;sh.back=1;sh.z=clamp(F.z,.02,.97);sh.x=clamp(F.x,0,1);sh.tx=Math.random();toast(msg,2.6);snd(300,.3,'sine',.06,150);fsBack(true)}
function fishUpdate(dt){const f=FS;f.t+=dt;f.tod=(f.tod+dt/480)%1;fsWeather(dt);fsLegend(dt);if(f.chumAt&&(f.chumAt.t-=dt)<=0)f.chumAt=null;if(f.iwaPet>0)f.iwaPet-=dt;fsIwaUpd(dt);fsChumBtn();
  if(f.cup){f.cup.left-=dt;if(f.cup.left<=0){f.cup=null;SAVE.fsh.dr=null;persist();toast('杯子空了',1.6)}if((f.chk-=dt)<=0){f.chk=1;fhTop()}}
  const tea=f.cup&&f.cup.id==='tea',cof=f.cup&&f.cup.id==='coffee',coco=f.cup&&f.cup.id==='coco';
  {const au=SAVE.fsh.auto;if(au.own&&au.on){au.ts=Date.now();if(f.ab){f.ab.t+=dt;if((f.ab.r-=dt)<=0){f.ab.r=.28;snd(1480,.08,'triangle',.06)}
    if(f.ab.t>=2.2){const r=fsAutoFish();f.ab=null;f.at=40+Math.random()*40;persist();fhTop();toast(`🔔 托竿上来一条${r.sh.s.n}，${r.sh.len} 厘米，放回去了 +${r.tv} 潮印`,2.8);CSND.splash()}}
    else if($('fhPanel').hidden&&$('fhCard').hidden&&(f.at-=dt)<=0)f.ab={t:0,r:0}}}
  /* 鱼影慢慢游 */
  for(const s of f.sh){s.ph+=dt;s.cool=Math.max(0,s.cool-dt);if(s.st2==='hook'||s.st2==='nib')continue;
    if(s.st2==='go'&&f.bob){const dx=f.bob.x-s.x,dz=f.bob.z-s.z,dd=Math.hypot(dx,dz*.7);const v=.07*dt;if(dd<.02){s.st2='nib';const n={calm:1,dart:2,sink:1,jump:2}[s.s.k];f.bite={sh:s,k:'gap',t:.5+Math.random()*.8,n:Math.floor(Math.random()*(n+1))+(Math.random()<.5?1:0)};continue}
      s.x+=dx/dd*v;s.z+=dz/dd*v;continue}
    const sp=s.st2==='flee'?.25:.035,dx=s.tx-s.x,dz=s.tz-s.z,dd=Math.hypot(dx,dz)||1;s.x+=dx/dd*sp*dt;s.z+=dz/dd*sp*dt*.5;
    if(dd<.03){s.tx=Math.random()*1.2-.1;s.tz=s.s.zone[0]+Math.random()*(s.s.zone[1]-s.s.zone[0]);if(s.st2==='flee')s.st2='roam'}}
  f.sh=f.sh.filter(s=>s.st2==='hook'||s.st2==='nib'||(s.x>-.15&&s.x<1.15));
  if(f.sh.filter(s=>s.st2!=='hook').length<4&&Math.random()<dt*.5)fsSpawn(false);
  /* 水花和涟漪 */
  f.rip=f.rip.filter(r=>(r.t+=dt)<1.2);f.spl=f.spl.filter(p=>{p.t+=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=60*dt;return p.t<.7});
  const ph=f.ph,b=f.bob;
  if(ph==='idle')fhHint(SAVE.fsh.n<2?'按住水面蓄力，松手抛竿。手指按在哪边，就往哪边抛':'按住蓄力，松手抛竿');
  if(ph==='charge'){f.pow+=f.pdir*dt/1.1;if(f.pow>=1){f.pow=1;f.pdir=-1}if(f.pow<=0){f.pow=0;f.pdir=1}fhHint('松手抛竿')}
  if(ph==='fly'){b.fly+=dt/.55;if(b.fly>=1){b.fly=1;f.ph='wait';f.wt=0;f.chk2=0;f.rip.push({x:b.x,z:b.z,t:0,r:1});CSND.splash()}fhHint('')}
  if(ph==='wait'){f.wt+=dt;const bt=f.bite;
    if(!bt){fhHint(SAVE.fsh.n<3?'等浮漂整个沉下去再点。轻轻点头的，是它在试探。点一下可以收竿':'等浮漂整个沉下去……');
      if((f.chk2-=dt)<=0){f.chk2=fsBait()==='shrimp'?.5:1;if(!f.sh.some(s=>s.st2==='go')){const cn=f.chumAt&&Math.hypot(f.chumAt.x-b.x,f.chumAt.z-b.z)<.2,nb=fsBait()==='none',R=.16+f.pity*.06+(cn?.12:0);
        const near=f.sh.filter(s=>s.st2==='roam'&&!s.cool&&Math.hypot(s.x-b.x,(s.z-b.z)*1.4)<R);
        const lg=near.find(s=>s.leg);if(lg&&Math.random()<.6)lg.st2='go';else if(near.length&&Math.random()<(.3+f.pity*.12+(f.rainA>.5?.1:0)+(cn?.3:0))*(nb?.25:1))near[Math.floor(Math.random()*near.length)].st2='go';
        else if(f.wt>(f.pity?5:9)*(fsBait()==='shrimp'?.5:1)*(nb?4:1)&&!near.length)fsSpawn(false,{x:b.x,z:clamp(b.z+(Math.random()-.5)*.1,.03,.95)}).st2='go'}}}
    else{bt.t-=dt;
      if(bt.k==='gap'&&bt.t<=0){if(bt.n>0){bt.n--;bt.k='dip';bt.t=.28;snd(640,.05,'sine',.05);f.rip.push({x:b.x,z:b.z,t:.5,r:.5})}else{bt.k='sink';bt.t=(cof?1.05:.75)+(SAVE.fsh.gear.hook==='iron'?.3:0);snd(440,.18,'triangle',.1,880);f.rip.push({x:b.x,z:b.z,t:0,r:1.3});if(navigator.vibrate)try{navigator.vibrate(60)}catch(e){}}}
      else if(bt.k==='dip'&&bt.t<=0){bt.k='gap';bt.t=.45+Math.random()*.9}
      else if(bt.k==='sink'&&bt.t<=0){bt.sh.st2='flee';bt.sh.cool=6;bt.sh.tx=bt.sh.x<.5?-.2:1.2;f.bite=null;toast('它把饵吃了就溜了……',2);fsUse();fsBack(true)}
      fhHint(bt.k==='sink'?'就是现在！点一下！':'等浮漂整个沉下去……')}}
  if(ph==='back'){f.backT+=dt/.45;fhHint('');if(f.backT>=1){f.ph='idle';f.bob=null}}
  if(ph==='fight'){const F=f.F,k=F.sh.s.k,rl=Math.max(0,gLv('rod')),ll=Math.max(0,gLv('line')),iron=SAVE.fsh.gear.hook==='iron',half=F.zw/2;
    if(k==='dart'){F.bt-=dt;if(F.bt<=0){if(F.burst>0){F.burst=0;F.bt=1.4+Math.random()*1.8}else{F.burst=1;F.bt=.8;F.ct=0;CSND.splash()}}}
    if(k==='jump'){if(F.jump>0){F.jump-=dt;if(F.jump<=0){if(!F.ok){F.d+=iron?5:10;snd(260,.15,'sine',.05,200)}F.jt=2.2+Math.random()*2}}else{F.jt-=dt;if(F.jt<=0&&F.d>12){F.jump=iron?1.3:.95;F.ok=0;F.ct=0;CSND.splash()}}}
    /* 绿区跟着鱼跑：老实的慢慢晃，乱窜的猛地一甩，下沉的往紧的那头拽，跃水的跳一下换个地方 */
    const mn=half+.02,mx=.96-half;F.ct-=dt;
    if(F.ct<=0){const r=Math.random();if(k==='sink'){F.tc=mn+(mx-mn)*(.45+r*.55);F.ct=1.2+Math.random()*1.4}
      else if(k==='dart'&&F.burst){F.tc=clamp(F.c+(F.c<.5?1:-1)*(.2+r*.2),mn,mx);F.ct=.9}else{F.tc=mn+(mx-mn)*r;F.ct=(k==='calm'?1.8:1.2)+Math.random()*1.4}}
    const sp={calm:.16,dart:.2,sink:.2,jump:.18}[k]*(.75+F.str*.5)*(F.burst?2.2:1)*(F.jump>0?1.1:1),dc=F.tc-F.c;
    F.c+=Math.sign(dc)*Math.min(Math.abs(dc),sp*dt)+Math.sin(f.t*2.3)*.03*dt;F.c=clamp(F.c,mn,mx);
    /* 白线：按住往右推，松开往左落；下沉的鱼一直往回拽，乱窜时拽得更狠 */
    const acc=(f.hold?1.5:-1.3)-(k==='sink'?.3:0)-(F.burst?.4:0);F.v=(F.v+acc*dt)*(1-2*dt);F.T+=F.v*dt;
    if(F.T<0){F.T=0;F.v=Math.max(0,F.v)}if(F.T>1){F.T=1;F.v=Math.min(0,F.v)}
    const lo=F.c-half,hi=F.c+half,pull=F.str*(F.burst?2:1);
    if(F.T>=lo&&F.T<=hi){F.d-=12*[1,1.1,1.2][rl]/(.7+F.str*.4)*dt*(F.burst?.5:1);if(f.hold&&(f.clk-=dt)<=0){f.clk=.07;snd(1900+Math.random()*300,.012,'square',.012)}}
    else if(F.T<lo)F.d+=(2+pull*2)*dt;else{F.d+=1*dt;F.danger+=dt}
    if(F.T<=hi)F.danger=Math.max(0,F.danger-dt*1.5);
    const z=F.z0+(.97-F.z0)*(1-clamp(F.d,0,F.dmax)/F.dmax),x=F.x0+(fsTip().x/CW-F.x0)*(1-clamp(F.d,0,F.dmax)/F.dmax)*.7+(F.c-.5)*.12+Math.sin(f.t*(F.burst?7:2))*(F.burst?.04:.015);F.z=z;F.x=x;f.bob.z=clamp(z,.02,.97);f.bob.x=clamp(x,0,1);
    if(Math.random()<dt*(F.burst?8:2))f.spl.push({x:x*CW+(Math.random()-.5)*3,y:fsY(z),vx:(Math.random()-.5)*14,vy:-10-Math.random()*8,t:0});
    fhHint(F.jump>0&&!F.ok?'跳了！快点一下':F.T>hi?'太紧了，松手':SAVE.fsh.n<3?(F.T<lo?'按住收线':'让白线待在绿色里'):'');
    if(F.danger>1+[0,.3,.6][ll]+(f.cup&&f.cup.id==='coco'?.3:0)+(SAVE.fsh.n<3?.8:0))fsEscape('线绷得太紧，它挣脱了。别急，它可能还会回来');
    else if(F.d>=F.dmax+30)fsEscape('它游远了，线收不回来……');else if(F.d<=0)fsLand()}
  if(ph==='land'){f.landT+=dt/.8;fhHint('');if(f.landT>=1){f.ph='card';fsCard(f.land)}}
  ambSet({wave:.06,wind:.012},f.t);if(SAVE.music!==0&&!SAVE.mute&&Math.random()<dt*3)nz(.015,'highpass',3500,0,.025)}

const SAYK=['……刚才我就是被这么拽着跑的吧。','它看我的眼神，和我看墨墨的一样。','我当鱼的时候，可没这么傻。','这条要是拍下来，阿潮肯定说是假的。','明天就……算了，再钓一条。','对不住了。不过你真的很好看。'];
const SAYR=['小帆：“它会记得你的。”','小帆：“放它回去，明天它带朋友来。”','小鱼：“去吧。别再咬陌生人的钩了。”','小帆：“爷爷说，海里的鱼是借给我们看的。”'];
const fsTide=sh=>1+(sh.st-1)*2+Math.round(sh.fr*3)+(sh.s.zw<=.18?1:0);
function fsCard(sh){if(sh.s.junk){fsJunkCard(sh);return}const s=sh.s,f=SAVE.fsh,rec=f.dex[s.id]||(f.dex[s.id]={n:0,best:0,kg:0,st:0}),kg=Math.max(.1,s.kg*Math.pow(sh.len/100,3)),nw=!rec.n,best=sh.len>rec.best;
  rec.n++;if(best){rec.best=sh.len;rec.kg=+kg.toFixed(1)}rec.st=Math.max(rec.st,sh.st);f.n++;persist();fshDay();const has=SAVE.fish[s.id]||0,left=Math.max(0,FKEEP-has);sh.tv=s.leg?40:fsTide(sh)+(best&&!nw?2:0);FS.cur=sh;const nok=s.leg?'传说鱼只能放回':s.nokeep?'刺多，放回吧':'';
  const say=s.id==='gt'?'……它看我的样子，像在看一个老朋友。':s.id==='moonfish'?'它身上，有月亮的味道。':sh.back?'是刚才跑掉的那条！':sh.st>=3?'它在发光……！':SAYK[Math.floor(Math.random()*SAYK.length)];
  const kgs=kg<1?kg.toFixed(2):kg.toFixed(1),badge=s.leg?'<span class="fbadge leg">传说</span>':nw?'<span class="fbadge">新收录</span>':best?'<span class="fbadge">新纪录</span>':'';
  $('fhCard').innerHTML=`<div class="fcPic"><canvas id="fhFish" width="64" height="32"></canvas>${badge}<button class="fcCam" data-fk="cam" aria-label="拍照">📷</button></div><h3>${s.n}</h3><p class="fst">${'★'.repeat(sh.st)}${'☆'.repeat(3-sh.st)}</p>
   <p class="fbig">${sh.len}<small> 厘米</small><i></i>${kgs}<small> 公斤</small></p><p class="fsay">“${say}”</p>
   <div class="fcBtns"><button class="btn mint" data-fk="keep" ${left&&!nok?'':'disabled'}>🧺 留下<small>${nok||(left?`菜篮 ${has}/${FKEEP}`:'菜篮满了')}</small></button><button class="btn sun" data-fk="rel">🌊 放回<small>+${sh.tv} 潮印</small></button></div>${f.n<=2?'<p class="note">留下的鱼营业时当食材；放回的鱼换潮印</p>':''}`;
  $('fhCard').hidden=false;const c=$('fhFish').getContext('2d');FS.cardT=0;fsCardDraw()}
function fsCardDraw(){const e=$('fhFish');if(!e||!FS||!FS.cur||$('fhCard').hidden)return;const c=e.getContext('2d'),sh=FS.cur;c.clearRect(0,0,64,32);drawFsp(c,sh.s.id,32,17,Math.min(52,24+sh.fr*28),1,FS.t,sh.st)}
$('fhCard').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled||!FS)return;const sh=FS.cur,s=sh.s;let after=null;
  if(b.dataset.fk==='cam'){SFX.tap();fsPhoto(sh);return}
  if(b.dataset.fk==='junk'){const f=SAVE.fsh;if(s.id==='coconut'){SAVE.fish.coco=(SAVE.fish.coco||0)+1;toast('椰子放进菜篮了',1.8)}else{f.tide+=s.tv;f.tideAll+=s.tv;toast(`🌊 +${s.tv} 潮印`,1.8)}SFX.save()}else
  if(b.dataset.fk==='keep'){fshDay();SAVE.fsh.kept++;SAVE.fsh.keptAll=(SAVE.fsh.keptAll||0)+1;SAVE.fish[s.id]=(SAVE.fish[s.id]||0)+1;toast(`${s.n}放进鱼篓了，营业时能用`,2);SFX.save()}
  else{const f=SAVE.fsh;f.tide+=sh.tv;f.tideAll+=sh.tv;f.rel++;
    if(s.leg){f.leg=f.leg||{};const first=!f.leg[s.id];f.leg[s.id]=(f.leg[s.id]||0)+1;FS.legDone=s.id;toast(`🌊 +${sh.tv} 潮印`,2);const k=s.id==='gt'?'legGT':'legMoon';if(first)after=()=>{$('fishHud').hidden=true;playStory(STORY[k],()=>{SAVE.story[k]=1;persist();if(FS){$('fishHud').hidden=false;fhTop()}})}}
    else if(SAVE.story.fish2&&sh.fr<.22&&Math.random()<.3){toast(`🌊 +${sh.tv} 潮印 · 伊瓦一个俯冲，把它叼走了！嗒嗒嗒`,2.6);fsIwaSnatch()}
    else toast(`🌊 +${sh.tv} 潮印 · ${SAYR[Math.floor(Math.random()*SAYR.length)]}`,2.6);snd(500,.3,'sine',.06,900);FS.rip.push({x:FS.bob?FS.bob.x:.5,z:.9,t:0,r:1.4})}
  persist();$('fhCard').hidden=true;FS.cur=null;FS.ph='idle';FS.bob=null;fhTop();if(after)after()};
function fsJunkCard(sh){const j=sh.s;FS.cur=sh;SAVE.fsh.junk=(SAVE.fsh.junk||0)+1;persist();
  const txt=j.id==='bottle'?'瓶子里有一张纸：'+LETTERS[Math.floor(Math.random()*LETTERS.length)]:j.id==='sandal'?'谁的拖鞋漂到这里来了。带回去扔掉，海就干净一点。':'一个漂来的椰子，还挺沉。';
  $('fhCard').innerHTML=`<div class="fcPic"><canvas id="fhFish" width="64" height="32"></canvas><span class="fbadge">意外收获</span></div><h3>${j.n}</h3><p class="fsay">${txt}</p>
   <div class="fcBtns one"><button class="btn sun" data-fk="junk">${j.id==='coconut'?'🥥 抱回去<small>菜篮 +1 椰子</small>':`🌊 ${j.id==='bottle'?'收好':'带回去'}<small>+${j.tv} 潮印</small>`}</button></div>`;
  $('fhCard').hidden=false;fsCardDraw()}
function fsBook(){const f=SAVE.fsh,got=FSP.filter(s=>f.dex[s.id]).length;
  $('fhPanel').innerHTML=`<h3>钓鱼手帐</h3><p class="note">认识了 ${got} / ${FSP.length} 种 · 一共钓上 ${f.n} 条 · 空军 ${f.air} 竿（最长连空 ${f.airMax} 竿）<br>放回大海 ${f.rel} 条 · 一共得过 ${f.tideAll} 枚潮印${f.junk?` · 意外收获 ${f.junk} 件`:''}</p><div class="fbook">${FSP.map(s=>{const r=f.dex[s.id];
    return r?`<div class="fbk"><canvas data-fb="${s.id}" width="40" height="22"></canvas><b>${s.n} <span class="fst">${'★'.repeat(r.st)}</span></b><span>${FK[s.k]} · 钓到 ${r.n} 条</span><span>最大 ${r.best} 厘米 · ${r.kg} 公斤</span><em>${s.tip}</em></div>`
      :`<div class="fbk no"><canvas data-fb="${s.id}" width="40" height="22"></canvas><b>？？？</b><em>${s.tip}</em></div>`}).join('')}</div><div class="rowb"><button class="btn sm" data-fp="x">合上</button></div>`;
  $('fhPanel').hidden=false;$('fhPanel').querySelectorAll('[data-fb]').forEach(e=>{const c=e.getContext('2d'),id=e.dataset.fb,s=FSP.find(x=>x.id===id);drawFsp(c,id,20,12,30,1,0,0);
    if(!f.dex[id]){c.globalCompositeOperation='source-atop';c.fillStyle='#38506a';c.fillRect(0,0,40,22);c.globalCompositeOperation='source-over'}})}
function fsDrinks(){fshDay();const free=SAVE.fsh.free!==today(),c=FS.cup;
  $('fhPanel').innerHTML=`<h3>来一杯</h3><p class="note">${free?'每天第一杯免费':'一杯 '+DRKP+' 颗珍珠'} · 一杯能喝 ${DRKT/60} 分钟 · 不喝也能钓</p>${DRK.map(d=>`<div class="fdk"><span class="ic">${d.ic}</span><div><b>${d.n}</b><span class="note">${d.who}：“${d.say}”</span><span>${d.e}</span></div><button class="btn sm ${c&&c.id===d.id?'off':'sun'}" data-dk="${d.id}" ${!free&&SAVE.wallet<DRKP?'disabled':''}>${c&&c.id===d.id?'再续一杯':free?'免费':'⚪ '+DRKP}</button></div>`).join('')}<div class="rowb"><button class="btn sm" data-fp="x">不用了</button></div>`;
  $('fhPanel').hidden=false}
/* 钓具箱 */
function fsGear(){fsInit();const f=SAVE.fsh,g=f.gear,ch3=cleared(VOL1+2);
  const row=(slot,it)=>{const own=gOwn(slot,it),on=g[slot]===it.id;let btn;
    if(on)btn='<button class="btn sm off" disabled>用着</button>';else if(own)btn=`<button class="btn sm mint" data-ge="${slot}:${it.id}">换上</button>`;
    else if(it.shop)btn='<span class="note">墨墨商店有卖</span>';else if(it.ch3&&!ch3)btn='<span class="note">第三章以后</span>';
    else btn=`<button class="btn sm sun" data-gb="${slot}:${it.id}" ${f.tide<it.tide?'disabled':''}>🌊 ${it.tide}</button>`;
    return `<div class="fdk"><span class="ic">${on?'✅':own?'▫️':'🔒'}</span><div><b>${it.n}</b><span>${it.d}</span></div>${btn}</div>`};
  const brow=b=>{const on=g.bait===b.id,fr0=b.id==='dough'||b.id==='none',n=fr0?'∞':(f.baits[b.id]||0),can=b.tide?f.tide>=b.tide:SAVE.wallet>=b.p;
    return `<div class="fdk"><span class="ic">${b.ic}</span><div><b>${b.n} <span class="note">有 ${n}</span></b><span>${b.d}</span></div><div class="fbtn">${b.pk?`<button class="btn sm sun" data-bb="${b.id}" ${can?'':'disabled'}>${b.pk} 个 · ${b.tide?'🌊 '+b.tide:'⚪ '+b.p}</button>`:''}${on?'<button class="btn sm off" disabled>用着</button>':(fr0||f.baits[b.id]>0)?`<button class="btn sm mint" data-bu="${b.id}">用这个</button>`:''}</div></div>`};
  const a=f.auto,rack=!ch3?'<span class="note">第三章以后</span>':a.own?`<button class="btn sm ${a.on?'off':'mint'}" data-ga="1">${a.on?'收起来':'架上去'}</button>`:`<button class="btn sm sun" data-gr="1" ${f.tide<RACKP?'disabled':''}>🌊 ${RACKP}</button>`;
  $('fhPanel').innerHTML=`<h3>🎒 钓具箱</h3><p class="note">🌊 潮印 ${f.tide} · ⚪ 珍珠 ${SAVE.wallet} · 每放回一条鱼得潮印，越大越稀有得越多</p>
   ${['rod','line','hook'].map(sl=>`<h4>${GEAR[sl].n}</h4>`+GEAR[sl].l.map(it=>row(sl,it)).join('')).join('')}<h4>鱼饵 <span class="note">鱼咬钩时用掉一个</span></h4>${BAIT.map(brow).join('')}<h4>窝料</h4><div class="fdk"><span class="ic">🪣</span><div><b>窝料 <span class="note">有 ${f.chum||0}</span></b><span>撒在浮漂附近，一分钟里鱼聚过来、咬钩更快</span></div><button class="btn sm sun" data-gc="1" ${SAVE.wallet<CHUMP?'disabled':''}>${CHUMK} 份 · ⚪ ${CHUMP}</button></div>
   <h4>托竿</h4><div class="fdk"><span class="ic">🔔</span><div><b>老舵的托竿架</b><span>架上以后自己会上鱼（慢一些、鱼小一些），钓到的都放回去换潮印；你离开船尾，它也接着钓</span></div>${rack}</div>
   <div class="rowb"><button class="btn sm" data-fp="x">合上</button></div>`;$('fhPanel').hidden=false}
function fsGearClick(b){const f=SAVE.fsh,d=b.dataset;
  if(d.ge){const[sl,id]=d.ge.split(':');f.gear[sl]=id;SFX.save()}
  else if(d.gb){const[sl,id]=d.gb.split(':'),it=GEAR[sl].l.find(x=>x.id===id);if(f.tide<it.tide)return;f.tide-=it.tide;f.own[id]=1;f.gear[sl]=id;toast(`换上了${it.n}`,1.8);SFX.save()}
  else if(d.bb){const bt=BAIT.find(x=>x.id===d.bb);if(bt.tide){if(f.tide<bt.tide)return;f.tide-=bt.tide}else{if(SAVE.wallet<bt.p)return;SAVE.wallet-=bt.p}
    f.baits[bt.id]=(f.baits[bt.id]||0)+bt.pk;f.gear.bait=bt.id;toast(`墨墨：“${bt.n}，亏本卖！”`,1.8);SFX.save()}
  else if(d.bu){f.gear.bait=d.bu;SFX.tap()}
  else if(d.gc){if(SAVE.wallet<CHUMP)return;SAVE.wallet-=CHUMP;f.chum=(f.chum||0)+CHUMK;toast('墨墨：“窝料，亏本卖！”',1.8);SFX.save()}
  else if(d.ga){f.auto.on=f.auto.on?0:1;f.auto.ts=Date.now();if(FS){FS.at=20+Math.random()*25;FS.ab=null}SFX.tap()}
  else if(d.gr){if(f.tide<RACKP)return;f.tide-=RACKP;f.auto.own=1;f.auto.on=1;f.auto.ts=Date.now();persist();$('fhPanel').hidden=true;$('fishHud').hidden=true;
    playStory(STORY.fish1,()=>{SAVE.story.fish1=1;persist();if(FS){$('fishHud').hidden=false;FS.at=15;FS.ab=null;fhTop()}});return}
  persist();fhTop();fsGear()}
/* 托竿：在船尾时每隔一阵铃响上一条；不在船尾时按离开的时间算 */
function fsAutoFish(){const s=fsRoll('stern'),fr=Math.random()*.55,sh={s,fr,len:Math.round(s.len[0]+fr*(s.len[1]-s.len[0])),st:Math.random()<.15?2:1},f=SAVE.fsh,
  rec=f.dex[s.id]||(f.dex[s.id]={n:0,best:0,kg:0,st:0}),kg=Math.max(.1,s.kg*Math.pow(sh.len/100,3));rec.n++;if(sh.len>rec.best){rec.best=sh.len;rec.kg=+kg.toFixed(1)}rec.st=Math.max(rec.st,sh.st);
  const tv=Math.max(1,Math.round(fsTide(sh)*.5));f.n++;f.rel++;f.tide+=tv;f.tideAll+=tv;return{sh,tv}}
function fsAway(){const a=SAVE.fsh.auto;if(!a.own||!a.on||!a.ts)return;const n=Math.min(20,Math.floor((Date.now()-a.ts)/150000));a.ts=Date.now();if(n<1)return;
  let tv=0;const kinds={};for(let i=0;i<n;i++){const r=fsAutoFish();tv+=r.tv;kinds[r.sh.s.n]=(kinds[r.sh.s.n]||0)+1}persist();fhTop();
  $('fhPanel').innerHTML=`<h3>🔔 托竿守了一阵</h3><p>你不在的时候，托竿钓上来 ${n} 条，都放回去了。</p><p class="note">${Object.entries(kinds).map(([k,v])=>k+' ×'+v).join(' · ')}</p><p class="fbig">🌊 +${tv} 潮印</p><div class="rowb"><button class="btn sm mint" data-fp="x">好</button></div>`;$('fhPanel').hidden=false}
window.addEventListener('pagehide',()=>{if(FS){SAVE.fsh.auto.ts=Date.now();persist()}});
$('fhPanel').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled||!FS)return;
  if(b.dataset.fp){$('fhPanel').hidden=true;SFX.tap();return}
  if(b.dataset.ge||b.dataset.gb||b.dataset.bb||b.dataset.bu||b.dataset.ga||b.dataset.gr||b.dataset.gc){fsGearClick(b);return}
  if(b.dataset.fs){SFX.tap();fsGo(b.dataset.fs);return}
  if(b.dataset.fq){SFX.tap();quitFish();return}
  if(b.dataset.dk){const free=SAVE.fsh.free!==today();if(!free){if(SAVE.wallet<DRKP)return;SAVE.wallet-=DRKP}else SAVE.fsh.free=today();
    const d=DRK.find(x=>x.id===b.dataset.dk);FS.cup={id:d.id,left:DRKT};SAVE.fsh.dr=FS.cup;persist();$('fhPanel').hidden=true;toast(`${d.who}：“${d.say}”`,2.4);SFX.save();fhTop()}};
$('fhQuit').onclick=()=>{if(!FS)return;SFX.tap();if(FS.ph==='fight'){toast('先把这条鱼拉上来',1.6);return}fsSpots()};
$('fhGear').onclick=()=>{if(!FS)return;if(FS.ph==='fight'){toast('先把这条鱼拉上来',1.6);return}SFX.tap();fsGear()};
$('fhBook').onclick=()=>{if(!FS)return;SFX.tap();fsBook()};
$('fhCup').onclick=()=>{if(!FS)return;if(FS.ph==='fight'){toast('先把这条鱼拉上来',1.6);return}SFX.tap();fsDrinks()};
const fsPt=e=>{const r=cv.getBoundingClientRect();return(e.clientX-r.left)/Math.max(1,r.width)};
cv.addEventListener('pointerdown',e=>{if(FS){e.preventDefault();const r=cv.getBoundingClientRect(),X=(e.clientX-r.left)/r.width*W/FS.ps,Y=(e.clientY-r.top)/r.height*H/FS.ps,iw=FS.iwaPos;
  if(iw&&Math.abs(X-iw.x-2)<8&&Math.abs(Y-iw.y+4)<8&&(FS.ph==='idle'||FS.ph==='wait')&&$('fhCard').hidden&&$('fhPanel').hidden){fsPet();return}fsDown(fsPt(e))}});
cv.addEventListener('pointermove',e=>{if(FS&&e.buttons)fsMove(fsPt(e))});
window.addEventListener('pointerup',()=>{if(FS)fsUp()});window.addEventListener('pointercancel',()=>{if(FS)fsUp()});
window.addEventListener('keydown',e=>{if(!FS||e.repeat)return;if(e.code==='Space'){e.preventDefault();fsDown(FS.aim)}else if(e.code==='ArrowLeft'||e.code==='ArrowRight')FS.aim=clamp(FS.aim+(e.code==='ArrowLeft'?-.08:.08),.06,.94)});
window.addEventListener('keyup',e=>{if(FS&&e.code==='Space')fsUp()});
$('bFish').onclick=()=>{SFX.tap();const go=()=>{if(cleared(VOL1+2)&&!SAVE.story.fish2)playStory(STORY.fish2,()=>{SAVE.story.fish2=1;persist();startFish()});else startFish()};
  if(!SAVE.story.fish0)playStory(STORY.fish0,()=>{SAVE.story.fish0=1;persist();go()});else go()};
{const _rf=refreshMenu;refreshMenu=()=>{_rf();$('bFish').hidden=!cleared(VOL1+1)}}

/* ---------- 画面：船尾、海、天色 ---------- */
const TODK=[[.1,'#6cc4f0','#dff4ff','#4ab0dc','#1f78b0'],[.33,'#56579e','#ffb27a','#c97c96','#4a4a86'],[.55,'#0e1838','#2a3a6a','#1c3260','#0a1834'],[.72,'#111a3e','#33386e','#1f3460','#0c1a38'],[.9,'#7486c8','#ffd2b8','#93b2d6','#45679e']];
function todCol(tod){let i=0;while(i<TODK.length&&TODK[i][0]<=tod)i++;const a=TODK[(i-1+TODK.length)%TODK.length],b=TODK[i%TODK.length];let span=b[0]-a[0];if(span<=0)span+=1;let u=tod-a[0];if(u<0)u+=1;const k=u/span;return[1,2,3,4].map(j=>mixc(a[j],b[j],k))}
function fishFrame(dt){if(!FS)return;fishUpdate(dt);if(!FS)return;const f=FS,t=f.t,fg=f.ph==='fight'||f.ph==='land';if(fg!==f.fg){f.fg=fg;$('fishHud').classList.toggle('fight',fg)}
  const ps=Math.max(2,Math.ceil(Math.max(W,H)/200));f.ps=ps;CW=Math.ceil(W/ps);CH2=Math.ceil(H/ps);if(pcv.width!==CW||pcv.height!==CH2){pcv.width=CW;pcv.height=CH2}
  const gy=Math.round(CH2*(W>H?.78:.8)),hy=Math.round(CH2*(W>H?.3:.34));const spn=fsSpot().id;FL={hy,gy,lift:spn==='reef'?6:0};let[sk0,sk1,se0,se1]=todCol(f.tod);const ph=fsPhase(f.tod),night=ph===2?1:ph===3?Math.max(0,1-(f.tod-.8)/.08):ph===1?Math.max(0,(f.tod-.38)/.07):0;[se0,se1]=fsSea(spn,se0,se1,1-night);
  for(let i=0;i<8;i++)R(0,Math.floor(hy*i/8),CW,Math.ceil(hy/8)+1,mixc(sk0,sk1,i/7));
  if(night>.05)for(let i=0;i<30;i++){if(((i*7)%10)/10>night)continue;const sx=(i*37+11)%CW,sy=(i*19+5)%Math.max(4,hy-3);R(sx,sy,1,1,Math.sin(t*1.5+i)>.5?'#ffffff':'#bcd0ff')}
  /* 太阳和月亮 */
  if(f.tod<.46){const u=f.tod/.46,sx=Math.round(CW*(.2+u*.55)),sy=Math.round(hy*(.18+u*.86));El(sx,sy,6,6,'rgba(255,220,150,.25)');El(sx,sy,4,4,u>.6?'#ff8a5a':'#fff27a')}
  if(f.tod>.44&&f.tod<.88){const u=(f.tod-.44)/.44,mx=Math.round(CW*(.8-u*.6)),my=Math.round(hy*(.9-Math.sin(u*Math.PI)*.7));const mp=fsMoon();if(mp){const full=mp===4;El(mx,my,full?7:5,full?7:5,`rgba(220,230,255,${full?.3:.18})`);El(mx,my,3,3,'#f4f1dc');R(mx+1,my-2,2,2,'#d8d4b8');if(!full){const k=mp<4?mp/4:(8-mp)/4;El(mx+(mp<4?-1:1)*Math.round(1+k*5),my,3,3,mixc(sk0,sk1,.2))}}}
  for(let i=0;i<3;i++){const cx=((i*53+t*1.8)%(CW+40))-20,cy=Math.round(hy*(.22+i*.2));const cc=night>.5?'rgba(120,130,180,.35)':mixc(sk1,'#ffffff',.6);El(cx,cy,7,2,cc);El(cx+5,cy-1,4,2,cc)}
  fsHorizon(spn,hy,night,se1,t);
  /* 海 */
  for(let i=0;i<8;i++)R(0,hy+Math.floor((gy-hy)*i/8),CW,Math.ceil((gy-hy)/8)+1,mixc(se0,se1,i/7));
  {const lx=f.tod<.46?Math.round(CW*(.2+f.tod/.46*.55)):Math.round(CW*(.8-(f.tod-.44)/.44*.6)),gc=f.tod<.46?'rgba(255,214,150,.45)':'rgba(230,236,255,.3)';
    for(let y=hy+1;y<gy-2;y+=2){const w=1+Math.round((y-hy)*.08),o=Math.round(Math.sin(t*1.3+y*.7)*1.5);if(((y*13+Math.floor(t*3))%5)<3)R(lx-w+o,y,w*2,1,gc)}}
  for(let i=0;i<14;i++){const y=hy+2+(i*7)%Math.max(1,gy-hy-6),x=((i*29+t*(2+i%3))%(CW+10))-5;R(x,y,2+((y-hy)>>4),1,'rgba(255,255,255,.18)')}
  /* 水下的鱼影 */
  const tea=f.cup&&f.cup.id==='tea';
  for(const s of f.sh){if(s.st2==='hook')continue;const y=fsY(s.z),x=s.x*CW,p=fsP(s.z),rx=(3+s.fr*4.5)*p*(s.leg?1.7:1),d=s.st2==='go'&&f.bob?(f.bob.x>s.x?1:-1):(s.tx>s.x?1:-1),a=(tea?.42:.28)*(night>.5?.75:1),col=`rgba(8,22,40,${a})`;
    El(x,y,rx,Math.max(1,rx*.4),col);const w=Math.round(Math.sin(s.ph*6)*1);R(x-d*(rx+1)-(d<0?0:1),y-1+w,1,2,col);R(x-d*(rx+2)-(d<0?0:1),y-1-w,1,3,col);
    if(s.leg){El(x,y,rx+2,Math.max(1,rx*.4)+1,`rgba(255,246,190,${.12+.1*Math.sin(t*3)})`);if(Math.sin(t*5+s.ph)>.4)R(x+Math.sin(t*2)*rx*.5,y-1,1,1,'#fff6b0')}
    if(tea&&s.st>=2&&Math.sin(t*4+s.ph)>.3)R(x+(Math.sin(s.ph)*rx*.6),y-1,1,1,s.st>=3?'#fff6b0':'#cfe9ff')}
  if(f.chumAt){const c=f.chumAt,y=fsY(c.z),x=c.x*CW,a=Math.min(1,c.t/10);El(x,y,7*fsP(c.z),2,`rgba(255,200,120,${.15*a})`);for(let i=0;i<6;i++){const u=((t*.3+i/6)%1);R(x+Math.sin(i*2.1+t)*4,y-2+u*6,1,1,`rgba(255,190,110,${(1-u)*.8*a})`)}}
  /* 浮漂、线、竿 */
  const kx=Math.round(CW*.42),tip0=fsTip(),F=f.F,bend=F?Math.round(F.T*5):0,tip={x:tip0.x+bend,y:tip0.y+bend*1.4};
  for(const r of f.rip){const y=fsY(r.z),x=r.x*CW,rr=(2+r.t*7*r.r)*fsP(r.z);El(x,y,rr,Math.max(1,rr*.35),`rgba(255,255,255,${.35*(1-r.t/1.2)})`);El(x,y,Math.max(0,rr-1),Math.max(0,rr*.35-1),mixc(se0,se1,.5))}
  let bx=null,by=null;const b=f.bob;
  if(f.ph==='charge'){const tz=clamp(.92-f.pow*.9,.02,.92),ty=fsY(tz),tx=f.aim*CW;for(let i=1;i<9;i++){const u=i/9,x=lerp(tip.x,tx,u),y=lerp(tip.y,ty,u)-Math.sin(u*Math.PI)*(8+f.pow*14);R(x,y,1,1,i%2?'#ffffff':'rgba(255,255,255,.45)')}
    El(tx,ty,4,2,'rgba(255,255,255,.35)');R(tx-2,ty,5,1,'#ffffff');R(tx,ty-2,1,5,'#ffffff')}
  if(b){const fy=fsY(b.z),fx=b.x*CW;if(f.ph==='fly'){const u=b.fly;bx=lerp(tip.x,fx,u);by=lerp(tip.y,fy,u)-Math.sin(u*Math.PI)*(10+(1-b.z)*14)}
    else if(f.ph==='back'){const u=f.backT;bx=lerp(fx,tip.x,u);by=lerp(fy,tip.y,u)-Math.sin(u*Math.PI)*6}else{bx=fx;by=fy}
    const bt=f.bite,dip=bt&&bt.k==='dip'?1:0,sink=bt&&bt.k==='sink'||f.ph==='fight';
    const sag=f.ph==='fight'?Math.round((1-F.T)*5):f.ph==='wait'?4:2,lc=f.ph==='fight'?(F.T>F.c+F.zw/2?(Math.sin(t*20)>0?'#ff6a5a':'#ffd2c8'):'#ffffff'):'rgba(255,255,255,.75)';
    for(let i=0;i<=24;i++){const u=i/24,x=lerp(tip.x,bx,u),y=lerp(tip.y,by,u)+Math.sin(u*Math.PI)*sag;R(x,y,1,1,lc)}
    if(f.ph!=='fight'){if(sink){R(bx-1,by,3,1,'rgba(255,255,255,.5)');if(f.cup&&f.cup.id==='coffee'){El(bx,by,5+Math.round(Math.sin(t*12)),2,'rgba(255,240,150,.6)')}}else{R(bx,by-3+dip,1,2,'#ffffff');R(bx,by-1+dip,1,2,'#e0503f');R(bx-1,by+dip,3,1,'rgba(255,255,255,.5)')}}}
  if(F&&F.jump>0){const u=1-F.jump/.95,x=b.x*CW+u*8-4,y=fsY(b.z)-Math.sin(u*Math.PI)*14;drawFsp(px,F.sh.s.id,x,y,Math.round(6+F.sh.fr*7),u<.5?1:-1,t,F.sh.st)}
  for(const p of f.spl)R(p.x,p.y,1,1,'rgba(255,255,255,.8)');
  /* 船尾：甲板、栏杆、灯笼、小鱼、杯子 */
  if(spn==='stern'){
  R(0,gy,CW,CH2-gy,'#8a5a33');for(let i=0;i<5;i++)R(0,gy+3+i*Math.ceil((CH2-gy)/5),CW,1,'#714626');R(0,gy-2,CW,3,'#a8703f');R(0,gy-2,CW,1,'#c98f55');
  for(let x=3;x<CW;x+=11)R(x,gy-9,2,8,'#7d5229');R(0,gy-10,CW,2,'#9a6638');
  {const lx=Math.round(CW*.86);R(lx,gy-24,1,15,'#6b4226');R(lx-3,gy-24,4,1,'#6b4226');const sw=Math.round(Math.sin(t*1.1)*1);if(night>.2){El(lx-3+sw,gy-18,7,6,`rgba(255,200,110,${.18*night})`);El(lx-3+sw,gy-18,4,3,`rgba(255,210,130,${.25*night})`)}R(lx-5+sw,gy-21,4,5,night>.2?'#ffcf6a':'#e0503f');R(lx-5+sw,gy-21,4,1,'#6b4226');R(lx-5+sw,gy-17,4,1,'#6b4226')}
  }else fsFore(spn,gy,night,t);
  if(SAVE.fsh.auto.own&&SAVE.fsh.auto.on&&spn==='stern'){const rx=Math.round(CW*.7),sh=f.ab?Math.round(Math.sin(t*30)*1.5):0,tx=rx-8+sh,ty=gy-28+(f.ab?2:0),wx=Math.round(CW*.62),wy=fsY(.7);
    R(rx-1,gy-12,3,4,'#5a3a1a');for(let i=0;i<=14;i++){const u=i/14;R(lerp(rx,tx,u),lerp(gy-10,ty,u),1,1,i<3?'#5a3a1a':'#c9a26a')}
    for(let i=0;i<=16;i++){const u=i/16;R(lerp(tx,wx,u),lerp(ty,wy,u)+Math.sin(u*Math.PI)*3,1,1,'rgba(255,255,255,.8)')}
    R(tx-1,ty+1,3,2,'#e8b84a');R(tx,ty+3,1,1,'#a87a2a');R(wx,wy-1,1,2,f.ab?'#ffffff':'#e0503f');if(f.ab)El(wx,wy,3+Math.round(Math.sin(t*12)),1,'rgba(255,255,255,.5)')}
  const KY=spn==='reef'?gy-6:gy;if(spn==='reef'){R(kx-3,KY-2,2,8,'#3a5a8a');R(kx+1,KY-2,2,8,'#3a5a8a');R(kx-4,gy+5,3,1,'#2a2a3a');R(kx+1,gy+5,3,1,'#2a2a3a')}
  const sip=f.cup&&(t%14)<1.4;
  R(kx-4,KY-9,9,8,'#ff9f1c');R(kx-4,KY-9,9,1,'#ffb84d');El(kx,KY-13,3,3,'#5a3a22');R(kx-1,KY-10,3,1,'#e8b48a');R(kx+4,KY-8,4,2,'#ff9f1c');R(kx+7,KY-8,2,2,'#ffd9b3');
  if(sip){R(kx-6,KY-10,2,4,'#ff9f1c');R(kx-6,KY-12,2,2,'#ffd9b3')}else{R(kx-6,KY-7,2,4,'#ff9f1c')}
  for(let i=0;i<=20;i++){const u=i/20,x=lerp(kx+8,tip.x,u),y=lerp(KY-7,tip.y,u)+(F?Math.sin(u*Math.PI*.5)*bend*.3:0);R(x,y,1,1,i<4?'#5a3a1a':'#a87a45')}
  if(f.cup){const cx=kx-9,cy=sip?KY-15:KY-10,lv=clamp(f.cup.left/DRKT,0,1),id=f.cup.id;
    if(id==='tea'){R(cx,cy,4,6,'rgba(220,240,255,.55)');R(cx,cy+6-Math.round(5*lv),4,Math.round(5*lv),'#f2d25a');R(cx+1,cy+2,1,1,'#ffffff');R(cx+3,cy-2,1,3,'#5fc87a')}
    else if(id==='coffee'){R(cx,cy+1,4,5,'#f4ecdc');R(cx+4,cy+2,1,2,'#f4ecdc');R(cx,cy+1,4,1,lv>.1?'#6a4020':'#d8ccb4');if(Math.sin(t*2)>-.5){R(cx+1,cy-2-Math.round((t*3)%3),1,2,'rgba(255,255,255,.45)')}}
    else{El(cx+2,cy+3,3,3,'#8a5a2b');R(cx,cy+1,4,1,'#c99a5a');R(cx+3,cy-3,1,4,'#ff7aa8')}}
  f.nightV=night;if(SAVE.story.fish2)fsIwaDraw(spn,gy,t);else f.iwaPos=null;
  if(f.ph==='charge'){const bw=Math.round(CW*.5),bx0=Math.round((CW-bw)/2),by0=gy+Math.round((CH2-gy)*.45);R(bx0-1,by0-1,bw+2,5,'rgba(10,20,40,.55)');R(bx0,by0,Math.round(bw*f.pow),3,'#ffd23f')}
  /* 遛鱼时的松紧条和距离 */
  if(F){const lo=F.c-F.zw/2,hi=F.c+F.zw/2,bw=Math.round(CW*.66),bx0=Math.round((CW-bw)/2),by0=gy+Math.round((CH2-gy)*.5),inz=F.T>=lo&&F.T<=hi,tight=F.T>hi,
      rr=(x,y,w,h,c)=>{R(x+1,y,w-2,h,c);R(x,y+1,1,h-2,c);R(x+w-1,y+1,1,h-2,c)},flash=tight&&Math.sin(t*18)>0;
    /* 底板 */
    rr(bx0-4,by0-8,bw+8,17,'rgba(12,16,40,.55)');
    /* 上面一行：鱼离船还有多远（小鱼从左往右游到钩子） */
    const pr=clamp(1-F.d/F.dmax,0,1),fx=bx0+Math.round((bw-6)*pr);R(bx0,by0-4,bw-4,1,'rgba(255,255,255,.18)');R(bx0,by0-4,fx-bx0,1,'#ffd98a');
    R(fx,by0-5,3,3,'#ffd98a');R(fx-1,by0-5,1,1,'#ffd98a');R(fx-1,by0-3,1,1,'#ffd98a');R(fx+2,by0-5,1,1,'#2a2a44');
    R(bx0+bw-2,by0-6,1,4,'#e8e8f0');R(bx0+bw-3,by0-3,2,1,'#e8e8f0');
    /* 下面一行：松紧条 */
    rr(bx0-1,by0,bw+2,7,flash?'#ff7a6a':'rgba(255,255,255,.25)');rr(bx0,by0+1,bw,5,'#33405e');
    const zx=bx0+Math.round(bw*lo),zw=Math.max(3,Math.round(bw*F.zw));rr(zx,by0+1,zw,5,inz?'#8ef5b4':'#4cc07e');R(zx+1,by0+1,zw-2,1,inz?'#d6ffe6':'#7ee0a6');
    const nx=bx0+Math.round(bw*clamp(F.T,0,1));R(nx,by0-1,1,9,'#ffffff');R(nx-1,by0-1,3,1,'#ffffff');R(nx-1,by0+7,3,1,'#ffffff');
    if(F.flash>0){F.flash-=dt;const r=Math.round((.4-F.flash)*20);for(let i=0;i<8;i++){const a=i*Math.PI/4;R(b.x*CW+Math.cos(a)*r,fsY(b.z)-6+Math.sin(a)*r*.6,1,1,'#fff6b0')}}}
  if(f.ph==='land'&&f.land){const u=f.landT,sx=b?b.x*CW:CW/2,sy=b?fsY(b.z):gy-20,x=lerp(sx,kx+4,u),y=lerp(sy,gy-14,u)-Math.sin(u*Math.PI)*22;drawFsp(px,f.land.s.id,x,y,Math.round(8+f.land.fr*8),-1,t,f.land.st)}
  if(f.rainA>0){const a=f.rainA;px.fillStyle=`rgba(30,40,70,${.2*a})`;px.fillRect(0,0,CW,CH2);for(let i=0,n=Math.round(CW*.6*a);i<n;i++){const x=(i*53+t*30)%CW,y=(i*31+t*110)%CH2;R(x,y,1,3,'rgba(200,220,255,.35)')}
    for(let i=0;i<Math.round(8*a);i++)R(Math.random()*CW,hy+Math.random()*(gy-hy),1,1,'rgba(255,255,255,.5)')}
  /* 颗粒和暗角 */
  for(let i=0,n=Math.round(CW*CH2*.012);i<n;i++)R(Math.random()*CW,Math.random()*CH2,1,1,Math.random()<.5?'rgba(255,255,255,.06)':'rgba(0,0,0,.07)');
  const vg=px.createRadialGradient(CW/2,CH2*.5,Math.min(CW,CH2)*.35,CW/2,CH2*.5,Math.max(CW,CH2)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(10,8,30,.35)');px.fillStyle=vg;px.fillRect(0,0,CW,CH2);
  if(night>0){px.fillStyle=`rgba(20,16,60,${.12*night})`;px.fillRect(0,0,CW,CH2)}
  ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(pcv,0,0,CW,CH2,0,0,CW*ps*cv.width/W,CH2*ps*cv.width/W);ctx.restore();
  if(FS.cur)fsCardDraw()}
window.__F={get FS(){return FS},startFish,quitFish,fsDown,fsUp,fsMove,update:fishUpdate,FSP,fsGear,fsAway,fsGo,fsSpots,fsChum,fsPhoto,fsPet,fsHook,fsIw,fsIwSet};
