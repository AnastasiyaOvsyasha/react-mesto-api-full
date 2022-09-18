const baseUrl = "http://localhost:4000";
const headers = { "Content-Type": "application/json" };

function checkAnswer(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function register (email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkAnswer(res));
};

export function authorize (email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then((res) => checkAnswer(res));
};

export function getContent (token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkAnswer(res));
};
