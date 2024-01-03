import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {  Col, Button, Form } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { register } from '../actions/userAction';
import { savePaymentMethod } from '../actions/cartActions'
import FormContainer from '../components/FormContainer';
function PaymentScreen2() {


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const [ paymentMethod, setPaymentMethod ] = useState('Paypal')

    if(!shippingAddress.address){
        navigate('/shipping')

    }
    
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    navigate('/placeorder2')
  }

  return (

    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />

        <Form
        onSubmit={submitHandler}
        >
            <Form.Group>
                <Form.Label as='legend'>Select Method</Form.Label>
                <Col>
                <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='paypal'
                name='paymentMethod'
                checked
                required
                onChange={(e) => setPaymentMethod(e.target.value)}
                >

                </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'> Continue</Button>
        </Form>

    </FormContainer>
  )
}

export default PaymentScreen2