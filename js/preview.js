'use strict';

(function () {
  var SHOW_MAX_COMMENTS = 5;

  var currentObj;
  var counter = 0; // Counter of comments

  var fragment = document.createDocumentFragment();
  var previewPictureElement = document.querySelector('.big-picture');
  var buttonCommentsLoader = previewPictureElement.querySelector('.social__comments-loader');
  var nodeCommentElement = previewPictureElement.querySelector('.social__comment').cloneNode(true);
  var cancelPreview = previewPictureElement.querySelector('.big-picture__cancel');
  var inputSocialFooter = previewPictureElement.querySelector('.social__footer-text');

  /**
   * A popup's selected picture
   *
   * @param {Object} data
   */
  function renderPreview(data) {
    var id = data.getAttribute('data-id');

    currentObj = window.pictures[id];

    previewPictureElement.classList.remove('hidden');
    previewPictureElement.querySelector('.big-picture__img img').setAttribute('src', currentObj.url);
    previewPictureElement.querySelector('.likes-count').textContent = currentObj.likes;
    previewPictureElement.querySelector('.social__comment-count .comments-count').textContent = currentObj.comments.length;
    previewPictureElement.querySelector('.social__caption').textContent = currentObj.description;

    document.querySelector('body').classList.add('modal-open');
    document.addEventListener('keydown', previewPictureElementKeydownHandler);
    previewPictureElement.addEventListener('click', previewPictureElementClickHandler);

    removeAllCommentsPreview();
    addCommentsToPreview();
  }

  // Adding { SHOW_MAX_COMMENTS } or less comments to the preview a picture
  function addCommentsToPreview() {
    var commentsCount = currentObj.comments.length;
    var t = counter;

    if (commentsCount - t > SHOW_MAX_COMMENTS) {

      for (var i = t; i < SHOW_MAX_COMMENTS + t; i++) {
        addCommentToFragment(currentObj, i);
      }
    } else {

      for (var j = counter; j < commentsCount; j++) {
        addCommentToFragment(currentObj, j);
      }
    }

    previewPictureElement.querySelector('.social__comments').appendChild(fragment);
    previewPictureElement.querySelector('.social__comment-count').childNodes[0].textContent = counter + ' из ';

    if (counter === currentObj.comments.length) {
      buttonCommentsLoader.classList.add('hidden');
      counter = 0;

    } else {
      buttonCommentsLoader.classList.remove('hidden');
    }
  }

  // Add one comment to fragment
  function addCommentToFragment(obj, index) {
    var node = nodeCommentElement.cloneNode(true);
    var avatar = obj.comments[index].avatar;
    var comment = obj.comments[index].message;

    node.querySelector('.social__text').textContent = comment;
    node.querySelector('.social__picture').setAttribute('src', avatar);

    counter++;

    fragment.appendChild(node);
  }

  // Remove all comments in the preview
  function removeAllCommentsPreview() {
    var socialComments = previewPictureElement.querySelector('.social__comments');
    var length = socialComments.children.length;

    for (var i = 0; i < length; i++) {
      var li = socialComments.querySelector('li');

      socialComments.removeChild(li);
    }
  }

  // Close popup
  function closePreviewPopup() {
    previewPictureElement.classList.add('hidden');

    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', previewPictureElementKeydownHandler);
    previewPictureElement.removeEventListener('click', closePreviewPopup);

    counter = 0;

    removeAllCommentsPreview();
  }

  // ESC keydown
  function previewPictureElementKeydownHandler(evt) {
    if (window.utils.isEscKeycode(evt)) {

      if (document.activeElement !== inputSocialFooter) {
        closePreviewPopup();
      }
    }
  }

  // Close preview on click the overlay
  function previewPictureElementClickHandler(evt) {
    if (evt.target.classList.contains('overlay')) {
      closePreviewPopup();
    }
  }

  // Show more comments
  function buttonCommentsLoaderClickHandler() {
    addCommentsToPreview();
  }

  // Listeners
  cancelPreview.addEventListener('click', closePreviewPopup);
  buttonCommentsLoader.addEventListener('click', buttonCommentsLoaderClickHandler);

  // Window
  window.preview = renderPreview;
})();
