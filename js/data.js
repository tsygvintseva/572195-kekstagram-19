'use strict';

(function () {
  var CONST = window.constants;
  var LIKES_MIN = CONST.LIKES_MIN;
  var LIKES_MAX = CONST.LIKES_MAX;
  var AVATAR_MIN = CONST.AVATAR_MIN;
  var AVATAR_MAX = CONST.AVATAR_MAX;
  var QUANTITY_PHOTOS = CONST.QUANTITY_PHOTOS;
  var COMMENTS = CONST.COMMENTS;
  var DESCRIPTION = CONST.DESCRIPTION;
  var COMMENTS_QUANTITY_MIN = CONST.COMMENTS_QUANTITY_MIN;
  var COMMENTS_QUANTITY_MAX = CONST.COMMENTS_QUANTITY_MAX;
  var AUTHORS_NAMES = CONST.AUTHORS_NAMES;

  var pictures = [];

  var getComment = function () {
    var comment = {
      avatar: 'img/avatar-' + window.utils.getRandomValue(AVATAR_MIN, AVATAR_MAX) + '.svg',
      name: AUTHORS_NAMES[window.utils.getRandomValue(0, AUTHORS_NAMES.length - 1)],
      message: COMMENTS[window.utils.getRandomValue(0, COMMENTS.length - 1)],
    };
    return comment;
  };

  var getComments = function () {
    var commentsArray = [];
    var comments = window.utils.getRandomValue(COMMENTS_QUANTITY_MIN, COMMENTS_QUANTITY_MAX);
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
            likes: window.utils.getRandomValue(LIKES_MIN, LIKES_MAX),
            comments: getComments(),
            description: DESCRIPTION[window.utils.getRandomValue(0, DESCRIPTION.length - 1)],
          });
    }

  };

  createPictures();

  window.data = {
    pictures: pictures,
  };

})();
