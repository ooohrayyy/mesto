// * Валидация форм

const validationConfig = { // Объект с конфигурацией
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  activeErrorClass: 'popup__error_active'
}

function enableValidation (config) { // Активация валидации
  const formsArray = Array.from(document.querySelectorAll(config.formSelector));

  formsArray.forEach(function (form) {
    const inputsArray = Array.from(form.querySelectorAll(config.inputSelector));

    inputsArray.forEach(function (input) {
      const saveButton = form.querySelector(config.submitButtonSelector);

      validateForm(inputsArray, input, saveButton);

      input.addEventListener('input', () => validateForm(inputsArray, input, saveButton));
    });
  });
}

function isValid (input) { // Проверка конкретного поля на валидность
  if (input.validity.valid === true) {
    return true;
  } else {
    return false;
  }
}

function validateForm (inputsArray, input, saveButton) { // Валидация формы
  if (!inputsArray.every(isValid)) {
    showValidationError(input, validationConfig);
    disableSaveButton(saveButton);
  } else {
    hideValidationError(input, validationConfig);
    enableSaveButton(saveButton);
  }
}

function showValidationError (input, config) { // Показ ошибки валидации
  const errorMessage = input.nextElementSibling;

  errorMessage.textContent = input.validationMessage;

  errorMessage.classList.add(config.activeErrorClass);
}

function hideValidationError (input, config) { // Скрытие ошибки валидации
  const errorMessage = input.nextElementSibling;

  errorMessage.classList.remove(config.activeErrorClass);
}

function disableSaveButton (button) { // Выключение кнопки сохранения попапа
  button.setAttribute('disabled', 'disabled');
}

function enableSaveButton (button) { // Включение кнопки сохранения попапа
  button.removeAttribute('disabled');
}