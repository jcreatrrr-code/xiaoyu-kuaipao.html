/* ---- service scene: persistent DOM, pixel diner, effects ---- */
let SVE=null;
const pick=a=>a[Math.floor(Math.random()*a.length)];
function svLook(o){if(o&&o.c==='阿潮')return'achao';if(o&&o.c==='海生')return'haisheng';
  return{H:pick(['#5a3a22','#2c2c3a','#c9a56c','#e8e2d0','#a8452e','#7a4a8a']),T:pick(['#e0503f','#3f8fd0','#4fc98a','#9a6ad6','#ffb24d','#e87aa0','#2bb5a0']),L:'#3a3a4a',D:'#ffd9b3',hat:Math.random()<.22?pick(['#d9b45a','#e0503f','#3f7f9a']):0}}
const svSeatF=(i,n)=>(i+.5)/n*.82+.04;
function svBuild(){const v=SV,n=v.seats.length;
  $('svScene').innerHTML='<canvas id="svCv"></canvas>'+v.seats.map((s,i)=>`<button class="sb" data-seat="${i}" style="left:${svSeatF(i,n)*100}%" hidden><span class="bub"><span class="di"></span></span><span class="dnm"></span></button>`).join('');
  $('svSt').style.gridTemplateColumns=`repeat(${v.st.length>4?3:2},1fr)`;
  $('svSt').innerHTML=v.st.map((s,i)=>{const T=TIME[s.k],bg=T?`style="background:conic-gradient(#cfd6dc 0 ${T[0]/T[2]*100}%,#ffd23f ${T[0]/T[2]*100}% ${T[1]/T[2]*100}%,#ff9f8f ${T[1]/T[2]*100}% 100%)"`:'';
    return`<div class="stn k-${s.k} idle" data-st="${i}"><span class="lab">${STN[s.k][0]} ${STN[s.k][1]}</span><span class="fl"></span><span class="smk s1"></span><span class="smk s2"></span><span class="smk s3"></span><span class="kn">🔪</span><span class="cf">👩‍🍳</span><span class="dial" ${bg}><i class="ptr"></i><b class="fd"></b></span><span class="tx"></span></div>`}).join('');
  {const e=$('svStaff'),a=[];if(v.staff.waiter)a.push('<span class="chip">🧑 阿强：自动上菜</span>');if(v.staff.chef)a.push('<span class="chip">👩‍🍳 阿珍：自动做菜</span>');e.hidden=!a.length;e.innerHTML=a.join('')}
  SVE={sb:[...$('svScene').querySelectorAll('.sb')],st:[...$('svSt').children]};v.ghosts=[];v.wx=6;v.wtx=6;v.at=0}
function svFly(ic,a,b){if(!a||!b||!a.getBoundingClientRect)return;const A=a.getBoundingClientRect(),B=b.getBoundingClientRect();if(!A.width||!B.width)return;const e=document.createElement('span');e.className='fly';e.textContent=ic;document.body.appendChild(e);
  const x0=A.left+A.width/2,y0=A.top+A.height/2,x1=B.left+B.width/2,y1=B.top+B.height/2;
  const an=e.animate([{transform:`translate(${x0}px,${y0}px) scale(1)`},{transform:`translate(${(x0+x1)/2}px,${Math.min(y0,y1)-46}px) scale(1.35)`,offset:.5},{transform:`translate(${x1}px,${y1}px) scale(.9)`}],{duration:380,easing:'ease-in-out'});an.onfinish=()=>e.remove();setTimeout(()=>e.remove(),600)}
function svPop(txt,el,cls){if(!el)return;const B=el.getBoundingClientRect();if(!B.width)return;const e=document.createElement('span');e.className='pop '+(cls||'');e.textContent=txt;document.body.appendChild(e);
  e.animate([{transform:`translate(${B.left+B.width/2}px,${B.top+10}px) translate(-50%,0) scale(.6)`,opacity:0},{transform:`translate(${B.left+B.width/2}px,${B.top-8}px) translate(-50%,0) scale(1.15)`,opacity:1,offset:.25},{transform:`translate(${B.left+B.width/2}px,${B.top-46}px) translate(-50%,0) scale(1)`,opacity:0}],{duration:1100,easing:'ease-out'});setTimeout(()=>e.remove(),1150)}
function svFx(type,i,ic,x){if(!SVE)return;const st=SVE.st[i],sb=SVE.sb[i];
  if(type==='start')svFly(ic,$('svMenu').querySelector(`[data-mk="${x}"]`),st);
  else if(type==='plate')svFly(ic,st,$('svShelf'));
  else if(type==='serve'){svFly(ic,$('svShelf'),sb);setTimeout(()=>svPop(SV&&SV.banq?'👍':'+'+x+' ⚪',sb),300)}
  else if(type==='leave')svPop('💢',sb,'bad');
  else if(type==='chop'&&st){st.classList.remove('chop');void st.offsetWidth;st.classList.add('chop')}}
function svGhost(s,i,happy){const v=SV;v.ghosts.push({look:s.look,x:s.x<900?s.x:0,happy,t:0});if(happy&&v.staff.waiter)v.wtx=-1-i;if(!happy)svFx('leave',i)}
function svRender(){const v=SV;v.dirty=0;if(!SVE)return;
  v.seats.forEach((s,i)=>{const e=SVE.sb[i];e.hidden=!s;if(!s)return;const d=dById(s.d);e.className='sb'+(s.o?' vip':'')+(s.sig?' sig':'')+(v.shelf.some(p=>p.d===s.d)?' can':'');e.querySelector('.di').textContent=d.ic;e.querySelector('.dnm').textContent=(s.sig?'⭐ ':'')+(s.o?s.name+'：':'')+d.n});
  $('svShelf').innerHTML='<span class="lbl">出菜口</span>'+v.shelf.map((p,j)=>`<button class="plate ${p.q==='perfect'?'pf':''} ${p.fin?'fin':'raw'} ${p.hand?'hd':''}" data-pl="${j}">${dById(p.d).ic}</button>`).join('')+'<span class="sp"></span><span class="bell">🛎️</span>';
  v.st.forEach((s,i)=>{const e=SVE.st[i],ph=s.d?s.ph:'idle',keep=e.classList.contains('chop')?' chop':'';e.className=`stn k-${s.k} ${ph}`+keep+(v.staff.chef&&!s.hand?' hasChef':'')+(s.d&&s.hand?' hand':'');e.querySelector('.fd').textContent=s.d?(ph==='burn'?'💨':dById(s.d).ic):'';
    e.querySelector('.tx').textContent=(s.d&&s.hand&&ph!=='burn'?'⭐ ':'')+(ph==='work'?(s.k==='cut'?'连点切菜！':'连点装盘！'):s.open?'还剩 '+s.left+' 份':ph==='perfect'?'出锅！':ph==='ok'?'快出锅！':ph==='burn'?'焦了，点一下清理':ph==='cook'&&s.hand?'招牌菜，盯着火候':ph==='cook'&&s.k==='umu'?'焖着，别打开':'');
    if(!TIME[s.k])e.querySelector('.dial').style.background=`conic-gradient(#4fe0b5 ${s.d?s.n/s.need*100:0}%,rgba(6,40,70,.15) 0)`});
  const ids=[...new Set(v.seats.filter(Boolean).map(s=>s.d))];
  $('svMenu').innerHTML=ids.length?ids.map(id=>{const d=dById(id),m=startKind(id),ok=svPending(id)>0&&(v.banq||canMake(d,SAVE.fish))&&v.st.some(x=>x.k===m&&!x.d);
    return`<button class="mbtn ${svSigNeed(id)>0?'sig':''}" data-mk="${id}" ${ok?'':'disabled'}>${svSigNeed(id)>0?'⭐ ':''}${d.ic} ${d.n}<small>${STN[m][0]}${M2[id]?'→'+STN[M2[id][1]][0]:''} ${Object.entries(d.need).map(([k,n])=>FISH[k].n+'×'+n).join(' ')}</small></button>`}).join(''):'<span class="lbl">等客人点菜…</span>';
  svBars()}
function svBars(){const v=SV;$('svSpd').textContent=(SAVE.spd||1)+'×';{const n=SAVE.fish.salt||0,e=$('svSalt');e.hidden=v.banq||!(n||SAVE.story.post5);e.textContent=n?`✨ 盐花 ×${n} · ${v.salt?'用':'不用'}`:'✨ 盐花 ×0';e.style.opacity=n?1:.55;e.style.background=n&&v.salt?'var(--sun)':'';e.style.color=n&&v.salt?'#6a4500':''}$('svTime').textContent='⏱ '+Math.max(0,Math.ceil(v.t))+' 秒';$('svEarn').textContent='⚪ '+(v.earn+v.tips);if(!SVE)return;
  v.seats.forEach((s,i)=>{if(!s)return;const f=Math.max(0,s.p/s.P),b=SVE.sb[i].firstElementChild;b.style.setProperty('--p',f*100);b.style.setProperty('--rc',f<.3?'#ff7a6b':f<.6?'#ffd23f':'#4fe0b5');SVE.sb[i].classList.toggle('greet',f<.6&&!s.greet&&!(v.gcd>0)&&!v.shelf.some(p=>p.d===s.d))});
  v.st.forEach((s,i)=>{if(s.d&&TIME[s.k])SVE.st[i].querySelector('.ptr').style.setProperty('--a',Math.min(360,s.t/TIME[s.k][2]*360)+'deg')})}
function svScene(dt){const v=SV,c=document.getElementById('svCv');if(!c||!c.clientWidth)return;const w=Math.max(60,Math.round(c.clientWidth/4)),h=Math.max(30,Math.round(c.clientHeight/4)),n=v.seats.length;
  if(c.width!==w||c.height!==h){c.width=w;c.height=h}if(pcv.width!==w||pcv.height!==h){pcv.width=w;pcv.height=h}
  const t=(v.at+=dt),gy=h-9;
  if(SAVE.story.pro2){R(0,0,w,gy-15,'#9fe0f0');R(0,gy-24,w,9,'#2fa9c8');R(0,gy-24,w,1,'#dff4ff');for(let i=0;i<4;i++)R(Math.round((i*w/4+t*3)%w),gy-21+(i%2)*3,5,1,'#dff4ff');
    const ix=Math.round(w*.72);R(ix-12,gy-27,24,3,'#7fd0a0');R(ix-2,gy-35,2,8,'#8a5a2b');R(ix-6,gy-37,10,2,'#3fae6a');
    const mx=Math.round(w*.46);R(mx,0,2,gy-15,'#8a5a2b');for(let j=0;j<18&&j<gy-20;j++)R(mx+3,2+j,Math.round(14*(1-j/22))+2,1,j%5?'#fff8e6':'#efe0c0');
    R(0,gy-15,w,15,'#c98a4a');for(let x=0;x<w;x+=9)R(x,gy-15,1,15,'#a8703f');R(0,gy-15,w,1,'#8a5a2b');R(0,gy-19,w,1,'#8a5a2b');for(let x=3;x<w;x+=12)R(x,gy-19,1,4,'#8a5a2b');
    R(0,2,w,1,'#5a4a3a');for(const lf of[.18,.62,.9]){const lx=Math.round(w*lf),sw=Math.round(Math.sin(t*1.6+lx));R(lx-2+sw,3,5,4,'#ff8f5a');R(lx-1+sw,4,3,2,'#ffd23f')}
    R(w-10,gy-24,10,24,'#6b4226');R(w-9,gy-23,8,23,'#4a3020');R(w-8,gy-12,1,2,'#ffd23f')}
  else{  R(0,0,w,h,'#f6e7c4');R(0,gy-15,w,15,'#e6cb9c');R(0,gy-15,w,1,'#c9a56c');
  for(const wx of[Math.round(w*.1),Math.round(w*.55)]){R(wx,5,24,15,'#8a5a2b');R(wx+2,7,20,11,'#8fd3ff');R(wx+2,13,20,5,'#3fa9d8');R(wx+11,7,1,11,'#8a5a2b');R(wx+3+((t*4+wx)%15),15,3,1,'#dff4ff');R(wx+6+((t*3+wx*2)%12),13,2,1,'#dff4ff')}
  for(const lf of[.36,.8]){const lx=Math.round(w*lf),sw=Math.round(Math.sin(t*1.3+lx));R(lx,0,1,5,'#5a4a3a');R(lx-3+sw,5,7,2,'#ffd23f');R(lx-1+sw,7,3,1,'#fff27a')}
  R(w-10,gy-24,10,24,'#6b4226');R(w-9,gy-23,8,23,'#27384a');R(w-8,gy-12,1,2,'#ffd23f');}
  v.wx+=((v.wtx<0?w*svSeatF(-1-v.wtx,n):6)-v.wx)*Math.min(1,dt*9);if(v.wtx<0&&(v.wT=(v.wT||0)+dt)>.7){v.wtx=6;v.wT=0}
  if(v.staff.waiter)human('aqiang',v.wx,gy+7);
  v.seats.forEach((s,i)=>{if(!s)return;const sx=w*svSeatF(i,n);if(s.x>w+8)s.x=w+8;s.x=Math.max(sx,s.x-95*dt);const low=s.p/s.P<.3;human(s.look,s.x+(low&&Math.sin(t*30)>0?1:0),gy+7-(s.x>sx&&Math.sin(t*16)>0?1:0),1)});
  for(const g of v.ghosts){g.t+=dt;if(g.t>.5||!g.happy)g.x+=85*dt;const y=gy+7-(g.happy&&Math.sin(g.t*18)>0?2:Math.sin(g.t*16)>0?1:0);human(g.look,g.x,y,0);
    if(g.happy){R(g.x-3,y-20,2,2,'#ff6b8a');R(g.x,y-20,2,2,'#ff6b8a');R(g.x-2,y-18,3,1,'#ff6b8a');R(g.x-1,y-17,1,1,'#ff6b8a')}else{R(g.x+4,y-19,3,1,'#e0503f');R(g.x+5,y-20,1,3,'#e0503f')}}
  v.ghosts=v.ghosts.filter(g=>g.x<w+10);
  R(0,gy,w,h-gy,'#8a5a2b');R(0,gy,w,2,'#c99a5b');R(0,gy+2,w,1,'#6b4226');
  for(let i=0;i<n;i++){const sx=Math.round(w*svSeatF(i,n));R(sx-4,gy-1,9,1,'#ffffff');R(sx+6,gy-2,1,2,'#e0503f')}
  const g2=c.getContext('2d');g2.imageSmoothingEnabled=false;g2.clearRect(0,0,w,h);g2.drawImage(pcv,0,0)}

function svEnd(why){const v=SV;v.over=1;if(v.banq){if(v.served>=10)SAVE.stat.banq6=1}else SAVE.stat.maxServe=Math.max(SAVE.stat.maxServe||0,v.served);
  if(v.banq){const ok=v.served>=7;if(ok){SAVE.banq=1;SAVE.wallet+=200}persist();refreshMenu();ok?SFX.win():SFX.lose();$('svEnd').innerHTML=`<h3>${ok?'宴席成功！':'宴席没办好…'}</h3><div class="stat"><span>上菜</span><span>${v.served} / 10 道（至少 7 道）</span></div>`+(ok?'<div class="stat"><span>商会的酬劳</span><span>+200 ⚪</span></div><p>趁宴席散场，可以溜进沉灯之城了。</p>':'<p>再去选关里进一次沉灯之城，就能重办宴席。</p>')+'<div class="rowb" style="margin-top:12px"><button class="btn mint" id="svBack">好的</button></div>';$('svEnd').hidden=false;SVE=null;$('svStaff').hidden=true;$('svScene').hidden=$('svShelf').hidden=true;$('svSt').innerHTML=$('svMenu').innerHTML='';return}SAVE.orders.list.forEach(o=>delete o.in);const tot=v.earn+v.tips;SAVE.wallet+=tot;let bonus=0;
  if(!SAVE.orders.bonus&&SAVE.orders.list.length&&SAVE.orders.list.every(x=>x.done)){SAVE.orders.bonus=1;bonus=50;SAVE.wallet+=50;v.rep+=20}
  SAVE.rep=Math.max(0,SAVE.rep);addRep(Math.max(v.rep,-SAVE.rep));persist();refreshMenu();SFX.win();
  const st=(a,b)=>`<div class="stat"><span>${a}</span><span>${b}</span></div>`;
  $('svEnd').innerHTML=`<h3>${why==='stock'?'食材用完，打烊！':why==='quit'?'提前打烊':'今天辛苦了！'}</h3>`+st('上菜',v.served+' 道')+st('没等到的客人',v.lost+' 位')+st('菜钱','+'+v.earn+' ⚪')+st('小费','+'+v.tips+' ⚪')+(v.wage?st('店员工资','-'+v.wage+' ⚪'):'')+(bonus?st('今日订单全部完成','+50 ⚪'):'')+st('声望',(v.rep>=0?'+':'')+v.rep)+st('本场净收入',(tot+bonus-v.wage)+' ⚪')+'<div class="rowb" style="margin-top:12px"><button class="btn mint" id="svBack">回到小馆</button></div>';
  $('svEnd').hidden=false;SVE=null;$('svStaff').hidden=true;$('svScene').hidden=$('svShelf').hidden=true;$('svSt').innerHTML=$('svMenu').innerHTML=''}
$('sServe').addEventListener('pointerdown',e=>{const t=e.target;if(t.closest('#svBack')){const bq=SV&&SV.banq;SV=null;$('app').classList.remove('serve');if(bq)showLevels('simple');else showKitchen();return}if(!SV||SV.over)return;
  if(t.closest('#svQuit')){svEnd('quit');return}if(t.closest('#svSpd')){SAVE.spd=SAVE.spd===1.5?2:SAVE.spd===2?1:1.5;persist();SFX.tap();svBars();return}if(t.closest('#svSalt')){if(!(SAVE.fish.salt>0)){toast('月光盐花用完了，去钟乳洞再采一些',2.2);return}SV.salt=!SV.salt;SFX.tap();svBars();return}let b;
  if((b=t.closest('[data-mk]'))){if(!b.disabled)svStart(b.dataset.mk,1)}else if((b=t.closest('[data-pl]')))svGarnish(+b.dataset.pl);else if((b=t.closest('[data-st]')))svTapSt(SV.st[+b.dataset.st]);else if((b=t.closest('[data-seat]')))svSeatTap(+b.dataset.seat);
  if(SV&&!SV.over&&SV.dirty)svRender()});
function takeaway(d){for(const k in d.need)SAVE.fish[k]-=d.need[k];const gain=Math.round(d.p/2);SAVE.wallet+=gain;addRep(Math.round(d.p/10));SFX.tap();return gain}
function svPanel(){
  $('svPanel').innerHTML=`<p class="sub">店员（每场营业付一次工资）</p>`
   +STAFF.map(s=>{const ok=s.ok(),on=SAVE.staff[s.id];return`<div class="it ${ok?'':'lock'}"><span class="ic">${ok?s.ic:'❓'}</span><b>${ok?s.n:'？？？'}</b><em>${ok?s.d:'还没有人来应聘'}</em><span class="act">${ok?`<button class="btn ${on?'mint':'sun'}" data-staff="${s.id}">${on?'已雇用 ✔':'点击雇用'}<br>每场 ⚪${wageOf(s)}</button>`:`<button class="btn off" disabled>🔒 ${s.why}</button>`}</span></div>`}).join('')
   +'<p class="sub">小馆升级（一次购买，永久有效）</p>'
   +UPG.map(u=>{const lv=SAVE.up[u.id]||0,c=u.cost[lv];return`<div class="it"><span class="ic">${u.ic}</span><b>${u.n}${lv?`<small>已买 ${lv} 次</small>`:''}</b><em>${u.d}</em><span class="act">${u.id==='seat'&&lv===2&&restLv()<8?'<button class="btn off" disabled>🔒 小馆 Lv.8</button>':c?`<button class="btn sun" data-upg="${u.id}" ${SAVE.wallet<c?'disabled':''}>⚪ ${c}</button>`:'<button class="btn off" disabled>已升满</button>'}</span></div>`}).join('')}
$('svPanel').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;
  if(b.id==='bServe'){startServe();return}
  if(b.dataset.staff){SAVE.staff[b.dataset.staff]=SAVE.staff[b.dataset.staff]?0:1;SFX.tap()}
  else if(b.dataset.upg){const u=UPG.find(x=>x.id===b.dataset.upg),c=u.cost[SAVE.up[u.id]||0];if(!c||SAVE.wallet<c)return;SAVE.wallet-=c;SAVE.up[u.id]=(SAVE.up[u.id]||0)+1;SFX.win();toast(u.n+'：已升级！',2)}
  persist();refreshMenu();showKitchen()};

