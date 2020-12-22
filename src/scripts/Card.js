import { root } from './constants.js';

export default class Card {
  constructor (data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._author = data.author;
    this._template = template;
    this._handleCardClick = handleCardClick;

    this._removeCard = this._removeCard.bind(this);
    this._setLike = this._setLike.bind(this);
  }

  _getTemplate () { // Получение элемента карточки из шаблона
    const cardElement = root
    .querySelector(this._template)
    .content
    .querySelector('.card')
    .cloneNode(true);

    return cardElement;
  }

  _removeCard () { // Удаление карточки
    this._element.remove();
    this._element = null;
  }

  _setLike () { // Установка и снятие лайка
    const like = this._element.querySelector('.card__like');
    like.classList.toggle('card__like_active');
  }

  _setEventListeners () {
    const removeCardButton = this._element.querySelector('.card__delete');
    removeCardButton.addEventListener('click', this._removeCard);

    const likeButton = this._element.querySelector('.card__like');
    likeButton.addEventListener('click', this._setLike);

    const openFullPicButton = this._element.querySelector('.card__open-fullpic');
    openFullPicButton.addEventListener('mousedown', this._handleCardClick);
  }

  generateCard () { // Создание новой карточки
    this._element = this._getTemplate();

    const cardElementImage = this._element.querySelector('.card__image');

    this._element.querySelector('.card__name').textContent = this._name;
    cardElementImage.setAttribute('src', this._link);

    if (this._alt) {
      cardElementImage.setAttribute('alt', this._alt);
    } else {
      cardElementImage.setAttribute('alt', this._name);
    }

    if (this._author) {
      cardElementImage.setAttribute('data-author', this._author);
    }

    this._setEventListeners();

    return this._element;
  }
}