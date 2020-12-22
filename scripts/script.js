// * Импортируем модули

import { validationConfig, initialCards } from './data.js';
import {
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
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import Card from './Card.js';
import Section from './Section.js';

// * Создаём экземпляры классов

const userInfo = new UserInfo({ // Информация о пользователе
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});

const initialCardsSection = new Section({ items: initialCards, renderer: renderCards }, cardGridSelector); // Секция с карточками из коробки

const popupProfile = new PopupWithForm(popupProfileSelector, handleProfileSubmit); // Попап «Редактировать профиль»
const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидатор формы «Редактировать профиль»

const popupCard = new PopupWithForm(popupCardSelector, handleCardSubmit); // Попап «Добавить карточку»
const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидатор формы «Добавить карточку»

const popupFullPic = new PopupWithImage(popupFullPicSelector); // Попап с полноразмерной картинкой

// * Объявляем функции

function renderCards (data, section) { // Отрисовка карточек
  function openFullPic (evt) {
    popupFullPic.open(evt);
  }

  const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
  section.addItem(cardElement);
}

function handleProfileSubmit (evt, values) { // Отправка формы «Редактировать профиль»
  evt.preventDefault();

  userInfo.setUserInfo(values);

  popupProfile.close();
}

function handleCardSubmit (evt, values) { // Отправка формы «Добавить карточку»
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

// --- Вешаем слушатели в попапах

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupFullPic.setEventListeners();

// * Вызываем методы

profileValidator.enableValidation(); // Запуск валидации формы «Редактировать профиль»
cardValidator.enableValidation(); // Запуск валидации формы «Добавить карточку»
initialCardsSection.renderItems(); // Добавление карточек из коробки