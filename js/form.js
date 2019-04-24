'use strict';

(function () {
  var Scale = {
    MIN_SCALE: 25,
    MAX_SCALE: 100,
    STEP_SCALE: 25
  };

  var formElement = document.querySelector('.img-upload__form');
  var file = formElement.querySelector('.img-upload__start #upload-file');
  var formOverlay = formElement.querySelector('.img-upload__overlay');
  var formText = formElement.querySelector('.img-upload__text');
  var formInputHashtags = document.querySelector('.img-upload__text .text__hashtags');
  var formTextarea = formElement.querySelector('.text__description');
  var formButtonClose = formElement.querySelector('.img-upload__cancel');
  var formPicturePreview = formElement.querySelector('.img-upload__preview');
  var effectLevel = formElement.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var picturePreview = formPicturePreview.querySelector('img');
  var scale = formElement.querySelector('.img-upload__scale');
  var scaleValue = scale.querySelector('.scale__control--value');
  var buttonScaleSmaller = scale.querySelector('.scale__control--smaller');
  var buttonScaleBigger = scale.querySelector('.scale__control--bigger');
  var effectContainerElement = formOverlay.querySelector('.effects__list');
  var effectRadioInputs = effectContainerElement.querySelectorAll('input[type="radio"]');

  var selectedRadioInput;

  var valueToClassName = {
    'none': 'effect__preview--none',
    'chrome': 'effects__preview--chrome',
    'sepia': 'effects__preview--sepia',
    'marvin': 'effects__preview--marvin',
    'phobos': 'effects__preview--phobos',
    'heat': 'effects__preview--heat'
  };

  /**
   * Get the filter name based on the checkbox value
   * and also set the value of filter
   *
   * @param {String} filter
   * @return {String} filterNames
   */
  function setFilter(filter) {
    var filterNames = {
      'none': 'none',
      'chrome': 'grayscale( +' + getProportion(1) + ')',
      'sepia': 'sepia( +' + getProportion(1) + ')',
      'marvin': 'invert( +' + getProportion(100) + '%' + ')',
      'phobos': 'blur( +' + getProportion(3) + 'px' + ')',
      'heat': 'brightness(' + getProportion(3) + ')',
    };

    /**
     * Get a new proportion of value for filter
     * @param {Number} maxValueFilter
     * @return {Number} Value of filter
     */
    function getProportion(maxValueFilter) {
      var positionPin = parseInt(effectLevelPin.style.left, 10);
      var value = maxValueFilter * positionPin / 100;

      return value;
    }

    return filterNames[filter];
  }

  // Change filter
  function changeFilter() {
    for (var i = 0; i < effectRadioInputs.length; i++) {

      if (effectRadioInputs[i].checked) {
        selectedRadioInput = effectRadioInputs[i];
        break;
      }
    }

    if (selectedRadioInput.value === 'none') {
      effectLevel.classList.add('hidden');

    } else if (selectedRadioInput.value !== 'none') {
      effectLevel.classList.remove('hidden');
    }

    picturePreview.className = '';
    picturePreview.classList.add(valueToClassName[selectedRadioInput.value]);
    picturePreview.style.filter = setFilter(selectedRadioInput.value);

  }

  // ESC keydown
  function documentKeydownHandler(evt) {
    var active = document.activeElement.parentNode;

    if (window.utils.isEscKeycode(evt)) {

      if (active !== formText) {
        closeForm();
      }
    }
  }

  // Open form
  function openForm() {
    formOverlay.classList.remove('hidden');
    effectLevel.style.cursor = 'pointer';
    formTextarea.setAttribute('maxlength', '140');
    formInputHashtags.focus();

    document.addEventListener('keydown', documentKeydownHandler);

    effectRadioInputs.forEach(function (item) {
      item.addEventListener('click', function () {
        setValueEffect(100);
      });
    });

    setScalePicture(100);
    setValueEffect(100);
  }

  // Close form
  function closeForm() {
    formOverlay.classList.add('hidden');

    document.removeEventListener('keydown', documentKeydownHandler);
    formTextarea.removeAttribute('maxlength', '140');

    formElement.reset();
    file.value = '';

    effectRadioInputs.forEach(function (item) {
      item.removeEventListener('click', changeFilter);
    });
  }

  function setValueEffect(value) {
    if (value > 100) {
      value = 100;

    } else if (value < 0) {
      value = 0;
    }

    effectLevelPin.style.left = value + '%';
    effectLevelDepth.style.width = value + '%';
    effectLevelValue.setAttribute('value', value);

    changeFilter();
  }

  // Moving the pin on the slider
  function effectLevelPinMouseDownHandler() {
    var coordsLevelLine = window.utils.getCoords(effectLevelLine);
    var widthEffectLevelLine = effectLevelLine.offsetWidth;

    function movePin(evt) {
      var x = evt.pageX - coordsLevelLine;
      var value = Math.floor(x / (widthEffectLevelLine / 100));

      evt.preventDefault();

      setValueEffect(value);
    }

    function mouseMoveHandler(evt) {
      movePin(evt);
    }

    document.addEventListener('mousemove', mouseMoveHandler);

    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
    });

    effectLevelPin.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', mouseMoveHandler);
    });
  }

  /**
   * Setting scale the picture
   * @param {Number} value
   */
  function setScalePicture(value) {
    formPicturePreview.style.transform = 'scale(' + value / 100 + ')';
    scaleValue.setAttribute('value', value);
  }

  // Change value filter on click
  function effectLevelLineClickHandler(evt) {
    var coordsLevelLine = window.utils.getCoords(effectLevelLine);
    var widthEffectLevelLine = effectLevelLine.offsetWidth;
    var position = evt.pageX - coordsLevelLine;
    var value = Math.floor(position / (widthEffectLevelLine / 100));

    setValueEffect(value);
  }

  // Downscale the picture
  function buttonScaleSmallerClickHandler() {
    var value = parseInt(scaleValue.value, 10);

    if (value !== Scale.MIN_SCALE) {
      value -= Scale.STEP_SCALE;
      scaleValue.value = value + '%';
    }

    setScalePicture(value);
  }

  // Upscale the picture
  function buttonScaleBiggerClickHandler() {
    var value = parseInt(scaleValue.value, 10);

    if (value !== Scale.MAX_SCALE) {
      value += Scale.STEP_SCALE;
      scaleValue.value = value + '%';
    }

    setScalePicture(value);
  }

  // Send data from FORM to server
  function formSubmitHandler() {

    showTransferMessage();

    // Failed transfer data
    function transferFailedHandler() {

      var template = document.querySelector('#error').content;
      var node = template.cloneNode(true);
      var wrapper = document.querySelector('.img-upload__overlay .img-upload__wrapper');

      wrapper.appendChild(node);

      document.querySelector('.error .error__buttons').children[0].addEventListener('click', function () {
        var error = document.querySelector('.error');

        if (error) {
          error.parentNode.removeChild(error);
        }

        closeTransferMessage();
        formSubmitHandler();
      });

      document.querySelector('.error .error__buttons').children[1].addEventListener('click', function () {
        var error = document.querySelector('.error');

        if (error) {
          error.parentNode.removeChild(error);
        }

        closeTransferMessage();
        file.click();
      });
    }

    // Success transfer data
    function transferCompleteHandler() {
      var template = document.querySelector('#success').content;
      var node = template.cloneNode(true);
      var wrapper = document.querySelector('.img-upload__overlay .img-upload__wrapper');

      wrapper.appendChild(node);

      document.querySelector('.success .success__button').addEventListener('click', function () {
        var success = document.querySelector('.success');

        if (success) {
          success.parentNode.removeChild(success);
        }

        closeTransferMessage();
        closeForm();
      });
    }

    window.backend.uploadData(new FormData(formElement), transferCompleteHandler, transferFailedHandler);
  }

  // Show transfer message
  function showTransferMessage() {
    var templateMessage = document.querySelector('#messages').content;
    var node = templateMessage.cloneNode(true);
    var preview = document.querySelector('.img-upload__preview');

    preview.appendChild(node);
  }

  // Close transfer message
  function closeTransferMessage() {
    var messages = document.querySelector('.img-upload__message');
    var preview = document.querySelector('.img-upload__preview');

    preview.removeChild(messages);
  }

  function formButtonCloseClickHandler() {
    closeForm();
  }

  // Listeners
  file.addEventListener('change', function (evt) {
    if (file.files.length > 0) {
      var urlPicture = window.URL.createObjectURL(file.files[0]);

      picturePreview.setAttribute('src', urlPicture);
    }

    openForm();

    if (window.utils.isEscKeycode(evt)) {
      closeForm();
    }
  });

  formButtonClose.addEventListener('click', formButtonCloseClickHandler);
  effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);
  effectLevel.addEventListener('click', effectLevelLineClickHandler);
  buttonScaleSmaller.addEventListener('click', buttonScaleSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', buttonScaleBiggerClickHandler);

  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (window.hashtags.validate()) {
      formSubmitHandler();
    }
  });
})();
