'use strict';

(function () {
  var HashtagRestriction = {
    MAX_COUNT_HASHTAG: 5,
    MIN_LENGHT_HASHTAG: 2,
    MAX_LENGHT_HASHTAG: 20
  };

  var inputHashtags = document.querySelector('.img-upload__text .text__hashtags');
  var submitButton = document.querySelector('.img-upload__form .img-upload__submit');
  var valid = true;

  var ErrorMessageText = {
    WITHOUT_HASHTAG: 'У хэш-тега вначале должен быть символ решётки (#).',
    MIN_LENGTH: 'Хэш-тег не может состоять только из одной решётки.',
    NO_SPACE: 'Хэш-теги разделяются пробелами.',
    DUPLICATE: 'Один и тот же хэш-тег не может быть использован дважды.',
    MAX_COUNT_HASHTAGS: 'Нельзя указывать больше пяти хэш-тегов.',
    MAX_LENGTH: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.'
  };

  /**
   * String to array without spaces
   * @param {String} string
   */
  function stringToArray(string) {
    var arrayHashtags = [];
    var hashtag = '';
    var space = ' ';

    for (var i = 0; i < string.length; i++) {

      if (string.charAt(i) !== space) {

        for (var j = i; j < string.length; j++, i++) {

          if (string.charAt(j) !== space) {
            hashtag += string.charAt(j);
          }

          if (string.charAt(j) === space || string.length - 1 - j === 0) {
            arrayHashtags.push(hashtag.toLowerCase());

            hashtag = '';
            break;
          }
        }
      }
    }

    checkHashtags(arrayHashtags);
    arrayHashtags = [];
  }

  /**
   * Checking the hashtag for valid input
   * @param {Array} array
   */
  function checkHashtags(array) {
    var duplicates = {};
    var hashtagCounter = 0;
    var invalidHashtagMessages = [];

    if (array.length > HashtagRestriction.MAX_COUNT_HASHTAG) {
      invalidHashtagMessages.push(ErrorMessageText.MAX_COUNT_HASHTAGS);
    }

    for (var i = 0; i < array.length; i++) {

      if (array[i].charAt(0) !== '#') {
        invalidHashtagMessages.push(ErrorMessageText.WITHOUT_HASHTAG);

      } else if ((array[i].charAt(0) === '#') && (array[i].length >= 2)) {
        hashtagCounter++;
      }

      if (array[i] === '#' && (array[i].length < HashtagRestriction.MIN_LENGHT_HASHTAG)) {
        invalidHashtagMessages.push(ErrorMessageText.MIN_LENGTH);
      }

      if (array[i].length > HashtagRestriction.MAX_LENGHT_HASHTAG) {
        invalidHashtagMessages.push(ErrorMessageText.MAX_LENGTH);
      }

      for (var j = 1; j < array[i].length; j++) {

        if (array[i].charAt(j) === '#') {
          invalidHashtagMessages.push(ErrorMessageText.NO_SPACE);
          break;
        }
      }

      if (array[i].charAt(0) === '#' && (array[i].length >= 2)) {
        duplicates[array[i]] = array[i];
      }
    }

    if (hashtagCounter > Object.keys(duplicates).length) {
      invalidHashtagMessages.push(ErrorMessageText.DUPLICATE);
    }

    removeMessageList();
    setCustomValidity(invalidHashtagMessages);
  }

  /**
   * Checking length array of messages
   * @param {Array} messages
   */
  function setCustomValidity(messages) {
    if (messages.length !== 0) {
      createErrorMessageList(messages);
      valid = false;
    } else {
      valid = true;
    }
  }

  function createErrorMessageList(messages) {
    var wrapper = document.querySelector('.img-upload__overlay .img-upload__wrapper');

    var node = document.createElement('div');
    var list = document.createElement('ul');

    node.classList.add('img-upload__messages');

    node.style = 'margin-top: 10px; text-transform: none';
    list.style = 'list-style: none; margin: 0; padding: 0';

    wrapper.appendChild(node);
    node.append(list);

    for (var i = 0; i < messages.length; i++) {
      var listItem = document.createElement('li');

      listItem.textContent = messages[i];
      list.appendChild(listItem);
    }
  }

  function removeMessageList() {
    var node = document.querySelector('.img-upload__messages');

    if (node) {
      node.parentNode.removeChild(node);
    }
  }

  // Listeners
  inputHashtags.addEventListener('input', function () {
    stringToArray(inputHashtags.value);

    if (!valid) {
      submitButton.setAttribute('disabled', 'disabled');
    } else {
      submitButton.removeAttribute('disabled', 'disabled');
    }
  });

  window.hashtags = {
    validate: function () {
      return valid;
    }
  };
})();
