'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  window.util = {
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };
})();
/**
 * функция получения рандомного элемента из массива
 * @param {Array} arr - изначальный массив
 * @return {*} - рандомный элемент массива
 */
var generateRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
  /**
 * gets max  and min numbers
 * @param {number} max -  max number.
 * @param {number} min -  min number.
 * @return {number} - random number between max and min.
 */
var generateRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
  /**
 * gets max  and min numbers
 * @param {array} randomArr -  random array
 * @param {number} generateRandomNumber -  min number from 1 to the last length in array.
 * @return {*} - copyArr - use slice to copy random array
 */
// функция генерации массива длинной не более значения count
var generateRandomArray = function (arr) {
  var randomArr = [];
  var count = generateRandomNumber(1, arr.length);
  var copyArr = arr.slice();
  for (var i = 0; i < count; i++) {
    var randomElement = generateRandomElement(copyArr); // random element from array
    copyArr = copyArr.filter(function (item) {
      return randomElement !== item;
    });
    randomArr.push(randomElement);
  }
  return randomArr;
};
window.generateRandomArray = generateRandomArray;

mainPin.addEventListener('mousedown', function () {
  map.classList.remove('map--faded'); // re-write
  form.classList.remove('ad-form--disabled');
  mapPins.prepend(placeAdsOnTheMap);
  mockCard();
});
