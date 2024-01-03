import React, { useState, useEffect } from
 
'react'

import { Button, Row, Col, ListGroup, Image, Card, Table } from
 
'react-bootstrap'

import { useDispatch, useSelector } from
 
'react-redux'

import Message from
 
'../components/Message'

import CheckoutSteps from
 
'../components/CheckoutSteps'

import { createOrder } from
 
'../actions/orderActions'

import { ORDER_CREATE_RESET } from
 
'../constants/orderConstants'

import { useNavigate, Link } from
 
'react-router-dom'

import { cleardbCart } from '../actions/productActions'
import PayPalComponent from '../components/Paypal';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'



function
 
PlaceOrderScreen2() {
  const navigate = useNavigate();

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success } = orderCreate

  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(true)

  
const cart = useSelector(state => state.cart)

const dbCartListMy = useSelector((state) => state.dbCartListMy);
const { loading: loadingdbCarts, error: errordbCarts, dbcarts } = dbCartListMy;

const calculateTotal = () => {
    if (!dbcarts) {
      return 0; // or any default value you prefer
    }

    return dbcarts.reduce(
      (total, dbCart) =>
        total + dbCart.DatabaseCart_product_qty * Number(dbCart.DatabaseCart_product_price),
      0
    );
  };


  // Calculate cart prices
  cart.itemsPrice = <b>{calculateTotal().toFixed(2)}</b>
  cart.shippingPrice = (calculateTotal() > 100 ? 0 : 10).toFixed(2)
  cart.taxPrice = ((0.082) * calculateTotal()).toFixed(2)
  cart.totalPrice = (Number(calculateTotal()) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

  if (!cart.paymentMethod) {
    navigate('/payment2')
  }

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
      dispatch(cleardbCart({}))

    }
  }, [success, navigate])

    const placeOrder = () => {
        dispatch(createOrder({
            orderItems: dbcarts,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: calculateTotal(),
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>

                            <p>
                                <strong>Shipping: </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city}
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                                <h2>Order Items</h2>
                                {    dbcarts && dbcarts.length === 0 ? (
                                <Message variant="warning">
                                    Your Cart Is Empty <Link to="/">Go Back</Link>
                                </Message>
                                ) : (
                                    <ListGroup variant='flush'>
            <Table striped responsive className="table-sm">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>

              <tbody>
                {dbcarts.map((dbCart, index) => (
                  <tr key={dbCart._id}>
                    <td>
                      <Image
                        src={dbCart.DatabaseCart_product_image}
                        alt={dbCart.DatabaseCart_product_name}
                        style={{
                          width: '70px',
                          height: 'auto',
                        }}
                        fluid
                        rounded
                      />
                    </td>
                    <td>
                      <Link to={`/product/${dbCart.DatabaseCart_product_id}`}>
                        {dbCart.DatabaseCart_product_name}
                      </Link>
                    </td>
                    <td>{dbCart.DatabaseCart_product_qty}</td>
                    <td>{Number(dbCart.DatabaseCart_product_price).toFixed(2)}</td>
                    <td>
                      {(dbCart.DatabaseCart_product_qty * Number(dbCart.DatabaseCart_product_price)).toFixed(2)}
                    </td>


                  </tr>
                ))}
              </tbody>
            </Table>
                                    </ListGroup>
                                )}
                        </ListGroup.Item>

                    </ListGroup>

                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>


                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrder}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen2
