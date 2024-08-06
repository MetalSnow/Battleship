import './style.css';
import Icon from './icons/drop-down-icon.png';
import { dropdownToggle } from './modules/dropdown.js';
import {
  next,
  previous,
  swipeImage,
  dotsColorController,
} from './modules/imageCarousel.js';

const dropdownBtn = document.querySelector('#drop-down-btn');
const dropdownDiv = document.querySelector('.drop-down-content');
const imgs = document.querySelectorAll('img:not(.dropdown-icon)');
const navigationDots = document.querySelectorAll('.dot');

const nextBtn = document.querySelector('#next');
const previousBtn = document.querySelector('#previous');

// Add the image to our existing div.
const myIcon = new Image();
myIcon.src = Icon;
myIcon.classList.add('dropdown-icon');

dropdownBtn.appendChild(myIcon);

dropdownBtn.addEventListener('click', () => {
  dropdownToggle(dropdownDiv);
});

nextBtn.addEventListener('click', () => {
  next();
  dotsColorController(navigationDots, imgs);
});
previousBtn.addEventListener('click', () => {
  previous();
  dotsColorController(navigationDots, imgs);
});

navigationDots.forEach((dot) => {
  dot.addEventListener('click', () => {
    swipeImage(dot, imgs);
    dotsColorController(navigationDots, imgs);
  });
});

// timeOut which advances the slides every 5 seconds
setInterval(() => {
  next();
  dotsColorController(navigationDots, imgs);
}, 5000);
