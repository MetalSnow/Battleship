import bfsFindValidPosition from './helperBFS';
import Random from './random';
import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.board = [];
    this.ships = [];
    this.random = new Random();
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

  isAreaFree(x, y, length, orientation) {
    for (let i = 0; i < length; i++) {
      if (orientation === 'horizontal') {
        if (y + i >= 10 || this.board[x][y + i] !== '') {
          return false;
        }
      } else {
        if (x + i >= 10 || this.board[x + i][y] !== '') {
          return false;
        }
      }
    }
    return true;
  }

  placeShip(length) {
    const ship = new Ship(length);
    let placed = false;
    // get neighbors of ship
    const horizontalNeighbors = this.getNeighbors(length).horizontal;
    const verticalNeighbors = this.getNeighbors(length).vertical;

    while (!placed) {
      let orientation = this.random.getRandomOrientation();
      let [startX, startY] = this.random.getRandomPlaceCoord(
        length,
        orientation
      ); // Start BFS from a random position

      const validPosition = bfsFindValidPosition(
        startX,
        startY,
        length,
        orientation,
        this.isAreaFree.bind(this)
      );

      if (validPosition) {
        const [x, y] = validPosition;

        // Place the ship at the valid position found by BFS
        for (let i = 0; i < length; i++) {
          if (orientation === 'horizontal') {
            this.board[x][y + i] = ship;
            ship.orientation = orientation;

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
            ship.orientation = orientation;

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
        placed = true;
        // Store ship in ships array
        this.ships.push(ship);
      }
    }

    if (!placed) {
      throw new Error('Failed to place ship after maximum attempts.');
    }
  }

  placeAllShips() {
    let arrLength = [1, 1, 1, 1, 2, 2, 2, 3, 3, 4];
    for (let i = 0; i < arrLength.length; i++) {
      this.placeShip(arrLength[i]);
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
