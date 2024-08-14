import { game } from './gameController';

export {
  changeDisplay,
  startBtn,
  playerBoardDiv,
  computerBoardDiv,
  renderBoard,
  renderShips,
  randomizeBtn,
};

const startBtn = document.querySelector('#start-game');
const homeDiv = document.querySelector('.home-page');
const gameContainer = document.querySelector('.game-container');
const playerBoardDiv = document.querySelector('.player-board');
const computerBoardDiv = document.querySelector('.computer-board');
const randomizeBtn = document.querySelector('#random');
const playBtn = document.querySelector('#play-game');

playBtn.addEventListener('click', () => {
  game.playGame();
});

const changeDisplay = () => {
  homeDiv.style.display = 'none';
  gameContainer.style.display = 'flex';
};

const renderBoard = (div, gameBoard, name) => {
  for (let i = 0; i < gameBoard.length; i++) {
    for (let j = 0; j < gameBoard[i].length; j++) {
      const cell = document.createElement('button');
      cell.classList.add(`${name}-cell`);
      cell.dataset.row = i;
      cell.dataset.col = j;
      div.appendChild(cell);
    }
  }
};

const renderShips = (name, board) => {
  const cells = document.querySelectorAll(`.${name}-cell`);

  cells.forEach((cell) => {
    let [x, y] = [cell.dataset.row, cell.dataset.col];
    if (board[x][y] !== '' && board[x][y] !== null) {
      cell.style = 'background-color: #2f4f4fdc';
    }
  });
};
