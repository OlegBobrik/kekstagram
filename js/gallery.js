'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content;
  var picturesElement = document.querySelector('.pictures');
  var formFilter = document.querySelector('.img-filters');
  var formFilterButtons = formFilter.querySelectorAll('button[type="button"]');
  var lastTimeout;

  /**
   * Generate and add to the DOM one picture
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
    var objects = window.pictures;

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

    // Open preview
    function picturesElementClickHandler(evt) {
      var pictureImg = picturesElement.querySelector('.picture__img');
      var target = evt.target;
      var tagName = 'IMG';

      if (target.tagName === tagName &&
          target.className === pictureImg.classList.value) {
        window.preview(target.parentNode);
      }
    }

    // Sort by date
    function sortArrayByDate() {
      var copyObjects = objects.slice();

      copyObjects.sort(function () {
        return window.utils.randomSort();
      });

      renderPictures(copyObjects.slice(0, 10));
    }

    // Sort by comments
    function sortArrayByComments() {
      var copyObjects = objects.slice();

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

    // Form filter click handler
    function formFilterClickHandler(evt) {
      var targetId = evt.target.id;

      switch (targetId) {
        case 'filter-new':
          sortArrayByDate();
          break;
        case 'filter-discussed':
          sortArrayByComments();
          break;
        default:
          renderPictures(objects);
      }
    }

    // Listeners
    picturesElement.addEventListener('click', picturesElementClickHandler);

    formFilter.addEventListener('click', function (evt) {
      var target = evt.target;
      var tagName = 'BUTTON';
      var classActive = 'img-filters__button--active';

      if (!(target.classList.contains(classActive)) &&
        (target.tagName === tagName)) {
        formFilterButtons.forEach(function (item) {
          item.classList.remove(classActive);
        });

        target.classList.add(classActive);

        if (lastTimeout) {
          clearTimeout(lastTimeout);
        }

        lastTimeout = setTimeout(formFilterClickHandler, 500, evt);
      }
    });

    renderPictures(objects);
  }

  // Window
  window.pictures(successCreateObjects);
})();
