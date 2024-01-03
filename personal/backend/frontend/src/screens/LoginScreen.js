import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Use useNavigate for React Router v6
import { Row, Col, Button, Form } from 'react-bootstrap';
import { login } from '../actions/userAction';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import "../css/Authenticate.css"

function LoginScreen() {
  const location = useLocation();
  const redirect = location.search ? Number(location.search.split('=')[1]) : '/';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Fix: Invoke useDispatch
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, navigate, userInfo, redirect]); // Fix: Add dispatch to the dependency array

  return (

<Col md={8} style={{margin:'auto'}}>

<div className="main">
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <LoadingSpinner />}

      <p className="sign" align="center">
        Sign in
      </p>
      <form className="form1"
      onSubmit={submitHandler}
      
      >


<input className="un" type="email" align="center" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="pass" type="password" align="center" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)}/>

        <Button className="submit" align="center" type='submit'>
          Sign in
        </Button>


        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>

        <p className="forgot" align="center">
          <a>New Customer?</a>
        </p>

        </Link>

      </form>
    </div>

</Col>


  );
}

export default LoginScreen;
