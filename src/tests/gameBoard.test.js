import Gameboard from '../modules/gameBoard';
import getCoord from './testHelpers';

describe('Game Board', () => {
  const game = new Gameboard();
  game.generateBoard();

  test('Board generated', () => {
    expect(game.board.length).toEqual(10);
    expect(game.board.every((row) => row.length === 10)).toBe(true);
  });

  test('Place ships', () => {
    const shipLength = 1;
    game.placeShip(shipLength);

    let shipCells = getCoord(game.getBoard()).shipCells;

    // The ship should occupy `shipLength` cells
    expect(shipCells).toEqual(shipLength);
  });

  test('receive attack', () => {
    // miss attack
    game.receiveAttack([2, 3]);

    expect(game.board[2][3]).toBe(0);

    // hit attack
    let [x, y] = getCoord(game.getBoard()).coord;

    game.receiveAttack([x, y]);
    expect(game.board[x][y]).toBe(1);

    // ship hits received
    expect(game.ships[0].hitsReceived).toBe(1);

    // ship sunk
    expect(game.ships[0].getHitsReceived()).toBe(1);
    expect(game.ships[0].getSunkStatus()).toBe(true);
  });
});
