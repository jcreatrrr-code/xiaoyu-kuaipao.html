"""把 src/ 里的各部分按 src/parts.txt 的顺序拼回一个 index.html。

用法：python3 tools/build.py [输出文件]   默认输出到仓库根目录的 index.html
      python3 tools/build.py --check      只检查 index.html 是否和 src/ 一致
"""
import os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def build():
    with open(os.path.join(ROOT, 'src', 'parts.txt'), encoding='utf-8') as f:
        parts = [p.strip() for p in f if p.strip()]
    out = []
    for p in parts:
        with open(os.path.join(ROOT, p), encoding='utf-8', newline='') as f:
            out.append(f.read())
    return ''.join(out)


def main():
    html = build()
    target = os.path.join(ROOT, 'index.html')
    if '--check' in sys.argv:
        with open(target, encoding='utf-8', newline='') as f:
            same = f.read() == html
        print('index.html 与 src/ 一致' if same else 'index.html 与 src/ 不一致，请运行 python3 tools/build.py')
        sys.exit(0 if same else 1)
    if len(sys.argv) > 1:
        target = os.path.abspath(sys.argv[1])
    with open(target, 'w', encoding='utf-8', newline='') as f:
        f.write(html)
    print(f'已生成 {os.path.relpath(target, ROOT)}（{len(html.encode("utf-8"))} 字节）')


if __name__ == '__main__':
    main()
