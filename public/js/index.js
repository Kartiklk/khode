/* eslint-disable*/
import '@babel/polyfill'
import { login, logout, signup } from "./login";
import { cart, removeId } from "./cart";
import { added } from "./address";
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
const ti = document.querySelector('#tp');
const address = document.querySelector('.address');
const add = document.querySelector('#Addaddress');
// console.log(add);


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
    document.getElementById('total').innerText= tprice;
    // order(tprice);
  }

if(address)
  add.addEventListener('click', e=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const addre = document.getElementById('addre').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const pincode = document.getElementById('pincode').value;
    const user = document.getElementById('user').innerText;
    // var value = state.value;
    // var text = state.options[state.selectedIndex].text;
    added(name, phone, addre, city, state, pincode, user);
  })
  

// if(ti)
  // console.log(ti.innerText=`${tprice}`)
// const ti = document.querySelector('#tp');

  // for(var)
  // remove.addEventListener('click', e=> {
  //   console.log(total.innerText)
  // })
// if(ti)
//   console.log(ti);