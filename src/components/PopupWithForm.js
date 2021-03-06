import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;

    this._form = this._popup.querySelector('.popup__container');
    this._popupInputs = this._popup.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._buttonText = this._submitButton.textContent;
    this._buttonLoadingText = 'Сохранение...';

    this._submitHandler = this._submitHandler.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.renderLoading = this.renderLoading.bind(this);
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

  close () {
    this.hideResponseError();
    super.close();
  }

  renderLoading (isLoading) {
    if (isLoading) {
      this._submitButton.textContent = this._buttonLoadingText;
    } else {
      this._submitButton.textContent = this._buttonText;
    }
  }

  showResponseError (err) {
    this._submitButton.textContent = err;
    this._submitButton.classList.add('popup__button_error');
  }

  hideResponseError () {
    this._submitButton.textContent = this._buttonText;
    this._submitButton.classList.remove('popup__button_error');
  }
}