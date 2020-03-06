'use strict';

(function () {
  var CONST = window.constants;
  var form = window.form;

  // Валидация хэш-тегов
  var textHashtags = form.editionFileOpen.querySelector('.text__hashtags');

  var validateHashtags = function (value) {
    var hashtags = value.toLowerCase().trim().split(/\s+/);
    if (hashtags[0] === '') {
      return '';
    }
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i][0] !== '#') {
        return 'Хэш-тег должен начинаться с #';
      }
      if (hashtags.length === 1 && hashtags[i] === '#') {
        return 'Хэш-тег не может быть только #';
      }
      if (hashtags[i].length > CONST.HASHTAG_LENGTH_MAX) {
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
    if (hashtags.length > CONST.HASHTAGS_MAX) {
      return 'Нельзя указать больше 5-ти хэш-тегов';
    }
    return '';
  };

  textHashtags.addEventListener('input', function (evt) {
    textHashtags.setCustomValidity(validateHashtags(evt.target.value));
  });

})();
