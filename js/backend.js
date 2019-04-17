'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';

  window.backend = function (onLoad, onError) {
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
        case 500:
          onError('Статус ответа: ' + xhr.status + ' - Internal Server Error');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });


    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000; // 5s

    xhr.open('GET', URL);
    xhr.send();
  };
})();
