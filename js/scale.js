'use strict';

(function () {
  var CONST = window.constants;
  var SCALE = CONST.SCALE;

  // Масшабирование
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
  scaleControlValue.value = SCALE.DEFAULT + '%';

  var changeScaleDown = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue - SCALE.STEP >= SCALE.MIN
      ? scaleValue - SCALE.STEP
      : SCALE.MIN;
    window.form.imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  var changeScaleUp = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue + SCALE.STEP <= SCALE.MAX
      ? scaleValue + SCALE.STEP
      : SCALE.MAX;
    window.form.imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  scaleControlSmaller.addEventListener('click', changeScaleDown);
  scaleControlBigger.addEventListener('click', changeScaleUp);

})();
