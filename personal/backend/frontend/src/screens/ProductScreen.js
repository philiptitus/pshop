
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';  // Use useNavigate for React Router v6
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap';
import Product from '../components/Product'
import Rating from '../components/Rating';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import {  listProductBrands, listBrandDetails } from '../actions/productActions';
import {    productFavourite, listProductDetails, createProductReview, createBookmark, createdbCart } from '../actions/productActions';
import {   
   PRODUCT_CREATE_REVIEW_RESET,
   PRODUCT_FAVOURITE_RESET,
   BOOKMARK_CREATE_RESET,
   DBCART_CREATE_RESET,
  } from '../constants/productConstants'
  import Comment from '../components/Comment';


function ProductScreen() {
  const [qty, setQty] = useState(1)

  const[ rating, setRating ] = useState(0)
  const[ comment, setComment ] = useState('')

  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for React Router v6
  const dispatch = useDispatch();

  const bookmarkCreate = useSelector(state => state.bookmarkCreate)
  const { loading:loadingBookmark, success:successBookmark, error:errorBookmark } = bookmarkCreate


  
  const dbCartCreate = useSelector(state => state.dbCartCreate)
  const { loading:loadingdbCartCreate, success:successdbCartCreate, error:errordbCartCreate } = dbCartCreate

  

  const brandspecificDetails = useSelector((state) => state.brandspecificDetails);
  const { brandspecific, loading:loadingB, error:errorB } = brandspecificDetails;

  const brandDetails = useSelector((state) => state.brandDetails);
  const { brand, loading:loadingBrand, error:errorBrand } = brandDetails;

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
} = productReviewCreate
  useEffect(() => {

    if (successProductReview || successBookmark || successdbCartCreate) {
      setRating(0)
      setComment('')
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
      dispatch({ type: PRODUCT_FAVOURITE_RESET })
      dispatch({ type: BOOKMARK_CREATE_RESET })
      dispatch({ type: DBCART_CREATE_RESET })





      
    }
    if (successdbCartCreate) {
      navigate('/dbcart/')
      
    }
    dispatch(listProductDetails(id));
    console.log(product.brand)
 
  }, [dispatch, id, successProductReview,  successBookmark, successdbCartCreate]);


  useEffect(() => {
    // Check if product.brand is available before making the call
    if (product && product.brand) {
      dispatch(listBrandDetails(product.brand));
      dispatch(listProductBrands(product.brand));
    }
  }, [dispatch, product]);


  const placeBookmark = (e) => {

    e.preventDefault()
    dispatch(createBookmark(
      id,
      
       ))

  }

  const placeCart = (e) => {

    e.preventDefault()
    dispatch(createdbCart(
      id,
      {qty}
      
       ))
       

  }





  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      id,{
      rating,
      comment}
    ))
    }

  // Handle the case where product is not found
  if (!product) {
    return (
      <div>
        <Link to='/' className='btn btn-light my-3'>
          Go Back to Products
        </Link>
        <p>Product not found</p>
      </div>
    );
  }

  // Handle the case where product is found
  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>
        Go Back to Products
      </Link>
      {loading ? (
       <LoadingSpinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
        <Row>
          <Col md={4}>
          <Link to={`/category/${product.category}`}>
            <h1><h6>in</h6>{product.category_name}</h1>
            </Link>
            <Image src={product.image} alt={product.name} fluid 
            
            style={{
              height: '300px',
              width: 'auto'
            }}
            />
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{product.countinStock > 0 ? 'Available' : 'Out of Stock'}</Col>
                  </Row>
                </ListGroup.Item>

                {product.countinStock > 0 &&(
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty:</Col>
                      <Col xs='auto' className='my-1'>
                      <Form.Control 
                      as="select"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}>

                        {
                          [...Array(product.countinStock).keys()].map((x) =>(
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                              </option>
                          ))
                        }

                      </Form.Control>

                      </Col>
                    </Row>
                    

                  </ListGroup.Item>


                )}


 



                {loadingBookmark && <LoadingSpinner />}
{successBookmark && <Message variant='success'>Review Submitted</Message>}
{errorBookmark && <Message variant='danger'>{errorBookmark}</Message>}

{userInfo ? (
  <ListGroup.Item>
    <Button
      type='button'
      onClick={placeBookmark}
      className='btn btn-block'
    >
      Mark As Favourite
    </Button>
  </ListGroup.Item>
) : (
  <h1>Not logged in</h1>
)}



<ListGroup.Item>
  {product.countinStock > 0 ?(
        <Button
        type='button'
        variant='info'
        onClick={placeCart}
        className='btn btn-block'
      >
        Add To Cart                   <i className="fas fa-shopping-cart"></i>

      </Button>

  ):(

    <Button
    type='button'
    variant='danger'
    className='btn btn-block'
  >
    OUT OF STOCK
  </Button>
  )}

  </ListGroup.Item>
  <Row>
  {successdbCartCreate && <Message variant='success'><h1>{successdbCartCreate}</h1></Message>}
  {loadingdbCartCreate && <LoadingSpinner />}
  {errordbCartCreate && <Message variant="danger">{errordbCartCreate}</Message>}
</Row>
</ListGroup>

            </Card>
          </Col>

          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
                

                <h5><strong>Brand: <i><Link to={`/brand/${product.brand}`}>{product.brand_name}</Link> </i></strong></h5>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
              </ListGroup.Item>
              <ListGroup.Item>
                <h3>Price: ${product.price}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>{product.description}</p>
                {product.countinStock > 0 && product.countinStock <= 20 && (
  <Message variant='danger'>Only {product.countinStock} left in stock, order yours now!</Message>
)}
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Key Specifications</h4>
                {product.specifications.length === 0 && <Message variant='primary'>No Key Attributes</Message>}
                <Form>
                  {product.specifications.map((specification) => (
                    <Form.Text key={specification._id}>
                      <li>{specification.specification_one}</li>
                      <li>{specification.specification_two}</li>
                      <li>{specification.specification_three}</li>
                      <li>{specification.specification_four}</li>
                      <li>{specification.specification_five}</li>
                      <li>{specification.specification_six}</li>
                      <li>{specification.specification_seven}</li>
                      <li>{specification.specification_eight}</li>
                      <li>{specification.specification_nine}</li>
                      <li>{specification.specification_ten}</li>

                    </Form.Text>
                  ))}
                </Form>
              </ListGroup.Item>

            </ListGroup>
          </Col>
        </Row>
<br/>
<br/>
        <Row>
  <Col>
    {/* Reviews section */}
    <h5>Reviews</h5>
    {product.reviews.length === 0 && <Message variant='warning'>No Reviews yet</Message>}
    <ListGroup variant='flush'>
      {product.reviews.slice(0,3).map((review, index) => (
        
        <Comment key={index} review={review} level={1} />

      
      ))}
      <br/>
      <br/>

      <Link to={`/reviews/${product._id}`}>
        
        View All Reviews</Link>
      <br/>


    </ListGroup>
  </Col>

</Row>

<Row>

      {/* More From The Seller section */}
      <h4 style={{
      alignItems:"center"
    }}>More From The Seller</h4>
    {brandspecific.slice(0,3).map((product) => (
      <Col key={product.brand} >
        <Product product={product} />
      </Col>
    ))}

</Row>







        </div>
      )}
    </div>
  );
}

export default ProductScreen;
