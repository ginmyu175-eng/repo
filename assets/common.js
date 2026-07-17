/* ===== 공통 유틸 ===== */

// 토스트 알림
function toast(msg, ms = 2000) {
  let el = document.querySelector('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), ms);
}

// SNS 공유 버튼 묶음 생성
function shareButtons(title, text) {
  const url = location.href;
  const enc = encodeURIComponent;
  const full = `${text}`;
  return `
    <div class="share-row">
      <button class="share-x" onclick="window.open('https://twitter.com/intent/tweet?text=${enc(full)}&url=${enc(url)}','_blank')">𝕏 트위터</button>
      <button class="share-face" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${enc(url)}','_blank')">f 페이스북</button>
      <button class="share-kakao" onclick="alert('카카오톡 공유는 앱 키 연동이 필요합니다.\\n링크가 복사되었어요!'); copyLink();">💬 카카오톡</button>
      <button class="share-link" onclick="copyLink()">🔗 링크복사</button>
    </div>`;
}

function copyLink() {
  const url = location.href;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(url).then(() => toast('링크가 복사되었어요! 🍊'));
  } else {
    const t = document.createElement('textarea');
    t.value = url; document.body.appendChild(t); t.select();
    document.execCommand('copy'); t.remove();
    toast('링크가 복사되었어요! 🍊');
  }
}

// 캔버스/이미지 다운로드
function downloadDataURL(dataURL, filename) {
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  toast('이미지를 저장했어요! 📸');
}
