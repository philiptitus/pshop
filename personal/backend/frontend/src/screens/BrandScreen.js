
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';  // Use useNavigate for React Router v6
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import {  listProductBrands, listBrandDetails } from '../actions/productActions';
import Product from '../components/Product';




function BrandScreen() {



  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for React Router v6
  const dispatch = useDispatch();


  



  const brandspecificDetails = useSelector((state) => state.brandspecificDetails);
  const { brandspecific, loading, error } = brandspecificDetails;

  const brandDetails = useSelector((state) => state.brandDetails);
  const { brand, loading:loadingBrand, error:errorBrand } = brandDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

    dispatch(listBrandDetails(id))
    dispatch(listProductBrands(id));
  }, [dispatch, id]);

















  // Handle the case where product is not found

  // Handle the case where product is found
  return (
<div>

    {loading ? (
      <LoadingSpinner />
    ) : error ? (
      <Message variant='danger'>{error}</Message>
    ) : (
      <div>
        <Row>
        <Col sm={12} md={12} lg={12}>
          <Card>
            <Card.Footer><h3><strong>{brand.name}</strong></h3></Card.Footer>
          </Card>
          </Col>

        </Row>
      <Row>
      <h6>Latest Products in {brand.name} </h6>
      {brandspecific.length < 1 ? (
  <Message variant="warning">
    We have nothing in Store <Link to="/">Go Back</Link>
  </Message>
) : (
  brandspecific.map((product) => (
    <Col key={product.id} >
      <Product product={product} />
    </Col>
  ))
)}
      </Row>

      </div>
    )}
    
    </div>
  );
}

export default BrandScreen;
