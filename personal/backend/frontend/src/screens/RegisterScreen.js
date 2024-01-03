import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { register } from '../actions/userAction';
import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import "../css/Authenticate.css"


function RegisterScreen() {
  const dispatch = useDispatch()
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const redirect =  '/login';
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // Move the useSelector call out of the submitHandler function
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo, success } = userRegister;

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Woops! The Passwords Don\'t Match');
    } else {
      try {
        await dispatch(register(name, email, password));
        {success && navigate(redirect) }
        
      } catch (error) {
        setMessage(error.message);
      }
    }
  };

  // useEffect to handle redirection on successful registration
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [dispatch, navigate, userInfo, redirect]);

  return (


<Col md={8} style={{margin:'auto'}}>

    <div className="main" style={{

      height:'500px'
    }}>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <LoadingSpinner />}

      <p className="sign" align="center">
        Sign Up
      </p>
      <form className="form1"
      onSubmit={submitHandler}
      
      >
        <input className="un" type="name" align="center" placeholder="Enter User Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="un" type="email" align="center" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input className="pass" type="password" align="center" placeholder="Password" value={password}  onChange={(e) => setPassword(e.target.value)}/>
        <input className="pass" type="password" align="center" placeholder="Confirm Password" value={confirmPassword}  onChange={(e) => setConfirmPassword(e.target.value)}/>


        <Button className="submit" align="center" type='submit'>
          REGISTER
        </Button>


        <Link to="/login">

        <p className="forgot" align="center">
          <a>Have An Account ?</a>
        </p>

        </Link>

      </form>
    </div>
    </Col>
    

  );
}

export default RegisterScreen;
