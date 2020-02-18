'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;

  // Масшабирование
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
  scaleControlValue.value = CONST.SCALE.DEFAULT + '%';

  var changeScaleDown = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue - CONST.SCALE.STEP >= CONST.SCALE.MIN
      ? scaleValue - CONST.SCALE.STEP
      : CONST.SCALE.MIN;
    form.imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  var changeScaleUp = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue + CONST.SCALE.STEP <= CONST.SCALE.MAX
      ? scaleValue + CONST.SCALE.STEP
      : CONST.SCALE.MAX;
    form.imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  scaleControlSmaller.addEventListener('click', changeScaleDown);
  scaleControlBigger.addEventListener('click', changeScaleUp);

})();
