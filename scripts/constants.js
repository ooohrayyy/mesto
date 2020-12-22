// * Объявляем глобальные переменные

const root = document.querySelector('.root'); // Корневой блок

const profileEditButton = root.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»
const cardCreateButton = root.querySelector('.profile__add'); // Кнопка «Добавить карточку»

const cardGridSelector = '.cards'; // Селектор грид-контейнера с карточками

// --- Объявляем переменные в попапах

const popupProfileSelector = '.popup-profile';
const popupProfileElement = root.querySelector(popupProfileSelector);
const popupProfileForm = popupProfileElement.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfileElement.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfileElement.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupCardSelector = '.popup-card';
const popupCardElement = root.querySelector(popupCardSelector);
const popupCardForm = popupCardElement.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»

const popupFullPicSelector = '.popup-fullpic';

export {
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
};