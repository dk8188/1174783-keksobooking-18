
'use strict';

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
  generateCard();
});
var onMouseMove = function (moveEvt) {
   moveEvt.preventDefault();
   dragged = true;
var shift = {
  x: startCoords.x - moveEvt.clientX,
  y: startCoords.y - moveEvt.clientY
};
startCoords = {
  x:moveEvt.clientX,
  y:moveEvt.clientY
};
}
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
      'featurs': generateRandomArray(FEATURES),
      'photos': generateRandomArray(APARTAMENT_PHOTO),
    },
    'location': {
      'x': positionX,
      'y': positionY
    }
  };
};
// генерация массива с объктами данных
var generateAds = function (count) {
  var ads = [];
  for (var i = 0; i < count; i++) {
    ads.push(crateSimilarAdd());
  }
  return ads;
};
var ads = generateAds(8); // const


var generatePin = function (pinData) {
  var clonePin = pin.cloneNode(true);
  var pinImg = clonePin.querySelector('img');
  clonePin.style.left = pinData.location.x - 25 + 'px'; // const
  clonePin.style.top = pinData.location.y - 70 + 'px'; // const
  pinImg.src = pinData.author.avatar;
  pinImg.alt = pinData.author.title;
  return clonePin;
};
var renderPinsFromArray = function (dataArray) { // TODO rename to pinsData
  var fragment = new DocumentFragment(); // TODO - documnent.createDocumentFragment
  for (var i = 0; i < dataArray.length; i++) { // TODO for each
    fragment.prepend(generatePin(dataArray[i]));
  }
  return fragment;
};

var placeAdsOnTheMap = renderPinsFromArray(ads);


var generateCard = function () {
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
  var mapPoint = map.querySelector('.map__filters-container');
  map.insertBefore(card, mapPoint);
};
