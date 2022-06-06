## Site

https://game-rps-6893d.web.app/

## 설명

**가위 바위 보 게임**  
(클릭 이벤트가 발생할 때마다 데이터를 축적하고 dom을 그림)

public/src/game.js

## API

data, es6, javascript, css3

## Rule

1. 기본으로 주어진 코인 30
2. 스타트하면 코인 10 소진
3. 가위/바위/보 선택하여 클릭하면, 아래에 결과 노출
4. 승리시 룰렛 돌아가서 선택된 점수를 내 코인에 넣어줌, 비기거나 패배시 룰렛 돌아가지 않음
5. 비기면 다시 가위/바위/보 선택 가능, 패배시 코인만 소진.
6. 남은 점수가 있을 경우 다시 스타트 버튼 클릭하여, 가위바위보 버튼 으로 게임 진행 가능

## 기능

### 1. 클릭 이벤트

![click](https://user-images.githubusercontent.com/33679192/172093599-c1f29442-1536-4630-8d11-198b8100c8bb.jpg)

1. 기본으로 주어진 코인 30
2. 스타트하면 코인 10 소진
3. 가위/바위/보 선택하여 클릭하면, 아래에 결과 노출

```javascript
let myCoin = 30; // 처음 코인
const START_NEED_COIN = -10; // 시작할때 차감 값

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

const PLAY = ($btnThis) => {
  BTN_CLICK($btnThis);
  LANDER();
};

window.addEventListener("load", DEFAULT);
$btn.addEventListener("click", ({ target }) => {
  if (target.dataset.select === "start") START.button(target);
  if (target.dataset.select === "play") PLAY(target);
});
```

### 2. 실행 로직

![clickevent](https://user-images.githubusercontent.com/33679192/172093995-03408953-e202-4128-a6a7-00705f96c7e5.jpg)

5. 비기면 다시 가위/바위/보 선택 가능, 패배시 코인만 소진.
6. 남은 점수가 있을 경우 다시 스타트 버튼 클릭하여, 가위바위보 버튼 으로 게임 진행 가능

#### 로직

```javascript
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
```

#### 움직임

```javascript
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
```

### 3. dom & style

```javascript
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
```
