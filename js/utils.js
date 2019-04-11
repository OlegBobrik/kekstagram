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

function getCssProperty(element, property) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function getCoords(elem) {
  var block = elem.getBoundingClientRect();

  return block.left + pageXOffset;
}
