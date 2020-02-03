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

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var array = [];

var getComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomValue(AVATAR_MIN, AVATAR_MAX) + '.svg',
    name: AUTHORS_NAMES[getRandomValue(0, AUTHORS_NAMES.length - 1)],
    message: COMMENTS[getRandomValue(0, COMMENTS.length - 1)],
  };
  return comment;
};

var makeComments = function () {
  var commentsArray = [];
  var comments = getRandomValue(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
  for (var i = 1; i <= comments; i++) {
    commentsArray.push(getComment());
  }
  return commentsArray;
};

var makeObj = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: getRandomValue(LIKES_MIN, LIKES_MAX),
    сomments: makeComments(),
    description: DESCRIPTION[getRandomValue(0, DESCRIPTION.length - 1)],
  };
};

var makeData = function () {
  for (var i = 1; i <= QUANTITY_PHOTOS; i++) {
    array.push(makeObj(i));
  }
};

var fragment = document.createDocumentFragment();

var makePicture = function (picture) {
  var newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__comments').textContent = picture.comments;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  return newPicture;
};

var renderPictures = function () {
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(makePicture(array[i]));
  }
  pictureElement.appendChild(fragment);
};

makeData();
renderPictures();
