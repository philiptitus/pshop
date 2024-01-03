import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form , Table, ListGroup} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { getUserDetails,updateUserProfile} from '../actions/userAction';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { listMyOrders } from '../actions/orderActions'
import "../css/Table.css"


function ProfileScreen() {

  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();

  




  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Move the useSelector call out of the submitHandler function
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success:successUpdate, error:errorUpdate } = userUpdateProfile;



  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading:loadingOrders, error:errorOrders, orders } = orderListMy;


  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Woops! The Passwords Don\'t Match');
    } else {

    dispatch(updateUserProfile({
      'id':user._id,
      'name':name,
      'email':email,
      'password':password,

    }))
    setMessage('');

      }
    }
  

  // useEffect to handle redirection on successful registration
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }else{
        if(!user || !user.name || successUpdate || userInfo._id !== user._id){
          dispatch({type:USER_UPDATE_PROFILE_RESET})
          dispatch(getUserDetails('profile'))
          dispatch(listMyOrders())

            
        }


        if (successUpdate) {
          <Message variant="success">Profile Updated</Message>
          
        }



        else{
            setName(user.name)
            setEmail(user.email)
        }
    }
  }, [dispatch, navigate, userInfo, user]);








  return (
    <Row>
        <Col md={4}>
            <h2>User Profile</h2>
        
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}

      {loading && <LoadingSpinner />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {successUpdate && <Message variant="success">Profile Info Updated ! </Message>}
        <Button type="submit" variant="primary">
          UPDATE
        </Button>

      </Form>
      <br/>

      <Row>
</Row>



      <br/>
      <Link to='delete'>
      <Button type="submit" variant="danger">
          DELETE ACCOUNT
        </Button>
      </Link>


        </Col>
        <Col>
  <div>
    <h2>
      {loadingOrders && <LoadingSpinner />}
      {errorOrders && <Message variant='danger'>{errorOrders}</Message>}
      MY ORDERS
    </h2>

    <Table>
      <thead>
        <tr>
          <th>
            <h6 style={{fontSize:'0.6em' }}>SERIAL</h6>
          </th>
          <th>
            <h6 style={{fontSize:'0.6em' }}>DATE</h6>
          </th>
          <th>
            <h6 style={{fontSize:'0.6em' }}>TOTAL</h6>
          </th>
          <th>
            <h6 style={{fontSize:'0.6em' }}>PAID</h6>
          </th>
          <th>
            <h6 style={{fontSize:'0.6em' }}>DELIVERED</h6>
          </th>
        </tr>
      </thead>
      <tbody>
        {orders && orders.map(order => (
          <LinkContainer to={`/order/${order._id}`} key={order._id}>
            <tr  style={{fontSize:'0.6em' }}>
              <td style={{fontSize:'0.6em' }}>{order.serial}</td>
              <td style={{fontSize:'0.6em' }}>{order.createdAt.substring(0, 10)}</td>
              <td style={{fontSize:'0.6em' }}>${order.totalPrice}</td>
              <td className="center-content">
                {order.isPaid ? order.paidAt.substring(0, 10) : (
                  <i className='fas fa-times' style={{ color: 'orange', fontSize:'0.6em' }}></i>
                )}
              </td>
              <td className="center-content">
                {order.isdelivered ? order.deliveredAt.substring(0, 10) : (
                  <i className='fas fa-times center-content' style={{ color: 'orange' , fontSize:'0.6em'}}></i>
                )}
              </td>
            </tr>
          </LinkContainer>
        ))}
      </tbody>
    </Table>
  </div>
</Col>

    </Row>
  );
}

export default ProfileScreen