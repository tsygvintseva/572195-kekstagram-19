'use strict';

(function () {
  var Effect = {
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
  var Scale = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100,
    STEP: 25
  };
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;
  var SUCCESS_STATUS_CODE = 200;
  var DEBOUNCE_INTERVAL = 500;
  var COUNT_IMG = 25;
  var COUNT_IMG_RANDOM = 10;

  window.constants = {
    EFFECT: Effect,
    PHOBOS_MAX: PHOBOS_MAX,
    HEAT_MAX: HEAT_MAX,
    MARVIN_MAX: MARVIN_MAX,
    DEFAULT_EFFECT_DEPTH: DEFAULT_EFFECT_DEPTH,
    DEFAULT_EFFECT_PIN: DEFAULT_EFFECT_PIN,
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    HASHTAG_LENGTH_MAX: HASHTAG_LENGTH_MAX,
    HASHTAGS_MAX: HASHTAGS_MAX,
    SCALE: Scale,
    URL_LOAD: URL_LOAD,
    URL_UPLOAD: URL_UPLOAD,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    SUCCESS_STATUS_CODE: SUCCESS_STATUS_CODE,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    COUNT_IMG: COUNT_IMG,
    COUNT_IMG_RANDOM: COUNT_IMG_RANDOM,
  };
})();
