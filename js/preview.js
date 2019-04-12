'use strict';

(function () {

  var SHOW_MAX_COMMENTS = 5;

  var currentObj; // Current object
  var counter = 0; // Counter of comments

  var fragment = document.createDocumentFragment();
  var bigPicture = document.querySelector('.big-picture');
  var buttonCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var nodeComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');

  /**
   * A popup's selected picture
   *
   * @param {Object} obj
   */
  function renderBigPicture(obj) {
    var src = obj.parentNode.querySelector('.picture__img').getAttribute('src');
    var commentsCount = obj.parentNode.querySelector('.picture__comments').textContent;
    var like = obj.parentNode.querySelector('.picture__likes').textContent;
    var id = obj.parentNode.getAttribute('id');

    currentObj = window.pictures.photosArray()[id];

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', src);
    bigPicture.querySelector('.likes-count').textContent = like;
    bigPicture.querySelector('.social__comment-count .comments-count').textContent = commentsCount;
    bigPicture.querySelector('.social__caption').textContent = currentObj.description;

    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', bigPictureEscPressHandler);

    removeAllCommentsBigPicture();
    addCommentsToBigPicture();
  }

  // Adding 5 or less comments to the block .big-picture
  function addCommentsToBigPicture() {
    var commentsCount = currentObj.comments.length;
    var t = counter;

    if (commentsCount - t > SHOW_MAX_COMMENTS) {

      for (var i = t; i < SHOW_MAX_COMMENTS + t; i++) {
        addOneCommentToFragment(currentObj, i);
      }
    } else {

      for (var j = counter; j < commentsCount; j++) {
        addOneCommentToFragment(currentObj, j);
      }
    }

    bigPicture.querySelector('.social__comments').appendChild(fragment);
    bigPicture.querySelector('.social__comment-count').childNodes[0].textContent = counter + ' из ';

    if (counter === currentObj.comments.length) {
      buttonCommentsLoader.classList.add('hidden');
      counter = 0;

    } else {
      buttonCommentsLoader.classList.remove('hidden');
    }
  }

  // Adding one comment to fragment
  function addOneCommentToFragment(obj, index) {
    var node = nodeComment.cloneNode(true);
    var avatar = window.data.getAvatar();

    node.querySelector('.social__text').textContent = obj.comments[index];
    node.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + avatar + '.svg');

    counter++;

    fragment.appendChild(node);
  }

  // Remove all comments the block .big-picture
  function removeAllCommentsBigPicture() {
    var socialComments = bigPicture.querySelector('.social__comments');
    var length = socialComments.children.length;

    for (var i = 0; i < length; i++) {
      var li = socialComments.querySelector('li');

      socialComments.removeChild(li);
    }
  }

  // Close popup
  function closeBigPicture() {
    bigPicture.classList.add('hidden');

    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', bigPictureEscPressHandler);

    counter = 0;

    removeAllCommentsBigPicture();
  }

  function bigPictureEscPressHandler(evt) {

    if (window.utils.isEscKeycode(evt)) {
      closeBigPicture();
    }
  }

  // Show more comments
  function buttonCommentsLoaderHandler() {
    addCommentsToBigPicture();
  }

  // Listeners
  cancelBigPicture.addEventListener('click', closeBigPicture);

  buttonCommentsLoader.addEventListener('click', buttonCommentsLoaderHandler);

  // Window
  window.preview = {
    openPreview: function (obj) {
      renderBigPicture(obj);
    }
  };

})();
