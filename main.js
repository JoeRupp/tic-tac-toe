let currentGame;
let darkModeOn = false;

const userScore = document.querySelector('.user-score');
const cpuScore = document.querySelector('.cpu-score');
const gameOutcome = document.querySelector('.outcome');
const toggleUserX = document.querySelector('#X');
const toggleUserO = document.querySelector('#O');
const toggleLightMode = document.querySelector('#light');
const toggleDarkMode = document.querySelector('#dark');
const boardSection = document.querySelector('.board-section')
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
const playerBackgrounds = document.querySelector('.player');
const boardBackgrounds = document.querySelector('main');

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
  } else {
    currentGame.user.token = 'X';
    toggleUserO.classList.add('selected');
    toggleUserX.classList.remove('selected');
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

window.addEventListener('load', makeNewGame());

// boardSection.addEventListener('click', );
toggleUserX.addEventListener('click', togglePlayerSymbols);
toggleUserO.addEventListener('click', togglePlayerSymbols);
toggleLightMode.addEventListener('click', toggleLightDarkMode);
toggleDarkMode.addEventListener('click', toggleLightDarkMode);
resetBtn.addEventListener('click', restartGame);