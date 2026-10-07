"""生成 iPhone App 里用的网页（app/www/），并放进 Xcode 工程。

用法：python3 tools/build_app.py

和网页版的区别：
- 字体改用 app/fonts/ 里打包好的文件，不联网也能正常显示；
- 禁止双指缩放；
- 进游戏前先把存档的备份从手机里读回来（万一网页存档被系统清掉），之后每次存档都同时备份一份；
- 标记 XY_APP，游戏里据此关掉开发者模式、拍照改用系统分享面板。
"""
import os, shutil, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, 'tools'))
import build  # noqa: E402

APP = os.path.join(ROOT, 'app')
WWW = os.path.join(APP, 'www')
PUBLIC = os.path.join(APP, 'ios', 'App', 'App', 'public')
SAVE_KEY = 'xiaoyu_kuaipao_v1'

FONTS_CSS = '''@font-face{font-family:"ZCOOL KuaiLe";src:url(ZCOOLKuaiLe.woff2) format("woff2");font-display:swap}
@font-face{font-family:"Yusei Magic";src:url(YuseiMagic.woff2) format("woff2");font-display:swap}
@font-face{font-family:"Comfortaa";src:url(Comfortaa.woff2) format("woff2");font-weight:300 700;font-display:swap}
@font-face{font-family:"Baloo Bhaijaan 2";src:url(BalooBhaijaan2.woff2) format("woff2");font-weight:400 800;font-display:swap}
@font-face{font-family:"Jua";src:url(Jua.woff2) format("woff2");font-display:swap}
@font-face{font-family:"Itim";src:url(Itim.woff2) format("woff2");font-display:swap}
'''

# 游戏脚本先不执行，等存档备份读回来以后再运行
BOOT = '''<script>
window.XY_APP=1;
(function(){
  var K=%r,P=window.Capacitor&&Capacitor.Plugins&&Capacitor.Plugins.Preferences,t=0,last=null;
  var raw=Storage.prototype.setItem;
  Storage.prototype.setItem=function(k,v){raw.call(this,k,v);
    if(P&&this===window.localStorage&&k===K){last=String(v);clearTimeout(t);t=setTimeout(function(){P.set({key:K,value:last})},300)}};
  function backupNow(){if(P&&last!==null){clearTimeout(t);P.set({key:K,value:last})}}
  document.addEventListener('visibilitychange',function(){if(document.hidden)backupNow()});
  function run(){var src=document.getElementById('xyGame');if(!src||run.done)return;run.done=1;
    var s=document.createElement('script');s.textContent=src.textContent;document.body.appendChild(s)}
  var has=null;try{has=localStorage.getItem(K)}catch(e){}
  if(!P){run();return}
  setTimeout(run,1500);
  P.get({key:K}).then(function(r){
    try{if(!has&&r&&r.value&&!run.done)localStorage.setItem(K,r.value);else if(has&&!(r&&r.value))P.set({key:K,value:has})}catch(e){}
    run()},run);
})();
</script>
''' % SAVE_KEY


def main():
    html = build.build()
    link_start = html.index('<link href="https://fonts.googleapis.com/')
    link_end = html.index('>', link_start) + 1
    html = html[:link_start] + '<link rel="stylesheet" href="fonts/fonts.css">' + html[link_end:]
    html = html.replace('content="width=device-width, initial-scale=1, viewport-fit=cover"',
                        'content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"', 1)
    # 游戏的大脚本在 body 末尾，是最后一个 <script>
    i = html.rindex('<script>')
    j = html.index('</script>', i) + len('</script>')
    html = html[:i] + '<script type="text/x-xiaoyu" id="xyGame">' + html[i + len('<script>'):j] + '\n' + BOOT + html[j:]
    for d in (WWW, PUBLIC):
        if not os.path.isdir(os.path.dirname(d)):
            continue
        if os.path.isdir(d):
            shutil.rmtree(d)
        os.makedirs(os.path.join(d, 'fonts'))
        with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8', newline='') as f:
            f.write(html)
        for fn in os.listdir(os.path.join(APP, 'fonts')):
            shutil.copy(os.path.join(APP, 'fonts', fn), os.path.join(d, 'fonts', fn))
        with open(os.path.join(d, 'fonts', 'fonts.css'), 'w', encoding='utf-8') as f:
            f.write(FONTS_CSS)
        print('已生成', os.path.relpath(d, ROOT))


if __name__ == '__main__':
    main()
