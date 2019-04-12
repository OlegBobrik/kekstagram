'use strict';

(function () {

  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;

  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('.img-upload__start #upload-file');
  var imgOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgOverlayClose = imgUpload.querySelector('.img-upload__cancel');
  var effectLevel = imgOverlay.querySelector('.effect-level');
  var effectLevelValue = effectLevel.querySelector('.effect-level__value');
  var effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  var effectLevelLine = effectLevel.querySelector('.effect-level__line');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var imgPreview = imgOverlay.querySelector('.img-upload__preview');
  var img = imgPreview.querySelector('img');

  var scale = imgUpload.querySelector('.img-upload__scale');
  var scaleValue = scale.querySelector('.scale__control--value');
  var buttonScaleSmaller = scale.querySelector('.scale__control--smaller');
  var buttonScaleBigger = scale.querySelector('.scale__control--bigger');

  var effectsList = imgOverlay.querySelector('.effects__list');
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
   * Get a new value of filter
   *
   * @param {Number} maxValueFilter
   * @return {Number} Value of filter
   */
  function getProportion(maxValueFilter) {
    var positionPin = parseInt(effectLevelPin.style.left, 10);

    return maxValueFilter * positionPin / 100;
  }

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

  function documentEscPressHandler(evt) {

    if (window.utils.isEscKeycode(evt)) {
      closeImgOverlay();
    }
  }

  // Open overlay
  function openImgOverlay() {
    imgOverlay.classList.remove('hidden');
    coordsLevelLine = window.utils.getCoords(effectLevelLine);
    widthEffectLevelLine = effectLevelLine.offsetWidth;
    effectLevelLine.style.cursor = 'pointer';

    document.addEventListener('keydown', documentEscPressHandler);

    effectRadioInputs.forEach(function (item) {
      item.addEventListener('click', function () {
        setValueEffect(100);
      });
    });

    setScalePicture(100);
    setValueEffect(100);
  }

  // Close overlay
  function closeImgOverlay() {
    imgOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', documentEscPressHandler);

    effectRadioInputs.forEach(function (item) {
      item.removeEventListener('click', applyEffect);
    });

  }

  function setValueEffect(value) {
    effectLevelPin.style.left = value + '%';
    effectLevelDepth.style.width = value + '%';
    effectLevelValue.setAttribute('value', value);

    applyEffect();
  }

  // Drag'n'drop pin
  function effectLevelPinMouseDownHandler() {

    function movePin(evt) {
      var position = evt.pageX - coordsLevelLine;
      var value = Math.floor(position / (widthEffectLevelLine / 100));

      if (position < 0) {
        setValueEffect(0);

      } else if (position > widthEffectLevelLine) {
        setValueEffect(100);

      } else {
        setValueEffect(value);
      }
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

  function setScalePicture(value) {
    imgPreview.style.transform = 'scale(' + value / 100 + ')';
    scaleValue.setAttribute('value', value);
  }

  function effectLevelLineClickHandler(evt) {
    var position = evt.pageX - coordsLevelLine;
    var value = Math.floor(position / (widthEffectLevelLine / 100));

    setValueEffect(value);
  }

  // Downscale picture
  function buttonScaleSmallerClickHandler() {
    var value = parseInt(scaleValue.value, 10);

    if (value !== MIN_SCALE) {
      value -= STEP_SCALE;
      scaleValue.value = value + '%';
    }

    setScalePicture(value);
  }

  // Upscale picture
  function buttonScaleBiggerClickHandler() {
    var value = parseInt(scaleValue.value, 10);

    if (value !== MAX_SCALE) {
      value += STEP_SCALE;
      scaleValue.value = value + '%';
    }

    setScalePicture(value);
  }

  // Listeners
  uploadFile.addEventListener('change', function (evt) {
    openImgOverlay();

    if (window.utils.isEscKeycode(evt)) {
      closeImgOverlay();
    }
  });

  imgOverlayClose.addEventListener('click', closeImgOverlay);

  effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);

  effectLevelLine.addEventListener('click', effectLevelLineClickHandler);

  buttonScaleSmaller.addEventListener('click', buttonScaleSmallerClickHandler);

  buttonScaleBigger.addEventListener('click', buttonScaleBiggerClickHandler);

})();
