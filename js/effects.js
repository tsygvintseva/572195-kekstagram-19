'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;

  // Процесс перемещения (этап отпускания)
  var currentEffect = CONST.EFFECT.NONE;
  var effectLevelPin = form.editionFileOpen.querySelector('.effect-level__pin');
  var effectsRadio = form.editionFileOpen.querySelectorAll('.effects__radio');
  var effectLevelLine = form.editionFileOpen.querySelector('.effect-level__line');
  var imgUploadEffectLevel = form.editionFileOpen.querySelector('.img-upload__effect-level');
  var effectLevelDepth = form.editionFileOpen.querySelector('.effect-level__depth');

  var selectEffect = function (value) {
    imgUploadEffectLevel.classList.remove('hidden');
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
        imgUploadEffectLevel.classList.add('hidden');
        return '';
    }
  };

  var onEffectChange = function (evt) {
    currentEffect = evt.target.value;
    resetSliderValue();
    form.imgUploadPreview.style.filter = selectEffect(1);
  };

  var getSaturationValue = function (evt, effectLine) {
    console.log(evt.target);
    // return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
    return (evt.target.offsetLeft / effectLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt, effectLevelLine);
    form.imgUploadPreview.style.filter = selectEffect(value);
  };

  for (var j = 0; j < effectsRadio.length; j++) {
    effectsRadio[j].addEventListener('change', onEffectChange);
  }

  effectLevelPin.addEventListener('mousemove', onSaturationChange);

  var moveSetup = function (evt) {
    var startCoordsX = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = startCoordsX - moveEvt.clientX;
      startCoordsX = moveEvt.clientX;

      var newCoordX = effectLevelPin.offsetLeft - shiftX;
      if (newCoordX >= 0 && newCoordX <= effectLevelLine.clientWidth) {
        effectLevelPin.style.left = newCoordX + 'px';
        effectLevelDepth.style.width = newCoordX + 'px';
        onSaturationChange();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var resetSliderValue = function () {
    effectLevelPin.style.left = CONST.DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = CONST.DEFAULT_EFFECT_DEPTH;
    form.imgUploadPreview.style.filter = '';
    form.imgUploadPreview.style.transform = '';
  };

  window.effects = {
    moveSetup: moveSetup,
    resetSliderValue: resetSliderValue,
    effectLevelPin: effectLevelPin,
    imgUploadEffectLevel: imgUploadEffectLevel,
  };

})();
