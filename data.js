// 시연용 데이터. (sample:true 인 책은 제목만 임시로 만든 샘플입니다 — 실제 큐레이션 때 교체)
// 이미지는 assets/ 폴더의 에셋만 사용합니다. 에셋이 없으면 그 자리는 비워 둡니다.
//   책 표지 assets/book-<책id>.png, 방 아이템 assets/item-<분야번호>.png, 방 책장 책등 assets/spine.png

const CATS = [
  { id: 0, name: '모두의 지식', kdc: '총류', color: '#b8c0ff' },
  { id: 1, name: '생각 쌓기',   kdc: '철학', color: '#ffc8dd' },
  { id: 2, name: '세상의 믿음', kdc: '종교', color: '#e2ece9' },
  { id: 3, name: '우리 사회',   kdc: '사회과학', color: '#ffd6a5' },
  { id: 4, name: '자연·과학',   kdc: '자연과학', color: '#caffbf' },
  { id: 5, name: '만들기·기술', kdc: '기술과학', color: '#9bf6ff' },
  { id: 6, name: '예술·놀이',   kdc: '예술', color: '#ffadad' },
  { id: 7, name: '말과 글',     kdc: '언어', color: '#fdffb6' },
  { id: 8, name: '이야기',      kdc: '문학', color: '#ffc6ff' },
  { id: 9, name: '역사·지리',   kdc: '역사', color: '#d0b8a8' },
];

const TASTES = ['모험', '무서운', '웃긴', '동물', '과학', '역사', '마음이야기', '판타지'];

const STYLES = [
  { id: 'dive',    name: '몰입형', desc: '한 번 잡으면 끝까지 읽어요',       phrase: '책 속으로 풍덩!' },
  { id: 'collect', name: '수집형', desc: '다양한 책을 도장깨기 하듯 모아요', phrase: '내 책장은 전시장' },
  { id: 'talk',    name: '수다형', desc: '읽고 나면 누구에게든 말하고 싶어요', phrase: '이 책 진짜 말해줘야 돼' },
];

const THEMES = ['무서운데 멈출 수 없는', '웃다가 울게 되는', '혼자 있고 싶을 때', '친구랑 같이 읽기 좋은', '세상이 궁금할 때'];

// grade: 3 또는 4 (필독 대상), classic: 고전 여부, theme: THEMES 인덱스
const BOOKS = [
  { id: 1,  title: '어린 왕자',            author: '생텍쥐페리',            cat: 8, grade: 4, classic: true,  tags: ['마음이야기', '판타지'], theme: 2, pitch: '어른들은 왜 모자만 보일까?' },
  { id: 2,  title: '마당을 나온 암탉',      author: '황선미',                cat: 8, grade: 4, classic: false, tags: ['동물', '모험', '마음이야기'], theme: 1, pitch: '알을 품고 싶었던 암탉의 탈출기' },
  { id: 3,  title: '샬롯의 거미줄',         author: 'E.B. 화이트',           cat: 8, grade: 3, classic: true,  tags: ['동물', '마음이야기'], theme: 1, pitch: '거미줄에 쓴 글자가 돼지를 살렸다' },
  { id: 4,  title: '홍길동전',             author: '허균',                  cat: 8, grade: 4, classic: true,  tags: ['모험', '역사'], theme: 3, pitch: '아버지를 아버지라 못 부르는 영웅' },
  { id: 5,  title: '피노키오',             author: '카를로 콜로디',         cat: 8, grade: 3, classic: true,  tags: ['판타지', '모험', '웃긴'], theme: 3, pitch: '거짓말하면 코가 길어진다고?' },
  { id: 6,  title: '오즈의 마법사',         author: 'L. 프랭크 바움',        cat: 8, grade: 3, classic: true,  tags: ['판타지', '모험'], theme: 3, pitch: '노란 벽돌길 끝에는 뭐가 있을까' },
  { id: 7,  title: '파브르 곤충기',         author: '장 앙리 파브르',        cat: 4, grade: 3, classic: true,  tags: ['과학', '동물'], theme: 4, pitch: '곤충을 몇십 년 지켜본 덕후의 기록' },
  { id: 8,  title: '시튼 동물기',           author: '어니스트 톰프슨 시튼',   cat: 4, grade: 4, classic: true,  tags: ['동물', '과학', '마음이야기'], theme: 1, pitch: '늑대왕 로보, 끝까지 자유로웠다' },
  { id: 9,  title: '난중일기 이야기',       author: '이순신 (어린이판)',      cat: 9, grade: 4, classic: true,  tags: ['역사'], theme: 2, pitch: '전쟁터에서 쓴 장군의 일기장' },
  { id: 10, title: '삼국유사 이야기',       author: '일연 (어린이판)',        cat: 9, grade: 4, classic: true,  tags: ['역사', '판타지'], theme: 0, pitch: '알에서 태어난 임금님들의 진짜(?) 이야기' },
  { id: 11, title: '논어 이야기',           author: '공자 (어린이판)',        cat: 1, grade: 4, classic: true,  tags: ['마음이야기'], theme: 2, pitch: '2500년 전 선생님의 한마디' },
  { id: 12, title: '이솝 우화',             author: '이솝',                  cat: 8, grade: 3, classic: true,  tags: ['동물', '웃긴'], theme: 3, pitch: '짧은데 오래 남는 동물들의 한 방' },
  { id: 53, title: '흥부와 놀부', author: '전래 (작자 미상)', cat: 8, genre: '옛이야기', grade: 3, classic: true, must: true, tags: ['웃긴', '마음이야기', '역사'], theme: 3, pitch: '제비 다리 하나가 인생을 바꿨다고?', src: '고전' },
  {"id": 13, "title": "구구옥", "author": "백혜영", "cat": 8, "grade": 3, "classic": false, "tags": ["마음이야기", "판타지"], "theme": 2, "pitch": "저승 · 차사 · 이승", "src": "도서관 목록", "pub": "아르볼", "pages": "128"},
  {"id": 14, "title": "그때목욕탕", "author": "정유소영", "cat": 8, "grade": 3, "classic": false, "tags": ["판타지", "웃긴"], "theme": 1, "pitch": "판타지 · 후회 · 시간여행", "src": "도서관 목록", "pub": "위즈덤하우스", "pages": "100"},
  {"id": 15, "title": "곤충 탐정 강충", "author": "송라음", "cat": 8, "grade": 3, "classic": false, "tags": ["모험", "동물"], "theme": 3, "pitch": "길고양이 · 추리 · 탐문", "src": "도서관 목록", "pub": "사계절", "pages": "156"},
  {"id": 16, "title": "날아오르기 전에", "author": "하신하", "cat": 8, "grade": 4, "classic": false, "tags": ["과학", "모험"], "theme": 4, "pitch": "sf · 외계인 · 물로켓", "src": "도서관 목록", "pub": "보림", "pages": "172"},
  {"id": 17, "title": "노렌디 이야기 1 : 스펠호르스트의 꼭두각시 인형들", "author": "케이트 디카밀로", "cat": 8, "grade": 4, "classic": false, "tags": ["판타지"], "theme": 0, "pitch": "인형 · 인형극 · 자매", "src": "도서관 목록", "pub": "비룡소", "pages": "176"},
  {"id": 18, "title": "못된 말 장례식", "author": "김성은", "cat": 7, "grade": 3, "classic": false, "tags": ["웃긴", "마음이야기"], "theme": 1, "pitch": "고운말 · 가족 · 친구", "src": "도서관 목록", "pub": "문학동네", "pages": "112쪽"},
  {"id": 19, "title": "달콤한 곰님의 교실에서는", "author": "정유경", "cat": 7, "grade": 3, "classic": false, "tags": ["마음이야기"], "theme": 3, "pitch": "학교 · 선생님마음 · 일기", "src": "도서관 목록", "pub": "천개의 바람", "pages": "108쪽"},
  {"id": 20, "title": "우리 같이 가위바위보", "author": "김용성", "cat": 7, "grade": 3, "classic": false, "tags": ["마음이야기"], "theme": 3, "pitch": "성장 · 집 · 친구", "src": "도서관 목록", "pub": "상상", "pages": "108쪽"},
  {"id": 21, "title": "파도는 파도 파도", "author": "이정록", "cat": 7, "grade": 4, "classic": false, "tags": ["마음이야기"], "theme": 2, "pitch": "가족 · 성장통 · 자연", "src": "도서관 목록", "pub": "창비", "pages": "108쪽"},
  {"id": 22, "title": "생쥐 동그라미의 여행", "author": "김율희", "cat": 1, "grade": 3, "classic": false, "tags": ["동물", "마음이야기"], "theme": 2, "pitch": "철학동화 · 소나무 · 다람쥐", "src": "도서관 목록", "pub": "고래뱃속", "pages": "64"},
  {"id": 23, "title": "닭인지 아닌지 생각하는 고기오", "author": "임고을", "cat": 1, "grade": 4, "classic": false, "tags": ["동물", "웃긴"], "theme": 1, "pitch": "철학동화 · 정체성 · 공동체", "src": "도서관 목록", "pub": "주니어RHK", "pages": "104"},
  {"id": 24, "title": "거짓말", "author": "다니카와 슌타로", "cat": 1, "grade": 3, "classic": false, "tags": ["마음이야기"], "theme": 2, "pitch": "진실 · 산책 · 생각", "src": "도서관 목록", "pub": "나무말미", "pages": "44"},
  {"id": 25, "title": "어린이를 위한 고전 가치 사전 : 禮", "author": "전연주", "cat": 1, "grade": 4, "classic": false, "tags": ["역사"], "theme": 4, "pitch": "논어 · 예기 · 시경", "src": "도서관 목록", "pub": "봄마중", "pages": "124"},
  {"id": 26, "title": "절기 마법", "author": "천미진", "cat": 2, "grade": 3, "classic": false, "tags": ["판타지", "역사"], "theme": 4, "pitch": "24절기 · 계절 · 자연", "src": "도서관 목록", "pub": "다림", "pages": "44"},
  {"id": 27, "title": "도깨비를 믿나요?", "author": "여연", "cat": 2, "grade": 4, "classic": false, "tags": ["판타지", "무서운"], "theme": 0, "pitch": "제주도 · 비양도 · 신화", "src": "도서관 목록", "pub": "책읽는곰", "pages": "180"},
  {"id": 28, "title": "연두 안에 보라", "author": "김온", "cat": 2, "grade": 3, "classic": false, "tags": ["마음이야기", "판타지"], "theme": 2, "pitch": "오늘이(신화) · 죽음 · 애도", "src": "도서관 목록", "pub": "별숲", "pages": "130"},
  {"id": 29, "title": "각시손님", "author": "엄혜숙", "cat": 2, "grade": 3, "classic": false, "tags": ["역사", "판타지"], "theme": 0, "pitch": "민속 · 마마 · 설화", "src": "도서관 목록", "pub": "봄봄출판사", "pages": "44"},
  {"id": 30, "title": "탐정 벌렁코의 코딱지 수사", "author": "장희주", "cat": 0, "grade": 3, "classic": false, "tags": ["웃긴", "모험"], "theme": 3, "pitch": "추리 · 도서관 · 책", "src": "도서관 목록", "pub": "잇츠북어린이", "pages": "80"},
  {"id": 31, "title": "보이지 않는 이야기", "author": "하이메 감보아 골덴베르", "cat": 0, "grade": 3, "classic": false, "tags": ["마음이야기"], "theme": 2, "pitch": "점자 · 도서관 · 책", "src": "도서관 목록", "pub": "불광출판사", "pages": "40"},
  {"id": 32, "title": "거대한 책", "author": "델핀 페레", "cat": 0, "grade": 4, "classic": false, "tags": ["웃긴"], "theme": 1, "pitch": "일상 · 유머 · 생각", "src": "도서관 목록", "pub": "이온서가", "pages": "184"},
  {"id": 33, "title": "이상한 도서관", "author": "천웨이옌", "cat": 0, "grade": 4, "classic": false, "tags": ["판타지"], "theme": 4, "pitch": "자판기 · 책 · 소(동물)", "src": "도서관 목록", "pub": "섬드레", "pages": "40"},
  {"id": 34, "title": "반가워! 우리들의 약속, 법", "author": "카타리나 소브럴", "cat": 3, "grade": 3, "classic": false, "tags": ["모험"], "theme": 4, "pitch": "규칙 · 헌법 · 민주주의", "src": "도서관 목록", "pub": "봄날의곰", "pages": "48"},
  {"id": 35, "title": "나의 미디어 일기", "author": "전해리", "cat": 3, "grade": 4, "classic": false, "tags": ["과학"], "theme": 4, "pitch": "미디어리터러시 · 가짜뉴스 · 저작권", "src": "도서관 목록", "pub": "판퍼블리싱", "pages": "100"},
  {"id": 36, "title": "나도 차별받지 않을 권리가 있어요!", "author": "이기규", "cat": 3, "grade": 4, "classic": false, "tags": ["마음이야기"], "theme": 4, "pitch": "어린이 인권 · 자유권 · 사회권", "src": "도서관 목록", "pub": "영수책방", "pages": "116"},
  {"id": 37, "title": "오늘부터 매일매일 환경 실천", "author": "정다빈", "cat": 3, "grade": 3, "classic": false, "tags": ["과학"], "theme": 4, "pitch": "쓰레기 · 분리배출 · 제로웨이스트", "src": "도서관 목록", "pub": "주니어RHK", "pages": "80"},
  {"id": 38, "title": "나비의 봄 여름 가을 겨울", "author": "권혁도", "cat": 4, "grade": 3, "classic": false, "tags": ["동물", "과학"], "theme": 4, "pitch": "애벌레 · 번데기 · 한살이", "src": "도서관 목록", "pub": "보리", "pages": "100"},
  {"id": 39, "title": "나무는 어떻게 나무가 될까?", "author": "롭 호지슨", "cat": 4, "grade": 3, "classic": false, "tags": ["과학"], "theme": 4, "pitch": "사과나무 · 씨앗 · 광합성", "src": "도서관 목록", "pub": "북극곰", "pages": "68"},
  {"id": 40, "title": "제비야, 왜 사람이 좋아?", "author": "정다미", "cat": 4, "grade": 4, "classic": false, "tags": ["동물", "과학"], "theme": 4, "pitch": "관찰 · 생태 · 환경", "src": "도서관 목록", "pub": "모알보알", "pages": "112"},
  {"id": 41, "title": "사소한 고래책", "author": "김은정", "cat": 4, "grade": 4, "classic": false, "tags": ["동물", "과학"], "theme": 4, "pitch": "진화 · 포유류 · 화석", "src": "도서관 목록", "pub": "한권의책", "pages": "76"},
  {"id": 42, "title": "에너지가 문제야!", "author": "이지유", "cat": 5, "grade": 4, "classic": false, "tags": ["과학"], "theme": 4, "pitch": "기후변화 · 석탄 · 석유", "src": "도서관 목록", "pub": "위즈덤하우스", "pages": "72"},
  {"id": 43, "title": "지구를 구하는 환경 발명 수업", "author": "도미닉 윌콕스 외", "cat": 5, "grade": 4, "classic": false, "tags": ["과학", "모험"], "theme": 4, "pitch": "리틀인벤터스 · 생체모방 · 발명품", "src": "도서관 목록", "pub": "명랑한책방", "pages": "152"},
  {"id": 44, "title": "볼빵빵 배통통 요리 수첩", "author": "박은진", "cat": 5, "grade": 3, "classic": false, "tags": ["웃긴"], "theme": 3, "pitch": "레시피 · 만화 · 채소요리", "src": "도서관 목록", "pub": "보리", "pages": "152"},
  {"id": 45, "title": "차곡차곡 댐", "author": "후지와라 데츠지", "cat": 5, "grade": 3, "classic": false, "tags": ["과학"], "theme": 4, "pitch": "그림책 · 토목 · 건설", "src": "도서관 목록", "pub": "너머학교", "pages": "32"},
  {"id": 46, "title": "쿠사마 야요이, 왜 호박을 자꾸 만드는 거야?", "author": "파우스트 질베르티", "cat": 6, "grade": 3, "classic": false, "tags": ["판타지"], "theme": 4, "pitch": "반복 · 패턴 · 호박", "src": "도서관 목록", "pub": "보물창고", "pages": "40"},
  {"id": 47, "title": "마르셀 뒤샹, 변기를 전시회에 출품했다고?", "author": "파우스토 질베르티", "cat": 6, "grade": 4, "classic": false, "tags": ["웃긴"], "theme": 4, "pitch": "소변기 · 레디메이드 · 샘", "src": "도서관 목록", "pub": "보물창고", "pages": "48"},
  {"id": 48, "title": "우리가 음악이 되는 시간", "author": "이상인", "cat": 6, "grade": 4, "classic": false, "tags": ["마음이야기"], "theme": 2, "pitch": "클래식 · 악기 · 오케스트라", "src": "도서관 목록", "pub": "머핀북", "pages": "164"},
  {"id": 49, "title": "빵빵! 행복 빵집", "author": "한나빵", "cat": 6, "grade": 3, "classic": false, "tags": ["웃긴", "판타지"], "theme": 3, "pitch": "빵집 · 요정 · 사랑", "src": "도서관 목록", "pub": "보리", "pages": "180"},
  {"id": 50, "title": "세상이 궁금하다면 지리책", "author": "공우석", "cat": 9, "grade": 3, "classic": false, "tags": ["모험", "역사"], "theme": 4, "pitch": "지도 · 기후 · 도시", "src": "도서관 목록", "pub": "머핀북", "pages": "108"},
  {"id": 51, "title": "그런 멋진 일을 하셨소?", "author": "김영숙", "cat": 9, "grade": 4, "classic": false, "tags": ["역사"], "theme": 4, "pitch": "외지부 · 역관 · 똥장수", "src": "도서관 목록", "pub": "위즈덤하웅스", "pages": "216"},
  {"id": 52, "title": "디스 이즈 로마", "author": "미로슬라프 사세크", "cat": 9, "grade": 4, "classic": false, "tags": ["역사", "모험"], "theme": 4, "pitch": "콜로세움 · 판테온 · 트레비분스", "src": "도서관 목록", "pub": "픽처레스크", "pages": "62"},
];

// 표지 이미지가 실제로 있는 책 id (assets/book-<id>.png)
const COVERS = [1];
// 고전의 세계(게임)가 실제로 연결된 책 id. 이 책을 읽고 인증받으면 편지가 도착한다. (지금은 흥부와 놀부만)
const GAME_BOOK_IDS = [53];
// 게임 주소가 정해지면 넣기 (예: 'https://.../game.html'). 비워 두면 '준비 중' 안내가 뜬다.
const GAME_URL = '';

// 우리 반 친구들 (시연용 가짜 데이터) — reads: 승인된 책, pending: 선생님 도장 대기 중
const CLASSMATES = [
  { name: '하늘', reads: [3, 7, 9, 34] },
  { name: '도윤', reads: [4, 5, 10, 35] },
  { name: '서아', reads: [1, 12, 11, 38] },
  { name: '지호', reads: [6, 8, 43] },
  { name: '민준', reads: [5, 45] },
  { name: '유나', reads: [2, 30] },
  { name: '예준', reads: [3, 9] },
];
const MISSION_TARGET = 2; // 분야별로 우리 반이 서로 다른 책을 이만큼 읽으면 칸 완성

// 아지트 아이템: 분야 책을 처음 승인받으면 해금 (x,y는 방 그림(scene-room) 기준 %좌표)
const ITEMS = [
  { cat: 0, name: '탐험 지도 포스터', x: 72, y: 55 },
  { cat: 1, name: '생각 화분',        x: 92, y: 62 },
  { cat: 2, name: '조용한 캔들',      x: 28, y: 57 },
  { cat: 3, name: '미니 도시 모형',   x: 66, y: 92 },
  { cat: 4, name: '별 보는 망원경',   x: 8,  y: 57 },
  { cat: 5, name: '친구 로봇',        x: 48, y: 91 },
  { cat: 6, name: '내 그림 액자',     x: 85, y: 54 },
  { cat: 7, name: '글자 램프',        x: 18, y: 57 },
  { cat: 8, name: '곰 인형',          x: 86, y: 91 },
  { cat: 9, name: '옛날 토기',        x: 30, y: 93 },
];


// ===== 입장 전 '독서 유형 테스트' =====
const TEST = [
  { q: '비 오는 토요일 오후, 제일 하고 싶은 건?', opts: [
    { t: '이불 속에서 책 한 권을 끝까지 읽기', style: 'dive', taste: '마음이야기' },
    { t: '도서관에서 새 책을 잔뜩 골라 오기', style: 'collect', taste: '모험' },
    { t: '친구에게 요즘 본 이야기를 신나게 떠들기', style: 'talk', taste: '웃긴' } ] },
  { q: '다 읽은 책은 어떻게 해?', opts: [
    { t: '마음에 들면 처음부터 또 읽는다', style: 'dive', taste: '판타지' },
    { t: '책장에 꽂고 다음 책을 찾으러 간다', style: 'collect', taste: '역사' },
    { t: '그 책을 읽은 친구를 찾아 수다를 떤다', style: 'talk', taste: '마음이야기' } ] },
  { q: '친구가 “뭐 읽어?” 하고 물어보면?', opts: [
    { t: '“지금 좋은 데야, 조금만 기다려 줘!”', style: 'dive', taste: '무서운' },
    { t: '“이번 달에 벌써 다섯 권째야.”', style: 'collect', taste: '모험' },
    { t: '“들어 봐, 이야기가 말이야…” 줄거리 방송 시작', style: 'talk', taste: '웃긴' } ] },
];
const STYLE_ADJ = { dive: '푹 빠진', collect: '도장깨기', talk: '수다 폭발' };
const TASTE_NOUN = { 모험: '모험가', 무서운: '오싹 탐험가', 웃긴: '빵터짐 요원', 동물: '동물 친구', 과학: '호기심 박사', 역사: '시간 여행자', 마음이야기: '마음 수집가', 판타지: '상상 대장' };

// 분야를 읽으면 얻는 추가 타이틀 (승인된 책 기준)
const CAT_TITLES = { 0: '지식 탐험대', 1: '생각 부자', 2: '세계 시민', 3: '동네 박사', 4: '과학 덕후', 5: '발명왕', 6: '예술 감성러', 7: '낱말 탐정', 8: '이야기 수집가', 9: '역사 탐정' };


// ===== 문장 스티커 재료 =====
// need: 우리 반 공동 미션에서 완성한 칸 수. 미션이 풀리면 새 재료가 열린다.
const FONTS = [
  { id: 'basic', name: '또박또박', css: "'Malgun Gothic','Apple SD Gothic Neo',sans-serif", need: 0 },
  { id: 'pen',   name: '손글씨',   css: "'Gaegu','Nanum Pen Script','Malgun Gothic',cursive", need: 0 },
  { id: 'serif', name: '명조',     css: "'Batang','Noto Serif KR',serif", need: 5 },
];
const PAPERS = [
  { id: 'cream', name: '크림',     bg: '#fff6df', fg: '#3b2a1a', need: 0 },
  { id: 'mint',  name: '민트',     bg: '#dcefe0', fg: '#22402b', need: 0 },
  { id: 'rose',  name: '장미',     bg: '#f8dcd8', fg: '#4a2421', need: 0 },
  { id: 'night', name: '밤하늘',   bg: '#2f3557', fg: '#fdf3d6', need: 5 },
  { id: 'kraft', name: '크라프트', bg: '#d8b98c', fg: '#3b2a1a', need: 6 },
];
const TAPES = [
  { id: 'none',   name: '없음',        css: '', need: 0 },
  { id: 'yellow', name: '노랑 테이프', css: 'rgba(240,200,110,.8)', need: 0 },
  { id: 'check',  name: '체크 테이프', css: 'repeating-linear-gradient(45deg,rgba(200,110,100,.65) 0 6px,rgba(255,250,240,.7) 6px 12px)', need: 5 },
  { id: 'stripe', name: '줄무늬 테이프', css: 'repeating-linear-gradient(90deg,rgba(110,140,200,.6) 0 5px,rgba(255,250,240,.7) 5px 10px)', need: 7 },
];
// 결말 스티커(한정판) 전용 종이
const ENDING_PAPER = { bg: '#fff1c2', fg: '#4a3210' };

// 친구 방에 이미 붙어 있는 스티커 (시연용)
const FRIEND_STICKERS = {
  '하늘': [ { text: '진짜 중요한 건 눈에 보이지 않아.', bookId: 1, paper: 'night', font: 'pen', tape: 'yellow', x: 64, y: 22, rot: -3 },
           { text: '거미줄에 쓴 한 단어가 친구를 살렸다.', bookId: 3, paper: 'cream', font: 'basic', tape: 'none', x: 8, y: 60, rot: 2 } ],
  '도윤': [ { text: '아버지를 아버지라 부르고 싶었던 마음.', bookId: 4, paper: 'kraft', font: 'serif', tape: 'none', x: 66, y: 48, rot: 2 } ],
  '서아': [ { text: '천천히 가도 끝까지 가면 이긴다.', bookId: 12, paper: 'mint', font: 'pen', tape: 'yellow', x: 40, y: 8, rot: -2 } ],
  '지호': [ { text: '노란 벽돌길은 혼자 걷지 않아서 좋았다.', bookId: 6, paper: 'rose', font: 'pen', tape: 'none', x: 66, y: 24, rot: 3 } ],
  '민준': [], '유나': [], '예준': [],
};

// 고전의 세계 데모 1장면 (팀원 게임이 연결되면 GAME_URL 로 대체)
const GAME_DEMO = {
  53: {
    scene: '다리를 다친 제비 한 마리가 흥부네 마당에 떨어졌어요. 집에는 먹을 것도 없는데, 흥부는 어떻게 할까요?',
    choices: [
      { t: '제비 다리를 정성껏 고쳐 준다', end: '정성껏 돌본 제비가 봄에 박씨를 물고 돌아왔다.', same: true },
      { t: '놀부에게 데려가 같이 고쳐 보자고 한다', end: '형제가 함께 제비를 돌보며 다시 가까워졌다.', same: false },
      { t: '마을 사람들에게 도움을 청한다', end: '온 마을이 힘을 모아 제비를 살려 냈다.', same: false },
    ],
    original: '원작에서 흥부는 제비 다리를 고쳐 주고, 제비가 물어 온 박씨 덕분에 큰 복을 받아요.',
  },
};
