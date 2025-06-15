const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    screenLives: document.querySelector(".number-lives")
  },

  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
    lives: 3
  },

  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime

  if (state.values.currentTime <= 0) {
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    alert("Game Over! O seu resultado foi:" + state.values.result);
    // playSound("gameOver")
    location.reload();
  }
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");

  })
  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListnerHitBox() {
  state.view.squares.forEach((squere) => {
    squere.addEventListener("mousedown", () => {
      if (squere.id === state.values.hitPosition) {
        state.values.result++
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit")
      } else {
        if (state.values.lives > 0) {
          state.values.lives--
          state.view.screenLives.textContent = state.values.lives;
        } else {
          alert("Game Over! O seu resultado foi:" + state.values.result);
          location.reload();

        }
      }
    })
  })
};

function initialize() {
  addListnerHitBox()
};

initialize();