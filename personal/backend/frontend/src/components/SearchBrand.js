import React from 'react';
import { Link } from 'react-router-dom';

function SearchBrand({ product }) {
  return (
    <div
 
    className="">
        <h6>

        <Link to={`/brand/${product._id}`}>
              
              <strong>{product.name}</strong>
          </Link>

        </h6>

    </div>
  );
}

export default SearchBrand;
