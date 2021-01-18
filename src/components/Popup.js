export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector('.popup__close');

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose (evt) {
    if (evt.target === this._popup) {
      this.close();
    }
  }

  _setEventListeners () {
    this._closeButton.addEventListener('click', this.close);
    window.addEventListener('keydown', this._handleEscClose);
    this._popup.addEventListener('click', this._handleOverlayClose);
  }

  _removeEventListeners () {
    this._closeButton.removeEventListener('click', this.close);
    window.removeEventListener('keydown', this._handleEscClose);
    this._popup.removeEventListener('click', this._handleOverlayClose);
  }

  open () {
    this._setEventListeners();
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }
}