import React, { useState,useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'
import { useLocation } from 'react-router-dom'



const PUBLIC_KEY = "pk_test_51KdGMSF7PsZfSFZBQduGyxH2YgPfrHO40gZUTBkJQsuVzzdjDXVhTH0y7yWGbX6mveOzNzoL6LmDJpghkaICSMyg00QCoz8zFf"
const stripeTestPromise = loadStripe(PUBLIC_KEY)


export default function StripeContainer(props) {
  const {user} =props
  const { state } = useLocation()
  const [total,setTotal] = useState(parseInt(state.itemsTotal))
  console.log('this is user',user)
  



  return (
    <div className='stripe-form-container'>
      <Elements stripe={stripeTestPromise}>
        <PaymentForm user={user} total={total}/>
      </Elements>

    </div>

  )
}
