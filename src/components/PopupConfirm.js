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

    this._card = card;
    this._cardId = cardId;
  }

  confirmDelete () {
    this._submitHandler(this._cardId)
      .then(() => {
        this._card.removeCard();
        this.close();
      });
  }
}