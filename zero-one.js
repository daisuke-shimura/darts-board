let score;
let history = [];
let throws = [];
let round = 1;
let MAX_ROUNDS;
const SEGMENTS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
                  21,22,24,26,27,28,30,32,33,34,36,38,39,40,42,45,48,50,51,54,57,60];

// ページ読み込み直後
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("start-modal").classList.remove("hidden");

  document.getElementById("start-game").addEventListener("click", () => {
    score = Number(document.getElementById("start-score").value);

    if (score == 301) {
      MAX_ROUNDS = 10;
    }
    else if (score == 501) {
      MAX_ROUNDS = 15;
    }
    else if (score == 701) {
      MAX_ROUNDS = 20;
    }

    document.getElementById("score").textContent = score;
    document.getElementById("round-number").textContent = round;
    document.getElementById("max-round").textContent = MAX_ROUNDS;

    const historyEl = document.getElementById("history");
    // R1〜Rn を生成
    for (let i = 1; i <= MAX_ROUNDS; i++) {
      const row = document.createElement("div");
      row.innerHTML = `R${i}：<span id="round${i}"></span>`;
      historyEl.appendChild(row);
    }

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

    if (round > MAX_ROUNDS || score == 0) {
      alert("ゲーム終了");
      return;
    }

    if (score < 0) {
      alert("バーストしています。チェンジを押してください");
      return
    }

    score -= value;
    throws.push(value);   // ← 履歴に追加

    document.getElementById("score").textContent = score;
    document.getElementById(`throw${throws.length}`).textContent = name;

    if (score < 0) {
      alert("BUST");
    }
    else if (score == 0) {
      alert("CLEAR");
    }

    // 上がりのセグメントの色を変化
    document.querySelectorAll(".segment.yellow, .bull.yellow")
      .forEach(el => el.classList.remove("yellow"));

    if (SEGMENTS.includes(score)) {
      document
        .querySelectorAll(`.segment[data-value="${score}"], .bull[data-value="${score}"]`)
        .forEach(el => el.classList.add("yellow"));
    }
  });
});

// 取消ボタンの処理
document.getElementById("cancel").addEventListener("click", () => {
  if (throws.length > 0) {
    const last = throws.pop();  // ← 最後の入力を取り出す
    score += last;               // ← 計算を戻す

    document.getElementById("score").textContent = score;
    document.getElementById(`throw${throws.length + 1}`).textContent = throws.length + 1;

    // 上がりのセグメントの色を変化
    document.querySelectorAll(".segment.yellow, .bull.yellow")
      .forEach(el => el.classList.remove("yellow"));

    if (SEGMENTS.includes(score)) {
      document
        .querySelectorAll(`.segment[data-value="${score}"], .bull[data-value="${score}"]`)
        .forEach(el => el.classList.add("yellow"));
    }
  }
});

// チェンジボタンの処理
document.getElementById("change").addEventListener("click", () => {
  if (score < 0) {
    // バースト時の処理
    score += throws.reduce((a, b) => a + b, 0); // ← 今ラウンドの合計を戻す
    document.getElementById("score").textContent = score;
    throws = [0,0,0];
    history[round] = throws;
    throws = []; 
    document.getElementById(`round${round}`).textContent = "BUST";
    // 上がりのセグメントの色を変化
    if (SEGMENTS.includes(score)) {
      document
        .querySelectorAll(`.segment[data-value="${score}"], .bull[data-value="${score}"]`)
        .forEach(el => el.classList.add("yellow"));
    }
  }
  else {
    // 通常時の処理
    history[round] = throws;
    throws = []; 
    document.getElementById(`round${round}`).textContent = history[round].reduce((a, b) => a + b, 0);
  }

  document.getElementById("throw1").textContent = 1;
  document.getElementById("throw2").textContent = 2;
  document.getElementById("throw3").textContent = 3;

  round += 1;
  if (round == MAX_ROUNDS + 1) {
    alert("ゲーム終了");
    return;
  }
  document.getElementById("round-number").textContent = round;
});
