'use strict';
/**
 * функция получения рандомного элемента из массива
 * @param {array} pinData
 * @return {object} clonePin - копия html узла
 */
(function () {
  var generatePin = function (pinData) { // generateHtmlPin
    var clonePin = pin.cloneNode(true);
    var pinImg = clonePin.querySelector('img');
    clonePin.style.left = pinData.location.x - 25 + 'px'; // const
    clonePin.style.top = pinData.location.y - 70 + 'px'; // const
    pinImg.src = pinData.author.avatar;
    pinImg.alt = pinData.author.title;
    return clonePin; // html object mock
  };
  var renderPinsFromArray = function (dataArray) { // TODO rename to pinsData EXPORT export
    var fragment = new DocumentFragment(); // TODO - documnent.createDocumentFragment
    for (var i = 0; i < dataArray.length; i++) { // TODO for each
      fragment.prepend(generatePin(dataArray[i]));
    }
    return fragment;
  };
  var placeAdsOnTheMap = renderPinsFromArray(ads);// map.js
  window.placeAdsOnTheMap = placeAdsOnTheMap;
  window.pin.generatePin = generatePin;
  window.pin = {
    generatePin: generatePin,
    renderPinsFromArray: function (dataArray) { // TODO rename to pinsData
      var fragment = new DocumentFragment(); // TODO - documnent.createDocumentFragment
      for (var i = 0; i < dataArray.length; i++) { // TODO for each
        fragment.prepend(generatePin(dataArray[i]));
      }
      return fragment;
    }
  };
})();
