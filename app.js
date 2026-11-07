// 책꾸 — 시연용 최소 화면
// 문(첫 화면) - 문이 열리며 안으로 들어감 - 방 전경 - 책장을 누르면 책 - 책을 누르면 메시지
// 그 밖의 기능(방 꾸미기 등)은 버튼만 두었다.
const $ = (s) => document.querySelector(s);
// 단일 파일 빌드(window.ASSETS)면 그 안의 이미지를, 아니면 assets/ 폴더를 쓴다.
const A = (n) => (window.ASSETS && window.ASSETS[n]) || 'assets/' + n;

let view = 'door';     // 'door' | 'room' | 'shelf'
let message = false;   // 책을 눌렀을 때 메시지
let zoomIn = false;    // 책장에 처음 들어올 때만 확대 애니메이션

function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 2400);
}

// 기능 버튼 (지금은 자리만)
const FEATURES = ['방 꾸미기', '문장 스티커', '우리 반 미션', '고전의 세계'];

function doorHtml() {
  return `<div class="doorpage">
    <div class="frame door" id="door">
      <div class="layer">
        <img class="i1" src="${A('scene-door.webp')}" alt="책꾸 아지트의 문">
        <img class="i2" src="${A('scene-open.webp')}" alt="">
      </div>
      <img class="i3" src="${A('scene-room.webp')}" alt="">
      <button class="hot doorhot" data-act="open" aria-label="문을 열고 들어가기"></button>
    </div>
    <p class="hint">문을 눌러 들어가 보세요</p>
  </div>`;
}

function roomHtml() {
  return `<div class="roompage">
    <div class="frame room">
      <img class="bg" src="${A('scene-room.webp')}" alt="책꾸 아지트 방">
      <button class="hot shelfhot" data-act="shelf" aria-label="책장 보기"></button>
    </div>
    <aside class="side">
      <p class="hint">책장을 눌러 보세요</p>
      <div class="menu">${FEATURES.map((f) => `<button class="btn" data-act="soon">${f}</button>`).join('')}</div>
      <button class="btn ghost" data-act="home">처음 화면으로</button>
    </aside>
  </div>`;
}

function shelfHtml() {
  return `<div class="roompage">
    <div class="frame shelf ${zoomIn ? 'zoomin' : ''}">
      <img class="bg" src="${A('shelf-sample.webp')}" alt="책장에 꽂힌 어린 왕자">
      <button class="hot bookhot" data-act="book" aria-label="어린 왕자"></button>
      ${message ? `<div class="msg">
        <b>책을 모두 읽었어요!</b>
        <p>나만의 표지로 특별하게 꾸며 볼까요?</p>
        <div class="row"><button class="btn" data-act="soon">표지 꾸미기</button><button class="btn ghost" data-act="close">닫기</button></div>
      </div>` : ''}
    </div>
    <aside class="side">
      ${message ? '' : '<p class="hint">책을 눌러 보세요</p>'}
      <button class="btn ghost" data-act="room">방으로 돌아가기</button>
    </aside>
  </div>`;
}

function render() {
  $('#top').innerHTML = '<div class="logo">책꾸</div><div class="sub">읽은 문장으로 꾸미는 나만의 책방</div>';
  const bg = view === 'door' ? 'scene-door.webp' : view === 'room' ? 'scene-room.webp' : 'shelf-sample.webp';
  $('#app').innerHTML = `<div class="bgblur" style="background-image:url('${A(bg)}')"></div>` +
    (view === 'door' ? doorHtml() : view === 'room' ? roomHtml() : shelfHtml());
  zoomIn = false;
}

document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  switch (el.dataset.act) {
    case 'open': { // 닫힌 문 - 열린 문 - 문 안쪽으로 확대 - 방
      const d = $('#door'); if (d.classList.contains('s1')) return;
      d.classList.add('s1');
      setTimeout(() => d.classList.add('s2'), 1000);
      setTimeout(() => { view = 'room'; render(); }, 2900);
      return;
    }
    case 'shelf': view = 'shelf'; message = false; zoomIn = true; break;
    case 'book': message = true; break;
    case 'close': message = false; break;
    case 'room': view = 'room'; message = false; break;
    case 'home': view = 'door'; message = false; break;
    case 'soon': toast('준비 중인 기능이에요'); return;
    default: return;
  }
  render();
});

render();
