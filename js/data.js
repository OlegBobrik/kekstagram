'use strict';

var commentsUsers = ['Всё отлично!', 
    'В целом всё плохо. Но не всё.', 
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 
    'Лица у людей получилась на фотке перекошены, как будто их избивают. Как можно было поймать такой неуданчный момент?!'];

var descriptions = ['Тестим новую камеру!', 
    'Затусили с дурзьями на море.', 
    'Как же круто тут кормят.', 
    'Отдыхаем...', 
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все соменья. Не обижайте всех словами......', 
    'Вот это тачка!'];

function getArray() {
    return diffArray(1, 25).sort(randomSort);
}

function getDescription() {
    return descriptions[getRandomNumber(0, descriptions.length - 1)];
}

function getLikes() {
    return getRandomNumber(15, 200);
}

function getComments() {
    // получаем случайное число строк (предложений) для одного комментария
    var countSentence = getRandomNumber(1, 2);
    // создаем пустой массив для хранения комментариев
    var comments = [];
    // задаем случайную длину массива для хранения комментариев
    comments.length = getRandomNumber(2, 2);

    for (var i = 0; i < comments.length; i++) {
        // переменная для хранения составного комментария
        var comment = "";

        for (let j = 0; j < countSentence; j++) {
            // производим конкатенацию строк (предложениий) из массива commentsUsers для одного комментария
            comment += commentsUsers[getRandomNumber(0, commentsUsers.length - 1)] + " ";    
        }
        // добавляем (составной) комментарий в i-ый элемент массива
        comments[i] = comment;
    }

    return comments;
}
