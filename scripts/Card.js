// * Объявляем класс

class Card {
  constructor (data, template) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._author = data.author;
    this._template = template;
  }

  _getTemplate () {
    const cardElement = document
    .querySelector(this._template)
    .content
    .cloneNode(true);

    return cardElement;
  }

  _removeCard (button) {
    const card = button.closest('.card');
    card.remove();
  }

  _setLike (card) {
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
  }

  generateCard () {
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

// * Экспортируем модуль

export { Card };