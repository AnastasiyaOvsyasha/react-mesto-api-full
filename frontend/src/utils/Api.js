/* eslint-disable prefer-promise-reject-errors */
class Api {
  constructor (options) {
    this._baseUrl = options.baseUrl
    this._token = options.headers.authorization
  }

  _checkAnswer (res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status}`)
  }

  getDataUser () {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(this._checkAnswer)
  }

  getInitialCardsData () {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: {
        authorization: this._token
      }
    }).then(this._checkAnswer)
  }

  setDataUser (name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkAnswer)
  }

  addCard (card) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    }).then(this._checkAnswer)
  }

  updateUserAvatar (avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkAnswer)
  }

  deleteCard (_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._checkAnswer)
  }

  changeLikeCardStatus (_id, like) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      headers: {
        authorization: this._token
      }
    }).then(this._checkAnswer)
  }
}

const api = new Api({
  baseUrl: 'https://crazywomen.nomoredomains.sbs',
  headers: {
    authorization: '4a54ce76-e7c6-4200-bbf8-f4a56f498098', // вставить токен
    'Content-Type': 'application/json'
  }
})

export default api
