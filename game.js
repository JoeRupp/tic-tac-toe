class Game {
  constructor() {
    this.turn = true;
    this.user = new Player(-1, 'X');
    this.enemy = new Player(-2, 'O');
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
      this.user.increaseWinCounter()
      this.resetGame
      return (-1)
    } else {
      this.enemy.increaseWinCounter()
      this.resetGame
      return (-2)
    }
  }

  declareTie() {
    this.resetGame
    return (0)
  }

  checkBoard() {
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] === this.board[1][i] === this.board[2][i]) {
        return this.declareWinner()
      }
    }

    for (let r = 0; r < 3; r++) {
        if (this.board[r].every( i => i === this.board[r][0])) {
          return this.declareWinner()
        }
    }

    if (this.board[0][0] === this.board[1][1] === this.board[2][2]) {
      return this.declareWinner()
    }

    if (this.board[0][2] === this.board[1][1] === this.board[2][0]) {
      return this.declareWinner()
    }

    if (this.board.flat().filter((num) => num > 0).length === 0) {
      return this.declareTie()
    }
  }

  takeTurn(row, placement) {
    if (this.turn) {
      const index = this.board[row].indexOf(placement)
      this.board[row][index] = -1
      this.changeTurn()
    } else {
      const index = this.board[row].indexOf(placement)
      this.board[row][index] = -2
      this.changeTurn()
    }
  }

  enemyTurn() {
    const availableSpots = this.board.flat().filter((num) => num > 0)
    const enemyPick = availableSpots[Math.floor(Math.random() * availableSpots.length)]
    if (enemyPick <= 3) {
      this.takeTurn(0, enemyPick)
    } else if (enemyPick >= 6) {
      this.takeTurn(2, enemyPick)
    } else {
      this.takeTurn(1, enemyPick)
    }
  }

}
