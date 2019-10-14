'use strict';
// получение DOM элементов
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins'); // to pin.js or mainpin.js
var pinTemplate = document.querySelector('#pin').content;
var pin = pinTemplate.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
window.pin;
window.pin.generatePin;
window.placeAdsOnTheMap;

mainPin.addEventListener('mousedown', function () {
  map.classList.remove('map--faded'); // re-write
  form.classList.remove('ad-form--disabled');
  mapPins.prepend(placeAdsOnTheMap);
  renderCard();
});

/**
 * функция получения рандомного элемента из массива
 * @param {Array} arr - изначальный массив
 * @return {*} - рандомный элемент массива
 */
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
  // функция получения рандомного числа в заданном интервале
  // сортитровка значений
var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
  /**
 * функция получения рандомного элемента из массива
 * @param {Array} arr - изначальный массив
 * @return {*} - рандомную длинну массива
 */
// функция генерации массива из исходного (get)?
var getRandomArrayLength = function (arr) {
  var randomArr = [];
  var count = getRandomNumber(1, arr.length); // from 1 to the last length in array
  var copyArr = arr.slice();
  for (var i = 0; i < count; i++) {
    var randomElement = getRandomElement(copyArr);
    copyArr = copyArr.filter(function (item) {
      return randomElement !== item;
    });
    randomArr.push(randomElement);
  }
  return randomArr;
};
  /**
 * функция получения рандомного элемента из массива
 * @param {объект} crateMockAd - создает похожее объявление
 * @return {*} - рандомную длинну массива
 */
// генерация шаблонного объекта с данными rename to crateMockAd
var createMockAd = function () {
  var positionX = getRandomNumber(25, map.clientHeight); // 25, -25 is used in a way so that pin doest cross the broder
  var positionY = getRandomNumber(160, 530);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + getRandomNumber(1, 8) + '.png'
    },
    'offer': {
      'title': getRandomElement(OFFER_TITLES),
      'type': getRandomElement(APARTAMENT_TYPE),
      'address': positionX + ', ' + positionY,
      'price': getRandomNumber(1000, 50000),
      'guests': getRandomNumber(1, 6),
      'rooms': getRandomNumber(1, 6),
      'checkin': getRandomElement(CHECKIN_TIME),
      'checkout': getRandomElement(CHECKOUT_TIME),
      'featurs': getRandomArrayLength(FEATURES),
      'photos': getRandomArrayLength(APARTAMENT_PHOTO),
    },
    'location': {
      'x': positionX,
      'y': positionY
    }
  };
};
  // генерация массива с объктами данных generateAds - generateMockAds
var generateMockAds = function (count) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    ads.push(createMockAd());
  }
  return ads;
};
window.createMockAd = createMockAd;
var ads = generateMockAds(8); // const
window.ads = ads;

