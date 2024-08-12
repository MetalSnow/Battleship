export { changeDisplay, startBtn };

const startBtn = document.querySelector('#start-game');
const homeDiv = document.querySelector('.home-page');
const gameContainer = document.querySelector('.game-container');
const playerBoard = document.querySelector('.player-board');
const computerBoard = document.querySelector('.computer-board');

function changeDisplay() {
  homeDiv.style.display = 'none';
  gameContainer.style.display = 'flex';
}

function createGameBoard(div) {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('button');
    cell.className = 'cell';
    div.appendChild(cell);
  }
}

createGameBoard(playerBoard);
createGameBoard(computerBoard);
