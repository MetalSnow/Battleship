import './style.css';
import { changeDisplay, startBtn } from './modules/dom';

// const game = new Gameboard();
// game.generateBoard();

// // game.placeShips(4, random(), 'vertical');
// game.placeShips(4);
// game.placeShips(3);
// game.placeShips(3);
// game.placeShips(2);
// game.placeShips(2);
// game.placeShips(2);
// game.placeShips(1);
// game.placeShips(1);
// game.placeShips(1);
// game.placeShips(1);

// console.log(game.getBoard());
// console.log(game.getShips());

startBtn.addEventListener('click', changeDisplay);
