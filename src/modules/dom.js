import { game } from './gameController';
import hitIcon from '../icons/hit.png';
import missedIcon from '../icons/missed.png';
import winIcon from '../icons/win.png';
import loseIcon from '../icons/lose.png';
export {
  setupInitialDisplay,
  updateBoardUI,
  startBtn,
  renderPlayerMove,
  renderComputerMove,
  playerBoardDiv,
  computerBoardDiv,
  renderBoard,
  renderShips,
  randomizeBtn,
  renderWinner,
};

const startBtn = document.querySelector('#start-game');
const homeDiv = document.querySelector('.home-page');
const gameContainer = document.querySelector('.game-container');
const playerBoardDiv = document.querySelector('.player-board');
const computerBoardDiv = document.querySelector('.computer-board');
const randomizeBtn = document.querySelector('#random');
const playBtn = document.querySelector('#play-game');
const dialog = document.querySelector('dialog');
const dialogBackBtn = document.querySelector('#back');
const dialogPlayBtn = document.querySelector('#play-again');

startBtn.addEventListener('click', () => {
  game.startGame();
});

playBtn.addEventListener('click', () => {
  game.hilightActiveBoard();
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
});

const setupInitialDisplay = (playerBoard, cpuBoard) => {
  homeDiv.style.display = 'none';
  gameContainer.style.display = 'flex';

  renderBoard(playerBoardDiv, playerBoard, 'player');
  renderBoard(computerBoardDiv, cpuBoard, 'cpu');

  renderShips('player', playerBoard);

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

// rendering functions
const renderWinner = (playerType) => {
  const h1 = document.querySelector('.win-lose');
  if (playerType === 'player') {
    h1.textContent = 'You Have Won!';
    const winImg = new Image();
    winImg.src = winIcon;
    winImg.style.width = '35px';

    h1.appendChild(winImg);
  } else {
    h1.textContent = 'You Have Lost!';
    const loseImg = new Image();
    loseImg.src = loseIcon;
    loseImg.style.width = '35px';

    h1.appendChild(loseImg);
  }

  dialog.showModal();
};

const renderComputerMove = (ship, player, playerBoard, x, y) => {
  const playerCells = document.querySelectorAll('.player-cell');

  playerCells.forEach((cell) => {
    if (+cell.dataset.row === x && +cell.dataset.col === y) {
      const hitImg = new Image();
      const missedImg = new Image();

      hitImg.src = hitIcon;
      missedImg.src = missedIcon;

      hitImg.style.width = '25px';
      missedImg.style.width = '25px';

      if (!cell.firstChild) {
        if (playerBoard[x][y] === 1) {
          cell.appendChild(hitImg);
          cell.style.backgroundColor = '#ff000054';
          highlightSurroundingCells(x, y, ship, player.gameBoard, 'player');
        } else {
          cell.appendChild(missedImg);
          cell.style.backgroundColor = '#ffff0045';
        }
      }
    }
  });
};

const renderPlayerMove = (cell, cpu, cpuBoard, x, y) => {
  const hitImg = new Image();
  const missedImg = new Image();

  hitImg.src = hitIcon;
  missedImg.src = missedIcon;

  hitImg.style.width = '25px';
  missedImg.style.width = '25px';

  if (typeof cpuBoard[x][y] === 'object' && cpuBoard[x][y] !== null) {
    cell.appendChild(hitImg);
    cell.style.backgroundColor = '#ff000054';
    highlightSurroundingCells(x, y, cpuBoard[x][y], cpu.gameBoard, 'cpu');
  } else {
    cell.appendChild(missedImg);
    cell.style.backgroundColor = '#ffff0045';
  }

  cell.style.pointerEvents = 'none';
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
