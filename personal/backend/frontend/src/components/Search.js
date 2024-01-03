import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import { Link } from 'react-router-dom';

function Search({ product }) {
  return (
    <div
 
    className="">
        <h6>

        <Link to={`/product/${product._id}`}>
              
              <strong>{product.name}</strong> in <i>{product.category_name}</i>
          </Link>

        </h6>

    </div>
  );
}

export default Search;
