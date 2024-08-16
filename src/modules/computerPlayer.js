import { bfsFindValidCpuChoice } from './helperBFS';
import Player from './players';

export default class computerPlayer extends Player {
  sendAttack(gameBoard) {
    const [x, y] = this.getComputerChoice();

    const validChoice = bfsFindValidCpuChoice(x, y, gameBoard.board);
    const ship = gameBoard.board[validChoice[0]][validChoice[1]];

    gameBoard.receiveAttack(validChoice);
    return { validChoice, ship };
  }

  getComputerChoice() {
    const coord = [];

    for (let i = 0; i < 2; i++) {
      let n = Math.floor(Math.random() * 10);
      coord.push(n);
    }
    return coord;
  }
}
