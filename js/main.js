'use strict';

var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var QUANTITY_PHOTOS = 25;
var COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTION = ['#js', '#это', '#боль', '#крик', '#души'];
var COMMENTS_QUANTITY_MIN = 1;
var COMMENTS_QUANTITY_MAX = 5;
var AUTHORS_NAMES = ['Антон', 'Андрей', 'Екатерина', 'Владислав', 'Софья'];
var ESC_KEY = 'Escape';

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

var pictureElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
document.querySelector('.pictures__title').classList.remove('visually-hidden');

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var pictures = [];

var getComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomValue(AVATAR_MIN, AVATAR_MAX) + '.svg',
    name: AUTHORS_NAMES[getRandomValue(0, AUTHORS_NAMES.length - 1)],
    message: COMMENTS[getRandomValue(0, COMMENTS.length - 1)],
  };
  return comment;
};

var getComments = function () {
  var commentsArray = [];
  var comments = getRandomValue(COMMENTS_QUANTITY_MIN, COMMENTS_QUANTITY_MAX);
  for (var i = 1; i <= comments; i++) {
    commentsArray.push(getComment());
  }
  return commentsArray;
};

var createPictures = function () {
  for (var i = 1; i <= QUANTITY_PHOTOS; i++) {
    pictures.push(
        {
          url: 'photos/' + i + '.jpg',
          likes: getRandomValue(LIKES_MIN, LIKES_MAX),
          comments: getComments(),
          description: DESCRIPTION[getRandomValue(0, DESCRIPTION.length - 1)],
        });
  }
};

var fragment = document.createDocumentFragment();

var getPicture = function (picture) {
  var newPicture = pictureTemplate.cloneNode(true);
  newPicture.querySelector('.picture__img').src = picture.url;
  newPicture.querySelector('.picture__comments').textContent = picture.comments.length;
  newPicture.querySelector('.picture__likes').textContent = picture.likes;
  return newPicture;
};

var renderPictures = function () {
  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(getPicture(pictures[i]));
  }
  pictureElement.appendChild(fragment);
};

createPictures();
renderPictures();


// module3-task3

var bigPicture = document.querySelector('.big-picture');
var bigPictureComment = bigPicture.querySelector('.social__comment');
var bigPictureComments = bigPicture.querySelector('.social__comments');

// bigPicture.classList.remove('hidden');

// Спрятать блоки счётчика комментариев и загрузки новых комментариев
bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

// Убрать скролл на контейнере с фотографиями позади
document.querySelector('body').classList.add('modal-open');

// Заполняю комментарий информацией
var renderComment = function (item) {
  var newComment = bigPictureComment.cloneNode(true);
  newComment.querySelector('.social__picture').src = item.avatar;
  newComment.querySelector('.social__picture').alt = item.name;
  newComment.querySelector('.social__text').textContent = item.message;
  return newComment;
};

// Заполняю фотографию информацией
var renderBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url;
  bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  createComments(photo);
};

// Создаю комментарии под фотографией
var createComments = function (photo) {
  for (var i = 0; i < photo.comments.length; i++) {
    fragment.appendChild(renderComment(photo.comments[i]));
  }
  bigPictureComments.appendChild(fragment);
};

renderBigPicture(pictures[0]);


// module4-task2

// Загрузка изображения и показ формы редактирования
var upload = document.querySelector('#upload-file');
var editionFileOpen = document.querySelector('.img-upload__overlay');
var editionFileClose = editionFileOpen.querySelector('#upload-cancel');
var body = document.querySelector('body');

var openPopup = function () {
  editionFileOpen.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  editionFileOpen.classList.add('hidden');
  body.classList.remove('modal-open');
  upload.value = '';
  document.removeEventListener('keydown', onPopupEscPress);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY &&
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

// Масшабирование
var imgUploadScale = document.querySelector('.img-upload__scale');
var scaleControlSmaller = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlBigger = imgUploadScale.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
scaleControlValue.value = SCALE.DEFAULT + '%';

var changeScaleDown = function () {
  var scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue - SCALE.STEP >= SCALE.MIN) {
    imgUploadPreview.style.transform = 'scale(' + (scaleValue - SCALE.STEP) / 100 + ')';
    scaleControlValue.value = (scaleValue - SCALE.STEP) + '%';
  } else {
    imgUploadPreview.style.transform = 'scale(' + (SCALE.MIN) / 100 + ')';
    scaleControlValue.value = SCALE.MIN + '%';
  }
};

var changeScaleUp = function () {
  var scaleValue = parseInt(scaleControlValue.value, 10);
  if (scaleValue + SCALE.STEP <= SCALE.MAX) {
    imgUploadPreview.style.transform = 'scale(' + (scaleValue + SCALE.STEP) / 100 + ')';
    scaleControlValue.value = (scaleValue + SCALE.STEP) + '%';
  } else {
    imgUploadPreview.style.transform = 'scale(' + (SCALE.MAX) / 100 + ')';
    scaleControlValue.value = SCALE.MAX + '%';
  }
};

scaleControlSmaller.addEventListener('click', changeScaleDown);
scaleControlBigger.addEventListener('click', changeScaleUp);

// Процесс перемещения (этап отпускания)
var currentEffect = EFFECT.NONE;
var effectLevelPin = editionFileOpen.querySelector('.effect-level__pin');
var effectsRadio = editionFileOpen.querySelectorAll('.effects__radio');
var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');
var effectLevelLine = editionFileOpen.querySelector('.effect-level__line');

var selectEffect = function (value) {
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
