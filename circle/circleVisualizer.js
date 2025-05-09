// 🔽 円形の波形（オーディオビジュアライザー）を描く関数
export function drawCircleWave(
  ctx, // キャンバスに描くための道具（えんぴつ）
  canvas, // キャンバス（絵を描く場所）
  dataArray, // 音の強さを数字で並べた配列（Web Audio APIで取得）
  bufferLength, // dataArrayの長さ（音のデータの数）
  circleColor // 線の色（好きな色にできる）
) {
  // 🔸 円の中心位置を計算（キャンバスの真ん中）
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // 🔸 円の基本サイズ（半径）
  const baseRadius = 100;

  // 🔸 音の強さをどれくらい大きく見せるか（2倍）
  const waveScale = 2.0;

  // 🔸 パス（線）を描き始める準備
  ctx.beginPath();

  // 🔸 音のデータの数だけぐるっと1周する
  for (let i = 0; i < bufferLength; i++) {
    // 🔸 角度を計算（0〜360度をデータの数で割る）
    const angle = (i / bufferLength) * Math.PI * 2;

    // 🔸 音の強さを拡大して値を決める
    const value = dataArray[i] * waveScale;

    // 🔸 基本の円の半径に音の強さを加える（動く波のように）
    const radius = baseRadius + value;

    // 🔸 三角関数を使って円周上の位置を計算
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    // 🔸 最初の点は moveTo、それ以降は線でつなぐ
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  // 🔸 円を閉じて（ぐるっと一周）から描く
  ctx.closePath();
  ctx.strokeStyle = circleColor; // 線の色
  ctx.lineWidth = 2; // 線の太さ
  ctx.stroke(); // 実際に線を描く
}
