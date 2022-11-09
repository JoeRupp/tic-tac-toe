import Player from "./player";

class Game {
  constructor() {
    this.turn = true;
    this.user = new Player(1, 'X');
    this.enemy = new Player(2, 'O');
    this.board = [[0, 1, 2],[ 3, 4, 5], [6, 7, 8]]
  }

  restartGame() {
    this.user.wins = 0
    this.enemy.wins = 0
  }

  resetGame() {
    this.board = [[0, 1, 2],[ 3, 4, 5], [6, 7, 8]]
  }

  changeTurn() {
    this.turn = this.turn ? false : true
  }

  declareWinner() {
    if (this.turn) {
      this.user.wins ++
    } else {
      this.enemy.wins ++
    }
    this.resetGame
  }

  checkBoard() {
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] === this.board[1][i] === this.board[2][i]) {
        declareWinner()
      }
    }

    for (let r = 0; r < 3; r++) {
        if (this.board[r].every( i => i === this.board[r][0])) {
          declareWinner()
        }
    }

    if (this.board[0][0] === this.board[1][1] === this.board[2][2]) {
      declareWinner()
    }

    if (this.board[0][2] === this.board[1][1] === this.board[2][0]) {
      declareWinner()
    }
  }

  takeTurn(row, placement) {
    if (this.turn) {
      this.board = this.board[row].replace(placement, -1)
    } else {
      this.board = this.board[row].replace(placement, -2)
    }
  }

  enemyTurn() {
    const availableSpots = this.board.flat().filter((num) => num > 0)
    const enemyPick = availableSpots[Math.floor(Math.random() * availableSpots.length)]
    if (enemyPick <= 3) {
      this.takeTurn(0, enemyPick)
    } else if (enemyPick >= 6) {
      this.takeTurn(1, enemyPick)
    } else {
      this.takeTurn(2, enemyPick)
    }
  }

}

export default Game;