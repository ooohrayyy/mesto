// * Объявляем глобальные переменные

const updateAvatarButton = document.querySelector('.profile__avatar-button'); // Кнопка «Обновить аватар»
const profileEditButton = document.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»
const cardCreateButton = document.querySelector('.profile__add'); // Кнопка «Добавить карточку»

const cardGridSelector = '.cards'; // Селектор грид-контейнера с карточками

// --- Объявляем переменные в попапах

const popupProfileSelector = '.popup-profile';
const popupProfileElement = document.querySelector(popupProfileSelector);
const popupProfileForm = popupProfileElement.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfileElement.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfileElement.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupAvatarSelector = '.popup-avatar';
const popupAvatarElement = document.querySelector(popupAvatarSelector);
const popupAvatarForm = popupAvatarElement.querySelector('.popup__container'); // Форма в попапе «Обновить аватар»

const popupCardSelector = '.popup-card';
const popupCardElement = document.querySelector(popupCardSelector);
const popupCardForm = popupCardElement.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»

const popupConfirmDeleteSelector = '.popup-delete';

const popupFullPicSelector = '.popup-fullpic';

export {
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
};