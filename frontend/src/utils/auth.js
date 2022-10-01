/* eslint-disable prefer-promise-reject-errors */
const baseUrl = 'http://localhost:3001'
const headers = { 'Content-Type': 'application/json' }

function checkAnswer (res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export function register ({ email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  }).then((res) => checkAnswer(res))
};

export function authorize ({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify({ email, password })
  }).then((res) => checkAnswer(res))
};

export function checkToken () {
  return fetch(`${baseUrl}/checktoken`, {
    method: 'GET',
    headers,
    credentials: 'include'
  })
    .then((res) => checkAnswer(res))
}

export function logout () {
  return fetch(`${baseUrl}/logout`, {
    method: 'GET',
    headers,
    credentials: 'include'
  })
    .then((res) => checkAnswer(res))
};
