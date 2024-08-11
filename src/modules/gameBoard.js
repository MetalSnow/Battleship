import Ship from './ship';

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

  getShips() {
    return this.ships;
  }

  getRandomOrientation() {
    const orientation = ['vertical', 'horizontal'];

    return orientation[Math.floor(Math.random() * 2)];
  }

  getRandomPlaceCoord(length, orientation) {
    const horizontalBounds = [
      [9, 9],
      [9, 8],
      [9, 7],
      [9, 6],
    ];
    const verticalBounds = [
      [9, 9],
      [8, 9],
      [7, 9],
      [6, 9],
    ];

    let x;
    let y;

    if (orientation === 'horizontal') {
      let bounds = horizontalBounds[length - 1];
      x = Math.floor(Math.random() * bounds[0]);
      y = Math.floor(Math.random() * bounds[1]);
    } else {
      let bounds = verticalBounds[length - 1];
      x = Math.floor(Math.random() * bounds[0]);
      y = Math.floor(Math.random() * bounds[1]);
    }

    return [x, y];
  }

  placeShips(length) {
    const ship = new Ship(length);
    const orientation = this.getRandomOrientation();
    const [x, y] = this.getRandomPlaceCoord(length, orientation);

    if (this.board[x][y] !== '' || this.board[x][y] === null) {
      this.placeShips(length);
      return;
    }

    // Store ship in ships array
    this.ships.push(ship);

    // get neighbors of ship
    const horizontalNeighbors = this.getNeighbors(length).horizontal;

    const verticalNeighbors = this.getNeighbors(length).vertical;

    for (let i = 0; i < length; i++) {
      if (orientation === 'horizontal') {
        this.board[x][y + i] = ship;

        for (let [dx, dy] of horizontalNeighbors) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.board[nx][ny] !== ship) {
              this.board[nx][ny] = null;
            }
          }
        }
      } else {
        this.board[x + i][y] = ship;
        for (let [dx, dy] of verticalNeighbors) {
          const nx = x + dx;
          const ny = y + dy;

          if (nx >= 0 && nx < 10 && ny >= 0 && ny < 10) {
            if (this.board[nx][ny] !== ship) {
              this.board[nx][ny] = null;
            }
          }
        }
      }
    }
  }

  receiveAttack(coord) {
    const [x, y] = coord;

    if (this.board[x][y] === '' || this.board[x][y] === null) {
      this.board[x][y] = 0;
    } else {
      this.board[x][y].hit();
      this.board[x][y] = 1;
    }

    if (this.reportSunkships()) {
      return 'Game Finished';
    }
  }

  reportSunkships() {
    return this.ships.every((ship) => ship.sunk === true);
  }

  getNeighbors(length) {
    const neighbors = {
      horizontal: [
        [0, -1],
        [0, length],
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [-1, length - 2],
        [-1, length - 1],
        [-1, length],
        [1, -1],
        [1, 0],
        [1, 1],
        [1, length - 2],
        [1, length - 1],
        [1, length],
      ],
      vertical: [
        [-1, 0],
        [length, 0],
        [-1, -1],
        [0, -1],
        [1, -1],
        [length - 2, -1],
        [length - 1, -1],
        [length, -1],
        [-1, 1],
        [0, 1],
        [1, 1],
        [length - 2, 1],
        [length - 1, 1],
        [length, 1],
      ],
    };
    return neighbors;
  }
}
