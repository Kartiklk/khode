/* eslint-disable*/
import '@babel/polyfill';
import { login, logout } from "./login";

//dom elements
const loginForm = document.querySelector('.loginform');
// const logOutBtn = document.querySelector('.nav__el--logout')

if (loginForm) 
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});

// if (logOutBtn)
//   logOutBtn.addEventListener('click', logout);
    