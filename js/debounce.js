'use strict';

(function () {
  var CONST = window.constants;

  window.debounce = function (cb) {
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

})();
