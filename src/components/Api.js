export default class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl;
    this._token = options.authorization;
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
}