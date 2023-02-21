/* eslint-disable*/
import { axios } from 'axios';
import { showAlert } from "./alerts";
// const showAlert = require('./alerts');

export const login = async (email, password) => {
    try {
        console.log('hi');
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email,
                password
            }
        });
        console.log(email, password);
        
        if (res.data.status === 'success') {
            showAlert('success','Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        // showAlert('error',err.response.data.message);
        alert('error')
    }
};

// export const logout = async () => {
//     try {
//         const res = await axios({
//             method: 'GET',
//             url: 'http://127.0.0.1:3000/api/v1/users/logout',
//         });
//         if (res.data.status = 'success') location.reload(true);
//     } catch(err) {
//         showAlert('error', 'Error Logging out! Try again later');
//     }
// }

export const signup = async (name, email, password) => {
    try {
        // console.log('hi');
        const res = await axios({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/signup',
            data: {
                name,
                email,
                password
            }
        });
        // console.log(email, password);
        if (res.data.status === 'success') {
            showAlert('success','Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        // showAlert('error',err.response.data.message);
        alert('error')
    }
};