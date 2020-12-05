import { openFullPic } from './script.js';

class Card {
  constructor (data, template) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._author = data.author;
    this._template = template;
  }

  _getTemplate () { // Получение элемента карточки из шаблона
    const cardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true);

    return cardElement;
  }

  _removeCard (button) { // Удаление карточки
    const card = button.closest('.card');
    card.remove();
  }

  _setLike (card) { // Установка и снятие лайка
    card.classList.toggle('card__like_active');
  }

  _setEventListeners () {
    const cardObject = this;

    const removeCardButton = cardObject._element.querySelector('.card__delete');
    removeCardButton.addEventListener('click', function () {
      cardObject._removeCard(removeCardButton);
    });

    const likeButton = cardObject._element.querySelector('.card__like');
    likeButton.addEventListener('click', function () {
      cardObject._setLike(likeButton);
    });

    const openFullPicButton = cardObject._element.querySelector('.card__open-fullpic');
    openFullPicButton.addEventListener('mousedown', openFullPic);
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

export { Card };