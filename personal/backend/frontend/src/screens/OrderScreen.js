import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap';
import Message from '../components/Message';
        import LoadingSpinner from '../components/LoadingSpinner';

import PayPalButton from '../components/Paypal';
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'


import { Link } from 'react-router-dom';
import { getOrderDetails,payOrder, deliverOrder } from '../actions/orderActions';
import { createProductReview } from '../actions/productActions';

import {   
  PRODUCT_CREATE_REVIEW_RESET,
 } from '../constants/productConstants'

function OrderScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // Custom component to wrap the PayPalButtons and show loading spinner


  const [sdkReady, setSdkReady] = useState(true)

  const navigate = useNavigate();

  const[ di, setDi ] = useState(0)
  const[ rating, setRating ] = useState(0)
  const[ comment, setComment ] = useState('')

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const {loading:loadingPay, success:successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {loading:loadingDeliver, success:successDeliver, error:errorDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
} = productReviewCreate

  if (!loading && !error) {
    order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);
  }


  const addPaypalScript = () =>{
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://www.paypal.com/sdk/js?client-id=AdAAfQXmnLSjjAx7l3wQJMslCUTyAlGfoGIGFOOHjCBF6yv0bWAmXOKtZUljfSla4NA70lROazvDV31P'
    script.async = true
    script.onload = () => {
      setSdkReady(true)

    }
    document.body.appendChild(script)
     
  }

  
  useEffect(() => {

    if (!userInfo) {
      navigate('/login')
      
    }

    if (!order ||  successPay || order._id !== Number(id) || successDeliver || successProductReview ) {
      
      setRating(0)
      setComment('')
      setDi(0)
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET})
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })

      dispatch(getOrderDetails(id));

    }
    else if(!order.isPaid){
      if(!window.paypal){
        addPaypalScript()
      } else {
        setSdkReady(true)
      }
    }
  }, [dispatch, order, id, successPay, successDeliver, successProductReview]);


  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult))
    navigate('/paid')
  }

  const deliverHandler = () => {
    dispatch(deliverOrder(order))
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      di,{
      rating,
      comment}
    ))
    }



  return loading ? (
    // <PayPalScriptProvider>

    <LoadingSpinner />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>SERIAL NO: <h3><strong>{order.serial}</strong></h3></h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h1>Shipping</h1>
              <p><strong>Name: {order.user.name}</strong></p>
              <p><strong><a href={`mailto:${order.user.email}`}>Email: {order.user.email}</a></strong></p>

              <p>
                <strong>Shipping:</strong>
                {` ${order.shippingAddress.address}, ${order.shippingAddress.city} ${order.shippingAddress.postalCode} ${order.shippingAddress.country}`}
              </p>
              {order.isPaid && ! order.isdelivered && <Message variant='info'> Heads Up We will Notify You When Your Order Arrives </Message>}
              {order.isdelivered ?(
                <Message variant='success'>Delivered on: {order.deliveredAt.substring(0, 10)}</Message>
              ):(
                <Message variant='warning'>Not Delivered</Message>

              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h1>Payment Method</h1>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ?(
                <Message variant='success'>Paid on: {order.paidAt.substring(0, 10)}</Message>
              ):(
                <Message variant='warning'>Not Paid Yet</Message>

              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h1>Order Items</h1>
              {order.orderItems.length === 0 ? (
                <Message variant="info">Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded width={50} />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col>
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <br/>

        {loadingProductReview && <LoadingSpinner />}
        {successProductReview && <Message variant='success'>Review Submitted</Message>}
        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

        {order.isdelivered ? (
          
          <Form onSubmit={submitHandler} >
  <h4>Write a review</h4>
<Form.Group controlId='product'>
  <Form.Label>Product</Form.Label>
  <Form.Control 
  value={di}
  onChange={(e) => setDi(e.target.value)}
  as='select'>
    <option value=''>Select Product...</option>
    {order.orderItems.length === 0 ? (
      <Message variant="info">Your order is empty</Message>
    ) : (
      order.orderItems.map((item, index) => (
        <option key={index} value={item.product}>
          {item.name}
        </option>
      ))
    )}
  </Form.Control>
</Form.Group>

            <Form.Group controlId='rating'>
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as='select'
                value={rating}
                onChange={(e) => setRating(e.target.value)}

              >
                <option value=''>Select...</option>
                <option value='1'>1--Poor</option>
                <option value='2'>2--Fair</option>
                <option value='3'>3--Good</option>
                <option value='4'>4--Very Good</option>
                <option value='5'>5--Excellent</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId='comment'>
              <Form.Label>Review</Form.Label>
              <Form.Control
                as='textarea'
                rows='7'
                placeholder='Write something'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Group>
            <br/>
            <Button
              type='submit'
              variant='warning'
            >
              Submit
            </Button>
          </Form>
        ) : (
          <Message variant='primary'>Write Your Review Here After Your Order Has been Delivered</Message>
        )}
      </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
  <Card>
    <ListGroup variant="flush">
      <ListGroup.Item>
        <h2>ORDER SUMMARY</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Items:</Col>
          <Col>${order.itemsPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Shipping:</Col>
          <Col>${order.shippingPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax:</Col>
          <Col>${order.taxPrice}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Total:</Col>
          <Col>${order.totalPrice}</Col>
        </Row>
      </ListGroup.Item>
      {!order.isPaid && sdkReady && (
  <ListGroup.Item>
    {loadingPay ? (
      <LoadingSpinner />
    ) : (
      
      <PayPalButton
        amount={order.totalPrice} // Pass the order total price as the amount
        successPaymentHandler={successPaymentHandler}
      />
    )}
  </ListGroup.Item>
)}

    </ListGroup>
    {loadingDeliver && <LoadingSpinner />}
    {errorDeliver && <Message variant='danger'>{errorDeliver}</Message>}
    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (

      <ListGroup.Item>
        <Button
        type='button'
        onClick={deliverHandler}
        className='btn btn-block'
        >
          Mark As Deliver

        </Button>
      </ListGroup.Item>
    ) }
  </Card>
</Col>

      </Row>
    </div>
  );
}

export default OrderScreen;
