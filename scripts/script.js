// * Вносим исходные данные

const initialCards = [ // Массив с карточками из коробки
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

const editProfileButton = root.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»

const profileNameString = root.querySelector('.profile__name'); // Имя на странице
const profileDescriptionString = root.querySelector('.profile__description'); // Описание на странице

const addCardButton = root.querySelector('.profile__add'); // Кнопка «Добавить карточку»

// --- Объявляем переменные в карточках

const cardGrid = root.querySelector('.cards'); // Грид-контейнер с карточками

const cardTemplate = root.querySelector('#template-card').content; // Шаблон карточки


// --- Объявляем переменные в попапах

const popupProfile = root.querySelector('#popup-profile'); // Блок с попапом «Редактировать профиль»
const popupProfileForm = popupProfile.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const profileNameInput = popupProfile.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const profileDescriptionInput = popupProfile.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupCard = root.querySelector('#popup-card'); // Блок с попапом «Добавить карточку»
const popupCardForm = popupCard.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»
const cardPlaceInput = popupCard.querySelector('.popup__input_card-name'); // Поле для ввода названия места в попапе «Добавить карточку»
const cardLinkInput = popupCard.querySelector('.popup__input_card-link'); // Поле для ввода адреса фото в попапе «Добавить карточку»

const popupFullPic = root.querySelector('#popup-fullpic'); // Блок с попапом полноразмерной картинки

const popupCloseButtons = root.querySelectorAll('.popup__close'); // Кнопки закрытия попапов

// * Объявляем функции

function addInitialCards () { // Добавление карточек «из коробки»
  initialCards.forEach(function (card) {
    addCard(card.name, card.link, card.alt, card.author);
  });
}

// --- Открытие и закрытие попапов

function openPopup (popup) { // Открытие попапа
  popup.classList.add('popup_opened');

  enableValidation(validationConfig);

  popup.addEventListener('click', overlayClosePopup);
  window.addEventListener('keydown', escClosePopup);
}

function openFullPic (evt) { // Открытие попапа с полноразмерной картинкой
  openPopup(popupFullPic);

  const image = popupFullPic.querySelector('.popup__fullpic');
  const targetImage = evt.target;

  image.setAttribute('src', targetImage.src);
  image.setAttribute('alt', targetImage.alt);
  image.setAttribute('data-author', targetImage.dataset.author);

  const author = image.dataset.author;
  const caption = popupFullPic.querySelector('.popup__caption');

  if (author !== 'undefined') {
    caption.textContent = targetImage.alt + ' / © ' + author;
  } else {
    caption.textContent = targetImage.alt;
  }
}

function closePopup () { // Закрытие попапа
  const popup = root.querySelector('.popup_opened');
  const popupErrors = popup.querySelectorAll('.popup__error');

  popupErrors.forEach((error) => error.classList.remove('popup__error_active'));

  popup.classList.remove('popup_opened');
}

function overlayClosePopup (evt) { // Закрытие попапа по нажатию на оверлей
  const popup = root.querySelector('.popup_opened');

  if (evt.target === popup) {
    popup.removeEventListener('click', overlayClosePopup);
    closePopup();
  }
}

function escClosePopup (evt) { // Закрытие попапа кнопкой Esc
  if (evt.key.toLowerCase() === 'escape') {
    closePopup();
    window.removeEventListener('keydown', escClosePopup);
  }
}

// --- Отправка форм

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

function setCardValues (evt) { // Передача значений для новой карточки
  formSubmitHandler(evt);

  const name = cardPlaceInput.value;
  const link = cardLinkInput.value;

  addCard(name, link);

  evt.target.reset();
}

function addCard (name, link, alt, author) { // Добавление новой карточки
  const newCard = cardTemplate.cloneNode(true);

  newCard.querySelector('.card__name').textContent = name;
  newCard.querySelector('.card__image').setAttribute('src', link);
  
  if (alt) {
    newCard.querySelector('.card__image').setAttribute('alt', alt);
  } else {
    newCard.querySelector('.card__image').setAttribute('alt', name);
  }

  if (author) {
    newCard.querySelector('.card__image').setAttribute('data-author', author);
  }

  const openFullPicButton = newCard.querySelector('.card__open-fullpic');

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

// --- Удаление и лайки на карточках

function removeCard (source) { // Удаление существующей карточки
  const currentCard = source.parentNode;
  currentCard.remove();
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

popupProfileForm.addEventListener('submit', setProfileValues); // Отправка формы «Редактировать профиль»
popupCardForm.addEventListener('submit', setCardValues); // Отправка формы «Добавить карточку»

// * Вызываем функции

addInitialCards();