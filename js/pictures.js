'use strict';

(function () {
  var backend = window.backend;
  var form = window.form;
  var pictureElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var imgFilters = document.querySelector('.img-filters');

  var getPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  var renderPictures = function (pictures) {
    pictures.forEach(function (item) {
      form.fragment.appendChild(getPicture(item));
    });
    pictureElement.appendChild(form.fragment);
  };

  var getPictures = function () {
    return loadedData;
  };

  var loadedData = [];

  var loadSuccessHandler = function (pictures) {
    loadedData = pictures;
    renderPictures(loadedData);
    imgFilters.classList.remove('img-filters--inactive');
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
    getPictures: getPictures,
    element: pictureElement,
    getPicture: getPicture,
    render: renderPictures,
  };
})();
