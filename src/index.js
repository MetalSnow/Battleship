import './style.css';
import { changeDisplay, startBtn } from './modules/dom';
import gameController from './modules/gameController';

startBtn.addEventListener('click', changeDisplay);

gameController();
