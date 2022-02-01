import * as usersAPI from './users-api';

export async function signUp(userData) {
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token', token);
  return getUser();
}

export async function login(credentials) {
  const token = await usersAPI.login(credentials);
  localStorage.setItem('token', token);
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
  const token = localStorage.getItem('token');  // getItem returns null if not found.
  if(!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));

  if(payload.exp < Date.now() / 1000) {  // payload.exp is in seconds.
    localStorage.removeItem('token');  // Delete expired token.
    return null;
  }

  // Dunno why we throw away 'payload' and return 'token' just to decode 'token' back to 'payload' again in 'getUser()'. But eh, I didn't write this.
  return token;
}

export function getUser() {
  const token = getToken();

  // Return 'user' object if token.
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export async function checkToken() {
  return new Date(await usersAPI.checkToken());
  // return usersAPI.checkToken().then(dateStr => new Date(dateStr));  // Non-async-await way.
}