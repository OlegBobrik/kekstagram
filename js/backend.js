'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';

  window.backend = {

    loadData: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          case 206:
            onError('Статус ответа: ' + xhr.status + ' - Partial Content');
            break;
          case 301:
            onError('Статус ответа: ' + xhr.status + ' - Moved Permanently');
            break;
          case 302:
            onError('Статус ответа: ' + xhr.status + ' - Moved Temporarily');
            break;
          case 403:
            onError('Статус ответа: ' + xhr.status + ' - Forbidden');
            break;
          case 404:
            onError('Статус ответа: ' + xhr.status + ' - Not Found');
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        switch (xhr.status) {
          case 500:
            onError('Статус ответа: ' + xhr.status + ' - Internal Server Error');
            break;
          case 501:
            onError('Статус ответа: ' + xhr.status + ' - Not Implemented');
            break;
          case 502:
            onError('Статус ответа: ' + xhr.status + ' - Bad Gateway');
            break;
          case 503:
            onError('Статус ответа: ' + xhr.status + ' - Service Unavailable');
            break;
          default:
            onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
        onError('Произошла ошибка соединения. Статус ответа: + ' + xhr.status);
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = 5000; // 5s

      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    uploadData: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        switch (xhr.status) {
          case 200:
            onLoad(xhr.response);
            break;
          default:
            onError();
        }
      });

      xhr.addEventListener('error', function () {
        onError('Ошибка' + xhr.status);
      });

      xhr.timeout = 5000; // 5s
      xhr.open('POST', URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
