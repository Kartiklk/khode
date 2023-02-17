/* eslint-disable*/
import '@babel/polyfill';
import {login, logout} from "./login";
// const {login, logot} = require('./login');

//dom elements
const loginForm = document.querySelector('.loginform');
// const logOutBtn = document.querySelector('.nav__el--logout')
console.log(loginForm);

if (loginForm) 
  loginForm.addEventListener('submit', e => {
    // window.location.href='/'
    e.preventDefault();
    const email = document.getElementById('email').value;
    console.log(email);
    const password = document.getElementById('password').value;
    console.log(password);
    login(email, password);
});

// if (logOutBtn)
//   logOutBtn.addEventListener('click', logout);
    