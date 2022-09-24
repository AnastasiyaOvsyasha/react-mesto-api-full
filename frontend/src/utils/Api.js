import config from '../config.json';

class Api {
 constructor(options) {
   this._baseUrl = options.baseUrl;
   this._token = options.headers.authorization;
 }

 _checkAnswer(res) {
   if (res.ok) {
     return res.json();
   }
   return Promise.reject(`Ошибка ${res.status}`);
 }

 getDataUser() {
   return fetch(`${this._baseUrl}/users/me`, {
     method: "GET",
     credentials: 'include',
     headers: {
       authorization: this._token,
     },
   }).then(this._checkAnswer);
 }

 getInitialCardsData() {
   return fetch(`${this._baseUrl}/cards`, {
     method: "GET",
     credentials: 'include',
     headers: {
       authorization: this._token,
     },
   }).then(this._checkAnswer);
 }

 setDataUser(name, about) {
   return fetch(`${this._baseUrl}/users/me`, {
     method: "PATCH",
     credentials: 'include',
     headers: {
       authorization: this._token,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name: name,
       about: about,
     }),
   }).then(this._checkAnswer);
 }

 addCard(card) {
   return fetch(`${this._baseUrl}/cards`, {
     method: "POST",
     credentials: 'include',
     headers: {
       authorization: this._token,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       name: card.name,
       link: card.link,
     }),
   }).then(this._checkAnswer);
 }

 updateUserAvatar(avatar) {
   return fetch(`${this._baseUrl}/users/me/avatar`, {
     method: "PATCH",
     credentials: 'include',
     headers: {
       authorization: this._token,
       "Content-Type": "application/json",
     },
     body: JSON.stringify({
       avatar: avatar,
     }),
   }).then(this._checkAnswer);
 }

 deleteCard(_id) {
   return fetch(`${this._baseUrl}/cards/${_id}`, {
     method: "DELETE",
     credentials: 'include',
     headers: {
       authorization: this._token,
     },
   }).then(this._checkAnswer);
 }

 changeLikeCardStatus(_id, like) {
   return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
     method: like ? "PUT" : "DELETE",
     credentials: 'include',
     headers: {
       authorization: this._token,
     },
   }).then(this._checkAnswer);
 }
}

const api = new Api({
  baseUrl: config.API_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
