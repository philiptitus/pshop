import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Brand({ brand }) {
  return (
    <Card  className="my-3 p-3 rounded"  style={{ height: '80%' ,width:'100%' }}>
      <Link to={`/brand/${brand._id}`}>
        <Card.Img src={brand.image} />

            <strong>{brand.name}</strong>

      </Link>
    </Card>
  );
}

export default Brand;
