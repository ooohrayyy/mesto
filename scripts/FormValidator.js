class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _checkInputValidity (input) { // Проверка инпута на валидность
    if (input.validity.valid === true) {
      return true;
    } else {
      return false;
    }
  }

  _validateForm (input) { // Валидация формы
    if (!this._checkInputValidity(input)) {
      this._showValidationError(input);
    } else {
      this._hideValidationError(input);
    }

    const inputsArray = Array.from(this._inputs);

    if (!inputsArray.every(this._checkInputValidity)) {
      this._disableSaveButton();
    } else {
      this._enableSaveButton();
    }
  }

  _showValidationError (input) {
    input.classList.add(this._config.invalidInputClass);
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._config.activeErrorClass);
  }

  _hideValidationError (input) {
    input.classList.remove(this._config.invalidInputClass);
    const errorMessage = input.nextElementSibling;
    errorMessage.classList.remove(this._config.activeErrorClass);
  }

  _disableSaveButton () {
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _enableSaveButton () {
    this._submitButton.removeAttribute('disabled');
  }

  _setEventListeners () { // !
    const validator = this;

    validator._inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        validator._validateForm(input);
      });
    });
  }
  
  enableValidation () {
    this._setEventListeners();
  }

  checkForm () { // Проверка формы при открытии
    const formIsValid = this._form.checkValidity();

    this._inputs.forEach((input) => this._hideValidationError(input, this._config));

    if (formIsValid) {
      this._enableSaveButton();
    } else {
      this._disableSaveButton();
    }
  }
}

export { FormValidator };