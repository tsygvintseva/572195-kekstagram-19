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
  var EFFECT = {
    CHROME: 'chrome',
    NONE: 'none',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
  };
  var PHOBOS_MAX = 3;
  var HEAT_MAX = 3;
  var MARVIN_MAX = 100;
  var DEFAULT_EFFECT_DEPTH = 100 + '%';
  var DEFAULT_EFFECT_PIN = 100 + '%';
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var HASHTAG_LENGTH_MAX = 20;
  var HASHTAGS_MAX = 5;
  var SCALE = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100,
    STEP: 25
  };

  window.constants = {
    LIKES_MIN: LIKES_MIN,
    LIKES_MAX: LIKES_MAX,
    AVATAR_MIN: AVATAR_MIN,
    AVATAR_MAX: AVATAR_MAX,
    QUANTITY_PHOTOS: QUANTITY_PHOTOS,
    COMMENTS: COMMENTS,
    DESCRIPTION: DESCRIPTION,
    COMMENTS_QUANTITY_MIN: COMMENTS_QUANTITY_MIN,
    COMMENTS_QUANTITY_MAX: COMMENTS_QUANTITY_MAX,
    AUTHORS_NAMES: AUTHORS_NAMES,
    EFFECT: EFFECT,
    PHOBOS_MAX: PHOBOS_MAX,
    HEAT_MAX: HEAT_MAX,
    MARVIN_MAX: MARVIN_MAX,
    DEFAULT_EFFECT_DEPTH: DEFAULT_EFFECT_DEPTH,
    DEFAULT_EFFECT_PIN: DEFAULT_EFFECT_PIN,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    HASHTAG_LENGTH_MAX: HASHTAG_LENGTH_MAX,
    HASHTAGS_MAX: HASHTAGS_MAX,
    SCALE: SCALE,
  };
})();
