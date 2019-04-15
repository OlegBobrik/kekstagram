'use strict';

(function () {
  var ESC_KEYCODE = 27;

  window.utils = {

    diffArray: function (min, max) {
      var arr = [];

      for (var i = min; i <= max; i++) {
        arr.push(i);
      }

      return arr;
    },

    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },

    randomSort: function () {
      return Math.random() > 0.5 ? 1 : -1;
    },

    // getCssProperty: function (element, property) {
    //   return window.getComputedStyle(element, null).getPropertyValue(property);
    // },

    getCoords: function (elem) {
      var block = elem.getBoundingClientRect();

      return block.left + pageXOffset;
    },

    isEscKeycode: function (evt) {
      return evt.keyCode === ESC_KEYCODE;
    }
  };
})();
