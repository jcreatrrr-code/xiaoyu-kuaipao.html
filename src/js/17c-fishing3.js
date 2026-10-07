/* 钓鱼第三步：环礁钓鱼节（准入证 → 老舵的考核 → 通行卡 → 比赛）、船尾装饰、钓鱼成就 */
const PASSP=2000,EXAM={t:240,n:4,n2:1,esc:3},CONT={t:300};
const RIVALS=[{id:'laoduo',n:'老舵',k:6,p:.9},{id:'aqiang',n:'阿强',k:4,p:1.3},{id:'azhen',n:'阿珍',k:4,p:1.2},{id:'xiaofan',n:'小帆',k:3,p:1.5}];
const PRIZE=[{p:500,t:30},{p:200,t:15},{p:100,t:8}];
function fsFestD(){const f=SAVE.fsh;return f.fest||(f.fest={pass:0,card:0,tries:0,day:'',n:0,gold:0,best:0,no:0})}
const fsKg=(s,len)=>Math.max(.1,s.kg*Math.pow(len/100,3)),fsKgs=kg=>kg<1?kg.toFixed(2):kg.toFixed(1),fsMMSS=t=>{t=Math.max(0,Math.ceil(t));return `${Math.floor(t/60)}:${String(t%60).padStart(2,'0')}`};
/* 钓鱼节面板 */
function fsFest(){const d=fsFestD(),ok=cleared(VOL1+3);let body;
  if(!ok)body='<p class="note">通关第四章以后开放。</p>';
  else if(!d.pass)body=`<p>一年一度的环礁钓鱼节。五分钟里，比谁钓上的单条鱼最重，前三名有珍珠和潮印。</p><p class="note">参加要先买准入证，再通过老舵的考核，才能拿到通行卡。</p>
    <div class="fdk"><span class="ic">🎫</span><div><b>钓鱼节准入证</b><span>买了就能找老舵考核，考不过可以再考</span></div><button class="btn sm sun" data-fe="buy" ${SAVE.wallet<PASSP?'disabled':''}>⚪ ${PASSP}</button></div>`;
  else if(!d.card)body=`<div class="fdk"><span class="ic">🎫</span><div><b>准入证 <span class="note">已有</span></b><span>老舵：“想上钓鱼节，先钓给我看看。”</span></div></div>
    <h4>老舵的考核</h4><p>${EXAM.t/60} 分钟内钓上 ${EXAM.n} 条鱼，其中至少 ${EXAM.n2} 条两星以上；跑掉 ${EXAM.esc} 条就算没过。就在现在这个钓点考。</p>${d.tries?`<p class="note">考过 ${d.tries} 次</p>`:''}
    <div class="rowb"><button class="btn sm mint" data-fe="exam">开始考核</button></div>`;
  else{const done=d.day===today();body=`${fsPassCard()}
    <p>五分钟，比谁钓上的单条鱼最重。对手：老舵、阿强、阿珍、小帆。就在现在这个钓点比。</p><p class="note">第一名 ⚪${PRIZE[0].p} 🌊${PRIZE[0].t} · 第二名 ⚪${PRIZE[1].p} 🌊${PRIZE[1].t} · 第三名 ⚪${PRIZE[2].p} 🌊${PRIZE[2].t} · 每天一场</p>
    <div class="rowb"><button class="btn sm ${done?'off':'mint'}" data-fe="cont" ${done?'disabled':''}>${done?'今天比过了，明天再来':'参加今天的钓鱼节'}</button></div>`}
  $('fhPanel').innerHTML=`<h3>🎏 环礁钓鱼节</h3>${body}<div class="rowb"><button class="btn sm" data-fp="x">合上</button></div>`;$('fhPanel').hidden=false}
function fsPassCard(){const d=fsFestD();return `<div class="fpass"><b>环礁钓鱼节 · 通行卡</b><span>持卡人：小鱼　No.${String(d.no).padStart(3,'0')}</span><span>参加 ${d.n} 次 · 冠军 ${d.gold} 次${d.best?` · 最重 ${fsKgs(d.best)} 公斤`:''}</span><i>🎣</i></div>`}
function fsFestClick(b){const d=fsFestD(),k=b.dataset.fe;
  if(k==='buy'){if(SAVE.wallet<PASSP)return;SAVE.wallet-=PASSP;d.pass=1;persist();SFX.save();toast('拿到钓鱼节准入证了',1.8);fsFest();return}
  if(k==='exam'){d.tries++;persist();fsEvStart('exam');return}
  if(k==='cont'){if(d.day===today())return;d.day=today();d.n++;persist();fsEvStart('cont');return}
  if(k==='res'){$('fhPanel').hidden=true;SFX.tap()}}
/* 考核和比赛进行中 */
function fsEvStart(k){const f=FS;$('fhPanel').hidden=true;SFX.tap();
  f.ev={k,t:k==='exam'?EXAM.t:CONT.t,T:k==='exam'?EXAM.t:CONT.t,n:0,n2:0,esc:0,best:null,riv:[]};
  if(k==='cont'){for(const r of RIVALS){const ev=[];for(let i=0;i<r.k;i++){const s=fsRoll(),fr=Math.pow(Math.random(),r.p),len=Math.round(s.len[0]+fr*(s.len[1]-s.len[0]));ev.push({at:20+Math.random()*(CONT.t-30),kg:fsKg(s,len),fn:s.n})}
      ev.sort((a,b)=>a.at-b.at);f.ev.riv.push({n:r.n,ev,best:0,i:0})}
    toast('钓鱼节开始！五分钟，比单条最重',2.2)}else toast('老舵：“开始吧。我看着。”',2.2);
  fsEvHud()}
function fsEvCatch(sh,kg){const e=FS&&FS.ev;if(!e||e.over)return;
  if(e.k==='exam'){e.n++;if(sh.st>=2)e.n2++;if(e.n>=EXAM.n&&e.n2>=EXAM.n2)e.done=1}
  else if(!e.best||kg>e.best.kg)e.best={kg,n:sh.s.n};fsEvHud()}
function fsEvEsc(){const e=FS&&FS.ev;if(!e||e.k!=='exam'||e.over)return;e.esc++;if(e.esc>=EXAM.esc)e.fail=1;fsEvHud()}
function fsEvUpd(dt){const f=FS,e=f.ev;if(!e)return;const busy=f.ph==='fight'||f.ph==='land'||!$('fhCard').hidden;
  e.t-=dt;if(e.t<=0)e.over=1;
  if(e.k==='cont'){const el=e.T-Math.max(0,e.t);for(const r of e.riv){while(r.i<r.ev.length&&r.ev[r.i].at<=el){const c=r.ev[r.i++];if(c.kg>r.best){r.best=c.kg;if(!busy&&c.kg>(e.best?e.best.kg:0)&&Math.random()<.7)toast(`${r.n}钓上一条 ${fsKgs(c.kg)} 公斤的${c.fn}！`,1.8)}}}}
  if(!busy&&(e.over||e.done||e.fail))fsEvEnd();else if((e.hudT=(e.hudT||0)-dt)<=0){e.hudT=.25;fsEvHud()}}
function fsEvHud(){const e=FS&&FS.ev,el=$('fhEv');if(!el)return;if(!e){el.hidden=true;return}el.hidden=false;
  if(e.k==='exam')el.innerHTML=`<b>🎏 老舵的考核 ${fsMMSS(e.t)}</b><span>上鱼 ${e.n}/${EXAM.n} · 两星 ${Math.min(e.n2,EXAM.n2)}/${EXAM.n2} · 跑鱼 ${e.esc}/${EXAM.esc}</span>`;
  else{let top=null;for(const r of e.riv)if(r.best&&(!top||r.best>top.best))top=r;el.innerHTML=`<b>🏆 钓鱼节 ${fsMMSS(e.t)}</b><span>你最重 ${e.best?fsKgs(e.best.kg):'—'} 公斤${top?` · ${top.n} ${fsKgs(top.best)}`:''}</span>`}}
function fsEvEnd(){const f=FS,e=f.ev,d=fsFestD();f.ev=null;fsEvHud();let h;
  if(e.k==='exam'){if(e.done){d.card=1;d.no=d.no||(100+Math.floor(Math.random()*800));persist();SFX.win();
      h=`<h3>考核通过！</h3>${fsPassCard()}<p class="fsay">老舵：“手稳，心也稳。这张卡，你拿着。”</p>`}
    else{SFX.lose&&SFX.lose();h=`<h3>考核没过</h3><p>${e.fail?`跑了 ${EXAM.esc} 条。`:'时间到了。'}上鱼 ${e.n}/${EXAM.n} · 两星 ${Math.min(e.n2,EXAM.n2)}/${EXAM.n2}</p><p class="fsay">老舵：“不急。海又不会跑。”</p><p class="note">准入证还在，随时可以再考。</p>`}}
  else{const me=e.best?e.best.kg:0,rows=e.riv.map(r=>({n:r.n,kg:r.best})).concat([{n:'小鱼',kg:me,me:1}]).sort((a,b)=>b.kg-a.kg),rk=rows.findIndex(r=>r.me),pz=PRIZE[rk];
    if(me>d.best)d.best=+me.toFixed(2);const o=SAVE.fsh.deco||(SAVE.fsh.deco={own:{},on:{}});let gift='';
    if(!o.own.flag){o.own.flag=1;o.on.flag=1;gift='第一次参加钓鱼节，送你一面鱼旗，挂在船尾了。'}
    if(rk===0&&me>0){d.gold++;if(!o.own.trophy){o.own.trophy=1;o.on.trophy=1;gift+='冠军奖杯摆在船尾甲板上了。'}}
    if(pz&&me>0){SAVE.wallet+=pz.p;SAVE.fsh.tide+=pz.t;SAVE.fsh.tideAll+=pz.t}else{SAVE.fsh.tide+=3;SAVE.fsh.tideAll+=3}persist();rk===0&&me>0?SFX.win():SFX.save();
    h=`<h3>${rk===0&&me>0?'🏆 冠军！':`第 ${rk+1} 名`}</h3><div class="frank">${rows.map((r,i)=>`<div class="${r.me?'me':''}"><span>${['🥇','🥈','🥉','　','　'][i]}</span><b>${r.n}</b><em>${r.kg?fsKgs(r.kg)+' 公斤':'没上鱼'}</em></div>`).join('')}</div>
      <p>${pz&&me>0?`奖品：⚪ ${pz.p} 珍珠 · 🌊 ${pz.t} 潮印`:'参与奖：🌊 3 潮印'}</p>${gift?`<p class="note">${gift}</p>`:''}`}
  $('fhCard').hidden=true;$('fhPanel').innerHTML=h+'<div class="rowb"><button class="btn sm mint" data-fe="res">好</button></div>';$('fhPanel').hidden=false;fhTop()}
/* 船尾装饰 */
const DECO=[{id:'cushion',ic:'🟥',n:'软坐垫',d:'垫在小鱼屁股底下，坐久了也不硌',tide:30},{id:'lights',ic:'💡',n:'串灯',d:'沿着栏杆挂一串小灯，天黑了会亮',tide:60},{id:'chime',ic:'🎐',n:'贝壳风铃',d:'挂在灯笼杆上，风一吹叮叮响',tide:40},
  {id:'plant',ic:'🪴',n:'小盆栽',d:'甲板上一盆小芦荟，阿珍给的盆',tide:50},{id:'board',ic:'🪧',n:'渔获挂板',d:'挂在栏杆上，认识的鱼越多，板上画的鱼越多',tide:80},
  {id:'flag',ic:'🎏',n:'钓鱼节鱼旗',d:'第一次参加钓鱼节送的',prize:1},{id:'trophy',ic:'🏆',n:'钓鱼节奖杯',d:'钓鱼节拿了第一名才有',prize:1}];
function fsDecoD(){const f=SAVE.fsh;return f.deco||(f.deco={own:{},on:{}})}
function fsDecoRows(){const o=fsDecoD(),f=SAVE.fsh;return DECO.map(it=>{const own=o.own[it.id],on=o.on[it.id];
  const btn=own?`<button class="btn sm ${on?'off':'mint'}" data-dc="${it.id}">${on?'收起来':'摆上'}</button>`:it.prize?'<span class="note">钓鱼节奖品</span>':`<button class="btn sm sun" data-dc="${it.id}" ${f.tide<it.tide?'disabled':''}>🌊 ${it.tide}</button>`;
  return `<div class="fdk"><span class="ic">${own?it.ic:'🔒'}</span><div><b>${it.n}</b><span>${it.d}</span></div>${btn}</div>`}).join('')}
function fsDecoClick(b){const o=fsDecoD(),f=SAVE.fsh,it=DECO.find(x=>x.id===b.dataset.dc);
  if(!o.own[it.id]){if(it.prize||f.tide<it.tide)return;f.tide-=it.tide;o.own[it.id]=1;o.on[it.id]=1;toast(`${it.n}摆到船尾了`,1.8);SFX.save()}else{o.on[it.id]=o.on[it.id]?0:1;SFX.tap()}
  persist();fhTop();fsGear()}
function fsDecoDraw(gy,t,night){const o=fsDecoD().on,kx=Math.round(CW*.42);
  if(o.flag){const x=3;R(x,gy-34,1,26,'#6b4226');for(let i=0;i<9;i++){const w=Math.round(Math.sin(t*3-i*.6)*1),h=Math.max(1,5-Math.floor(i/2));R(x+1+i,gy-33+w+(5-h)/2|0,1,h,i<3?'#e0503f':i<6?'#fff6e0':'#3a7ab0')}}
  if(o.lights){for(let x=4;x<CW;x+=6){const y=gy-10+Math.round(Math.sin(x*.5)*.5),c=['#ffd23f','#ff7aa8','#8ef5b4','#7ab0ea'][(x/6|0)%4];R(x,y-1,1,1,'#3a2a1a');R(x,y,1,1,night>.2?c:mixc(c,'#6b4a2a',.6));if(night>.2)R(x-1,y-1,3,3,`rgba(255,230,160,${.12*night})`)}}
  if(o.chime){const lx=Math.round(CW*.86),sw=Math.round(Math.sin(t*1.7)*1);R(lx,gy-22,4,1,'#6b4226');R(lx+3,gy-21,1,2,'#cfcfcf');for(let i=0;i<3;i++)R(lx+2+i+sw*(i%2),gy-19,1,3+(i%2),'#e8e8f0');R(lx+2,gy-20,3,1,'#ffd2c0')}
  if(o.board){const x=Math.round(CW*.05),y=gy-10,n=FSP.filter(s=>SAVE.fsh.dex[s.id]).length;R(x,y,11,7,'#c9a26a');R(x,y,11,1,'#e0c08a');R(x+5,y-2,1,2,'#6b4226');for(let i=0;i<Math.min(8,n);i++){R(x+1+(i%4)*2+(i>3?1:0),y+2+(i>3?2:0),2,1,'#3a5a7a')}}
  if(o.plant){const x=Math.round(CW*.6),y=gy+2;R(x,y+1,5,4,'#c06a3a');R(x,y+1,5,1,'#d88a5a');for(let i=0;i<4;i++)R(x+i+(i>1?1:0),y-2-(i%2)*2,1,3+(i%2)*2,'#5fae6a')}
  if(o.trophy){const x=Math.round(CW*.3),y=gy+3;R(x,y,5,3,'#ffcf3a');R(x-1,y,1,2,'#ffcf3a');R(x+5,y,1,2,'#ffcf3a');R(x+2,y+3,1,2,'#e0a020');R(x+1,y+5,3,1,'#8a5a2a');if(Math.sin(t*2)>.7)R(x+1,y,1,1,'#ffffff')}
  if(o.cushion){R(kx-6,gy-3,13,3,'#d04a6a');R(kx-6,gy-3,13,1,'#e87a90')}}
function fsChime(dt){const o=fsDecoD().on;if(!o.chime||!FS)return;if((FS.chT=(FS.chT==null?8:FS.chT)-dt)<=0){FS.chT=10+Math.random()*16;if(fsSpot().id==='stern'){for(let i=0;i<3;i++)setTimeout(()=>snd([1760,2093,2637][i],.4,'sine',.025),i*140)}}}
/* 钓鱼成就 */
const ACH=[['first','第一条鱼','钓上第一条鱼',5,f=>f.n>=1],['star3','会发光的鱼','钓上一条三星鱼',10,f=>Object.values(f.dex).some(r=>r.st>=3)],['n50','五十条','一共钓上 50 条',15,f=>f.n>=50],['n200','老钓鱼佬','一共钓上 200 条',30,f=>f.n>=200],
  ['dex','见多识广','认识所有常见的鱼',30,f=>FSP.every(s=>s.leg||f.dex[s.id])],['spots','四处走走','四个钓点都钓到过鱼',10,f=>f.spots&&Object.keys(f.spots).length>=4],['gt','礁王','钓到礁王',20,f=>f.leg&&f.leg.gt],['moon','月鱼','钓到月鱼',20,f=>f.leg&&f.leg.moonfish],
  ['air10','空军十竿','空竿 10 次（钓鱼佬的必修课）',5,f=>f.air>=10],['rel50','还给大海','放回 50 条',15,f=>f.rel>=50],['junk5','捡海的人','意外收获 5 件',5,f=>(f.junk||0)>=5],['boom','爆护','一次钓上 8 条',10,f=>f.boom],
  ['pets50','伊瓦的朋友','摸伊瓦 50 次',10,f=>(f.pets||0)>=50],['card','持证上岗','拿到钓鱼节通行卡',10,f=>f.fest&&f.fest.card],['gold','钓鱼节冠军','钓鱼节拿第一名',20,f=>f.fest&&f.fest.gold>=1]];
function fsAchCheck(){if(!FS||FS.ph==='fight')return;const f=SAVE.fsh,a=f.ach||(f.ach={});let q=[];for(const[id,n,,tv,ok]of ACH)if(!a[id]&&ok(f)){a[id]=1;f.tide+=tv;f.tideAll+=tv;q.push(`🏅 成就「${n}」 · 🌊 +${tv}`)}
  if(q.length){persist();q.forEach((m,i)=>setTimeout(()=>{if(FS){toast(m,2.2);$('fhKeep').textContent=`🌊 ${SAVE.fsh.tide}`}},2400+i*2400))}}
function fsAch(){const a=SAVE.fsh.ach||{},n=ACH.filter(x=>a[x[0]]).length;
  $('fhPanel').innerHTML=`<h3>🏅 钓鱼成就</h3><p class="note">完成 ${n} / ${ACH.length} · 完成时送潮印</p>${ACH.map(([id,nm,d,tv])=>`<div class="fdk${a[id]?'':' no'}"><span class="ic">${a[id]?'🏅':'▫️'}</span><div><b>${nm}</b><span>${d}</span></div><span class="note">🌊 ${tv}</span></div>`).join('')}<div class="rowb"><button class="btn sm" data-fb2="x">回手帐</button><button class="btn sm" data-fp="x">合上</button></div>`;$('fhPanel').hidden=false}
