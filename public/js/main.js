// import axios from "axios"

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

//  const cart = document.querySelector('.cart-content');
//  const card = document.querySelector('.card');

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


// var toadd = document.getElementsByClassName("tocart");

//         for(var i=0 ; i < toadd.length; i++){
//             var button = toadd[i];
//             console.log(button)
//             button.addEventListener('click', clicked);
//             //     var button = event.target;
//             //     var cartProducts = button.parentElement;
//             //     console.log('clicked');
//             //     var title = cartProducts.getElementsByClassName("title").innerText;
//             //     var price = cartProducts.getElementById("itemprice").innerText;
//             //     console.log(title);
//             //     console.log(price);
//             // })

//     }
//     // console.log(toadd);
//     function clicked(event){
//             var button = event.target;
//             var cartProducts = button.parentElement;
//             var check = cartProducts.innerText;
//             var title = check.split("\n")[0];
//             var price = check.split("\n")[1];
//             console.log(title);
//             console.log(price);
//             displaycart(title, price);
//         }


//         function displaycart(title, price) {
            
//             return(
//                 `.cart-content
//                    h1.name=${title}
//                    h2.Price=${price}
//                    a(href='#') remove`
//             )
//         };

        // const id = document.getElementById('add');
        // console.log(id);
        // if(id){
        //     console.log('on');
        //     id.addEventListener('click', () =>{
        //         console.log('clicked');
        //     });
            
        // }



        // LOGIN PAGE

        // const loginForm = document.querySelector('.loginform');

        // if(loginForm){
        //     document.getElementById('loginnow').addEventListener('click',  e => {
        //         e.preventDefault();
        //         const email = document.getElementById('email').value;
        //         const password = document.getElementById('password').value;
        //         login(email, password);
        //     })
        // }

        // exports.login = async (email, password) => {
        //     // console.log(email);
        //     // console.log(password);
        //     try {
        //         const res = await axios ({
        //             method: 'POST',
        //             url: 'http://127.0.0.1:3000/api/v1/users/login',
        //             data: {
        //                 email,
        //                 password
        //             }
        //         });
        //         // console.log(url);
        //         console.log(email, password);
        //         // console.log(res.data.status);
        //         if (res.data.status === 'success') {
        //             console.log('success');
        //             // showAlert('Logged in successfully!');
        //             // window.setTimeout(() => {
        //             //     location.assign('/');
        //             // }, 1000);
        //         }
        //     } catch (err) {
        //         console.log('error');
        //         // showAlert(err.response.data.message);
        //     }
        // };