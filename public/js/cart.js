import axios from "axios";
import { showAlert } from './alerts';

export const addcart = async (title, price) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                title,
                price
            }
        });
        
        // if (res.data.status === 'success') {
        //     showAlert('success','Logged in successfully!');
        //     window.setTimeout(() => {
        //         location.assign('/');
        //     }, 1000);
        // }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};