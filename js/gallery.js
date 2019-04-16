'use strict';

(function () {
  var containerPictures = document.querySelector('.pictures');

  function openPreview(evt) {
    var target = evt.target;
    var pictureImg = containerPictures.querySelector('.picture__img');

    while (target !== containerPictures) {

      if (target.className === pictureImg.classList.value) {
        window.preview.render(target.parentNode);
      }

      target = target.parentNode;
    }
  }

  // Listeners
  function AddListener() {
    containerPictures.addEventListener('click', openPreview);
  }

  window.pictures(AddListener);

})();
