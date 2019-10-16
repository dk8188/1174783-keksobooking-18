'use strict';
(function () {
  var renderCard = function () { // render card export
    var ad1 = ads[1];
    var card = document.querySelector('#card').content; // clone
    var cardAvatar = card.querySelector('.popup__avatar');
    var cardTitle = card.querySelector('.popup__title');
    var cardAddress = card.querySelector('.popup__text--address');
    var cardPrice = card.querySelector('.popup__text--price');
    var cardType = card.querySelector('.popup__type');
    var cardCapacity = card.querySelector('.popup__text--capacity');
    var closeButton = card.querySelector('.popup__close');


    cardAvatar.content = ad1.offer.avatar;
    cardTitle.textContent = ad1.offer.title;
    cardAddress.textContent = ad1.offer.address;
    cardPrice.textContent = ad1.offer.price + ' RUB';
    cardType.textContent = ad1.offer.type;
    cardCapacity.textContent = ad1.offer.rooms + ' комнат для ' + ad1.offer.guests + ' гостей';
    var mapPoint = map.querySelector('.map__filters-container');
    map.insertBefore(card, mapPoint);
    var closeCard = function () {
      card.classList.add('popup--closed');
    };
    closeButton.addEventListener('click', function () {
      closeCard();
    });
  };
  window.renderCard = renderCard;
})();
