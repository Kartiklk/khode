import axios from "axios";
import { showAlert } from './alerts';

export const noworder = async (carts, user, address, payment) => {
    // console.log(carts[0], user, address, payment);
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
                location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};
