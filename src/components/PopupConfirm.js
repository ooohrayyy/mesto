import PopupWithForm from './PopupWithForm.js';

export default class PopupConfirm extends PopupWithForm {
  constructor (popupSelector, submitHandler) {
    super(popupSelector, submitHandler);

    this.confirmDelete = this.confirmDelete.bind(this);
  }

  _setEventListeners () {
    super._setEventListeners();

    this._submitButton.addEventListener('click', this.confirmDelete);
  }

  open (card, cardId) {
    super.open();

    this.card = card;
    this.cardId = cardId;
  }

  confirmDelete () {
    this._submitHandler(this.cardId);
  }
}