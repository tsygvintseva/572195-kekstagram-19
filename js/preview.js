'use strict';

(function () {
  var ENTER_KEY = window.constants.ENTER_KEY;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
  var body = document.querySelector('body');

  // Спрятать блоки счётчика комментариев и загрузки новых комментариев
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  // Убрать скролл на контейнере с фотографиями позади
  body.classList.add('modal-open');

  var renderComment = function (item) {
    var newComment = bigPictureComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.avatar;
    newComment.querySelector('.social__picture').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    return newComment;
  };

  // Заполняю фотографию информацией
  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    createComments(photo);
  };

  // Создаю комментарии под фотографией
  var createComments = function (photo) {
    for (var i = 0; i < photo.comments.length; i++) {
      window.picture.fragment.appendChild(renderComment(photo.comments[i]));
    }
    bigPictureComments.textContent = '';
    bigPictureComments.appendChild(window.picture.fragment);
  };

  renderBigPicture(window.data.pictures[0]);

  // Открытие изображения
  var openPopupPreview = function () {
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', window.form.onPopupEscPress);
  };

  // Закрытие изображения
  var closePopupPreview = function () {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', window.form.onPopupEscPress);
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      var activePicture = evt.target.children[0].attributes.src.value;
      window.preview.showBigPhoto(activePicture);
    }
  };

  var showBigPhoto = function (src) {
    for (var i = 0; i < window.data.pictures.length; i++) {
      if (src === window.data.pictures[i].url) {
        openPopupPreview();
        renderBigPicture(window.data.pictures[i]);
      }
    }
  };

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var activePicture = evt.target.attributes.src.value;
      showBigPhoto(activePicture);
    }
  };

  window.picture.pictureElement.addEventListener('click', onPictureClick);
  window.picture.pictureElement.addEventListener('keydown', onPictureEnterPress);
  closeBigPictureButton.addEventListener('click', function () {
    closePopupPreview();
  });

  window.preview = {
    body: body,
    closePopupPreview: closePopupPreview,
    showBigPhoto: showBigPhoto,
  };
})();
