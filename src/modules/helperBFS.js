import getDificulty from './difficulty';
export { bfsFindValidPosition, bfsFindValidCpuChoice };

function bfsFindValidPosition(startX, startY, length, orientation, isAreaFree) {
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];
  const queue = [[startX, startY]];
  const visited = new Set();
  visited.add(`${startX},${startY}`);

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    // Check if this position is valid for placing the ship
    if (isAreaFree(x, y, length, orientation)) {
      return [x, y];
    }

    // Explore neighbors
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // Ensure the new position is within bounds and not visited
      if (
        nx >= 0 &&
        nx < 10 &&
        ny >= 0 &&
        ny < 10 &&
        !visited.has(`${nx},${ny}`)
      ) {
        queue.push([nx, ny]);
        visited.add(`${nx},${ny}`);
      }
    }
  }

  // If no valid position is found, return null
  return null;
}

function bfsFindValidCpuChoice(startX, startY, board) {
  const directions = [
    [0, 1], // right
    [0, -1], // left
    [1, 0], // down
    [-1, 0], // up
  ];

  const queue = [[startX, startY]];
  const visited = new Set();
  visited.add(`${startX},${startY}`);

  while (queue.length) {
    const [x, y] = queue.shift();

    if (getDificulty(board, x, y)) {
      return [x, y];
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (
        nx >= 0 &&
        nx < 10 &&
        ny >= 0 &&
        ny < 10 &&
        !visited.has(`${nx},${ny}`)
      ) {
        queue.push([nx, ny]);
        visited.add(`${nx},${ny}`);
      }
    }
  }
}
