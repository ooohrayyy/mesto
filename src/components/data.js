// * Вносим исходные данные

const validationConfig = { // Конфигурация валидации
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorSelector: '.popup__error',
  activeErrorClass: 'popup__error_active',
  invalidInputClass: 'popup__input_invalid'
}

export { validationConfig };