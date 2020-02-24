'use strict';

(function () {
  var CONST = window.constants;
  var utils = window.utils;

  var requestOptions = {};

  var request = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CONST.SUCCESS_STATUS_CODE) {
        options.onSuccess(xhr.response);
      } else {
        utils.errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      utils.errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      utils.errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = CONST.TIMEOUT_IN_MS;

    xhr.open(options.method, options.url);

    if (options.data) {
      xhr.send(options.data);
    } else {
      xhr.send();
    }
  };

  window.backend = {
    load: function (onSuccess, onError) {
      requestOptions = {
        method: 'GET',
        url: CONST.URL_LOAD,
        onSuccess: onSuccess,
        onError: onError,
      };
      request(requestOptions);
    },
  };
})();
