# 小鱼快跑 iPhone App

用 Capacitor 把网页版游戏装进 iPhone App。Xcode 工程在 `ios/App/App.xcodeproj`。

| 位置 | 内容 |
| --- | --- |
| `capacitor.config.json` | App 的名字、Bundle ID（`com.jcreatrrr.xiaoyukuaipao`）、背景色 |
| `ios/` | Xcode 工程；`ios/App/App/public/` 是 App 里实际运行的游戏 |
| `fonts/` | 打包进 App 的字体（都是 SIL Open Font License），App 不联网也能显示 |
| `resources/` | App 图标（1024×1024）和启动画面（2732×2732）的原图 |
| `node_modules/@capacitor/` | 只保留了 App 用到的三个插件（存档备份、存照片、系统分享），Mac 上不装 Node 也能直接打开工程 |

## 每次游戏更新后

1. `python3 tools/build.py` 生成网页版。
2. `python3 tools/build_app.py` 把游戏放进 App 工程（换成本地字体、加上存档备份）。
3. 在 Xcode 里把版本号改成和游戏一样，Build 号加 1，再归档上传。

图标或启动画面要重画时运行 `python3 tools/make_app_art.py`。
