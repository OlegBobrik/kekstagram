'use strict';

(function () {
  var containerPictures = document.querySelector('.pictures');

  function openPreview(evt) {
    var target = evt.target;
    var pictureImg = containerPictures.querySelector('.picture__img');

    while (target !== containerPictures) {

      if (target.className === pictureImg.classList.value) {
        window.preview.openPreview(target.parentNode);
      }

      target = target.parentNode;
    }
  }

  // Listeners
  containerPictures.addEventListener('click', openPreview);

})();
