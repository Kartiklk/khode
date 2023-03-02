import axios from "axios";
import { showAlert } from './alerts';

export const cart = async (item, user) => {
    try {
        console.log(item, user);
        const res = await axios({
            method: 'POST',
            url: '/api/v1/cart',
            data: {
                item,
                user
            }
        });
        
        if (res.data.status === 'success') {
            showAlert('success','Added To Cart');
            window.setTimeout(() => {
                location.assign('/itemslist');
            }, 1000);
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};