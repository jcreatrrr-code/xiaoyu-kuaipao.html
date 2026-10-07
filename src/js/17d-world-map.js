/* ---------- 关卡地图：选关做成一条往前走的海路，小鱼沿着路游到要玩的关卡 ---------- */
const WM_DECO=[['🪸','🐚'],['⚓','🛟'],['🦈','🫧'],['🧊','❄️'],['💰','✨'],['🔦','💎'],['🏛️','🐚'],['🌿','🌱'],['🌀','🦐'],['🏮','🦑'],['💧','✨'],['🌊','🌈'],
 ['🥥','🏝️'],['🐟','💨'],['🌳','🦀'],['⛈️','🛶'],['⭐','🐚'],['🌋','🦞'],['💡','🎣'],['🐟','💡'],['🌋','🔥'],['🪨','🐙'],['🌟','🌙'],['🏮','🍲']];
const wmSel={},wmCross=t=>Math.sin(t*1.05+.5)*.62+Math.sin(t*.37+1.2)*.38;
let WM=null,wmRaf=0;
function wmFishSvg(){const sk=SKINS[SAVE.skin]||SKINS[0],[c0,c1,c2]=sk.c;
  return`<div class="wmOff"><div class="wmFi"><svg viewBox="-56 -40 96 80" width="60" height="50" aria-hidden="true"${sk.sp==='angel'?' class="glow"':''}><defs><radialGradient id="wmFg" cx="42%" cy="32%" r="62%"><stop offset="0" stop-color="${c0}"/><stop offset="1" stop-color="${c1}"/></radialGradient></defs>`
   +`<path d="M-23 0Q-39 -6 -50 -21Q-42 0 -50 21Q-39 6 -23 0Z" fill="${c2}"><animateTransform attributeName="transform" type="rotate" values="-16 -23 0;16 -23 0;-16 -23 0" dur=".7s" repeatCount="indefinite"/></path>`
   +`<path d="M-12 -19Q-3 -37 11 -20Z" fill="${c2}"/><ellipse rx="28" ry="23" fill="url(#wmFg)"/><ellipse cx="2" cy="10" rx="17" ry="9" fill="rgba(255,255,255,.38)"/><ellipse cx="-5" cy="8" rx="8" ry="5" transform="rotate(34 -5 8)" fill="${c2}"/>`
   +`<circle cx="13" cy="-5" r="9.5" fill="#fff"/><circle cx="15" cy="-5" r="5.4" fill="#1b2a41"/><circle cx="16.8" cy="-7.2" r="2" fill="#fff"/><circle cx="7" cy="8" r="4.5" fill="rgba(255,90,120,.45)"/>`
   +`<path d="M25.3 5.4A5.5 5.5 0 0 1 20.4 9.5" fill="none" stroke="#8a3b00" stroke-width="2.2" stroke-linecap="round"/></svg></div></div>`}
function renderMap(mode,vol,hi,sv,base,still){
  cancelAnimationFrame(wmRaf);
  const box=$('lvGrid'),land=matchMedia('(orientation:landscape)').matches,key=mode+vol;
  const ids=LV.map((L,i)=>i).filter(i=>volOf(i)===vol),feast=vol===2&&!hi&&cleared(VOL1+11),n=ids.length+(feast?1:0);
  const open=k=>k>=ids.length||ids[k]===0||hi&&ids[k]===VOL1||sv.st[ids[k]-1]>0,done=k=>k<ids.length?sv.st[ids[k]]>0:!!SAVE.feast2,lit=k=>k<ids.length?cleared(ids[k]):done(k);
  let front=0;for(let k=0;k<ids.length;k++)if(open(k))front=k;
  SAVE.mapAt=SAVE.mapAt||{};const was=SAVE.mapAt[key],walk=!still&&was!==undefined&&was<front?was:-1;
  if(was!==front){SAVE.mapAt[key]=front;persist()}
  let sel=walk>=0?walk:wmSel[key];if(sel===undefined||sel>=n||!open(sel))sel=front;
  wmInfo0(ids,base,hi,sv,sel);
  /* 地图铺满整个界面，上面的标签和下面（横屏是右边）的关卡卡片浮在海图上 */
  const bw=box.clientWidth,bh=box.clientHeight,hh=$('lvHead').offsetHeight+8,iw=land?$('lvInfo').offsetWidth+14:0,ih=land?0:$('lvInfo').offsetHeight+14;
  const vis=land?bh-hh:bh-hh-ih,D=land?Math.max(112,Math.min(150,vis*.5)):Math.max(100,Math.min(114,vis*.26)),P0=land?110:ih+96,P1=land?iw+90:hh+70;
  const len=P0+(n-1)*D+P1,W=land?Math.max(len,bw):bw,H=land?bh:Math.max(len,bh),A=land?Math.min(vis*.23,130):Math.min(bw*.27,160);
  const at=(m,c)=>land?[m,hh+vis/2-10+c]:[W/2+c,H-m];
  const Q=[at(P0-D*.72,wmCross(-1)*A*.5)];for(let k=0;k<n;k++)Q.push(at(P0+k*D,wmCross(k)*A));
  const poly=[],nodeAt=[0];
  for(let s=0;s<Q.length-1;s++){const p0=Q[Math.max(0,s-1)],p1=Q[s],p2=Q[s+1],p3=Q[Math.min(Q.length-1,s+2)];
    for(let j=0;j<20;j++){const t=j/20,t2=t*t,t3=t2*t,f=(a,b,c,d)=>.5*(2*b+(-a+c)*t+(2*a-5*b+4*c-d)*t2+(-a+3*b-3*c+d)*t3);poly.push([f(p0[0],p1[0],p2[0],p3[0]),f(p0[1],p1[1],p2[1],p3[1])])}
    nodeAt.push(poly.length)}
  poly.push(Q[Q.length-1]);
  const cum=[0];for(let i=1;i<poly.length;i++)cum.push(cum[i-1]+Math.hypot(poly[i][0]-poly[i-1][0],poly[i][1]-poly[i-1][1]));
  const dpath=(a,b)=>'M'+poly.slice(a,b+1).map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join('L');
  const mixW=(h,a)=>'#'+[1,3,5].map(i=>Math.round(parseInt(h.slice(i,i+2),16)*(1-a)+255*a).toString(16).padStart(2,'0')).join(''),R=D*1.02,f1=v=>v.toFixed(1),FT={top:'#ffb070',mid:'#c8603a',far:'#e0824a',sand:'#f5d8a0',rock:'#8a5a40',rock2:'#5a3a2a',weed:'#ffcf6a'};
  /* 小物件不压在关卡点、名字牌和海路上 */
  const busy=(x,y,r)=>Q.some((q,j)=>j>0&&Math.abs(q[0]-x)<r+38&&y>q[1]-r-38&&y<q[1]+r+(land?62:58))||poly.some((p,j)=>j%4===0&&Math.hypot(p[0]-x,p[1]-y)<r+14)||Q.some((q,j)=>{if(!j)return 0;const [fx,fy]=land?[q[0],q[1]-60]:[q[0]+(q[0]>bw*.32?-62:62),q[1]-4];return Math.hypot(fx-x,fy-y)<r+38})||x<r||x>W-r||y<r||y>H-r;
  const sea1=vol===2?'#2fb3cc':'#2a9fd0',sea2=vol===2?'#123766':'#0a3463';
  let defs=`<linearGradient id="wmSea" x1="0" y1="${land?0:1}" x2="${land?1:0}" y2="0"><stop offset="0" stop-color="${sea1}"/><stop offset="1" stop-color="${sea2}"/></linearGradient>`
    +'<filter id="wmF1" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values=".4"/></filter><filter id="wmF0" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values=".15"/><feComponentTransfer><feFuncR type="linear" slope=".62" intercept=".2"/><feFuncG type="linear" slope=".62" intercept=".24"/><feFuncB type="linear" slope=".62" intercept=".3"/></feComponentTransfer></filter>'
    +'<filter id="wmBl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="14"/></filter>';
  let ground='',deco='',amb='';
  /* 远处的光柱和气泡，让空着的海面不显得秃 */
  for(let j=0;j<Math.ceil((land?W:H)/260);j++){const m=j*260+hash(j+300)*120,c=(hash(j+310)-.5)*(land?bh:bw);
    amb+=land?`<path d="M${f1(m)} 0l90 0l-160 ${bh}l-60 0Z" fill="#fff" opacity=".045"/>`:`<path d="M0 ${f1(m)}l${bw} -140l0 50l-${bw} 140Z" fill="#fff" opacity=".04"/>`;
    for(let i=0;i<3;i++){const u=m+hash(j*7+i)*240,v=(land?bh:bw)*hash(j*9+i+5),[x,y]=land?[u,v]:[v,H-u];amb+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(2+hash(j+i*3)*4)}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="1.5"/>`}}
  for(let k=0;k<n;k++){const [x,y]=Q[k+1],c=wmCross(k),out=Math.abs(c)>.25?Math.sign(c):(k%2?1:-1),T0=k<ids.length?TH[LV[ids[k]].theme]:FT,T={},sd=(ids[k]===undefined?40:ids[k])*13+vol;
    for(const c2 in T0)if(typeof T0[c2]==='string'&&T0[c2][0]==='#')T[c2]=mixW(T0[c2],c2==='top'||c2==='far'?.18:c2==='rock'||c2==='rock2'?.3:.08);
    const fl=lit(k)?'':open(k)?' filter="url(#wmF1)"':' filter="url(#wmF0)"';
    const cx=x+(land?0:out*R*.12),cy=y+(land?out*R*.12:0);
    defs+=`<radialGradient id="wmR${k}"><stop offset="0" stop-color="${T.top}"/><stop offset=".5" stop-color="${T.top}"/><stop offset=".78" stop-color="${T.far}"/><stop offset="1" stop-color="${T.far}" stop-opacity="0"/></radialGradient>`;
    const bp=[];for(let j=0;j<9;j++){const a=j/9*TAU,r=R*(.92+.22*hash(sd+j));bp.push([cx+Math.cos(a)*r*(land?.9:1.2),cy+Math.sin(a)*r*(land?1.25:.82)])}
    const mid=(p,q)=>f1((p[0]+q[0])/2)+' '+f1((p[1]+q[1])/2);let b='M'+mid(bp[8],bp[0]);for(let j=0;j<9;j++)b+='Q'+f1(bp[j][0])+' '+f1(bp[j][1])+' '+mid(bp[j],bp[(j+1)%9]);
    ground+=`<g${fl}><path d="${b}Z" fill="url(#wmR${k})" filter="url(#wmBl)"/></g>`;
    const ox=land?0:out,oy=land?out:0,px=(u,v)=>[cx+ox*u+oy*v,cy+oy*u+ox*v];let g='';
    {const [sx,sy]=px(R*.5,R*.1);if(!busy(sx,sy,R*.2))g+=`<ellipse cx="${f1(sx)}" cy="${f1(sy)}" rx="${f1(R*.32)}" ry="${f1(R*.15)}" fill="${T.sand}" opacity=".75"/><ellipse cx="${f1(sx-R*.06)}" cy="${f1(sy-R*.04)}" rx="${f1(R*.17)}" ry="${f1(R*.06)}" fill="#fff" opacity=".22"/>`}
    for(let j=0;j<4;j++){const [rx,ry]=px(R*(.45+.3*hash(sd+20+j))*(j%2?-1:1),R*(hash(sd+30+j)-.5)*1.1),rr=4+hash(sd+40+j)*5;if(busy(rx,ry,rr))continue;g+=`<circle cx="${f1(rx)}" cy="${f1(ry)}" r="${f1(rr)}" fill="${j%2?T.rock2:T.rock}"/><circle cx="${f1(rx-rr*.3)}" cy="${f1(ry-rr*.35)}" r="${f1(rr*.35)}" fill="#fff" opacity=".3"/>`}
    for(let j=0;j<4;j++){const [wx,wy]=px(R*(.4+.35*hash(sd+50+j))*(j%2?1:-1),R*(hash(sd+60+j)-.5)*1.2),h=16+hash(sd+70+j)*14;if(busy(wx,wy-h/2,h/2))continue;g+=`<path d="M${f1(wx)} ${f1(wy)}c-9 ${f1(-h/3)} 9 ${f1(-h*2/3)} 0 ${f1(-h)}M${f1(wx+7)} ${f1(wy)}c8 ${f1(-h/4)} -6 ${f1(-h/2)} 2 ${f1(-h*.7)}" stroke="${T.weed}" stroke-width="4.5" stroke-linecap="round" fill="none"/>`}
    const em=k<ids.length?WM_DECO[ids[k]]||[]:['🔥','🍲'];
    em.forEach((e,j)=>{const sz=j?22:28;for(const [u,v] of [[.62,j?.42:-.42],[.5,j?.7:-.7],[-.6,j?.45:-.45],[.8,0]]){const [ex,ey]=px(R*u,R*v);if(busy(ex,ey,sz*.55))continue;g+=`<text x="${f1(ex)}" y="${f1(ey)}" font-size="${sz}" text-anchor="middle" dominant-baseline="central">${e}</text>`;break}});
    deco+=`<g${fl}>${g}</g>`}
  const full=dpath(0,poly.length-1),gone=dpath(0,nodeAt[(walk>=0?walk:front)+1]);
  const svg=`<svg class="wmBg" width="${W}" height="${H}" aria-hidden="true"><defs>${defs}</defs><rect width="${W}" height="${H}" fill="url(#wmSea)"/>${amb}${ground}${deco}`
    +`<path d="${full}" fill="none" stroke="#06284a" stroke-opacity=".18" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" transform="translate(0 4)"/>`
    +`<path d="${full}" fill="none" stroke="#fff3d0" stroke-opacity=".3" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`
    +`<path d="${full}" fill="none" stroke="#fff" stroke-opacity=".7" stroke-width="7" stroke-dasharray="0 16" stroke-linecap="round"/>`
    +`<path class="wmDone" d="${gone}" fill="none" stroke="#ffd23f" stroke-width="9" stroke-dasharray="0 16" stroke-linecap="round"/>`
    +`<text x="${f1(Q[0][0])}" y="${f1(Q[0][1])}" font-size="32" text-anchor="middle" dominant-baseline="central">${vol===2?'⛵':'🏠'}</text></svg>`;
  let nodes='';
  for(let k=0;k<n;k++){const [x,y]=Q[k+1],o=open(k),dn=done(k),fz=k<ids.length&&walk>=0&&k>walk&&k<=front;
    if(k===ids.length){nodes+=`<button class="wmN feast${dn?' done':' open'}" data-k="${k}" style="left:${f1(x)}px;top:${f1(y)}px">🔥<em>石焖宴</em></button>`;continue}
    const i=ids[k],L=LV[i];let st='';if(dn){for(let j=0;j<3;j++)st+=`<i class="st ${sv.st[i]>j?'f':''}"></i>`;if(sv.s4[i])st+='<i class="st f"></i>'}
    nodes+=`<button class="wmN ${dn?'done':o?'open':'lock'}${L.boss?' boss':''}${fz?' fresh':''}" data-k="${k}" style="left:${f1(x)}px;top:${f1(y)}px${fz?';animation-delay:'+(.25+(k-walk-1)*.2)+'s':''}">`
      +(o?`<b>${i-base+1}</b>`:'🔒')+(L.boss&&o?'<span class="wmCr">👑</span>':'')+(o?`<em>${L.name}${st?`<span class="wmSt">${st}</span>`:''}</em>`:'')+'</button>'}
  box.innerHTML=`<div class="wm" style="width:${W}px;height:${H}px">${svg}${nodes}<div class="wmFish">${wmFishSvg()}</div></div>`;
  WM={mode,vol,hi,sv,base,ids,n,key,land,poly,cum,nodeAt,Q,sel,front,open,moving:0,hh,ih,iw};
  wmPlace(Q[sel+1],1);wmRest();wmMark();wmInfo();
  if(walk>=0)setTimeout(()=>{if(WM&&WM.key===key)wmMove(front,()=>{const p=box.querySelector('.wmDone');if(p)p.setAttribute('d',dpath(0,nodeAt[front+1]))})},650+(front-walk)*200)}
/* 停下来时小鱼待在关卡点旁边（竖屏在侧面，横屏在上方），不挡住名字牌和下一关 */
function wmRest(on=1){const w=WM,f=$('lvGrid').querySelector('.wmFish');if(!f)return;f.classList.remove('restL','restR','restU');if(!on)return;
  if(w.land){f.classList.add('restU');return}const q=w.Q[w.sel+1];f.classList.add(q[0]>$('lvGrid').clientWidth*.32?'restL':'restR')}
function wmPlace(p,snap){const f=$('lvGrid').querySelector('.wmFish');if(!f)return;f.style.left=p[0]+'px';f.style.top=p[1]+'px';
  const box=$('lvGrid'),w=WM;if(w.land){const v=p[0]-(box.clientWidth-w.iw)/2;box.scrollLeft=snap?v:box.scrollLeft+(v-box.scrollLeft)*.2}else{const v=p[1]-(w.hh+(box.clientHeight-w.hh-w.ih)/2);box.scrollTop=snap?v:box.scrollTop+(v-box.scrollTop)*.2}}
function wmMark(){$('lvGrid').querySelectorAll('.wmN').forEach(b=>b.classList.toggle('sel',+b.dataset.k===WM.sel))}
function wmInfo(){const {hi,sv,ids,base,sel}=WM;wmInfo0(ids,base,hi,sv,sel)}
function wmInfo0(ids,base,hi,sv,sel){const go=(t)=>`<div class="liB"><button class="btn sm" data-wm="back">返回主菜单</button><button class="btn sun" data-wm="go">${t}</button></div>`;
  let h=`<p class="wmStar">${$('starInfo').dataset.raw||''}</p>`;
  if(sel===ids.length)h+=`<div class="liT"><b>🔥 特别关 石焖宴</b></div><em>${SAVE.feast2?'已办成 · 可以再开一次':'全岛的人都在等着开席'}</em><em>十二位客人，至少上九道</em>`+go('开席');
  else{const i=ids[sel],L=LV[i];let st='';for(let k=0;k<3;k++)st+=`<i class="st ${sv.st[i]>k?'f':''}"></i>`;if(sv.s4[i])st+='<i class="st f"></i>';
    h+=`<div class="liT"><b>第${i-base+1}关 ${L.name}</b><span class="mini">${st}</span></div><em>${goalText(L,hi)}</em><em>${L.tool?TOOLN[L.tool][0]+(SAVE.tools[L.tool]?' 带着':' 需要')+TOOLN[L.tool][1]:cleared(i)?'🌊 海域已恢复':'海域褪色中'}</em>`+go('出发')}
  $('lvInfo').innerHTML=h}
/* 小鱼沿着海路游过去，经过的关卡都要走一遍 */
function wmMove(k,then){const w=WM;if(!w||w.moving)return;const a=w.nodeAt[w.sel+1],b=w.nodeAt[k+1];w.sel=k;wmSel[w.key]=k;wmMark();wmInfo();
  if(a===b){wmRest();then&&then();return}
  const s0=w.cum[a],s1=w.cum[b],dur=Math.min(1.6,Math.max(.35,Math.abs(s1-s0)/520))*1000,t0=performance.now(),fi=$('lvGrid').querySelector('.wmFi');w.moving=1;wmRest(0);
  const step=now=>{if(WM!==w)return;const u=Math.min(1,(now-t0)/dur),e=u<.5?2*u*u:1-2*(1-u)*(1-u),s=s0+(s1-s0)*e;
    let lo=0,hi2=w.cum.length-1;while(hi2-lo>1){const m=(lo+hi2)>>1;if(w.cum[m]<=s)lo=m;else hi2=m}
    const p0=w.poly[lo],p1=w.poly[hi2],r=(s-w.cum[lo])/((w.cum[hi2]-w.cum[lo])||1),p=[p0[0]+(p1[0]-p0[0])*r,p0[1]+(p1[1]-p0[1])*r],dx=(p1[0]-p0[0])*(s1>s0?1:-1);
    if(fi&&Math.abs(dx)>.6)fi.classList.toggle('left',dx<0);wmPlace(p,0);
    if(u<1)wmRaf=requestAnimationFrame(step);else{w.moving=0;fi&&fi.classList.remove('left');wmRest();then&&then()}};
  wmRaf=requestAnimationFrame(step)}
function wmGo(){const w=WM;if(!w||w.moving)return;SFX.tap();if(w.sel===w.ids.length){startFeast2();return}launch(w.mode,w.ids[w.sel])}
$('lvGrid').onclick=e=>{const b=e.target.closest('.wmN');if(!b||!WM||WM.moving)return;const k=+b.dataset.k;
  if(!WM.open(k)){SFX.tap();b.classList.remove('nope');void b.offsetWidth;b.classList.add('nope');toast('通关上一关后揭晓',2);return}
  if(k===WM.sel){wmGo();return}SFX.tap();wmMove(k)};
$('lvInfo').onclick=e=>{const b=e.target.closest('[data-wm]');if(!b)return;if(b.dataset.wm==='go')wmGo();else{SFX.tap();WM=null;show('sMenu')}};
$('lvGrid').addEventListener('wheel',e=>{if(WM&&WM.land&&Math.abs(e.deltaY)>Math.abs(e.deltaX)){$('lvGrid').scrollLeft+=e.deltaY;e.preventDefault()}},{passive:false});
{let rt=0;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{const w=WM;if(w&&$('sLevels').classList.contains('on')&&$('sLevels').classList.contains('map')&&!w.moving){wmSel[w.key]=w.sel;renderMap(w.mode,w.vol,w.hi,w.sv,w.base,1)}},180)})}
{const EN7={"开席":"Start the feast"};for(const k in EN7)if(!DICT[k]){const v=EN7[k];DICT[k]=[v,v,v,v]}for(const k in TLC)delete TLC[k]}
