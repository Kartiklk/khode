/* eslint-disable*/
import '@babel/polyfill'
import { login, logout, signup } from "./login";
import { cart, removeId } from "./cart";
import { added } from "./address";
import { noworder } from "./order";
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
const address = document.querySelector('.address');
const add = document.querySelector('#Addaddress');
const order = document.querySelector('.payment');
const ordernow = document.querySelector('#order');
// console.log(ordernow);


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
    added(name, phone, addre, city, state, pincode, user);
  })
  
if(order)
  ordernow.addEventListener('click', e=>{
    e.preventDefault();
    const user = document.getElementById('user').innerText;
    const address = document.getElementById('addr').innerText;
    var pay = document.getElementsByName('pay');
    for(var i=0; i<pay.length; i++){
      if(pay[i].checked){
        if(pay[i].value === 'SBI Card'){
          console.log('sbi card');
        }
        else{
          var payment = pay[i].value
          const cart = document.querySelectorAll('#cart');
          var carts = new Array();
          for(var j=0; j<cart.length; j++){
            carts[j]=cart[j];
            // console.log(cart[j].innerText, user, address, pay[i].value);
            // console.log(carts[0]);
          }
          // return carts;
          // console.log(carts);
          noworder(carts, user, address, payment);
        }
      }
    }
    // console.log(carts[0]);
  })

  // function temp(carts){
  //   for(var j=0; j<carts.length; j++){
  //     console.log(carts[j]);
  //   }
  // }