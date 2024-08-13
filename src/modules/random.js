export default class Random {
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
    let bounds;

    if (orientation === 'horizontal') {
      bounds = horizontalBounds[length - 1];
      x = Math.floor(Math.random() * bounds[0]);
      y = Math.floor(Math.random() * bounds[1]);
    } else {
      bounds = verticalBounds[length - 1];
      x = Math.floor(Math.random() * bounds[0]);
      y = Math.floor(Math.random() * bounds[1]);
    }

    return [x, y];
  }
  getRandomOrientation() {
    const orientation = ['vertical', 'horizontal'];

    return orientation[Math.floor(Math.random() * 2)];
  }
}
