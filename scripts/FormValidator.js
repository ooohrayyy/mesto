class FormValidator {
  constructor (config, form) {
    this._config = config;
    this._form = form;
    this._inputs = this._form.querySelectorAll(this._config.inputSelector);
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _isValid (input) {
    if (input.validity.valid === true) {
      return true;
    } else {
      return false;
    }
  }

  _validateForm (input) {
    const inputsArray = Array.from(this._inputs);

    if (!inputsArray.every(this._isValid)) {
      this._showValidationError(input);
      this._disableSaveButton();
    } else {
      this._hideValidationError(input);
      this._enableSaveButton();
    }
  }

  _showValidationError (input) {
    const errorMessage = input.nextElementSibling;
    errorMessage.textContent = input.validationMessage;
    errorMessage.classList.add(this._config.activeErrorClass);
  }

  _hideValidationError (input) {
    const errorMessage = input.nextElementSibling;
    errorMessage.classList.remove(this._config.activeErrorClass);
  }

  _disableSaveButton () {
    this._submitButton.setAttribute('disabled', 'disabled');
  }

  _enableSaveButton () {
    this._submitButton.removeAttribute('disabled');
  }
  
  enableValidation () {
    const validator = this;

    validator._inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        validator._validateForm(input);

        if (input.value == false) {
          validator._hideValidationError(input);
        }
      });
    });
  }

  checkForm () {
    const formIsValid = this._form.checkValidity();

    this._inputs.forEach((input) => this._hideValidationError(input, this._config));

    if (formIsValid) {
      this._enableSaveButton();
    } else {
      this._disableSaveButton();
    }
  }

  clearForm () {
    this._form.reset();
    this._inputs.forEach((input) => this._hideValidationError(input, this._config));
  }
}

// * Экспорт

export { FormValidator };