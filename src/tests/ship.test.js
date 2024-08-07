import Ship from '../modules/ship';

describe('Ship', () => {
  const ship = new Ship(2);

  test('ship got hit', () => {
    expect(typeof ship.hit).toBe('function');
    ship.hit();
    expect(ship.hitsReceived).toBe(1);
  });

  test('ship has sunk', () => {
    expect(typeof ship.isSunk).toBe('function');
    ship.hit();
    ship.isSunk();

    expect(ship.sunk).toBe(true);
  });
});
