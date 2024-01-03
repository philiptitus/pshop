import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';  // Use useNavigate for React Router v6
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
        import LoadingSpinner from '../components/LoadingSpinner';


import Message from '../components/Message';
import { createdbCart, createBookmark } from '../actions/productActions';
import {   
   DBCART_CREATE_RESET,
   BOOKMARK_CREATE_RESET,

  } from '../constants/productConstants'

function Product({ product }) {

  const navigate = useNavigate(); // Use useNavigate for React Router v6
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1)
  const dbCartCreate = useSelector(state => state.dbCartCreate)
  const { loading:loadingdbCartCreate, success:successdbCartCreate, error:errordbCartCreate } = dbCartCreate


  
  const bookmarkCreate = useSelector(state => state.bookmarkCreate)
  const { loading:loadingBookmark, success:successBookmark, error:errorBookmark } = bookmarkCreate


  useEffect(() => {
    if (successdbCartCreate ) {
      dispatch({ type: DBCART_CREATE_RESET })
      navigate('/dbcart/')
      
    }

    if (successBookmark ) {
      dispatch({ type: BOOKMARK_CREATE_RESET })
      navigate('/bookmarks')
      
    }
 
  }, [dispatch,successdbCartCreate, successBookmark, navigate]);


  const placeCart = (e) => {

    e.preventDefault()
    dispatch(createdbCart(
      product._id,
      {qty}
      
       ))
       

  }
  const placeBookmark = (e) => {

    e.preventDefault()
    dispatch(createBookmark(
      product._id,
      
       ))

  }



  return (

    <div>
    <style>{`
/* Card.module.css */

:global {
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@100;200;300;400;500;700;800;900&display=swap');
}

:root {
  font-size: 16px;
  font-family: "Raleway";
  --heading-color: hsl(0, 0%, 7%);
  --date-text-color: hsl(0, 0%, 51%);
  --previous-price-text-color: hsl(0, 98%, 44%);
  --current-price-text-color: hsla(0, 0%, 0%, 0.822);
  --liked-heart-icon-color: hsl(0, 98%, 44%);
  --heart-icon-color: whitesmoke;
  --pricing-font-weight: 800;
  --title-font-weight: 800;
  --date-font-weight: 550;
  --card-main-color: whitesmoke;
  --card-1-secondary-color: rgb(192, 82, 82);
  --card-2-secondary-color: rgb(67, 53, 27);
  --card-3-secondary-color: rgb(178, 180, 179);
  --card-4-secondary-color: rgb(96, 109, 117);
}

body {
  /* background-color: lightcyan; */
}

.container input {
  display: none;
}

.container {
  max-width: 100em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-content: flex-start;
  box-sizing: border-box;
}

/* Card Styling */
.card-div {
  width: 10em;
  min-height: 4em;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  background-color: var(--card-main-color);
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: transform 0.2s ease-in-out;
}

/* General styling of all cards and heart divs */
.img-div {
  width: 100%;
  height: 8em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  z-index: 1;
  border-radius: 0 0 10px 10px;
}

.img-div img {
  transform-origin: bottom;
  transform: translateY(7.5%);
  transition: transform 0.3s ease-in-out;
}

/* Styling the like Icon */
.like-icon-div {
  padding: 1em 1em 0 1em;
  width: 100%;
  box-sizing: border-box;
  text-align: right;
  font-size: 1.5em;
  color: var(--heart-icon-color);
  border-radius: 10px 10px 0 0;
  display: flex;
  justify-content: flex-end;
}

.like-icon-div-child {
  width: 1em;
  height: 1em;
  position: relative;
  z-index: 3;
  cursor: pointer;
}

.heart-empty {
  position: absolute;
  left: 0;
  opacity: 1;
}

.heart-fill {
  position: absolute;
  left: 0;
  opacity: 0;
  transform: scale(0);
  transition: transform 0.25s ease-in-out, opacity 0.2s ease-in-out;
}

/* God of war image and heart-background */
.gow-img-div {
  background-color: var(--card-1-secondary-color);
}

.gow-img-div img {
  width: 45%;
  transform: translateY(7.5%);
}

.card-1 .like-icon-div {
  background-color: var(--card-1-secondary-color);
}

/* Sekiro image and heart-background */
.sekiro-img-div {
  background-color: var(--card-2-secondary-color);
}

.sekiro-img-div img {
  width: 45%;
  transform: translateY(7.5%);
}

/* Dazai image and heart-background */
.dazai-img-div {
  background-color: var(--card-3-secondary-color);
}

.dazai-img-div img {
  width: 80%;
  transform: translateY(7.5%);
}

/* Text Container Styling general */
.text-container {
  width: 100%;
  display: grid;
  flex-direction: row;
  padding: 0 1.5em;
}

.text-container .item-name,
.text-container .item-name {
  font-size: 0.8em;
  font-weight: var(--title-font-weight);
  color: var(--heading-color);
}

.text-container .date {
  font-size: 0.9em;
  font-weight: var(--date-font-weight);
  color: var(--date-text-color);
}

/* Pricing and cart div */
.pricing-and-cart {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.25em 0 1em 0;
}

.pricing {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.current-price {
  color: var(--current-price-text-color);
  font-size: 0.9rem;
  font-weight: var(--pricing-font-weight);
  margin: 0;
}

.pricing-and-cart {
  width: 100%;
}

.fa-shopping-cart {
  font-size: 1.3rem;
  top: 0;
  transform: translateY(50%);
}

/* Hover effects */
.card-div:hover .img-div img {
  transform: translateY(7.5%) scale(1.2);
}

.card-div:hover {
  transform: translate(0, -10px);
}

.like-icon-div-child:hover .heart-fill {
  opacity: 1;
  transform: scale(1);
}

.like-icon-div-child:hover .heart-empty {
  transition-delay: 0.25s;
  opacity: 0;
}

#card-1-like:checked ~ .heart-empty,
#card-2-like:checked ~ .heart-empty,
#card-3-like:checked ~ .heart-empty,
#card-4-like:checked ~ .heart-empty {
  opacity: 0;
}

#card-1-like:checked ~ .heart-fill,
#card-2-like:checked ~ .heart-fill,
#card-3-like:checked ~ .heart-fill,
#card-4-like:checked ~ .heart-fill {
  animation: like-animation 0.25s ease-in-out forwards;
}

#card-1-like:not(:checked) ~ .heart-fill,
#card-2-like:not(:checked) ~ .heart-fill,
#card-3-like:not(:checked) ~ .heart-fill,
#card-4-like:not(:checked) ~ .heart-fill {
  animation: unlike-animation 0.25s ease-in-out;
}

@keyframes like-animation {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    color: var(--liked-heart-icon-color);
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    color: var(--liked-heart-icon-color);
    transform: scale(1.0);
  }
}

@keyframes unlike-animation {
  0% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 1;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    color: var(--heart-icon-color);
    transform: scale(1.0);
  }
}

  `}</style>

<Link to={`/product/${product._id}`}>

<div className="container" >
  
<div className="card-1 card-div" style={{ height: '70%' }}>
  <div className="like-icon-div">
  <label htmlFor="card-1-like" className="like-icon-div-child">
        <input type="checkbox"   />
        <i className="far fa-heart heart-empty"></i>
        <i className="fas fa-heart heart-fill" onClick={placeBookmark}></i>
      </label>
  </div>

  <div className="gow-img-div img-div" >
    <img
      src={product.image}
      alt="god-of-war-figurine"
      style={{

        height:"auto",
      }}
      
    />
  </div>

  <div className="text-container"
  style={{
    margin:"auto"
  }}
  >
    <div className="pricing-and-cart">
      <div className="pricing">
        <p className="current-price"> ${product.price}</p>
        <h6 className="item-name">{product.name} </h6>
        <Rating  value={product.rating} text={product.numReviews} color='red'></Rating>
       <Card.Text as="div" className={`availability ${product.countinStock > 0 ? 'available' : 'out-of-stock'}`}>
    <span style={{ color: product.countinStock > 0 ? 'green' : 'red' }}>
           {product.countinStock > 0 ? 'Available' : 'Out of Stock'}
         </span>
       </Card.Text>

      </div>
      <i onClick={placeCart} className="fas fa-shopping-cart"></i>
    </div>
  </div>
</div>
</div>
</Link>

    </div>
    

  );
}

export default Product;
