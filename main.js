let currentGame;
let darkModeOn = false;
let winnerDeclared = false;
const boxOptions = {
  zeroo: 0,
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
}

const userScore = document.querySelector('.user-score');
const cpuScore = document.querySelector('.cpu-score');
const gameOutcome = document.querySelector('.outcome');
const toggleUserX = document.querySelector('#X');
const toggleUserO = document.querySelector('#O');
const toggleLightMode = document.querySelector('#light');
const toggleDarkMode = document.querySelector('#dark');
const gameBoard = document.querySelector('.board')
const pieceZero = document.querySelector('.pieceZero');
const pieceOne = document.querySelector('.pieceOne');
const pieceTwo = document.querySelector('.pieceTwo');
const pieceThree = document.querySelector('.pieceThree');
const pieceFour = document.querySelector('.pieceFour');
const pieceFive = document.querySelector('.pieceFive');
const pieceSix = document.querySelector('.pieceSix');
const pieceSeven = document.querySelector('.pieceSeven');
const pieceEight = document.querySelector('.pieceEight');
const resetBtn = document.querySelector('.reset-btn');
const resetBoardBtn = document.querySelector('.reset-board-btn');
const cpuFirstBtn = document.querySelector('.cpu-first-btn')
const boardBackgrounds = document.querySelector('main');
const h1 = document.querySelector('h1');
const btns = document.querySelectorAll('button');
const playerBackgrounds = document.querySelectorAll('.player')
const h2s = document.querySelectorAll('h2')
const h3s = document.querySelectorAll('h3')
const toggles = document.querySelectorAll('.toggle')
const ps = document.querySelectorAll('p')
const boardSections = document.querySelectorAll('.board-section')

const piecePlacements = [
  pieceZero,
  pieceOne,
  pieceTwo,
  pieceThree,
  pieceFour,
  pieceFive,
  pieceSix,
  pieceSeven,
  pieceEight,
]

const makeNewGame = () => {
  currentGame = new Game();
}

const restartGame = () => {
  currentGame.restartGame()
  cpuScore.innerText = `Score: ${currentGame.enemy.wins}`
  userScore.innerText = `Score: ${currentGame.user.wins}`
}

const resetBoard = () => {
  currentGame.resetGame()
  updateBoard()
  winnerDeclared = false
  gameOutcome.classList.add('hidden')
  cpuFirstBtn.classList.remove('collapsed')
}

const switchToDarkMode = () => {
  boardBackgrounds.classList.add('darkmode-1');
  h1.classList.add('darkmode-text');

  if (currentGame.user.token === 'X') {
    toggleUserX.classList.add('darkmode-2');
  } else {
    toggleUserO.classList.add('darkmode-2');
  }
  
  for (const player of playerBackgrounds) {
    player.classList.add('darkmode-2');
  }

  for (const h2 of h2s) {
    h2.classList.add('darkmode-text');
  }

  for (const h3 of h3s) {
    h3.classList.add('darkmode-text');
  }

  for (const toggle of toggles) {
    toggle.classList.add('darkmode-1');
  }

  for (const btn of btns) {
    btn.classList.add('darkmode-1','darkmode-text', 'darkmode-box-shadow');
  }

  for (const p of ps) {
    p.classList.add('darkmode-text');
  }

  for (const boardSection of boardSections) {
    boardSection.classList.add('darkmode-1', 'darkmode-box-shadow');
  }
}

const switchToLightMode = () => {
  boardBackgrounds.classList.remove('darkmode-1');
  h1.classList.remove('darkmode-text');

  if (currentGame.user.token === 'X') {
    toggleUserX.classList.remove('darkmode-2');
  } else {
    toggleUserO.classList.remove('darkmode-2');
  }

  for (const player of playerBackgrounds) {
    player.classList.remove('darkmode-2');
  }

  for (const h2 of h2s) {
    h2.classList.remove('darkmode-text');
  }

  for (const h3 of h3s) {
    h3.classList.remove('darkmode-text');
  }

  for (const toggle of toggles) {
    toggle.classList.remove('darkmode-1');
  }

  for (const btn of btns) {
    btn.classList.remove('darkmode-1','darkmode-text', 'darkmode-box-shadow');
  }

  for (const p of ps) {
    p.classList.remove('darkmode-text');
  }

  for (const boardSection of boardSections) {
    boardSection.classList.remove('darkmode-1', 'darkmode-box-shadow');
  }
}

const togglePlayerSymbols = () => {
  if (currentGame.user.token === 'X') {
    currentGame.user.token = 'O';
    currentGame.enemy.token = 'X';
    if (darkModeOn) {
      toggleUserO.classList.add('selected', 'darkmode-2');
      toggleUserX.classList.remove('selected', 'darkmode-2');
    } else {
      toggleUserO.classList.add('selected');
      toggleUserX.classList.remove('selected');
    } 
    updateBoard()
  } else {
    currentGame.user.token = 'X';
    currentGame.enemy.token = 'O';
    if (darkModeOn) {
      toggleUserO.classList.remove('selected', 'darkmode-2');
      toggleUserX.classList.add('selected', 'darkmode-2');
    } else {
      toggleUserO.classList.remove('selected');
      toggleUserX.classList.add('selected');
    } 
    updateBoard()
  }
}

const toggleLightDarkMode = () => {
  if (darkModeOn) {
    toggleLightMode.classList.add('selected');
    toggleDarkMode.classList.remove('selected', 'darkmode-2');
    darkModeOn = false;
    switchToLightMode()
  } else {
    toggleLightMode.classList.remove('selected');
    toggleDarkMode.classList.add('selected', 'darkmode-2');
    darkModeOn = true;
    switchToDarkMode()
  }
}

const declareWinner = () => {
  if (currentGame.checkBoard() === 0) {
    console.log(currentGame.board)
    gameOutcome.classList.remove('hidden')
    gameOutcome.innerText = "Draw"
    winnerDeclared = true
  } else if (currentGame.checkBoard() === currentGame.user.id) {
    currentGame.user.increaseWinCounter()
    gameOutcome.classList.remove('hidden')
    gameOutcome.innerText = "You Win"
    userScore.innerText = `Score: ${currentGame.user.wins}`
    winnerDeclared = true
  } else if (currentGame.checkBoard() === currentGame.enemy.id) {
    currentGame.enemy.increaseWinCounter()
    gameOutcome.classList.remove('hidden')
    gameOutcome.innerText = "CPU Wins"
    cpuScore.innerText = `Score: ${currentGame.enemy.wins}`
    winnerDeclared = true
  }
}

const updateBoard = () => {
  currentGame.board.flat().forEach((position, index) => {
    if (position === -1) {
      piecePlacements[index].innerText = currentGame.user.token
    } else if (position === -2) {
      piecePlacements[index].innerText = currentGame.enemy.token
    } else {
      piecePlacements[index].innerText = ''
    }
  })
}

const takeTurn = (row, placement) => {
  currentGame.takeTurn(row, placement)
  updateBoard()
  declareWinner()
  if (!winnerDeclared) {
    currentGame.changeTurn()
    setTimeout(cpuTurn, 1000)
  }
}

const cpuTurn = () => {
  currentGame.enemyTurn()
  updateBoard()
  declareWinner()
  currentGame.changeTurn()
}

const cpuGoesFirst = () => {
  currentGame.changeTurn()
  cpuTurn()
  cpuFirstBtn.classList.add('collapsed')
}

window.addEventListener('load', makeNewGame());

toggleUserX.addEventListener('click', togglePlayerSymbols);
toggleUserO.addEventListener('click', togglePlayerSymbols);
toggleLightMode.addEventListener('click', toggleLightDarkMode);
toggleDarkMode.addEventListener('click', toggleLightDarkMode);
resetBtn.addEventListener('click', restartGame);
resetBoardBtn.addEventListener('click', resetBoard);
cpuFirstBtn.addEventListener('click', cpuGoesFirst)

gameBoard.addEventListener('click', function(event) {
  if (winnerDeclared) {
    resetBoard()
  } else if (event.target.classList[0] === 'board-section') {
    takeTurn(boxOptions[event.target.classList[1]], boxOptions[event.target.classList[2]])
    cpuFirstBtn.classList.add('collapsed')
  }
});