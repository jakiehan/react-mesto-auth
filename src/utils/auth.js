const BASE_URL = 'https://auth.nomoreparties.co';

  const checkResponse = (promise) => {
    return promise.then(res => {
      if (res.ok) {
        return res.json();
      }
      throw res.status;
    }).then(obj => {
      return obj;
    })
  }

  export const register = (password, email) => {
    const promise = fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    return checkResponse(promise)
  }

export const login = (password, email) => {
  const promise = fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  return checkResponse(promise)
}

export const checkJwt = (jwt) => {
  const promise = fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    },
  })
  return checkResponse(promise)
}