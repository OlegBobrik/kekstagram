'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  window.backend = {

    loadData: function (successHandler, errorHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            successHandler(xhr.response);
            break;
          case 206:
            errorHandler('Статус ответа: ' + xhr.status + ' - Partial Content');
            break;
          case 301:
            errorHandler('Статус ответа: ' + xhr.status + ' - Moved Permanently');
            break;
          case 403:
            errorHandler('Статус ответа: ' + xhr.status + ' - Forbidden');
            break;
          case 404:
            errorHandler('Статус ответа: ' + xhr.status + ' - Not Found');
            break;
          default:
            errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        switch (xhr.status) {
          case 500:
            errorHandler('Статус ответа: ' + xhr.status + ' - Internal Server Error');
            break;
          case 501:
            errorHandler('Статус ответа: ' + xhr.status + ' - Not Implemented');
            break;
          case 502:
            errorHandler('Статус ответа: ' + xhr.status + ' - Bad Gateway');
            break;
          case 503:
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

      xhr.timeout = 5000; // 5s

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    uploadData: function (data, transferCompleteHandler, transferFailedHandler) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            transferCompleteHandler(xhr.response);
            break;
          default:
            transferFailedHandler();
        }
      });

      xhr.addEventListener('error', function () {
        transferFailedHandler('Ошибка' + xhr.status);
      });

      xhr.timeout = 5000; // 5s
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
