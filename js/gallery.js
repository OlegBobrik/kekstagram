'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content;
  var picturesElement = document.querySelector('.pictures');
  var formFilter = document.querySelector('.img-filters');
  var formFilterButtons = formFilter.querySelectorAll('button[type="button"]');
  var buttonFilterPopular = formFilter.querySelector('#filter-popular');
  var buttonFilterNew = formFilter.querySelector('#filter-new');
  var buttonFilterDiscussed = formFilter.querySelector('#filter-discussed');

  /**
   * Generating and adding to the DOM one picture
   *
   * @param {Object} data
   */
  function createSmallPicture(data) {
    var node = template.cloneNode(true);

    node.querySelector('.picture').setAttribute('data-id', data.id);
    node.querySelector('.picture__img').setAttribute('src', data.url);
    node.querySelector('.picture__likes').textContent = data.likes;
    node.querySelector('.picture__comments').textContent = data.comments.length;

    fragment.appendChild(node);
  }

  function successCreateObjects() {
    var objects = window.pictures.arrayObjects();
    var copyObjects = objects.slice();

    formFilter.classList.remove('img-filters--inactive');

    /**
     * Render pictures on main page from array of objects
     * @param {Object} pictureCollection
     */
    function renderPictures(pictureCollection) {
      var picture = picturesElement.querySelectorAll('.picture');

      if (picture.length !== 0) {
        for (var i = 0; i < picture.length; i++) {
          picturesElement.removeChild(picture[i]);
        }
      }

      pictureCollection.forEach(function (item) {
        createSmallPicture(item);
      });

      picturesElement.appendChild(fragment);
    }

    // Click handler
    function picturesElementClickHandler(evt) {
      var pictureImg = picturesElement.querySelector('.picture__img');
      var target = evt.target;
      var tagName = 'IMG';

      if (target.tagName === tagName &&
          target.className === pictureImg.classList.value) {
        window.preview.render(target.parentNode);
      }
    }

    // Click handler
    function buttonFilterPopularClickHandler() {
      copyObjects.sort(function (a, b) {
        if (a.likes < b.likes) {
          return 1;
        }
        if (a.likes > b.likes) {
          return -1;
        }
        return 0;
      });

      renderPictures(copyObjects);
    }

    // Click handler
    function buttonFilterNewClickHandler() {
      // buttonFilterNew.classList.add('.img-filters__button--active');
    }

    // Click handler
    function buttonFilterDiscussedClickHandler() {
      copyObjects.sort(function (a, b) {
        if (a.comments.length < b.comments.length) {
          return 1;
        }
        if (a.comments.length > b.comments.length) {
          return -1;
        }
        return 0;
      });

      renderPictures(copyObjects);
    }

    // Click handler
    function formFilterClickHandler(evt) {
      var target = evt.target;
      var tagName = 'BUTTON';

      if (target.tagName === tagName) {
        formFilterButtons.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });

        target.classList.add('img-filters__button--active');
      }
    }

    // Listeners
    picturesElement.addEventListener('click', picturesElementClickHandler);

    buttonFilterPopular.addEventListener('click', function () {
      if (!buttonFilterPopular.classList.contains('img-filters__button--active')) {
        buttonFilterPopularClickHandler();
      }
    });

    buttonFilterNew.addEventListener('click', function () {
      if (!buttonFilterNew.classList.contains('img-filters__button--active')) {
        buttonFilterNewClickHandler();
      }
    });

    buttonFilterDiscussed.addEventListener('click', function () {
      if (!buttonFilterDiscussed.classList.contains('img-filters__button--active')) {
        buttonFilterDiscussedClickHandler();
      }
    });

    formFilter.addEventListener('click', formFilterClickHandler);

    renderPictures(objects);
  }

  window.pictures(successCreateObjects);
})();
