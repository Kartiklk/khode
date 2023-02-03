// document.addEventListener('DOMContentLoaded', ()=>{
//     addcart.addEventListener('click', cart);
//     function cart(){
//         console.log('click')
//     }
    
// })
document.addEventListener('DOMContentLoaded', ()=>{
    popUp.addEventListener('click', log);
    function log(){
        console.log('click');
        window.location.href="/login";
    }
})
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
document.getElementById('close1').addEventListener('click', ()=>{
    // console.log('click');
    window.location.href="/";
})
document.getElementById('close2').addEventListener('click', ()=>{
    // console.log('click');
    window.location.href="/";
});
document.getElementsByName('cart').addEventListener('click', ()=>{
    console.log('click');
    // window.location.href="/";
})
  