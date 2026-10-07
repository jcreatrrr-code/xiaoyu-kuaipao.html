"""画 App 图标（1024×1024）和启动画面（2732×2732），用的是游戏里的小鱼画法。

用法：python3 tools/make_app_art.py     （需要 playwright）
输出：app/resources/icon.png、app/resources/splash.png，并放进 Xcode 工程
"""
import base64, os, re, shutil
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = os.path.join(ROOT, 'app')
src = open(os.path.join(ROOT, 'src/js/07-drawing.js'), encoding='utf-8').read()
fish = re.search(r'function drawFish\(.*?\n  ctx\.restore\(\)\}', src, re.S).group(0)
font = base64.b64encode(open(os.path.join(APP, 'fonts/ZCOOLKuaiLe.woff2'), 'rb').read()).decode()

PAGE = '''<!doctype html><html><head><style>@font-face{font-family:K;src:url(data:font/woff2;base64,%s)}</style></head>
<body style="margin:0"><canvas id=c></canvas><script>
const TAU=Math.PI*2;let ctx;const circ=(x,y,r)=>{ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill()};
%s
function sea(N,top,bot){const g=ctx.createLinearGradient(0,0,0,N);g.addColorStop(0,top);g.addColorStop(1,bot);ctx.fillStyle=g;ctx.fillRect(0,0,N,N);
  ctx.globalAlpha=.10;ctx.fillStyle='#fff';for(let i=0;i<5;i++){ctx.beginPath();const x=N*(.1+i*.22);ctx.moveTo(x,0);ctx.lineTo(x+N*.08,0);ctx.lineTo(x-N*.12,N);ctx.lineTo(x-N*.17,N);ctx.fill()}ctx.globalAlpha=1}
function bubble(x,y,r){ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=r*.22;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();ctx.fillStyle='rgba(255,255,255,.25)';circ(x,y,r);ctx.fillStyle='rgba(255,255,255,.9)';circ(x-r*.35,y-r*.35,r*.22)}
function pearl(x,y,r){const g=ctx.createRadialGradient(x-r*.35,y-r*.35,r*.1,x,y,r);g.addColorStop(0,'#fff');g.addColorStop(1,'#e9d9ff');ctx.fillStyle=g;circ(x,y,r)}
window.draw=(kind)=>{const c=document.getElementById('c');const N=kind==='icon'?1024:2732;c.width=c.height=N;ctx=c.getContext('2d');
  sea(N,'#7fd8ff','#0b6fb0');
  if(kind==='icon'){
    bubble(800,250,46);bubble(870,370,28);bubble(760,150,20);pearl(200,760,34);pearl(290,820,26);
    ctx.save();ctx.translate(500,540);drawFish(0,0,-.18,.03,{s:9.4});ctx.restore();
  }else{
    const m=N/2;bubble(m+330,m-420,60);bubble(m+420,m-280,36);bubble(m+300,m-560,24);
    ctx.save();drawFish(m-30,m-160,-.15,.03,{s:10});ctx.restore();
    ctx.fillStyle='#fff';ctx.font='220px K';ctx.textAlign='center';ctx.lineWidth=26;ctx.strokeStyle='#0d3b5c';ctx.lineJoin='round';
    ctx.strokeText('小鱼快跑',m,m+330);ctx.fillText('小鱼快跑',m,m+330);
  }
  return c.toDataURL('image/png')};
</script></body></html>''' % (font, fish)


def main():
    out = os.path.join(APP, 'resources')
    os.makedirs(out, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page()
        pg.set_content(PAGE)
        pg.evaluate('document.fonts.load("220px K")')
        pg.wait_for_timeout(300)
        for kind in ('icon', 'splash'):
            data = pg.evaluate(f'draw("{kind}")')
            path = os.path.join(out, kind + '.png')
            with open(path, 'wb') as f:
                f.write(base64.b64decode(data.split(',')[1]))
        b.close()
    # App Store 的图标不能带透明通道
    from PIL import Image
    for kind in ('icon', 'splash'):
        path = os.path.join(out, kind + '.png')
        Image.open(path).convert('RGB').save(path)
    xc = os.path.join(APP, 'ios/App/App/Assets.xcassets')
    if os.path.isdir(xc):
        shutil.copy(os.path.join(out, 'icon.png'), os.path.join(xc, 'AppIcon.appiconset/AppIcon-512@2x.png'))
        for n in ('splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png'):
            shutil.copy(os.path.join(out, 'splash.png'), os.path.join(xc, 'Splash.imageset', n))
    print('已生成 app/resources/icon.png、splash.png')


if __name__ == '__main__':
    main()
