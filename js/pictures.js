'use strict';

(function () {
  var backend = window.backend;
  var fragment = document.createDocumentFragment();
  var pictureElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  document.querySelector('.pictures__title').classList.remove('visually-hidden');

  var getPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  var loadedData = [];

  var successHandler = function (data) {
    loadedData = data;
    for (var i = 0; i < loadedData.length; i++) {
      fragment.appendChild(getPicture(loadedData[i]));
    }
    pictureElement.appendChild(fragment);
  };

  var getLoadedData = function () {
    return loadedData;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  backend.load(successHandler, errorHandler);

  window.pictures = {
    fragment: fragment,
    getLoadedData: getLoadedData,
    element: pictureElement,
  };
})();
