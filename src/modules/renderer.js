import hitIcon from '../icons/hit.png';
import winIcon from '../icons/win.png';
import loseIcon from '../icons/lose.png';
import missedIcon from '../icons/missed.png';
import { dialog, highlightSurroundingCells } from './dom';

export default class Renderer {
  constructor() {
    this.playerSunkShip = 0;
    this.cpuSunkShip = 0;
  }

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
        cell.style =
          'background-color: #8c6355bf;border: 0.6mm ridge #5a4037bf;';
      }
    });
  }

  renderComputerMove(ship, player, playerBoard, x, y) {
    const playerCells = document.querySelectorAll('.player-cell');
    const sunkShipsSpan = document.querySelector('.player-ships-record');

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
            cell.style.border = 'none';
            highlightSurroundingCells(x, y, ship, player.gameBoard, 'player');
            if (ship.getSunkStatus()) {
              this.cpuSunkShip += 1;
              sunkShipsSpan.children[0].textContent = this.cpuSunkShip;
            }
          } else {
            cell.appendChild(missedImg);
            cell.style.backgroundColor = '#ffff0045';
          }
        }
      }
    });
  }

  renderPlayerMove(cell, cpu, cpuBoard, x, y) {
    const sunkShipsSpan = document.querySelector('.cpu-ships-record');

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

      if (cpuBoard[x][y].hitsReceived + 1 === cpuBoard[x][y].length) {
        this.playerSunkShip += 1;
        sunkShipsSpan.children[0].textContent = this.playerSunkShip;
      }
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
      h1.parentElement.style.background = 'lightgreen';
      const winImg = new Image();
      winImg.src = winIcon;
      winImg.style.width = '35px';

      h1.appendChild(winImg);
    } else {
      h1.textContent = 'You Have Lost!';
      const loseImg = new Image();
      h1.parentElement.style.background = 'lightcoral';
      loseImg.src = loseIcon;
      loseImg.style.width = '35px';

      h1.appendChild(loseImg);
    }
    dialog.style.display = 'flex';
    dialog.showModal();
  }
}
