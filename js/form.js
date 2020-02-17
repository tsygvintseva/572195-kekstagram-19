'use strict';

(function () {
  var CONST = window.constants;
  var preview = window.preview;

  var upload = document.querySelector('#upload-file');
  var editionFileOpen = document.querySelector('.img-upload__overlay');
  var editionFileClose = editionFileOpen.querySelector('#upload-cancel');
  var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');

  // Открытие формы редактирования
  var openPopup = function () {
    editionFileOpen.classList.remove('hidden');
    preview.body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    window.effects.effectLevelPin.addEventListener('mousedown', window.effects.moveSetup);
    window.effects.imgUploadEffectLevel.classList.add('hidden');
    window.effects.resetSliderValue();
    upload.value = '';
  };

  // Закрытие формы редактирования
  var closePopup = function () {
    editionFileOpen.classList.add('hidden');
    preview.body.classList.remove('modal-open');
    window.effects.effectLevelPin.removeEventListener('mousedown', window.effects.moveSetup);
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
      closePopup();
      preview.closePopupPreview();
    }
  };

  upload.addEventListener('change', function () {
    openPopup();
  });

  editionFileClose.addEventListener('click', function () {
    closePopup();
  });

  window.form = {
    closePopup: closePopup,
    onPopupEscPress: onPopupEscPress,
    imgUploadPreview: imgUploadPreview,
    editionFileOpen: editionFileOpen,
  };

})();
