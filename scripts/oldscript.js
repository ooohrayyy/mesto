// --- Логика появления карточек из коробки

// Объявляем переменные

const cardGrid = document.querySelector('.elements');
const cardTemplate = document.querySelector('#template-card').content;

// Создаём массив с карточками из коробки

const initialCards = [
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

// Вставляем карточки из коробки на страницу

function addInitialCards () {
  initialCards.forEach(function (card) {
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.element__name').textContent = card.name;
    cardElement.querySelector('.element__image').setAttribute('src', card.link);
    cardElement.querySelector('.element__image').setAttribute('alt', card.alt);

    cardGrid.prepend(cardElement);
  })
}

addInitialCards();

// --- Логика для попапов

// Объявляем переменные

const popupContainer = document.querySelectorAll('.popup'); // Весь блок с попапом
let formElement = popupContainer.querySelector('.popup__container'); // Форма попапа
let popupOpenButton = document.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»
let popupCloseButton = popupContainer.querySelector('.popup__close'); // Кнопка закрытия попапа

let nameInput = popupContainer.querySelector('.popup__input_name'); // Поле для ввода имени
let jobInput = popupContainer.querySelector('.popup__input_description'); // Поле для ввода описания

let nameString = document.querySelector('.profile__name'); // Имя на странице
let jobString = document.querySelector('.profile__description'); // Описание на странице

// Функция для открытия и закрытия попапов

function controlPopup() {
  console.log(event.target);
  popupContainer.classList.toggle('popup_opened'); // Открываем или закрываем попап — по ситуации
}

// Функция для возвращения в форму имени и описания автора со страницы

function returnName() {
  if (!popupContainer.classList.contains('popup_opened')) { // Если попап был закрыт, возвращаем в поля формы последнее сохранённое значение
    nameInput.value = nameString.textContent;
    jobInput.value = jobString.textContent;
  }
}

// Добавляем слушатели событий на кнопки редактирования и закрытия

popupOpenButton.addEventListener('click', controlPopup);
popupCloseButton.addEventListener('click', controlPopup);

// Функция отправки формы

function formSubmitHandler (evt) {
  evt.preventDefault(); // Делаем так, чтобы форма не отправлялась куда-то вовне, перезагружая страницу

  // Сохраняем на странице данные из полей формы
  nameString.textContent = nameInput.value;
  jobString.textContent = jobInput.value;

  controlPopup(); // Закрываем попап
}

formElement.addEventListener('submit', formSubmitHandler); // Добавляем слушатель событий на отправку формы