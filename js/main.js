'use strict';
var AVATAR_PHOTOS = ['01', '02', '03', '04', '05', '06', '07', '08'];

var OFFER_TITLES = ['сдам квартиру', 'уютная квартира', 'просторный пентхаус',
  'только славянам', 'квартира в доме с паркингом', 'квартира в самом центре',
  'квартира в самом центре центра', 'квартира с мансардой'];

var APARTAMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];


var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var APARTAMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// получение DOM элементов
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var pin = pinTemplate.querySelector('.map__pin');
map.classList.remove('map--faded');
// функция получения рандомного элемента из массива
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};
// функция получения рандомгного числа в заданном интервале
// сортитровка значений
var getRandomNumber = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// функция генерации массива случайной длинны из заданного массива
var generateRandomArray = function (arr) {
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

// генерация шаблонного объекта с данными
var crateSimilarAdd = function () {
  var positionX = getRandomNumber(25, map.clientHeight - 50); // 25, -25 is used in a way so that pin doest cross the broder
  var positionY = getRandomNumber(160, 530);
  var ad = {
    'author': {
      'avatar': 'img/avatars/user' + getRandomElement(AVATAR_PHOTOS) + '.png'
    },
    'offer': {
      'title': getRandomElement(OFFER_TITLES),
      'type': getRandomElement(APARTAMENT_TYPE),
      'adress': positionX + ',' + positionY,
      'price': getRandomNumber(1000, 50000),
      'guests': getRandomNumber(1, 6),
      'checkin': getRandomElement(CHECKIN_TIME),
      'checkout': getRandomElement(CHECKOUT_TIME),
      'featurs': generateRandomArray(FEATURES),
      'photos': generateRandomArray(APARTAMENT_PHOTO),
    },
    'location': {
      'x': positionX,
      'y': positionY
    }
  };
  return ad;
};
// генерация массива с объктами данных
var generateAds = function (count) {
  var arr = [];
  for (var i = 0; i < count; i++) {
    arr.push(crateSimilarAdd());
  }
  return arr;
};
var ads = generateAds(8);

var generatePin = function (element) {
  var clonePin = pin.cloneNode(true);
  var pinImg = clonePin.querySelector('img');
  clonePin.style.left = element.location.x + 50 + 'px';
  clonePin.style.top = element.location.y + 75 + 'px';
  pinImg.alt = element.author.title;
  return clonePin;
};
var createAdsFromArray = function (dataArray) {
  var fragment = new DocumentFragment();
  for (var i = 0; i < dataArray.length; i++) {
    fragment.prepend(generatePin(dataArray[i]));
  }
  return fragment;
};

var placeAdsOnTheMap = createAdsFromArray(ads);
mapPins.prepend(placeAdsOnTheMap);

