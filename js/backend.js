'use strict';

(function () {
  var Code = {
    STATUS_OK_CODE: 200,
    PARTIAL_CONTENT_CODE: 206,
    MOVED_PERMANENTLY_CODE: 301,
    FORBIDDEN_CODE: 403,
    NOT_FOUND_CODE: 404,
    INTERNAL_SERVER_ERROR_CODE: 500,
    NOT_IMPLEMENTED_CODE: 501,
    BAD_GATEWAY_CODE: 502,
    SERVICE_UNAVAILABLE_CODE: 503
  };

  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  var TIMEOUT = 5000; // 5s

  window.backend = {
    loadData: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.STATUS_OK_CODE:
            successHandler(xhr.response);
            break;
          case Code.PARTIAL_CONTENT_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Partial Content');
            break;
          case Code.MOVED_PERMANENTLY_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Moved Permanently');
            break;
          case Code.FORBIDDEN_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Forbidden');
            break;
          case Code.NOT_FOUND_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Not Found');
            break;
          default:
            errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        switch (xhr.status) {
          case Code.INTERNAL_SERVER_ERROR_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Internal Server Error');
            break;
          case Code.NOT_IMPLEMENTED_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Not Implemented');
            break;
          case Code.BAD_GATEWAY_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Bad Gateway');
            break;
          case Code.SERVICE_UNAVAILABLE_CODE:
            errorHandler('Статус ответа: ' + xhr.status + ' - Service Unavailable');
            break;
          default:
            errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        errorHandler('Произошла ошибка соединения. Статус ответа: + ' + xhr.status);
      });

      xhr.addEventListener('timeout', function () {
        errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT;

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    uploadData: function (data, transferCompleteHandler, transferFailedHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case Code.STATUS_OK_CODE:
            transferCompleteHandler(xhr.response);
            break;
          default:
            transferFailedHandler();
        }
      });

      xhr.addEventListener('error', function () {
        transferFailedHandler('Ошибка' + xhr.status);
      });

      xhr.timeout = TIMEOUT;
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
