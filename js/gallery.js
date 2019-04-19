'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var filter = document.querySelector('.img-filters');

  function addListenerPictures() {
    filter.classList.remove('img-filters--inactive');

    function picturesElementClickHandler(evt) {
      var target = evt.target;
      var pictureImg = picturesElement.querySelector('.picture__img');

      if (target.tagName === 'IMG' &&
          target.className === pictureImg.classList.value) {
        window.preview.render(target.parentNode);
      }
    }

    // Listeners
    picturesElement.addEventListener('click', picturesElementClickHandler, true);
  }

  window.pictures(addListenerPictures);
})();
