import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../components/Category';
        import LoadingSpinner from '../components/LoadingSpinner';


import Message from '../components/Message';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { listProducts, listBrands, listCategories } from '../actions/productActions';
function CategoriesScreen() {

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { error: errorCategory, loading: loadingCategory, categories } = categoryList;

    const location = useLocation();
    const navigate = useNavigate();
  
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        dispatch(listCategories(searchText));
      }, [dispatch, searchText]);



  return (
    <div>
           
<h1>All categories</h1>
      {loadingCategory ? (
       <LoadingSpinner />
      ) : errorCategory ? (
        <Message variant='danger'>{errorCategory}</Message>
      ) : (
        <div>
        <Row>
          {categories.map((brand) => (
            <Col key={brand.id} style={{ width:"auto"}} >
              <Category category={brand} />
            </Col>
          ))}
        </Row>

        </div>
      )}


    </div>
  )
}

export default CategoriesScreen