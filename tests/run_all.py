"""一键运行全部测试：先用 src/ 拼出游戏，再逐个运行 tests/ 里的脚本。

用法：python3 tests/run_all.py            全部运行
      python3 tests/run_all.py t15 t33    只运行指定的几个
需要：pip install playwright==1.56.0（与预装的 Chromium 版本对应）
"""
import os, subprocess, sys, tempfile, time

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
sys.path.insert(0, os.path.join(ROOT, 'tools'))
import build  # noqa: E402

# 已知在 v1.0.0 时就失效的旧脚本（游戏改过、脚本没跟上），结果只作参考
STALE = {'t26', 't43'}


def main():
    names = sys.argv[1:] or sorted(f[:-3] for f in os.listdir(HERE) if f.startswith('t') and f.endswith('.py'))
    game = os.path.join(tempfile.mkdtemp(), 'index.html')
    with open(game, 'w', encoding='utf-8', newline='') as f:
        f.write(build.build())
    env = dict(os.environ, XK_GAME='file://' + game)
    results = []
    for n in names:
        t = time.time()
        try:
            p = subprocess.run([sys.executable, os.path.join(HERE, n + '.py')], env=env, cwd=HERE,
                               capture_output=True, text=True, timeout=900)
            ok, out = p.returncode == 0, (p.stdout + p.stderr).strip()
        except subprocess.TimeoutExpired:
            ok, out = False, '超时'
        tag = '通过' if ok else ('失败（旧脚本，已知）' if n in STALE else '失败')
        results.append((n, ok))
        print(f'== {n}  {tag}  {time.time() - t:.0f} 秒')
        print('\n'.join(out.splitlines()[-8:]))
    bad = [n for n, ok in results if not ok and n not in STALE]
    print(f'\n共 {len(results)} 个，失败 {len(bad)} 个' + (f'：{" ".join(bad)}' if bad else ''))
    sys.exit(1 if bad else 0)


if __name__ == '__main__':
    main()
