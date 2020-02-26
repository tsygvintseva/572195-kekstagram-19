'use strict';

(function () {
  var CONST = window.constants;

  var requestOptions = {};
  var request = function (options) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open(options.method, options.url);

    xhr.addEventListener('load', function () {
      if (xhr.status === CONST.SUCCESS_STATUS_CODE) {
        options.onSuccess(xhr.response);
      } else {
        options.onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      options.onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      options.onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = CONST.TIMEOUT_IN_MS;

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
    upload: function (data, onSuccess, onError) {
      requestOptions = {
        method: 'POST',
        url: CONST.URL_UPLOAD,
        onSuccess: onSuccess,
        onError: onError,
        data: data,
      };
      request(requestOptions);
    },
  };

})();
