import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Brand from '../components/Brand';
import Category from '../components/Category';

import Message from '../components/Message';
import LoadingSpinner from '../components/LoadingSpinner';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { listProducts, listBrands, listCategories } from '../actions/productActions';



function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const { error: errorCategory, loading: loadingCategory, categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { error: errorBrand, loading: loadingBrand, brands } = brandList;
  const bookmarkCreate = useSelector(state => state.bookmarkCreate)
  const { loading:loadingBookmark, success:successBookmark, error:errorBookmark } = bookmarkCreate

  const location = useLocation();
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    dispatch(listProducts(searchText));
    dispatch(listCategories(searchText));
    dispatch(listBrands(searchText));
  }, [dispatch, searchText]);

  return (
    <div>


<h1>Popular Brands</h1>
<Link to='brands/'>View all</Link>
      {loadingBrand ? (
        <LoadingSpinner />
      ) : errorBrand ? (
        <Message variant='danger'>{errorBrand}</Message>
      ) : (
        <div>
        <Row>
          {brands.slice(0, 6).map((brand) => (
            <Col key={brand.id}>
              <Brand brand={brand} />
            </Col>
          ))}
        </Row>

        </div>
      )}


<h1>CATEGORIES</h1>
<Link to='categories'>View all</Link>

      {loadingCategory ? (
       <LoadingSpinner />
      ) : errorCategory ? (
        <Message variant='danger'>{errorCategory}</Message>
      ) : (
        <div>
                          {loadingBookmark && <LoadingSpinner />}
{successBookmark && <Message variant='success'>Review Submitted</Message>}
{errorBookmark && <Message variant='danger'>{errorBookmark}</Message>}
        <Row>
          {categories.slice(0, 6).map((category) => (
            <Col key={category.id} >
              <Category category={category} />
            </Col>
          ))}
        </Row>

        </div>
      )}






<h1>Latest Products</h1>
{loading ? (
  <LoadingSpinner />
) : error ? (
  <Message variant='danger'>{error}</Message>
) : (
  <div>
    <Row>
      {products.slice(0, 6).map((product) => (
        <Col key={product.id}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
  </div>
)}

    </div>
  );
}

export default HomeScreen;
