// * Объявляем глобальные переменные

const root = document.querySelector('.root'); // Корневой блок

// --- Объявляем переменные в профиле

const editProfileButton = document.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»

const profileNameString = document.querySelector('.profile__name'); // Имя на странице
const profileDescriptionString = document.querySelector('.profile__description'); // Описание на странице

const addCardButton = document.querySelector('.profile__add'); // Кнопка «Добавить карточку»

// --- Объявляем переменные в карточках

const cardGrid = document.querySelector('.cards'); // Грид-контейнер с карточками

const cardTemplate = document.querySelector('#template-card').content; // Шаблон карточки

const initialCards = [ // Массив с карточками из коробки
  {
    name: 'Карелия',
    link: './resources/images/card-images/pic-karelia.jpg',
    alt: 'Скульптура на набережной Онежского озера'
  },
  {
    name: 'Калининград',
    link: './resources/images/card-images/pic-kalina.jpg',
    alt: 'Кёнигсбергский собор'
  },
  {
    name: 'Чечня',
    link: './resources/images/card-images/pic-chechnya.jpg',
    alt: 'Горная дорога вдоль реки Аргун'
  },
  {
    name: 'Калмыкия',
    link: './resources/images/card-images/pic-elista.jpg',
    alt: 'Золотая обитель Будды Шакьямуни'
  },
  {
    name: 'Белгородчина',
    link: './resources/images/card-images/pic-belgorod.jpg',
    alt: 'Зелёные поля Белгородской области'
  },
  {
    name: 'Новороссийск',
    link: './resources/images/card-images/pic-novoros.jpg',
    alt: 'Набережная Новороссийска'
  },
];

// --- Объявляем переменные в попапах

const popupContainers = document.querySelectorAll('.popup'); // Блоки с попапами

const popupProfile = popupContainers[0]; // Блок с попапом «Редактировать профиль»
const popupProfileForm = popupProfile.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfile.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfile.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupCard = popupContainers[1]; // Блок с попапом «Добавить карточку»
const popupCardForm = popupCard.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»
const cardPlaceInput = popupCard.querySelector('.popup__input_card-name'); // Поле для ввода названия места в попапе «Добавить карточку»
const cardLinkInput = popupCard.querySelector('.popup__input_card-link'); // Поле для ввода адреса фото в попапе «Добавить карточку»

const popupFullPic = popupContainers[2]; // Блок с попапом полноразмерной картинки

const popupCloseButtons = document.querySelectorAll('.popup__close'); // Кнопки закрытия попапов

// * Объявляем функции

function addInitialCards () { // Добавление карточек «из коробки»
  initialCards.forEach(function (card) {
    addCard(card.name, card.link, card.alt);
  });
}

function openPopup (popup) { // Открытие попапа
  popup.classList.add('popup_opened');
}

function openFullPic (evt) { // Открытие попапа с полноразмерной картинкой
  openPopup(popupFullPic);

  const image = popupFullPic.querySelector('.popup__image');
  const targetImage = evt.target;

  image.setAttribute('src', targetImage.src);
  image.setAttribute('alt', targetImage.alt);

  const caption = popupFullPic.querySelector('.popup__caption');
  caption.textContent = targetImage.alt;
}

function closePopup () { // Закрытие попапа
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { // Обработчик отправки форм
  evt.preventDefault();
  closePopup();
}

function setProfileValues (evt) { // Установка имени и описания профиля
  formSubmitHandler(evt);
  
  profileNameString.textContent = profileNameInput.value;
  profileDescriptionString.textContent = profileDescriptionInput.value;
}

function returnProfileValues () { // Возвращение имени и описания профиля в форму
  profileNameInput.value = profileNameString.textContent;
  profileDescriptionInput.value = profileDescriptionString.textContent;
}

function addCard (name, link, alt) { // Создание новой карточки
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.card__name').textContent = name;
  newCard.querySelector('.card__image').setAttribute('src', link);
  
  if (alt) {
    newCard.querySelector('.card__image').setAttribute('alt', alt);
  } else {
    newCard.querySelector('.card__image').setAttribute('alt', name);
  }

  const openFullPicButton = newCard.querySelector('.card__open-full-pic');

  openFullPicButton.addEventListener('click', openFullPic);

  const removeCardButton = newCard.querySelector('.card__delete');
  removeCardButton.addEventListener('click', function () {
    removeCard(removeCardButton);
  });

  const likeButton = newCard.querySelector('.card__like');
  likeButton.addEventListener('click', function () {
    setLike(likeButton);
  });

  cardGrid.prepend(newCard);
}

function setCardValues (evt) { // Передача значений для новой карточки
  formSubmitHandler(evt);

  const name = cardPlaceInput.value;
  const link = cardLinkInput.value;

  addCard(name, link);

  cardPlaceInput.value = '';
  cardLinkInput.value = '';
}

function removeCard (source) { // Удаление существующей карточки
  const currentCard = source.parentNode;
  cardGrid.removeChild(currentCard);
}

function setLike (el) { // Установка и снятие лайка
  el.classList.toggle('card__like_active');
}

// * Вешаем слушатели событий

editProfileButton.addEventListener('click', function () { // Клик по кнопке «Редактировать профиль»
  returnProfileValues();
  openPopup(popupProfile);
});

addCardButton.addEventListener('click', function () { // Клик по кнопке «Добавить карточку»
  openPopup(popupCard);
});

popupCloseButtons.forEach(function (button) { // Клик по кнопкам закрытия попапов
  button.addEventListener('click', closePopup);
});

popupProfileForm.addEventListener('submit', setProfileValues);
popupCardForm.addEventListener('submit', setCardValues);

// * Вызываем функции

addInitialCards();