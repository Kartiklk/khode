/* eslint-disable*/
import { Axios } from 'axios';
import { showAlert } from "./alerts";
// const showAlert = require('./alerts');

export const login = async (email, password) => {
    try {
        // console.log(res);
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data:{
                email,
                password
            }
        });
        // console.log(email, password);
        if (res.data.status = 'success') {
            showAlert('success','Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
            // alert('success');
        }
    } catch (err) {
        showAlert('error',err.response.data.message);
        // alert('error');
        // console.log(err);
    }
};

export const logout = async () => {
    try {
        const res = await Axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });
        if (res.data.status = 'success') location.reload(true);
    } catch(err) {
        // showAlert('error', 'Error Logging out! Try again later');
        console.log(err);
    }
};

export const signup = async (name, email, password) => {
    try {
        // console.log('hi');
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signup',
            data: {
                name,
                email,
                password
            }
        });
        // console.log(email, password);
        if (res.data.status === 'success') {
            showAlert('success','Signup in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            // }, 1000);
        })
    } 
   }
      catch (err) {
        showAlert('error',err.response.data.message);
        // alert('error')
    }

};