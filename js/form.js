'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;

  // var hashTag = '';

  var imgUpload = document.querySelector('.img-upload');
  var uploadFile = imgUpload.querySelector('.img-upload__start #upload-file');
  var imgOverlay = imgUpload.querySelector('.img-upload__overlay');
  var imgOverlayText = imgUpload.querySelector('.img-upload__text');
  // var imgOverlayTextHashtag = imgOverlay.querySelector('.text__hashtags');
  var imgOverlayTextDescription = imgOverlay.querySelector('.text__description');
  // var form = document.querySelector('.img-upload__form');
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

      if (active !== imgOverlayText) {
        closeImgOverlay();
      }
    }
  }

  // Open overlay
  function openImgOverlay() {
    imgOverlay.classList.remove('hidden');
    coordsLevelLine = window.utils.getCoords(effectLevelLine);
    widthEffectLevelLine = effectLevelLine.offsetWidth;
    effectLevel.style.cursor = 'pointer';
    imgOverlayTextDescription.setAttribute('maxlength', '140');

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
    imgOverlayTextDescription.removeAttribute('maxlength', '140');

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

  // Drag'n'drop pin
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

  // var hashTagsArray = [];
  // var validate = true;

  // function setCustomValidity(hashtag) {

  //   if (hashtag.charAt(0) === '#' &&
  //     hashtag.length > 1 &&
  //     hashtag.length < 20) {
  //     hashTagsArray.push(hashtag.toLowerCase());
  //     validate = true;
  //     // console.log(hashtag);
  //   } else {
  //     validate = false;
  //   }

  //   console.log('hashtag: ' + hashTagsArray);

  //   return validate;
  // }

  // Listeners
  uploadFile.addEventListener('change', function (evt) {
    openImgOverlay();

    if (window.utils.isEscKeycode(evt)) {
      closeImgOverlay();
    }
  });

  // imgOverlayTextHashtag.addEventListener('input', function (evt) {

  //   if (evt.data !== ' ') {
  //     hashTag += evt.data;
  //   } else {

  //     setCustomValidity(hashTag);
  //     hashTag = '';
  //   }

  //   if (evt.data === null) {
  //     hashTag = '';
  //   }

  //   console.log(hashTag);
  // });

  imgOverlayClose.addEventListener('click', closeImgOverlay);

  effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);

  effectLevel.addEventListener('click', effectLevelLineClickHandler);

  buttonScaleSmaller.addEventListener('click', buttonScaleSmallerClickHandler);

  buttonScaleBigger.addEventListener('click', buttonScaleBiggerClickHandler);

  // form.addEventListener('submit', function (evt) {
  //   if (!validate) {
  //     evt.preventDefault();
  //   }
  // });
})();
