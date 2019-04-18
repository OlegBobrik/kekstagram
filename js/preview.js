'use strict';

(function () {
  var SHOW_MAX_COMMENTS = 5;

  var currentData; // Current object
  var counter = 0; // Counter of comments

  var fragment = document.createDocumentFragment();
  var bigPicture = document.querySelector('.big-picture');
  var buttonCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var nodeComment = bigPicture.querySelector('.social__comment').cloneNode(true);
  var cancelBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var inputSocialFooter = bigPicture.querySelector('.social__footer-text');

  /**
   * A popup's selected picture
   *
   * @param {Object} data
   */
  function renderPreview(data) {
    var id = data.getAttribute('id');

    currentData = window.pictures.photosArray()[id];

    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', currentData.url);
    bigPicture.querySelector('.likes-count').textContent = currentData.likes;
    bigPicture.querySelector('.social__comment-count .comments-count').textContent = currentData.comments.length;
    bigPicture.querySelector('.social__caption').textContent = currentData.description;

    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', bigPictureEscPressHandler);
    bigPicture.addEventListener('click', bigPictureClickHandler);

    removeAllCommentsPreview();
    addCommentsToPreview();
  }

  // Adding { SHOW_MAX_COMMENTS } or less comments to the preview popup
  function addCommentsToPreview() {
    var commentsCount = currentData.comments.length;
    var t = counter;

    if (commentsCount - t > SHOW_MAX_COMMENTS) {

      for (var i = t; i < SHOW_MAX_COMMENTS + t; i++) {
        addCommentToFragment(currentData, i);
      }
    } else {

      for (var j = counter; j < commentsCount; j++) {
        addCommentToFragment(currentData, j);
      }
    }

    bigPicture.querySelector('.social__comments').appendChild(fragment);
    bigPicture.querySelector('.social__comment-count').childNodes[0].textContent = counter + ' из ';

    if (counter === currentData.comments.length) {
      buttonCommentsLoader.classList.add('hidden');
      counter = 0;

    } else {
      buttonCommentsLoader.classList.remove('hidden');
    }
  }

  // Adding one comment to fragment
  function addCommentToFragment(obj, index) {
    var node = nodeComment.cloneNode(true);
    var avatar = obj.comments[index].avatar;
    var comment = obj.comments[index].message;

    node.querySelector('.social__text').textContent = comment;
    node.querySelector('.social__picture').setAttribute('src', avatar);

    counter++;

    fragment.appendChild(node);
  }

  //  Remove all comments in the popup's preview
  function removeAllCommentsPreview() {
    var socialComments = bigPicture.querySelector('.social__comments');
    var length = socialComments.children.length;

    for (var i = 0; i < length; i++) {
      var li = socialComments.querySelector('li');

      socialComments.removeChild(li);
    }
  }

  // Close popup
  function closePreviewPopup() {
    bigPicture.classList.add('hidden');

    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', bigPictureEscPressHandler);
    bigPicture.removeEventListener('click', closePreviewPopup);

    counter = 0;

    removeAllCommentsPreview();
  }

  // ESC keydown
  function bigPictureEscPressHandler(evt) {
    if (window.utils.isEscKeycode(evt)) {

      if (document.activeElement !== inputSocialFooter) {
        closePreviewPopup();
      }
    }
  }

  // Click
  function bigPictureClickHandler(evt) {
    if (evt.target === bigPicture) {
      closePreviewPopup();
    }
  }

  // Show more comments
  function buttonCommentsLoaderHandler() {
    addCommentsToPreview();
  }

  // Listeners
  cancelBigPicture.addEventListener('click', closePreviewPopup);

  buttonCommentsLoader.addEventListener('click', buttonCommentsLoaderHandler);

  // Window
  window.preview = {
    render: function (data) {
      renderPreview(data);
    }
  };
})();
