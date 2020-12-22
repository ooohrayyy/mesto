// * Импортируем модули

import { validationConfig, initialCards } from './data.js';
import {
  root,
  profileEditButton,
  cardCreateButton,
  cardGridSelector,
  popupProfileSelector,
  popupProfileForm,
  profileNameInput,
  profileDescriptionInput,
  popupCardSelector,
  popupCardForm,
  popupFullPicSelector
} from './constants.js';

import FormValidator from './FormValidator.js';
import UserInfo from './UserInfo.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Card from './Card.js';
import Section from './Section.js';

// * Объявляем глобальные переменные

// --- Объявляем переменные в профиле

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});

const profileNameString = root.querySelector('.profile__name'); // Имя на странице
const profileDescriptionString = root.querySelector('.profile__description'); // Описание на странице

// --- Объявляем переменные в карточках

const cardGrid = root.querySelector(cardGridSelector); // Грид-контейнер с карточками

// --- Объявляем переменные в попапах

const popupProfile = new PopupWithForm(popupProfileSelector, handleProfileSubmit);
const popupProfileElement = root.querySelector('.popup-profile'); // Попап «Редактировать профиль»

const popupCard = new PopupWithForm(popupCardSelector, handleCardSubmit);
const popupCardElement = root.querySelector('.popup-card'); // Попап «Добавить карточку»

const popupFullPic = new PopupWithImage(popupFullPicSelector);

// * Объявляем функции

function renderCards (data, section) { // Отрисовка карточек
  function openFullPic (evt) {
    popupFullPic.open(evt);
  }

  const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
  section.addItem(cardElement);
}

function handleProfileSubmit (evt, values) {
  evt.preventDefault();

  userInfo.setUserInfo(values);

  popupProfile.close();
}

function handleCardSubmit (evt, values) {
  evt.preventDefault();

  const data = {};
  data.name = values[0].inputValue;
  data.link = values[1].inputValue;

  const newCardSection = new Section({ items: data, renderer: renderCards }, cardGridSelector);
  newCardSection.renderItems();

  popupCard.close();
}

// * Вешаем слушатели событий

profileEditButton.addEventListener('click', function () { // Клик по кнопке «Редактировать профиль»
  const currentUserInfo = userInfo.getUserInfo();
  profileNameInput.value = currentUserInfo.name;
  profileDescriptionInput.value = currentUserInfo.description;

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

// * Создаём экземпляры классов

const initialCardsSection = new Section({ items: initialCards, renderer: renderCards }, cardGridSelector); // Секция с карточками из корбки

// * Вызываем функции

const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидация формы «Редактировать профиль»
profileValidator.enableValidation();

const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидация формы «Добавить карточку»
cardValidator.enableValidation();

initialCardsSection.renderItems(); // Добавление карточек из коробки