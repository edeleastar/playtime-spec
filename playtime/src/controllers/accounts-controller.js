import { userStore } from '../models/db.js';

export const index = (request, h) =>
  h.view('welcome-view', { title: 'Welcome' });

export const showSignup = (request, h) =>
  h.view('signup-view', { title: 'Sign up' });

export const showLogin = (request, h) =>
  h.view('login-view', { title: 'Log in' });

export const signup = async (request, h) => {
  const { firstName, lastName, email, password } = request.payload;
  await userStore.addUser({ firstName, lastName, email, password });
  return h.redirect('/');
};

export const login = async (request, h) => {
  const { email, password } = request.payload;
  const user = await userStore.getUserByEmail(email);
  if (!user || user.password !== password) {
    return h.redirect('/');
  }
  return h.redirect('/dashboard');
};

export const logout = (request, h) => h.redirect('/');
