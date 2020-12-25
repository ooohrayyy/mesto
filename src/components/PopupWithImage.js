import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);

    this.open = this.open.bind(this);
  }

  open (data) {
    const image = this._popup.querySelector('.popup__fullpic');

    image.setAttribute('src', data.link);

    if (data.alt) {
      image.setAttribute('alt', data.alt);
    } else {
      image.setAttribute('alt', data.name);
    }
    
    image.setAttribute('data-author', data.author);

    const author = image.dataset.author;
    const caption = this._popup.querySelector('.popup__caption');

    if (author !== 'undefined') {
      caption.textContent = image.alt + ' / © ' + author;
    } else {
      caption.textContent = image.alt;
    }

    super.open();
  }
}