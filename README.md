# 小鱼快跑

浏览器直接打开就能玩的单文件小游戏。发布在 GitHub Pages 上的是仓库根目录的 `index.html`。

## 目录

| 位置 | 内容 |
| --- | --- |
| `index.html` | 发布用的完整游戏，由 `src/` 拼出来，不要直接改 |
| `src/head.html`、`src/style.css`、`src/body.html`、`src/tail.html` | 页面开头、全部样式、各界面的骨架、页面结尾 |
| `src/js/` | 游戏脚本，按原来文件里的段落拆开：存档、关卡、Boss 战、绘制、小馆、过场、奇珍书、多语言、配乐等 |
| `src/parts.txt` | 拼接顺序 |
| `tools/build.py` | 拼接脚本 |
| `tests/` | 测试脚本和一键运行入口 |
| `privacy.html` | 隐私政策页（App Store 要求），发布后地址是 GitHub Pages 上的 `privacy.html` |
| `app/` | iPhone App 工程，说明见 `app/README.md` |
| `tools/build_app.py`、`tools/make_app_art.py` | 生成 App 里用的游戏、App 图标和启动画面 |

## 改动流程

1. 改 `src/` 里对应的文件。
2. 运行 `python3 tools/build.py` 重新生成 `index.html`。
3. 运行 `python3 tests/run_all.py` 跑全部测试（需要 `pip install playwright==1.56.0`）。
4. `python3 tools/build.py --check` 可以确认 `index.html` 和 `src/` 是否一致。

所有脚本文件拼在同一个 `<script>` 里，共用一个作用域，所以拆开的文件之间可以直接互相引用，顺序以 `src/parts.txt` 为准。
