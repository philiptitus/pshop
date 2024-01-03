import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAccount } from '../actions/userAction';
import { logout } from '../actions/userAction'


function DeleteScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const accountDelete = useSelector((state) => state.accountDelete);
  const { success: successDelete } = accountDelete;

  useEffect(() => {
    // Redirect to another page after successful account deletion
    if (successDelete) {
      dispatch(logout())
      navigate('/');
    }
  }, [dispatch,  successDelete]);

  const deleteHandler = () => {
    dispatch(deleteAccount());
  };

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
      <h4>You Are About To Delete Your Account Permanently!</h4>
      <p>This will delete all your info permanently. We are really sad to see you leave :(</p>
      <h6>Proceed by clicking Delete below... or I change my mind if you don't wish to proceed..</h6>
      <Link to='/profile'>
        <Button variant='info'>I CHANGED MY MIND</Button>
      </Link>
      <br />
      <Button onClick={deleteHandler} variant='danger'>
        DELETE
      </Button>
    </div>
  );
}

export default DeleteScreen;
