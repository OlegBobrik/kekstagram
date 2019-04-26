'use strict';

(function () {
  var photos = [];

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

  window.pictures = function (successCreateObjects) {
    function successHandler(data) {
      for (var i = 0; i < data.length; i++) {
        photos.push(new Photo(i, data[i]));
      }

      successCreateObjects();
    }

    function errorHandler(errorMessage) {
      var node = document.createElement('div');

      node.style = 'z-index: 1000; margin: 23px auto; text-align: center; background-color: rgb(255, 78, 78);';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.width = '30%';
      node.style.borderRadius = '3px';
      node.style.fontSize = '12px';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }

    // Window
    window.pictures = photos;
    window.backend.loadData(successHandler, errorHandler);
  };
})();
