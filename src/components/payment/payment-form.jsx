import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer } from './payment-form-style';
import { useSelector } from 'react-redux';

export const PaymentForm = ({cartTotal}) =>{
    const stripe = useStripe();
    const elements = useElements();
    const user = useSelector((state) => state.user )

    const handlePayment = async (e)=> {
        e.preventDefault();

        console.log('1');

        if(!stripe || !elements ){
            return;
        }

        const res = await fetch('/.netlify/functions/stripe-payment-intent', {
            body: JSON.stringify({ amount: cartTotal}),
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((response)=> response.json() )

        const { paymentIntent: { client_secret } } = res;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user ? user.displayName : 'Yahiko'
                }
            }
        })

        if(paymentResult.error){
            console.log('payment error', paymentResult);
            alert(paymentResult.error);
        }else{
            if(paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Successful');
                console.log('payment success', paymentResult);
            }
        }

    }

    return(
        <PaymentFormContainer >
            <FormContainer  >
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <Button onClick={handlePayment} buttonType={BUTTON_TYPE_CLASSES.inverted} >
                Pay Now
                </Button>
            </FormContainer>
        </PaymentFormContainer>
    )
}