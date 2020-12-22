export default class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);

    this.close = this.close.bind(this);
  }

  _handleEscClose () {
    window.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this.close();
      }
    });
  }

  _handleOverlayClose () {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      }
    });
  }

  setEventListeners () {
    this._handleEscClose();
    this._handleOverlayClose();

    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener('click', this.close);
  }

  open () {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
  }
}