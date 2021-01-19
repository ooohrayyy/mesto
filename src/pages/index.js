// ! Привет команде код-ревью! Трудно было включиться после праздников: кажется, что намудрил лишнего. Готов исправлять :)

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

import Api from '../components/Api.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithImage from '../components/PopupWithImage.js';

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

    api.patchUserInfo(values)
      .then(() => {
        userInfo.setUserInfo(values);
        popupProfile.close();
      })
      .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
      })
      .finally(() => {
        popupProfile.renderLoading(false);
      });
  }
);
const profileValidator = new FormValidator(validationConfig, popupProfileForm); // Валидатор формы «Редактировать профиль»

const popupAvatar = new PopupWithForm( // Попап «Обновить аватар»
  popupAvatarSelector,
  (evt, values) => {
    evt.preventDefault();

    popupAvatar.renderLoading(true);

    api.updateAvatar(values.avatar)
      .then(() => {
        userInfo.setAvatar(values.avatar);
        popupAvatar.close();
      })
      .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
      })
      .finally(() => {
        popupAvatar.renderLoading(false);
      });
  }
);
const avatarValidator = new FormValidator(validationConfig, popupAvatarForm); // Валидатор формы «Обновить аватар»

const popupCard = new PopupWithForm( // Попап «Добавить карточку»
  popupCardSelector,
  (evt, values) => {
    evt.preventDefault();

    popupCard.renderLoading(true);

    const data = {};
    data.name = values.place;
    data.link = values.link;
    data.isOwn = true;

    api.postCard(data)
      .then(res => {
        const newCard = new Card(data, '#template-card', popupFullPic.open, confirmDeletePopup.open, api.toggleLike);
        newCard.id = res._id;

        const cardElement = newCard.generateCard();
        cardsSection.addItem(cardElement);

        popupCard.close();
      })
      .catch(err => {
        console.log(`Что-то пошло не так: ${err}`);
      })
      .finally(() => {
        popupCard.renderLoading(false);
      });
  }
);
const cardValidator = new FormValidator(validationConfig, popupCardForm); // Валидатор формы «Добавить карточку»

const confirmDeletePopup = new PopupConfirm( // Попап подтверждения удаления
  popupConfirmDeleteSelector,
  api.deleteCard
);

const popupFullPic = new PopupWithImage(popupFullPicSelector); // Попап с полноразмерной картинкой

// * Вешаем слушатели событий

updateAvatarButton.addEventListener('click', function () { // Клик по аватарке
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
avatarValidator.enableValidation(); // Запуск валидации формы «Обновить аватар»

// * Выполняем промисы

api.fetchUserInfo() // Загрузка данных о пользователе с сервера
  .then(res => {
    const externalUserInfo = {};
    externalUserInfo.name = res.name;
    externalUserInfo.description = res.about;
    externalUserInfo.avatar = res.avatar;
    global.userID = res._id;
    userInfo.setUserInfo(externalUserInfo);
  })
  .catch(err => {
    console.log(`Что-то пошло не так: ${err}`);
  });

api.fetchInitialCards() // Загрузка готовых карточек с сервера
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
  })
  .catch(err => {
    console.log(`Что-то пошло не так: ${err}`);
  });