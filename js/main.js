'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var QUANTITY_PHOTOS = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION = ['#js', '#это', '#боль', '#крик', '#души'];
var MIN_COMMENTS_QUANTITY = 1;
var MAX_COMMENTS_QUANTITY = 5;
var AUTHORS_NAMES = ['Антон', 'Андрей', 'Екатерина', 'Владислав', 'Софья'];

var pictureElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
document.querySelector('.pictures__title').classList.remove('visually-hidden');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var pictures = [];

var getComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomValue(AVATAR_MIN, AVATAR_MAX) + '.svg',
    name: AUTHORS_NAMES[getRandomValue(0, AUTHORS_NAMES.length - 1)],
    message: COMMENTS[getRandomValue(0, COMMENTS.length - 1)],
  };
  return comment;
};

var getComments = function () {
  var commentsArray = [];
  var comments = getRandomValue(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
  for (var i = 1; i <= comments; i++) {
    commentsArray.push(getComment());
  }
  return commentsArray;
};

var createPictures = function () {
  for (var i = 1; i <= QUANTITY_PHOTOS; i++) {
    pictures.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: getRandomValue(LIKES_MIN, LIKES_MAX),
          comments: getComments(),
          description: DESCRIPTION[getRandomValue(0, DESCRIPTION.length - 1)],
        });
  }
};

var fragment = document.createDocumentFragment();

var getPicture = function (picture) {
  var newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  return newPicture;
};

var renderPictures = function () {
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(getPicture(pictures[i]));
  }
  pictureElement.appendChild(fragment);
};

createPictures();
renderPictures();

// module3-task3

var bigPicture = document.querySelector('.big-picture');
var bigPictureComment = bigPicture.querySelector('.social__comment');
var bigPictureComments = bigPicture.querySelector('.social__comments');

bigPicture.classList.remove('hidden');

// Спрятать блоки счётчика комментариев и загрузки новых комментариев
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

// Убрать скролл на контейнере с фотографиями позади
document.querySelector('body').classList.add('modal-open');

// Заполняю комментарий информацией
var renderComment = function (item) {
  var newComment = bigPictureComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = item.avatar;
  newComment.querySelector('.social__picture').alt = item.name;
  newComment.querySelector('.social__text').textContent = item.message;
  return newComment;
};

// Заполняю фотографию информацией
var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  createComments(photo);
};

// Создаю комментарии под фотографией
var createComments = function (photo) {
  for (var i = 0; i < photo.comments.length; i++) {
    fragment.appendChild(renderComment(photo.comments[i]));
  }
  bigPictureComments.appendChild(fragment);
};

renderBigPicture(pictures[0]);
