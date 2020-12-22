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
    this._values = [];

    this._popupInputs.forEach((input) => {
      const result = {
        inputName: input.name,
        inputValue: input.value
      };

      this._values.push(result);
    });

    return this._values;
  }

  close () {
    this._form.reset();
    super.close();
  }

  setEventListeners () {
    super.setEventListeners();
    
    this._form.addEventListener('submit', (evt) => {
      this._getInputValues();
      this._submitHandler(evt, this._values);
    });
  }
}