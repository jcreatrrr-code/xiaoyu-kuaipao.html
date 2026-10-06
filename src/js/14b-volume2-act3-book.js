/* 第三幕：新食材、新海域、新菜、石焖宴事迹 */
Object.assign(PIX,{
 grouper(x,y){El(x,y,11,5,'#a8643a');for(let i=0;i<5;i++)R(x-7+i*3,y-2+(i%2)*3,2,2,'#5a3018');R(x-15,y-3,4,7,'#7a4020');El(x+7,y+2,3,2,'#f6e2c8');R(x+6,y-2,1,1,'#1b2a41')},
 tako(x,y){El(x,y-3,6,5,'#e0705a');for(let i=0;i<5;i++)R(x-6+i*3,y+1,2,5+(i%2)*2,'#e0705a');R(x-3,y-4,2,2,'#fff');R(x+2,y-4,2,2,'#fff')},
 parrot(x,y){El(x,y,10,5,'#3fc8a8');R(x-14,y-3,4,7,'#2a7aa0');R(x-4,y-2,2,2,'#ffd23f');R(x,y+1,2,2,'#ff8fc0');R(x+9,y-1,3,2,'#e8fff8');R(x+6,y-2,1,1,'#1b2a41')}});
const V2C3=[
 ic('grouper',2,'熔岩海岸',[2,3,2],'身上有一块块深色的斑点，喜欢躲在礁石洞里，一动不动地等小鱼游过。长得慢，岛上的渔夫只挑够大的抓。',1),
 ic('tako',3,'浮石海',[3,2,1],'身子软得能钻进比眼睛还小的缝。它爱躲进空罐子、空螺壳里，渔夫就用陶罐沉到海底等它自己钻进来。',1),
 ic('parrot',2,'星光海',[1,1,3],'嘴像鹦鹉，能把珊瑚咬碎。环礁上白白的沙子，很大一部分是它吃了珊瑚以后排出来的。夜里会吐一层黏黏的“睡袋”把自己裹住。',1)];
V2C3.forEach(c=>{c.ref=0;c.vol=2});Object.assign(V2C3[0],{cat:'fish',how:'去熔岩海岸，在海底的石缝边找'});Object.assign(V2C3[1],{how:'带上章鱼罐去浮石海'});Object.assign(V2C3[2],{cat:'fish',how:'去星光海，顺着星线找'});
['火山炸开以后，熔岩块一块块砸进海里，砸到底还烫着。','漂满浮石的海，浮石吸饱了水就往下沉。','灯全熄了，只剩星星的倒影给人认路。','灯塔的光都回到了海里，全岛的人围着一个地炉吃饭。']
 .forEach((d,j)=>{const i=VOL1+8+j;V2C3.push({id:'s_'+i,cat:'sea',n:LV[i].name,r:3+Math.floor(j/2),tag:'第二卷第 '+(j+9)+' 章的海域',d,got:()=>cleared(i),clue:'通关这片海域',art:emoPix(['🌋','🪨','✨','🔥'][j]),vol:2})});
V2C3.push({id:'f_feast2',cat:'feat',n:'石焖宴',r:4,tag:'事迹',got:()=>SAVE.feast2,clue:'办成石焖宴',d:'全岛的人围着一个地炉吃了一顿饭，连商会的掌柜也坐过来了。（办成石焖宴）',art:emoPix('🔥'),vol:2},
 {id:'f_feast12',cat:'feat',n:'一个都没落下',r:5,tag:'事迹',got:()=>SAVE.stat.feast12,clue:'石焖宴十二道全上',d:'十二位客人，十二道菜，一道没落。（石焖宴十二道全上）',art:emoPix('🍽️'),vol:2});
for(const c of DEX)if(['d66','d67','d68','d69','d70','d71','d72'].includes(c.id))c.vol=2;
V2C3.forEach(c=>DEX.push(c));
