const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
const game = new Game(player1, player2);

const player1Element = document.getElementById("player1");
const player2Element = document.getElementById("player2");
const rollBtnElement = document.getElementById("btn-roll-the-pigs");
const passBtnElement = document.getElementById("btn-pass-the-pigs");
const getBtnElement = document.getElementById("btn-get-points");
const pigsImgElement = document.getElementById("pigs");
const pigsSpotElement = document.getElementById("pigs-spot");
const messageElement = document.getElementById("message");
const pointsPlayer1Element = document.getElementById("points-player1");
const pointsPlayer2Element = document.getElementById("points-player2");
const gameBoardElement = document.getElementById("game-board");
const containerElement = document.querySelector(".container");
const roundPointsElement = document.getElementById("round-points");

function pickRandomPigsPosition() {
  const options = [
    "leaningJowler",
    "snouter",
    "sider",
    "makingBacon",
    "razorback",
    "piggyBack",
    "pigOut",
  ];
  const randomNum = Math.floor(Math.random() * options.length);
  return options[randomNum];
}

function highlighActivePlayer() {
  if (game.activePlayer === player1) {
    player1Element.classList.add("highlight-active-player");
    player2Element.classList.remove("highlight-active-player");
  } else if (game.activePlayer === player2) {
    player2Element.classList.add("highlight-active-player");
    player1Element.classList.remove("highlight-active-player");
  }
}

function rollThePigsPlay() {
  game.activePlayer.rollThePigs(pickRandomPigsPosition());
  game.countRoundPoints();
  updateRoundPoints();
  updatePlayerPoints();
  updatePigsImg();
  declareWinner();
  gameOver();
}

function updateRoundPoints() {
  roundPointsElement.innerText = `+${game.roundPoints}`;
}

function updatePlayerPoints() {
  if (game.activePlayer === player1) {
    pointsPlayer1Element.innerText = `${game.activePlayer.points}`;
    return;
  }
  if (game.activePlayer === player2) {
    pointsPlayer2Element.innerText = `${game.activePlayer.points}`;
  }
}

function clearMessage() {
  messageElement.innerText = "";
}

function updatePigsImg() {
  clearMessage();
  pigsImgElement.classList.remove("first-img");
  if (game.activePlayer.currentPigsPosition === "leaning-jowler") {
    pigsImgElement.src = "./assets/images/leaning-jowler.png";
    messageElement.innerText = "Leaning jowler!";
    return;
  }
  if (game.activePlayer.currentPigsPosition === "snouter") {
    pigsImgElement.src = "./assets/images/snouter.png";
    messageElement.innerText = "Snouter!";
    return;
  }
  if (game.activePlayer.currentPigsPosition === "sider") {
    pigsImgElement.src = "./assets/images/sider.png";
    messageElement.innerText = "Sider!";
    return;
  }
  if (game.activePlayer.currentPigsPosition === "makin-bacon") {
    pigsImgElement.src = "./assets/images/makin-bacon.png";
    messageElement.innerText = "Makin' bacon!";
    startNewRound();
    return;
  }
  if (game.activePlayer.currentPigsPosition === "razorback") {
    pigsImgElement.src = "./assets/images/razorback.png";
    messageElement.innerText = "Razorback!";
    return;
  }
  if (game.activePlayer.currentPigsPosition === "piggy-back") {
    pigsImgElement.src = "./assets/images/piggy-back.png";
    messageElement.innerText = "Piggy back!";
    return;
  }
  if (game.activePlayer.currentPigsPosition === "pig-out") {
    pigsImgElement.src = "./assets/images/pig-out.png";
    messageElement.innerText = "PIG OUT!";
    startNewRound();
    return;
  }
}

function animation() {
  messageElement.innerText = "Wait for it...";
  pigsImgElement.classList.remove("first-img");
  pigsImgElement.src = "./assets/images/pigs-gif.gif";
}

function changePlayers() {
  if (game.activePlayer === player1) {
    game.passThePigs(player2, player1);
    return;
  }
  if (game.activePlayer === player2) {
    game.passThePigs(player1, player2);
  }
}

function roundOver() {
  game.endRound();
  game.addPoints();
  updatePlayerPoints();
  declareWinner();
}

function startNewRound() {
  rollBtnElement.disabled = false;
  getBtnElement.disabled = false;
  changePlayers();
  highlighActivePlayer();
  updateRoundPoints();
}

function declareWinner() {
  game.checkWinner();
  if (game.winner === player1) {
    player1Element.innerHTML = `<p class="message">WINNER!</p>`;
  } else if (game.winner === player2) {
    player2Element.innerHTML = `<p class="message">WINNER!</p>`;
  }
}

function clearBoard() {
  clearMessage();
  pigsImgElement.src = "./assets/images/snouter.png";
  pigsImgElement.classList.add("first-img");
  roundPointsElement.innerText = "";
  if (game.activePlayer === player1) {
    player1Element.classList.remove("highlight-active-player");
  } else if (game.activePlayer === player2) {
    player2Element.classList.remove("highlight-active-player");
  }
}

function gameOver() {
  if (game.gameOver === true) {
    rollBtnElement.remove();
    passBtnElement.remove();
    getBtnElement.remove();
    gameBoardElement.insertAdjacentHTML(
      "afterend",
      `<button id="btn-new-game" class="btn">NEW GAME</button>`
    );
    game.endRound();
    clearBoard();
  }
}

function startNewGame() {
  game.newGame();
  document.location.reload(true);
}

function rollAfterTimeOut(func) {
  setTimeout(func, 1000);
}

rollBtnElement.addEventListener("click", () => {
  highlighActivePlayer();
  animation();
  rollAfterTimeOut(rollThePigsPlay);
  declareWinner();
});

getBtnElement.addEventListener("click", () => {
  rollBtnElement.disabled = true;
  getBtnElement.disabled = true;
  clearBoard();
  roundOver();
  gameOver();
});

passBtnElement.addEventListener("click", () => {
  startNewRound();
  // setTimeout(startNewRound, 10);
});

window.addEventListener("load", () => {
  highlighActivePlayer();
});

containerElement.addEventListener("click", (e) => {
  if (e.target && e.target.id === "btn-new-game") {
    startNewGame();
  }
});
