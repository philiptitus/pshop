import React from 'react';
import { Link } from 'react-router-dom';

function SearchCategory({ product }) {
  return (
    <div
 
    className="">
        <h6>

        <Link to={`/category/${product._id}`}>
              
              <strong>{product.name}</strong>
          </Link>

        </h6>

    </div>
  );
}

export default SearchCategory;
