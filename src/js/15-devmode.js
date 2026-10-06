/* ---------- developer mode ---------- */
let devMode='simple',devTap=0,devT=0;
$('setTitle').onclick=()=>{const n=Date.now();devTap=n-devT<1500?devTap+1:1;devT=n;if(devTap>=5){devTap=0;SAVE.dev=SAVE.dev?0:1;persist();refreshMenu();toast(SAVE.dev?'开发者模式已开启，主菜单右上角有扳手按钮':'开发者模式已关闭',3)}};
function showDev(){
  const ops=[['god','无敌：'+(SAVE.god?'开':'关')],['unlock','解锁全部关卡'],['seen','剧情全部标记已看'],['unseen','剧情全部标记未看'],['pearl','+5000 珍珠'],['gear','道具各 +5，工具全给'],['fish','鱼和食材各 +10'],['rep','声望 +300'],['banq','直接打宴席挑战'],['reset','重置存档']];
  $('devOps').innerHTML=ops.map(o=>`<button class="btn sm ${o[0]==='reset'?'coral':o[0]==='god'&&SAVE.god?'mint':''}" data-dev="${o[0]}">${o[1]}</button>`).join('');
  $('devLv').innerHTML=`<button class="btn sm sun" data-dev="mode">模式：${devMode==='hard'?'困难':'普通'}</button>`+LV.map((L,i)=>`<button class="btn sm" data-devlv="${i}">${i+1} ${L.name}</button>`).join('');
  show('sDev')}
$('sDev').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.devlv!==undefined){startGame(devMode,+d.devlv);toast('开发者：暂停菜单里可以跳到终点、Boss 或直接过关',3);return}
  if(!d.dev)return;const keys=['pro','guest','banq'];for(let i=0;i<LV.length;i++)keys.push('pre'+i,'post'+i);
  switch(d.dev){
    case'god':SAVE.god=SAVE.god?0:1;break;case'mode':devMode=devMode==='hard'?'simple':'hard';break;
    case'unlock':for(const m of['simple','hard'])SAVE[m].st=SAVE[m].st.map(x=>Math.max(x,1));toast('全部关卡已解锁');break;
    case'seen':keys.forEach(k=>SAVE.story[k]=1);SAVE.conch=1;SAVE.banq=1;toast('全部剧情已标记为看过');break;
    case'unseen':SAVE.story={pro:1};toast('剧情已标记为未看（序章除外）');break;
    case'pearl':SAVE.wallet+=5000;break;
    case'gear':ITEMS.forEach(it=>SAVE.inv[it.id]=(SAVE.inv[it.id]||0)+5);TOOLS.forEach(t=>SAVE.tools[t.id]=1);toast('道具和工具已发放');break;
    case'fish':Object.keys(FISH).forEach(k=>{SAVE.fish[k]=(SAVE.fish[k]||0)+10;SAVE.dex[k]=(SAVE.dex[k]||0)+10});toast('鱼和食材已发放');break;
    case'rep':addRep(300);break;
    case'banq':persist();startServe(1);return;
    case'reset':if(b.dataset.sure){try{localStorage.removeItem(KEY)}catch(e){}location.reload();return}b.dataset.sure=1;b.textContent='再点一次确认重置';return}
  persist();refreshMenu();showDev()});
$('bDev').onclick=()=>{SFX.tap();showDev()};
$('devPause').addEventListener('click',e=>{const k=e.target.dataset.dp,g=G;if(!k||!g||!g.L)return;show('');state='play';
  if(k==='end'){g.scroll=Math.max(g.scroll,g.L.len*60-520);g.inv=3}
  else if(k==='boss'){const bo=g.E.find(q=>q.t==='boss');if(bo&&!g.boss){g.scroll=bo.x-fishSX-320;g.inv=3}else toast(g.boss?'已经在 Boss 战里了':'这一关没有 Boss',2)}
  else if(k==='win'){g.pearls=Math.max(g.pearls,99);g.rescued=9;if(g.L.nodes)g.L.nodes.forEach(n=>g.caught[n]=(g.caught[n]||0)+3);if(g.L.boss){g.boss=g.boss||{};g.boss.done=1}finish()}});

