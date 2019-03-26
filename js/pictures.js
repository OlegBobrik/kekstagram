'use strict';

var AMOUNT_POSTS = 25;

var posts = [];
var images = [];
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

for (var i = 0; i < AMOUNT_POSTS; i++) {
    posts[i] = new Post();
    console.log(posts[i]);
}

for (var i = 1; i < AMOUNT_POSTS + 1; i++) {
    images[i] = i;
}

function Post() {
    var commentsPost = [];

    for (var i = 0; i < getRandomNumber(1, 2); i++) {
        // получаем один или два случайных комментария из массива comments
        var index = getRandomIndex(comments);
        commentsPost.push(comments[index]);
    }
    
    this.url = "photos/{{i}}.jpg";
    this.likes = getRandomNumber(15, 200);
    this.comment = commentsPost;
    // получаем случайное описание из массива descriptions
    this.description = descriptions[getRandomIndex(descriptions)];
}

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}
