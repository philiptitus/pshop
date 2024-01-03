import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CheckoutSteps({ step1, step2, step3, step4 }) {
  return (
    <Nav className="justify-content-center mb-4">
      <Nav.Item>
        {step1 ? (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        ) : (
          <Nav.Link disabled>Login</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <Link to="/shipping2" className="nav-link">
            Shipping
          </Link>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <Link to="/payment2" className="nav-link">
            Payment
          </Link>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <Link to="/placeorder2" className="nav-link">
            Place Order
          </Link>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
}

export default CheckoutSteps;
