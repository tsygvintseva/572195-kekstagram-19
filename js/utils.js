'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
      window.form.closePopup();
      window.preview.closePopupPreview();
    }
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === ENTER_KEY) {
      var activePicture = evt.target.children[0].attributes.src.value;
      window.preview.showBigPhoto(activePicture);
    }
  };

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  window.utils = {
    onPopupEscPress: onPopupEscPress,
    onPictureEnterPress: onPictureEnterPress,
    getRandomValue: getRandomValue,
  };

})();
