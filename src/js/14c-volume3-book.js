/* ---------- 第三卷的奇珍书卡片 ---------- */
Object.assign(PIX,{
 croaker(x,y){El(x,y,10,4,'#e8b830');El(x+1,y+2,7,1,'#fff0b0');R(x-13,y-3,3,7,'#9a7010');R(x-2,y-6,6,2,'#9a7010');R(x+6,y-1,1,1,'#1b2a41')},
 razor(x,y){R(x-10,y-2,20,5,'#d8b888');R(x-10,y-2,20,1,'#f4e0c0');R(x+10,y-1,3,3,'#fff6e6');R(x-12,y,2,1,'#8a6a40')},
 kelp(x,y){for(let i=-1;i<=1;i++)for(let j=0;j<14;j++)R(x+i*4+Math.round(Math.sin(j*.5+i)*2),y+7-j,3,1,j%5?'#5a7a4a':'#8aa870')}});
const V3C=[
 ic('croaker',2,'雾湾',[2,3,1],'金黄色的鱼，雾天也能找到它，因为它会“咕咕”地叫：鱼鳔一收一缩，就像敲鼓。中国东海的渔民以前听着水下的叫声下网。',1),
 ic('razor',2,'退潮滩',[1,3,1],'长长的两片壳，像一把剃刀。平时钻在泥滩深处，只把两根小管子伸到洞口吸水。退潮时看见泥上成对的小孔，就是它的家。',1),
 ic('kelp',2,'钟声礁',[1,1,1],'长在冷水礁石上的大型海藻，能长到好几米。晒干以后表面会起一层白霜，那是熬汤时鲜味的来源。',1)];
V3C.forEach(c=>{c.ref=0;c.vol=3});Object.assign(V3C[0],{cat:'fish',how:'去雾湾，听着“咕咕”声找'});Object.assign(V3C[1],{how:'带上蛏钩去退潮滩，等它冒头'});Object.assign(V3C[2],{how:'去钟声礁，在礁石后面找'});
V3C.push({id:'p_asuo',cat:'who',n:'阿蓑',r:3,tag:'故事里的人物',got:()=>SAVE.story.pro3,d:'披着蓑衣的敲钟少年，靠回声在雾里认路。从没见过太阳，却最怕雾散。口头禅是“你听。”',art:manPix('asuo'),clue:'随着故事出场',vol:3});
['常年泡在大雾里的海湾，礁石是黑的，岸上的晒鱼架空着。','一天涨落十几米的潮水，退潮后露出连着几座岛的泥滩。','雾最浓的一片礁，看不见路，只能敲钟听回声。','大潮的日子，潮水会立成一堵墙，从潮门往里推。']
 .forEach((d,j)=>{const i=VOL2+j;V3C.push({id:'s_'+i,cat:'sea',n:LV[i].name,r:1+Math.floor(j/2),tag:'第三卷第 '+(j+1)+' 章的海域',d,got:()=>cleared(i),clue:'通关这片海域',art:emoPix(['🌫️','🐚','🔔','🌊'][j]),vol:3})});
for(const c of DEX)if(['d80','d81','d82','d83','d84','d85'].includes(c.id))c.vol=3;
V3C.forEach(c=>DEX.push(c));
