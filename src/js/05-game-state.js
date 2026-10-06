/* ---------- game state ---------- */
let G=null,state='menu',hold=false,menuT=0,lastArgs=null;
const TIPS={mimic:'发绿、会眨眼的“珍珠”是拟珠蟹，离它远一点！',cur:'水里有洋流！朝箭头的反方向用力',beam:'躲开来回移动的光圈！',btn:'先碰亮贝壳按钮，前面的石门才会打开！',node:'发光的是洞穴食材，用手指点它来采集！',octo:'章鱼触手发光时，离它远一点！',net:'渔网来了！绕开它游过去',wall:'黄色墙不能撞！跟着箭头走',shield:'吃掉金鱼泡泡，获得结界保护！',
  jelly:'水母会电人，别碰它！',vortex:'旋涡会把小鱼吸过去！',ice:'小心漂动的冰块！',friend:'碰一碰泡泡，救出小伙伴！',rock:'绕开礁石，跟着珍珠游！',cp:'贝壳旗是检查点'};
let toastTimer=0;
function toast(msg,dur,warn){const el=$('toast');el.textContent=msg;el.className='on'+(warn?' warn':'');clearTimeout(toastTimer);toastTimer=setTimeout(()=>{el.className=''},(dur||2.4)*1000)}

function startGame(mode,li){
  lastArgs=[mode,li];const endless=mode==='endless',L=endless?null:LV[li],gen=endless?buildEndless():buildLevel(li,mode);
  const life=mode==='hard'?1:3;
  G={mode,li,L,gen,E:gen.E,t:0,scroll:0,speed:0,life,maxLife:life,pearls:0,rescued:0,combo:0,comboT:0,maxCombo:0,bonus:0,
     shield:false,shieldUsed:0,inv:0,slowT:0,trap:null,sharks:[],cp:0,noDmg:true,fish:{y:0,vy:0},parts:[],texts:[],shake:0,flash:0,
     theme:endless?0:L.theme,lvl:0,whale:false,magnet:false,caught:{},nCaught:0,buff:{},tips:{},dead:0,cause:'',bubT:0,pruneT:0,hudKey:''};
  G.faded=!endless&&!L.dark&&(li<5||L.vol===2)&&!(SAVE.simple.st[li]>0||SAVE.hard.st[li]>0);G.orb=!endless&&L.escort?{y:0,hp:3,inv:0}:null;
  const used=[];for(const it of ITEMS)if(SAVE.inv[it.id]>0&&SAVE.use[it.id]!==0){SAVE.inv[it.id]--;used.push(it.n);
    if(it.id==='gold')G.shield=true;else if(it.id==='whale')G.whale=true;else if(it.id==='magnet')G.magnet=true;else if(it.id==='life'){G.life++;G.maxLife++}else G.buff[it.id]=true}
  if(G.buff.bait){gen.bait=true;for(const e of G.E.slice())if(e.t==='wild')G.E.push({...e,x:e.x+150,f:clamp(1.05-e.f,.15,.85),ph:e.ph+2})}
  if(used.length)persist();
  {const gone=lastUsed.filter(n=>!used.includes(n));lastUsed=used.slice();if(gone.length)setTimeout(()=>{if(G&&state==='play')toast('已用完：'+gone.join('、')+'（可去杂货铺再买）',3)},3600)}
  hold=false;state='play';
  document.querySelectorAll('.scr').forEach(s=>s.classList.remove('on'));
  hud.hidden=false;$('prog').hidden=endless;resize();G.fish.y=(yMin+yMax)/2;
  toast((endless?'无限模式：能游多远就游多远！':'目标：'+goalText(L,mode==='hard'?1:0))+(used.length?' · 已带上：'+used.join('、'):''),3.4);
  if(mode==='simple'&&li===0)setTimeout(()=>{if(G&&state==='play'&&G.t<6)toast('按住屏幕，让小鱼向上游！',3)},3100);
}
function burst(x,y,c,n,k){for(let i=0;i<n;i++){const a=Math.random()*TAU,v=60+Math.random()*180;G.parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:.5+Math.random()*.4,c,r:3+Math.random()*4,k})}}
function ftext(s,x,y,c){s=tl(s);G.texts.push({s,x,y,t:1.1,c:c||'#fff'})}
function useShield(){const g=G;g.shield=false;g.shieldUsed++;g.inv=1;SFX.pop();burst(fishSX,g.fish.y,'#ffd23f',16);ftext('结界挡住了！',fishSX,g.fish.y-50,'#ffe27a')}
function useWhale(shark){const g=G;g.whale=false;g.shieldUsed++;g.inv=shark?1.6:1;SFX.pop();SFX.free();burst(fishSX,g.fish.y,'#7fd8ff',20);burst(fishSX,g.fish.y,'#fff',10,1);ftext(shark?'鲸鱼结界挡住了鲨鱼！':'鲸鱼结界挡住了！',fishSX,g.fish.y-60,'#bff0ff')}
const absorb=()=>G.shield?useShield():useWhale();
function hurt(n){const g=G;if(SAVE.god&&SAVE.dev)return 0;if(g.inv>0)return 0;if(g.shield||g.whale){absorb();return 0}
  if(g.boss&&g.boss.k==='chase'&&!g.boss.done)g.boss.gap-=22;g.life=Math.max(0,g.life-n);g.noDmg=false;g.combo=0;g.inv=1.4;g.shake=.3;SFX.hit();burst(fishSX,g.fish.y,'#ff6b6b',10);
  ftext(n>=1?'-1 星':'-半星',fishSX,g.fish.y-50,'#ffb3b3');if(g.life<=0)die('hp');return 1}
function die(c){const g=G;if(state!=='play')return;if(SAVE.god&&SAVE.dev){g.life=g.maxLife;g.inv=1;return}
  if(g.boss&&!g.boss.done){g.noDmg=false;g.boss.tries=(g.boss.tries||0)+1;bossRetry();return}
  if(g.buff.revive){g.buff.revive=false;g.life=Math.max(1,Math.min(2,g.maxLife));g.inv=2.5;if(g.trap)g.trap.e.gone=1;g.trap=null;g.sharks=[];g.flash=.5;SFX.win();burst(fishSX,g.fish.y,'#ffd23f',24);toast('复活海星救了小鱼！',2.2);return}
  if(g.mode!=='endless'&&g.cp>0){g.noDmg=false;if(g.trap)g.trap.e.gone=1;g.trap=null;g.sharks=[];g.flash=.5;g.shake=.4;SFX.lose();g.life=Math.max(1,g.cpLife||1);restoreCP('回到检查点，带着当时的 '+g.life+' 颗星再来');return}
  g.life=0;g.cause=c;g.dead=1.2;g.trap=null;state='dying';g.shake=.4;SFX.lose()}
function restoreCP(msg){const g=G;if(SAVE.god&&SAVE.dev){g.inv=1.5;return}g.scroll=g.cp;g.noDmg=false;g.combo=0;g.sharks=[];g.inv=2;g.flash=.5;g.fish.y=(yMin+yMax)/2;g.fish.vy=0;SFX.hit();
  for(const e of g.E){if(e.x<=g.cp+fishSX)continue;e.dx=0;e.trig=0;e.broken=0;e.hold=0;if(e.t==='door'){e.open=0;e.a=0}if(e.t==='btn')e.on=0;if(e.t==='net'||e.t==='shield')e.gone=0;if(e.t==='lava'){if(e.er)e.gone=1;e.k=0;e.y=0}}
  for(const e of g.E)if(e.t==='btn'&&e.d.x>g.cp+fishSX&&e.x<=g.cp+fishSX+330){e.on=1;e.d.open=1;e.d.a=1}
  g.cpN=g.cpAt===g.cp?(g.cpN||0)+1:1;g.cpAt=g.cp;if(g.cpN>=3){const nx=g.E.filter(e=>(e.t==='door'&&!e.open||e.t==='wall'&&!e.broken)&&e.x>g.cp+fishSX).sort((p,q)=>p.x-q.x)[0];if(nx){if(nx.t==='door'){nx.open=1;const b=g.E.find(q=>q.t==='btn'&&q.d===nx);if(b)b.on=1}else nx.broken=1;setTimeout(()=>{if(G===g&&state==='play')toast(nx.t==='door'?'石蟹看不下去了，替你把门打开了':'前面的黄色墙裂开了',2.6)},2300)}}
  else if(g.cpN>=2&&!g.shield){g.shield=true;setTimeout(()=>{if(G===g&&state==='play')toast('老龟送来一个结界，再试一次！',2.4)},2300)}
  toast(msg||'撞到黄色墙，回到检查点！',2.2,1)}
function freeNet(){const g=G,tr=g.trap;tr.e.gone=1;g.trap=null;g.inv=1.6;SFX.free();burst(fishSX,g.fish.y,'#ffd23f',22);burst(fishSX,g.fish.y,'#fff',10,1);ftext('挣脱啦！',fishSX,g.fish.y-50,'#ffe27a')}
function press(){if(state!=='play')return;hold=true;G.started=true;const tr=G.trap;if(tr){tr.p++;SFX.tap();burst(fishSX,G.fish.y,'#fff',3,1);if(tr.p>=tr.need)freeNet()}}
function tryCatch(ev){const g=G;if(state!=='play'||g.trap||g.tcap)return false;const r=cv.getBoundingClientRect(),ux=(ev.clientX-r.left)/S,uy=(ev.clientY-r.top)/S;
  let best=null,bd=1e9;for(const e of g.E){if(e.gone||(e.t!=='wild'&&e.t!=='node'))continue;const sx=e.x+(e.dx||0)-g.scroll;if(sx<-40||sx>VW+40)continue;const d=Math.hypot(sx-ux,entY(e,g.t)-uy);if(d<Math.max(52,36*U)+22*FISH[e.k].s&&d<bd){bd=d;best=e}}
  if(!best)return false;const e=best,sx=e.x+(e.dx||0)-g.scroll,y=entY(e,g.t),f=FISH[e.k],tk=e.t==='node'?NODE[e.k].tool:'';
  if(tk&&!hasTool(tk)){toast(NODE[e.k].no+'（杂货铺有售）',2.2,1);return true}
  if(tk&&NODE[e.k].pot){a3PotStart(g,e);return true}
  if(tk&&NODE[e.k].timed&&!nodeOpen(e,g.t)){toast(NODE[e.k].wait||'扇贝合上了，等它张开再点',1.4);SFX.tap();return true}
  e.hp=g.buff.netbag&&!tk?0:e.hp-1;burst(sx,y,'#fff',8,1);
  if(e.hp<=0&&g.boss&&!g.boss.done&&g.boss.k==='feed'){e.gone=1;g.boss.carry=Math.min(3,g.boss.carry+1);SFX.save();burst(sx,y,f.c[1],12);ftext(g.boss.carry>=3?'拿不下了，快喂给大白！':'抓到了！点大白喂它',sx-40,y-40,'#fff');return true}
  if(e.hp<=0){e.gone=1;g.caught[e.k]=(g.caught[e.k]||0)+1;g.nCaught++;g.bonus+=30;SFX.save();burst(sx,y,f.c[1],12);ftext('捕获 '+f.n+'！',sx-40,y-40,'#fff');if(e.shiny){SAVE.dex['x_'+e.k]=(SAVE.dex['x_'+e.k]||0)+1;persist();setTimeout(()=>toast('是金鳞'+f.n+'！《奇珍书》多了一张隐藏卡',3.4),700)}if(tk&&!SAVE.tools[tk]){SAVE.rusty[tk]=0;persist();setTimeout(()=>toast('生锈的'+(tk==='chisel'?'凿子':'剪刀')+'用一次就坏了，下次得去杂货铺买新的',3),900)}}
  else{SFX.tap();if(!tk){e.f=clamp(e.f+(e.f>.5?-.18:.18),.12,.88);e.dx+=40}ftext('再点 '+e.hp+' 下！',sx-40,y-40,'#ffe27a')}
  return true}
