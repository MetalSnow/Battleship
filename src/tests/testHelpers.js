export default function getCoord(board) {
  let coord;
  let shipCells = 0;
  board.forEach((row, rowInd) => {
    row.forEach((cell, cellInd) => {
      if (cell !== '' && cell !== null) {
        shipCells++;
        coord = [rowInd, cellInd];
      }
    });
  });
  return { coord, shipCells };
}
