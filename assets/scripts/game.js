// O jogo tem 2 jogadores
// Cada jogador joga os porcos quantas vezes quiser, acumulando os pontos de cada vez.
// Se cair em pig out, o jogador deve passar a vez e perde todos os pontos. A RODADA ACABA
// O jogador pode passar os porcos a qualquer momento, mantendo os pontos acumulados. A RODADA ACABA
// Quem chegar a 100 pontos primeiro ganha.

const SELECTION_ENUM = {
  leaningJowler: "leaning-jowler",
  snouter: "snouter",
  sider: "sider",
  makingBacon: "makin-bacon",
  razorback: "razorback",
  piggyBack: "piggy-back",
  pigOut: "pig-out",
};

class Game {
  constructor(player1, player2) {
    this.activePlayer = player1;
    this.playerWating = player2;
    this.roundPoints = 0;
    this.roundOver = false;
    this.gameOver = false;
    this.winner = "";
  }

  countRoundPoints() {
    if (
      this.activePlayer.currentPigsPosition === SELECTION_ENUM.leaningJowler
    ) {
      this.roundPoints += 15;
    } else if (
      this.activePlayer.currentPigsPosition === SELECTION_ENUM.snouter
    ) {
      this.roundPoints += 10;
    } else if (this.activePlayer.currentPigsPosition === SELECTION_ENUM.sider) {
      this.roundPoints += 1;
    } else if (
      this.activePlayer.currentPigsPosition === SELECTION_ENUM.makingBacon
    ) {
      this.roundPoints += 0;
    } else if (
      this.activePlayer.currentPigsPosition === SELECTION_ENUM.razorback
    ) {
      this.roundPoints += 5;
    } else if (
      this.activePlayer.currentPigsPosition === SELECTION_ENUM.piggyBack
    ) {
      this.roundPoints += 1;
    } else if (
      this.activePlayer.currentPigsPosition === SELECTION_ENUM.pigOut
    ) {
      this.roundPoints = 0;
      this.roundOver = true;
    }
  }

  addPoints() {
    if (this.roundOver) {
      this.activePlayer.points += this.roundPoints;
    }
  }

  endRound() {
    this.roundOver = true;
  }

  passThePigs(player) {
    // terminar a rodada
    this.activePlayer = player;
    this.roundOver = false;
    this.roundPoints = 0;
  }

  checkWinner() {
    if (this.activePlayer.points >= 100) {
      this.gameOver = true;
    }
  }

  newGame() {
    this.gameOver = false;
    this.activePlayer.points = 0;
    this.playerWating.points = 0;
    this.winner = "";
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.currentPigsPosition = "";
  }

  rollThePigs(position) {
    // escolher aleatóriamente uma posição
    this.currentPigsPosition = SELECTION_ENUM[position];
  }
}

// const round = new Round(new Player("Giulia"));

// round.activePlayer.rollThePigs("leaningJowler");
// round.addPoints();

// round.activePlayer.rollThePigs("sider");
// round.addPoints();

// round.activePlayer.rollThePigs("razorback");
// round.addPoints();

// round.activePlayer.rollThePigs("pigOut");
// round.addPoints();

// console.log(round);
