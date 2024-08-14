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

    randomizeBtn.addEventListener('click', () => {
      console.log('randomize');
      while (playerBoardDiv.firstChild) {
        playerBoardDiv.removeChild(playerBoardDiv.firstChild);
      }

      player.randomizeShips();
      renderBoard(playerBoardDiv, player.gameBoard.getBoard(), 'player');
      renderShips('player', player.gameBoard.getBoard());
    });
  };

  const playGame = () => {
    cpu.switchTurn();

    computerBoardDiv.style.opacity = '';
    computerBoardDiv.style.pointerEvents = '';
    computerBoardDiv.style.border = '2px solid yellow';

    playerBoardDiv.style.pointerEvents = 'none';

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
          highlightSurrounding(x, y);
        } else {
          cell.appendChild(missedImg);
          cell.style.backgroundColor = '#ffff0045';
        }

        cell.style.pointerEvents = 'none';

        player.sendAttack(cpu.gameBoard, [x, y]);
        player.switchTurn();
        cpu.switchTurn();
      });
    });

    if (cpu.getIsTurn()) {
    }
  };

  return { startGame, playGame };
}

const highlightSurrounding = (x, y, ship) => {
  const spots = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  spots.forEach((spot) => {
    const row = +x + spot[0];
    const col = +y + spot[1];

    console.log(row);
    console.log(col);

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

  if (ship.sunk) {
  }
};
