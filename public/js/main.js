
// addtocart.onclick = () => {
//     var temp = document.getElementsByClassName("addtocart");
//     console.log('clicked');
// }
// var cart = document.querySelector('card');

const { contentSecurityPolicy } = require("helmet");

// function addtocart(){
//    addEventListener('click', console.log('clicked') ) 
// }

//     var temp = document.getElementById("addtocart").onclick = function(){
//         console.log('first');
//         // for(var i=0 ; i < temp.length; i++){
//         //     var title = temp.document.getElementById("title")[0].innerHTML;
//         //     console.log(title);
//         // }
//         // tocart(temp);


//     }
// var cart = document.querySelector("#itemprice");
// var product = cart.parentElement;
// console.log(product);


// if(document.readyState=="loading"){
//     document.addEventListener("DOMContentLoaded", ready);
// }else{
//     ready();
// }
// // var i=0;
//     function ready() {

//         // console.log(cart);
//         // var car = cart.push(...categories(card));
//         // console.log(car);
//         // cart.forEach(card => {
//             // console.log(card.innerText);
//         // });

//         var toadd = document.getElementsByClassName("added");
//         // console.log(toadd);
//         for(var i=0 ; i < toadd.length; i++){
//             var button = toadd[i];
//             // console.log(button)
//         // var title = document.getElementsByClassName("title")[i].innerText;
//         // console.log(title);
//         button.addEventListener("click", clicked)
//         // i++;
//         }
//     }

//     function clicked(event){
        
//         var button = event.target;
//         // console.log(button);
//         var cartProducts = button.parentElement;
//         // console.log(cartProducts);
//         var price = product.querySelector(".itemprice")[0].textContent;
//         console.log(price);
//         // var title = product.getElementsByClassName("title")[0].textContent;
//         // console.log(title);
//     }
// function tocart(temp){
    // var button = event.target;
//     var cartProducts = button.parentElement;

    // var title = temp.document.getElementById("title")[0].innnerHTML;
//     console.log('title');
// }


// var cart= [];

// function addtocart(a){
//     cart.push({...categories[a]});
//     displaycart();
// }
// function delElement(a){
//     cart.splice(a, 1);
//     displaycart();
// }

// function displaycart() {
//     j=0; total=0;
//     if(cart.length==0){
//         document.getElementById('empty').innerHTML="Cart is Empty";
//         document.getElementById('price').innerHTML="Rs."+0+".00";
//     }
//     else{
//         document.getElementById("empty").innerHTML = cart.map((items)=>
//         {
//             var {image, title, price} = items;
//             total=total+price;
//             document.getElementById("total").innerHTML = "$ "+total+".00";
//             return(
//                 `<div class='cart-item'>
//                 <div class='row-img'>
//                     <img class='rowimg' src=${image}>
//                 </div>
//                 <p style='font-size:12px;'>${title}</p>
//                 <h2 style='font-size: 15px;'>$ ${price}.00</h2>`+
//                 "<i class='fa-solid fa-trash' onclick='delElement("+ (j++) +")'></i></div>"
//             );
//         }).join('');
//     }
// }

// var additemid = 0;
//     function addtocart(item) {
//       additemid += 1;
//       var selecteditem = document.createElement('div');
//       selecteditem.classList.add('cartimg');
//       selecteditem.setAttribute('id', additemid);
//       var img = document.createElement('img');
//       img.setAttribute('src', item.children[0].currentSrc);
//       var name = document.createElement('div');
//       name.innerText = item.children[1].innerText;
//       var label = document.createElement('div');
//       label.innerText = item.children[2].children[0].innerText;
//       var select = document.createElement('span');
//       select.innerText = item.children[2].children[1].value;
//       label.append(select);
//       var delbtn = document.createElement('button');
//       delbtn.innerText = 'Clear';
//       delbtn.onclick = function(){
//         selecteditem.remove();
//       }
//       var cartitems = document.getElementById('name');
//       selecteditem.append(img);
//       selecteditem.append(title);
//       selecteditem.append(label);
//       selecteditem.append(delbtn);
//       cartitems.append(selecteditem);

//     }

Content-Security-Policy: script-src-attr 'none'
 
function popUp() {
    INLI
    window.location.href="/login";
}
function tosignup() {
    document.querySelector('#loginform').style.display="none"
    document.querySelector('#signupfrom').style.display="block"
}
function tologin() {
    document.querySelector('#loginform').style.display="block"
    document.querySelector('#signupfrom').style.display="none"
}

function close1() {
    window.location.href="/";
}
function close2() {
    window.location.href="/";
}

function order() {
    window.location.href="/orderdetail"
}
function toorder() {
    window.location.href="orderdetails.html"
}
function back() {
    window.location.href="/cart"
}
function tback() {
    window.location.href="/cart"
}
function next() {
    window.location.href="/captcha";
}
function refresh() {
    window.top.location.reload(true);
}
 
// captcha
let val = document.getElementById('val');
let num = document.getElementById('num');
const check = document.getElementById('check');

//returning numbers
let result = ' ';
const all = '!@#$%&*()^?/\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';  
    const charactersLength = all.length;
    for ( let i = 0; i < 5; i++ ) {
        result += all.charAt(Math.floor(Math.random() * charactersLength));
    
        // return result;
    }
    console.log(result);
num.innerText = result;

let number = num.innerText;

check.addEventListener("click", ()=>{
// let no = parseInt(number);
let res = val.value;

    if(number == res){
        alert("success");
        val.value = "";
        window.location.href="overview.html";

    }
    else{
        alert("Incorrect");
        window.top.location.reload(true);
    }
})