// document.getElementById('tosignup').addEventListener('click', ()=>{
//     // console.log('click');
//     document.querySelector('#loginform').style.display="none"
//     document.querySelector('#signupfrom').style.display="block"
// })
// document.getElementById('tologin').addEventListener('click', ()=>{
//     // console.log('click');
//     document.querySelector('#loginform').style.display="block"
//     document.querySelector('#signupfrom').style.display="none"
// })

 const cart = document.querySelector('.cart-content');
 const card = document.querySelector('.card');

//  document.getElementById('tocart(id)').addEventListener('click', ()=>{
//   console.log('click');
//  })
// console.log(a);
//  if (cart) 
//  cart.addEventListener('submit', e => {
//    e.preventDefault();
//    console.log('click')
// //    const email = document.getElementById('email').value;
// //    const password = document.getElementById('password').value;
// //    login(email, password);
// });


var toadd = document.getElementsByClassName("tocart");

        for(var i=0 ; i < toadd.length; i++){
            var button = toadd[i];
            console.log(button)
            button.addEventListener('click', clicked);
            //     var button = event.target;
            //     var cartProducts = button.parentElement;
            //     console.log('clicked');
            //     var title = cartProducts.getElementsByClassName("title").innerText;
            //     var price = cartProducts.getElementById("itemprice").innerText;
            //     console.log(title);
            //     console.log(price);
            // })
    }
    // console.log(toadd);
    function clicked(event){
            var button = event.target;
            var cartProducts = button.parentElement;
            console.log(cartProducts);
            var title = cartProducts.getElementsByClassName('title').innerText;
            console.log(title);
            var price = cartProducts.getElementsByClassName('itemprice').value;
            console.log(price);
        }