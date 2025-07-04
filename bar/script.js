import { drawBars } from "./barVisualizer.js";

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const canvas = document.getElementById("visualizer");
const ctx = canvas.getContext("2d");

// ボタン制御
pauseBtn.style.display = "none";
playBtn.addEventListener("click", () => {
  audio.play();
  playBtn.style.display = "none";
  pauseBtn.style.display = "inline-block";
});
pauseBtn.addEventListener("click", () => {
  audio.pause();
  pauseBtn.style.display = "none";
  playBtn.style.display = "inline-block";
});

// キャンバスリサイズ
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const source = audioCtx.createMediaElementSource(audio);
const analyser = audioCtx.createAnalyser();
source.connect(analyser);
analyser.connect(audioCtx.destination);
analyser.fftSize = 512;
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// 色
const backgroundColor = getComputedStyle(document.body).backgroundColor;
const barColor = "rgb(100, 200, 255)";

// アニメーション
function animate() {
  requestAnimationFrame(animate);
  analyser.getByteFrequencyData(dataArray);

  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 棒グラフだけ表示
  drawBars(ctx, canvas, dataArray, bufferLength, barColor);
}

audio.onplay = () => {
  audioCtx.resume();
  animate();
};
