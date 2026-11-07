# 사용법: python build.py
#  1) assets/manifest.js  : 지금 있는 에셋 목록 (index.html 로 열 때, 없는 에셋 자리는 비워 두기 위함)
#  2) chaekkku.html, 책꾸.html : CSS/JS/이미지를 한 파일에 넣은 시연용 파일 (더블클릭, USB, 메일 전달 가능)
import base64, json, mimetypes, os, re

os.chdir(os.path.dirname(os.path.abspath(__file__)))
SKIP = ('-ref.webp', 'shelf-mail.webp', 'manifest.js')  # 참고용 그림 · 목록 파일은 제외
files = [f for f in sorted(os.listdir('assets')) if not f.endswith(SKIP)]
open('assets/manifest.js', 'w', encoding='utf-8').write('window.ASSET_LIST = ' + json.dumps(files, ensure_ascii=False) + ';\n')

html = open('index.html', encoding='utf-8').read()
html = re.sub(r'<link rel="stylesheet" href="(style[^"]*\.css)">', lambda m: '<style>' + open(m.group(1), encoding='utf-8').read() + '</style>', html)
assets = {}
for f in files:
    mime = mimetypes.guess_type(f)[0] or ('image/webp' if f.endswith('.webp') else 'application/octet-stream')
    assets[f] = 'data:%s;base64,%s' % (mime, base64.b64encode(open('assets/' + f, 'rb').read()).decode())
html = html.replace('<script src="assets/manifest.js"></script>', '<script>window.ASSETS=' + json.dumps(assets) + ';</script>')
html = html.replace('<script src="data.js"></script>', '<script>' + open('data.js', encoding='utf-8').read() + '</script>')
html = html.replace('<script src="app.js"></script>', '<script>' + open('app.js', encoding='utf-8').read() + '</script>')
for n in ('chaekkku.html', '책꾸.html'):
    open(n, 'w', encoding='utf-8').write(html)
print('built', round(len(html) / 1024), 'KB,', len(files), 'assets:', ', '.join(files))
