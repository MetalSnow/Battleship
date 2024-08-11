import Player from './players';

export default class computerPlayer extends Player {
  sendAttack(board) {
    const coord = this.getRandomCoord();

    board.receiveAttack(coord);
    this.switchTurn();
  }

  getRandomCoord() {
    const coord = [];

    for (let i = 0; i < 2; i++) {
      let n = Math.floor(Math.random() * 10);
      coord.push(n);
    }
    return coord;
  }
}
