'use strict';

(function () {
  var inputHashtags = document.querySelector('.img-upload__text .text__hashtags');
  var submitButton = document.querySelector('.img-upload__form .img-upload__submit');
  var invalidHashTagMessages = [];
  var valid = true;

  var errorMessageText = {
    withoutHashTag: 'У хэш-тега вначале должен быть символ решётки (#).',
    minLengthHashTag: 'Хэш-тег не может состоять только из одной решётки.',
    noSpace: 'Хэш-теги разделяются пробелами.',
    duplicate: 'Один и тот же хэш-тег не может быть использован дважды.',
    maxCountHashTags: 'Нельзя указывать больше пяти хэш-тегов.',
    maxLengthHashTag: 'Максимальная длина одного хэш-тега 20 символов, включая решётку.'
  };

  // Error flags
  // eslint-disable-next-line no-undef
  var errorMessageFlags = new Map([
    ['withoutHashTag', false],
    ['minLengthHashTag', false],
    ['noSpace', false],
    ['duplicate', false],
    ['maxCountHashTags', false],
    ['maxLengthHashTag', false]
  ]);

  function resetErrorMessageFlags() {
    errorMessageFlags.forEach(function (value, key) {
      value = false;
      errorMessageFlags.set(key, value);
    });
  }

  /**
   * String to array without spaces
   * @param {String} string
   */
  function stringToArray(string) {
    var hashTagsArray = [];
    var hashTag = '';
    var space = ' ';

    for (var i = 0; i < string.length; i++) {

      if (string.charAt(i) !== space) {

        for (var j = i; j < string.length; j++, i++) {

          if (string.charAt(j) !== space) {
            hashTag += string.charAt(j);
          }

          if (string.charAt(j) === space || string.length - 1 - j === 0) {
            hashTagsArray.push(hashTag.toLowerCase());
            hashTag = '';
            break;
          }
        }
      }
    }

    checkHashTags(hashTagsArray);
    hashTagsArray = [];
  }

  /**
   * Checking the hashtag for valid input
   * @param {Array} array
   */
  function checkHashTags(array) {
    var duplicates = {};
    var hashTagCounter = 0;

    if (array.length > 5) {
      errorMessageFlags.set('maxCountHashTags', true);
    }

    for (var i = 0; i < array.length; i++) {

      if (array[i].charAt(0) !== '#') {
        errorMessageFlags.set('withoutHashTag', true);

      } else if ((array[i].charAt(0) === '#') && (array[i].length >= 2)) {
        hashTagCounter++;
      }

      if (array[i] === '#') {
        errorMessageFlags.set('minLengthHashTag', true);
      }

      if (array[i].length > 20) {
        errorMessageFlags.set('maxLengthHashTag', true);
      }

      for (var j = 1; j < array[i].length; j++) {

        if (array[i].charAt(j) === '#') {
          errorMessageFlags.set('noSpace', true);
        }

      }

      if (array[i].charAt(0) === '#') {
        duplicates[array[i]] = array[i];
      }
    }

    if (hashTagCounter > Object.keys(duplicates).length) {
      errorMessageFlags.set('duplicate', true);
    }

    removeMessageList();
    setCustomValidity();
  }

  // Check the error flags and put the error messages in the array
  function setCustomValidity() {
    invalidHashTagMessages = [];

    if (errorMessageFlags.get('withoutHashTag')) {
      invalidHashTagMessages.push(errorMessageText.withoutHashTag);
    }

    if (errorMessageFlags.get('minLengthHashTag')) {
      invalidHashTagMessages.push(errorMessageText.minLengthHashTag);
    }

    if (errorMessageFlags.get('noSpace')) {
      invalidHashTagMessages.push(errorMessageText.noSpace);
    }

    if (errorMessageFlags.get('duplicate')) {
      invalidHashTagMessages.push(errorMessageText.duplicate);
    }

    if (errorMessageFlags.get('maxCountHashTags')) {
      invalidHashTagMessages.push(errorMessageText.maxCountHashTags);
    }

    if (errorMessageFlags.get('maxLengthHashTag')) {
      invalidHashTagMessages.push(errorMessageText.maxLengthHashTag);
    }

    if (invalidHashTagMessages.length !== 0) {
      createErrorMessageList(invalidHashTagMessages);
      valid = false;
    } else {
      valid = true;
    }

    resetErrorMessageFlags();
  }

  inputHashtags.addEventListener('input', function () {
    stringToArray(inputHashtags.value);

    if (!valid) {
      submitButton.setAttribute('disabled', 'disabled');

    } else {
      submitButton.removeAttribute('disabled', 'disabled');
    }
  });

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

  window.hashtags = {
    validate: function () {
      return valid;
    }
  };
})();
