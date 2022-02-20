export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _setPromiseStatus = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка-rere: ${res.status}`);
  };

  getDefaultData() {
    return Promise.all([this.getInfo(), this.getCards()]);
  }

  getInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers,
    }).then(this._setPromiseStatus);
  }

  editInfo({ name, about }) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._setPromiseStatus);
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._setPromiseStatus);
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers,
    }).then(this._setPromiseStatus);
  }

  addCard({ place, link }) {
    return fetch(`${this._url}cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: place,
        link: link,
      }),
    }).then(this._setPromiseStatus);
  }

  deleteCard(_id) {
    return fetch(`${this._url}cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._setPromiseStatus);
  }

  _addLike(_id) {
    return fetch(`${this._url}cards/${_id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._setPromiseStatus);
  }

  _removeLike(_id) {
    return fetch(`${this._url}cards/${_id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._setPromiseStatus);
  }

  checkDateLike({ _isLiked, _id }) {
    return _isLiked ? this._removeLike(_id) : this._addLike(_id);
  }
}
