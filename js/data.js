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
var placeAdsOnTheMap = pinsData(ads);
/**
   * функция создающая mock card
   * @param {object} ad1 - random ad from mock ads
   */
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

var mockCard = function () {
  var ad1 = ads[1];
  var card = document.querySelector('#card').content;
  var newCard = card.cloneNode(true); // clone
  var cardAvatar = newCard.querySelector('.popup__avatar');
  var cardTitle = newCard.querySelector('.popup__title');
  var cardAddress = newCard.querySelector('.popup__text--address');
  var cardPrice = newCard.querySelector('.popup__text--price');
  var cardType = newCard.querySelector('.popup__type');
  var cardCapacity = newCard.querySelector('.popup__text--capacity');

  cardAvatar.content = ad1.author.avatar;
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

window.generateAds = generateAds;
window.createMockAd = createMockAd;
window.generatePin = generatePin;
window.createMockAd = createMockAd;
window.pinsData = pinsData;
window.mockCard = mockCard; // data.js?
window.ads = ads;
