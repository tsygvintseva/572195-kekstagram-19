'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;

  var onScaleDownClick = function () {
    var scaleValue = parseInt(form.scaleControlValue.value, 10);
    var newValue = scaleValue - CONST.SCALE.STEP >= CONST.SCALE.MIN
      ? scaleValue - CONST.SCALE.STEP
      : CONST.SCALE.MIN;
    form.imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    form.scaleControlValue.value = (newValue) + '%';
  };

  var onScaleUpClick = function () {
    var scaleValue = parseInt(form.scaleControlValue.value, 10);
    var newValue = scaleValue + CONST.SCALE.STEP <= CONST.SCALE.MAX
      ? scaleValue + CONST.SCALE.STEP
      : CONST.SCALE.MAX;
    form.imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    form.scaleControlValue.value = (newValue) + '%';
  };

  form.scaleControlSmaller.addEventListener('click', onScaleDownClick);
  form.scaleControlBigger.addEventListener('click', onScaleUpClick);

})();
