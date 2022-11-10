let currentGame;
let darkModeOn = false;
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
const playerBackgrounds = document.querySelector('.player');
const boardBackgrounds = document.querySelector('main');

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
}

const switchToDarkMode = () => {

}

const togglePlayerSymbols = () => {
  if (currentGame.user.token === 'X') {
    currentGame.user.token = 'O';
    toggleUserO.classList.remove('selected');
    toggleUserX.classList.add('selected');
    updateBoard()
  } else {
    currentGame.user.token = 'X';
    toggleUserO.classList.add('selected');
    toggleUserX.classList.remove('selected');
    updateBoard()
  }
}

const toggleLightDarkMode = () => {
  if (darkModeOn) {
    toggleLightMode.classList.add('selected');
    toggleDarkMode.classList.remove('selected');
    darkModeOn = false;
  } else {
    toggleLightMode.classList.remove('selected');
    toggleDarkMode.classList.add('selected');
    darkModeOn = true;
    switchToDarkMode()
  }
}

const declareWinner = () => {
  if (currentGame.checkBoard() === 0) {
    gameOutcome.classList.remove('hidden')
    gameOutcome.innerText = "Draw"
  } else if (currentGame.checkBoard() === -1) {
    gameOutcome.classList.remove('hidden')
    gameOutcome.innerText = "You Win"
    userScore.innerText = `Score: ${currentGame.user.wins}`
  } else if (currentGame.checkBoard() === -2) {
    gameOutcome.classList.remove('hidden')
    gameOutcome.innerText = "CPU Wins"
    cpuScore.innerText = `Score: ${currentGame.enemy.wins}`
  }
}

const updateBoard = () => {
  currentGame.board.flat().forEach((position, index) => {
    if (position === -1) {
      piecePlacements[index].innerText = currentGame.user.token
    } else if (position === -2) {
      piecePlacements[index].innerText = currentGame.enemy.token
    }
  })
}

const takeTurn = (row, placement) => {
  currentGame.takeTurn(row, placement)
  updateBoard()
  declareWinner()
  setTimeout(cpuTurn, 1000)
}

const cpuTurn = () => {
  currentGame.enemyTurn()
  updateBoard()
  declareWinner()
}

window.addEventListener('load', makeNewGame());

toggleUserX.addEventListener('click', togglePlayerSymbols);
toggleUserO.addEventListener('click', togglePlayerSymbols);
toggleLightMode.addEventListener('click', toggleLightDarkMode);
toggleDarkMode.addEventListener('click', toggleLightDarkMode);
resetBtn.addEventListener('click', restartGame);

gameBoard.addEventListener('click', function(event) {
  if (event.target.classList[0] === 'board-section') {
    takeTurn(boxOptions[event.target.classList[1]], boxOptions[event.target.classList[2]])
    console.log(currentGame.board)
  }
});