import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { register } from '../actions/userAction';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import { listUsers, deleteUser } from '../actions/userAction'


function UserListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userList = useSelector(state => state.userList)
    const{  loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const{  userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const{  success:successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else{
            navigate('/login')
        }
      }, [dispatch, navigate, successDelete, userInfo]);

      const deleteHandler = (id, name) => {
        if(window.confirm(`Do you wish to remove ${name} permanently?`, String(name))){
          dispatch(deleteUser(id))
        }
      }
      
  return (
    <div>
    <h1>UserListScreen</h1>
    {loading? 
        (<LoadingSpinner />)
        :error ?
        (<Message variant='danger' >{error}</Message>)
        :(
            <table className="container">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADMIN</th>
                    </tr>
                </thead>
                <tbody>

                    {users.map(user => (

                        <tr key={user._id}>

                            <td>{user._id}</td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>

                            <td>{user.name}</td>
                            </LinkContainer>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>

                            <td>{user.email}</td>
                            </LinkContainer>


                            <td>{user.isAdmin ?
                            (<i className='fas fa-check' style={{color: 'green'}}></i>)
                            :
                            ( 
                            (<i className='fas fa-check' style={{color: 'red'}}></i>)

                            )
                        }</td>
                        <td>

                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id, user.name)}>
                                    <i className='fas fa-trash'></i>
                            </Button>
                        </td>

                        </tr>

                    ))}
                    



                </tbody>

            </table>
        )
        
    }
    </div>
  )
}

export default UserListScreen