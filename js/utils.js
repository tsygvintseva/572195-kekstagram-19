'use strict';

(function () {
  var CONST = window.constants;

  var shuffleArray = function (array) {
    var copiedArray = array.slice();
    for (var i = copiedArray.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copiedArray[i];
      copiedArray[i] = copiedArray[j];
      copiedArray[j] = temp;
    }
    return copiedArray;
  };

  var sortObjectsArrayByField = function (array, field) {
    var copiedArray = array.slice();
    copiedArray.sort(function (first, second) {
      if (first[field] < second[field]) {
        return 1;
      } else if (first[field] > second[field]) {
        return -1;
      } else {
        return 0;
      }
    });
    return copiedArray;
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, CONST.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    shuffleArray: shuffleArray,
    sortObjectsArrayByField: sortObjectsArrayByField,
    debounce: debounce,
  };

})();
