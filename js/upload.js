'use strict';

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
var uploadContainer = imgOverlay.querySelector('.img-upload__preview-container');

var effectsList = imgOverlay.querySelector('.effects__list');
var effectRadioInputs = effectsList.querySelectorAll('input[type="radio"]');
var noneEffect = effectsList.querySelector('#effect-none');
var chromeEffect = effectsList.querySelector('#effect-chrome');
var sepiaEffect = effectsList.querySelector('#effect-sepia');
var marvinEffect = effectsList.querySelector('#effect-marvin');
var phobosEffect = effectsList.querySelector('#effect-phobos');
var heatEffect = effectsList.querySelector('#effect-heat');

var coordsLevelLine = getCoords(effectLevelLine);
var widthEffectLevelLine = effectLevelLine.offsetWidth;

/**
 * Get a new value of filter
 * 
 * @param {Number} maxValueFilter
 */
function getProportion(maxValueFilter) {
  // Get width the slider block
  var widthEffectLevelLine = effectLevelLine.offsetWidth;
  // Get an actual position pin on slider
  var cssPropertyEffectLevelPin = getCssProperty(effectLevelPin, 'left');
  // Remove 'px'
  var positionEffectLevelPin = parseInt(cssPropertyEffectLevelPin, 10);

  return maxValueFilter * positionEffectLevelPin / widthEffectLevelLine;
}

function applyEffect() {
  // Reset position left to 100%
  // effectLevelPin.style.left = '100%';

  if (noneEffect.checked) {
    img.style.filter = 'none';
    effectLevel.classList.add('hidden');

  } else if (!noneEffect.checked) {
    effectLevel.classList.remove('hidden');
  }

  if (chromeEffect.checked) {
    var proportion = getProportion(1);

    img.classList.add('effects__preview--chrome');
    img.style.filter = 'grayscale( +' + proportion + ')';
    
  } else if (!chromeEffect.checked) {
    img.classList.remove('effects__preview--chrome');
  } 
  
  if (sepiaEffect.checked) {
    var proportion = getProportion(1);

    img.classList.add('effects__preview--sepia');
    img.style.filter = 'sepia( +' + proportion + ')';

  } else if (!sepiaEffect.checked) {
    img.classList.remove('effects__preview--sepia');
  }

  if (marvinEffect.checked) {
    var proportion = getProportion(100);

    img.classList.add('effects__preview--marvin');
    img.style.filter = 'invert( +' + proportion + '%' + ')';

  } else if (!marvinEffect.checked) {
    img.classList.remove('effects__preview--marvin');
  }

  if (phobosEffect.checked) {
    var proportion = getProportion(3);

    img.classList.add('effects__preview--phobos');
    img.style.filter = 'blur( +' + proportion + 'px' + ')';

  } else if (!phobosEffect.checked) {
    img.classList.remove('effects__preview--phobos');
  }

  if (heatEffect.checked) {
    var proportion = getProportion(3);

    img.classList.add('effects__preview--heat');
    img.style.filter = 'brightness(' + proportion + ')';

  } else if (!heatEffect.checked) {
    img.classList.remove('effects__preview--heat');
  }
};

function documentEscPressHandler(evt) {

  if (evt.keyCode === ESC_KEYCODE) {
    closeImgOverlay();
  }
}

// Open overlay
function openImgOverlay () {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', documentEscPressHandler);

  applyEffect();
}

// Close overlay
function closeImgOverlay () {
  imgOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', documentEscPressHandler);
}

// Drag'n'drop pin
function effectLevelPinMouseDownHandler() {

  function movePin(evt) {
    var position = evt.pageX - coordsLevelLine;
    var percent = Math.floor(position / (widthEffectLevelLine / 100));

    if (position < 0) {
      effectLevelPin.style.left = 0 + '%';

    } else if (position > widthEffectLevelLine) {
      effectLevelPin.style.left = 100 + '%';

    } else {
      effectLevelPin.style.left = percent + '%';
    }

    setValueEffect();
  }

  function mouseMoveHandler(evt) {
    movePin(evt);
  }

  document.addEventListener('mousemove', mouseMoveHandler);

  document.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMoveHandler)
  });

  effectLevelPin.addEventListener('mouseup', function () {
    document.removeEventListener('mousemove', mouseMoveHandler);
  });
}

function setValueEffect() {
  effectLevelDepth.style.width =  effectLevelPin.style.left;
  effectLevelValue.setAttribute('value', parseInt(effectLevelPin.style.left, 10));

  applyEffect();
}

function effectLevelLineHandler(evt) {
  var position = evt.pageX - coordsLevelLine;

  effectLevelPin.style.left = Math.floor(position / (widthEffectLevelLine / 100)) + '%';

  setValueEffect();
}

// Listeners
uploadFile.addEventListener('change', function (evt) {
  openImgOverlay();

  if (evt.keyCode === ESC_KEYCODE) {
    closeImgOverlay();
  }
});

imgOverlayClose.addEventListener('click', closeImgOverlay);

effectLevelPin.addEventListener('mousedown', effectLevelPinMouseDownHandler);

effectLevelLine.addEventListener('click', effectLevelLineHandler);

for (var i = 0; i < effectRadioInputs.length; i++) {
  effectRadioInputs[i].addEventListener('click', applyEffect);
}
