export default class Card {
  constructor (data, template, cardClickHandler, deleteButtonHandler) {
    this._data = data;

    this._template = template;
    this._cardClickHandler = cardClickHandler;
    this._deleteButtonHandler = deleteButtonHandler;

    this._id = data.cardId;
    this._isOwn = data.isOwn;
    this._likes = data.likes;

    this._author = data.author;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;

    this.removeCard = this.removeCard.bind(this);
    this._setLike = this._setLike.bind(this);
    this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
  }

  _getTemplate () { // Получение элемента карточки из шаблона
    const cardElement = document
    .querySelector(this._template)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _setLike () { // Установка и снятие лайка
    const like = this._element.querySelector('.card__like');
    like.classList.toggle('card__like_active');
  }

  _setEventListeners () {
    const likeButton = this._element.querySelector('.card__like');
    likeButton.addEventListener('click', this._setLike);

    const openFullPicButton = this._element.querySelector('.card__open-fullpic');
    openFullPicButton.addEventListener('mousedown', () => {this._cardClickHandler(this._data)});
  }

  insertRemoveButton () {
    const label = this._element.querySelector('.card__label');

    label.insertAdjacentHTML('beforebegin',
    '<button class="card__delete" type="button"></button>'
    );

    const removeCardButton = this._element.querySelector('.card__delete');
    removeCardButton.addEventListener('click', () => {
      this._deleteButtonHandler(this, this._id);
    });
  }

  generateCard () { // Создание новой карточки
    this._element = this._getTemplate();

    const cardElementImage = this._element.querySelector('.card__image');
    const cardLikesCounter = this._element.querySelector('.card__counter');

    this._element.querySelector('.card__name').textContent = this._name;
    cardElementImage.setAttribute('src', this._link);
    cardLikesCounter.textContent = this._likes;

    if (this._alt) {
      cardElementImage.setAttribute('alt', this._alt);
    } else {
      cardElementImage.setAttribute('alt', this._name);
    }

    if (this._author) {
      cardElementImage.setAttribute('data-author', this._author);
    }

    this._setEventListeners();

    if (this._isOwn) { this.insertRemoveButton() }

    return this._element;
  }

  removeCard () { // Удаление карточки
    this._element.remove();
    this._element = null;
  }
}