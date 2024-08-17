import gameController from './gameController';
import missedIcon from '../icons/missed.png';
export {
  setupInitialDisplay,
  updateBoardUI,
  startBtn,
  playerBoardDiv,
  computerBoardDiv,
  highlightSurroundingCells,
  dialog,
};

const startBtn = document.querySelector('#start-game');
const homeDiv = document.querySelector('.home-page');
const gameContainer = document.querySelector('.game-container');
const playerBoardDiv = document.querySelector('.player-board');
const computerBoardDiv = document.querySelector('.computer-board');
const randomizeBtn = document.querySelector('#random');
const restartBtn = document.querySelector('#restart');
const playBtn = document.querySelector('#playBtn');
const startDiv = document.querySelector('.cpu-btns');
const dialog = document.querySelector('dialog');
const dialogBackBtn = document.querySelector('#back');
const dialogPlayBtn = document.querySelector('#play-again');
const checkBoxM = document.querySelector('#medium');
const checkBoxH = document.querySelector('#hard');

const game = gameController();

checkBoxM.addEventListener('change', () => {
  checkBoxM.checked = true;
  checkBoxH.checked = false;
});
checkBoxH.addEventListener('change', () => {
  checkBoxH.checked = true;
  checkBoxM.checked = false;
});

startBtn.addEventListener('click', () => {
  game.startGame();
});

restartBtn.addEventListener('click', () => {
  deleteBoardUI(playerBoardDiv);
  deleteBoardUI(computerBoardDiv);
  game.resetGame();
  game.startGame();
  dialog.close();
  startDiv.style.visibility = 'visible';
  startDiv.style.opacity = '1';
  playerBoardDiv.style.opacity = '';
  randomizeBtn.style.pointerEvents = '';
});

playBtn.addEventListener('click', () => {
  game.hilightActiveBoard();
  startDiv.style.opacity = '0';
  startDiv.style.visibility = 'hidden';
  randomizeBtn.style.pointerEvents = 'none';
});

randomizeBtn.addEventListener('click', () => {
  deleteBoardUI(playerBoardDiv);
  game.randomizePlayerShips();
});

dialogPlayBtn.addEventListener('click', () => {
  deleteBoardUI(playerBoardDiv);
  deleteBoardUI(computerBoardDiv);
  game.resetGame();
  game.startGame();
  game.hilightActiveBoard();
  dialog.close();
});

dialogBackBtn.addEventListener('click', () => {
  deleteBoardUI(playerBoardDiv);
  deleteBoardUI(computerBoardDiv);
  game.resetGame();
  game.startGame();
  dialog.close();
  startDiv.style.visibility = 'visible';
  startDiv.style.opacity = '1';
  randomizeBtn.style.pointerEvents = '';
});

const setupInitialDisplay = () => {
  homeDiv.style.display = 'none';
  gameContainer.style.display = 'flex';

  computerBoardDiv.style.opacity = '0.3';
  computerBoardDiv.style.pointerEvents = 'none';

  // Add events to cpu cells
  const cpuCells = document.querySelectorAll('.cpu-cell');
  cpuCells.forEach((cell) => {
    cell.addEventListener('click', () => {
      game.playerMove(cell);
      game.checkWinner();
      game.hilightActiveBoard();
      game.computerMove();
    });
  });
};

const updateBoardUI = (playerType) => {
  if (playerType === 'player') {
    playerBoardDiv.style.opacity = '0.7';
    playerBoardDiv.style.shadowBox = '';
    playerBoardDiv.style.border = '2px solid #2e0606';
    computerBoardDiv.style.pointerEvents = '';
    computerBoardDiv.style.opacity = '';
    computerBoardDiv.style = 'box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);';
    computerBoardDiv.style.border = '2px solid yellow';
  } else {
    computerBoardDiv.style.pointerEvents = 'none';
    computerBoardDiv.style.opacity = '0.7';
    computerBoardDiv.style.shadowBox = '';
    computerBoardDiv.style.border = '2px solid #2e0606';
    playerBoardDiv.style.opacity = '';
    playerBoardDiv.style = 'box-shadow: 0 0 6px 1px rgba(0, 0, 0, 0.3);';
    playerBoardDiv.style.border = '2px solid yellow';
  }
};

const highlightSurroundingCells = (x, y, ship, gameBoard, target) => {
  const spots = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  spots.forEach((spot) => {
    const row = +x + spot[0];
    const col = +y + spot[1];

    if (col >= 0 && col < 10 && row >= 0 && row < 10) {
      const cell = document.querySelector(
        `.${target}-cell[data-col="${col}"][data-row="${row}"]`
      );

      if (!cell.firstChild) {
        const missedImg = new Image();
        missedImg.src = missedIcon;
        missedImg.style.width = '25px';

        cell.style.pointerEvents = 'none';
        cell.style.backgroundColor = '#80808046';
        missedImg.style.opacity = '0.7';

        cell.appendChild(missedImg);
      }
    }
  });

  const horizontalNeighbors = gameBoard.getNeighbors(ship.length).horizontal;
  const verticalNeighbors = gameBoard.getNeighbors(ship.length).vertical;

  const hits =
    target === 'player' ? ship.getHitsReceived() : ship.getHitsReceived() + 1;

  if (hits === ship.length) {
    if (ship.orientation === 'horizontal') {
      let head = +y;

      while (
        head - 1 >= 0 &&
        head - 1 < 10 &&
        gameBoard.board[x][head - 1] === 1
      ) {
        head -= 1;
      }

      for (let [dx, dy] of horizontalNeighbors) {
        const nx = +x + dx;
        const ny = head + dy;

        if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
          const cell = document.querySelector(
            `.${target}-cell[data-col="${ny}"][data-row="${nx}"]`
          );

          if (!cell.firstChild || gameBoard.board[nx][ny] === 0) {
            deleteBoardUI(cell);
            const missedImg = new Image();
            missedImg.src = missedIcon;
            missedImg.style.width = '25px';

            cell.style.pointerEvents = 'none';
            cell.style.backgroundColor = '#80808046';
            missedImg.style.opacity = '0.7';

            cell.appendChild(missedImg);
          }
        }
      }
    } else if (ship.orientation === 'vertical') {
      let head = +x;

      while (
        head - 1 >= 0 &&
        head - 1 < 10 &&
        gameBoard.board[head - 1][y] === 1
      ) {
        head -= 1;
      }

      for (let [dx, dy] of verticalNeighbors) {
        const nx = head + dx;
        const ny = +y + dy;

        if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
          const cell = document.querySelector(
            `.${target}-cell[data-col="${ny}"][data-row="${nx}"]`
          );

          if (!cell.firstChild || gameBoard.board[nx][ny] === 0) {
            deleteBoardUI(cell);
            const missedImg = new Image();
            missedImg.src = missedIcon;
            missedImg.style.width = '25px';

            cell.style.pointerEvents = 'none';
            cell.style.backgroundColor = '#80808046';
            missedImg.style.opacity = '0.7';

            cell.appendChild(missedImg);
          }
        }
      }
    }
  }
};

const deleteBoardUI = (boardDiv) => {
  while (boardDiv.firstChild) {
    boardDiv.removeChild(boardDiv.firstChild);
  }
};
