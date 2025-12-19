let score;
let history = [];
let throws = [];
let round = 1;

// ページ読み込み直後
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-modal").classList.remove("hidden");

  document.getElementById("start-game").addEventListener("click", () => {
    score = Number(document.getElementById("start-score").value);

    document.getElementById("score").textContent = score;
    document.getElementById("round-number").textContent = round;

    document.getElementById("throw1").textContent = 1;
    document.getElementById("throw2").textContent = 2;
    document.getElementById("throw3").textContent = 3;

    document.getElementById("start-modal").classList.add("hidden");

    console.log("ゲーム開始 score =", score);
  });
});


// 各セグメントのクリック処理
document.querySelectorAll(".segment, .bull, .number").forEach(seg => {
  seg.addEventListener("click", () => {
    const value = Number(seg.dataset.value);
    const name = String(seg.dataset.name);

    if (score === undefined) {
      alert("先に開始スコアを選択してください");
      return;
    }

    if (throws.length >= 3) {
      alert("既に3回投げています");
      return;
    }

    if (round >= 8) {
      alert("ゲーム終了");
      return;
    }

    score -= value;
    throws.push(value);   // ← 履歴に追加

    document.getElementById("score").textContent = score;
    document.getElementById(`throw${throws.length}`).textContent = name;

    console.log("クリック:", value, " → score:", score, "throws:", throws);
  });
});

// 取消ボタンの処理（Undo）
document.getElementById("cancel").addEventListener("click", () => {
  if (throws.length > 0) {
    const last = throws.pop();  // ← 最後の入力を取り出す
    score += last;               // ← 計算を戻す

    document.getElementById("score").textContent = score;
    document.getElementById(`throw${throws.length + 1}`).textContent = throws.length + 1;

    console.log("取消:", last, " → score:", score, "throws:", throws);
  }
});

// チェンジボタンの処理
document.getElementById("change").addEventListener("click", () => {
  if (round >= 8) {
    alert("ゲーム終了");
    return;
  }
  
  history[round] = throws;
  round += 1;
  throws = []; 
  document.getElementById("throw1").textContent = 1;
  document.getElementById("throw2").textContent = 2;
  document.getElementById("throw3").textContent = 3;
  
  // document.getElementById(`round${round}`).textContent =
  //   history
  //     .map((throws) => throws.reduce((a, b) => a + b, 0))
  //     .join("\n");
  document.getElementById(`round${round}`).textContent = history[round - 1].reduce((a, b) => a + b, 0);
  document.getElementById("round-number").textContent = round;
});
