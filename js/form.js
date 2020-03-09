'use strict';

(function () {
  var CONST = window.constants;
  var backend = window.backend;

  var body = document.querySelector('body');
  var main = document.querySelector('main');
  var fragment = document.createDocumentFragment();
  var upload = document.querySelector('#upload-file');
  var editionFileOpen = document.querySelector('.img-upload__overlay');
  var editionFileClose = editionFileOpen.querySelector('#upload-cancel');
  var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');
  var effectLevelPin = editionFileOpen.querySelector('.effect-level__pin');
  var effectsRadio = editionFileOpen.querySelectorAll('.effects__radio');
  var effectLevelLine = editionFileOpen.querySelector('.effect-level__line');
  var imgUploadEffectLevel = editionFileOpen.querySelector('.img-upload__effect-level');
  var effectLevelDepth = editionFileOpen.querySelector('.effect-level__depth');
  var imgUploadScale = document.querySelector('.img-upload__scale');
  var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
  var textHashtags = editionFileOpen.querySelector('.text__hashtags');
  var textDescription = editionFileOpen.querySelector('.text__description');

  var openPopup = function () {
    editionFileOpen.classList.remove('hidden');
    body.classList.add('modal-open');
    document.addEventListener('keydown', onPopupEscPress);
    imgUploadEffectLevel.classList.add('hidden');
    resetEffectsValue();
  };

  var closePopup = function () {
    editionFileOpen.classList.add('hidden');
    body.classList.remove('modal-open');
    upload.value = '';
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

  var imgUploadForm = document.querySelector('.img-upload__form');

  imgUploadForm.addEventListener('submit', function (evt) {
    backend.upload(new FormData(imgUploadForm), uploadSuccessHandler, uploadErrorHandler);
    evt.preventDefault();
  });

  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var uploadSuccessHandler = function () {
    var newSuccess = successTemplate.cloneNode(true);
    fragment.appendChild(newSuccess);
    main.appendChild(fragment);
    document.addEventListener('keydown', onSuccessModalEscPress);
    document.addEventListener('click', onSuccessModalClick);
    closePopup();
  };

  var closeSuccessModal = function () {
    var success = document.querySelector('.success');
    document.removeEventListener('keydown', onSuccessModalEscPress);
    document.removeEventListener('click', onSuccessModalClick);
    success.parentNode.removeChild(success);
  };

  var onSuccessModalEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      closeSuccessModal();
    }
  };

  var onSuccessModalClick = function (evt) {
    if (!evt.target.classList.contains('success__inner')
    && !evt.target.classList.contains('success__title')) {
      closeSuccessModal();
    }
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var uploadErrorHandler = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__title').textContent = errorMessage;
    fragment.appendChild(newError);
    main.appendChild(fragment);
    document.addEventListener('keydown', onErrorModalEscPress);
    document.addEventListener('click', onErrorModalClick);
    closePopup();
  };

  var closeErrorModal = function () {
    var error = document.querySelector('.error');
    document.removeEventListener('keydown', onErrorModalEscPress);
    document.removeEventListener('click', onErrorModalClick);
    error.parentNode.removeChild(error);
  };

  var onErrorModalEscPress = function (evt) {
    if (evt.key === CONST.ESC_KEY) {
      closeErrorModal();
    }
  };

  var onErrorModalClick = function (evt) {
    if (!evt.target.classList.contains('error__inner')
     && !evt.target.classList.contains('error__title')) {
      closeErrorModal();
    }
  };

  var resetEffectsValue = function () {
    effectLevelPin.style.left = CONST.DEFAULT_EFFECT_PIN;
    effectLevelDepth.style.width = CONST.DEFAULT_EFFECT_DEPTH;
    imgUploadPreview.style.filter = '';
    imgUploadPreview.style.transform = '';
    scaleControlValue.value = CONST.SCALE.DEFAULT + '%';
    textHashtags.value = '';
    textDescription.value = '';
  };

  window.form = {
    body: body,
    fragment: fragment,
    imgUploadPreview: imgUploadPreview,
    editionFileOpen: editionFileOpen,
    effectLevelPin: effectLevelPin,
    imgUploadEffectLevel: imgUploadEffectLevel,
    effectsRadio: effectsRadio,
    effectLevelLine: effectLevelLine,
    effectLevelDepth: effectLevelDepth,
    resetEffectsValue: resetEffectsValue,
    scaleControlSmaller: scaleControlSmaller,
    scaleControlBigger: scaleControlBigger,
    scaleControlValue: scaleControlValue,
    textHashtags: textHashtags,
  };

})();
