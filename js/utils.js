'use strict';

function diffArray(min, max) {
    var arr = [];

    for (var i = min; i <= max; i++) {
        arr.push(i);
    }

    return arr;
}

function getRandomNumber(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}

function randomSort() {
    return Math.random() > 0.5 ? 1 : -1;
}
