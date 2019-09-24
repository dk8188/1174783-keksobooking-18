'use strict';
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
};