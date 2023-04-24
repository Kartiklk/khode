/* eslint-disable*/
import '@babel/polyfill'
import { login, logout, signup } from "./login";
import { cart, removeId } from "./cart";
import { added, dele } from "./address";
import { noworder, cancelorder } from "./order";
import { card } from "./stripe";
import { contentSecurityPolicy } from 'helmet';
import { showAlert } from "./alerts";
// import { remove } from "./main";

//dom elements
const loginForm = document.querySelector('.loginform');
const SignupForm = document.querySelector('.signupfrom');
const log = document.querySelector('#loginnow');
const sign = document.querySelector('#signup');
const logOutBtn = document.querySelector('#logout');
const logOut = document.querySelector('#logOut');
const Item = document.querySelector('#d2');
const Addcart = document.querySelector('#tocart');
const total = document.querySelectorAll('.price')
const remove = document.querySelectorAll('.remove')
const address = document.querySelector('.address');
const add = document.querySelector('#Addaddress');
const order = document.querySelector('.payment');
const ordernow = document.querySelector('#order');
const no = document.querySelector('#empty');
const next = document.querySelector('#next');
const cancel = document.querySelector('#cancel');
const back = document.querySelector('#backback');
const bk = document.querySelector('#backbk');
const ct = document.querySelector('#signnow');
const my = document.querySelector('#lognow');
const CT = document.querySelector('#signNow');
const MY = document.querySelector('#logNow');
const menu = document.querySelector('#menu');
const reset = document.querySelector('#reset');
const del = document.querySelector('#deladd');


if (loginForm) 
  log.addEventListener('click', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    document.getElementById('email').value="";
    document.getElementById('password').value="";

    login(email, password);
});

if (SignupForm) 
  sign.addEventListener('click', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('signupemail').value;
    const password = document.getElementById('signuppassword').value;
    document.getElementById('name').value ="";
    document.getElementById('signupemail').value="";
    document.getElementById('signuppassword').value="";

    signup(name, email, password);
});

if (logOutBtn)
  logOutBtn.addEventListener('click', logout);

if (logOut)
  logOut.addEventListener('click', logout);

  if(Item)
    Addcart.addEventListener('click', e=>{
      e.preventDefault();
      const userId = document.getElementById('us');
      if(userId === null){
        showAlert('error', 'Your not logged in!, Please login now')
      }
      else{
        var user = userId.innerText
        const item = document.getElementById('it').innerText;
        Addcart.disabled = true;
        cart(item, user)
      }
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
    if(name===""||phone===""||addre===""||city===""||state===""||pincode===""){
      showAlert('error', 'Please fill the address form correctly!')
    }else{
      added(name, phone, addre, city, state, pincode, user);
    }
  })

if(del){
  del.addEventListener('click', e=>{
    const id = document.getElementById('delete').innerText;
    dele(id);
  })
}
  
if(order)
  ordernow.addEventListener('click', e=>{
    e.preventDefault();
    const user = document.getElementById('user').innerText;
    const address = document.getElementById('addr').innerText;
    var pay = document.getElementsByName('pay');
    console.log(pay);
    for(var i=0; i<pay.length; i++){
      console.log(pay[i].checked, i);
        if(pay[i].checked){
          ordernow.disabled = true;
          if(pay[i].value === 'Card'){
            var payment = pay[i].value
            const cart = document.querySelectorAll('#cart');
            var carts = new Array();
            for(var j=0; j<cart.length; j++){
              carts[j]=cart[j].innerText;
            }
            card(carts, user, address, payment);
            break;
          }
          else{
            var payment = pay[i].value
            const cart = document.querySelectorAll('#cart');
            var carts = new Array();
            for(var j=0; j<cart.length; j++){
              carts[j]=cart[j].innerText;
            }
            noworder(carts, user, address, payment);
            break;
          }
        }
        else if(i+1>=pay.length){
          showAlert('error', 'Please select payment method')
        }
      }
    })

  if(next){
    next.addEventListener('click', e=>{
      if(!no){
        e.preventDefault();
        window.location.assign('/orderdetails')
      }
      else{
        showAlert('error', 'Please Add Items to Cart for Order')
      }
    })
  }

if(cancel){
  cancel.addEventListener('click', e=>{
    const id = document.getElementById('orderid').innerText;
    cancel.disabled = true;
    cancelorder(id);
  })
}

if(back){
  back.addEventListener('click', e=>{
    e.preventDefault();
    window.location.assign('/myorders')
  })
}
if(bk){
  bk.addEventListener('click', e=>{
    e.preventDefault();
    window.location.assign('/cart')
  })
}

if(ct){
  ct.addEventListener('click', e=>{
    e.preventDefault();
    showAlert('error', 'Please Login to See Cart')
  })
}
if(my){
  my.addEventListener('click', e=>{
    e.preventDefault();
    showAlert('error', 'Please Login to See Your Orders')
  })
}
if(CT){
  CT.addEventListener('click', e=>{
    e.preventDefault();
    showAlert('error', 'Please Login to See Cart')
  })
}
if(MY){
  MY.addEventListener('click', e=>{
    e.preventDefault();
    showAlert('error', 'Please Login to See Your Orders')
  })
}

if(menu){
  var list = document.getElementById('list').style.display = 'none';
  menu.addEventListener('click', e=>{
    if(list == 'none'){
      list = document.getElementById('list').style.display = 'block';
    }
    else{
      list = document.getElementById('list').style.display = 'none';
    }
  })
}

if(reset){
  reset.addEventListener('click', e=>{
    e.preventDefault();
    document.getElementById('name').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('addre').value = "";
    document.getElementById('city').value = "";
    document.getElementById('state').value = "";
    document.getElementById('pincode').value = "";
  })
}