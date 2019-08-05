

const { stringify } = JSON;

const API_URL = 'https://alcotinder.herokuapp.com';

const signInReq = async(login, password) => {
  const endpoint = '/signin';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'POST',
    body: stringify({
      login,
      password,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const body = await result.json();
  return body;
};

const signUpReq = async(email, login, password, confirmPassword) => {
  const endpoint = '/signup';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'POST',
    body: stringify({
      login,
      password,
      email,
      confirmPassword,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const body = await result.json();
  return body;
};

const addPhotoReq = async(formData, accessToken) => {
  const endpoint = '/users/avatars/upload';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'PUT',
    body: formData,
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const body = await result.json();
  return body;
};

const addInfoReq = async(userInfo, accessToken) => {
  const endpoint = '/users/bio';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'PUT',
    body: stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const body = await result.json();
  return body;
};

const getInfoReq = async login => {
  const endpoint = `/users/bio/${login}`;
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const body = await result.json();
  return body;
};

const refreshTokensReq = async refreshToken => {
  const endpoint = '/api/auth/refresh-token';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refreshToken}`,
    },
  });
  const body = await result.json();
  return body;
};

const getUserInfo = async accessToken => {
  const endpoint = '/users/bio';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const body = await result.json();
  return body;
};

const postMessage = async (accessToken, message) => {
  const endpoint = '/messages';
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'POST',
    body: stringify(message),
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const status = await result.status;
  if (status === 200) return true;
  return false;
};

const getMessages = async (accessToken, recipientLogin) => {
  const endpoint = `/messages/${recipientLogin}`;
  const url = `${API_URL}${endpoint}`;
  const result = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const body = await result.json();
  return body;
};

export {
  signInReq,
  signUpReq,
  refreshTokensReq,
  addInfoReq,
  addPhotoReq,
  getInfoReq,
  getUserInfo,
  postMessage,
  getMessages,
};
