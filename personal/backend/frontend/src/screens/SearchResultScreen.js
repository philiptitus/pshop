// SearchResultScreen.js (or any name you prefer)
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listBrands, listCategories } from '../actions/productActions';
import Search from '../components/Search'
import SearchCategory from '../components/SearchCategory'

        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'
import SearchBrand from '../components/SearchBrand';

function SearchResultScreen({ location }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { error: errorCategory, loading: loadingCategory, categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { error: errorBrand, loading: loadingBrand, brands } = brandList;

  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate()


  useEffect(() => {
    // Extract search query from location object
    // const searchQuery = new URLSearchParams(location.search).get('search');

    // Dispatch action to fetch search results
    dispatch(listProducts(searchText));
    dispatch(listCategories(searchText));
    dispatch(listBrands(searchText));
  }, [dispatch, searchText]);

  return (
    <div>
          <input
      type='search'
      placeholder='Search Something Here'
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
    <br/>
    <br/>
    <br/>

<h5> <strong>Brands </strong></h5>
      {loadingBrand ? (
       <LoadingSpinner />
      ) : errorBrand ? (
        <Message variant='danger'>{errorBrand}</Message>
      ) : (
        <Row>
          {brands.length < 1  && (
          <Message variant='success'>Nothing Here</Message>
)}
          {brands.slice(0,5).map((product) => (
            <ul key={product._id} sm={12} md={6} lg={4} xl={3}>
              <li>     
           <SearchBrand product={product} />
          </li>
            </ul>
          ))}
        </Row>
      )}






<h5> <strong>Categories </strong></h5>
      {loadingCategory ? (
       <LoadingSpinner />
      ) : errorCategory ? (
        <Message variant='danger'>{errorCategory}</Message>
      ) : (
        <Row>
          {categories.length < 1  && (
          <Message variant='success'>Nothing Here</Message>
          )}
          {categories.slice(0,5).map((product) => (
            <ul key={product._id} sm={12} md={6} lg={4} xl={3}>
              <li>     
           <SearchCategory product={product} />
          </li>
            </ul>
          ))}
        </Row>
      )}

      <h5> <strong>Products </strong></h5>
      {loading ? (
       <LoadingSpinner />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.length < 1  && (
          <Message variant='success'>Nothing Here</Message>
)}
          {products.slice(0,10).map((product) => (
            <ul key={product._id} sm={12} md={6} lg={4} xl={3}>
              <li>     
           <Search product={product} />
          </li>
            </ul>
          ))}
        </Row>
      )}






    </div>
  );
}

export default SearchResultScreen;
