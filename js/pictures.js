'use strict';

(function () {

  var photos = window.data.getArray(); // Get array with random sort of numbers
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#picture').content;
  var containerPictures = document.querySelector('.pictures');

  /**
   * A Photo-object
   *
   * @param {Number} index - A random index from array
   */
  function Photo(index) {
    this.url = 'photos/' + photos[index] + '.jpg';
    this.likes = window.data.getLikes();
    this.comments = window.data.getComments();
    this.description = window.data.getDescription();
    this.id = index;
  }

  /**
   * Generating and adding to the DOM one picture
   *
   * @param {Object} obj
   */
  function createSmallPicture(obj) {
    var node = template.cloneNode(true);

    node.querySelector('.picture').setAttribute('id', obj.id);
    node.querySelector('.picture__img').setAttribute('src', obj.url);
    node.querySelector('.picture__likes').textContent = obj.likes;
    node.querySelector('.picture__comments').textContent = obj.comments.length;

    fragment.appendChild(node);
  }

  for (var i = 0; i < photos.length; i++) {
    photos[i] = new Photo(i);

    createSmallPicture(photos[i]);

    containerPictures.appendChild(fragment);
  }

  // Window
  window.pictures = {

    photosArray: function () {
      return photos;
    }

  };

})();
