'use strict';

(function () {
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
  var COMMENTS_QUANTITY_MIN = 1;
  var COMMENTS_QUANTITY_MAX = 5;
  var AUTHORS_NAMES = ['Антон', 'Андрей', 'Екатерина', 'Владислав', 'Софья'];

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
    var comments = getRandomValue(COMMENTS_QUANTITY_MIN, COMMENTS_QUANTITY_MAX);
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

  createPictures();

  window.data = {
    pictures: pictures,
  };

})();
