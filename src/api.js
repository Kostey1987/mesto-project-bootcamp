const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-13",
  headers: {
    authorization: "134a69fe-36da-4a83-9e66-486fbf5e8446",
    "Content-Type": "application/json",
  },
};
console.log(`${config.baseUrl}/cards`);
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    err.status = res.status;
    Promise.reject(err);
  });
}

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(checkResponse);
};

export function saveCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then(checkResponse);
}

export function deleteCard(id) {
  return fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}

export const getInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(checkResponse);
};

export function saveInfo(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then(checkResponse);
}

export const getAvatar = () => {
  return fetch(`${config.baseUrl}/users/me/`, {
    headers: config.headers,
  }).then(checkResponse);
};

export function changeAvatar(avatarPath) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarPath,
    }),
  }).then(checkResponse);
}

export function setLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then(checkResponse);
}

export function unsetLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then(checkResponse);
}
