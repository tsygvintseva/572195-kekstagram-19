'use strict';

(function () {
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
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT_IN_MS = 10000;
  var SUCCESS_STATUS_CODE = 200;

  window.constants = {
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
    URL_LOAD: URL_LOAD,
    TIMEOUT_IN_MS: TIMEOUT_IN_MS,
    SUCCESS_STATUS_CODE: SUCCESS_STATUS_CODE,
  };
})();
