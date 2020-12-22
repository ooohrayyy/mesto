// * Импортируем стили

import '../pages/index.css';

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

const initialCardsSection = new Section({ // Секция с карточками из коробки
  items: initialCards,
  renderer: (data, section) => {
    function openFullPic (evt) {
      popupFullPic.open(evt);
    }
  
    const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
    section.addItem(cardElement);
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
    data.name = values.name;
    data.link = values.description;

    const newCardSection = new Section({
      items: data,
      renderer: (data, section) => {
        function openFullPic (evt) {
          popupFullPic.open(evt);
        }
      
        const cardElement = new Card(data, '#template-card', openFullPic).generateCard();
        section.addItem(cardElement);
      }
    }, cardGridSelector);
    newCardSection.renderItems();

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
initialCardsSection.renderItems(); // Добавление карточек из коробки