/*'use strict';
var ADS_QUANTITY = 8;
var OFFER_TITLE = ['apartment', 'palace', ];
var OFFER_PRICE = [];
var OFFER_TYPE = ['room', 'apartment', 'hostel'];
var OFFER_CHECKIN = ['10:00','12:00','24h'];
var OFFER_CHECKOUT = ['11:00','12:00','13:00'];
var OFFER_FACILITIES = ['wifi', 'dishwasher', 'parking', 'washing machine', 'elevator', 'air conditioner'];
var OFFER_DESCRIPTION = [''];
var OFFER_PHOTOS = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", 
                    "http://o0.github.io/assets/images/tokyo/hotel2.jpg", 
                    "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var LOCATION_X = [100, 200, 250, 300, 350, 400];
var LOCATION_Y = [130, 200, 250, 300, 450, 630];
var MAX_LOCATION_Y =[630];

var bookingMap = document.querySelector(".map");
bookingMap.classList.remove("map--faded");
var similarListElement = bookingMap.querySelector('map__pins');
var similarPinTemplate = document.quertSelector('#pin').content.quertSelector('.map__pin');
var getArrayOfPins = function () {
var pins = [];
for (var i = 0; i < ADS_QUANTITY; i ++ ) {
var pin = {
    author: {
      avatar: 'img/avatars/user02.png'
    },
      offer: {
      title: arrayRandElement(OFFER_TITLE),
      price: arrayRandElement(OFFER_PRICE),
      type: arrayRandElement(OFFER_TYPE),
      checkin: arrayRandElement(OFFER_CHECKIN),
      checkout: arrayRandElement(OFFER_CHECKOUT),
      facilities: arrayRandElement(OFFER_FACILITIES),
      description: arrayRandElement(OFFER_DESCRIPTION),
      photos: arrayRandElement(OFFER_PHOTOS)
    },
    location: {
      x: arrayRandElement(LOCATION_X),
      y: arrayRandElement(LOCATION_Y)
    }
  };
pins.push(pin);
}
return pins;
};*/
'use strict';

document.querySelector('.map').classList.remove('map--faded');

var map = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('button');

var APARTAMENT_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var CHECKIN_AND_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var APARTAMENT_PHOTO = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 600;
var LOCATION_X_MIN = 100;
var LOCATION_X_MAX = 900;
var PIN_WIDTH = 70;
var PIN_HEIGHT = 70;
/**
   * Получает рандомное число
   * @
   * @return random index
   */
var getRandomIndex = function (maxValue) {
  var randomIndex = Math.floor(Math.random() * maxValue);
  return randomIndex;
};
/**
   * Получает рандомное значение
   * @
   * @return random index
   */
var getRandomValue = function (arr) {
  var valueIndex = getRandomIndex(arr.length);
  var value = arr[valueIndex];
  return value;
};
/**
   * Получает рандомное значение
   * @
   * @return result
   */
var getArrayWithRandomLenght = function (arr) {
  var result = [];
  var arrayLength = getRandomIndex(arr.length);

  for (var i = 0; i < arrayLength; i++) {
    result.push(arr[i]);
  }
  return result;
};
/**
   * min,
   * @return result
   */

var getRandomValueFromRange = function (min, max) {
  var result = Math.random() * (max - min) + min; //?????
  return Math.floor(result);
};
getRandomValueFromRange(150,150);

var generateAnnouncement = function (displayAd) {
  var ad = {
    author: {
      avatar: null
    },
    offer: {
      title: 'Объявление о продаже',
      address: '600, 350',
      price: 500,
      type: null,
      rooms: 4,
      guests: 5,
      checkin: null,
      checkout: null,
      features: null,
      description: 'Описание объявления',
      photos: null
    },
    location: {
      x: null,
      y: null
    }
  };
// генерирует объявление
  ad.author.avatar = 'img/avatars/user0' + displayAd + '.png';

  ad.offer.type = getRandomValue(APARTAMENT_TYPE);
  ad.offer.checkin = getRandomValue(CHECKIN_AND_CHECKOUT_TIME);
  ad.offer.checkout = getRandomValue(CHECKIN_AND_CHECKOUT_TIME);
  ad.offer.features = getArrayWithRandomLenght(FEATURES);
  ad.offer.photos = getArrayWithRandomLenght(APARTAMENT_PHOTO);

  ad.location.x = getRandomValueFromRange(LOCATION_X_MIN, LOCATION_X_MAX);
  ad.location.y = getRandomValueFromRange(LOCATION_Y_MIN, LOCATION_Y_MAX);

  return ad;
};

var generateAllAnnouncements = function (nummberOfAnnouncements) {
  var ads = [];

  for (var i = 1; i <= nummberOfAnnouncements; i++) {
    ads.push(generateAnnouncement(i));
  }
  return ads;
};

var renderPins = function () {
  var pins = [];

  for (var i = 0; i < ads.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);

    var avatarUrl = ads[i].author.avatar;
    pinElement.querySelector('img').setAttribute('src', avatarUrl);

    var offerTitle = ads[i].offer.title;
    pinElement.querySelector('img').setAttribute('alt', offerTitle);
    
//? PIN_WIDTH / 2 

    var locationX = ads[i].location.x + PIN_WIDTH / 2 + 'px'; //?????
    var locationY = ads[i].location.y + PIN_HEIGHT + 'px';
    var pinCoordinates = 'left: ' + locationX + '; ' + 'top: ' + locationY + ';';
    pinElement.setAttribute('style', pinCoordinates);

    pins.push(pinElement);
  }
  return pins;
};

// вставка pin
var appendPins = function (pins) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(pins[i]);
  }
  map.appendChild(fragment);
};

var ads = generateAllAnnouncements(8);
var pins = renderPins(ads);
appendPins(pins);