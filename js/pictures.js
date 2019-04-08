'use strict';

var ESC_KEYCODE = 27;

var photos = getArray();
var fragment = document.createDocumentFragment();
var template = document.querySelector('#picture').content;
var containerPictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var cancelBigPicture = document.querySelector('.big-picture__cancel');
var nodeComment = bigPicture.querySelector('.social__comment').cloneNode(true);

/**
 * A Photo-object
 *
 * @param {number} i - A random index from array
 */
function Photo(i) {
  this.url = 'photos/' + photos[i] + '.jpg';
  this.likes = getLikes();
  this.comments = getComments();
  this.description = getDescription();
  this.id = i;
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

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.big-picture__img img').setAttribute('src', src);
  bigPicture.querySelector('.likes-count').textContent = like;
  bigPicture.querySelector('.social__comment-count').childNodes[0].textContent = photos[id].comments.length + ' из ';
  bigPicture.querySelector('.social__comment-count .comments-count').textContent = commentsCount;
  bigPicture.querySelector('.social__caption').textContent = photos[id].description;

  document.querySelector('body').classList.add('modal-open');

  addCommentsToBigPicture(photos[id]);
}

/**
 * Add all comments given object to the block .big-picture
 *
 * @param {Object} obj
 */
function addCommentsToBigPicture(obj) {
  var commentsCount = obj.comments.length;

  for (var i = 0; i < commentsCount; i++) {
    var node = nodeComment.cloneNode(true);
    var avatar = getAvatar();

    node.querySelector('.social__text').textContent = obj.comments[i];
    node.querySelector('.social__picture').setAttribute('src', 'img/avatar-' + avatar + '.svg');
    fragment.appendChild(node);
  }

  bigPicture.querySelector('.social__comments').appendChild(fragment);
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
}

// Close popup
function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');

  removeAllCommentsBigPicture();
}

// Listeners
containerPictures.addEventListener('click', openBigPicture);

cancelBigPicture.addEventListener('click', closeBigPicture);

containerPictures.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeBigPicture();
  }
});

/**
 * Hello! I'm an anonymous function :)
 * I start to create new Photo-objects and start to add them to the DOM
 */
(function () {
  for (var i = 0; i < photos.length; i++) {
    photos[i] = new Photo(i);

    createFragment(photos[i]);
  }

  containerPictures.appendChild(fragment);

  removeAllCommentsBigPicture();
})();
