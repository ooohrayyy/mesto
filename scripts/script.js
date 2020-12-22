// * Импортируем модули

import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
// import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
// import UserInfo from './UserInfo.js';
import Card from './Card.js';
import Section from './Section.js';

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

const cardGridSelector = '.cards'; // Селектор грид-контейнера с карточками
const cardGrid = root.querySelector(cardGridSelector); // Грид-контейнер с карточками

// --- Объявляем переменные в попапах

const popupProfileSelector = '.popup-profile';
const popupProfile = new Popup(popupProfileSelector);
const popupProfileElement = root.querySelector('.popup-profile'); // Попап «Редактировать профиль»
const popupProfileForm = popupProfileElement.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfileElement.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfileElement.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupCardSelector = '.popup-card';
const popupCard = new Popup(popupCardSelector);
const popupCardElement = root.querySelector('.popup-card'); // Попап «Добавить карточку»
const popupCardForm = popupCardElement.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»
const cardPlaceInput = popupCardElement.querySelector('.popup__input_card-name'); // Поле для ввода названия места в попапе «Добавить карточку»
const cardLinkInput = popupCardElement.querySelector('.popup__input_card-link'); // Поле для ввода адреса фото в попапе «Добавить карточку»

const popupFullPicSelector = '.popup-fullpic';
const popupFullPic = new PopupWithImage(popupFullPicSelector);

// * Объявляем функции

function cardRenderer (data, section) { // Отрисовка карточек
  function openFullPic (evt) {
    popupFullPic.open(evt);
  }

  const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
  section.addItem(cardElement);
}

// --- Открытие и закрытие попапов

function returnProfileValues () { // Возвращение имени и описания профиля в форму
  profileNameInput.value = profileNameString.textContent;
  profileDescriptionInput.value = profileDescriptionString.textContent;
}

// --- Отправка форм

function setProfileValues (evt) { // Установка имени и описания профиля
  evt.preventDefault();

  profileNameString.textContent = profileNameInput.value;
  profileDescriptionString.textContent = profileDescriptionInput.value;

  popupProfile.close();
}

function setCardValues (evt) { // Передача значений для новой карточки
  evt.preventDefault();

  const data = {};
  data.name = cardPlaceInput.value;
  data.link = cardLinkInput.value;

  addCard(data);

  popupCard.close();
}

function addCard (data) { // Добавление новой карточки
  const newCardSection = new Section({ items: data, renderer: cardRenderer }, cardGridSelector);
  newCardSection.renderItems();
}

// * Вешаем слушатели событий

profileEditButton.addEventListener('click', function () { // Клик по кнопке «Редактировать профиль»
  returnProfileValues();
  profileValidator.checkForm();
  popupProfile.open();
});

cardCreateButton.addEventListener('click', function () { // Клик по кнопке «Добавить карточку»
  popupCardForm.reset();
  cardValidator.checkForm();
  popupCard.open();
});

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupFullPic.setEventListeners();

popupProfileForm.addEventListener('submit', setProfileValues); // Отправка формы «Редактировать профиль»
popupCardForm.addEventListener('submit', setCardValues); // Отправка формы «Добавить карточку»

// * Создаём экземпляры классов

const initialCardsSection = new Section({ items: initialCards, renderer: cardRenderer }, cardGridSelector); // Секция с карточками из корбки

// * Вызываем функции

const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидация формы «Редактировать профиль»
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидация формы «Добавить карточку»
cardValidator.enableValidation();

initialCardsSection.renderItems(); // Добавление карточек из коробки