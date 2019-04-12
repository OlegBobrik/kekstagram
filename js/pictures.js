'use strict';

var ESC_KEYCODE = 27;
var SHOW_MAX_COMMENTS = 5;
var currentObj; // Current object
var counter = 0; // Counter of comments

var photos = window.data.getArray();
var fragment = document.createDocumentFragment();
var template = document.querySelector('#picture').content;
var containerPictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var buttonCommentsLoader = bigPicture.querySelector('.social__comments-loader');
var cancelBigPicture = document.querySelector('.big-picture__cancel');
var nodeComment = bigPicture.querySelector('.social__comment').cloneNode(true);

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
function createFragment(obj) {
  var node = template.cloneNode(true);

  node.querySelector('.picture').setAttribute('id', obj.id);
  node.querySelector('.picture__img').setAttribute('src', obj.url);
  node.querySelector('.picture__likes').textContent = obj.likes;
  node.querySelector('.picture__comments').textContent = obj.comments.length;

  fragment.appendChild(node);
}

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

  currentObj = photos[id];

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', src);
  bigPicture.querySelector('.likes-count').textContent = like;
  bigPicture.querySelector('.social__comment-count .comments-count').textContent = commentsCount;
  bigPicture.querySelector('.social__caption').textContent = photos[id].description;

  document.querySelector('body').classList.add('modal-open');

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

function bigPictureEscPressHandler(evt) {

  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
}

// Open popup
function openBigPicture(evt) {
  var target = evt.target;
  var pictureImg = containerPictures.querySelector('.picture__img');

  while (target !== containerPictures) {

    if (target.className === pictureImg.classList.value) {
      renderBigPicture(target);
    }

    target = target.parentNode;
  }

  document.addEventListener('keydown', bigPictureEscPressHandler);
}

// Close popup
function closeBigPicture() {
  bigPicture.classList.add('hidden');

  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', bigPictureEscPressHandler);

  counter = 0;

  removeAllCommentsBigPicture();
}

// Show more comments
function buttonCommentsLoaderHandler() {
  addCommentsToBigPicture();
}

// Listeners
containerPictures.addEventListener('click', openBigPicture);

cancelBigPicture.addEventListener('click', closeBigPicture);

buttonCommentsLoader.addEventListener('click', buttonCommentsLoaderHandler);

/**
 * Hello! I'm an anonymous function :)
 * I start to create new Photo-objects and start to add it to the DOM
 */
(function () {
  for (var i = 0; i < photos.length; i++) {
    photos[i] = new Photo(i);

    createFragment(photos[i]);
  }

  containerPictures.appendChild(fragment);

  removeAllCommentsBigPicture();
})();
