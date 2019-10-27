
'use strict';
// data.js
var OFFER_TITLES = [
  'сдам квартиру',
  'уютная квартира',
  'просторный пентхаус',
  'только славянам',
  'квартира в доме с паркингом',
  'квартира в самом центре',
  'квартира в самом центре города',
  'квартира с мансардой'
];

var APARTAMENT_TYPE = ['пентаус', 'квартира', 'дом', 'бунгало', 'апартаменты', 'общежитие'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];


var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var APARTAMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

// dom.js
// получение DOM элементов
var map = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content;
var pin = pinTemplate.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');

mainPin.addEventListener('mousedown', function () {
  map.classList.remove('map--faded'); // re-write
  form.classList.remove('ad-form--disabled');
  mapPins.prepend(placeAdsOnTheMap);
  mockCard();
});
var onMouseMove = function (moveEvt) {
  moveEvt.preventDefault();
  dragged = true;
  var shift = {
    x: startCoords.x - moveEvt.clientX,
    y: startCoords.y - moveEvt.clientY
  };
  startCoords = {
    x: moveEvt.clientX,
    y: moveEvt.clientY
  };
};

// util.js
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

// data.js
/**
 * generate random mock ad
 * @return {object} - returns object with parameters
 */
// mock data
var createMockAd = function () {
  var positionX = generateRandomNumber(25, map.clientHeight - 50); // 25, -25 is used in a way so that pin doest cross the broder
  var positionY = generateRandomNumber(160, 530);
  return {
    'author': {
      'avatar': 'img/avatars/user0' + generateRandomNumber(1, 8) + '.png'
    },
    'offer': {
      'title': generateRandomElement(OFFER_TITLES),
      'type': generateRandomElement(APARTAMENT_TYPE),
      'address': positionX + ', ' + positionY,
      'price': generateRandomNumber(1000, 50000),
      'guests': generateRandomNumber(1, 6),
      'rooms': generateRandomNumber(1, 6),
      'checkin': generateRandomElement(CHECKIN_TIME),
      'checkout': generateRandomElement(CHECKOUT_TIME),
      'featurs': generateRandomArray(FEATURES),
      'photos': generateRandomArray(APARTAMENT_PHOTO),
    },
    'location': {
      'x': positionX,
      'y': positionY
    }
  };
};
/**
 * generates random ads (mock) number of ads = count
 * @param {number} count
 * @return {array} - ads
 */
var generateAds = function (count) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    ads.push(createMockAd());
  }
  return ads;
};
var ads = generateAds(8); // const
/**
   * функция создающая html pin
   * @param {object} pinData - информация pin
   * @return {object} - копия html узла
   */

var generatePin = function (pinData) {
  var clonePin = pin.cloneNode(true);
  var pinImg = clonePin.querySelector('img');
  clonePin.style.left = pinData.location.x - 25 + 'px'; // const
  clonePin.style.top = pinData.location.y - 70 + 'px'; // const
  pinImg.src = pinData.author.avatar;
  pinImg.alt = pinData.author.title;
  return clonePin;
};
/**
   * функция создающая html pin
   * @param {array} dataArray - кол-во pin
   * @return {object} pinsData - копия html узла
   */
var pinsData = function (dataArray) { // TODO rename to pinsData
  var fragment = new DocumentFragment(); // TODO - documnent.createDocumentFragment
  for (var i = 0; i < dataArray.length; i++) { // TODO for each
    fragment.prepend(generatePin(dataArray[i]));
  }
  return fragment;
};

var placeAdsOnTheMap = pinsData(ads);
/**
   * функция создающая mock card
   * @param {object} ad1 - random ad from mock ads
   */

var mockCard = function () {
  var ad1 = ads[1];
  var card = document.querySelector('#card').content; // clone
  var cardAvatar = card.querySelector('.popup__avatar');
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');

  cardAvatar.content = ad1.offer.avatar;
  cardTitle.textContent = ad1.offer.title;
  cardAddress.textContent = ad1.offer.address;
  cardPrice.textContent = ad1.offer.price + ' RUB';
  cardType.textContent = ad1.offer.type;
  cardCapacity.textContent = ad1.offer.rooms + ' комнат для ' + ad1.offer.guests + ' гостей';
  /**
   * функция вставляющая mock card
   * @param {object} mapPoint - html node
   */
  var mapPoint = map.querySelector('.map__filters-container');
  map.insertBefore(card, mapPoint);
};
