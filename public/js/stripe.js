import axios from "axios";
import { showAlert } from './alerts';
import Stripe from 'stripe'
const stripe = Stripe('pk_test_51Mu9cFSCn4YtsyNNr0HxUOLQlSAC0K0LRXf3zGgdS66hGKrHpBbDmgiwULHNZe44bezMpNafCxMZ1eX3UeY943aC00mBYNRhIo')
// const stripe = Stripe('pk_test_51Mu9cFSCn4YtsyNNr0HxUOLQlSAC0K0LRXf3zGgdS66hGKrHpBbDmgiwULHNZe44bezMpNafCxMZ1eX3UeY943aC00mBYNRhIo')

export const card = async(carts, user, address, payment)=>{
    try{
        const session = await axios({
            method: 'Post',
            url: '/api/v1/order/payment',
            data:{
                carts,
                user,
                address,
                payment
            }
        });
        const res =  window.location = session.data.url;    

    // // create checkout form + chanre credit card
    //     await stripe.redirectToCheckout({
    //         sessionId: session.data.session.id
    //     });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
}
