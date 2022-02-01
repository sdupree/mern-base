import { getToken } from './users-service';

// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';

export function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

////////////////////// Helper functions //////////////////////

async function sendRequest(url, method = 'GET', payload=null) {
  const options = { method };
  if(payload) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(payload);
  }

  const token = getToken();
  if(token) {
    options.headers = options.headers || {};  // Ensure object exists.
    options.headers.Authorization = `Bearer ${token}`;  // Follow HTTP recs.
  }

  const res = await fetch(url, options);
  if(res.ok) return res.json();
  throw new Error('Bad Request');
}