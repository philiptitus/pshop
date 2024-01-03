import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Table, Image, Card, ListGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { deletedbCart, listMydbCarts, listProducts } from '../actions/productActions';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';

function DBCartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dbCartDelete = useSelector((state) => state.dbCartDelete);
  const { success: successDelete } = dbCartDelete;

  const deleteHandler = (id) => {
    dispatch(deletedbCart(id));
  };

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dbCartListMy = useSelector((state) => state.dbCartListMy);
  const { loading: loadingdbCarts, error: errordbCarts, dbcarts } = dbCartListMy;

  const productList = useSelector((state) => state.productList);
  const { error:productError, loading:productLoading, products, page, pages } = productList;

  const [searchText, setSearchText] = useState("");

  
  const checkOutHandler = () => {
    // Check if any product in the cart is out of stock
    const outOfStockProduct = dbcarts.find(dbCart => dbCart.DatabaseCart_product_countinStock <= 0);
  
    if (outOfStockProduct) {
      // Display a message or handle the out-of-stock scenario
      alert(`Product ${outOfStockProduct.DatabaseCart_product_name} is out of stock.`);
    } else {
      // If all products are in stock, proceed to checkout
      navigate('/shipping2');
    }
  };
  

  const loginHandler = () => {
    navigate('/login');
  };

  // Helper function to calculate total
  const calculateTotal = () => {
    if (!dbcarts) {
      return 0; // or any default value you prefer
    }

    return dbcarts.reduce(
      (total, dbCart) =>
        total + dbCart.DatabaseCart_product_qty * Number(dbCart.DatabaseCart_product_price),
      0
    );
  };

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listMydbCarts());
      dispatch(listProducts(searchText));

    }
  }, [dispatch, navigate, userInfo, user, successDelete]);

  return (
    dbcarts && dbcarts.length === 0 ? (
      <Message variant="warning">
        Your Cart Is Empty <Link to="/">Go Back</Link>
      </Message>
    ) : (
      <Row>
        
          <h2>CART</h2>
          {loadingdbCarts ? (
           <LoadingSpinner />
          ) : errordbCarts ? (
            <Message variant="danger">{errordbCarts}</Message>
          ) : productError ? (
            <Message variant="danger">{productError}</Message>

          ):
          
          (
            <Table  className="container-fluid" sm={12}>
              <thead style={{ backgroundColor:'white' }}>
                <tr  style={{ backgroundColor:'white' }}>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th></th>

                </tr>
              </thead>

              <tbody>
              {dbcarts.map((dbCart, index) => {
  const matchingProduct = products.find(product => product._id === dbCart.DatabaseCart_product_id);
  if (matchingProduct) 
  {
    return (
      <tr key={dbCart._id}>
        <td>

          <Image
            src={dbCart.DatabaseCart_product_image}
            alt={dbCart.DatabaseCart_product_name}
            style={{
              width: '70px',
              height: 'auto',
            }}
            fluid
            rounded
          />
        </td>
        <td>
          <Link to={`/product/${dbCart.DatabaseCart_product_id}`}>
            {dbCart.DatabaseCart_product_name}
          </Link>
          
        </td>
        <LinkContainer  style={{ color:'red' }} to={`/dbcart/${dbCart._id}/edit`}>

        <td>{dbCart.DatabaseCart_product_qty} <i className="fas fa-edit"></i></td>

        </LinkContainer>



        <td>{Number(dbCart.DatabaseCart_product_price).toFixed(2)}</td>
        <td>
          {(dbCart.DatabaseCart_product_qty * Number(dbCart.DatabaseCart_product_price)).toFixed(2)}
        </td>
        <td className="text-right">
          <Button
            variant="info"
            className="btn-sm"
            onClick={() => deleteHandler(dbCart._id)}
          >
            <i className="fas fa-times"></i>
          </Button>
        </td>
        {matchingProduct.countinStock < 5 && <Message> <h6 style={{
          color:'red'
        }}> {matchingProduct.countinStock} in Stock</h6></Message>}
      </tr>
    );
  }

  // Return null or an empty fragment if no matching product is found
  return null;
})}

              </tbody>
            </Table>
          )}
        
        <Col>
  <Card className="cart-summary">
    <Card.Body>
      <ListGroup variant="flush">
        <h1>SUBTOTAL</h1>
        <ListGroup.Item> <b>${calculateTotal().toFixed(2)}</b></ListGroup.Item>
        <ListGroup.Item>
          {dbcarts && dbcarts.length > 0 ? (
            (() => {
              let disableCheckout = false; // Flag to disable checkout button

              dbcarts.forEach((dbCart) => {
                const matchingProduct = products.find(product => product._id === dbCart.DatabaseCart_product_id);

                if (matchingProduct && matchingProduct.countinStock < 1) {
                  disableCheckout = true;
                }
              });

              return (
                <>
                  {!userInfo ? (
                    <Button
                      type="button"
                      className={`btn-block btn-primary ${disableCheckout ? "disabled" : ""}`}
                      onClick={disableCheckout ? null : loginHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      className={`btn-block btn-primary ${disableCheckout ? "disabled" : ""}`}
                      onClick={disableCheckout ? null : checkOutHandler}
                    >
                      Proceed To Checkout
                    </Button>
                  )}
                  {disableCheckout && (
                    <Message
                    variant='danger'
                    >
                      <h6 style={{ color: 'red' }}>At least one of The Items is Out Of Stock Remove It To Continue</h6>
                    </Message>
                  )}
                </>
              );
            })()
          ) : (
            <p>Your cart is empty.</p>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
</Col>

      </Row>
    )
  );
}

export default DBCartScreen;
