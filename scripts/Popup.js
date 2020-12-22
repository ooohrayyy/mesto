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

  setEventListeners () {
    this._handleEscClose();

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