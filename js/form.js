'use strict';

(function () {
  var SCALE = {
    MIN: 25,
    MAX: 100,
    DEFAULT: 100,
    STEP: 25
  };

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
  var HASHTAG_LENGTH_MAX = 20;
  var HASHTAGS_MAX = 5;

  var upload = document.querySelector('#upload-file');
  var editionFileOpen = document.querySelector('.img-upload__overlay');
  var editionFileClose = editionFileOpen.querySelector('#upload-cancel');

  var openPopup = function () {
    editionFileOpen.classList.remove('hidden');
    window.preview.body.classList.add('modal-open');
    document.addEventListener('keydown', window.utils.onPopupEscPress);
    imgUploadEffectLevel.classList.add('hidden');
  };

  // Закрытие формы редактирования
  var closePopup = function () {
    editionFileOpen.classList.add('hidden');
    window.preview.body.classList.remove('modal-open');
    upload.value = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.style.transform = '';
    document.removeEventListener('keydown', window.utils.onPopupEscPress);
  };

  upload.addEventListener('change', function () {
    openPopup();
  });

  editionFileClose.addEventListener('click', function () {
    closePopup();
  });

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
    imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  var changeScaleUp = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    var newValue = scaleValue + SCALE.STEP <= SCALE.MAX
      ? scaleValue + SCALE.STEP
      : SCALE.MAX;
    imgUploadPreview.style.transform = 'scale(' + (newValue) / 100 + ')';
    scaleControlValue.value = (newValue) + '%';
  };

  scaleControlSmaller.addEventListener('click', changeScaleDown);
  scaleControlBigger.addEventListener('click', changeScaleUp);

  // Процесс перемещения (этап отпускания)
  var currentEffect = EFFECT.NONE;
  var effectLevelPin = editionFileOpen.querySelector('.effect-level__pin');
  var effectsRadio = editionFileOpen.querySelectorAll('.effects__radio');
  var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');
  var effectLevelLine = editionFileOpen.querySelector('.effect-level__line');
  var imgUploadEffectLevel = editionFileOpen.querySelector('.img-upload__effect-level');

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
    imgUploadPreview.style.filter = selectEffect(1);
  };

  var getSaturationValue = function (evt) {
    return (evt.target.offsetLeft / effectLevelLine.offsetWidth).toFixed(2);
  };

  var onSaturationChange = function (evt) {
    var value = getSaturationValue(evt);
    imgUploadPreview.style.filter = selectEffect(value);
  };

  for (var j = 0; j < effectsRadio.length; j++) {
    effectsRadio[j].addEventListener('change', onEffectChange);
  }

  effectLevelPin.addEventListener('mouseup', onSaturationChange);

  // Валидация хэш-тегов
  var textHashtags = editionFileOpen.querySelector('.text__hashtags');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        return 'Хэш-тег должен начинаться с #';
      }
      if (hashtags.length === 1 && hashtags[i] === '#') {
        return 'Хэш-тег не может быть только #';
      }
      if (hashtags[i].length > HASHTAG_LENGTH_MAX) {
        return 'Хэш-тег не может быть длинее 20-ти символов, включая решётку';
      }
      if (hashtags[i].lastIndexOf('#') !== 0) {
        return 'Хэш-теги должны быть разделены пробелами';
      }
      if (/[^#a-zA-Z0-9]/.test(hashtags[i])) {
        return 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.';
      }
      var findDuplicateHashtags = hashtags.filter(function (item) {
        return item === hashtags[i];
      });
      if (findDuplicateHashtags.length > 1) {
        return 'Один и тот же хэш-тег не может быть использован дважды';
      }
    }
    if (hashtags.length > HASHTAGS_MAX) {
      return 'Нельзя указать больше 5-ти хэш-тегов';
    }
    return '';
  };

  textHashtags.addEventListener('input', function (evt) {
    textHashtags.setCustomValidity(validateHashtags(evt.target.value));
  });

  window.form = {
    closePopup: closePopup,
  };

})();
