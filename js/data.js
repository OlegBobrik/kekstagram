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

  function generateComments() {
    var countSentence = window.utils.getRandomNumber(1, 2);
    var comments = [];

    comments.length = window.utils.getRandomNumber(1, 10);

    for (var i = 0; i < comments.length; i++) {
      var comment = '';

      for (var j = 0; j < countSentence; j++) {
        comment += commentsUsers[window.utils.getRandomNumber(0, commentsUsers.length - 1)] + ' ';
      }

      comments[i] = comment;
    }

    return comments;
  }

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
      return generateComments();
    }
  };
})();
