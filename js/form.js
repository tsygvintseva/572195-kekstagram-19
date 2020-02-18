'use strict';

(function () {
  var CONST = window.constants;

  var body = document.querySelector('body');
  var upload = document.querySelector('#upload-file');
  var editionFileOpen = document.querySelector('.img-upload__overlay');
  var editionFileClose = editionFileOpen.querySelector('#upload-cancel');
  var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');
  var effectLevelPin = editionFileOpen.querySelector('.effect-level__pin');
  var effectsRadio = editionFileOpen.querySelectorAll('.effects__radio');
  var effectLevelLine = editionFileOpen.querySelector('.effect-level__line');
  var imgUploadEffectLevel = editionFileOpen.querySelector('.img-upload__effect-level');
  var effectLevelDepth = editionFileOpen.querySelector('.effect-level__depth');

  // Открытие формы редактирования
  var openPopup = function () {
    editionFileOpen.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    imgUploadEffectLevel.classList.add('hidden');
    resetEffectsValue();
    upload.value = '';
  };

  // Закрытие формы редактирования
  var closePopup = function () {
    editionFileOpen.classList.add('hidden');
    body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
      closePopup();
    }
  };

  upload.addEventListener('change', function () {
    openPopup();
  });

  editionFileClose.addEventListener('click', function () {
    closePopup();
  });

  var resetEffectsValue = function () {
    effectLevelPin.style.left = CONST.DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = CONST.DEFAULT_EFFECT_DEPTH;
    imgUploadPreview.style.filter = '';
    imgUploadPreview.style.transform = '';
  };

  window.form = {
    body: body,
    imgUploadPreview: imgUploadPreview,
    editionFileOpen: editionFileOpen,
    effectLevelPin: effectLevelPin,
    imgUploadEffectLevel: imgUploadEffectLevel,
    effectsRadio: effectsRadio,
    effectLevelLine: effectLevelLine,
    effectLevelDepth: effectLevelDepth,
    resetEffectsValue: resetEffectsValue,
  };
})();
