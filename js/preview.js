'use strict';

(function () {
  var CONST = window.constants;
  var pictures = window.pictures;
  var form = window.form;

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureComment = bigPicture.querySelector('.social__comment');
  var bigPictureComments = bigPicture.querySelector('.social__comments');
  var closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  form.body.classList.add('modal-open');

  var renderComment = function (item) {
    var newComment = bigPictureComment.cloneNode(true);
    newComment.querySelector('.social__picture').src = item.avatar;
    newComment.querySelector('.social__picture').alt = item.name;
    newComment.querySelector('.social__text').textContent = item.message;
    return newComment;
  };

  var renderBigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img img').src = photo.url;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    createComments(photo);
  };

  var createComments = function (photo) {
    for (var i = 0; i < photo.comments.length; i++) {
      form.fragment.appendChild(renderComment(photo.comments[i]));
    }
    bigPictureComments.textContent = '';
    bigPictureComments.appendChild(form.fragment);
  };

  var commentsLoader = bigPicture.querySelector('.comments-loader');
  var bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsCountTotal = bigPictureCommentCount.querySelector('.comments-count');
  var arrayComments = [];
  var countCommentsRender;

  var getComments = function (comments) {
    form.fragment = document.createDocumentFragment();
    var fragmentCommentsCount = document.createDocumentFragment();

    var countComments = comments.length > CONST.COUNT_COMMENTS ? CONST.COUNT_COMMENTS : comments.length;
    countCommentsRender = countCommentsRender + countComments;

    for (var i = 0; i < countComments; i++) {
      form.fragment.appendChild(renderComment(comments.shift()));
    }

    bigPictureCommentCount.textContent = '';

    fragmentCommentsCount.textContent = countCommentsRender + ' из ';
    fragmentCommentsCount.appendChild(commentsCountTotal);
    fragmentCommentsCount.innerHtml = fragmentCommentsCount.innerHtml + ' комментариев';

    bigPictureCommentCount.appendChild(fragmentCommentsCount);
    bigPictureComments.appendChild(form.fragment);

    if (!comments.length) {
      commentsLoader.classList.add('hidden');
    }
  };

  var onLoadMoreComments = function () {
    getComments(arrayComments);
  };

  var showComments = function (comments) {
    arrayComments = comments.slice();
    countCommentsRender = 0;
    bigPictureComments.textContent = '';
    commentsCountTotal.textContent = comments.length + ' комментариев';

    if (comments.length > CONST.COUNT_COMMENTS) {
      commentsLoader.classList.remove('hidden');
      bigPictureCommentCount.classList.remove('hidden');
    }

    getComments(arrayComments);
  };

  commentsLoader.addEventListener('click', onLoadMoreComments);

  var openPopupPreview = function () {
    bigPicture.classList.remove('hidden');
    form.body.classList.add('modal-open');
    document.addEventListener('keydown', onPictureEscPress);
  };

  var closePopupPreview = function () {
    bigPicture.classList.add('hidden');
    form.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPictureEscPress);
  };

  var onPictureEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      closePopupPreview();
    }
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === CONST.ENTER_KEY) {
      var activePicture = evt.target.children[0].attributes.src.value;
      showBigPhoto(activePicture);
    }
  };

  var showBigPhoto = function (src) {
    var picture = pictures.getPictures();
    for (var i = 0; i < picture.length; i++) {
      if (src === picture[i].url) {
        openPopupPreview();
        renderBigPicture(picture[i]);
        showComments(picture[i].comments);
      }
    }
  };

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var activePicture = evt.target.attributes.src.value;
      showBigPhoto(activePicture);
    }
  };

  pictures.element.addEventListener('click', onPictureClick);
  pictures.element.addEventListener('keydown', onPictureEnterPress);
  closeBigPictureButton.addEventListener('click', function () {
    closePopupPreview();
  });

})();
