import computerPlayer from '../modules/computerPlayer';
import humanPlayer from '../modules/humanPlayer';
import getCoord from './testHelpers';

describe('players', () => {
  const human = new humanPlayer();
  const computer = new computerPlayer();
  const humanBoard = human.gameBoard.getBoard();
  const computerBoard = computer.gameBoard.getBoard();

  test('players game board', () => {
    expect(humanBoard.length).toBe(10);
    expect(computerBoard.length).toBe(10);
  });

  test('(Human Turn)sending attack', () => {
    expect(typeof human.sendAttack).toBe('function');

    // place ship
    computer.gameBoard.placeShips(2);

    // attack missed
    human.sendAttack(computer.gameBoard, [1, 3]);

    expect(computerBoard[1][3]).toBe(0);

    // attack hit
    const [x, y] = getCoord(computerBoard).coord;

    human.sendAttack(computer.gameBoard, [x, y]);

    expect(computerBoard[x][y]).toBe(1);

    expect(human.getIsTurn()).toBeFalsy();
  });

  test('(CPU Turn)sending attack', () => {
    expect(typeof computer.sendAttack).toBe('function');
    // place ship
    human.gameBoard.placeShips(1);

    // attack hit
    computer.sendAttack(human.gameBoard);
    expect(computer.getIsTurn()).toBeFalsy();
  });
});
