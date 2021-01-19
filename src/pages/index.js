// * Импортируем стили

import './index.css';

// * Импортируем модули

import { validationConfig } from '../components/data.js';
import {
  updateAvatarButton,
  profileEditButton,
  cardCreateButton,
  cardGridSelector,
  popupProfileSelector,
  popupProfileForm,
  profileNameInput,
  profileDescriptionInput,
  popupAvatarSelector,
  popupAvatarForm,
  popupCardSelector,
  popupCardForm,
  popupConfirmDeleteSelector,
  popupFullPicSelector
} from '../components/constants.js';

import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

// * Создаём экземпляры классов

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
  authorization: '21765504-482c-4ec0-96f1-ca3e4078b259'
});

const userInfo = new UserInfo({ // Информация о пользователе
  userNameSelector: '.profile__name',
  userDescriptionSelector: '.profile__description',
  userAvatarSelector: '.profile__avatar'
});

const cardsSection = new Section(cardGridSelector); // Секция с карточками

const popupProfile = new PopupWithForm( // Попап «Редактировать профиль»
  popupProfileSelector,
  (evt, values) => {
    evt.preventDefault();

    popupProfile.renderLoading(true);

    userInfo.setUserInfo(values);
    api.patchUserInfo(values)
      .finally(popupProfile.renderLoading(false));

    popupProfile.close();
  }
);
const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидатор формы «Редактировать профиль»

const popupAvatar = new PopupWithForm(
  popupAvatarSelector,
  (evt, values) => {
    evt.preventDefault();

    popupAvatar.renderLoading(true);

    userInfo.setAvatar(values.avatar);
    api.updateAvatar(values.avatar)
      .finally(popupAvatar.renderLoading(false));

    popupAvatar.close();
  }
);
const avatarValidator = new FormValidator(validationConfig, popupAvatarForm);

const popupCard = new PopupWithForm( // Попап «Добавить карточку»
  popupCardSelector,
  (evt, values) => {
    evt.preventDefault();

    popupCard.renderLoading(true);

    const data = {};
    data.name = values.place;
    data.link = values.link;
    data.isOwn = true;

    const newCard = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike);
    const cardElement = newCard.generateCard();
    cardsSection.addItem(cardElement);

    api.postCard(data)
      .then(res => res.json())
      .then(res => {
        newCard.id = res._id;
      })
      .finally(popupCard.renderLoading(false));

    popupCard.close();
  }
);
const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидатор формы «Добавить карточку»

const confirmDeletePopup = new PopupConfirm(
  popupConfirmDeleteSelector,
  api.deleteCard
);

const popupFullPic = new PopupWithImage(popupFullPicSelector); // Попап с полноразмерной картинкой

// * Вешаем слушатели событий

updateAvatarButton.addEventListener('click', function () {
  avatarValidator.checkForm();
  popupAvatar.open();
});

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
avatarValidator.enableValidation();

// * Выполняем промисы

api.fetchUserInfo() // Загружаем имя и описание пользователя с сервера
  .then(res => {
    const externalUserInfo = {};
    externalUserInfo.name = res.name;
    externalUserInfo.description = res.about;
    externalUserInfo.avatar = res.avatar;
    global.userID = res._id;
    userInfo.setUserInfo(externalUserInfo);
  });

api.fetchInitialCards() // Загружаем готовые карточки с сервера
  .then(res => {
    res.forEach(cardObject => {
      const data = {};

      data.cardId = cardObject._id;
      if (cardObject.owner._id === userID) { data.isOwn = true }
      data.likes = cardObject.likes.length;
      data.isLiked = false;
      cardObject.likes.forEach(like => {
        if (like._id === userID) {
          data.isLiked = true;
        }
      });

      data.author = cardObject.owner.name;
      data.name = cardObject.name;
      data.link = cardObject.link;

      const card = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike).generateCard();
      cardsSection.appendItem(card);
    });
  });