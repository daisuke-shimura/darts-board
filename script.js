let score = 0;
let history = [];
let throws = [];
let count = 0;

// 各セグメントのクリック処理
document.querySelectorAll(".segment, .bull").forEach(seg => {
  seg.addEventListener("click", () => {
    const value = Number(seg.dataset.value);

    score += value;
    throws.push(value);   // ← 履歴に追加
    // history.push(value);  

    document.getElementById("score").textContent = score;
    document.getElementById("throw1").textContent = throws[0];
    document.getElementById("throw2").textContent = throws[1];
    document.getElementById("throw3").textContent = throws[2];

    console.log("クリック:", value, " → score:", score, "throws:", throws);
  });
});

// 取消ボタンの処理（Undo）
document.getElementById("cancel").addEventListener("click", () => {
  if (throws.length > 0) {
    const last = throws.pop();  // ← 最後の入力を取り出す
    score -= last;               // ← 計算を戻す

    document.getElementById("score").textContent = score;

    console.log("取消:", last, " → score:", score, "throws:", throws);
  }
});

// チェンジボタンの処理
document.getElementById("change").addEventListener("click", () => {
  history[count] = throws;
  count += 1;
  throws = []; 
});
