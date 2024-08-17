import hitIcon from '../icons/hit.png';
import winIcon from '../icons/win.png';
import loseIcon from '../icons/lose.png';
import missedIcon from '../icons/missed.png';
import { dialog, highlightSurroundingCells } from './dom';

export default class Renderer {
  renderBoard(div, gameBoard, name) {
    for (let i = 0; i < gameBoard.length; i++) {
      for (let j = 0; j < gameBoard[i].length; j++) {
        const cell = document.createElement('button');
        cell.classList.add(`${name}-cell`);
        cell.dataset.row = i;
        cell.dataset.col = j;
        div.appendChild(cell);
      }
    }
  }
  renderShips(name, board) {
    const cells = document.querySelectorAll(`.${name}-cell`);

    cells.forEach((cell) => {
      let [x, y] = [cell.dataset.row, cell.dataset.col];
      if (board[x][y] !== '' && board[x][y] !== null) {
        cell.style = 'background-color: #2f4f4fdc';
      }
    });
  }

  renderComputerMove(ship, player, playerBoard, x, y) {
    const playerCells = document.querySelectorAll('.player-cell');

    playerCells.forEach((cell) => {
      if (+cell.dataset.row === x && +cell.dataset.col === y) {
        const hitImg = new Image();
        const missedImg = new Image();

        hitImg.src = hitIcon;
        missedImg.src = missedIcon;

        hitImg.style.width = '25px';
        missedImg.style.width = '25px';

        if (!cell.firstChild) {
          if (playerBoard[x][y] === 1) {
            cell.appendChild(hitImg);
            cell.style.backgroundColor = '#ff000054';
            highlightSurroundingCells(x, y, ship, player.gameBoard, 'player');
          } else {
            cell.appendChild(missedImg);
            cell.style.backgroundColor = '#ffff0045';
          }
        }
      }
    });
  }

  renderPlayerMove(cell, cpu, cpuBoard, x, y) {
    const hitImg = new Image();
    const missedImg = new Image();

    hitImg.src = hitIcon;
    missedImg.src = missedIcon;

    hitImg.style.width = '25px';
    missedImg.style.width = '25px';

    if (typeof cpuBoard[x][y] === 'object' && cpuBoard[x][y] !== null) {
      cell.appendChild(hitImg);
      cell.style.backgroundColor = '#ff000054';
      highlightSurroundingCells(x, y, cpuBoard[x][y], cpu.gameBoard, 'cpu');
    } else {
      cell.appendChild(missedImg);
      cell.style.backgroundColor = '#ffff0045';
    }

    cell.style.pointerEvents = 'none';
  }

  renderWinner(playerType) {
    const h1 = document.querySelector('.win-lose');
    if (playerType === 'player') {
      h1.textContent = 'You Have Won!';
      const winImg = new Image();
      winImg.src = winIcon;
      winImg.style.width = '35px';

      h1.appendChild(winImg);
    } else {
      h1.textContent = 'You Have Lost!';
      const loseImg = new Image();
      loseImg.src = loseIcon;
      loseImg.style.width = '35px';

      h1.appendChild(loseImg);
    }

    dialog.showModal();
  }
}
