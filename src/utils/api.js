class Api {
  constructor() {
    this._url = 'https://nomoreparties.co/v1/cohort-38/';
    this._token = '65c30779-9ea9-44cb-b8d2-edc42f5a7e98';
  }

  _makeRequest(promise) {
    return promise.then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.status;
    }).then(obj => {
      return obj;
    })
  }

  getUserInfo() {
    const promise = fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  getCards() {
    const promise = fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  setUserInfo({ name, about }) {
    const promise = fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    return this._makeRequest(promise)
  }

  uploadCard({ name, link }) {
    const promise = fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    return this._makeRequest(promise)
  }

  deleteCard(id) {
    const promise = fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    return this._makeRequest(promise)
  }

  changeLikeCardStatus(id, status) {
    const method = (status ? 'PUT' : 'DELETE')
    const promise = fetch(`${this._url}/cards/${id}/likes`, {
      method: method,
      headers: {
        authorization: this._token
      }
    })
    return this._makeRequest(promise)
  }

  setUserAvatar({ avatar }) {
    const promise = fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    return this._makeRequest(promise)
  }
}

const api = new Api();

export default api;