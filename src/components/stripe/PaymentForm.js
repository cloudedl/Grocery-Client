import React, {useState} from 'react'
import axios from 'axios'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import {emptyCart} from '../../api/cart'
import { AiOutlineCheck } from "react-icons/ai";

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm(props) {

    const { user, total} = props
    const [stripeTotal, setStripeTotal]=useState(parseInt(total))
    const [success, setSuccess] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
    let intTotal = parseInt(total)
    console.log ('what is props total', props.total)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })
        emptyCart(user)
        .then()


        if(!error) {
            try {
                const {id} = paymentMethod
                const response = await axios.post('http://localhost:8000/payment', {
                    amount: props.total ,
                    id
                })

                if(response.data.success) {
                    console.log("successful payment")
                    setSuccess(true)
                }
            } catch (error) {
                console.log("error", error)
            }
        } else {
            console.log(error.message)
        }
    }
  return (
    <>
        {!success?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>  
            </fieldset>
            <button className='stripe-button'>Pay</button>
        </form>
        
        :<div className='order-container'>
            <div className='order-message'>
                <AiOutlineCheck fill='black' fontSize="60px"/>
                <h2>Order Successful!</h2>
                <h5>Confirmation email sent to: {user.email}</h5>

            </div>
        </div>}
    </>
  )
}
