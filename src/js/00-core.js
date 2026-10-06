(()=>{'use strict';
const $=id=>document.getElementById(id);
const cv=$('c'),ctx=cv.getContext('2d'),hud=$('hud');
const clamp=(v,a,b)=>v<a?a:v>b?b:v,lerp=(a,b,t)=>a+(b-a)*t,TAU=Math.PI*2;
let FONT='"ZCOOL KuaiLe","PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif';
const hash=n=>{const x=Math.sin(n*127.1+3.7)*43758.5453;return x-Math.floor(x)};

