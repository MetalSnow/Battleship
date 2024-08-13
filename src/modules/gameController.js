import humanPlayer from './humanPlayer';
import computerPlayer from './computerPlayer';

export default function gameController() {
  const player = new humanPlayer();
  const cpu = new computerPlayer();

  player.gameBoard.placeAllShips();
  cpu.gameBoard.placeAllShips();

  console.log(player.gameBoard.board);
  console.log(cpu.gameBoard.board);

  const newGame = () => {
    cpu.switchTurn();
  };
  newGame();
}
