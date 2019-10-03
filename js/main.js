
'use strict';
var AVATAR_PHOTOS = ['img/avatars/user0.png', 'img/avatars/user2.png', 'img/avatars/user3.png', 
  'img/avatars/user4.png', 'img/avatars/user5.png', 'img/avatars/user6.png', 
  'img/avatars/user7.png', 'img/avatars/user8.png'
];

var OFFER_TITLES = ['сдам квартиру', 'уютная квартира', 'просторный пентхаус',
  'только славянам', 'квартира в доме с паркингом', 'квартира в самом центре',
  'квартира в самом центре города', 'квартира с мансардой'];

var APARTAMENT_TYPE = ['пентаус', 'квартира', 'дом', 'бунгало', 'апартаменты', 'общежитие'];
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];


var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var APARTAMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var ENTER_KEYCODE = 13;

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
      'avatar': getRandomElement(AVATAR_PHOTOS)
    },
    'offer': {
      'title': getRandomElement(OFFER_TITLES),
      'type': getRandomElement(APARTAMENT_TYPE),
      'address': positionX + ',' + positionY,
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

var generateCard = function () {
  var ad1 = ads[0];
  var card = document.querySelector('#card').content;
  var cardAvatar;
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');

  cardTitle.textContent = ad1.offer.title;
  cardAddress.textContent = ad1.offer.address;
  cardPrice.textContent = ad1.offer.price + ' RUB';
  cardType.textContent = ad1.offer.type;
  cardCapacity.textContent = ad1.offer.rooms + ' комнат для ' + ad1.offer.guests + ' гостей';
  var mapPoint = map.querySelector('.map__filters-container');
  map.insertBefore(card, mapPoint);
};
generateCard();

