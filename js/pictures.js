'use strict';

var objects = getArray();
var bigPicture = document.querySelector('.big-picture');
var picture = document.querySelector(".pictures");
var template = document.querySelector('#picture').content;
var socialComment = bigPicture.querySelectorAll('.social__comment');
var fragment = document.createDocumentFragment();

renderPhotos();

function Photo(image) {
    this.url = "photos/" + objects[image] + ".jpg";
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

function renderPhotos() {

    for (var i = 0; i < objects.length; i++) {
        objects[i] = new Photo(i);

        createFragment(objects[i]);
    }

    picture.appendChild(fragment);
}

bigPicture.classList.remove('hidden');

bigPicture.querySelector('.big-picture__img img').setAttribute('src', objects[0].url);
bigPicture.querySelector('.likes-count').textContent = objects[0].likes;
bigPicture.querySelector('.comments-count').textContent = objects[0].comments.length;

for (let i = 0; i < socialComment.length; i++) {
    var avatar = getRandomNumber(1, 6);

    socialComment[i].querySelector('.social__picture').setAttribute('src', 'img/avatar-' + avatar + '.svg');
    socialComment[i].querySelector('.social__text').textContent = objects[i].comments[i];
}

bigPicture.querySelector('.social__caption').textContent = objects[0].description;

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comments-loader').classList.add('visually-hidden');
