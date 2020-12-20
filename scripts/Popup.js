class Popup {
  constructor (popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose () {
    this._popup.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape') {
        this._close();
      }
    });
  }

  setEventListeners () {
    this._handleEscClose();

    const closeButton = this._popup.querySelector('.popup__close');
    closeButton.addEventListener('click', this._close);
  }

  open () {
    this._popup.classList.add('popup_opened');
  }

  close () {
    this._popup.classList.remove('popup_opened');
  }
}