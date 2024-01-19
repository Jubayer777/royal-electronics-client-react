import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import SplitCardForm from './SplitCardForm';

const stripePromise = loadStripe('pk_test_51IeC8kHtWlcqCYLkm2NMrjkMtTwbMMEYUJwp5Ejms3v3n6yzkOXrbOveJ6JXsIz0AkZouePTB3UJLEaeyClt9BAs00nmKpEzcT');

const ProcessPayment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <SplitCardForm   handlePayment={handlePayment}></SplitCardForm>
        </Elements>
    );
};

export default ProcessPayment;