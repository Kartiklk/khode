/* eslint-disable*/
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data:{
                email,
                password
            }
        });
        if (res.data.status = 'success') {
            showAlert('success','Logged in successfully!');
            window.setTimeout(() => {
                location.assign('/');
            }, 1000);
        }
    } catch (err) {
        if(err.response.status === 400){
            showAlert('error', 'Please Provide email and password!');
        }
        else if(err.response.status === 401){
            showAlert('error', 'Incorrect email or password');
        }
        else{
            showAlert('error', 'Something went wrong!, please try later');
        }
        // showAlert('error', 'Please Provide email and password!');
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });
        if (res.data.status = 'success') location.reload(true);
    } catch(err) {
        showAlert('error', 'Error Logging out! Try again later');
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