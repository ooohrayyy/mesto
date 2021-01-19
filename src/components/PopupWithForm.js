import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;

    this._form = this._popup.querySelector('.popup__container');
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__button');

    this._submitHandler = this._submitHandler.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
    this._values = {};
    this._popupInputs.forEach(input => this._values[input.name] = input.value);
    return this._values;
  }

  _handleSubmit (evt) {
    this._getInputValues();
    this._submitHandler(evt, this._values);
  }

  _setEventListeners () {
    super._setEventListeners();
    this._form.addEventListener('submit', this._handleSubmit);
  }

  _removeEventListeners () {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._handleSubmit);
  }

  renderLoading (isLoading) {
    switch (this._submitButton.textContent) {
      case 'Сохранить':
      case 'Сохранение...':
        if (isLoading) {
          this._submitButton.textContent = 'Сохранение...';
        } else {
          this._submitButton.textContent = 'Сохранить';
        }
        break;
      case 'Создать':
      case 'Загрузка...':
        if (isLoading) {
          this._submitButton.textContent = 'Загрузка...';
        } else {
          this._submitButton.textContent = 'Создать';
        }
        break;
    }
  }
}