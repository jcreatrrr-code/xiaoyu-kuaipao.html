/* ---------- audio ---------- */
let AC=null;
function snd(f,d,type,v,to){if(SAVE.mute)return;try{
  AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
  const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=type||'sine';o.frequency.setValueAtTime(f,t);
  if(to)o.frequency.exponentialRampToValueAtTime(to,t+d);g.gain.setValueAtTime(v||.1,t);g.gain.exponentialRampToValueAtTime(.001,t+d);
  o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d)}catch(e){}}
const SFX={
  pearl:c=>snd(700+Math.min(c,12)*55,.1,'triangle',.1),hit:()=>snd(220,.25,'sawtooth',.11,80),
  shield:()=>snd(520,.18,'triangle',.12,1040),pop:()=>snd(900,.2,'square',.06,300),
  alarm:()=>{snd(440,.16,'square',.07);setTimeout(()=>snd(330,.16,'square',.07),190)},
  win:()=>[523,659,784,1047].forEach((f,i)=>setTimeout(()=>snd(f,.22,'triangle',.12),i*130)),
  lose:()=>snd(300,.6,'sawtooth',.09,60),tap:()=>snd(520,.05,'sine',.06),free:()=>snd(400,.3,'triangle',.12,1200),
  save:()=>snd(600,.25,'sine',.1,900)};

