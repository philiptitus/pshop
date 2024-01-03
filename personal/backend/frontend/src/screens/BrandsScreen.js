import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Brand from '../components/Brand';
import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import { useLocation, useNavigate } from 'react-router-dom';
import { listBrands } from '../actions/productActions';

function BrandsScreen() {
    const dispatch = useDispatch();

    const brandList = useSelector((state) => state.brandList);
    const { error: errorBrand, loading: loadingBrand, brands } = brandList;
  
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        dispatch(listBrands(searchText));
      }, [dispatch, searchText]);

  return (
    <div>

    
<h1>All Brands</h1>
      {loadingBrand ? (
       <LoadingSpinner />
      ) : errorBrand ? (
        <Message variant='danger'>{errorBrand}</Message>
      ) : (
        <div>
        <Row>
          {brands.map((brand) => (
            <Col key={brand.id} style={{ width:"auto"}}>
              <Brand brand={brand} />
            </Col>
          ))}
        </Row>

        </div>
      )}


    </div>
  )
}

export default BrandsScreen