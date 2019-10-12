'use strict';
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
  