// TODO: Сделать так, чтобы при открытии формы в полях оставался сохранённый вариант текста

// Включение и выключение попапа

let popupContainer = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit');
let popupCloseButton = document.querySelector('.popup__close');

function controlPopup() {
  popupContainer.classList.toggle('popup_opened');
}

popupOpenButton.addEventListener('click', controlPopup);
popupCloseButton.addEventListener('click', controlPopup);

// Форма редактирования профиля

let formElement = document.querySelector('.popup__container');

function formSubmitHandler (evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__input_name');
  let jobInput = document.querySelector('.popup__input_description');

  let nameString = document.querySelector('.profile__name');
  let jobString = document.querySelector('.profile__description');

  nameString.textContent = nameInput.value;
  jobString.textContent = jobInput.value;

  controlPopup();
}

formElement.addEventListener('submit', formSubmitHandler);