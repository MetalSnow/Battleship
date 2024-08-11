import Gameboard from './gameBoard';

export default class Player {
  constructor() {
    this.gameBoard = this.getGameBoard();
    this.isturn = true;
  }

  getIsTurn() {
    return this.isturn;
  }

  getGameBoard() {
    const board = new Gameboard();
    board.generateBoard();

    return board;
  }

  switchTurn() {
    this.isturn = false;
  }
}
