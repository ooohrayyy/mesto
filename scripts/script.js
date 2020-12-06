// * Импортируем модули

import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

// * Вносим исходные данные

const validationConfig = { // Конфигурация валидации
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inputErrorSelector: '.popup__error',
  activeErrorClass: 'popup__error_active',
  invalidInputClass: 'popup__input_invalid'
}

const initialCards = [ // Карточки «из коробки»
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

const profileEditButton = root.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»

const profileNameString = root.querySelector('.profile__name'); // Имя на странице
const profileDescriptionString = root.querySelector('.profile__description'); // Описание на странице

const cardCreateButton = root.querySelector('.profile__add'); // Кнопка «Добавить карточку»

// --- Объявляем переменные в карточках

const cardGrid = root.querySelector('.cards'); // Грид-контейнер с карточками

// --- Объявляем переменные в попапах

const popupProfile = root.querySelector('.popup-profile'); // Попап «Редактировать профиль»
const popupProfileForm = popupProfile.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfile.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfile.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupCard = root.querySelector('.popup-card'); // Попап «Добавить карточку»
const popupCardForm = popupCard.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»
const cardPlaceInput = popupCard.querySelector('.popup__input_card-name'); // Поле для ввода названия места в попапе «Добавить карточку»
const cardLinkInput = popupCard.querySelector('.popup__input_card-link'); // Поле для ввода адреса фото в попапе «Добавить карточку»

const popupFullPic = root.querySelector('.popup-fullpic'); // Попап с полноразмерной картинкой

const popupCloseButtons = root.querySelectorAll('.popup__close'); // Кнопки закрытия попапов

// * Объявляем функции

function addInitialCards () { // Добавление карточек «из коробки»
  initialCards.forEach(data => addCard(data));
}

// --- Открытие и закрытие попапов

function returnProfileValues () { // Возвращение имени и описания профиля в форму
  profileNameInput.value = profileNameString.textContent;
  profileDescriptionInput.value = profileDescriptionString.textContent;
}

function openPopup (popup) { // Открытие попапа
  popup.classList.add('popup_opened');

  popup.addEventListener('click', closePopupByOverlay);
  window.addEventListener('keydown', closePopupByEsc);
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
  popup.removeEventListener('click', closePopupByOverlay);
  window.removeEventListener('keydown', closePopupByEsc);

  popup.classList.remove('popup_opened');
}

function closePopupByOverlay (evt) { // Закрытие попапа по клику на оверлей
  const popup = root.querySelector('.popup_opened');

  if (evt.target === popup) {
    closePopup(popup);
  }
}

function closePopupByEsc (evt) { // Закрытие попапа кнопкой Esc
  if (evt.key === 'Escape') {
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

function setCardValues (evt) { // Передача значений для новой карточки
  evt.preventDefault();

  const data = {};
  data.name = cardPlaceInput.value;
  data.link = cardLinkInput.value;

  addCard(data);

  const popup = root.querySelector('.popup_opened');
  closePopup(popup);
}

function addCard (data) { // Добавление новой карточки
  const card = new Card(data, '#template-card');
  cardGrid.prepend(card.generateCard());
}

// * Вешаем слушатели событий

profileEditButton.addEventListener('click', function () { // Клик по кнопке «Редактировать профиль»
  returnProfileValues();
  profileValidator.checkForm();
  openPopup(popupProfile);
});

cardCreateButton.addEventListener('click', function () { // Клик по кнопке «Добавить карточку»
  popupCardForm.reset();
  cardValidator.checkForm();
  openPopup(popupCard);
});

popupCloseButtons.forEach(function (button) { // Клик по кнопкам закрытия попапов
  button.addEventListener('click', function () {
    const popup = root.querySelector('.popup_opened');
    closePopup(popup);
  });
});

popupProfileForm.addEventListener('submit', setProfileValues); // Отправка формы «Редактировать профиль»

popupCardForm.addEventListener('submit', setCardValues); // Отправка формы «Добавить карточку»

// * Вызываем функции

const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидация формы «Редактировать профиль»
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидация формы «Добавить карточку»
cardValidator.enableValidation();

addInitialCards();

// * Экспорт

export { openFullPic };