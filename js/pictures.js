'use strict';

var objects = getArray();
var fragment = document.createDocumentFragment();
var template = document.querySelector('#picture').content;
var containerPictures = document.querySelector('.pictures');
var bigPicture = document.querySelector('.big-picture');
var cancelBigPicture = document.querySelector('.big-picture__cancel');

(function () {

  for (var i = 0; i < objects.length; i++) {
    objects[i] = new Photo(i);

    createFragment(objects[i]);
  }

  containerPictures.appendChild(fragment);
})();

var picture = containerPictures.querySelector('.picture');
var pictureImg = containerPictures.querySelector('.picture__img');
var pictureInfo = containerPictures.querySelector('.picture__info');
var pictureLikes = containerPictures.querySelector('.picture__likes');
var pictureComments = containerPictures.querySelector('.picture__comments');

function Photo(image) {
  this.url = 'photos/' + objects[image] + '.jpg';
  this.likes = getLikes();
  this.comments = getComments();
  this.description = getDescription();
}

function createFragment(obj) {
  var node = template.cloneNode(true);

  node.querySelector('.picture__img').setAttribute('src', obj.url);
  node.querySelector('.picture__likes').textContent = obj.likes;
  node.querySelector('.picture__comments').textContent = obj.comments.length;

  fragment.appendChild(node);
}

cancelBigPicture.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

function showBigPicture(picture) {
  var src = picture.querySelector('.picture__img').getAttribute('src');
  var like = picture.querySelector('.picture__info .picture__likes');
  var comment = picture.querySelector('.picture__info .picture__comments');

  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img img').setAttribute('src', src);
  bigPicture.querySelector('.likes-count').textContent = like.textContent;
  bigPicture.querySelector('.comments-count').textContent = comment.textContent;
}

function checkTarget(evt) {
  var target = evt.target;

  if (target.className === pictureImg.classList.value ||
      target.className === pictureInfo.classList.value ||
      target.className === pictureComments.classList.value ||
      target.className === pictureLikes.classList.value) {

    while (target.parentNode !== null) {

      if (target.className === picture.classList.value) {
        showBigPicture(target);
        break;
      }

      target = target.parentNode;
    }
  }
}

containerPictures.addEventListener('click', checkTarget);
