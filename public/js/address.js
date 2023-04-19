import axios from "axios";
import { showAlert } from './alerts';

export const added = async (name, phone, address, city, state, citycode, user) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/address',
            data: {
                name,
                phone,
                address,
                city,
                state,
                citycode,
                user
            }
        });
        
        if (res.data.status === 'success') {
            showAlert('success','Address added');
            window.setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
    }
};
