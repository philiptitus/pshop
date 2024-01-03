import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { register } from '../actions/userAction';
import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import { listorders  } from '../actions/orderActions'

function OrderListScreen() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderList = useSelector(state => state.orderList)
    const{  loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const{  userInfo } = userLogin


    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listorders())
        } else{
            navigate('/login')
        }
      }, [dispatch, navigate, userInfo]);

     
      
  return (
    <div>
    <h1>Orders</h1>
    {loading? 
        (<LoadingSpinner />)
        :error ?
        (<Message variant='danger' >{error}</Message>)
        :(
            <table className='container'>
                <thead>
                    <tr>
                    <th>SERIAL</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>

                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order._id}>
                            <td>{order.serial}</td>
                            <td>{order.user && order.user.name}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ? (
                                 order.paidAt.substring(0, 10)  
                            ):                        
                            ( 
                            <i className='fas fa-times' style={{color: 'red'}}></i>

                            )
                             }</td>

                            <td>{order.isdelivered ?(
                            order.deliveredAt.substring(0, 10) 
                                                       )                           :
                            ( 
                            (<i className='fas fa-times' style={{color: 'red'}}></i>)

                            )
                            }</td>




                        <td>
                            <LinkContainer to={`/order/${order._id}`}>
                                <Button variant='light' className='btn-sm'>
                                    DETAILS
                                </Button>
                            </LinkContainer>

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

export default OrderListScreen