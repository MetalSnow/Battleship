const checkBoxM = document.querySelector('#medium');

export default function getDificulty(board, x, y) {
  let difficultyCheck;

  if (checkBoxM.checked) {
    difficultyCheck = board[x][y] !== 0 && board[x][y] !== 1;
  } else {
    difficultyCheck =
      board[x][y] !== 0 && board[x][y] !== 1 && board[x][y] !== null;
  }

  return difficultyCheck;
}
