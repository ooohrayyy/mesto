import { root } from './constants.js';

export default class UserInfo {
  constructor ({ userNameSelector, userDescriptionSelector }) {
    this._userNameSelector = userNameSelector;
    this._userDescriptionSelector = userDescriptionSelector;

    this._userNameElement = root.querySelector(userNameSelector);
    this._userDescriptionElement = root.querySelector(userDescriptionSelector);
  }

  getUserInfo () {
    const userInfo = {};

    this._userName = this._userNameElement.textContent;
    this._userDescription = this._userDescriptionElement.textContent;

    userInfo.name = this._userName;
    userInfo.description = this._userDescription;

    return userInfo;
  }

  setUserInfo (data) {
    this._userNameElement.textContent = data.name;
    this._userDescriptionElement.textContent = data.description;
  }
}