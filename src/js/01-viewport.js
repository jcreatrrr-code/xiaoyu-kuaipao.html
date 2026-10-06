/* ---------- viewport ---------- */
let W=390,H=780,S=1,U=1,VW=520,VT=720,PH=720,yMin=96,yMax=640,fishSX=120;
function resize(){
  const dpr=Math.min(window.devicePixelRatio||1,2);
  W=cv.clientWidth||window.innerWidth||390;H=cv.clientHeight||window.innerHeight||780;
  cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);
  S=Math.min(H/620,W/520);U=1/S;VW=W/S;VT=H/S;PH=Math.min(VT,1000);
  yMin=((+hud.offsetHeight||0)+6)/S;yMax=PH-80;fishSX=Math.min(VW*.24,250);
  ctx.setTransform(dpr*S,0,0,dpr*S,0,0);
  $('toast').style.top=((+hud.offsetHeight||60)+14)+'px';
}
const fy=f=>yMin+f*(yMax-yMin);

