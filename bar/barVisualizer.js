// 🔽 棒グラフ型ビジュアライザーを描く関数
export function drawBars(ctx, canvas, dataArray, bufferLength, barColor) {
  // 🔸 1本のバーの横幅を計算する
  const barWidth = canvas.width / bufferLength;

  // 🔸 横方向のスタート位置（左端）を 0 にする
  let x = 0;

  // 🔸 音の周波数データの数だけループする
  for (let i = 0; i < bufferLength; i++) {
    // 🔸 音の大きさに合わせてバーの高さを決める（見やすいように 2.5倍）
    const barHeight = dataArray[i] * 2.5;

    // 🔸 バーの色を指定（好きな色にカスタマイズできる）
    ctx.fillStyle = barColor;

    // 🔸 実際にバーを描く
    // ctx.fillRect(x, y, width, height)
    // x : 横位置（左から）
    // y : 縦位置（下から上に描くため canvas.height - barHeight）
    // width : 横幅
    // height : 高さ
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    // 🔸 次のバーの位置に進める（バーとバーの間に1pxのすき間）
    x += barWidth + 1;
  }
}
