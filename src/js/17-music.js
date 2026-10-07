/* ---------- music (synthesised) ---------- */
const TRK={
 menu:{bpm:96,root:60,mo:12,kick:1,ch:[[0,4,7],[7,11,14],[9,12,16],[5,9,12]],
  A:'4 . 7 . 12 - 7 . 11 . 7 . 2 - 7 . 9 . 12 . 16 - 12 . 9 7 5 . 4 - 2 .',
  B:'12 - 16 14 12 - 7 . 14 - 11 7 11 - 14 . 16 - 12 9 12 - 16 . 17 16 14 12 9 - 12 -'},
 lv0:{bpm:104,root:55,mo:12,kick:1,ch:[[0,4,7],[5,9,12],[0,4,7],[7,11,14]],
  A:'0 2 4 . 7 - 4 . 5 . 9 . 12 - 9 . 7 9 7 4 2 - 0 . 2 . 7 . 11 - 14 -',
  B:'12 - 9 7 9 - 4 . 9 - 5 . 9 12 14 . 16 - 12 . 7 9 12 . 14 12 11 . 7 - - .'},
 lv1:{bpm:92,root:50,mo:24,ch:[[0,3,7],[-2,2,5],[-4,0,3],[-2,2,5]],
  A:'0 . 3 . 7 - - . 5 . 2 . -2 - - . 3 . 0 . -4 - 0 . 2 - 5 - 7 - - .',
  B:'12 - 10 . 7 - 3 . 5 - 7 . 10 - - . 8 - 7 . 3 - 0 . 2 . 5 . 2 - - .'},
 lv2:{bpm:120,root:45,mo:24,kick:1,pulse:1,ch:[[0,3,7],[0,3,7],[-4,0,3],[-5,-1,2]],
  A:'0 . 0 3 . 0 7 . 0 . 0 3 . 0 8 7 8 . 5 3 . 0 3 . 2 . -1 2 . 4 2 .',
  B:'12 - 7 . 8 - 7 . 12 - 7 . 3 - 0 . 8 - 5 . 3 - 5 8 7 - 4 . 2 - -1 .'},
 lv3:{bpm:100,root:53,mo:12,bell:1,ch:[[0,4,7],[4,7,11],[5,9,12],[7,11,14]],
  A:'12 . 7 . 4 . 7 . 11 . 7 . 4 . 7 . 12 . 9 . 5 . 9 . 14 - 12 . 11 - 7 .',
  B:'16 - 12 . 16 - 19 . 16 - 11 . 16 - 19 . 17 - 12 . 17 - 21 . 19 - 16 14 12 - - .'},
 lv4:{bpm:112,root:52,mo:12,kick:1,ch:[[0,3,7],[-4,0,3],[3,7,10],[-2,2,5]],
  A:'0 - 7 . 10 - 7 . 8 - 7 . 3 - 0 . 3 - 7 . 10 - 15 . 14 - 9 . 14 - - .',
  B:'12 - 15 14 12 - 10 . 12 - 8 . 12 - 15 . 19 - 15 . 10 - 15 . 14 - 12 10 9 - 14 .'},
 kit:{bpm:100,root:53,mo:12,ch:[[0,4,7],[-3,0,4],[2,5,9],[-5,-1,2]],
  A:'12 . 9 12 . 9 7 . 5 . 9 5 . 2 0 . 2 . 5 9 . 10 9 . 7 . 4 7 . 4 0 .',
  B:'16 - 12 . 9 - 12 . 14 - 9 . 5 - 9 . 14 - 10 . 7 - 10 . 12 11 9 7 4 - 0 .'},
 lv5:{bpm:76,root:50,mo:12,bell:1,drip:1,ch:[[0,3,7],[-4,0,3],[-2,2,5],[-5,-2,2]],
  A:'7 . . 3 . . 0 . 5 . . 10 . . 7 . 9 . 7 . 5 - - . 0 . 2 - - . . .',
  B:'12 . . 15 . 14 . 12 10 . . 7 . . 5 . 9 . . 12 . 14 - . 14 - 12 . 9 - . .'},
 lv6:{bpm:96,root:52,mo:12,tom:1,ch:[[0,3,7],[1,5,8],[0,3,7],[-2,1,5]],
  A:'0 . 3 . 7 - 5 . 8 - 7 . 5 . 1 . 3 . 0 . 3 . 5 7 5 - 1 . -2 - - .',
  B:'12 - 10 . 8 . 7 . 13 - 12 . 8 . 5 . 7 . 10 . 12 . 15 . 13 - 12 10 8 - 7 .'},
 lv7:{bpm:108,root:53,mo:12,pluck:1,kick:1,ch:[[0,4,7],[5,9,12],[2,5,9],[7,11,14]],
  A:'0 . 4 . 7 . 6 7 9 . 10 . 12 . 9 . 7 . 5 . 2 . 3 4 7 . . . 11 . 7 .',
  B:'12 . 12 . 16 . 15 16 17 . 14 . 12 . 9 . 14 . 10 . 7 . 9 10 11 . 14 . 7 . . .'},
 lv8:{bpm:126,root:43,mo:24,kick:1,pulse:1,ch:[[0,3,7],[-2,2,5],[-4,0,3],[-5,-1,2]],
  A:'7 - 3 . 7 . 10 . 10 - 5 . 2 . 5 . 8 - 3 . 0 . 3 . 7 . 11 . 14 . 11 .',
  B:'15 - 14 . 12 - 10 . 14 - 12 . 10 - 5 . 15 - 12 . 10 . 8 . 14 . 11 . 7 . 11 .'},
 lv9:{bpm:84,root:51,mo:12,bell:1,ch:[[0,4,7],[2,6,9],[-3,0,4],[5,9,12]],
  A:'7 . 11 . 14 - 11 . 9 - 6 . 2 . 6 . 7 - 4 . 0 . 4 . 5 - - . 9 . 12 .',
  B:'19 - 18 . 14 - 11 . 18 - 14 . 9 - 6 . 16 - 12 . 9 . 7 . 14 - 12 . 9 - - .'},
 lv10:{bpm:80,root:48,mo:12,ch:[[0,4,7],[-1,2,7],[-3,0,4],[-7,-3,0]],
  A:'4 - 7 . 12 - 11 . 14 - 11 . 7 - - . 9 - 12 . 16 - 14 . 12 - 9 . 5 - - .',
  B:'16 - - 14 12 - 11 . 14 - - 12 11 - 7 . 12 - - 11 9 - 4 . 9 - 7 . 5 - 4 .'},
 lv11:{bpm:116,root:55,mo:12,kick:1,arp:1,ch:[[0,4,7],[7,11,14],[9,12,16],[5,9,12]],
  A:'4 . 7 . 12 - 7 . 11 . 7 . 14 - 11 . 9 . 12 . 16 - 12 . 9 7 5 . 4 - 2 .',
  B:'16 - 14 . 12 - 11 12 14 - - 11 7 - - . 16 - 19 . 21 - 19 16 17 - 16 14 12 - - .'}};
Object.assign(TRK,{
 lv12:{bpm:98,root:57,mo:12,pluck:1,ch:[[0,4,7],[5,9,12],[-3,0,4],[7,11,14]],
  A:'0 . 4 . 7 . 9 . 7 - 4 . 2 . 4 . 0 . 4 . 7 . 12 . 9 - 7 . 4 - - .',
  B:'12 - 9 . 7 . 9 12 14 - 12 . 9 - 7 . 9 - 7 . 4 . 7 9 7 - 4 . 2 - 0 .'},
 lv13:{bpm:120,root:55,mo:12,kick:1,arp:1,ch:[[0,4,7],[5,9,12],[7,11,14],[0,4,7]],
  A:'0 4 7 . 12 . 7 . 9 . 12 . 14 - 12 . 7 . 9 . 11 . 14 . 12 - 9 . 7 - - .',
  B:'16 - 14 12 14 - 12 . 9 - 7 9 12 - - . 14 - 12 . 11 . 9 . 7 . 9 . 12 - - .'},
 lv14:{bpm:90,root:50,mo:12,tom:1,ch:[[0,3,7],[-2,2,5],[-4,0,3],[-5,-2,2]],
  A:'0 . 3 . 5 - 3 . 7 . 5 . 3 - 0 . -2 . 0 . 3 . 5 - 7 . 10 . 7 - - .',
  B:'12 - 10 . 7 . 5 . 10 - 7 . 3 - - . 5 . 7 . 10 . 12 . 10 - 7 . 5 - 3 .'},
 lv15:{bpm:132,root:45,mo:24,kick:1,pulse:1,ch:[[0,3,7],[-4,0,3],[-2,2,5],[-5,-1,2]],
  A:'0 . 3 . 0 . 7 . 5 . 3 . 2 . 0 . 0 . 3 . 7 . 10 . 8 - 7 . 3 - 2 .',
  B:'12 - 10 . 8 - 7 . 10 - 8 . 7 - 3 . 8 - 7 . 5 . 3 . 7 . 5 . 2 - -1 .'},
 lv16:{bpm:84,root:52,mo:12,pluck:1,ch:[[0,4,7],[-3,0,4],[5,9,12],[7,11,14]],
  A:'7 - - . 4 . 7 . 9 - 7 . 4 - - . 2 . 4 . 7 . 12 - 11 - 9 . 7 - - .',
  B:'12 - 14 . 12 - 9 . 7 - 9 . 12 - - . 11 - 9 . 7 . 4 . 2 - 4 . 0 - - .'},
 lv17:{bpm:108,root:47,mo:12,tom:1,kick:1,ch:[[0,3,7],[-2,2,5],[-4,0,3],[-2,2,5]],
  A:'0 . 0 3 5 . 3 . 7 . 5 3 0 - - . 0 . 0 3 5 . 7 . 10 . 7 5 3 - 0 .',
  B:'12 . 10 . 7 . 5 7 10 - 7 . 5 - 3 . 5 . 7 . 10 . 12 . 10 7 5 3 0 - - .'},
 lv18:{bpm:96,root:50,mo:12,arp:1,ch:[[0,3,7],[-4,0,3],[-7,-3,0],[-5,-1,2]],
  A:'0 . 3 . 7 . 10 . 8 - 7 . 3 - - . -1 . 2 . 5 . 8 . 7 - 3 . 2 - - .',
  B:'15 - 14 . 12 - 10 . 8 - 7 . 8 - 10 . 12 - 10 . 8 . 7 . 3 - 2 . 0 - - .'},
 lv19:{bpm:126,root:48,mo:12,kick:1,pulse:1,ch:[[0,4,7],[-3,0,4],[-7,-3,0],[-5,-1,2]],
  A:'0 . 4 . 7 . 4 . 9 . 7 . 4 . 2 . 0 . 4 . 7 . 12 . 11 - 9 . 7 - - .',
  B:'12 - 11 . 9 - 7 . 9 - 11 . 12 - 14 . 16 - 14 . 12 . 11 . 9 - 7 . 4 - - .'},
 lv20:{bpm:120,root:45,mo:12,tom:1,kick:1,ch:[[0,3,7],[-4,0,3],[-2,2,5],[-5,-1,2]],
  A:'0 . 0 . 3 . 5 . 6 . 5 . 3 - 0 . 0 3 7 . 10 . 8 . 7 - 3 . 0 - - .',
  B:'12 - 10 . 8 . 7 . 6 . 7 . 8 - 7 . 10 - 8 . 7 . 5 . 3 . 2 . 0 - - .'},
 lv21:{bpm:92,root:50,mo:12,pluck:1,ch:[[0,4,7],[-3,0,4],[-7,-3,0],[-5,-1,2]],
  A:'7 . 4 . 2 . 4 . 7 - - . 9 . 7 . 4 2 0 . 2 . 4 - 7 . 4 . 2 - - .',
  B:'12 - 11 . 9 - 7 . 9 - - . 11 . 12 . 14 - 12 . 11 . 9 . 7 - 4 . 2 - - .'},
 lv22:{bpm:78,root:55,mo:12,arp:1,ch:[[0,4,7],[5,9,12],[-3,0,4],[7,11,14]],
  A:'12 - - . 11 . 7 . 9 - - . 7 . 4 . 5 - - . 4 . 2 . 4 - 7 . 9 - - .',
  B:'16 - - . 14 . 12 . 14 - - . 12 . 9 . 11 - - . 12 . 14 . 12 - - . - . . .'},
 lv23:{bpm:112,root:48,mo:12,kick:1,arp:1,ch:[[0,4,7],[5,9,12],[7,11,14],[-3,0,4]],
  A:'0 . 4 . 7 . 12 . 9 - 7 . 5 . 4 . 7 . 9 . 11 . 12 . 14 - 12 . 11 . 7 .',
  B:'16 - 14 . 12 - 11 . 12 - 14 . 16 - 19 . 17 - 16 . 14 . 12 . 11 - 9 . 7 - - .'}});
for(const k in TRK){const t=TRK[k],a=t.A.split(' '),b=t.B.split(' ');t.seq=[...a,...a,...b,...a]}
const MUS={cur:null,step:0,next:0,out:null,lp:null,noise:null,chk:0};
function initAudio(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=='running')AC.resume();
  if(!MUS.out){MUS.out=AC.createGain();MUS.out.gain.value=.5;MUS.lp=AC.createBiquadFilter();MUS.lp.type='lowpass';MUS.lp.frequency.value=6000;MUS.out.connect(MUS.lp);MUS.lp.connect(AC.destination);
    const n=AC.sampleRate*.2,buf=AC.createBuffer(1,n,AC.sampleRate),d=buf.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;MUS.noise=buf}}catch(e){}}
document.addEventListener('pointerdown',initAudio,true);document.addEventListener('keydown',initAudio,true);
/* 手机切到后台再回来时声音会被系统挂起，回到前台就接着放 */
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&AC&&AC.state!=='running')try{AC.resume()}catch(e){}});
function mNote(midi,t,dur,type,vol){const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.value=440*Math.pow(2,(midi-69)/12);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.015);g.gain.exponentialRampToValueAtTime(.0008,t+dur);o.connect(g);g.connect(MUS.out);o.start(t);o.stop(t+dur+.03)}
function mKick(t){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(120,t);o.frequency.exponentialRampToValueAtTime(45,t+.12);g.gain.setValueAtTime(.16,t);g.gain.exponentialRampToValueAtTime(.001,t+.16);o.connect(g);g.connect(MUS.out);o.start(t);o.stop(t+.18)}
function mHat(t){const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=MUS.noise;f.type='highpass';f.frequency.value=6500;g.gain.setValueAtTime(.022,t);g.gain.exponentialRampToValueAtTime(.001,t+.05);s.connect(f);f.connect(g);g.connect(MUS.out);s.start(t);s.stop(t+.06)}
function mTom(t){const o=AC.createOscillator(),g=AC.createGain();o.frequency.setValueAtTime(170,t);o.frequency.exponentialRampToValueAtTime(80,t+.22);g.gain.setValueAtTime(.13,t);g.gain.exponentialRampToValueAtTime(.001,t+.28);o.connect(g);g.connect(MUS.out);o.start(t);o.stop(t+.3)}
function mStep(tr,step,t,e8,sparse,tense){
  const seq=tr.seq,i=step%seq.length,bar=Math.floor(i/8),pos=i%8,ch=tr.ch[bar%tr.ch.length];
  if(pos===0)mNote(tr.root-12+ch[0],t,e8*3.6,'sine',.15);else if(pos===4)mNote(tr.root-12+ch[0]+(sparse?0:7),t,e8*2.6,'sine',.11);
  if(!sparse){mNote(tr.root+ch[pos%3]+(pos>=4?12:0),t,e8*.9,'triangle',.03);if(tr.kick&&pos%4===0)mKick(t);if(tr.kick&&pos%2===1)mHat(t)}
  if(tr.pulse||tense)mNote(tr.root-24+ch[0],t,e8*.7,'sawtooth',tense?.05:.025);
  if(!sparse){if(tr.tom&&(pos===0||pos===5||pos===6))mTom(t);if(tr.arp)mNote(tr.root+12+ch[(pos+1)%3],t+e8/2,e8*.45,'triangle',.022);if(tr.drip&&pos===6&&bar%2===1)mNote(tr.root+36+ch[(bar>>1)%3],t,e8*1.4,'sine',.035)}
  const tok=seq[i];if(tok!=='.'&&tok!=='-'&&!(sparse&&bar%4>=2)){let n=1;while(n<8&&seq[(i+n)%seq.length]==='-')n++;
    const m=tr.root+tr.mo+ +tok;if(tr.bell){mNote(m,t,e8*n*1.6,'sine',.1);mNote(m+12,t,e8*.8,'sine',.03)}else if(tr.pluck){mNote(m,t,e8*Math.min(n,2)*.55,'square',.035);mNote(m,t,e8*n*.8,'triangle',.07)}else{mNote(m,t,e8*n*1.05,'triangle',.1);mNote(m,t,e8*n*.9,'sine',.04)}}}
function musWant(){if(FS&&!stQ)return'fish';if(G&&G.boss&&!G.boss.done&&G.boss.k==='team'&&state!=='over')return null;if(stQ){const c=SCN[stQ.lines[stQ.i][2]]||{};return c.night?null:c.bg==='sea'?'lv'+c.i:c.bg==='diner'?'kit':'menu'}if(G)return state==='over'?null:'lv'+G.theme;const on=document.querySelector('.scr.on');return on&&(on.id==='sKit'||on.id==='sServe')?'kit':'menu'}
function musTick(){
  if(!AC||!MUS.out||AC.state!=='running')return;
  if(--MUS.chk<=0){MUS.chk=12;const w=SAVE.music===0?null:musWant();if(w!==MUS.cur){MUS.cur=w;MUS.step=0;MUS.next=AC.currentTime+.25}
    const sparse=!!(G&&G.faded);MUS.lp.frequency.setTargetAtTime(sparse?1100:6000,AC.currentTime,.4);MUS.out.gain.setTargetAtTime(state==='pause'?.15:.5,AC.currentTime,.2)}
  const tr=TRK[MUS.cur];if(!tr)return;const sparse=!!(G&&G.faded),tense=!!(G&&state==='play'&&(G.sharks.length||G.trap));
  const e8=30/(tr.bpm*(tense?1.15:sparse?.85:1));if(MUS.next<AC.currentTime)MUS.next=AC.currentTime+.05;
  let n=0;while(MUS.next<AC.currentTime+.22&&n++<8){mStep(tr,MUS.step,MUS.next,e8,sparse,tense);MUS.next+=e8;MUS.step++}}

