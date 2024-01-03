import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {  Button, Form } from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import { register } from '../actions/userAction';
import { saveShippingAddress } from '../actions/cartActions'
import FormContainer from '../components/FormContainer';
function ShippingScreen2() {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({address, city, postalCode, country}))
    navigate('/payment2')
  }



 
  return (
    
    <FormContainer>
      <CheckoutSteps step1 step2 step3 step4 />

      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>    


      <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address ? address: ''}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>




        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city ? city: ''}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>




        <Form.Group controlId="postalCode">
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter postalCode"
            value={postalCode ? postalCode: ''}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>


        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter country"
            value={country ? country: ''}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

<Button  variant='primary' type='submit'>
  Continue

</Button>



      </Form>
    </FormContainer>
  )
}

export default ShippingScreen2