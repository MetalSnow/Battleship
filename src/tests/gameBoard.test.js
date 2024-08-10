import Gameboard from '../modules/gameBoard';

describe('Game Board', () => {
  const game = new Gameboard();
  game.generateBoard();

  test('Board generated', () => {
    expect(game.board.length).toEqual(10);
  });

  test('place ships', () => {
    //test board bounds

    expect(() => game.placeShips(4, [3, 7], 'horizontal')).toThrow();

    // check for ships place and neighbors
    game.placeShips(1, [3, 4], 'horizontal');

    expect(typeof game.board[3][4]).toEqual('object');
    expect(game.board[3][5]).toBeNull();
    expect(game.board[3][3]).toBeNull();
    expect(game.board[2][4]).toBeNull();

    game.placeShips(4, [6, 4], 'vertical');
    expect(typeof game.board[8][4]).toEqual('object');
  });

  test('receive attack', () => {
    // miss attack
    game.receiveAttack([2, 3]);

    expect(game.board[2][3]).toBe(0);

    // hit attack
    game.receiveAttack([6, 4]);
    expect(game.board[6][4]).toBe(1);

    // ship hits received
    expect(game.ships[1].hitsReceived).toBe(1);

    // ship sunk
    game.receiveAttack([7, 4]);
    game.receiveAttack([8, 4]);
    game.receiveAttack([9, 4]);

    expect(game.ships[1].getHitsReceived()).toBe(4);
    expect(game.ships[1].getSunkStatus()).toBe(true);
  });
});
