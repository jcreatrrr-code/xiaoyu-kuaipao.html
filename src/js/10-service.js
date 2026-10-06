/* ---------- restaurant service (kitchen mini-game) ---------- */
const METHOD={cut:['d49','d50','d7','d5','d14','d37','d40'],grill:['d47','d48','d41','d1','d4','d25','d27','d35','d17','d29','d32','d11'],pot:['d2','d3','d6','d19','d34','d36','d33','d12','d28','d16','d13','d22','d39','d42','d43','d45'],umu:[]};
const M2={d2:['cut','pot'],d23:['cut','pot'],d18:['asm','pot'],d46:['asm','pot'],d11:['asm','grill'],d15:['grill','asm']},startKind=id=>M2[id]?M2[id][0]:methodOf(id);
const methodOf=id=>M2[id]?M2[id][1]:METHOD.cut.includes(id)?'cut':METHOD.grill.includes(id)?'grill':METHOD.pot.includes(id)?'pot':METHOD.umu.includes(id)?'umu':'asm';
const STN={cut:['🔪','砧板'],grill:['🔥','烤架'],pot:['🍲','汤锅'],asm:['🍽️','装盘台'],umu:['🪨','地炉']},TIME={grill:[4,6.5,9],pot:[7,13,17],umu:[16,24,60]};
const FACES=['👵','👴','👩','🧔','👧','🧑','👨‍🦳','👩‍🦰'];
SAVE.up=SAVE.up||{seat:0,grill:0,pot:0};SAVE.staff=SAVE.staff||{waiter:0,chef:0};
const UPG=[{id:'seat',ic:'🪑',n:'加一张桌子',d:'多招待一位客人',cost:[300,700,1500]},{id:'grill',ic:'🔥',n:'第二个烤架',d:'同时烤两份',cost:[500]},{id:'pot',ic:'🍲',n:'第二口汤锅',d:'同时煮两锅',cost:[900]}];
const STAFF=[{id:'waiter',ic:'🧑',n:'阿强（跑堂）',d:'出菜口的菜，他会自动端给客人',w:12,ok:()=>!!SAVE.story.post1,why:'通关第 2 关后加入'},
 {id:'chef',ic:'👩‍🍳',n:'阿珍师傅（厨师）',d:'自动开火、切菜、出锅，可她一边掌勺一边算账，做不出“刚好”',w:20,ok:()=>restLv()>=3&&!!SAVE.story.post3,why:'通关第 4 关且小馆 Lv.3'}];
DISH.push({id:'d37',ic:'🥗',n:'海葡萄沙拉',need:{grape:1},p:70},{id:'d38',ic:'🌯',n:'海葡萄鳗鱼卷',need:{grape:1,eel:1},p:100},{id:'d39',ic:'🍵',n:'洞穴清汤',need:{grape:1,angler:1},p:120},
 {id:'d40',ic:'🦪',n:'扇贝刺身',need:{scallop:1},p:90},{id:'d41',ic:'🧄',n:'蒜蓉烤扇贝',need:{scallop:1,yellow:1},p:120},{id:'d42',ic:'🥘',n:'扇贝鲷鱼汤',need:{scallop:1,bream:1},p:140},
 {id:'d43',ic:'🍮',n:'海胆蒸蛋',need:{urchin:1},p:100},{id:'d44',ic:'🍚',n:'海胆拌饭',need:{urchin:1,sard:1},p:120},{id:'d45',ic:'🦐',n:'白灼逆潮虾',need:{shrimp:1},p:100},{id:'d46',ic:'🥟',n:'鲜虾云吞',need:{shrimp:1,cod:1},p:130},
 {id:'d47',ic:'🦑',n:'铁板鱿鱼',need:{squid:1},p:110},{id:'d48',ic:'🍩',n:'酥炸鱿鱼圈',need:{squid:1,yellow:1},p:130},{id:'d49',ic:'🧊',n:'潮心露冻',need:{dew:1},p:120},{id:'d50',ic:'🍣',n:'露水鱼生',need:{dew:1,salmon:1},p:150},
 {id:'d51',ic:'🎉',n:'归潮宴',need:{salt:1,grape:1,scallop:1,urchin:1,shrimp:1,squid:1,dew:1},p:900});
DISH.forEach(d=>d.p=Math.round(8+d.p*.35));
const wageOf=s=>s.w+(s.id==='chef'?3:2)*(restLv()-1);
let SV=null;
const dById=id=>DISH.find(d=>d.id===id),canMake=(d,f)=>Object.entries(d.need).every(([k,n])=>(f[k]||0)>=n);
function svPending(id){let w=0,s=0;SV.seats.forEach(x=>{if(x&&x.d===id)w++});SV.st.forEach(x=>{if(x.d===id&&x.ph!=='burn')s+=x.k==='umu'?(x.left||3):1});SV.shelf.forEach(p=>{if(p.d===id)s++});return w-s}
function svAvail(){const f={...SAVE.fish},seen={};SV.seats.forEach(s=>{if(!s||seen[s.d])return;seen[s.d]=1;const n=Math.max(0,svPending(s.d)),d=dById(s.d);for(const k in d.need)f[k]=(f[k]||0)-n*d.need[k]});return f}
function startServe(banq){
  if(!banq&&!DISH.some(d=>unlocked(d)&&canMake(d,SAVE.fish))){toast('鱼篓里的鱼不够做任何一道菜，先出海捕鱼吧',2.8);return}
  ensureOrders();let wage=0;const staff={},came=[],broke=[];for(const s of STAFF)if(banq!==1&&SAVE.staff[s.id]&&s.ok()){if(SAVE.wallet-wage>=wageOf(s)){staff[s.id]=1;wage+=wageOf(s);came.push(s.n.split('（')[0])}else broke.push(s.n.split('（')[0])}if(banq===2){wage=0;broke.length=0}SAVE.wallet-=wage;
  const st=[{k:'cut'},{k:'grill'},{k:'pot'},{k:'asm'}];if(SAVE.up.grill)st.push({k:'grill'});if(SAVE.up.pot)st.push({k:'pot'});if(SAVE.story.post17)st.push({k:'umu'});
  SAVE.orders.list.forEach(o=>delete o.in);
  SV={t:90,earn:0,tips:0,rep:0,served:0,lost:0,wage,staff,seats:Array(2+SAVE.up.seat).fill(null),shelf:[],st,next:1,wt:0,dirty:1,over:0,salt:!banq&&(SAVE.fish.salt||0)>0};
  if(banq===2){SV.banq=2;SV.t=150;SV.seats=Array(4).fill(null);let un=DISH.filter(d=>+d.id.slice(1)>=52&&chN()>=(UNL[d.id]||[0])[0]);if(!un.length)un=DISH.filter(d=>+d.id.slice(1)>=52);SV.q=Array.from({length:12},(_,i)=>un[(i*5+2)%un.length].id)}
  else if(banq){SV.banq=1;SV.t=110;SV.seats=Array(4).fill(null);const un=DISH.filter(d=>unlocked(d)&&Object.keys(d.need).length<=2&&methodOf(d.id)!=='umu').sort((a,b)=>b.p-a.p).slice(0,8);SV.q=Array.from({length:10},(_,i)=>un[(i*3)%un.length].id)}
  $('svEnd').hidden=true;$('app').classList.add('serve');$('svScene').hidden=$('svShelf').hidden=false;show('sServe');svBuild();svRender();
  if(banq===2)toast('石焖宴：全岛的人都来了！店员忙着招呼客人，后厨主要靠你',3.4);else if(banq)toast('宴席挑战：店员进不了后厨，全靠你自己！',3.2);else if(broke.length)toast('珍珠不够付工资，'+broke.join('、')+'这场没来',3.2,1);else if(came.length)toast('本场店员：'+came.join('、')+'（工资 '+wage+' ⚪）',3);else toast('客人点什么，就在下面点那道菜开始做',3)}
function svSigNeed(id){const v=SV;return v.seats.filter(x=>x&&x.d===id&&x.sig).length-v.st.filter(x=>x.d===id&&x.hand&&x.ph!=='burn').length-v.shelf.filter(p=>p.d===id&&p.hand).length}
/* 宴席里地炉一次焖三份，剩下的没人要时，别的地炉菜可以把它腾出来 */
function svFreeSt(m){const v=SV;return v.st.find(x=>x.k===m&&!x.d)||v.banq&&v.st.find(x=>x.k===m&&x.open&&!v.seats.some(y=>y&&y.d===x.d))}
function svStart(id,byHand){const v=SV,d=dById(id),m=startKind(id),s=svFreeSt(m);if(!s||svPending(id)<=0||!(v.banq||canMake(d,SAVE.fish)))return;s.hand=byHand&&svSigNeed(id)>0?1:0;
  if(!v.banq)for(const k in d.need)SAVE.fish[k]-=d.need[k];s.d=id;s.t=0;s.n=0;s.left=s.k==='umu'?3:0;s.open=0;s.ph=m==='cut'||m==='asm'?'work':'cook';s.need=m==='cut'?6:3+Object.values(d.need).reduce((a,b)=>a+b,0);v.dirty=1;SFX.tap();svFx('start',v.st.indexOf(s),d.ic,id)}
function svPlate(s,q){const v=SV;if(M2[s.d]&&!s.stg){const k2=M2[s.d][1],t2=v.st.find(x=>x.k===k2&&!x.d);if(!t2){if(!v.banq||true)toast(STN[k2][1]+'没空，先腾出来',1.3);return false}t2.d=s.d;t2.ph=k2==='grill'||k2==='pot'?'cook':'work';t2.t=0;t2.n=0;t2.stg=1;t2.q0=q;t2.hand=s.hand;svFx('plate',v.st.indexOf(s),dById(s.d).ic);s.d=null;s.ph='';s.hand=0;v.dirty=1;SFX.tap();return true}if(s.q0&&s.q0!=='ok')q=s.q0;s.stg=0;s.q0=0;if(v.shelf.length>=4){toast('出菜口满了，先把菜端给客人',1.6);return false}
  if(s.k==='umu'){svFx('plate',v.st.indexOf(s),dById(s.d).ic);v.shelf.push({d:s.d,q,hand:s.hand,age:0});s.left=(s.left||3)-1;s.open=1;v.dirty=1;if(s.left<=0){s.d=null;s.ph='';s.hand=0;s.open=0}return true}
  svFx('plate',v.st.indexOf(s),dById(s.d).ic);v.shelf.push({d:s.d,q,hand:s.hand,age:0});s.d=null;s.ph='';s.hand=0;v.dirty=1;if(!v.banq&&!SAVE.tipFin){SAVE.tipFin=1;toast('点一下出菜口的菜，给它“点睛”，多卖一成半',3.2)}return true}
function svTapSt(s){const v=SV;if(!s.d)return;
  if(s.k==='cut'||s.k==='asm'){if(s.n<s.need){s.n++;SFX.tap();v.dirty=1;svFx('chop',v.st.indexOf(s))}if(s.n>=s.need)svPlate(s,'ok')}
  else if(s.ph==='cook')toast(s.k==='umu'?'地炉封着，中途不能打开':'还没熟，再等等',1.2);
  else if(s.ph==='burn'){s.d=null;s.ph='';v.dirty=1;SFX.pop()}
  else if(svPlate(s,s.ph==='perfect'?'perfect':'ok'))SFX.save()}
function svGarnish(j){const v=SV,p=v.shelf[j];if(!p)return;if(p.fin){toast('这盘已经点过睛了',1);return}p.fin=1;v.dirty=1;SFX.shield();const e=$('svShelf').querySelectorAll('.plate')[j];svPop('✨ 点睛',e)}
function svSeatTap(i){const v=SV,s=v.seats[i];if(!s)return;if(v.shelf.some(p=>p.d===s.d)){svServe(i);return}
  if(s.greet){toast('已经招呼过这位客人了',1.2);return}if(v.gcd>0){toast('刚招呼过别人，稍等一下',1.2);return}if(s.p/s.P>=.6){toast('这位客人还不着急',1.2);return}
  s.greet=1;s.p=Math.min(s.P,s.p+s.P*.35);v.gcd=5;v.dirty=1;SFX.save();svPop('马上就好！',SVE.sb[i])}
function svSeatFor(p){const v=SV,w=v.seats.map((s,i)=>s&&s.d===p.d?i:-1).filter(i=>i>=0);if(!w.length)return -1;const a=w.find(i=>!!v.seats[i].sig===!!p.hand);return a!==undefined?a:w[0]}
function svServe(i){const v=SV,s=v.seats[i];if(!s)return;const ord=p=>(p.d===s.d?1:0)*((!!p.hand===!!s.sig?4:0)+(p.q==='perfect'?2:0)+1);let j=-1,best=0;v.shelf.forEach((p,k)=>{const o=ord(p);if(o>best){best=o;j=k}});
  if(j<0){toast('这道菜还没做好',1.2);return}const p=v.shelf.splice(j,1)[0],d=dById(s.d),first=!SAVE.dishes[d.id];
  const salted=v.salt&&SAVE.fish.salt>0;if(salted)SAVE.fish.salt--;const sigOk=s.sig&&p.hand,pay=v.banq?0:Math.round(d.p*(first?1.5:1)*(p.q==='perfect'?1.2:1)*(s.o?1.5:1)*(salted?1.5:1)*(p.fin?(restLv()>=10?1.25:1.15):1)*(sigOk?(restLv()>=13?1.6:1.4):1)*(1+.02*(restLv()-1))),tip=v.banq?0:Math.round(d.p*.3*Math.max(0,s.p)/s.P);
  if(p.q==='perfect')SAVE.stat.perfect=(SAVE.stat.perfect||0)+1;SAVE.dishes[d.id]=(SAVE.dishes[d.id]||0)+1;v.earn+=pay;v.tips+=tip;v.rep+=Math.round(d.p/5)+(s.o?15:0)+(sigOk?8:0);v.served++;if(p.fin)v.fins=(v.fins||0)+1;if(sigOk)v.sigs=(v.sigs||0)+1;if(s.o)s.o.done=1;svFx('serve',i,d.ic,pay+tip);svGhost(s,i,1);v.seats[i]=null;v.dirty=1;SFX.pearl(v.served);if(!v.banq&&(first||p.q==='perfect'||sigOk))
  toast([sigOk&&'招牌菜，亲手做的！',p.q==='perfect'&&'火候刚好！',first&&'新菜谱，多得五成！'].filter(Boolean).map(tl).join(/^(zh|ja)$/.test(SAVE.lang)?'':' '),1.4)}
function svTick(dt){const v=SV;v.t-=dt;{const rd=dt/(SAVE.spd||1);v.gcd=Math.max(0,(v.gcd||0)-rd);for(const p of v.shelf)p.age=(p.age||0)+rd}
  v.seats.forEach((s,i)=>{if(!s)return;s.p-=dt;if(s.p<=0){svGhost(s,i,0);v.seats[i]=null;v.lost++;v.rep-=2;if(s.o)delete s.o.in;v.dirty=1;SFX.hit()}});
  v.next-=dt;if(v.next<=0&&v.t>8){v.next=5-.7*v.seats.length+Math.random()*3;const i=v.seats.indexOf(null);if(i>=0&&v.banq){if(v.q.length){const d=dById(v.q.shift());v.seats[i]={d:d.id,p:30,P:30,face:'🧑',name:'宾客',o:null,look:svLook(),x:1e3};v.dirty=1;SFX.tap()}}else if(i>=0){const f=svAvail(),spare=v.shelf.find(p=>!v.seats.some(x=>x&&x.d===p.d)),o=spare?null:SAVE.orders.list.find(o=>!o.done&&!o.in&&unlocked(dById(o.d))&&canMake(dById(o.d),f));let d=spare?dById(spare.d):null;
      if(!d){if(o){o.in=1;d=dById(o.d)}else{const pool=DISH.filter(d=>unlocked(d)&&canMake(d,f));if(pool.length)d=pool[Math.floor(Math.random()*pool.length)]}}
      if(d){const sig=!v.seats.some(x=>x&&x.sig)&&Math.random()<(o?.5:.22),P=o?30:sig?28:24;v.seats[i]={d:d.id,p:P,P,face:FACES[Math.floor(Math.random()*FACES.length)],name:o?o.c:'',o,sig,look:svLook(o),x:1e3};v.dirty=1;SFX.tap();if(sig&&v.staff.chef&&!v.sigTip){v.sigTip=1;toast('阿珍：“这道得你来，我算过了。”带 ⭐ 的单你亲手做能多卖四成；等太久她才会接手',3.6)}}}}
  for(const s of v.st){if(!s.d)continue;
    if(TIME[s.k]){if(!s.open){s.t+=dt;const T=TIME[s.k],ph=s.t<T[0]?'cook':s.t<T[1]?'perfect':s.t<T[2]?'ok':'burn';if(ph!==s.ph){s.ph=ph;v.dirty=1;if(ph==='perfect')SFX.shield();if(ph==='burn')SFX.hit()}}
      if(v.staff.chef&&!s.hand&&s.ph!=='burn'&&s.t>=TIME[s.k][0]+(v.banq===2?4:1.5)&&v.shelf.length<4&&(s.k!=='umu'||v.seats.filter(x=>x&&x.d===s.d).length>v.shelf.filter(p=>p.d===s.d).length))svPlate(s,'ok')}
    else if(v.staff.chef&&!s.hand){s.ct=(s.ct||0)+dt;if(s.ct>(v.banq===2?1.3:.45)){s.ct=0;svTapSt(s)}}}
  if(v.staff.chef){const f2=v.banq===2;v.cs=(v.cs||0)+dt;if(v.cs>(f2?3.5:.7)){v.cs=0;for(const id of new Set(v.seats.filter(Boolean).map(s=>s.d))){const m=startKind(id),A=v.seats.filter(x=>x&&x.d===id&&(!x.sig||x.p/x.P<.45)&&(!f2||x.p/x.P<.5)).length,C=v.st.filter(x=>x.d===id&&x.ph!=='burn'&&!x.hand).length+v.shelf.filter(p=>p.d===id&&!p.hand).length;if(C<A&&svPending(id)>0&&(v.banq||canMake(dById(id),SAVE.fish))&&svFreeSt(m)){svStart(id);break}}}}
  if(v.staff.waiter){const f2=v.banq===2;v.wt+=dt;if(v.wt>(f2?3:.9)){v.wt=0;for(const p of v.shelf){if(!p.fin&&p.age<(f2?3:1.8))continue;const i=svSeatFor(p);if(i>=0){svServe(i);break}}}}
  if(v.banq){const n0=v.shelf.length;v.shelf=v.shelf.filter(p=>p.age<8||v.seats.some(x=>x&&x.d===p.d)||v.q.includes(p.d));if(v.shelf.length!==n0)v.dirty=1}
  const busy=v.seats.some(Boolean)||v.st.some(s=>s.d&&!(v.banq&&s.open))||!v.banq&&v.shelf.length;
  if(v.t<=0||(!busy&&(v.banq?!v.q.length:!DISH.some(d=>unlocked(d)&&canMake(d,SAVE.fish))))){svEnd(v.t<=0?'time':'stock');return}
  if(v.dirty)svRender();svBars();svScene(dt)}
