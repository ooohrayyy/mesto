// * Объявляем глобальные переменные

const root = document.querySelector('.root'); // Корневой блок

// --- Объявляем переменные в профиле

const editProfileButton = document.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»

const nameString = document.querySelector('.profile__name'); // Имя на странице
const jobString = document.querySelector('.profile__description'); // Описание на странице

const addCardButton = document.querySelector('.profile__add'); // Кнопка «Добавить карточку»

// --- Объявляем переменные в карточках

const cardGrid = document.querySelector('.elements'); // Грид-контейнер с карточками

const cardTemplate = document.querySelector('#template-card').content; // Шаблон карточки

const initialCards = [ // Массив с карточками из коробки
  {
    name: 'Карелия',
    link: './resources/images/element-images/pic-karelia.jpg',
    alt: 'Скульптура на набережной Онежского озера'
  },
  {
    name: 'Калининград',
    link: './resources/images/element-images/pic-kalina.jpg',
    alt: 'Кёнигсбергский собор'
  },
  {
    name: 'Чечня',
    link: './resources/images/element-images/pic-chechnya.jpg',
    alt: 'Горная дорога из Шатоя в Ведено'
  },
  {
    name: 'Калмыкия',
    link: './resources/images/element-images/pic-elista.jpg',
    alt: 'Золотая обитель Будды Шакьямуни'
  },
  {
    name: 'Белгородчина',
    link: './resources/images/element-images/pic-belgorod.jpg',
    alt: 'Зелёные поля Белгородской области'
  },
  {
    name: 'Новороссийск',
    link: './resources/images/element-images/pic-novoros.jpg',
    alt: 'Набережная Новороссийска'
  },
];

// --- Объявляем переменные в попапах

const popupContainers = document.querySelectorAll('.popup'); // Блоки с попапами

const popupProfile = popupContainers[0]; // Блок с попапом «Редактировать профиль»
const popupProfileForm = popupProfile.querySelector('.popup__container'); // Форма в попапе «Редактировать профиль»
const nameInput = popupProfile.querySelector('.popup__input_name'); // Поле для ввода имени в попапе «Редактировать профиль»
const jobInput = popupProfile.querySelector('.popup__input_description'); // Поле для ввода описания в попапе «Редактировать профиль»

const popupPic = popupContainers[1]; // Блок с попапом «Добавить карточку»
const popupPicForm = popupPic.querySelector('.popup__container'); // Форма в попапе «Добавить карточку»
const placeInput = popupPic.querySelector('.popup__input_card-name'); // Поле для ввода названия места в попапе «Добавить карточку»
const linkInput = popupPic.querySelector('.popup__input_card-link'); // Поле для ввода адреса фото в попапе «Добавить карточку»

const popupFullPic = popupContainers[2];

const popupCloseButtons = document.querySelectorAll('.popup__close'); // Кнопки закрытия попапов

// * Объявляем функции

function addInitialCards () { // --- Добавление карточек «из коробки»
  initialCards.forEach(function (card) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__name').textContent = card.name;
    cardElement.querySelector('.element__image').setAttribute('src', card.link);
    cardElement.querySelector('.element__image').setAttribute('alt', card.alt);

    const openFullPicButton = cardElement.querySelector('.element__open-full-pic');

    openFullPicButton.addEventListener('click', openFullPic);

    const deleteCardButton = cardElement.querySelector('.element__delete');

    deleteCardButton.addEventListener('click', function() {
      removeCard(deleteCardButton);
    });

    const likeButton = cardElement.querySelector('.element__like');

    likeButton.addEventListener('click', function() {
        setLike(likeButton);
    });

    cardGrid.prepend(cardElement);
  })
}

function openPopup(popup) { // --- Открытие попапа
  popup.classList.add('popup_opened');
}

function openFullPic(evt) { // --- Открытие попапа с полноразмерной картинкой
  const popup = document.querySelector('#popup-full-pic');
  popup.classList.add('popup_opened');

  const image = popup.querySelector('.popup__image');
  const targetImage = evt.target;

  image.setAttribute('src', targetImage.src);
  image.setAttribute('alt', targetImage.alt);
}

function closePopup() { // --- Закрытие попапа
  const popup = document.querySelector('.popup_opened');
  popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { // --- Обработчик форм
  evt.preventDefault();
  closePopup();
}

function setProfileValues() { // --- Установка имени и описания профиля
  nameString.textContent = nameInput.value;
  jobString.textContent = jobInput.value;
}

function returnProfileValues() { // --- Возвращение имени и описания профиля в форму
  nameInput.value = nameString.textContent;
  jobInput.value = jobString.textContent;
}

function addCard(name, link) { // --- Создание новой карточки
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.element__name').textContent = name;
  cardElement.querySelector('.element__image').setAttribute('src', link);
  cardElement.querySelector('.element__image').setAttribute('alt', name);

  const openFullPicButton = cardElement.querySelector('.element__open-full-pic');

  openFullPicButton.addEventListener('click', openFullPic);

  const deleteCardButton = cardElement.querySelector('.element__delete');
  deleteCardButton.addEventListener('click', function() {
    removeCard(deleteCardButton);
  });

  const likeButton = cardElement.querySelector('.element__like');
  likeButton.addEventListener('click', function () {
    setLike(likeButton);
  })

  cardGrid.prepend(cardElement);
}

function setCardValues() { // --- Передача значений для новой карточки
  const name = placeInput.value;
  const link = linkInput.value;

  addCard(name, link);

  placeInput.value = '';
  linkInput.value = '';
}

function setLike(el) { // --- Установка и снятие лайка
  el.classList.toggle('element__like_active');
}

function removeCard(source) { // --- Удаление существующей карточки
  const currentCard = source.parentNode;
  cardGrid.removeChild(currentCard);
}

// * Вешаем слушатели событий

editProfileButton.addEventListener('click', function () { // --- Клик по кнопке «Редактировать профиль»
  returnProfileValues();
  openPopup(popupProfile);
});

addCardButton.addEventListener('click', function () { // --- Клик по кнопке «Добавить карточку»
  openPopup(popupPic);
});

function listenCloseButtons() { // --- Клик по кнопкам закрытия попапов
  popupCloseButtons.forEach(function (button) {
    button.addEventListener('click', closePopup);
  });
}

popupProfileForm.addEventListener('submit', formSubmitHandler); // --- Отправка формы «Редактировать профиль»
popupProfileForm.addEventListener('submit', setProfileValues);
popupPicForm.addEventListener('submit', formSubmitHandler); // --- Отправка формы «Добавить карточку»
popupPicForm.addEventListener('submit', setCardValues);

// * Вызываем функции

listenCloseButtons();
addInitialCards();