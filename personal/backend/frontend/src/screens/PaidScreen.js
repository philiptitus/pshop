import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userAction'
function PaidScreen() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column', // Arrange children vertically
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh', // Set height to 40% of the viewport height
      }}
    >
      <p>PAYMENT FOR YOUR ORDER HAS BEEN RECIEVD : )</p>
      <p>Our Delivery Team are on Their Way to deliver your order</p>
      <p>You Will Be Notified When Your Order Arrives Check Your Notifications Or Email for Status</p>
      <Link to='/profile'>
        <Button variant='info'>VIEW PREVIOUS ORDERS..</Button>
      </Link>
      <br />

    </div>  )
}

export default PaidScreen