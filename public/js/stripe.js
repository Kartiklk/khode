import axios from "axios";
import { showAlert } from './alerts';
import Stripe from "stripe";
const stripe = Stripe('pk_test_51Mu9cFSCn4YtsyNNr0HxUOLQlSAC0K0LRXf3zGgdS66hGKrHpBbDmgiwULHNZe44bezMpNafCxMZ1eX3UeY943aC00mBYNRhIo')
// const stripe = Stripe('pk_test_51Mu9cFSCn4YtsyNNr0HxUOLQlSAC0K0LRXf3zGgdS66hGKrHpBbDmgiwULHNZe44bezMpNafCxMZ1eX3UeY943aC00mBYNRhIo')

export const card = async(carts, user, address, payment)=>{
    console.log(carts, user, address, payment);
    try{
        const session = await axios({
            method: 'POST',
            url: '/api/v1/order/payment',
    });
    console.log(session);
    //create checkout form + chanre credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
}