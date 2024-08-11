// 開始時間
let startTime;
// 経過秒数用 タイマーID
let timer;
// カードめくり用 タイマーID(動作中はカードがめくれないように)
let backTimer;
// 1枚目かどうかのフラグ(1枚目: true 2枚目: false)
let flgFirst = true;
// 1枚目のカードを格納
let cardFirst;
// そろえた枚数(ペアができるたびに+1 10ペアで終了)
let countUnit = 0;
//ゲーム開始前
let gameStarted = false;

// 画像のパスを格納する配列
let img_arr = [
  "panda1.jpg",
  "panda2.jpg",
  "panda3.jpg",
  "panda4.png",
  "panda5.png",
  "panda6.png",
  "panda7.png",
  "panda8.png",
  "panda9.png",
  "panda10.png",
];

//startボタンを押してゲーム開始
const btn = document.getElementById("startbtn");
btn.addEventListener("click", function () {
  if (gameStarted) {
    return;
  } else {
    const gameTitle = document.getElementById('gameTitle')
    gameTitle.remove();
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(i);
      arr.push(i);
    } //[0,0,1,1,2,2,...........8,8,9,9] 合計20の要素

    shuffle(arr); // シャッフル [1,7,3,4,4,5......]
    let game_board = document.getElementById("game_board");
    game_board.classList.replace("board-preGame","board-inGame");

    // div要素作成(カード)
    for (i = 0; i < 20; i++) {
      let childDiv = document.createElement("div");
      childDiv.className = "card back"; //カードの裏側を表示
      childDiv.number = arr[i]; //プロパティを設定
      childDiv.onclick = turn;

      let parentDiv = document.createElement("div");
      parentDiv.className = "parent";

      parentDiv.appendChild(childDiv);
      game_board.appendChild(parentDiv);
    }
    startTime = new Date(); // 開始時刻を取得
    startTimer(); // タイマー開始
    gameStarted = true;
  }
});

window.onload = function () {};

// シャッフル用関数
function shuffle(arr) {
  let n = arr.length;
  while (n) {
    //nが0になったら終了
    i = Math.floor(Math.random() * n--);
    [arr[n], arr[i]] = [arr[i], arr[n]];
  }
  return arr;
}

// カードクリック時の処理
function turn(e) {
  let div = e.target; //クリックしたカード

  // カードのタイマー処理が動作中は return
  if (backTimer) return; //連続で押せないように

  // 裏向きのカードをクリックした場合は画像を表示する
  if (div.classList.contains("back")) {
    div.classList.remove("back");
    div.style.backgroundImage =
      "url('img/sinkeisuijaku/" + img_arr[div.number] + "')";
  } else {
    return; // 既に表になっているカードは return
  }

  if (flgFirst) {
    // 1枚目の処理
    cardFirst = div; //最初にクリックしたカード
    flgFirst = false; //次は２枚目だから
  } else {
    // ２枚目の処理
    if (cardFirst.number == div.number) {
      countUnit++; //揃ったペアの数
      backTimer = setTimeout(function () {
        div.className = "card finish"; //0.5秒で透明
        cardFirst.className = "card finish";
        backTimer = NaN;
        if (countUnit == 10) {
          //すべてカードが揃ったら
          clearInterval(timer); // timer終了
        }
      }, 500);
    } else {
      backTimer = setTimeout(function () {
        div.className = "card back";
        div.style.backgroundImage = ""; // カードを裏側に戻す
        cardFirst.className = "card back";
        cardFirst.style.backgroundImage = "";
        cardFirst = null;
        backTimer = NaN;
      }, 500);
    }
    flgFirst = true;
  }
}

// タイマー開始
function startTimer() {
  timer = setInterval(showSecond, 1000);
}

// 秒数表示
function showSecond() {
  let nowTime = new Date();
  let elapsedTime = Math.floor((nowTime - startTime) / 1000);
  let str = "経過秒数: " + elapsedTime + "秒";
  let re = document.getElementById("result");
  re.innerHTML = str;
}
