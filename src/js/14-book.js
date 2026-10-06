/* ---------- 奇珍书 (collection book) ---------- */
SAVE.dex=SAVE.dex||{};for(const k in SAVE.fish)if(SAVE.fish[k]>0&&!SAVE.dex[k])SAVE.dex[k]=SAVE.fish[k];
for(const d of DISH)if(SAVE.dishes[d.id])for(const k in d.need)if(!SAVE.dex[k])SAVE.dex[k]=1;
function pixFish(k,o){return(x,y)=>{const f=o||FISH[k],c=f.c,lx=Math.min(1.6,f.lx||1),L=Math.round(8*lx*Math.min(1.25,f.s+.25)),Hh=Math.max(3,Math.round(6*f.s/(lx>1.3?1.7:1)));
  R(x-L-4,y-4,3,8,c[2]);R(x-L-2,y-2,3,4,c[2]);R(x-2,y-Hh-2,5,2,c[2]);El(x,y,L,Hh,c[1]);R(x-L+3,y+Hh-2,L*2-7,1,c[0]);R(x-L+4,y-Hh+1,L,1,c[0]);
  if(f.stripe)for(let i=0;i<3;i++)R(x-5+i*4,y-Hh+1,1,Hh*2-2,'rgba(0,40,60,.3)');if(f.bill)R(x+L,y,8,1,c[2]);if(f.lamp){R(x+L-4,y-Hh-3,1,3,c[2]);R(x+L-3,y-Hh-5,2,2,'#fff27a')}
  if(f.glow){R(x-L-1,y-Hh-2,1,1,'#fff');R(x+L+2,y+Hh,1,1,'#fff');R(x+3,y-Hh-4,1,1,'#fff')}R(x+L-5,y-2,2,2,'#ffffff');R(x+L-4,y-1,1,1,'#1b2a41')}}
const PIX={
 salt(x,y){for(const[a,h]of[[-7,7],[0,12],[7,8]])for(let j=0;j<h;j++)R(x+a-Math.ceil((h-j)/4),y+6-j,Math.ceil((h-j)/2),1,j>h-3?'#ffffff':'#bfe6ff');R(x-10,y+7,21,2,'#7fb8f0');R(x+1,y-4,1,6,'#ffffff')},
 grape(x,y){for(const[a,b]of[[0,-6],[-4,-2],[3,-2],[-7,2],[0,2],[6,2],[-3,6],[4,6]]){El(x+a,y+b,2,2,'#7fe0a0');R(x+a-1,y+b-1,1,1,'#e6ffd9')}R(x,y-10,1,3,'#3fa870')},
 scallop(x,y){for(let j=0;j<9;j++){const w=Math.round(11*Math.sqrt(1-(j/9)**2));R(x-w,y+4-j,w*2+1,1,j%2?'#ffb38a':'#ffc9a8')}R(x-4,y+5,9,3,'#e0784a');for(let i=-2;i<=2;i++)R(x+i*4,y-3+Math.abs(i),1,6-Math.abs(i),'#e0784a')},
 urchin(x,y){for(let i=0;i<12;i++){const a=i*Math.PI/6;R(x+Math.round(Math.cos(a)*9),y+Math.round(Math.sin(a)*9),1,1,'#3a2a70');R(x+Math.round(Math.cos(a)*7),y+Math.round(Math.sin(a)*7),1,1,'#3a2a70')}El(x,y,5,5,'#7a5ad0');R(x-2,y-3,2,2,'#e6d9ff')},
 shrimp(x,y){for(let i=0;i<7;i++){const a=Math.PI*(1.05+i*.17);El(x+Math.round(Math.cos(a)*7),y+4+Math.round(Math.sin(a)*7),2,2,i%2?'#ff8f8a':'#ffb0a8')}R(x+7,y,1,1,'#1b2a41');R(x+8,y-4,5,1,'#d0504a');R(x+8,y-2,6,1,'#d0504a');R(x-9,y+5,3,3,'#d0504a')},
 squid(x,y){for(let j=0;j<10;j++)R(x-Math.ceil(j/2),y-9+j,j+1,1,'#f6ecfa');for(let i=-2;i<=2;i++)R(x+i*2,y+1,1,7-Math.abs(i),'#d8c0e6');R(x-3,y-2,2,2,'#1b2a41');R(x+2,y-2,2,2,'#1b2a41')},
 dew(x,y){for(let j=0;j<7;j++)R(x-Math.ceil(j/2),y-9+j,j+(j%2?0:1),1,'#9ff0ff');El(x,y+2,5,5,'#9ff0ff');R(x-2,y+1,2,2,'#ffffff');R(x-8,y-6,1,1,'#fff');R(x+8,y+3,1,1,'#fff')},
 jelly(x,y){for(let j=0;j<7;j++){const w=Math.round(8*Math.sqrt(1-((6-j)/7)**2));R(x-w,y-7+j,w*2+1,1,'#ff9fe0')}R(x-6,y-3,3,1,'#ffd0f0');for(let i=-2;i<=2;i++)R(x+i*3,y,1,6+(i&1)*2,'#ff9fe0');R(x-3,y-3,1,1,'#1b2a41');R(x+3,y-3,1,1,'#1b2a41')},
 seahorse(x,y){El(x+1,y-6,3,3,'#ffb24d');R(x+3,y-7,5,2,'#ffb24d');R(x-1,y-11,1,2,'#ff8f2e');R(x+1,y-11,1,2,'#ff8f2e');for(let j=0;j<8;j++)R(x-1-(j>4?j-4:0)+(j<3?1:0),y-3+j,4-(j>5?1:0),1,'#ffb24d');R(x-4,y+5,2,2,'#ffb24d');R(x-3,y+7,3,1,'#ffb24d');R(x-3,y-1,1,4,'#ff8f2e');R(x+2,y-7,1,1,'#1b2a41')},
 mimic(x,y){for(let i=0;i<10;i++){const a=i*Math.PI/5;R(x+Math.round(Math.cos(a)*9),y+Math.round(Math.sin(a)*9),2,2,'#d0504a')}El(x,y,6,6,'#ff8f8a');R(x-4,y-2,3,3,'#fff');R(x+2,y-2,3,3,'#fff');R(x-3,y-1,1,1,'#1b2a41');R(x+3,y-1,1,1,'#1b2a41');R(x-5,y-5,3,1,'#7a1a1a');R(x+3,y-5,3,1,'#7a1a1a')},
 conch(x,y){for(let j=0;j<9;j++){const w=Math.max(1,9-j);R(x-w+j/2,y-6+j,w*2-1,1,j%2?'#ffd9b3':'#ffb38a')}R(x-9,y-7,4,2,'#ffffff');R(x+6,y+3,3,1,'#e0784a');R(x-2,y-3,5,1,'#e0784a')},
 wall(x,y){R(x-3,y-13,7,26,'#ffd23f');R(x-1,y-13,3,26,'#fff27a');for(let j=0;j<6;j++)R(x-1+(j%2?1:-1),y-12+j*4,2,2,'#ffffff');R(x-5,y-14,11,2,'#c98a1a');R(x-5,y+12,11,2,'#c98a1a')}};
const RAR=['','普通','稀有','珍奇','传说'],RCOL=['','#e9eef2','#bfe3ff','#e3d0ff','#ffe9a8'];
const fc=(k,r,hab,st,d,real)=>({id:k,cat:'fish',n:FISH[k].n,r,hab,st,d,real:real!==0,ref:real!==0,art:pixFish(k),got:()=>SAVE.dex[k]>0,how:'出海时捕到它'});
const ic=(k,r,hab,st,d,real)=>({ref:['grape','squid','scallop','urchin'].includes(k)?2:0,id:k,cat:'ing',n:FISH[k].n,r,hab,st,d,real:!!real,art:PIX[k],got:()=>SAVE.dex[k]>0,how:'带上合适的工具去采集'});
const DEX=[
 fc('sard',1,'珊瑚湾、沉船秘境',[1,1,3],'成群结队地游，鱼群可以大得惊人。它靠滤食或啄食浮游动物过活，自己又是许多大鱼的口粮，是海里承上启下的一环。'),
 fc('bream',1,'珊瑚湾、冰海',[2,2,2],'身体侧扁而高，背鳍连成一片，贴着海底觅食。鲷科大多长着臼齿一样的牙，能磨碎带壳的食物；其中不少种类一生中还会变换性别。'),
 fc('yellow',1,'珊瑚湾、黄金海沟',[1,1,2],'它所在的石首鱼科以会“叫”出名：鱼鳔上连着专门的鼓肌，能发出咕咕的声音，求偶的时候尤其热闹。多见于河口和近岸。'),
 fc('salmon',2,'沉船秘境、冰海',[2,3,3],'在淡水里出生，到海里长大，再长途跋涉回到出生的那条河产卵。它靠地磁和气味认路，许多种类产完卵就会死去。'),
 fc('mack',2,'沉船秘境、冰海',[2,2,3],'身体像一枚纺锤，尾柄很细，背鳍和臀鳍后面还排着一串小鳍。成群活动，和金枪鱼同属鲭科。'),
 fc('eel',2,'沉船秘境、深海',[2,3,2],'虽然被叫作“淡水鳗”，它其实两头跑：大半辈子住在河湖里，产卵时却要游到远离陆地的大洋深处，产完卵不久便死去。'),
 fc('saury',1,'深海、冰海',[1,1,4],'身体细长，贴着海面成群洄游，是飞鱼和颌针鱼的近亲。受惊时会蹿出水面滑行一段。夜里它会朝灯光聚拢，渔船正是用灯把它引过来的。'),
 fc('puffer',2,'深海、黄金海沟',[2,3,1],'受惊时把水大口吞进胃里，把自己鼓成一个球。上下颌各有两颗愈合的大牙，一共四颗。不少种类的内脏和肉带有剧毒。'),
 fc('tuna',3,'深海、冰海',[4,4,5],'大洋上层的猎手，成群追捕小鱼，鱼群上方常跟着海鸟。大西洋蓝鳍金枪鱼能长到三米多，同一条鱼会一次次横渡整个大洋。'),
 fc('angler',3,'深海',[3,3,1],'深海鮟鱇通体乌黑，嘴大牙尖，头顶的“钓饵”里住着会发光的细菌。有些种类的雄鱼很小，一旦咬住雌鱼就终身不再松口。'),
 fc('cod',2,'冰海',[2,3,2],'生活在北半球寒冷海域的大型鱼，最大接近两米，多数有三个背鳍，下巴上一根小须。大西洋鳕曾因过度捕捞而崩溃，至今没有恢复。'),
 fc('sword',3,'黄金海沟',[5,3,5],'上颌伸长成一根长喙，捕食时用它横扫鱼群，把猎物打晕再吃。旗鱼的喙是圆的，它的近亲剑鱼的喙是扁的，而且没有牙和鳞。'),
 fc('gold',4,'黄金海沟',[3,3,4],'只在黄金海沟出没、浑身发着金光的鱼。村里的老人说，海的颜色最好的那些年才见得到它。',0),
 ic('salt',3,'钟乳洞',[1,1,1],'洞里的淡水滴进海水处结出的发光盐晶，是奶奶的秘密调味。撒上一点，任何料理都多出一股说不清的鲜。'),
 ic('grape',2,'钟乳洞',[1,1,1],'一种绿色的海藻，一粒粒小球成串，像一挂迷你葡萄，咬下去会在嘴里“啵”地爆开。冲绳人叫它“海葡萄”，常蘸着醋生吃。',1),
 ic('scallop',2,'石门遗迹',[1,2,2],'和大多数贝类不同，扇贝会游泳：两片壳快速开合，把水喷出去推着自己走。壳缘排着一圈小眼睛，最多能有两百只，看不清形状，却能觉察光影。遗迹里的这一种随潮水一张一合，只有张开时才撬得下来。',1),
 ic('urchin',2,'海藻迷林',[2,2,1],'看不到眼睛，也没有腿，靠许多带吸力的管足配合尖刺慢慢爬行。它那副咀嚼器有个好听的名字，叫“亚里士多德提灯”。',1),
 ic('shrimp',3,'逆潮海沟',[1,1,5],'专门逆着洋流游的虾，据说越是逆流而上，肉越紧实。'),
 ic('squid',2,'沉灯之城',[2,2,3],'八条腕外加两条更长的触腕，靠向外喷水往后蹿，遇险会喷出一团墨。它有三颗心脏，血是蓝色的，还能随时变换体色。',1),
 ic('dew',4,'潮心井',[1,1,1],'潮心表面凝出的露珠，清甜冰凉。每一滴里都带着一点海本来的颜色。'),
 {id:'c_turtle',ref:2,cat:'life',n:'海龟',r:2,hab:'珊瑚湾',st:[2,5,1],real:true,d:'能在大洋里长途迁徙。雌海龟成年后会回到自己出生的那片沙滩产卵，靠的是对地磁的记忆。沙子的温度还决定小海龟的性别：凉一些多是雄的，热一些多是雌的。',art:(x,y)=>SPR.turtle(x-2,y+2,0,0),got:()=>SAVE.story.pre0,how:'第一章'},
 {id:'c_octo',ref:2,cat:'life',n:'章鱼',r:2,hab:'珊瑚湾、沉船秘境',st:[3,2,2],real:true,d:'八条腕，三颗心脏，全身没有一根骨头。它是最聪明的无脊椎动物之一，大部分神经细胞长在腕上，还能随时变色，把自己藏进背景里。',art:(x,y)=>SPR.octo(x,y+2,0,0),got:()=>SAVE.story.pre0,how:'第一章'},
 {id:'c_jelly',ref:2,cat:'life',n:'水母',r:1,hab:'深海、冰海',st:[2,1,1],real:true,d:'没有大脑、心脏和血液，身体大约百分之九十五是水，靠一张遍布全身的神经网感知四周。触手上的刺细胞会射出带毒的小“鱼叉”。',art:PIX.jelly,got:()=>SAVE.story.pre2,how:'第三章'},
 {id:'c_shark',cat:'life',n:'鲨鱼',r:3,hab:'深海',st:[5,4,5],real:true,d:'骨骼全是软骨，牙齿一排排轮流替换。大白鲨所在的鼠鲨科能让体温高过海水，在冷水里照样敏捷，幼鲨一出生就有一米多长。深海的那一头叫大白，它追人，是因为饿。',ref:1,art:(x,y)=>SPR.shark(x+2,y+1,0,0),got:()=>SAVE.story.pre2,how:'第三章'},
 {id:'c_whale',ref:2,cat:'life',n:'鲸',r:4,hab:'冰海',st:[4,5,2],real:true,d:'鲸不是鱼，是哺乳动物：用肺呼吸，要把头顶的喷气孔露出水面换气，体温恒定，幼鲸吃妈妈的奶长大。冰海的鲸婆婆认识奶奶很多年了。',art:(x,y)=>SPR.whale(x+3,y+1,0,0),got:()=>SAVE.story.pre3,how:'第四章'},
 {id:'c_seahorse',cat:'life',n:'海马',r:2,hab:'黄金海沟',st:[1,2,1],real:true,d:'全身包着一环一环的骨板，脖子弯着，尾巴能卷住海草，却没有尾鳍。卵产在雄海马的育儿袋里，由爸爸带到孵化。',ref:1,art:PIX.seahorse,got:()=>SAVE.story.post4,how:'第五章'},
 {id:'c_crab',cat:'life',n:'石蟹',r:3,hab:'石门遗迹',st:[3,5,1],real:false,d:'守着遗迹石门的老螃蟹，壳上长满了青苔和小石子。它记得每一个从门前经过的人。',art:(x,y)=>SPR.crab(x,y+2,0,0),got:()=>SAVE.story.pre6,how:'第七章'},
 {id:'c_mimic',cat:'life',n:'拟珠蟹',r:3,hab:'海藻迷林',st:[4,2,3],real:false,d:'把自己缩成一颗珍珠的样子，等猎物靠近再猛地炸开尖刺。颜色发绿、会眨眼的就是它。',art:PIX.mimic,got:()=>SAVE.story.pre7,how:'第八章'},
 {id:'a_pendant',cat:'art',n:'贝壳吊坠',r:4,hab:'奶奶的围裙口袋',st:[1,5,3],real:false,d:'戴上它走进海里，人会变成鱼。后来才知道，它本来是让海里的人上岸用的。',art:(x,y)=>SPR.pendant(x,y,0,1),got:()=>SAVE.story.pro,how:'序章'},
 {id:'a_book',cat:'art',n:'菜谱本',r:3,hab:'海边小馆',st:[1,3,1],real:false,d:'奶奶手写的菜谱，缺了几页。它真正的名字叫《潮味谱》，每片海一页，现在只写了第一页。',art:(x,y)=>{R(x-9,y-8,18,16,'#8a5a2b');R(x-7,y-6,14,12,'#fff3d6');R(x,y-6,1,12,'#8a5a2b');for(let i=0;i<3;i++){R(x-5,y-4+i*3,4,1,'#9aa8b5');R(x+2,y-4+i*3,4,1,'#9aa8b5')}},got:()=>SAVE.story.pre1,how:'第二章'},
 {id:'a_wall',cat:'art',n:'黄色能量墙',r:2,hab:'黄金海沟',st:[4,4,1],real:false,d:'把鱼群围起来的发光墙。它的光不是自己的，是从潮心里抽出来的。',art:PIX.wall,got:()=>SAVE.story.pre4,how:'第五章'},
 {id:'a_heart',cat:'art',n:'潮心',r:4,hab:'五片海的深处',st:[5,5,1],real:false,d:'海的颜色从这里来。一片海有一颗，被关起来的时候，那片海就会慢慢褪色。',art:(x,y)=>SPR.heart(x,y,0,0),got:()=>SAVE.story.post6,how:'第七章'},
 {id:'a_conch',cat:'art',n:'潮音螺',r:4,hab:'潮心井',st:[1,2,5],real:false,d:'对着它说话，守在潮心井的奶奶就能听见。她的回答有时候只有一句。',art:PIX.conch,got:()=>SAVE.conch,how:'第十一章'}];
SAVE.stat=SAVE.stat||{};SAVE.sight=SAVE.sight||{};
PEOPLE.aqiang={H:'#2c2c3a',T:'#4a7ac8',L:'#3a3a4a',D:'#ffd9b3'};
const emoPix=ch=>(x,y)=>{px.font='18px serif';px.textAlign='center';px.textBaseline='middle';px.fillStyle='#000';px.fillText(ch,x,y+1)};
const manPix=k=>(x,y)=>human(k,x,y+9);
DISH.forEach(d=>{const m=methodOf(d.id);DEX.push({id:d.id,cat:'dish',n:d.n,r:d.p<20?1:d.p<35?2:d.p<60?3:4,tag:'小馆的料理',art:emoPix(d.ic),got:()=>SAVE.dishes[d.id]>0,clue:'在小馆把这道菜端上桌',
  get d(){return`用${Object.entries(d.need).map(([k,n])=>FISH[k].n+(n>1?'×'+n:'')).join('、')}做成，在${STN[m][1]}上完成。小馆里一份卖 ${d.p} 珍珠，已经上过 ${SAVE.dishes[d.id]||0} 次。`}})});
[['kid','小鱼',3,()=>SAVE.story.pro,'渔村里的男孩。怕水、嘴硬、不会做饭，天天说“明天就把店卖掉”。舌头却灵得出奇，尝一口就知道缺什么。',manPix('kid')],
 ['achao','阿潮',2,()=>SAVE.story.post0,'村里的老渔民，嘴最毒的老主顾。每道菜都说难吃，却一天不落地来。',manPix('achao')],
 ['turtle','老龟',3,()=>SAVE.story.pre0,'珊瑚湾的海灵。说话极慢，一句话没说完，听的人已经游走了。',(x,y)=>SPR.turtle(x-2,y+2,0,0)],
 ['xiaoman','阿珍',2,()=>SAVE.story.post3,'从远洋号上下来的厨娘，口头禅是“我算过了”，可账从来没算对过。她说留下来是因为小馆缺人掌勺。',manPix('xiaoman')],
 ['octo','墨墨',3,()=>SAVE.story.pre1,'八只手的杂货铺老板，永远在喊“亏了”，却总偷偷给小鱼算便宜。',(x,y)=>SPR.octo(x,y+2,0,0)],
 ['shark','大白',3,()=>SAVE.story.pre2,'深海里追着小鱼不放的鲨鱼。它不坏，只是饿。',(x,y)=>SPR.shark(x+2,y+1,0,0)],
 ['whale','鲸婆婆',4,()=>SAVE.story.pre3,'冰海的海灵，把谁都当小孩的话痨，爱唱歌，永远跑调。鲸鱼结界是她给的。',(x,y)=>SPR.whale(x+3,y+1,0,0)],
 ['haisheng','海生',3,()=>SAVE.story.post3,'远洋号的船长，阿潮的儿子。敢顶着风出海，却不敢叫一声爹。',manPix('haisheng')],
 ['aqiang','阿强',2,()=>SAVE.story.post1,'话少力气大的跑堂，几乎只会说“可以”，一只手能端五摞碗。',manPix('aqiang')],
 ['doctor','老船医',3,()=>SAVE.story.guest,'爱讲航海故事的路痴，开口就是“说来话长”。他的故事没人信，偏偏都是真的。',manPix('doctor')],
 ['achen','阿澄',4,()=>SAVE.story.post9,'澄光商会的首领，奶奶年轻时的搭档。从不发火，句句在理：“你说得对。可是——”',manPix('achen')],
 ['granny','阿汐（奶奶）',4,()=>SAVE.story.post10,'小馆原来的主人，爱留纸条，报喜不报忧。她本来是海里的人，如今守着最后一颗潮心。',(x,y)=>SPR.granny(x,y+2,0,0)]
].forEach(a=>DEX.push({id:'p_'+a[0],cat:'who',n:a[1],r:a[2],tag:'故事里的人物',got:a[3],d:a[4],art:a[5],clue:'随着故事出场'}));
['村子外面最近的一片浅海。珊瑚曾经褪成灰白，如今又红了回来。','一艘老船沉在这里很多年了，墨墨把它当成了家和店铺。','光照不到的深处。这里以前有很多鱼，大白也不用追着人跑。','浮冰下面的海。鲸婆婆在这里住了很久很久。','金色珊瑚生长的海沟，远洋号曾在这里竖起黄色的墙。','淡水和海水交汇的洞穴，一片漆黑，只有盐花和海葡萄在发光。','石门后面的古老遗迹，壁画上画着五颗潮心。','海藻长得比船桅还高的林子。在这里，不是所有发光的东西都是珍珠。','洋流忽上忽下的深沟，澄光商会的收光船常从这里经过。','海底的灯城，很美。每一盏灯的光，都是从潮心里抽出来的。','最深的一口井，奶奶守着最后一颗潮心的地方。','五颗潮心回到原位的那一天，五片海一起亮了起来。']
 .forEach((d,i)=>DEX.push({id:'s_'+i,cat:'sea',n:LV[i].name,r:1+Math.floor(i/3.5),tag:'第 '+(i+1)+' 章的海域',d,got:()=>cleared(i),clue:'通关这片海域',art:()=>{const a=CW,b=CH2;CW=48;CH2=30;bgSea(i,14,{i:LV[i].theme});CW=a;CH2=b}}));
[['百鱼之友','🎣',2,()=>(SAVE.stat.caught||0)>=100,'累计捕到 100 条鱼','出海一百次不稀奇，记得每一条鱼的名字才稀奇。'],
 ['火候大师','🔥',3,()=>(SAVE.stat.perfect||0)>=30,'营业时做出 30 次“刚好”','早一秒生，晚一秒老。'],
 ['无伤泳者','🛡️',2,()=>SAVE.stat.nodmg,'任意一关不受伤通关','从头到尾，一片鳞都没掉。'],
 ['深潜者','🌊',3,()=>SAVE.end.dist>=500,'无限模式游到 500 米','再往前，连光都跟不上了。'],
 ['座无虚席','🪑',3,()=>(SAVE.stat.maxServe||0)>=12,'一场营业上菜 12 道','这一晚，小馆的灯亮到很晚。'],
 ['连击高手','✨',2,()=>(SAVE.stat.combo||0)>=30,'一局内连击达到 30','珍珠一颗接一颗，像在水里写了一行字。'],
 ['宴席满分','🍽️',4,()=>SAVE.stat.banq6,'宴席挑战十道全上','没有帮手，十位宾客，一道没落。'],
 ['迎难而上','💪',4,()=>SAVE.hard.st[0]>0,'在困难模式通关珊瑚湾','只有一颗星，也游到了终点。']
].forEach((a,i)=>DEX.push({id:'f_'+i,cat:'feat',n:a[0],r:a[2],tag:'事迹',got:a[3],clue:a[4],d:a[5]+'（'+a[4]+'）',art:emoPix(a[1])}));
Object.keys(FISH).filter(k=>!FISH[k].x&&k!=='gold').forEach(k=>DEX.push({id:'x_'+k,cat:'fish',hid:1,n:'金鳞'+FISH[k].n,r:4,real:false,hab:'任何有'+FISH[k].n+'的海域',st:[3,3,4],d:'浑身金鳞的'+FISH[k].n+'，一百条里也未必有一条。老渔民说，见到它的那天运气会很好。',art:pixFish(k,{...FISH[k],c:['#fffbe0','#ffcf2e','#d99400'],glow:1}),got:()=>SAVE.dex['x_'+k]>0}));
const DEXIMG={};
function dexImg(c){if(DEXIMG[c.id])return DEXIMG[c.id];pcv.width=48;pcv.height=30;px.clearRect(0,0,48,30);c.art(24,15);return DEXIMG[c.id]=pcv.toDataURL()}
let bookTab='fish',bookSel='';
if(!SAVE.dexRead){SAVE.dexRead={};for(const c of DEX)if(c.got())SAVE.dexRead[c.id]=1}
const dexNew=c=>c.got()&&!SAVE.dexRead[c.id];
const BTABS=[['fish','鱼类'],['ing','食材'],['dish','料理'],['life','生灵'],['who','人物'],['sea','海域'],['art','器物'],['feat','事迹']];
function showBook(){
  const base=DEX.filter(c=>!c.hid),hidGot=DEX.filter(c=>c.hid&&c.got()).length;const v1=base.filter(c=>c.vol!==2&&c.got()).length,v2=base.filter(c=>c.vol===2&&c.got()).length;$('bookProg').textContent=`第一卷 · 已收录 ${v1} 张`+(v2?` · 第二卷 ${v2} 张`:'')+(hidGot?` · 隐藏卡 ${hidGot} 张`:'');
  const inCat=DEX.filter(c=>c.cat===bookTab&&(!c.hid||c.got())),list=bookTab==='feat'?inCat:inCat.filter(c=>c.got()).concat(inCat.filter(c=>!c.got()).slice(0,1));if(!list.some(c=>c.id===bookSel))bookSel=(list.find(c=>c.got()&&!dexNew(c))||list.find(c=>c.got())||list[0]).id;const cur=list.find(c=>c.id===bookSel),g=cur.got();if(g&&!SAVE.dexRead[cur.id]){SAVE.dexRead[cur.id]=1;persist()}
  const bar=(n,lab)=>`<span class="pst"><em>${lab}</em>${'<i class="on"></i>'.repeat(n)}${'<i></i>'.repeat(5-n)}</span>`;
  $('bookTabs').innerHTML=BTABS.map(t=>{const l=base.filter(c=>c.cat===t[0]);return`<button class="tab ${t[0]===bookTab?'on':''}" data-bt="${t[0]}">${t[1]} ${l.filter(c=>c.got()).length}${DEX.some(c=>c.cat===t[0]&&dexNew(c))?'<i class="dot"></i>':''}</button>`}).join('');
  $('bookInfo').innerHTML=g?`<div class="pinfo" style="--rc:${RCOL[cur.r]}"><img src="${dexImg(cur)}" alt=""><div><h3>${cur.n}</h3><span class="ptag" style="background:${RCOL[cur.r]}">${'★'.repeat(cur.r)} ${RAR[cur.r]}</span><span class="ptag">${cur.hid?'隐藏卡':cur.tag||(cur.real?'现实中存在':'这片海的传说')}</span></div></div><p>${cur.d}</p>${cur.st?`<div class="pstats">${bar(cur.st[0],'力量')}${bar(cur.st[1],'耐力')}${bar(cur.st[2],'速度')}</div>`:''}${cur.ref?'<p class="note">'+(cur.ref===2?'百科内容已对照维基百科等公开资料核对':(cur.id==='saury'||cur.id==='bream')?'百科内容已按 Hastings 等《Fishes》(2014) 和维基百科核对':'百科内容已按 Hastings 等《Fishes: A Guide to Their Diversity》(2014) 核对')+'</p>':''}${cur.hab?`<p class="note">游戏里的栖息地：${cur.hab}${SAVE.dex[cur.id]?' · 累计获得 '+SAVE.dex[cur.id]+' 次':''}</p>`:''}`
    :`<div class="pinfo"><div class="pback big">？</div><div><h3>尚未收录</h3></div></div><p class="note">${bookTab==='feat'?'这一页还是空的。':'后面还有没翻开的页。'}${cur.clue||(cur.cat==='fish'||cur.cat==='ing'?'出海时也许会遇到。':'它会随着故事出现。')}</p>`;
  $('bookGrid').innerHTML=list.map(c=>{const ok=c.got();return ok?`<button class="pcd ${c.id===bookSel?'sel':''}" data-card="${c.id}" style="--rc:${RCOL[c.r]}">${dexNew(c)?'<span class="nw">NEW</span>':''}<img src="${dexImg(c)}" alt=""><span class="pn">${c.n}</span><span class="pr">${'★'.repeat(c.r)}</span></button>`
    :`<button class="pcd unk ${c.id===bookSel?'sel':''}" data-card="${c.id}"><span class="pback">？</span><span class="pn">？？？</span><span class="pr">${c.cat==='feat'?'★'.repeat(c.r):'…'}</span></button>`}).join('');
  show('sBook')}
$('sBook').addEventListener('click',e=>{const t=e.target.closest('[data-bt]'),c=e.target.closest('[data-card]');if(t){bookTab=t.dataset.bt;bookSel='';SFX.tap();showBook()}else if(c){bookSel=c.dataset.card;SFX.tap();showBook()}});
$('bBook').onclick=()=>{SFX.tap();showBook()};

