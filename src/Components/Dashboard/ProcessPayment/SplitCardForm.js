import React, { useMemo} from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import './SplitCardForm.css';


const SplitCardForm = ({handlePayment}) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const handleSubmit = async event => {
      event.preventDefault();
      if (!stripe || !elements) {
        return;
      }
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardNumberElement)
      });
        if (error) {
          console.log('hh')
          handlePayment(error.message, 'error');
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
        } else {
          console.log('rr')
          handlePayment(paymentMethod.id,'success');
          elements.getElement(CardNumberElement).clear();
          elements.getElement(CardExpiryElement).clear();
          elements.getElement(CardCvcElement).clear();
        }
    };

  return (
    <div>
        <form  onSubmit={handleSubmit}>
            <div className='card_info'>
                <div className='card_left'>
                  <label className="input-label">
                      <p>Card number</p>
                      
                      <CardNumberElement className="input_field card-number" />
                  </label>
                </div>
                <div className='card_mid'>
                  <label className="input-label">
                    <p>Expiration date</p>
                    <CardExpiryElement className="date-input input_field" />
                </label>
                </div>
                <div className='card_right'>
                  <label className="input-label">
                      <p>CVC</p>
                      <CardCvcElement className="cvc-input input_field" />
                  </label>
                </div>
            </div>
            <button id="submit-btn"  className="pay-btn" type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
            
    </div>
  );
};

export default SplitCardForm;