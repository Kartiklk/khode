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
        if(err.response.status === 401){
            showAlert('error', 'User Address Already Exist!');
        }
        else{
            showAlert('error', 'Something Went Worng!');
        }
        // showAlert('error',err.response.data.message);
    }
};

export const dele = async (id) => {
    try {
        console.log(id);
        const res = await axios({
            method: 'DELETE',
            url: `/api/v1/address/${id}`,
            data: {
            }
        });
        
        if (res.data.status === 'success') {
            showAlert('success','Address is Removed');
            window.setTimeout(() => {
                location.reload();
            }, 1000);
        }
    } catch (err) {
        console.log(err)
        showAlert('error',err.response.data.message);
    }
};
