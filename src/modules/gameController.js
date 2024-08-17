import humanPlayer from './humanPlayer';
import computerPlayer from './computerPlayer';
import {
  playerBoardDiv,
  computerBoardDiv,
  setupInitialDisplay,
  updateBoardUI,
} from './dom';
import Renderer from './renderer';

export default function gameController() {
  const player = new humanPlayer();
  const cpu = new computerPlayer();

  const render = new Renderer();

  const startGame = () => {
    player.gameBoard.placeAllShips();
    cpu.gameBoard.placeAllShips();

    render.renderBoard(playerBoardDiv, player.gameBoard.getBoard(), 'player');
    render.renderBoard(computerBoardDiv, cpu.gameBoard.getBoard(), 'cpu');

    render.renderShips('player', player.gameBoard.getBoard());

    setupInitialDisplay();

    render.cpuSunkShip = 0;
    render.playerSunkShip = 0;

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
    render.renderBoard(playerBoardDiv, player.gameBoard.getBoard(), 'player');
    render.renderShips('player', player.gameBoard.getBoard());
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

    render.renderPlayerMove(cell, cpu, cpuBoard, x, y);

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

        render.renderComputerMove(ship, player, playerBoard, x, y);

        if (playerBoard[x][y] === 0) {
          player.switchTurn();
          cpu.switchTurn();
        } else {
          checkWinner();
          if (player.gameBoard.reportSunkships()) return;
          computerMove();
        }

        hilightActiveBoard();
      }, 1100);
    }
  };

  const checkWinner = () => {
    if (player.gameBoard.reportSunkships()) {
      render.renderWinner('cpu');
    } else if (cpu.gameBoard.reportSunkships()) {
      render.renderWinner('player');
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
