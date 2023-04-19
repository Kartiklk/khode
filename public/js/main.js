
document.getElementById('tosignup').addEventListener('click', ()=>{
    document.querySelector('#loginform').style.display="none"
    document.querySelector('#signupfrom').style.display="block"
})
document.getElementById('tologin').addEventListener('click', ()=>{
    document.querySelector('#loginform').style.display="block"
    document.querySelector('#signupfrom').style.display="none"
})
