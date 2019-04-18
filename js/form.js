'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;

  var form = document.querySelector('.img-upload__form');
  var file = form.querySelector('.img-upload__start #upload-file');
  var formOverlay = form.querySelector('.img-upload__overlay');
  var formOverlayText = form.querySelector('.img-upload__text');
  var formOverlayTextDescription = formOverlay.querySelector('.text__description');
  var formOverlayClose = form.querySelector('.img-upload__cancel');
  var imgPreview = formOverlay.querySelector('.img-upload__preview');
  var effectLevel = formOverlay.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var img = imgPreview.querySelector('img');

  // Scale the picture
  var scale = form.querySelector('.img-upload__scale');
  var scaleValue = scale.querySelector('.scale__control--value');
  var buttonScaleSmaller = scale.querySelector('.scale__control--smaller');
  var buttonScaleBigger = scale.querySelector('.scale__control--bigger');

  // Radio buttons (filters)
  var effectsList = formOverlay.querySelector('.effects__list');
  var effectRadioInputs = effectsList.querySelectorAll('input[type="radio"]');
  var noneEffect = effectsList.querySelector('#effect-none');
  var chromeEffect = effectsList.querySelector('#effect-chrome');
  var sepiaEffect = effectsList.querySelector('#effect-sepia');
  var marvinEffect = effectsList.querySelector('#effect-marvin');
  var phobosEffect = effectsList.querySelector('#effect-phobos');
  var heatEffect = effectsList.querySelector('#effect-heat');

  var coordsLevelLine;
  var widthEffectLevelLine;

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

  // Apply effect
  function applyEffect() {
    if (noneEffect.checked) {
      img.style.filter = 'none';
      effectLevel.classList.add('hidden');

    } else if (!noneEffect.checked) {
      effectLevel.classList.remove('hidden');
    }

    if (chromeEffect.checked) {
      img.classList.add('effects__preview--chrome');
      img.style.filter = 'grayscale( +' + getProportion(1) + ')';

    } else if (!chromeEffect.checked) {
      img.classList.remove('effects__preview--chrome');
    }

    if (sepiaEffect.checked) {
      img.classList.add('effects__preview--sepia');
      img.style.filter = 'sepia( +' + getProportion(1) + ')';

    } else if (!sepiaEffect.checked) {
      img.classList.remove('effects__preview--sepia');
    }

    if (marvinEffect.checked) {
      img.classList.add('effects__preview--marvin');
      img.style.filter = 'invert( +' + getProportion(100) + '%' + ')';

    } else if (!marvinEffect.checked) {
      img.classList.remove('effects__preview--marvin');
    }

    if (phobosEffect.checked) {
      img.classList.add('effects__preview--phobos');
      img.style.filter = 'blur( +' + getProportion(3) + 'px' + ')';

    } else if (!phobosEffect.checked) {
      img.classList.remove('effects__preview--phobos');
    }

    if (heatEffect.checked) {
      img.classList.add('effects__preview--heat');
      img.style.filter = 'brightness(' + getProportion(3) + ')';

    } else if (!heatEffect.checked) {
      img.classList.remove('effects__preview--heat');
    }
  }

  // ESC keydown
  function documentEscPressHandler(evt) {
    var active = document.activeElement.parentNode;

    if (window.utils.isEscKeycode(evt)) {

      if (active !== formOverlayText) {
        closeForm();
      }
    }
  }

  // Open form
  function openForm() {
    formOverlay.classList.remove('hidden');
    coordsLevelLine = window.utils.getCoords(effectLevelLine);
    widthEffectLevelLine = effectLevelLine.offsetWidth;
    effectLevel.style.cursor = 'pointer';
    formOverlayTextDescription.setAttribute('maxlength', '140');

    document.addEventListener('keydown', documentEscPressHandler);

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

    document.removeEventListener('keydown', documentEscPressHandler);
    formOverlayTextDescription.removeAttribute('maxlength', '140');

    form.reset();
    file.value = '';

    effectRadioInputs.forEach(function (item) {
      item.removeEventListener('click', applyEffect);
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

    applyEffect();
  }

  // Moving the pin on the slider
  function effectLevelPinMouseDownHandler() {

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
    imgPreview.style.transform = 'scale(' + value / 100 + ')';
    scaleValue.setAttribute('value', value);
  }

  // Change value filter on click
  function effectLevelLineClickHandler(evt) {
    var position = evt.pageX - coordsLevelLine;
    var value = Math.floor(position / (widthEffectLevelLine / 100));

    setValueEffect(value);
  }

  // Downscale the picture
  function buttonScaleSmallerClickHandler() {
    var value = parseInt(scaleValue.value, 10);

    if (value !== MIN_SCALE) {
      value -= STEP_SCALE;
      scaleValue.value = value + '%';
    }

    setScalePicture(value);
  }

  // Upscale the picture
  function buttonScaleBiggerClickHandler() {
    var value = parseInt(scaleValue.value, 10);

    if (value !== MAX_SCALE) {
      value += STEP_SCALE;
      scaleValue.value = value + '%';
    }

    setScalePicture(value);
  }

  // Send data from FORM to server
  function formSubmitHandler() {

    // Failed upload data
    function errorSendDataHandler() {
      var template = document.querySelector('#error').content;
      var node = template.cloneNode(true);
      var wrapper = document.querySelector('.img-upload__overlay .img-upload__wrapper');

      wrapper.appendChild(node);

      document.querySelector('.error .error__buttons').children[0].addEventListener('click', function () {
        var error = document.querySelector('.error');

        if (error) {
          error.parentNode.removeChild(error);
        }

        formSubmitHandler();
      });

      document.querySelector('.error .error__buttons').children[1].addEventListener('click', function () {
        var error = document.querySelector('.error');

        if (error) {
          error.parentNode.removeChild(error);
        }
        document.querySelector('#upload-file').click();
      });
    }

    // Success upload data
    function successSendDataHandler() {
      var template = document.querySelector('#success').content;
      var node = template.cloneNode(true);
      var wrapper = document.querySelector('.img-upload__overlay .img-upload__wrapper');

      wrapper.appendChild(node);

      document.querySelector('.success .success__button').addEventListener('click', function () {
        var success = document.querySelector('.success');

        if (success) {
          success.parentNode.removeChild(success);
        }

        closeForm();
      });
    }

    window.backend.uploadData(new FormData(form), successSendDataHandler, errorSendDataHandler);
  }

  // Listeners
  file.addEventListener('change', function (evt) {
    var urlPicture = window.URL.createObjectURL(file.files[0]);

    img.setAttribute('src', urlPicture);

    openForm();

    if (window.utils.isEscKeycode(evt)) {
      closeForm();
    }
  });

  formOverlayClose.addEventListener('click', closeForm);
  effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);
  effectLevel.addEventListener('click', effectLevelLineClickHandler);
  buttonScaleSmaller.addEventListener('click', buttonScaleSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', buttonScaleBiggerClickHandler);

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (window.hashtags.validate()) {
      formSubmitHandler();
    }
  });
})();
