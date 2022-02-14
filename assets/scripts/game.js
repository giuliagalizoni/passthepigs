// O jogo tem 2 jogadores
// Cada jogador joga os porcos quantas vezes quiser, acumulando os pontos de cada vez.
// Se cair em pig out, o jogador deve passar a vez e perde todos os pontos. A RODADA ACABA
// O jogador pode passar os porcos a qualquer momento, mantendo os pontos acumulados. A RODADA ACABA
// Quem chegar a 100 pontos primeiro ganha.

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.round = 0;
  }
}

class Player {
  constructor(name) {
    this.name = name;
    this.points = 0;
    this.currentPigsPosition = "";
  }

  rollThePigs() {
    // escolher aleatóriamente uma posição
  }

  passThePigs() {
    // terminar a rodada
  }
}
