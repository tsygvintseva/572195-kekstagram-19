'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;
  var currentEffect = CONST.EFFECT.NONE;

  var selectEffect = function (value) {
    form.imgUploadEffectLevel.classList.remove('hidden');
    switch (currentEffect) {
      case CONST.EFFECT.CHROME :
        return 'grayscale(' + value + ')';
      case CONST.EFFECT.SEPIA:
        return 'sepia(' + value + ')';
      case CONST.EFFECT.MARVIN:
        return 'invert(' + value * CONST.MARVIN_MAX + '%)';
      case CONST.EFFECT.PHOBOS:
        return 'blur(' + CONST.PHOBOS_MAX * value + 'px)';
      case CONST.EFFECT.HEAT:
        return 'brightness(' + CONST.HEAT_MAX * value + ')';
      default:
        form.imgUploadEffectLevel.classList.add('hidden');
        return '';
    }
  };

  var onEffectChange = function (evt) {
    currentEffect = evt.target.value;
    form.resetEffectsValue();
    form.imgUploadPreview.style.filter = selectEffect(CONST.DEFAULT_EFFECT_VALUE);
  };

  var getSaturationValue = function (evt) {
    return (evt.target.offsetLeft / form.effectLevelLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt);
    form.imgUploadPreview.style.filter = selectEffect(value);
  };

  form.effectsRadio.forEach(function (item) {
    item.addEventListener('change', onEffectChange);
  });

  form.effectLevelPin.addEventListener('mousedown', function (evt) {
    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var newCoordX = form.effectLevelPin.offsetLeft - shiftX;
      if (newCoordX >= 0 && newCoordX <= form.effectLevelLine.clientWidth) {
        form.effectLevelPin.style.left = newCoordX + 'px';
        form.effectLevelDepth.style.width = newCoordX + 'px';
        onSaturationChange(evt);
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
