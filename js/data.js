'use strict';

(function () {
  var LIKES_MIN = window.constants.LIKES_MIN;
  var LIKES_MAX = window.constants.LIKES_MAX;
  var AVATAR_MIN = window.constants.AVATAR_MIN;
  var AVATAR_MAX = window.constants.AVATAR_MAX;
  var QUANTITY_PHOTOS = window.constants.QUANTITY_PHOTOS;
  var COMMENTS = window.constants.COMMENTS;
  var DESCRIPTION = window.constants.DESCRIPTION;
  var COMMENTS_QUANTITY_MIN = window.constants.COMMENTS_QUANTITY_MIN;
  var COMMENTS_QUANTITY_MAX = window.constants.COMMENTS_QUANTITY_MAX;
  var AUTHORS_NAMES = window.constants.AUTHORS_NAMES;

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
