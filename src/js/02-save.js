/* ---------- save ---------- */
const KEY='xiaoyu_kuaipao_v1';
let SAVE={simple:{st:[0,0,0,0,0],s4:[0,0,0,0,0]},hard:{st:[0,0,0,0,0],s4:[0,0,0,0,0]},end:{score:0,dist:0,combo:0},mute:0};
try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&s.simple&&s.hard&&s.end)SAVE=s}catch(e){}
SAVE=Object.assign({wallet:0,inv:{},use:{},skins:[0],skin:0},SAVE);
const ITEMS=[
 {id:'gold',ic:'🐠',n:'金鱼结界',d:'出发就带着结界，挡一次普通危险',p:30},
 {id:'whale',ic:'🐋',n:'鲸鱼结界',d:'连大鲨鱼也能挡住一次！',p:80},
 {id:'life',ic:'⭐',n:'生命星',d:'出发时多带一颗星',p:50},
 {id:'revive',ic:'🌟',n:'复活海星',d:'失败时复活一次，恢复 2 颗星',p:120},
 {id:'scissors',ic:'✂️',n:'渔网剪刀',d:'第一次被网住时自动剪开',p:35},
 {id:'radar',ic:'📡',n:'鲨鱼雷达',d:'鲨鱼预警提前 1 秒',p:35},
 {id:'magnet',ic:'🧲',n:'珍珠磁铁',d:'整局自动吸来附近的珍珠',p:40,h:'帮手道具（每局用掉一个）'},
 {id:'double',ic:'💰',n:'双倍珍珠袋',d:'本局存入钱包的珍珠翻倍',p:50},
 {id:'netbag',ic:'🥅',n:'捕鱼网兜',d:'本局所有鱼点一下就能捕获',p:45},
 {id:'bait',ic:'🪱',n:'幸运鱼饵',d:'本局游来的鱼多一倍',p:40},
 {id:'slow',ic:'🐢',n:'慢慢游海藻',d:'本局游得慢一点，更好躲',p:40}];
const SKINS=[{n:'橙色小鱼',p:0,c:['#ffe08a','#ffa01f','#ff7f1f']},{n:'蓝色小鱼',p:200,c:['#d2f4ff','#56b8f0','#2f8fd0']},
 {n:'粉色小鱼',p:200,c:['#ffe6f1','#ff8fc0','#f0589a']},{n:'翡翠小鱼',p:400,c:['#dcffee','#4fe0b5','#1c9c7a']},
 {n:'紫罗兰小鱼',p:300,c:['#efe0ff','#b57af2','#7d45c9']},{n:'墨墨小鱼',p:300,c:['#c8d0dc','#56627a','#2c3446']},{n:'黄金小鱼',p:800,c:['#fffbe0','#ffcf2e','#d99400']}];
SAVE=Object.assign({fish:{},dishes:{}},SAVE);
const FISH={sard:{n:'沙丁鱼',c:['#eef7ff','#9cc4e8','#5f8fc0'],s:.72,hp:1,v:30},bream:{n:'鲷鱼',c:['#ffdcd4','#ff7a6b','#d94f45'],s:.88,hp:1,v:45},
 salmon:{n:'三文鱼',c:['#ffe6d4','#ff9a6a','#e0683a'],s:1,hp:2,v:60},puffer:{n:'河豚',c:['#fff8c8','#f2d24a','#c9a21a'],s:1.05,hp:2,v:35},tuna:{n:'金枪鱼',c:['#d4e2ff','#4a6fc0','#2a4690'],s:1.3,hp:3,v:85},
 yellow:{n:'小黄鱼',c:['#fffbd0','#ffe14a','#e0b400'],s:.7,hp:1,v:35},saury:{n:'秋刀鱼',c:['#f0f8ff','#8fb4d8','#4a6f9a'],s:.68,hp:1,v:75,lx:1.6},
 mack:{n:'鲭鱼',c:['#e0fff4','#3fb89a','#1c7f6a'],s:.92,hp:2,v:60,stripe:1},cod:{n:'鳕鱼',c:['#ffffff','#c8d4dc','#8fa0ac'],s:1.05,hp:2,v:40},
 eel:{n:'鳗鱼',c:['#e8dcc8','#9a7650','#5a4028'],s:.78,hp:2,v:55,lx:1.9},angler:{n:'鮟鱇鱼',c:['#d8c8f0','#7a5aa8','#4a3478'],s:1.15,hp:3,v:30,lamp:1},
 sword:{n:'旗鱼',c:['#d8ecff','#3f7fd0','#1f4f9a'],s:1.2,hp:3,v:95,bill:1,lx:1.25},gold:{n:'黄金鱼',c:['#fffbe0','#ffcf2e','#d99400'],s:.95,hp:3,v:80,glow:1,stripe:1},
 salt:{n:'月光盐花',c:['#ffffff','#bfe6ff','#7fb8f0'],s:1,x:1},grape:{n:'海葡萄',c:['#e6ffd9','#7fe0a0','#3fa870'],s:1,x:1},scallop:{n:'潮汐扇贝',c:['#fff3e6','#ffb38a','#e0784a'],s:1,x:1},urchin:{n:'海胆',c:['#e6d9ff','#7a5ad0','#3a2a70'],s:1,x:1},shrimp:{n:'逆潮虾',c:['#ffe6e0','#ff8f8a','#d0504a'],s:1,x:1},squid:{n:'灯下鱿鱼',c:['#ffffff','#f0e0f5','#b89ac8'],s:1,x:1},dew:{n:'潮心露',c:['#ffffff','#9ff0ff','#3fb8d8'],s:1,x:1}};
const DISH=[
 {id:'d1',ic:'🍢',n:'烤沙丁鱼',need:{sard:2},p:20},{id:'d2',ic:'🍜',n:'鱼丸汤',need:{sard:1,bream:1},p:25},
 {id:'d3',ic:'🍽️',n:'清蒸鲷鱼',need:{bream:2},p:30},{id:'d4',ic:'🍳',n:'香煎三文鱼',need:{salmon:1,sard:1},p:35},
 {id:'d5',ic:'🍣',n:'三文鱼寿司',need:{salmon:2},p:50},{id:'d6',ic:'🍲',n:'河豚火锅',need:{puffer:2},p:60},
 {id:'d7',ic:'🍱',n:'金枪鱼刺身',need:{tuna:1},p:50},{id:'d8',ic:'🍙',n:'金枪鱼饭团',need:{tuna:1,bream:1},p:65},
 {id:'d9',ic:'🥘',n:'海鲜大拼盘',need:{sard:1,bream:1,salmon:1,puffer:1,tuna:1},p:220},
 {id:'d10',ic:'🥫',n:'沙丁鱼罐头',need:{sard:3},p:32},{id:'d11',ic:'🍕',n:'沙丁鱼披萨',need:{sard:2,bream:1},p:38},
 {id:'d12',ic:'🍛',n:'红烧鲷鱼',need:{bream:3},p:48},{id:'d13',ic:'🍚',n:'鲷鱼茶泡饭',need:{bream:1,salmon:1},p:42},
 {id:'d14',ic:'🥗',n:'三文鱼沙拉',need:{salmon:1},p:25},{id:'d15',ic:'🍔',n:'三文鱼汉堡',need:{salmon:1,bream:1},p:42},
 {id:'d16',ic:'🍥',n:'三文鱼咖喱饭',need:{salmon:2,sard:1},p:62},{id:'d17',ic:'🍤',n:'炸河豚块',need:{puffer:1},p:30},
 {id:'d18',ic:'🥟',n:'河豚饺子',need:{puffer:1,sard:2},p:52},{id:'d19',ic:'🥣',n:'海鲜粥',need:{puffer:1,sard:1},p:42},
 {id:'d20',ic:'🥪',n:'金枪鱼三明治',need:{tuna:1,sard:1},p:62},{id:'d21',ic:'🌮',n:'金枪鱼卷饼',need:{tuna:1,salmon:1},p:78},
 {id:'d22',ic:'🍝',n:'金枪鱼意面',need:{tuna:2},p:105},{id:'d23',ic:'🥙',n:'三鲜鱼糕',need:{bream:1,salmon:1,puffer:1},p:75},
 {id:'d24',ic:'👑',n:'深海皇家宴',need:{sard:2,bream:2,salmon:2,puffer:2,tuna:2},p:500},
 {id:'d25',ic:'🍘',n:'香酥小黄鱼',need:{yellow:2},p:24},{id:'d26',ic:'🍡',n:'三色鱼丸串',need:{yellow:1,saury:1,sard:1},p:40},
 {id:'d27',ic:'🔥',n:'盐烤秋刀鱼',need:{saury:2},p:30},{id:'d28',ic:'🫕',n:'味噌鲭鱼',need:{mack:2},p:50},
 {id:'d29',ic:'🍟',n:'炸鳕鱼薯条',need:{cod:2},p:56},{id:'d30',ic:'🌯',n:'鳕鱼卷',need:{cod:1,mack:1},p:55},
 {id:'d31',ic:'🧊',n:'冰海双拼',need:{cod:1,salmon:1},p:55},{id:'d32',ic:'🍘',n:'蒲烧鳗鱼饭',need:{eel:2},p:60},
 {id:'d33',ic:'🍜',n:'鳗鱼拉面',need:{eel:1,yellow:1},p:45},{id:'d34',ic:'🏮',n:'鮟鱇鱼锅',need:{angler:1},p:55},
 {id:'d35',ic:'🥩',n:'香煎旗鱼排',need:{sword:1},p:60},{id:'d36',ic:'🏆',n:'黄金鱼汤',need:{gold:1},p:90}];
const skin=()=>{const c=(SKINS[SAVE.skin]||SKINS[0]).c;return{c0:c[0],c1:c[1],c2:c[2]}};
const persist=()=>{try{localStorage.setItem(KEY,JSON.stringify(SAVE))}catch(e){}};

