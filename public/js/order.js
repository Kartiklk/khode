import axios from "axios";
import { showAlert } from './alerts';

export const noworder = async (carts, user, address, payment) => {
    // console.log(carts[0], user, address, payment);
    // for(var i=0; i<carts.length; i++){
    //     var carts = carts[i].innerText;
    //     return carts;
    // }
    // const temp = carts.map(function(element){
    //   for(var i=0; i<carts.length; i++){
    //     var tp = element[i];
    //     console.log(tp);
    //   }
    // })
    // console.log(carts);
    // console.log(carts);
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/order',
            data: {
                carts,
                user, 
                address,
                payment
            }
        });
        
        if (res.data.status === 'success') {
            showAlert('success','Ordered Successfully');
            window.setTimeout(() => {
                location.window('/myorders');
            }, 1000);
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};
