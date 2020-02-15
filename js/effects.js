'use strict';

(function () {
  var EFFECT = window.constants.EFFECT;
  var PHOBOS_MAX = window.constants.PHOBOS_MAX;
  var HEAT_MAX = window.constants.HEAT_MAX;
  var MARVIN_MAX = window.constants.MARVIN_MAX;

  // Процесс перемещения (этап отпускания)
  var currentEffect = window.constants.EFFECT.NONE;
  var effectLevelPin = window.form.editionFileOpen.querySelector('.effect-level__pin');
  var effectsRadio = window.form.editionFileOpen.querySelectorAll('.effects__radio');
  var effectLevelLine = window.form.editionFileOpen.querySelector('.effect-level__line');
  var imgUploadEffectLevel = window.form.editionFileOpen.querySelector('.img-upload__effect-level');
  var effectLevelDepth = window.form.editionFileOpen.querySelector('.effect-level__depth');

  var selectEffect = function (value) {
    imgUploadEffectLevel.classList.remove('hidden');
    switch (currentEffect) {
      case EFFECT.CHROME :
        return 'grayscale(' + value + ')';
      case EFFECT.SEPIA:
        return 'sepia(' + value + ')';
      case EFFECT.MARVIN:
        return 'invert(' + value * MARVIN_MAX + '%)';
      case EFFECT.PHOBOS:
        return 'blur(' + PHOBOS_MAX * value + 'px)';
      case EFFECT.HEAT:
        return 'brightness(' + HEAT_MAX * value + ')';
      default:
        imgUploadEffectLevel.classList.add('hidden');
        return '';
    }
  };

  var onEffectChange = function (evt) {
    currentEffect = evt.target.value;
    resetSliderValue();
    window.form.imgUploadPreview.style.filter = selectEffect(1);
  };

  var getSaturationValue = function (evt) {
    return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt);
    window.form.imgUploadPreview.style.filter = selectEffect(value);
  };

  for (var j = 0; j < effectsRadio.length; j++) {
    effectsRadio[j].addEventListener('change', onEffectChange);
  }

  effectLevelPin.addEventListener('mouseup', onSaturationChange);

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
    effectLevelPin.style.left = window.constants.DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = window.constants.DEFAULT_EFFECT_DEPTH;
    window.form.imgUploadPreview.style.filter = '';
    window.form.imgUploadPreview.style.transform = '';
  };

  window.effects = {
    moveSetup: moveSetup,
    resetSliderValue: resetSliderValue,
    effectLevelPin: effectLevelPin,
    imgUploadEffectLevel: imgUploadEffectLevel,
  };

})();
