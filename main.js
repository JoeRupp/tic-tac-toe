let currentGame;

const userScore = document.querySelector('.user-score');
const cpuScore = document.querySelector('.cpu-score');
const gameOutcome = document.querySelector('.outcome');
const toggleSelection = document.querySelector('.option');
const board00 = document.querySelector('.box-zero');
const board01 = document.querySelector('.box-one');
const board02 = document.querySelector('.box-two');
const board13 = document.querySelector('.box-three');
const board14 = document.querySelector('.box-four');
const board15 = document.querySelector('.box-five');
const board26 = document.querySelector('.box-six');
const board27 = document.querySelector('.box-seven');
const board28 = document.querySelector('.box-eight');
const resetBtn = document.querySelector('.reset-btn');
const playerBackgrounds = document.querySelector('.player')
const boardBackgrounds = document.querySelector('main')

const startNewGame = () => {
  currentGame = new Game();
  console.log(currentGame)
}

startNewGame()

// EVENT LISTENERS -----------------------------------------