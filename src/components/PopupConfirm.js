import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor (popupSelector) {
    super(popupSelector);

    this._confirmButton = this._popup.querySelector('.popup__button');

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  _setEventListeners () {
    super._setEventListeners();

    this._confirmButton.addEventListener('click', this.confirmDelete);
  }

  open (card) {
    super.open();

    this._card = card;
  }

  confirmDelete () {
    this._card.removeCard();
    this.close();
  }
}