/* eslint-disable*/
import '@babel/polyfill'
import { login, logout, signup } from "./login";
import { cart, removeId } from "./cart";
// import { remove } from "./main";

// require('@babel/polyfill');
// const { login, logout } = require('./login')


//dom elements
const loginForm = document.querySelector('.loginform');
const SignupForm = document.querySelector('.signupfrom');
const log = document.querySelector('#loginnow');
const sign = document.querySelector('#signup');
const logOutBtn = document.querySelector('#logout');
const Item = document.querySelector('#d2');
const Addcart = document.querySelector('#tocart');
const total = document.querySelectorAll('.price')
const remove = document.querySelectorAll('.remove')
// console.log(total);



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

  if(Item)
    Addcart.addEventListener('click', e=>{
      e.preventDefault();
      const item = document.getElementById('it').innerText;
      const userId = document.getElementById('us');
      console.log(item, userId);
      if(userId == null)
        alert('Please Login')
      else
        var user = userId.innerText
        // console.log(user);
        cart(item, user)
    })

// if(remove)
//   remove.addEventListener('click', e=>{
//     e.preventDefault();
//     console.log('click');
//   })

// const id = document.getElementById('myFunction(id)');
// console.log(id)

// var temp = function kartik(id){
//     // const id = document.getElementById('myFunction(id)');
//     console.log(id)
// }

// function myFunction(id) {
//   console.log('click')
// }

if(remove)
  for(var i=0; i<remove.length;i++){
  var button = remove[i];
  button.addEventListener('click', clicked);
  }
  
  function clicked(event){
    var button = event.target;
    var temp = button.parentElement;
    var id = temp.querySelector('#idof').innerText;
    removeId(id);
  }
  
if(total)
  var tprice=0;
  for(var i=0; i<total.length;i++){
    var price = total[i].innerText;
    tprice=parseInt(tprice)+parseInt(price);
  }
  console.log(tprice);
  document.getElementById('total').innerText= tprice;
  // for(var)
  // remove.addEventListener('click', e=> {
  //   console.log(total.innerText)
  // })