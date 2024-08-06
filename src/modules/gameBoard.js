export default class Gameboard {
  constructor() {
    this.board = [];
  }

  generateBoard() {
    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = '';
      }
    }
  }
}
