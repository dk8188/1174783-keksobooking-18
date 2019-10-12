'use strict';
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
