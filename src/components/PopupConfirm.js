import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor (popupSelector, deleteCardHandler) {
    super(popupSelector);

    this._deleteCardHandler = deleteCardHandler;
    this._confirmButton = this._popup.querySelector('.popup__button');

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  _setEventListeners () {
    super._setEventListeners();

    this._confirmButton.addEventListener('click', this.confirmDelete);
  }

  open (card, cardId) {
    super.open();

    this._card = card;
    this._cardId = cardId;
  }

  confirmDelete () {
    this._deleteCardHandler(this._cardId)
      .then(() => {
        this._card.removeCard();
        this.close();
      });
  }
}