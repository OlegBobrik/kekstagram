'use strict';

var imgUpload = document.querySelector('.img-upload');
var uploadFile = imgUpload.querySelector('.img-upload__start #upload-file');
var imgOverlay = imgUpload.querySelector('.img-upload__overlay');
var imgOverlayClose = imgUpload.querySelector('.img-upload__cancel');
var effectLevel = imgOverlay.querySelector('.effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
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

// Get width the slider block
var widthEffectLevelLine = effectLevelLine.offsetWidth;

function getActualPositionPin() {
  // Get an actual position pin on slider
  var cssPropertyEffectLevelPin = getCssProperty(effectLevelPin, 'left');
  // Remove 'px'
  var positionEffectLevelPin = parseInt(cssPropertyEffectLevelPin, 10);

  return positionEffectLevelPin;
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
    var position = getActualPositionPin();
    var proportion = (1 * position ) / widthEffectLevelLine;

    img.classList.add('effects__preview--chrome');
    img.style.filter = 'grayscale( +' + proportion + ')';
    
  } else if (!chromeEffect.checked) {
    img.classList.remove('effects__preview--chrome');
  } 
  
  if (sepiaEffect.checked) {
    var position = getActualPositionPin();
    var proportion = (1 * position ) / widthEffectLevelLine;

    img.classList.add('effects__preview--sepia');
    img.style.filter = 'sepia( +' + proportion + ')';

  } else if (!sepiaEffect.checked) {
    img.classList.remove('effects__preview--sepia');
  }

  if (marvinEffect.checked) {
    var position = getActualPositionPin();
    var proportion = (100 * position ) / widthEffectLevelLine;

    img.classList.add('effects__preview--marvin');
    img.style.filter = 'invert( +' + proportion + '%' + ')';

  } else if (!marvinEffect.checked) {
    img.classList.remove('effects__preview--marvin');
  }

  if (phobosEffect.checked) {
    var position = getActualPositionPin();
    var proportion = (3 * position ) / widthEffectLevelLine;

    img.classList.add('effects__preview--phobos');
    img.style.filter = 'blur( +' + proportion + 'px' + ')';

  } else if (!phobosEffect.checked) {
    img.classList.remove('effects__preview--phobos');
  }

  if (heatEffect.checked) {
    var position = getActualPositionPin();
    var proportion = (3 * position ) / widthEffectLevelLine;

    img.classList.add('effects__preview--heat');
    img.style.filter = 'brightness(' + proportion + ')';

  } else if (!heatEffect.checked) {
    img.classList.remove('effects__preview--heat');
  }
};

applyEffect();

// ESC keydown
function onImgOverlayEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgOverlay();
  }
}

// Open overlay
function openImgOverlay () {
  imgOverlay.classList.remove('hidden');
  document.addEventListener('keydown', onImgOverlayEscPress);
}

// Close overlay
function closeImgOverlay () {
  imgOverlay.classList.add('hidden');
  uploadFile.value = '';
  document.removeEventListener('keydown', onImgOverlayEscPress);
}

// Listeners
uploadFile.addEventListener('change', function (evt) {
  openImgOverlay();

  if (evt.keyCode === ESC_KEYCODE) {
    closeImgOverlay();
  }
});

imgOverlayClose.addEventListener('click', closeImgOverlay);

// effectLevelPin.addEventListener('mouseup', applyEffect);

for (var i = 0; i < effectRadioInputs.length; i++) {
  effectRadioInputs[i].addEventListener('click', applyEffect);
}
