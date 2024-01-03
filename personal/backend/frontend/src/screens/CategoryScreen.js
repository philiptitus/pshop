
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';  // Use useNavigate for React Router v6
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import {  listProductCategories, listCategoryDetails } from '../actions/productActions';
import Product from '../components/Product';




function CategoryScreen() {



  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for React Router v6
  const dispatch = useDispatch();


  



  const categoryspecificDetails = useSelector((state) => state.categoryspecificDetails);
  const { categoryspecific, loading, error } = categoryspecificDetails;


  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { category, loading:loadingCategory, error:errorCategory } = categoryDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {

    dispatch(listProductCategories(id));
    dispatch(listCategoryDetails(id));

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
        <Col >
          <Card>
          <Card.Header><h3><strong>{category.name}</strong></h3></Card.Header>
          </Card>
          </Col>

        </Row>
      <Row>
      <i>Latest Products in {category.name}</i>

        {categoryspecific.map((product) => (
          <Col key={product.id} sm={8} md={6} lg={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>

      </div>
    )}
    </div>
  );
}

export default CategoryScreen;
