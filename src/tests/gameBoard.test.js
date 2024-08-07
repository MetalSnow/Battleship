import Gameboard from '../modules/gameBoard';
import Ship from '../modules/ship';

describe('Game Board', () => {
  const game = new Gameboard();
  game.generateBoard();

  test('Board generated', () => {
    expect(game.board.length).toEqual(10);
  });

  const ship = new Ship(3);
  const ship2 = new Ship(2);

  test('place ships', () => {
    game.placeShips(ship, [2, 3], 'horizontal');

    expect(game.board[2][3]).toEqual(ship);
    expect(game.board[2][4]).toEqual(ship);
    expect(game.board[2][5]).toEqual(ship);

    game.placeShips(ship2, [7, 4], 'vertical');

    expect(game.board[7][4]).toEqual(ship2);
    expect(game.board[8][4]).toEqual(ship2);
  });

  test('receive attack', () => {
    game.receiveAttack([2, 3]);
    game.receiveAttack([2, 4]);
    game.receiveAttack([2, 5]);

    expect(ship.hitsReceived).toBe(3);
    expect(ship.sunk).toBe(true);

    expect(game.board[2][3]).toBe(1);
    expect(game.board[2][4]).toBe(1);
    expect(game.board[2][5]).toBe(1);

    // check for missed attacks
    game.receiveAttack([4, 6]);

    expect(game.board[4][6]).toBe(0);
  });
});
