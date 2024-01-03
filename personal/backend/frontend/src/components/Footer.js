import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, listBrands, listCategories } from '../actions/productActions';
import Product from '../components/Product';
import Search from '../components/Search'
import second from '../components/SearchBrand'
import SearchCategory from '../components/SearchCategory'

        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import { Link, useNavigate } from 'react-router-dom'
import SearchBrand from '../components/SearchBrand';
import "../css/footer.css"

const Footer = ({ location }) => {

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

  const handleSearch = () => {
    const searchQuery = searchText.trim() !== '' ? `?search=${searchText}` : '';
    const newLocation = { pathname: location.pathname, search: searchQuery };
    navigate(newLocation);
  };



  return (
    <div>

      {/* FOOTER START */}
      <div className="footer">
        <div className="contain">
          <div className="col">
 
            <ul>
            <h1 style={{
              alignItems:"left",
              margin:"auto"
            }}>Categories</h1>


            {loadingCategory ? (
       <LoadingSpinner />
      ) : errorCategory ? (
        <Message variant='danger'>{errorCategory}</Message>
      ) : (
        <Row>
          {categories.length < 1  && (
          <Message variant='success'>Nothing Here</Message>
          )}
          {categories.slice(0,4).map((product) => (
            <ul key={product._id} sm={12} md={6} lg={4} xl={3}>
              <li>     
           <SearchCategory product={product} />
          </li>
            </ul>
          ))}
        </Row>
      )}


            </ul>
          </div>
          <div className="col">
            <h1>Brands</h1>
            <ul>
      {loadingBrand ? (
       <LoadingSpinner />
      ) : errorBrand ? (
        <Message variant='danger'>{errorBrand}</Message>
      ) : (
        <Row>
          {brands.length < 1  && (
          <Message variant='success'>Nothing Here</Message>
)}
          {brands.slice(0,4).map((product) => (
            <ul key={product._id} sm={12} md={6} lg={4} xl={3}>
              <li>     
           <SearchBrand product={product} />
          </li>
            </ul>
          ))}
        </Row>
      )}


            </ul>
          </div>

          <div className="col social">
            <h1>Social</h1>
            <ul>
              <li><img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" alt="social-icon" width="32" style={{ width: '32px' }} /></li>
              <li><img src="https://www.svgrepo.com/show/473495/youtube.svg" alt="social-icon" width="32" style={{ width: '32px' }} /></li>
              <li><img src="https://www.svgrepo.com/show/448234/linkedin.svg" alt="social-icon" width="32" style={{ width: '32px' }} /></li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
      {/* END OF FOOTER */}
      <Col className="text-center py-3">Copyright &copy; <Link 
      style={{
        fontWeight:'bolder',
        color:'cadetblue'
      }}
      to='https://mrphilip.pythonanywhere.com/'>Philip Titus</Link> All Rights Reserved</Col>

    </div>
  );
};

export default Footer;



{/* <Col className='text-center py-4'>Copyright &copy; P-Shop</Col> */}
