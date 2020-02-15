'use strict';

(function () {
  var ESC_KEY = window.constants.ESC_KEY;

  var upload = document.querySelector('#upload-file');
  var editionFileOpen = document.querySelector('.img-upload__overlay');
  var editionFileClose = editionFileOpen.querySelector('#upload-cancel');
  var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');

  // Открытие формы редактирования
  var openPopup = function () {
    editionFileOpen.classList.remove('hidden');
    window.preview.body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    window.effects.imgUploadEffectLevel.classList.add('hidden');
  };

  // Закрытие формы редактирования
  var closePopup = function () {
    editionFileOpen.classList.add('hidden');
    window.preview.body.classList.remove('modal-open');
    upload.value = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.style.transform = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === ESC_KEY &&
      !evt.target.classList.contains('text__hashtags') &&
      !evt.target.classList.contains('text__description')) {
      closePopup();
      window.preview.closePopupPreview();
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
