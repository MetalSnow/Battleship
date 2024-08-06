import Gameboard from '../modules/gameBoard';

describe('Game Board', () => {
  const game = new Gameboard();

  test('Board generated', () => {
    game.generateBoard();

    expect(game.board.length).toEqual(10);
  });
});
