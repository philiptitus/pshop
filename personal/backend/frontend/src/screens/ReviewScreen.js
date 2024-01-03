import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';  // Use useNavigate for React Router v6
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Product from '../components/Product'
import Rating from '../components/Rating';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import Comment from '../components/Comment';
import {    productFavourite, listProductDetails, createProductReview, createBookmark, createdbCart } from '../actions/productActions';


function ReviewScreen() {
    const { id } = useParams();
    const dispatch = useDispatch();


    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;

    useEffect(() => {

        dispatch(listProductDetails(id));
     
      }, [dispatch, id ]);
    


  return (
    <div>
    <Row>

    <Col md={12}>
        <h5>Reviews</h5>
    {product.reviews.length === 0 && <Message variant='warning'>No Reviews yet</Message>}
        </Col>
        <ListGroup variant='flush'>

        {product.reviews.map((review, index) => (
        <Comment key={index} review={review} level={1} />

))}
      <br/>
      <br/>

        </ListGroup>


    </Row>
    </div>
  )
}

export default ReviewScreen