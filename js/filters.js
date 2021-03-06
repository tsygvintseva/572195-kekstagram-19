'use strict';

(function () {
  var CONST = window.constants;
  var pictures = window.pictures;
  var utils = window.utils;

  var filterDefault = document.querySelector('#filter-default');
  var filterRandom = document.querySelector('#filter-random');
  var filterDiscussed = document.querySelector('#filter-discussed');

  filterDefault.addEventListener('click', utils.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {

      item.remove();
    });
    filterDefault.classList.add('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    pictures.render(pictures.getPictures(), CONST.COUNT_IMG);
  }));

  filterRandom.addEventListener('click', utils.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {

      item.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.add('img-filters__button--active');
    filterDiscussed.classList.remove('img-filters__button--active');
    pictures.render(
        utils.shuffleArray(pictures.getPictures()).slice(0, CONST.COUNT_IMG_RANDOM)
    );
  }));

  filterDiscussed.addEventListener('click', utils.debounce(function () {
    document.querySelectorAll('.picture').forEach(function (item) {

      item.remove();
    });
    filterDefault.classList.remove('img-filters__button--active');
    filterRandom.classList.remove('img-filters__button--active');
    filterDiscussed.classList.add('img-filters__button--active');
    pictures.render(
        utils.sortObjectsArrayByField(pictures.getPictures(), CONST.SORT_PHOTOS_BY_COMMENTS)
    );
  }));

})();
