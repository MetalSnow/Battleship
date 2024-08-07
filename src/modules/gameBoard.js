export default class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
  }

  generateBoard() {
    for (let i = 0; i < 10; i++) {
      this.board.push([]);
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = '';
      }
    }
  }

  getBoard() {
    return this.board;
  }

  placeShips(ship, coord, orientation) {
    const [x, y] = coord;

    if (orientation === 'horizontal' && x + ship.length > this.board.length) {
      throw new Error('Ship goes out of bounds horizontally.');
    }
    if (orientation === 'vertical' && y + ship.length > this.board[0].length) {
      throw new Error('Ship goes out of bounds vertically.');
    }

    // Store ships in ship array
    this.ships.push(ship);

    for (let i = 0; i < ship.length; i++) {
      if (orientation === 'horizontal') {
        if (this.board[x][y + i] === '') {
          this.board[x][y + i] = ship;
        } else {
          return 'Place is already full';
        }
      } else {
        if (this.board[x + i][y] === '') {
          this.board[x + i][y] = ship;
        } else {
          return 'Place is already full';
        }
      }
    }
  }

  receiveAttack(coord) {
    const [x, y] = coord;

    if (this.board[x][y] !== '') {
      this.board[x][y].hit();
      this.board[x][y] = 1;
    } else {
      this.board[x][y] = 0;
    }

    if (this.reportSunkships()) {
      return 'Game Finished';
    }
  }

  reportSunkships() {
    return this.ships.every((ship) => ship.sunk === true);
  }
}
