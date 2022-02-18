const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
const round = new Round(player1, player2);

const player1Element = document.getElementById("player1");
const player2Element = document.getElementById("player2");
const rollBtnElement = document.getElementById("btn-roll-the-pigs");
const passBtnElement = document.getElementById("btn-pass-the-pigs");
const pigsImgElement = document.getElementById("pigs");
const pigsSpotElement = document.getElementById("pigs-spot");
const messageElement = document.getElementById("message");
const pointsPlayer1Element = document.getElementById("points-player1");
const pointsPlayer2Element = document.getElementById("points-player2");

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
  if (round.activePlayer === player1) {
    player1Element.classList.add("highlight-active-player");
    player2Element.classList.remove("highlight-active-player");
  } else if (round.activePlayer === player2) {
    player2Element.classList.add("highlight-active-player");
    player1Element.classList.remove("highlight-active-player");
  }
}

function rollThePigsPlay() {
  round.activePlayer.rollThePigs(pickRandomPigsPosition());
  round.addPoints();
  updatePlayerPoints();
  updatePigsImg();
}

function updatePlayerPoints() {
  if (round.activePlayer === player1) {
    pointsPlayer1Element.innerText = `${round.activePlayer.points}`;
    return;
  }
  if (round.activePlayer === player2) {
    pointsPlayer2Element.innerText = `${round.activePlayer.points}`;
  }
}

function changePlayers() {
  if (round.activePlayer === player1) {
    round.passThePigs(player2);
    return;
  }
  if (round.activePlayer === player2) {
    round.passThePigs(player1);
  }
}

function updatePigsImg() {
  cleanMessage();
  if (round.activePlayer.currentPigsPosition === "leaning-jowler") {
    pigsImgElement.src = "./assets/images/leaning-jowler.png";
    messageElement.innerText = "Leaning jowler!";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "snouter") {
    pigsImgElement.src = "./assets/images/snouter.png";
    messageElement.innerText = "Snouter!";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "sider") {
    pigsImgElement.src = "./assets/images/sider.png";
    messageElement.innerText = "Sider!";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "makin-bacon") {
    pigsImgElement.src = "./assets/images/makin-bacon.png";
    messageElement.innerText = "Makin' bacon!";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "razorback") {
    pigsImgElement.src = "./assets/images/razorback.png";
    messageElement.innerText = "Razorback!";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "piggy-back") {
    pigsImgElement.src = "./assets/images/piggy-back.png";
    messageElement.innerText = "Piggy back!!";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "pig-out") {
    pigsImgElement.src = "./assets/images/pig-out.png";
    messageElement.innerText = "PIG OOOUT! You lost your turn";
    changePlayers();
    return;
  }
}

function cleanMessage() {
  messageElement.innerText = "";
}

function declareWinner() {
  round.checkWinner();
  if (round.winner === player1) {
    messageElement.innerText = "Player 1 wins!";
    pigsImgElement.src = "";
  } else if (round.winner === player2) {
    messageElement.innerText = "Player 2 wins!";
    pigsImgElement.src = "";
  }
}

rollBtnElement.addEventListener("click", () => {
  if (round.gameOver === true) {
    return;
  }

  highlighActivePlayer();
  rollThePigsPlay();
  declareWinner();

  console.log(round);
});

passBtnElement.addEventListener("click", () => {
  if (round.gameOver === true) {
    return;
  }
  changePlayers();
  highlighActivePlayer();
});
