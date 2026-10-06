/* ---------- screens ---------- */
function show(id){document.querySelectorAll('.scr').forEach(s=>s.classList.toggle('on',s.id===id))}
function toMenu(){G=null;state='menu';hud.hidden=true;$('toast').className='';refreshMenu();show('sMenu')}
let shopTab='prot',shopSel='';
const STABS=[['prot','🛡️','保护'],['help','🧰','帮手'],['tool','🔦','工具'],['skin','🐟','变身']];
function shopItems(){
  if(shopTab==='prot'||shopTab==='help'){const i0=ITEMS.findIndex(x=>x.id==='magnet');return(shopTab==='prot'?ITEMS.slice(0,i0):ITEMS.slice(i0)).map(it=>{const n=SAVE.inv[it.id]||0,lock=chN()<ITEM_CH[it.id],on=SAVE.use[it.id]!==0;
    return{id:it.id,ic:lock?'❓':it.ic,n:lock?'？？？':it.n,d:lock?'墨墨还没有进这件货。':it.d,note:lock?'':'每局用掉一个'+(n?'，现在有 '+n+' 个':''),tag:lock?'🔒':'⚪ '+it.p,badge:n?'×'+n:'',chk:n&&on&&!lock,lock,
      st:n&&!lock?(on?'✅ 已带上：下一局出发时用掉一个':'⬜ 没带上：先放在包里'):'',
      act:lock?`<button class="btn off" disabled>🔒 通关第 ${ITEM_CH[it.id]} 关</button>`:`<button class="btn sun" data-buy="${it.id}" ${SAVE.wallet<it.p?'disabled':''}>⚪ ${it.p}</button>`+(n?`<button class="btn ${on?'off':'mint'}" data-tog="${it.id}">${on?'取下':'带上'}</button>`:'')}})}
  if(shopTab==='tool')return TOOLS.filter(t=>chN()>=(t.ch||5)).map(t=>{const own=SAVE.tools[t.id];return{id:t.id,ic:t.ic,n:t.n,d:t.d,note:'买一次，永久使用',tag:own?'已拥有':'⚪ '+t.p,own,
    act:own?'<button class="btn off" disabled>已拥有</button>':`<button class="btn sun" data-tool="${t.id}" ${SAVE.wallet<t.p?'disabled':''}>⚪ ${t.p}</button>`}});
  return SKINS.map((k,i)=>{const own=SAVE.skins.includes(i),cur=SAVE.skin===i;return{id:'s'+i,ic:`<i style="background:radial-gradient(circle at 35% 30%,${k.c[0]},${k.c[1]})${k.sp?';box-shadow:0 0 10px 3px #9ff8ff,inset 0 0 0 4px rgba(255,106,77,.55)':''}"></i>`,n:k.n,d:cur?'正在使用':own?'已拥有':k.d||'换个颜色去冒险',note:'永久拥有',tag:cur?'使用中':own?'已拥有':'⚪ '+k.p,own,
    act:own?`<button class="btn ${cur?'off':'mint'}" data-skin="${i}" ${cur?'disabled':''}>${cur?'使用中':'换上'}</button>`:`<button class="btn sun" data-skin="${i}" ${SAVE.wallet<k.p?'disabled':''}>⚪ ${k.p}</button>`}})}
function showShop(){
  $('wallet').textContent=SAVE.wallet;const items=shopItems();if(!items.some(x=>x.id===shopSel))shopSel=items[0]?items[0].id:'';const cur=items.find(x=>x.id===shopSel);
  $('shopList').innerHTML=`<div class="tabs">${STABS.map(t=>`<button class="tab ${t[0]===shopTab?'on':''}" data-stab="${t[0]}">${t[1]} ${t[2]}</button>`).join('')}</div>`
   +(items.length?`<div class="shelf">${items.map(x=>`<button class="gd ${x.id===shopSel?'sel':''} ${x.lock?'lock':''} ${x.own?'own':''}" data-sel="${x.id}"><span class="gi">${x.ic}${x.badge?`<span class="gb">${x.badge}</span>`:''}${x.chk?'<span class="gk">✓</span>':''}</span><span class="gn">${x.n}</span><span class="gp">${x.tag}</span></button>`).join('')}</div>`:'<div class="card info"><p>这一格货架还空着。</p></div>')
   +(cur?`<div class="card info"><h3>${cur.n}</h3><p>${cur.d}</p><p class="note">${cur.note}</p>${cur.st?`<p class="eqst">${cur.st}</p>`:''}<div class="rowb">${cur.act}</div></div>`:'');
  show('sShop')}
$('shopList').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const d=b.dataset;
  if(d.stab){shopTab=d.stab;shopSel='';SFX.tap();showShop();return}if(d.sel){shopSel=d.sel;SFX.tap();showShop();return}
  if(d.tool){const t=TOOLS.find(x=>x.id===d.tool);if(SAVE.wallet<t.p)return;SAVE.wallet-=t.p;SAVE.tools[t.id]=1;SFX.win()}
  else if(d.buy){const it=ITEMS.find(x=>x.id===d.buy);if(SAVE.wallet<it.p)return;SAVE.wallet-=it.p;SAVE.inv[it.id]=(SAVE.inv[it.id]||0)+1;SFX.shield()}
  else if(d.tog){SAVE.use[d.tog]=SAVE.use[d.tog]===0?1:0;SFX.tap()}
  else if(d.skin){const i=+d.skin;if(!SAVE.skins.includes(i)){if(SAVE.wallet<SKINS[i].p)return;SAVE.wallet-=SKINS[i].p;SAVE.skins.push(i);SFX.win()}SAVE.skin=i}
  persist();refreshMenu();showShop()};
const dot=k=>`<i style="background:radial-gradient(circle at 35% 30%,${FISH[k].c[0]},${FISH[k].c[1]})"></i>`;
function showKitchen(){
  ensureOrders();svPanel();const lv=restLv(),nx=REPLV[lv],pv=REPLV[lv-1];
  $('restCard').innerHTML=`<div class="stat"><span>小馆等级</span><span>Lv.${lv}「${RESTN[lv-1]}」</span></div><div class="stat"><span>声望</span><span>${SAVE.rep}${nx?' / '+nx:'（已满级）'}</span></div><div class="stat"><span>菜价加成</span><span>+${(lv-1)*2}%</span></div>${nx?`<div class="stat"><span>下一级</span><span style="text-align:end">菜价再 +2%${PERK[lv+1]?'，'+PERK[lv+1]:''}</span></div>`:''}<div id="prog2"><i style="width:${nx?Math.min(100,(SAVE.rep-pv)/(nx-pv)*100):100}%"></i></div>`;
  const needs=d=>Object.entries(d.need).map(([k,n])=>`<span class="${(SAVE.fish[k]||0)>=n?'':'no'}">${dot(k)} ${FISH[k].n}×${n}</span>`).join('　');
  $('ordList').innerHTML=SAVE.orders.list.map((o,i)=>{const d=DISH.find(x=>x.id===o.d),ok=hasFish(d);
    return`<div class="it ${o.done?'done':''}"><span class="ic">${d.ic}</span><b>${o.c}：${d.n}</b><span class="need">${needs(d)}</span><span class="act">${o.done?'<button class="btn off" disabled>已上菜 ✔</button>':`<button class="btn off" disabled>营业时到店<br>+⚪${Math.round(d.p*1.5)}</button>`}</span></div>`}).join('');
  {const have=Object.keys(FISH).filter(k=>(SAVE.fish[k]||0)>0);$('bask').innerHTML=have.length?have.map(k=>`<span>${dot(k)}${FISH[k].n} × ${SAVE.fish[k]}</span>`).join(''):'<span>鱼篓是空的，出海去捕鱼吧</span>'}
  const un=DISH.filter(unlocked),lk=DISH.filter(d=>!unlocked(d)).sort((x,y)=>(UNL[x.id][0]-UNL[y.id][0])||(UNL[x.id][1]-UNL[y.id][1]));
  $('kitList').innerHTML=un.map(d=>{const made=SAVE.dishes[d.id]||0,ok=hasFish(d);
    return`<div class="it tap ${kitOpen===d.id?'open':''}" data-rcp="${d.id}"><span class="ic">${d.ic}</span><b>${d.n}<i class="chev">›</i>${made?`<small>做过 ${made} 次</small>`:'<small>首次上菜加五成</small>'}</b><span class="need">${needs(d)}</span><span class="act"><button class="btn ${ok?'':'off'}" data-cook="${d.id}" ${ok?'':'disabled'} style="box-shadow:0 4px 0 #b9c9d6">打包外卖<br>+⚪${Math.round(d.p/2)}</button></span></div>`+(kitOpen===d.id&&RCP[d.id]?(r=>`<div class="card rcp">${r[3]?'<span class="ptag">含虚构食材</span>':''}<h4>用料</h4><p>${r[0]}</p><h4>做法</h4><ol>${r[1].map(x=>`<li>${x}</li>`).join('')}</ol>${r[2]?`<p class="note">${r[2]}</p>`:''}<p class="note">游戏里用到的食材：${Object.entries(d.need).map(([k,n])=>FISH[k].n+'×'+n).join('、')}，${M2[d.id]?'先在'+STN[M2[d.id][0]][1]+'上准备，再到'+STN[M2[d.id][1]][1]+'上完成':'在'+STN[methodOf(d.id)][1]+'上完成'}。</p></div>`)(RCP[d.id]):'')}).join('')
   +(lk.length?'<p class="sub">尚未学会</p>':'')+lk.slice(0,3).map(d=>`<div class="it lock"><span class="ic">❓</span><b>？？？</b><span class="need">一道新菜谱</span><span class="act"><button class="btn off" disabled>🔒 ${lockWhy(d)}</button></span></div>`).join('')
   ;
  {const ids=un.map(d=>d.id),seen=SAVE.seenUn||[],nw=un.filter(d=>!seen.includes(d.id));if(nw.length){if(seen.length)setTimeout(()=>toast('新菜谱：'+nw.map(d=>d.n).join('、'),3.2),300);SAVE.seenUn=ids;persist()}}
  kitShow();
  $('kitTitle').textContent=`海边小馆 · 已学会 ${DISH.filter(d=>SAVE.dishes[d.id]).length} 道`;
  show('sKit')}
$('kitList').onclick=e=>{const b=e.target.closest('button');if(!b){const r=e.target.closest('[data-rcp]');if(r){kitOpen=kitOpen===r.dataset.rcp?'':r.dataset.rcp;SFX.tap();showKitchen()}return}if(b.disabled)return;const d=DISH.find(x=>x.id===b.dataset.cook);
  if(!d||!hasFish(d)||!unlocked(d))return;const g=takeaway(d);persist();
  toast(`${d.ic} ${d.n}打包卖出，+${g} ⚪（半价）`,2.2);refreshMenu();showKitchen()};
$('ordList').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const o=SAVE.orders.list[+b.dataset.ord],d=DISH.find(x=>x.id===o.d);
  if(o.done||!hasFish(d))return;const r=cookDish(d,1);o.done=1;let msg=`${o.c}：谢谢，真好吃！+${r.gain} ⚪`;
  if(!SAVE.orders.bonus&&SAVE.orders.list.every(x=>x.done)){SAVE.orders.bonus=1;SAVE.wallet+=50;addRep(20);msg='今天的订单全部完成！额外 +50 ⚪'}
  persist();toast(msg,2.6);refreshMenu();showKitchen()};
let kitTab='open';
function kitShow(){document.querySelectorAll('#kitTabs .tab').forEach(t=>t.classList.toggle('on',t.dataset.kt===kitTab));document.querySelectorAll('#sKit .pane').forEach(p=>p.hidden=p.dataset.pane!==kitTab)}
$('kitTabs').onclick=e=>{const b=e.target.closest('.tab');if(b){kitTab=b.dataset.kt;SFX.tap();kitShow()}};
$('bServe').onclick=()=>startServe();
$('bKit').onclick=()=>{SFX.tap();showKitchen()};
$('bShop').onclick=()=>{SFX.tap();showShop()};
function refreshMenu(){$('menuWal').textContent=SAVE.wallet;$('bMute').textContent='音效：'+(SAVE.mute?'关':'开');const b=SAVE.end;$('bestTxt').textContent=b.score?`最高 ${b.score} 分 · ${b.dist} 米`:'不停向前，刷新你的纪录！'}
function showLevels(mode){
  if(cleared(4)&&!SAVE.story.guest){playStory(STORY.guest,()=>{SAVE.story.guest=1;persist();showLevels(mode)});return}
  {const tot=starTotal(),nx=STARGIFT[SAVE.sg||0];$('starInfo').textContent='⭐ 已集 '+tot+' 颗星'+(nx?(tot>=nx[0]?' · 下次通关领取礼物':' · 再集 '+(nx[0]-tot)+' 颗有礼物'):'')}
  lastMode=mode;document.querySelectorAll('#modeTabs .tab').forEach(t=>t.classList.toggle('on',t.dataset.mode===mode));$('lvGrid').hidden=mode==='endless';$('endPanel').hidden=mode!=='endless';if(mode==='endless'){show('sLevels');return}
  const hi=mode==='hard'?1:0,sv=SAVE[mode];$('lvTitle').textContent=(hi?'困难模式':'普通模式')+' · 选择关卡';
  const vtab=!hi&&v2Open(),vol=vtab?(SAVE.vol||2):1,base=vol===2?VOL1:0;$('volTabs').hidden=!vtab;document.querySelectorAll('#volTabs .tab').forEach(t=>t.classList.toggle('on',+t.dataset.vol===vol));
  $('lvGrid').innerHTML=LV.map((L,i)=>{if(volOf(i)!==vol)return'';const open=i===0||sv.st[i-1]>0;if(!open)return i===1||sv.st[i-2]>0?'<button class="lv" disabled><b>🔒 ？？？</b><em>通关上一关后揭晓</em><span class="mini"></span></button>':'';let st='';for(let k=0;k<3;k++)st+=`<i class="st ${sv.st[i]>k?'f':''}"></i>`;if(sv.s4[i])st+='<i class="st f"></i>';
    return`<button class="lv" data-lv="${i}" ${open?'':'disabled'}><b>${open?'':'🔒 '}第${i-base+1}关 ${L.name}</b><em>${goalText(L,hi)}</em><em>${L.tool?TOOLN[L.tool][0]+(SAVE.tools[L.tool]?' 带着':' 需要')+TOOLN[L.tool][1]:cleared(i)?'🌊 海域已恢复':'海域褪色中'}</em><span class="mini">${st}</span></button>`}).join('')+(vol===2&&!hi&&cleared(VOL1+11)?`<button class="lv" data-feast="1"><b>🔥 特别关 石焖宴</b><em>${SAVE.feast2?'已办成 · 可以再开一次':'全岛的人都在等着开席'}</em><em>十二位客人，至少上九道</em><span class="mini"></span></button>`:'');
  $('lvGrid').dataset.mode=mode;show('sLevels')}
const STARGIFT=[[4,'gold',2,'金鱼结界 ×2'],[9,'life',1,'生命星 ×1'],[14,'pearl',150,'150 颗珍珠'],[20,'whale',2,'鲸鱼结界 ×2'],[27,'revive',1,'复活海星 ×1'],[34,'pearl',400,'400 颗珍珠'],[42,'double',3,'双倍珍珠袋 ×3'],[52,'pearl',800,'800 颗珍珠'],[66,'revive',3,'复活海星 ×3'],[80,'pearl',1500,'1500 颗珍珠'],[96,'pearl',3000,'3000 颗珍珠']];
const starTotal=()=>['simple','hard'].reduce((a,m)=>a+SAVE[m].st.reduce((x,y)=>x+y,0)+SAVE[m].s4.reduce((x,y)=>x+(y?1:0),0),0);
if(SAVE.starPaid===undefined)SAVE.starPaid=starTotal();
function showEnd(win,stars,prev){
  const g=G,m=Math.floor(g.scroll/60),endless=g.mode==='endless',hi=g.mode==='hard'?1:0;state='over';hud.hidden=true;$('toast').className='';
  let title,html='',btns='';const earn=Math.round(g.pearls*(g.buff.double?2:1)*(endless?.4:1));SAVE.wallet+=earn;for(const k in g.caught)SAVE.fish[k]=(SAVE.fish[k]||0)+g.caught[k];{SAVE.stat.caught=(SAVE.stat.caught||0)+Object.keys(g.caught).reduce((a,k)=>a+(FISH[k].x?0:g.caught[k]),0);SAVE.stat.combo=Math.max(SAVE.stat.combo||0,g.maxCombo);const nw=[];for(const k in g.caught){if(!SAVE.dex[k])nw.push(FISH[k].n);SAVE.dex[k]=(SAVE.dex[k]||0)+g.caught[k]}if(nw.length&&SAVE.story.post0)setTimeout(()=>toast('《奇珍书》新收录：'+nw.join('、'),3.2),1400)}persist();
  const stat=(a,b)=>`<div class="stat"><span>${a}</span><span>${b}</span></div>`;
  if(win){const L=g.L;title='关卡完成！';
    html='<div class="big">'+stars.slice(0,3).map(s=>`<i class="st ${s?'f':''}"></i>`).join('')+(stars[3]?'<i class="st f"></i>':'<i class="st x">?</i>')+'</div>'
      +stat('收集珍珠',g.pearls+' 颗')+stat('游泳距离',m+' 米')+stat('剩余生命',g.life+' 颗星')+stat('使用结界',g.shieldUsed+' 次')+stat('最高连击',g.maxCombo+' 次')
      +'<div class="cond">'+[['完成目标：'+goalText(L,hi),1],[`收集 ${L.extra[hi]} 颗珍珠`,stars[1]],[`保留至少 ${hi?1:2} 颗星通关`,stars[2]],
        [prev?`隐藏星：无伤通关并收集 ${L.extra[hi]} 颗珍珠`:'隐藏星：再次挑战时解锁',stars[3]]].map(([c,o])=>`<span class="${o?'ok':''}">${o?'✔':'○'} ${c}</span>`).join('')+'</div>';
    {const tot=starTotal(),nw=tot-(SAVE.starPaid||0);if(nw>0){SAVE.starPaid=tot;SAVE.wallet+=nw*15;html+=stat('新得到 '+nw+' 颗星','+'+nw*15+' ⚪')}
      const got=[];while((SAVE.sg||0)<STARGIFT.length&&tot>=STARGIFT[SAVE.sg||0][0]){const m=STARGIFT[SAVE.sg||0];if(m[1]==='pearl')SAVE.wallet+=m[2];else SAVE.inv[m[1]]=(SAVE.inv[m[1]]||0)+m[2];got.push(m[3]);SAVE.sg=(SAVE.sg||0)+1}
      if(got.length)html+=stat('集星礼物（共 '+tot+' 颗星）',got.join('、'));const nx=STARGIFT[SAVE.sg||0];if(nx)html+=`<div class="cond"><span>再集 ${nx[0]-tot} 颗星，还有一份礼物</span></div>`;persist()}
    btns=(g.li<LV.length-1?'<button class="btn mint" data-act="next">下一关</button>':'')+'<button class="btn sm" data-act="retry">再次挑战</button><button class="btn sm" data-act="menu">主菜单</button>';
  }else{
    title={shark:'小鱼被鲨鱼吃掉了！',net:'小鱼没能逃出渔网…',hp:'星星用完了！',goal:'到终点了，但目标还没完成',orb:'潮心被撞灭了…'}[g.cause]||'游戏结束';
    if(endless){const sc=score(),b=SAVE.end,rec=sc>b.score;b.score=Math.max(b.score,sc);b.dist=Math.max(b.dist,m);b.combo=Math.max(b.combo,g.maxCombo);persist();
      html=(rec?'<h3>🎉 新纪录！</h3>':'')+stat('本次得分',sc+' 分')+stat('本次距离',m+' 米')+stat('收集珍珠',g.pearls+' 颗')+stat('最高连击',g.maxCombo+' 次')+stat('历史最高',b.score+' 分 · '+b.dist+' 米');
    }else html=stat('目标',goalText(g.L,hi))+stat('本次距离',m+' 米')+stat('收集珍珠',g.pearls+' 颗')+(g.L.goal.k==='rescue'?stat('救出伙伴',g.rescued+' 条'):'')+stat('最高连击',g.maxCombo+' 次')
      +(g.cause==='shark'?'<div class="cond"><span>小提示：看到红色水带，马上游到水带外面。结界挡不住鲨鱼哦！</span></div>':'');
    btns='<button class="btn mint" data-act="retry">再来一次</button><button class="btn" data-act="menu">主菜单</button>';
  }
  html+=`<div class="stat"><span>存入钱包</span><span>+${earn} ⚪${g.buff.double?'（双倍）':''}（共 ${SAVE.wallet}）</span></div>`;html+=`<div class="stat"><span>捕到的鱼</span><span>${Object.entries(g.caught).map(([k,n])=>FISH[k].n+'×'+n).join(' ')||'没有'}</span></div>`;if(endless)html+='<div class="cond"><span>无限模式的珍珠按四成存入钱包</span></div>';
  $('endTitle').textContent=title;$('endCard').innerHTML=html;$('endBtns').innerHTML=btns;show('sEnd')}
function pause(){if(state!=='play')return;state='pause';hold=false;show('sPause')}

document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>{SFX.tap();const m=b.dataset.mode;
  if(m==='hard'&&!hardOpen()){toast('先通关普通模式的全部关卡，才能挑战困难模式',2.8);return}
  if(m==='endless'&&!endOpen()){toast('先通关第 1 关「珊瑚湾」，再来无限模式',2.8);return}
  showLevels(m)});
let lastMode='simple';
$('bSail').onclick=()=>{SFX.tap();showLevels(lastMode)};$('bMore').onclick=()=>{SFX.tap();show('sMore')};$('bEndGo').onclick=()=>startGame('endless',0);
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>show(b.dataset.go));
$('bHelp').onclick=()=>show('sHelp');
$('bMusic').onclick=()=>{SAVE.music=SAVE.music===0?1:0;persist();refreshMenu();SFX.tap()};
$('bMute').onclick=()=>{SAVE.mute=SAVE.mute?0:1;persist();refreshMenu();SFX.tap()};
$('volTabs').onclick=e=>{const b=e.target.closest('[data-vol]');if(b){SFX.tap();SAVE.vol=+b.dataset.vol;persist();showLevels(lastMode)}};
$('lvGrid').onclick=e=>{const b=e.target.closest('.lv');if(b&&b.dataset.feast){startFeast2();return}if(b&&!b.disabled)launch($('lvGrid').dataset.mode,+b.dataset.lv)};
$('bPause').onclick=pause;
$('bResume').onclick=()=>{show('');state='play'};
$('bRestart').onclick=()=>startGame(...lastArgs);
$('bQuit').onclick=toMenu;
$('endBtns').onclick=e=>{const a=e.target.dataset.act;if(a==='retry')startGame(...lastArgs);else if(a==='next')launch(lastArgs[0],lastArgs[1]+1);else if(a==='menu')toMenu();else if(a==='shop'){toMenu();showShop()}else if(a==='kit'){toMenu();showKitchen()}};

cv.addEventListener('pointerdown',e=>{e.preventDefault();if(G&&G.tcap&&state==='play'){a3PotTap(e.clientX,e.clientY);return}if(G&&G.lcap&&state==='play'){a2CapTap(e.clientX,e.clientY);return}if(G&&G.boss&&G.boss.mini&&!G.boss.done&&state==='play'){if(G.boss.k==='light')lightPt(e.clientX,e.clientY,true);else herdPt(e.clientX,e.clientY);return}const B=G&&G.boss;if(!(B&&B.carry>0?bossTap(e)||tryCatch(e):tryCatch(e)||bossTap(e)))press()});
window.addEventListener('pointerup',()=>{hold=false});window.addEventListener('pointercancel',()=>{hold=false});
window.addEventListener('keydown',e=>{if(G&&G.tcap&&state==='play'){const i=['ArrowUp','ArrowRight','ArrowDown','ArrowLeft'].indexOf(e.code);if(i>=0||e.code==='Space'){e.preventDefault();if(!e.repeat)a3PotGo(G,i);return}}if(G&&G.lcap&&state==='play'){const i=['ArrowUp','ArrowRight','ArrowDown','ArrowLeft'].indexOf(e.code);if(i>=0){e.preventDefault();if(!e.repeat)a2CapGo(G,i);return}}if(e.code==='Space'||e.code==='ArrowUp'){if(state==='play'){e.preventDefault();if(!e.repeat)press()}}else if(e.code==='Escape'||e.code==='KeyP')pause()});
window.addEventListener('keyup',e=>{if(e.code==='Space'||e.code==='ArrowUp')hold=false});
window.addEventListener('resize',resize);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause()});
cv.addEventListener('contextmenu',e=>e.preventDefault());

