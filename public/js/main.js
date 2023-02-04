document.getElementById('tosignup').addEventListener('click', ()=>{
    console.log('click');
    document.querySelector('#loginform').style.display="none"
    document.querySelector('#signupfrom').style.display="block"
})
document.getElementById('tologin').addEventListener('click', ()=>{
    // console.log('click');
    document.querySelector('#loginform').style.display="block"
    document.querySelector('#signupfrom').style.display="none"
})

 const cart = document.querySelector('.cart-content');

//   var a = document.getElementById('tocart(id)');
//   a.addEventListener('click', () => {
//     console.log('clicked');
//   })
console.log(a);
 if (cart) 
 cart.addEventListener('submit', e => {
   e.preventDefault();
   console.log('click')
//    const email = document.getElementById('email').value;
//    const password = document.getElementById('password').value;
//    login(email, password);
});
