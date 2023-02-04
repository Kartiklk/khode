document.getElementById('tosignup').addEventListener('click', ()=>{
    // console.log('click');
    document.querySelector('#loginform').style.display="none"
    document.querySelector('#signupfrom').style.display="block"
})
document.getElementById('tologin').addEventListener('click', ()=>{
    // console.log('click');
    document.querySelector('#loginform').style.display="block"
    document.querySelector('#signupfrom').style.display="none"
})

 const cart = document.querySelector('.cart-content');

 document.getElementsByClassName('tocart').addEventListener('click', ()=>{
  console.log('click');
 })
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
        console.log(toadd);
        for(var i=0 ; i < toadd.length; i++){
            var button = toadd[i];
            console.log(button)
        // var title = document.getElementsByClassName("title")[i].innerText;
        // console.log(title);
        button.addEventListener("click", clicked)
        // i++;
        }