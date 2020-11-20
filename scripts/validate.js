// * Валидация форм 

function enableValidation () { // Активация валидации
  const formsArray = Array.from(document.querySelectorAll('.popup__container'));

  formsArray.forEach(function (form) {
    const inputsArray = Array.from(form.querySelectorAll('.popup__input'));

    inputsArray.forEach(function (input) {
      const saveButton = form.querySelector('.popup__save');

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
    showValidationError(input);
    disableSaveButton(saveButton);
  } else {
    hideValidationError(input);
    enableSaveButton(saveButton);
  }
}

function showValidationError (input) { // Показ ошибки валидации
  const errorMessage = input.nextElementSibling;

  errorMessage.textContent = input.validationMessage;

  errorMessage.classList.add('popup__error_active');
}

function hideValidationError (input) { // Скрытие ошибки валидации
  const errorMessage = input.nextElementSibling;

  errorMessage.classList.remove('popup__error_active');
}

function disableSaveButton (button) { // Выключение кнопки сохранения попапа
  button.setAttribute('disabled', 'disabled');
}

function enableSaveButton (button) { // Включение кнопки сохранения попапа
  button.removeAttribute('disabled');
}