const round = new Round(new Player("Player 1"));

const rollBtnElement = document.getElementById("btn-roll-the-pigs");
const passBtnElement = document.getElementById("btn-pass-the-pigs");
const pigsImgElement = document.getElementById("pigs");
const pointsPlayer1Element = document.getElementById("points-player1");

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

function rollThePigsPlay() {
  round.activePlayer.rollThePigs(pickRandomPigsPosition());
  round.addPoints();
  updatePlayerPoints(pointsPlayer1Element);
  updatePigsImg();
}

function updatePlayerPoints(activePlayersPoints) {
  activePlayersPoints.innerText = `${round.activePlayer.points}`;
}

function updatePigsImg() {
  if (round.activePlayer.currentPigsPosition === "leaning-jowler") {
    pigsImgElement.src = "./assets/images/leaning-jowler.png";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "snouter") {
    pigsImgElement.src = "./assets/images/snouter.png";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "sider") {
    pigsImgElement.src = "./assets/images/sider.png";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "makin-bacon") {
    pigsImgElement.src = "./assets/images/makin-bacon.png";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "razorback") {
    pigsImgElement.src = "./assets/images/razorback.png";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "piggy-back") {
    pigsImgElement.src = "./assets/images/piggy-back.png";
    return;
  }
  if (round.activePlayer.currentPigsPosition === "pig-out") {
    pigsImgElement.src = "./assets/images/pig-out.png";
    return;
  }
}

rollBtnElement.addEventListener("click", () => {
  rollThePigsPlay();
  console.log(round.activePlayer.currentPigsPosition);
});
