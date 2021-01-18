export default class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._token = options.authorization;

    this.deleteCard = this.deleteCard.bind(this);
    this.toggleLike = this.toggleLike.bind(this);
  }

  fetchUserInfo () {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json());
  }

  fetchInitialCards () {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    })
      .then(res => res.json());
  }

  patchUserInfo (values) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: values.name,
        about: values.description
      })
    });
  }

  postCard (data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
  }

  deleteCard (cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    })
  }

  toggleLike (card) {
    if (card.isLiked) {
      return fetch(`${this._baseUrl}/cards/likes/${card.id}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token
        }
      })
      .then(res => res.json())
      .then(res => {
        card.isLiked = false;
        card.likes = res.likes.length;
        card.cardLikesCounter.textContent = card.likes;
      });
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${card.id}`, {
        method: 'PUT',
        headers: {
          authorization: this._token
        }
      })
      .then(res => res.json())
      .then(res => {
        card.isLiked = true;
        card.likes = res.likes.length;
        card.cardLikesCounter.textContent = card.likes;
      });
    }
  }
}