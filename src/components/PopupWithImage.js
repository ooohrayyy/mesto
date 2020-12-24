import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor (popupSelector) {
    super(popupSelector);

    this.open = this.open.bind(this);
  }

  open (evt) {
    const image = this._popup.querySelector('.popup__fullpic');
    const targetImage = evt.target;

    image.setAttribute('src', targetImage.src);
    image.setAttribute('alt', targetImage.alt);
    image.setAttribute('data-author', targetImage.dataset.author);

    const author = image.dataset.author;
    const caption = this._popup.querySelector('.popup__caption');

    if (author !== 'undefined') {
      caption.textContent = targetImage.alt + ' / © ' + author;
    } else {
      caption.textContent = targetImage.alt;
    }

    super.open();
  }
}