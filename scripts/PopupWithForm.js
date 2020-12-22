import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor (popupSelector, submitHandler) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__container');
    this._popupInputs = this._popup.querySelectorAll('.popup__input');

    this._submitHandler = submitHandler;

    this._submitHandler = this._submitHandler.bind(this);
  }

  _getInputValues() {
    this._values = {};

    this._values.name = this._popupInputs[0].value;
    this._values.description = this._popupInputs[1].value;

    return this._values;
  }

  setEventListeners () {
    super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
      this._getInputValues();
      this._submitHandler(evt, this._values);
    });
  }
}