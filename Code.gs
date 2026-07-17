/**********************************************************************
 * 제주 게임 클리어 기록 → 구글 스프레드시트 저장
 *
 * defen.html(돌하르방 좀비 디펜스) · donk.html(동킹땅콩) · blade.html(제주의 전설)
 * 세 게임이 클리어 시 { name, phone, game } 을 JSON으로 POST 합니다.
 * 이 스크립트가 받아서 시트에 '시간 · 이름 · 전화번호 · 게임이름' 으로 한 줄씩 기록합니다.
 *
 * ── 설치 방법 ──────────────────────────────────────────────────────
 * 1) 구글 스프레드시트를 새로 만든다.
 * 2) 상단 메뉴 [확장 프로그램] → [Apps Script] 클릭.
 * 3) 기본 Code.gs 내용을 지우고 이 파일 전체를 붙여넣고 저장(💾).
 * 4) 우측 상단 [배포] → [새 배포] 클릭.
 *      - 유형(톱니바퀴): '웹 앱' 선택
 *      - 실행 계정: 나
 *      - 액세스 권한: '모든 사용자'  (반드시 이걸로! 로그인 없이 기록되게)
 *    [배포] 를 누르고 권한 승인을 마친다.
 * 5) 표시되는 '웹 앱 URL'(끝이 /exec) 을 복사한다.
 * 6) defen.html · donk.html · blade.html 각각의 맨 위
 *      const SHEET_URL = '';
 *    빈 따옴표 안에 그 URL을 붙여넣는다.
 *      예) const SHEET_URL = 'https://script.google.com/macros/s/AKfy...../exec';
 *
 * ※ 코드를 수정한 뒤에는 [배포] → [배포 관리] → 기존 배포 편집 →
 *   버전을 '새 버전'으로 바꿔 다시 배포해야 반영됩니다.
 *********************************************************************/

// 기록을 저장할 시트 이름
var SHEET_NAME = '기록';
var HEADERS = ['시간', '이름', '전화번호', '게임이름'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000); // 동시 요청 시 줄서기
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var name  = (data.name  || '').toString().substring(0, 50);
    var phone = (data.phone || '').toString().substring(0, 30);
    // game 우선, 없으면 예전 event 필드도 허용
    var game  = (data.game || data.event || '').toString().substring(0, 50);

    var sheet = getSheet_();
    sheet.appendRow([new Date(), name, phone, game]);

    return json_({ result: 'ok', name: name, phone: phone, game: game });
  } catch (err) {
    return json_({ result: 'error', message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// 브라우저로 URL을 직접 열었을 때(GET) 동작 확인용
function doGet() {
  return json_({ result: 'ok', message: '제주 게임 기록 서버가 동작 중입니다.' });
}

// 시트를 가져오고, 없으면 만들고 헤더를 넣는다
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
