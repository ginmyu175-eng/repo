// ===== Tangerine Photo Booth · 감귤 포토부스 =====
const video = document.getElementById("video");
const enterBtn = document.getElementById("enterBtn");
const startCamBtn = document.getElementById("startCamBtn");
const shootBtn = document.getElementById("shootBtn");
const mirrorToggle = document.getElementById("mirrorToggle");
const countdownEl = document.getElementById("countdown");
const flashEl = document.getElementById("flash");
const camStatus = document.getElementById("camStatus");
const thumbs = [...document.querySelectorAll(".thumb")];
const tangerineSticker = document.getElementById("tangerineSticker");

const landing = document.getElementById("landing");
const captureStage = document.getElementById("capture-stage");
const resultStage = document.getElementById("result-stage");
const resultCanvas = document.getElementById("resultCanvas");
const downloadBtn = document.getElementById("downloadBtn");
const retakeBtn = document.getElementById("retakeBtn");

const SHOTS = 4;
const shots = []; // 캡처된 이미지(dataURL) 저장
let stream = null;
let busy = false;
let currentSticker = "smile"; // 현재 선택된 스티커

// 스티커 옵션
const stickerEmojis = {
  smile: "😊",
  heart: "💚",
  star: "✨"
};

// ---- 스티커 선택 이벤트 ----
document.querySelectorAll('input[name="sticker"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    currentSticker = e.target.value;
    tangerineSticker.textContent = stickerEmojis[currentSticker];
  });
});

// ---- 랜딩 → 촬영 화면 ----
enterBtn.addEventListener("click", () => {
  landing.classList.add("hidden");
  captureStage.classList.remove("hidden");
  captureStage.scrollIntoView({ behavior: "smooth", block: "start" });
});

// ---- 카메라 시작 ----
startCamBtn.addEventListener("click", async () => {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 960 } },
      audio: false,
    });
    video.srcObject = stream;
    await video.play();
    video.classList.add("ready");
    camStatus.style.display = "none";
    shootBtn.disabled = false;
    startCamBtn.textContent = "✅ 카메라 켜짐";
    startCamBtn.disabled = true;
  } catch (err) {
    camStatus.innerHTML = '<span class="cam-emoji">😢</span>카메라를 사용할 수 없어요 (권한을 허용해 주세요)';
    console.error(err);
  }
});

// ---- 거울 모드 ----
function applyMirror() {
  video.classList.toggle("mirror", mirrorToggle.checked);
}
mirrorToggle.addEventListener("change", applyMirror);
applyMirror();

// ---- 네컷 촬영 시작 ----
shootBtn.addEventListener("click", async () => {
  if (busy || !stream) return;
  busy = true;
  shootBtn.disabled = true;
  shots.length = 0;
  thumbs.forEach((t) => {
    t.classList.remove("filled", "active");
    t.innerHTML = `<span>${+t.dataset.index + 1}</span>`;
  });

  for (let i = 0; i < SHOTS; i++) {
    thumbs[i].classList.add("active");
    await countdown(3);
    captureShot(i);
    thumbs[i].classList.remove("active");
    if (i < SHOTS - 1) await wait(700);
  }

  await wait(400);
  buildResult();
  busy = false;
});

// ---- 카운트다운 ----
function countdown(n) {
  return new Promise((resolve) => {
    let cur = n;
    const step = () => {
      countdownEl.textContent = cur;
      countdownEl.classList.remove("tick");
      void countdownEl.offsetWidth; // reflow로 애니메이션 재시작
      countdownEl.classList.add("tick");
      cur--;
      if (cur >= 0) {
        setTimeout(step, 1000);
      } else {
        setTimeout(resolve, 100);
      }
    };
    step();
  });
}

// ---- 한 컷 캡처 ----
function captureShot(index) {
  const vw = video.videoWidth;
  const vh = video.videoHeight;
  // 4:3 비율로 중앙 크롭
  const targetRatio = 4 / 3;
  let sw = vw, sh = vw / targetRatio;
  if (sh > vh) { sh = vh; sw = vh * targetRatio; }
  const sx = (vw - sw) / 2;
  const sy = (vh - sh) / 2;

  const c = document.createElement("canvas");
  c.width = 800; c.height = 600;
  const ctx = c.getContext("2d");

  if (mirrorToggle.checked) {
    ctx.translate(c.width, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(video, sx, sy, sw, sh, 0, 0, c.width, c.height);

  const url = c.toDataURL("image/jpeg", 0.92);
  shots[index] = url;

  // 플래시 + 썸네일
  flashEl.classList.remove("fire");
  void flashEl.offsetWidth;
  flashEl.classList.add("fire");

  const img = new Image();
  img.src = url;
  thumbs[index].innerHTML = "";
  thumbs[index].appendChild(img);
  thumbs[index].classList.add("filled");
}

// ---- 감귤 프레임 합성 ----
function buildResult() {
  const ctx = resultCanvas.getContext("2d");
  const W = resultCanvas.width;   // 600
  const H = resultCanvas.height;  // 1900

  // 크림 배경
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#fff7ee");
  bg.addColorStop(1, "#fdeede");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // 감귤 무늬 배경
  ctx.save();
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 40; i++) {
    drawTangerine(ctx, Math.random() * W, Math.random() * H, 14 + Math.random() * 18, "#f5820a");
  }
  ctx.restore();

  // 상단 프레임 장식
  ctx.save();
  ctx.fillStyle = "rgba(245, 130, 10, 0.15)";
  roundRect(ctx, 20, 20, W - 40, 90, 12);
  ctx.fill();
  ctx.restore();

  // 헤더
  ctx.textAlign = "center";
  ctx.fillStyle = "#e5720a";
  ctx.font = "800 46px 'Poppins','Noto Sans KR',sans-serif";
  ctx.fillText("🍊 감귤 포토부스 🍊", W / 2, 75);
  ctx.fillStyle = "#a98a6a";
  ctx.font = "500 20px 'Poppins','Noto Sans KR',sans-serif";
  ctx.fillText("Squeeze the moment!", W / 2, 110);

  // 사진 4장 배치
  const marginX = 40;
  const photoW = W - marginX * 2;       // 520
  const photoH = photoW * 3 / 4;        // 390
  const gap = 28;
  const startY = 150;

  let loaded = 0;
  const imgs = [];
  shots.forEach((url, i) => {
    const img = new Image();
    img.onload = () => {
      loaded++;
      if (loaded === SHOTS) drawPhotos();
    };
    img.src = url;
    imgs[i] = img;
  });

  function drawPhotos() {
    imgs.forEach((img, i) => {
      const y = startY + i * (photoH + gap);
      
      // 프레임 배경 (감귤 색상)
      ctx.save();
      ctx.fillStyle = "rgba(245, 130, 10, 0.12)";
      roundRect(ctx, marginX - 12, y - 12, photoW + 24, photoH + 24, 14);
      ctx.fill();
      ctx.restore();
      
      // 흰 카드 + 그림자
      ctx.save();
      ctx.shadowColor = "rgba(224,130,30,0.28)";
      ctx.shadowBlur = 22;
      ctx.shadowOffsetY = 10;
      ctx.fillStyle = "#ffffff";
      roundRect(ctx, marginX - 8, y - 8, photoW + 16, photoH + 16, 12);
      ctx.fill();
      ctx.restore();
      
      // 사진
      ctx.save();
      roundRect(ctx, marginX, y, photoW, photoH, 8);
      ctx.clip();
      ctx.drawImage(img, marginX, y, photoW, photoH);
      ctx.restore();
      
      // 프레임 테두리
      ctx.save();
      ctx.strokeStyle = "#f5820a";
      ctx.lineWidth = 3;
      roundRect(ctx, marginX, y, photoW, photoH, 8);
      ctx.stroke();
      ctx.restore();
      
      // 모서리 장식
      drawTangerine(ctx, marginX + 8, y + 8, 12, "#f5820a");
      drawTangerine(ctx, marginX + photoW - 8, y + 8, 12, "#f5820a");
      drawTangerine(ctx, marginX + 8, y + photoH - 8, 12, "#f5820a");
      drawTangerine(ctx, marginX + photoW - 8, y + photoH - 8, 12, "#f5820a");
      
      // 스티커
      ctx.font = "48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(stickerEmojis[currentSticker], marginX + photoW - 28, y + 28);
    });

    // 하단 장식
    ctx.save();
    ctx.fillStyle = "rgba(245, 130, 10, 0.15)";
    roundRect(ctx, 20, H - 130, W - 40, 110, 12);
    ctx.fill();
    ctx.restore();

    // 푸터
    const d = new Date();
    const dateStr = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
    const timeStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
    
    ctx.textAlign = "center";
    ctx.fillStyle = "#2f9150";
    ctx.font = "700 36px 'Poppins',sans-serif";
    ctx.fillText("Tangerine Photo Booth", W / 2, H - 70);
    ctx.fillStyle = "#c79a63";
    ctx.font = "600 22px 'Poppins',sans-serif";
    ctx.fillText(dateStr + " · " + timeStr, W / 2, H - 30);

    // 결과 화면 전환
    captureStage.classList.add("hidden");
    resultStage.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

// ---- 감귤 아이콘 그리기 ----
function drawTangerine(ctx, x, y, r, color) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  // 잎사귀
  ctx.beginPath();
  ctx.ellipse(x + r * 0.4, y - r * 0.9, r * 0.5, r * 0.25, -Math.PI / 4, 0, Math.PI * 2);
  ctx.fillStyle = "#3fa34d";
  ctx.fill();
  ctx.restore();
}

// ---- 라운드 사각형 ----
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---- 저장 ----
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}_${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}`;
  link.download = `tangerine_booth_4cut_${stamp}.png`;
  link.href = resultCanvas.toDataURL("image/png");
  link.click();
});

// ---- 다시 찍기 ----
retakeBtn.addEventListener("click", () => {
  resultStage.classList.add("hidden");
  captureStage.classList.remove("hidden");
  captureStage.scrollIntoView({ behavior: "smooth", block: "start" });
  shots.length = 0;
  thumbs.forEach((t) => {
    t.classList.remove("filled", "active");
    t.innerHTML = `<span>${+t.dataset.index + 1}</span>`;
  });
  shootBtn.disabled = false;
});

// ---- 유틸 ----
function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }
