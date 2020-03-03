'use strict';

(function () {
  var backend = window.backend;
  var form = window.form;
  var CONST = window.constants;
  var pictureElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  document.querySelector('.pictures__title').classList.remove('visually-hidden');
  var imgFilters = document.querySelector('.img-filters');

  var getPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  var loadedData = [];

  var renderDefault = function (data) {
    loadedData = data;
    for (var i = 0; i < loadedData.length; i++) {
      form.fragment.appendChild(getPicture(loadedData[i]));
    }
    pictureElement.appendChild(form.fragment);
  };

  var getLoadedData = function () {
    return loadedData;
  };

  var arrayPictures = [];

  var loadSuccessHandler = function (picture) {
    arrayPictures = picture;
    renderDefault(arrayPictures, CONST.COUNT_IMG);
    imgFilters.classList.remove('img-filters--inactive');
  };

  var getArrayPictures = function () {
    return arrayPictures;
  };

  var loadErrorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  backend.load(loadSuccessHandler, loadErrorHandler);

  window.pictures = {
    getLoadedData: getLoadedData,
    element: pictureElement,
    getPicture: getPicture,
    getArrayPictures: getArrayPictures,
    renderDefault: renderDefault,
  };
})();
