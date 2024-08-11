import Player from './players';

export default class humanPlayer extends Player {
  sendAttack(board, coord) {
    board.receiveAttack(coord);
    this.switchTurn();
  }
}
