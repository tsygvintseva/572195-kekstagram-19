'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;
  var pictures = window.pictures;

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  var renderRandom = function (arrayPictures, quantity) {
    var fff = arrayPictures.slice();
    shuffleArray(fff);
    for (var i = 0; i < quantity; i++) {
      form.fragment.appendChild(pictures.getPicture(fff[i], i));
    }
    pictures.element.appendChild(form.fragment);
  };

  var renderDisscus = function (arrayPictures, quantity) {
    var fff = arrayPictures.slice();
    fff.sort(function (first, second) {
      if (first.comments < second.comments) {
        return 1;
      } else if (first.comments > second.comments) {
        return -1;
      } else {
        return 0;
      }
    });

    for (var i = 0; i < quantity; i++) {
      form.fragment.appendChild(pictures.getPicture(fff[i], i));
    }
    pictures.element.appendChild(form.fragment);
  };

  filterDefault.addEventListener('click', window.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (it) {

      it.remove();
    });
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    pictures.renderDefault(pictures.getArrayPictures(), CONST.COUNT_IMG);
  }));

  filterRandom.addEventListener('click', window.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (it) {

      it.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    renderRandom(pictures.getArrayPictures(), CONST.COUNT_IMG_RANDOM);
  }));

  filterDiscussed.addEventListener('click', window.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (it) {

      it.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    renderDisscus(pictures.getArrayPictures(), CONST.COUNT_IMG);
  }));

})();
