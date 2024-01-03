import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { listProductDetails, updateProduct, listBrands, listCategories } from '../actions/productActions';
        import LoadingSpinner from '../components/LoadingSpinner';

import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const FileUpload = ({ onChange }) => {
  return (
    <label htmlFor="image">
      Choose a file
      <input type="file" id="image" onChange={onChange} style={{ display: "none" }} />
    </label>
  );
};

function ProductEditScreen() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('') 
  const [countinStock, setCountinStock] = useState('');
  const [description, setDescription] = useState(false) 
  const [uploading, setUploading] = useState(false) 



  // Move the useSelector call out of the submitHandler function
  const productDetails = useSelector(state => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const { success:successUpdate,error:errorUpdate, loading:loadingUpdate } = productUpdate;

  const categoryList = useSelector((state) => state.categoryList);
  const { error:errorCategory, loading:loadingCategory, categories } = categoryList;

  const brandList = useSelector((state) => state.brandList);
  const { error:errorBrand, loading:loadingBrand, brands } = brandList;

  const [searchText, setSearchText] = useState("");

  
  const submitHandler = async (e) => {
    e.preventDefault();  
    const brandValue = e.target.value; // Assuming e is the event object from the form submission

    const selectedBrand = brands.find((brand) => brand.name === brandValue);
  
      dispatch(
        updateProduct({
          _id: id,
          name,
          price,
          image,
          brand,// Assign the Brand ID to the product
          category,
          countinStock,
          description,
        })
      );
    
  };

  // useEffect to handle redirection on successful registration
  useEffect(() => {
    if (successUpdate) {
      dispatch({type: PRODUCT_UPDATE_RESET})
      navigate('/admin/productlist')
    }
    else{
      if (!product.name || product._id !== Number(id)) {
        dispatch(listProductDetails(id))
        dispatch(listCategories(searchText));
        dispatch(listBrands(searchText));



        
      }
      else{
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand_name)
        setCategory(product.category_name)
        setCountinStock(product.countinStock)
        setDescription(product.description)

      
      
      }

    }
  }, [dispatch, product, id, navigate, successUpdate, searchText]);


const uploadFileHandler = async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image', file)
  formData.append('product_id', id)

  setUploading(true)
  try {
    const config = {
      headers:{
        'Content-Type':'multipart/form-data'

      }
    }
    const{data} = await axios.post(`/api/products/upload/`, formData, config)

    setImage(data)
    setUploading(false)
    
  } catch (error) {
    setUploading(false)
  }

}

  return (
    <div>
      <Link to='/admin/productlist'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? <LoadingSpinner /> : error ? <Message variant='danger'>{error}</Message>:
        (



          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <FileUpload onChange={uploadFileHandler} />
              {uploading && <LoadingSpinner />}
              {image && <img src={image} alt={name} style={{ width: '100px' }} />}
            </Form.Group>

            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                as='select'
                placeholder="Enter brand"
                value={brand || ''}  // Set a default value if brand is null
                onChange={(e) => setBrand(e.target.value)}
              >
              <option value=''>Select A Brand Below</option>
              {brands.length === 0 ? (
      <Message variant="info">No Brands Available</Message>
    ) : (
      brands.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))
    )}


              </Form.Control>
            </Form.Group>

            <Form.Group controlId="countinstock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter countinstock"
                value={countinStock}
                onChange={(e) => setCountinStock(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as='select'
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
              <option value=''>Select A Category Below</option>
              {categories.length === 0 ? (
      <Message variant="info">No Categories Available</Message>
    ) : (
      categories.map((item, index) => (
        <option key={index} value={item.name}>
          {item.name}
        </option>
      ))
    )}


              </Form.Control>
            </Form.Group>


            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
            {loadingUpdate && <LoadingSpinner />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
