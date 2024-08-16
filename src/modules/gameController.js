import humanPlayer from './humanPlayer';
import computerPlayer from './computerPlayer';
import {
  computerBoardDiv,
  playerBoardDiv,
  randomizeBtn,
  renderBoard,
  renderComputerMove,
  renderPlayerMove,
  renderShips,
  renderWinner,
  setupInitialDisplay,
  updateBoardUI,
} from './dom';

export { game };

const game = gameController();

function gameController() {
  const player = new humanPlayer();
  const cpu = new computerPlayer();

  const startGame = () => {
    player.gameBoard.placeAllShips();
    cpu.gameBoard.placeAllShips();

    setupInitialDisplay(player.gameBoard.getBoard(), cpu.gameBoard.getBoard());

    if (cpu.getIsTurn()) {
      cpu.switchTurn();
    }

    if (!player.getIsTurn()) {
      player.switchTurn();
    }
  };

  const randomizePlayerShips = () => {
    player.randomizeShips();
    player.gameBoard.placeAllShips();
    renderBoard(playerBoardDiv, player.gameBoard.getBoard(), 'player');
    renderShips('player', player.gameBoard.getBoard());
  };

  const hilightActiveBoard = () => {
    if (player.getIsTurn()) {
      updateBoardUI('player');
    }

    if (cpu.getIsTurn()) {
      updateBoardUI('cpu');
    }
  };

  const playerMove = (cell) => {
    const cpuBoard = cpu.gameBoard.getBoard();
    const [x, y] = [cell.dataset.row, cell.dataset.col];

    renderPlayerMove(cell, cpu, cpuBoard, x, y);

    player.sendAttack(cpu.gameBoard, [x, y]);

    if (cpuBoard[x][y] === 0) {
      player.switchTurn();
      cpu.switchTurn();
    }
  };

  const computerMove = () => {
    if (cpu.getIsTurn()) {
      const playerBoard = player.gameBoard.getBoard();
      setTimeout(() => {
        const obj = cpu.sendAttack(player.gameBoard);

        const [x, y] = obj.validChoice;
        const ship = obj.ship;

        renderComputerMove(ship, player, playerBoard, x, y);

        console.log(playerBoard[x][y]);

        if (playerBoard[x][y] === 0) {
          player.switchTurn();
          cpu.switchTurn();
        } else {
          checkWinner();
          if (player.gameBoard.reportSunkships()) return;
          computerMove();
        }

        hilightActiveBoard();
      }, 0);
    }
  };

  const checkWinner = () => {
    if (player.gameBoard.reportSunkships()) {
      renderWinner('cpu');
    } else if (cpu.gameBoard.reportSunkships()) {
      renderWinner('player');
    }
  };

  const resetGame = () => {
    player.randomizeShips();
    cpu.randomizeShips();
  };

  return {
    startGame,
    hilightActiveBoard,
    playerMove,
    computerMove,
    randomizePlayerShips,
    checkWinner,
    resetGame,
  };
}
