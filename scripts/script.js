// Объявляем переменные //

let popupContainer = document.querySelector('.popup'); // Весь блок с попапом
let formElement = document.querySelector('.popup__container'); // Форма попапа
let popupOpenButton = document.querySelector('.profile__edit'); // Кнопка «Редактировать профиль»
let popupCloseButton = document.querySelector('.popup__close'); // Кнопка закрытия попапа

let nameInput = document.querySelector('.popup__input_name'); // Поле для ввода имени
let jobInput = document.querySelector('.popup__input_description'); // Поле для ввода описания

let nameString = document.querySelector('.profile__name'); // Имя на странице
let jobString = document.querySelector('.profile__description'); // Описание на странице

// Функция для открытия и закрытия попапа

function controlPopup() {
  if (!popupContainer.classList.contains('popup_opened')) { // Если попап был закрыт, возвращаем в поля формы последнее сохранённое значение
    nameInput.value = nameString.textContent;
    jobInput.value = jobString.textContent;
  }

  popupContainer.classList.toggle('popup_opened'); // Открываем или закрываем попап — по ситуации
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