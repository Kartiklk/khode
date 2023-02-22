/* eslint-disable*/
import '@babel/polyfill'
import { login, logout, signup } from "./login";

// require('@babel/polyfill');
// const { login, logout } = require('./login')


//dom elements
const loginForm = document.querySelector('.loginform');
const SignupForm = document.querySelector('.signupfrom');
const log = document.querySelector('#loginnow');
const sign = document.querySelector('#signup');
const logOutBtn = document.querySelector('#logout');
const Item = document.querySelector('.card');
const tocart = document.querySelector('.tocart');
// console.log(Item);



if (loginForm) 
  log.addEventListener('click', e => {
    // console.log(loginForm);
    // window.location.href='/'
    e.preventDefault();
    const email = document.getElementById('email').value;
    // console.log(email);
    const password = document.getElementById('password').value;
    // console.log(password);
    login(email, password);
});

if (SignupForm) 
  sign.addEventListener('click', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    // console.log(name);
    const email = document.getElementById('signupemail').value;
    // console.log(email);
    const password = document.getElementById('signuppassword').value;
    // console.log(password);
    signup(name, email, password);
});

if (logOutBtn)
  logOutBtn.addEventListener('click', logout);

// if (Item)
//   tocart.addEventListener('click', e => {
//     e.preventDefault();
//     const title = document.getElementById('title').innerText;
//     console.log(title);
//     const price = document.getElementById('itemprice').innerText;
//     console.log(price);
//   })

// var toadd = document.getElementsByClassName("tocart");
if (Item)
  for(var i=0 ; i < tocart.length; i++){
      var button = tocart[i];
      console.log(tocart)
      button.addEventListener('click', ()=>{
        console.log('clicked')
      });
      //     var button = event.target;
      //     var cartProducts = button.parentElement;
      //     console.log('clicked');
      //     var title = cartProducts.getElementsByClassName("title").innerText;
      //     var price = cartProducts.getElementById("itemprice").innerText;
      //     console.log(title);
      //     console.log(price);
      // })

}

// function clicked(event){
//   console.log('clicked')
//   var button = event.target;
//   var cartProducts = button.parentElement;
//   // var check = cartProducts.innerText;
//   var title = cartProducts.getElementById('title').innerText;
//   var price = cartProducts.getElementById('itemprice').innerText;
//   console.log(title);
//   console.log(price);
//   // displaycart(title, price);
// }