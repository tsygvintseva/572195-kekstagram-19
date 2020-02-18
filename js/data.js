'use strict';

(function () {
  var CONST = window.constants;
  var utils = window.utils;

  var pictures = [];

  var getComment = function () {
    var comment = {
      avatar: 'img/avatar-' + utils.getRandomValue(CONST.AVATAR_MIN, CONST.AVATAR_MAX) + '.svg',
      name: CONST.AUTHORS_NAMES[utils.getRandomValue(0, CONST.AUTHORS_NAMES.length - 1)],
      message: CONST.COMMENTS[utils.getRandomValue(0, CONST.COMMENTS.length - 1)],
    };
    return comment;
  };

  var getComments = function () {
    var commentsArray = [];
    var comments = utils.getRandomValue(CONST.COMMENTS_QUANTITY_MIN, CONST.COMMENTS_QUANTITY_MAX);
    for (var i = 1; i <= comments; i++) {
      commentsArray.push(getComment());
    }
    return commentsArray;
  };

  var createPictures = function () {
    for (var i = 1; i <= CONST.QUANTITY_PHOTOS; i++) {
      pictures.push(
          {
            url: 'photos/' + i + '.jpg',
            likes: utils.getRandomValue(CONST.LIKES_MIN, CONST.LIKES_MAX),
            comments: getComments(),
            description: CONST.DESCRIPTION[utils.getRandomValue(0, CONST.DESCRIPTION.length - 1)],
          });
    }

  };

  createPictures();

  window.data = {
    pictures: pictures,
  };

})();
