'use strict';

(function () {
  var photos = [];
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content;
  var containerPictures = document.querySelector('.pictures');

  /**
   * A Photo-object
   *
   * @param {Number} id - ID object
   * @param {Object} data
   */
  function Photo(id, data) {
    this.url = data.url;
    this.likes = data.likes;
    this.comments = data.comments;
    this.description = data.description;
    this.id = id;
  }

  /**
   * Generating and adding to the DOM one picture
   *
   * @param {Object} data
   */
  function createSmallPicture(data) {
    var node = template.cloneNode(true);

    node.querySelector('.picture').setAttribute('id', data.id);
    node.querySelector('.picture__img').setAttribute('src', data.url);
    node.querySelector('.picture__likes').textContent = data.likes;
    node.querySelector('.picture__comments').textContent = data.comments.length;

    fragment.appendChild(node);
  }

  function successHandler(data) {
    for (var i = 0; i < data.length; i++) {
      photos.push(new Photo(i, data[i]));

      createSmallPicture(photos[i]);
    }

    containerPictures.appendChild(fragment);
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  // Window
  window.pictures = {
    photosArray: function () {
      return photos;
    }
  };

  window.backend(successHandler, errorHandler);

})();
