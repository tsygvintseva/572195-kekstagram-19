'use strict';

(function () {
  var data = window.data;
  var pictureElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  document.querySelector('.pictures__title').classList.remove('visually-hidden');
  var fragment = document.createDocumentFragment();

  var getPicture = function (picture) {
    var newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('.picture__img').src = picture.url;
    newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
    newPicture.querySelector('.picture__likes').textContent = picture.likes;
    return newPicture;
  };

  var renderPictures = function () {
    for (var i = 0; i < data.pictures.length; i++) {
      fragment.appendChild(getPicture(data.pictures[i]));
    }
    pictureElement.appendChild(fragment);
  };

  // createPictures();
  renderPictures();

  window.picture = {
    fragment: fragment,
    pictureElement: pictureElement,
  };
})();
