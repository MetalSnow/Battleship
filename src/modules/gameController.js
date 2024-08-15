import humanPlayer from './humanPlayer';
import computerPlayer from './computerPlayer';
import hitIcon from '../icons/hit.png';
import missedIcon from '../icons/missed.png';
import {
  computerBoardDiv,
  playerBoardDiv,
  randomizeBtn,
  renderBoard,
  renderShips,
} from './dom';

export { game };

const game = gameController();

function gameController() {
  const player = new humanPlayer();
  const cpu = new computerPlayer();

  const playerBoard = player.gameBoard.getBoard();
  const cpuBoard = cpu.gameBoard.getBoard();

  const startGame = () => {
    renderBoard(playerBoardDiv, playerBoard, 'player');
    renderBoard(computerBoardDiv, cpuBoard, 'cpu');

    computerBoardDiv.style.opacity = '0.3';
    computerBoardDiv.style.pointerEvents = 'none';

    player.gameBoard.placeAllShips();
    cpu.gameBoard.placeAllShips();

    renderShips('player', playerBoard);

    cpu.switchTurn();

    randomizeBtn.addEventListener('click', () => {
      while (playerBoardDiv.firstChild) {
        playerBoardDiv.removeChild(playerBoardDiv.firstChild);
      }

      player.randomizeShips();
      renderBoard(playerBoardDiv, player.gameBoard.getBoard(), 'player');
      renderShips('player', player.gameBoard.getBoard());
    });
  };

  const playGame = () => {
    // cpu.switchTurn();
    // player.switchTurn();
    if (player.getIsTurn()) {
      computerBoardDiv.style.opacity = '';
      computerBoardDiv.style.pointerEvents = '';
      computerBoardDiv.style.border = '2px solid yellow';

      playerBoardDiv.style.pointerEvents = 'none';

      // player's turn
      const cpuCells = document.querySelectorAll('.cpu-cell');

      cpuCells.forEach((cell) => {
        cell.addEventListener('click', () => {
          let [x, y] = [cell.dataset.row, cell.dataset.col];

          const hitImg = new Image();
          const missedImg = new Image();

          hitImg.src = hitIcon;
          missedImg.src = missedIcon;

          hitImg.style.width = '25px';
          missedImg.style.width = '25px';

          if (typeof cpuBoard[x][y] === 'object' && cpuBoard[x][y] !== null) {
            cell.appendChild(hitImg);
            cell.style.backgroundColor = '#ff000054';
            highlightSurrounding(x, y, cpuBoard[x][y], cpu.gameBoard);
          } else {
            cell.appendChild(missedImg);
            cell.style.backgroundColor = '#ffff0045';
          }

          cell.style.pointerEvents = 'none';

          player.sendAttack(cpu.gameBoard, [x, y]);

          if (cpuBoard[x][y] === 0) {
            player.switchTurn();
            cpu.switchTurn();
          }
        });
      });
    }

    // cpu's turn
    if (cpu.getIsTurn()) {
      computerBoardDiv.style.pointerEvents = 'none';
      computerBoardDiv.style.border = '2px solid #2e0606';
      playerBoardDiv.style.border = '2px solid yellow';

      const [x, y] = cpu.sendAttack(player.gameBoard);
      console.log(x, y);
      console.log(playerBoard);

      const playerCells = document.querySelectorAll('.player-cell');
      playerCells.forEach((cell) => {
        if (+cell.dataset.row === x && +cell.dataset.col === y) {
          const hitImg = new Image();
          const missedImg = new Image();

          hitImg.src = hitIcon;
          missedImg.src = missedIcon;

          hitImg.style.width = '25px';
          missedImg.style.width = '25px';

          if (playerBoard[x][y] === 1) {
            cell.appendChild(hitImg);
            cell.style.backgroundColor = '#ff000054';
            highlightSurrounding(x, y, playerBoard[x][y], player.gameBoard);
          } else {
            cell.appendChild(missedImg);
            cell.style.backgroundColor = '#ffff0045';
          }

          // if (playerBoard[x][y] === 0) {
          //   player.switchTurn();
          //   cpu.switchTurn();
          // }
        }
      });
    }
  };

  return { startGame, playGame };
}

const highlightSurrounding = (x, y, ship, gameBoard) => {
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
        `.cpu-cell[data-col="${col}"][data-row="${row}"]`
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

  if (ship.getHitsReceived() + 1 === ship.length) {
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
            `.cpu-cell[data-col="${ny}"][data-row="${nx}"]`
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
            `.cpu-cell[data-col="${ny}"][data-row="${nx}"]`
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
      }
    }
  }
};
