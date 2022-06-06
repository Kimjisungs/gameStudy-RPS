let myCoin = 30; // 처음 코인
let winCoin = 0; // 승리시 코인
let clickedValue = ""; // 가위 바위 보 버튼
let randomCoin = 16;

let otherResult = ""; // 상대
let myResult = ""; // 나
let finalResult = ""; // 결과

const LOOP = []; // 코인 리스트 <li></li>
const COIN_NUMBER_LIST = []; //코인 리스트 값
const START_NEED_COIN = -10; // 시작할때 차감 값
const SPEED = 40;

const ROCK_PAPER_SCISSORS = ["가위", "바위", "보"];
const RESULTS = ["승리!", "비김!", "졌다!"];

const $btn = document.querySelector(".content");
const $coin = document.querySelector("[data-select=coin]");
const $start = document.querySelector("[data-select=start]");
const $btnGroup = document.querySelectorAll("[data-select=play]");
const $otherPart = document.querySelector("[data-select=otherPart]");
const $myPart = document.querySelector("[data-select=myPart]");
const $finalPart = document.querySelector("[data-select=result]");
const $numbers = document.querySelector("[data-select=numbers]");

/* 스타일 */
// STYLE.css.disabled(target)
// STYLE.css.abled(target)
// STYLE.css.add(target, name)
// STYLE.css.remove(target, name)
// STYLE.script.filtering(target)
// STYLE.script.random(target)
// STYLE.script.loop(target)

const LANDER = () => {
  $coin.textContent = myCoin;
  $otherPart.textContent = otherResult || "";
  $myPart.textContent = myResult || "";
  $finalPart.textContent = finalResult || "";
};

const DEFAULT = () => {
  STYLE.html.liLoop();
  STYLE.html.coinList();
  STYLE.css.disabled($btnGroup);
  LANDER();
};

const MY_COIN = {
  startMoney() {
    myCoin += START_NEED_COIN;
  },
};

const STYLE = (() => {
  const css = {
    typeCheck(target, callBack) {
      if (Symbol.iterator in target === true) {
        for (const value of target) callBack(value);
      } else callBack(target);
    },
    disabled(target) {
      this.typeCheck(target, (value) => (value.disabled = true));
    },
    abled(target) {
      this.typeCheck(target, (value) => (value.disabled = false));
    },
    add(target, className) {
      target.classList.add(className);
    },
    remove(target, className) {
      target.classList.remove(className);
    },
  };

  const script = {
    filtering(name) {
      return ROCK_PAPER_SCISSORS.filter((item) => item === name);
    },
    random(array) {
      return array[Math.floor(Math.random() * array.length)];
    },
    loop(numbers, callBack) {
      for (let i = 0; i < numbers; i++) {
        callBack(i);
      }
    },
  };

  const html = {
    coinList() {
      LOOP.forEach((el) => ($numbers.innerHTML += el));
    },
    liLoop() {
      STYLE.script.loop(2, () => {
        STYLE.script.loop(8, (value) => {
          let li = `<li class="number">${1 + value}0</li>`;
          LOOP.push(li);
        });
      });
    },
  };
  return {
    css,
    script,
    html,
  };
})();

const LOGIC = {
  addMyCoin(winCoin) {
    myCoin = myCoin + winCoin;
    console.log(`승리 코인 : ` + winCoin);
    console.log(`현재 내 코인 : ` + myCoin);
  },
  addRandomCoin(winCoin) {
    randomCoin = 16;
    let index = COIN_NUMBER_LIST.findIndex((item) => +item === winCoin) + 1;

    const randomIndex = [index, index + 8];
    const filterRandom = STYLE.script.random(randomIndex);

    randomCoin = randomCoin + filterRandom;
    console.log(`10~80 10~80중 랜덤: [${randomIndex}]`);
    console.log("랜덤 두개 중 결정 된것 index : " + filterRandom);
    console.log(`몇번을 돌것인지 : ` + randomCoin);
  },
  numberMoving(list, winCoin) {
    let from = 0;
    let to = list.length - 1;
    let current = 0;
    LOGIC.addRandomCoin(winCoin);

    STYLE.script.loop(list.length, (i) => {
      STYLE.css.remove(list[i], "on");
    });
    let timer = setTimeout(function go() {
      if (current <= randomCoin) {
        if (from <= to) STYLE.css.add(list[from], "on");
        if (from > 0) STYLE.css.remove(list[from - 1], "on");
        if (from > to) from = -1;
        setTimeout(go, SPEED);
      }
      if (current === randomCoin) {
        LOGIC.addMyCoin(winCoin);
        $coin.textContent = myCoin;
        STYLE.css.abled($start);
      }
      current++;
      from++;
    }, SPEED);
  },
  rockPaperScissors() {
    const rock = ROCK_PAPER_SCISSORS[1]; //바위
    const paper = ROCK_PAPER_SCISSORS[2]; //보
    const scissor = ROCK_PAPER_SCISSORS[0]; //가위

    if (
      (myResult === scissor && otherResult === paper) ||
      (myResult === rock && otherResult === scissor) ||
      (myResult === paper && otherResult === rock)
    ) {
      this.win();
    } else if (myResult === otherResult) this.tie();
    else this.lose();
  },
  win() {
    finalResult = RESULTS[0];
    STYLE.css.disabled($btnGroup);
    finalResult === RESULTS[0]
      ? ($finalPart.style.backgroundColor = "#47a5ff")
      : ($finalPart.style.backgroundColor = "#fff");
  },
  tie() {
    finalResult = RESULTS[1];
    STYLE.css.abled($btnGroup);
  },
  lose() {
    finalResult = RESULTS[2];
    STYLE.css.disabled($btnGroup);
    STYLE.css.abled($start);
  },
};

const TEXT = {
  otherPart() {
    otherResult = STYLE.script.random(ROCK_PAPER_SCISSORS);
  },
  myPart(value) {
    myResult = value;
  },
  result() {
    LOGIC.rockPaperScissors();
  },
};

const NODE = {
  findNode(listData) {
    STYLE.script.loop($btn.children.length, (values) => {
      const $numbersGroup = $btn.children[values];
      const $children = $numbersGroup.children;

      if ($numbersGroup.classList.contains("numbers")) {
        STYLE.script.loop($numbersGroup.children.length, (value) => {
          if (!$numbersGroup.children[value].classList.contains("number"))
            return;
          const childrenValue = $numbersGroup.children[value];
          this.listPush(childrenValue);
        });
        this.randomWinCoin($children, listData);
      }
    });
  },
  listPush(value) {
    COIN_NUMBER_LIST.push(value.textContent);
  },
  randomWinCoin($children, callBack) {
    winCoin = STYLE.script.random(COIN_NUMBER_LIST);
    winCoin = +winCoin;
    callBack($children, winCoin);
  },
};

const INIT = () => {
  NODE.findNode(($children, winCoin) => LOGIC.numberMoving($children, winCoin));
};

const BTN_CLICK = ($btnThis) => {
  const textContent = $btnThis.textContent;
  clickedValue = STYLE.script.filtering(textContent)[0]; // 필터 가위 바위 보

  TEXT.otherPart();
  TEXT.myPart(clickedValue);
  TEXT.result();

  //승리일 경우
  if (finalResult === RESULTS[0]) INIT();
};

const START = {
  button($btnThis) {
    MY_COIN.startMoney();
    STYLE.css.disabled($btnThis);
    STYLE.css.abled($btnGroup);
    this.clear();
    this.noneCoin();
    LANDER();
  },
  clear(lists) {
    console.clear();
    otherResult = "";
    myResult = "";
    finalResult = "";
    $finalPart.style.backgroundColor = "#fff";
  },
  noneCoin() {
    if (myCoin < 0) {
      myCoin = 0;
      STYLE.css.disabled([$start, ...$btnGroup]);
      alert("코인이 없어요.");
    }
  },
};

const PLAY = ($btnThis) => {
  BTN_CLICK($btnThis);
  LANDER();
};

window.addEventListener("load", DEFAULT);
$btn.addEventListener("click", ({ target }) => {
  if (target.dataset.select === "start") START.button(target);
  if (target.dataset.select === "play") PLAY(target);
});
