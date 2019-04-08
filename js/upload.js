'use strict';

var uploadFile = document.querySelector('.img-upload__start #upload-file');
var imgOverlay = document.querySelector('.img-upload__overlay');
var imgOverlayClose = imgOverlay.querySelector('.img-upload__cancel');
var effectLevel = imgOverlay.querySelector('.effect-level');
var effectLevelValue = effectLevel.querySelector('.effect-level__value');
var effectLevelLine = effectLevel.querySelector('.effect-level__line');
var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
var imgPreview = imgOverlay.querySelector('.img-upload__preview');

var effectsList = document.querySelector('.effects__list');
var effectRadioInputs = effectsList.querySelectorAll('input[type="radio"]');
var noneEffect = effectsList.querySelector('#effect-none');
var chromeEffect = effectsList.querySelector('#effect-chrome');
var sepiaEffect = effectsList.querySelector('#effect-sepia');
var marvinEffect = effectsList.querySelector('#effect-marvin');
var phobosEffect = effectsList.querySelector('#effect-phobos');
var heatEffect = effectsList.querySelector('#effect-heat');

var widthEffectLevelLine = effectLevelLine.offsetWidth;

function applyEffect() {

  if (noneEffect.checked) {
    effectLevel.classList.add('hidden');
  } else if (!noneEffect.checked) {
    effectLevel.classList.remove('hidden');
  }

  if (chromeEffect.checked) {
    imgPreview.classList.add('effects__preview--chrome');
  } else if (!chromeEffect.checked) {
    imgPreview.classList.remove('effects__preview--chrome');
  } 
  
  if (sepiaEffect.checked) {
    imgPreview.classList.add('effects__preview--sepia');
  } else if (!sepiaEffect.checked) {
    imgPreview.classList.remove('effects__preview--sepia');
  }

  if (marvinEffect.checked) {
    imgPreview.classList.add('effects__preview--marvin');
  } else if (!marvinEffect.checked) {
    imgPreview.classList.remove('effects__preview--marvin');
  }

  if (phobosEffect.checked) {
    imgPreview.classList.add('effects__preview--phobos');
  } else if (!phobosEffect.checked) {
    imgPreview.classList.remove('effects__preview--phobos');
  }

  if (heatEffect.checked) {
    imgPreview.classList.add('effects__preview--heat');
  } else if (!heatEffect.checked) {
    imgPreview.classList.remove('effects__preview--heat');
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

effectLevelPin.addEventListener('mouseup', function () {
  console.log(1);
});

for (var i = 0; i < effectRadioInputs.length; i++) {
  effectRadioInputs[i].addEventListener('click', applyEffect);
}
