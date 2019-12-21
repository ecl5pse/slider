'use strict';

const INDEX_SEARCH_KEY = 'current image';
const images = [
  'http://memesmix.net/media/created/dcydu9.jpg',
  'http://memesmix.net/media/created/437dqq.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmIa4-HcLjI9rBb3dJ2o_wO1nF5Vx2Oa7GmjYZw61geK4O684Dow&s',
  'https://habrastorage.org/files/61d/d9e/d20/61dd9ed201254aeba4e52189db698b6a.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuhV-VKC9s1o5Fp-5uy_GzAZZk4dx4s9M_dazEl5Xb__UmtCJy&s',


];

let currentIndex = 0;

const [prevButton, nextButton] = document.querySelectorAll('button');

const sliderContainer = document.querySelector('.slideContainer');

nextButton.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  update();
};

prevButton.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  update();
};

function update() {
  const image = new Image();
  image.onload = load;
  image.src = images[currentIndex];
  updateUrl();

}

function load() {

  if ((this.width / this.height) > (16 / 9)) {
    this.style.width = '100%';
  } else {
    this.style.height = '100%';
  }

  sliderContainer.innerHTML = '';
  sliderContainer.appendChild(this);

}

window.onload = function() {

  let params = new URLSearchParams(location.search);
  if (params.has(INDEX_SEARCH_KEY)) {
    currentIndex = params.get(INDEX_SEARCH_KEY);
  }
  update();

};

function updateUrl() {

  history.replaceState(null, null, `?${INDEX_SEARCH_KEY}=${currentIndex}`);

}

