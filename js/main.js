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
var MIN_COMMENTS_QUANTITY = 1;
var MAX_COMMENTS_QUANTITY = 5;
var AUTHORS_NAMES = ['Антон', 'Андрей', 'Екатерина', 'Владислав', 'Софья'];

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
  var comments = getRandomValue(MIN_COMMENTS_QUANTITY, MAX_COMMENTS_QUANTITY);
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
  bigPicture.querySelector('.big-picture__img > img').src = photo.url;
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
var ESC_KEY = 'Escape';

var upload = document.querySelector('#upload-file');
var editionFileOpen = document.querySelector('.img-upload__overlay');
var editionFileClose = editionFileOpen.querySelector('#upload-cancel');

var openPopup = function () {
  editionFileOpen.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', function (evt) {
    if (evt.key === ESC_KEY && !evt.target.classList.contains('text__hashtags')) {
      closePopup();
    }
  });
};

var closePopup = function () {
  editionFileOpen.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  upload.value = '';
};

upload.addEventListener('change', function () {
  openPopup();
});

editionFileClose.addEventListener('click', function () {
  closePopup();
});


// Процесс перемещения (этап отпускания).
var EFFECT_CHROME = 'chrome';
var EFFECT_NONE = 'none';
var EFFECT_SEPIA = 'sepia';
var EFFECT_MARVIN = 'marvin';
var EFFECT_PHOBOS = 'phobos';
var EFFECT_HEAT = 'heat';

var currentEffect = EFFECT_NONE;
var effectLevel = editionFileOpen.querySelector('.effect-level');
var effectsRadio = editionFileOpen.querySelectorAll('.effects__radio');
var imgUploadPreview = editionFileOpen.querySelector('.img-upload__preview');

var selectEffect = function (percent) {
  if (currentEffect === EFFECT_CHROME) {
    imgUploadPreview.style.filter = 'grayscale(' + percent + '1)';
  } else if (currentEffect === EFFECT_SEPIA) {
    imgUploadPreview.style.filter = 'sepia(' + percent + '1)';
  } else if (currentEffect === EFFECT_MARVIN) {
    imgUploadPreview.style.filter = 'invert(' + percent * 100 + '%)';
  } else if (currentEffect === EFFECT_PHOBOS) {
    imgUploadPreview.style.filter = 'blur(' + 3 * percent + 'px)';
  } else if (currentEffect === EFFECT_HEAT) {
    imgUploadPreview.style.filter = 'brightness(' + 3 * percent + ')';
  } else if (currentEffect === EFFECT_NONE) {
    imgUploadPreview.style.filter = '';
  }
};

var onEffectChange = function (evt) {
  currentEffect = evt.target.value;
  selectEffect(1);
};

var getSaturationPercent = function (evt) {
  var rect = evt.target.getBoundingClientRect();
  var offsetX = evt.clientX - rect.left;
  var percent = offsetX / rect.width;

  return percent;
};

var onSaturationChange = function (evt) {
  var percent = getSaturationPercent(evt);
  selectEffect(percent);
};

for (var j = 0; j < effectsRadio.length; j++) {
  effectsRadio[j].addEventListener('change', onEffectChange);
}

effectLevel.addEventListener('mouseup', onSaturationChange);

// Валидация хэш-тегов
var MAX_HASHTAG_LENGTH = 20;
var MAX_HASHTAGS = 5;

var textHashtags = editionFileOpen.querySelector('.text__hashtags');

var validateHashtags = function () {
  var hashtags = textHashtags.value.toLowerCase().split('');
  for (var i = 0; i < hashtags.length; i++) {
    var findDuplicateHashtags = hashtags.filter(function (item) {
      return item === hashtags[i];
    });
    if (hashtags[i][0] !== '#') {
      textHashtags.setCustomValidity('Хэш-тег должен начинаться с #');
    } else if (hashtags.length === 1 && hashtags[i] === '#') {
      textHashtags.setCustomValidity('Хэш-тег не может быть только #');
    } else if (hashtags[i].length > MAX_HASHTAG_LENGTH) {
      textHashtags.setCustomValidity('Хэш-тег не может быть длинее 20-ти символов, включая решётку');
    } else if (hashtags[i].lastIndexOf('#') !== 0) {
      textHashtags.setCustomValidity('Хэш-теги должны быть разделены пробелами');
    } else if (hashtags.length > MAX_HASHTAGS) {
      textHashtags.setCustomValidity('Нельзя указать больше 5-ти хэш-тегов');
    } else if (findDuplicateHashtags.length > 1) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else if (/[^a-zA-Z0-9]/.test(hashtags.substr(1, (hashtags.length - 1)))) {
      textHashtags.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
    } else {
      textHashtags.setCustomValidity('');
    }
  }
};

textHashtags.addEventListener('input', validateHashtags());
