'use strict';

(function () {
  var commentsUsers = [
    'Всё отлично!',
    'В целом всё плохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей получилась на фотке перекошены, как будто их избивают. Как можно было поймать такой неуданчный момент?!'
  ];

  var descriptions = [
    'Тестим новую камеру!',
    'Затусили с дурзьями на море.',
    'Как же круто тут кормят.',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все соменья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  window.data = {

    getArray: function () {
      return window.utils.diffArray(1, 25).sort(window.utils.randomSort);
    },

    getDescription: function () {
      return descriptions[window.utils.getRandomNumber(0, descriptions.length - 1)];
    },

    getLikes: function () {
      return window.utils.getRandomNumber(15, 200);
    },

    getAvatar: function () {
      return window.utils.getRandomNumber(1, 6);
    },

    getComments: function () {
      // получаем случайное число строк (предложений) для одного комментария
      var countSentence = window.utils.getRandomNumber(1, 2);

      // создаем пустой массив для хранения комментариев
      var comments = [];

      // задаем случайную длину массива для хранения комментариев
      comments.length = window.utils.getRandomNumber(1, 10);

      for (var i = 0; i < comments.length; i++) {
      // переменная для хранения составного комментария
        var comment = '';

        for (var j = 0; j < countSentence; j++) {
          // производим конкатенацию строк (предложениий) из массива commentsUsers для одного комментария
          comment += commentsUsers[window.utils.getRandomNumber(0, commentsUsers.length - 1)] + ' ';
        }

        // добавляем (составной) комментарий в i-ый элемент массива
        comments[i] = comment;
      }

      return comments;
    }

  };

})();
