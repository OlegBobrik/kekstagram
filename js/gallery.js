'use strict';

(function () {
  var containerPictures = document.querySelector('.pictures');

  function addListenerOpenPreviewPopup() {

    function openPreviewPopup(evt) {
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
    containerPictures.addEventListener('click', openPreviewPopup);
  }

  window.pictures(addListenerOpenPreviewPopup);

})();
