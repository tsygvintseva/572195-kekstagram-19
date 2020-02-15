'use strict';

(function () {
  var EFFECT = {
    CHROME: 'chrome',
    NONE: 'none',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat',
  };

  var PHOBOS_MAX = 3;
  var HEAT_MAX = 3;
  var MARVIN_MAX = 100;

  // Процесс перемещения (этап отпускания)
  var currentEffect = EFFECT.NONE;
  var effectLevelPin = window.form.editionFileOpen.querySelector('.effect-level__pin');
  var effectsRadio = window.form.editionFileOpen.querySelectorAll('.effects__radio');
  var effectLevelLine = window.form.editionFileOpen.querySelector('.effect-level__line');
  var imgUploadEffectLevel = window.form.editionFileOpen.querySelector('.img-upload__effect-level');

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

  window.effects = {
    imgUploadEffectLevel: imgUploadEffectLevel,
  };

})();
