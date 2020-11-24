// * Вносим исходные данные

const initialCards = [ // Массив с карточками из коробки
  {
    name: 'Карелия',
    link: './resources/images/card-images/pic-karelia.jpg',
    alt: 'Скульптура на набережной Онежского озера',
    author: 'Борис Никиташов'
  },
  {
    name: 'Калининград',
    link: './resources/images/card-images/pic-kalina.jpg',
    alt: 'Кёнигсбергский собор',
    author: 'Борис Никиташов'
  },
  {
    name: 'Чечня',
    link: './resources/images/card-images/pic-chechnya.jpg',
    alt: 'Горная дорога вдоль реки Аргун',
    author: 'Борис Никиташов'
  },
  {
    name: 'Калмыкия',
    link: './resources/images/card-images/pic-elista.jpg',
    alt: 'Золотая обитель Будды Шакьямуни',
    author: 'Борис Никиташов'
  },
  {
    name: 'Белгородчина',
    link: './resources/images/card-images/pic-belgorod.jpg',
    alt: 'Зелёные поля Белгородской области',
    author: 'Борис Никиташов'
  },
  {
    name: 'Новороссийск',
    link: './resources/images/card-images/pic-novoros.jpg',
    alt: 'Набережная Новороссийска',
    author: 'Борис Никиташов'
  },
];

// * Объявляем глобальные переменные

const root = document.querySelector('.root'); // Корневой блок

// --- Объявляем переменные в профиле

const editProfileButton = root.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»

const profileNameString = root.querySelector('.profile__name'); // Имя на странице
const profileDescriptionString = root.querySelector('.profile__description'); // Описание на странице

const createCardButton = root.querySelector('.profile__add'); // Кнопка «Добавить карточку»

// --- Объявляем переменные в карточках

const cardGrid = root.querySelector('.cards'); // Грид-контейнер с карточками

const cardTemplate = root.querySelector('#template-card').content; // Шаблон карточки


// --- Объявляем переменные в попапах

const popupProfile = root.querySelector('.popup-profile'); // Блок с попапом «Редактировать профиль»
const popupProfileForm = popupProfile.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfile.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfile.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupCard = root.querySelector('.popup-card'); // Блок с попапом «Добавить карточку»
const popupCardForm = popupCard.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»
const cardPlaceInput = popupCard.querySelector('.popup__input_card-name'); // Поле для ввода названия места в попапе «Добавить карточку»
const cardLinkInput = popupCard.querySelector('.popup__input_card-link'); // Поле для ввода адреса фото в попапе «Добавить карточку»

const popupFullPic = root.querySelector('.popup-fullpic'); // Блок с попапом полноразмерной картинки

const popupCloseButtons = root.querySelectorAll('.popup__close'); // Кнопки закрытия попапов

// * Объявляем функции

function addInitialCards () { // Добавление карточек «из коробки»
  initialCards.forEach(function (card) {
    addCard(createCard(card.name, card.link, card.alt, card.author));
  });
}

// --- Открытие и закрытие попапов

function openPopup (popup) { // Открытие попапа
  popup.classList.add('popup_opened');

  if (popup != popupFullPic) {
    checkForm(popup.querySelector('.popup__container'), validationConfig);
  } 

  popup.addEventListener('mousedown', overlayClosePopup);
  window.addEventListener('keydown', escClosePopup);
}

function openFullPic (evt) { // Открытие попапа с полноразмерной картинкой
  const image = popupFullPic.querySelector('.popup__fullpic');
  const targetImage = evt.target;

  image.setAttribute('src', targetImage.src);
  image.setAttribute('alt', targetImage.alt);
  image.setAttribute('data-author', targetImage.dataset.author);

  const author = image.dataset.author;
  const caption = popupFullPic.querySelector('.popup__caption');

  if (author !== 'undefined') {
    caption.textContent = targetImage.alt + ' / © ' + author;
  } else {
    caption.textContent = targetImage.alt;
  }

  openPopup(popupFullPic);
}

function closePopup (popup) { // Закрытие попапа
  const popupErrors = popup.querySelectorAll('.popup__error');
  popupErrors.forEach((error) => error.classList.remove('popup__error_active'));

  popup.removeEventListener('mousedown', overlayClosePopup);
  window.removeEventListener('keydown', escClosePopup);

  popup.classList.remove('popup_opened');
}

function overlayClosePopup (evt) { // Закрытие попапа по нажатию на оверлей
  const popup = root.querySelector('.popup_opened');

  if (evt.target === popup) {
    closePopup(popup);
  }
}

function escClosePopup (evt) { // Закрытие попапа кнопкой Esc
  if (evt.key.toLowerCase() === 'escape') {
    const popup = root.querySelector('.popup_opened');
    closePopup(popup);
  }
}

// --- Отправка форм

function setProfileValues (evt) { // Установка имени и описания профиля
  evt.preventDefault();

  profileNameString.textContent = profileNameInput.value;
  profileDescriptionString.textContent = profileDescriptionInput.value;

  const popup = root.querySelector('.popup_opened');
  closePopup(popup);
}

function returnProfileValues () { // Возвращение имени и описания профиля в форму
  profileNameInput.value = profileNameString.textContent;
  profileDescriptionInput.value = profileDescriptionString.textContent;
}

function setCardValues (evt) { // Передача значений для новой карточки
  evt.preventDefault();

  const name = cardPlaceInput.value;
  const link = cardLinkInput.value;
  addCard(createCard(name, link));

  const popup = root.querySelector('.popup_opened');
  closePopup(popup);
}

function createCard (name, link, alt, author) { // Создание новой карточки
  const newCard = cardTemplate.cloneNode(true);
  const newCardImage = newCard.querySelector('.card__image');

  newCard.querySelector('.card__name').textContent = name;
  newCardImage.setAttribute('src', link);
  
  if (alt) {
    newCardImage.setAttribute('alt', alt);
  } else {
    newCardImage.setAttribute('alt', name);
  }

  if (author) {
    newCardImage.setAttribute('data-author', author);
  }

  const openFullPicButton = newCard.querySelector('.card__open-fullpic');

  openFullPicButton.addEventListener('mousedown', openFullPic);

  const removeCardButton = newCard.querySelector('.card__delete');
  removeCardButton.addEventListener('mousedown', function () {
    removeCard(removeCardButton);
  });

  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('mousedown', function () {
    setLike(likeButton);
  });

  // cardGrid.prepend(newCard);

  return newCard;
}

function addCard (card) { // Добавление новой карточки
  cardGrid.prepend(card);
}

// --- Удаление и лайки на карточках

function removeCard (source) { // Удаление существующей карточки
  const currentCard = source.closest('.card');
  currentCard.remove();
}

function setLike (el) { // Установка и снятие лайка
  el.classList.toggle('card__like_active');
}

// * Вешаем слушатели событий

editProfileButton.addEventListener('mousedown', function () { // Клик по кнопке «Редактировать профиль»
  returnProfileValues();
  openPopup(popupProfile);
});

createCardButton.addEventListener('mousedown', function () { // Клик по кнопке «Добавить карточку»
  const form = popupCard.querySelector('.popup__container');
  form.reset();
  checkForm(form, validationConfig);

  openPopup(popupCard);
});

popupCloseButtons.forEach(function (button) { // Клик по кнопкам закрытия попапов
  button.addEventListener('mousedown', function () {
    const popup = root.querySelector('.popup_opened');
    closePopup(popup);
  });
});

popupProfileForm.addEventListener('submit', setProfileValues); // Отправка формы «Редактировать профиль»
popupCardForm.addEventListener('submit', setCardValues); // Отправка формы «Добавить карточку»

// * Вызываем функции

addInitialCards();