import axios from "axios";
import { showAlert } from './alerts';

export const noworder = async (carts, user, address, payment) => {
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
                location.assign('/myorders');
            }, 1000);
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};
export const cancelorder = async (id) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/order/${id}`,
            data: {
            }
        });
        
        if (res.data.status === 'success') {
            showAlert('success','Ordered Canceled Successfully');
            window.setTimeout(() => {
                location.assign('/myorders');
            }, 1000);
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};
