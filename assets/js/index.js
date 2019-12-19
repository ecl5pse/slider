'use strict';

const INDEX_SEARCH_KEY = 'current image';
const images = [
  'https://images.unsplash.com/photo-1541233349642-6e425fe6190e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  'https://www.gettyimages.com/gi-resources/images/500px/983794168.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdIckZ8h0MDFLcsyAUwEqlMaSoZzSfo2jGM8Efm7fOBrgfbPHw',
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

