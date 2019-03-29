'use strict';

var POST_COUNT = 25;
var usedImages = [];

var comments = ['Всё отлично!', 
                'В целом всё плохо. Но не всё.', 
                'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 
                'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 
                'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 
                'Лица у людей получилась на фотук перекошены, как будто их избивают. Как можно было поймать такой неуданчный момент?!'];

var descriptions = ['Тестим новую камеру!', 
                    'Затусили с дурзьями на море.', 
                    'Как же круто тут кормят.', 
                    'Отдыхаем...', 
                    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все соменья. Не обижайте всех словами......', 
                    'Вот это тачка!'];

function Post() {
    var commentsPost = [];

    // получаем один или два случайных комментария из массива comments
    for (var i = 0; i < getRandomNumber(1, 2); i++) {
        var index = getRandomIndex(comments);
        commentsPost.push(comments[index]);
    }

    var pic = getRandomNumber(1, 25);

    this.url = "photos/" + pic + ".jpg";
    this.likes = getRandomNumber(15, 200);
    this.comment = commentsPost;
    // получаем случайное описание из массива descriptions
    this.description = descriptions[getRandomIndex(descriptions)];
}

function addPost(count) {
    var picture = document.querySelector(".pictures");
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#picture-template').content;

    for (var i = 0; i < count; i++) {
        var post = new Post();
        var node = template.cloneNode(true);

        node.querySelector('img').setAttribute('src', post.url);
        node.querySelector('.picture-likes').textContent = post.likes;
        node.querySelector('.picture-comments').textContent = post.comment;

        fragment.appendChild(node);
        picture.appendChild(fragment);
    }
}

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

addPost(POST_COUNT);
