export { next, previous, swipeImage, dotsColorController };

const container = document.querySelector('.slides');
const pictureFrame = document.querySelector('.picture-frame');
const imgsDiv = document.querySelectorAll('.gaming');

let imgIndex = 0;

const next = () => {
  // Reset ImgIndex if it reach the maximum pictures
  if (imgIndex === 4 || imgIndex === 5) {
    imgIndex = -1;
  }

  imgsDiv.forEach((img) => {
    if (img.parentElement === pictureFrame) {
      container.appendChild(img);
    }
  });

  imgIndex += 1;
  pictureFrame.appendChild(imgsDiv[imgIndex]);
};

const previous = () => {
  // Reset ImgIndex if it reach the maximum pictures
  if (imgIndex === 0) {
    imgIndex = 5;
  }

  imgsDiv.forEach((img) => {
    if (img.parentElement === pictureFrame) {
      container.appendChild(img);
    }
  });

  imgIndex -= 1;

  pictureFrame.appendChild(imgsDiv[imgIndex]);
};

// Control images using dot navigation
const swipeImage = (dot, imgs) => {
  const dotId = dot.dataset.id;

  imgsDiv.forEach((div) => {
    imgs.forEach((img) => {
      if ((img.parentElement === div) & (div.parentElement === pictureFrame)) {
        container.appendChild(img.parentElement);
      }

      if ((dotId === img.dataset.id) & (img.parentElement === div)) {
        pictureFrame.appendChild(img.parentElement);
        imgIndex = Number(img.dataset.id);
      }
    });
  });
};

const dotsColorController = (dots, imgs) => {
  dots.forEach((dot) => {
    // Reset all dots color
    dot.style.backgroundColor = 'transparent';
    imgs.forEach((img) => {
      if (
        pictureFrame.contains(img.parentElement) &
        (dot.dataset.id === img.dataset.id)
      ) {
        dot.style.backgroundColor = 'white';
      }
    });
  });
};
