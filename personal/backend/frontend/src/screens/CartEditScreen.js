import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { listMydbCarts, updateCart, listCartProductDetails } from '../actions/productActions';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { DBCART_EDIT_RESET } from '../constants/productConstants';

function CartEditScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);

  const dbCartDetail = useSelector(state => state.dbCartDetail);
  const { error, loading, product } = dbCartDetail;

  const dbCartEdit = useSelector(state => state.dbCartEdit);
  const { success: successUpdate, error: errorUpdate, loading: loadingUpdate } = dbCartEdit;

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(updateCart({
      _id: id,
      qty,
    }));
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: DBCART_EDIT_RESET });
      navigate('/dbcart');
    }
    dispatch(listCartProductDetails(id));
  }, [dispatch, id, navigate, successUpdate]);

  return (
    <>
      {loading ? (
       <LoadingSpinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div>
          <Link to='/dbcart'>
            Go Back
          </Link>

          {product && product.DatabaseCart_product_countinStock > 0 && (
            <FormContainer>
              <h1>Edit Cart</h1>
              {loadingUpdate && <LoadingSpinner />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Control
                    as="select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.DatabaseCart_product_countinStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Update
                </Button>
              </Form>
            </FormContainer>
          )}

        </div>
      )}
    </>
  );
}

export default CartEditScreen;
