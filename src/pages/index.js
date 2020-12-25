// ! Второй привет код-ревью! Спасибо за отзыв, постарался всё учесть!

// * Импортируем стили

import './index.css';

// * Импортируем модули

import { validationConfig, initialCards } from '../components/data.js';
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
} from '../components/constants.js';

import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';

// * Создаём экземпляры классов

const userInfo = new UserInfo({ // Информация о пользователе
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description'
});

const cardsSection = new Section({ // Секция с карточками из коробки
  items: initialCards,
  renderer: (data) => {
    const cardElement = new Card(data, '#template-card', popupFullPic.open).generateCard();
    cardsSection.appendItem(cardElement);
  }
}, cardGridSelector);

const popupProfile = new PopupWithForm( // Попап «Редактировать профиль»
  popupProfileSelector,
  (evt, values) => {
    evt.preventDefault();

    userInfo.setUserInfo(values);

    popupProfile.close();
  }
);
const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидатор формы «Редактировать профиль»

const popupCard = new PopupWithForm( // Попап «Добавить карточку»
  popupCardSelector,
  (evt, values) => {
    evt.preventDefault();

    const data = {};
    data.name = values.place;
    data.link = values.link;

    const cardElement = new Card(data, '#template-card', popupFullPic.open).generateCard();
    cardsSection.addItem(cardElement);

    popupCard.close();
  }
);
const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидатор формы «Добавить карточку»

const popupFullPic = new PopupWithImage(popupFullPicSelector); // Попап с полноразмерной картинкой

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

// * Вызываем методы

profileValidator.enableValidation(); // Запуск валидации формы «Редактировать профиль»
cardValidator.enableValidation(); // Запуск валидации формы «Добавить карточку»
cardsSection.renderItems(); // Добавление карточек из коробки