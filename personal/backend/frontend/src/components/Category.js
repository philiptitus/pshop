import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Category({ category }) {
  return (
    <Card className="my-3 p-3 rounded" style={{ height: '80%', width:'100%' }}>
      <Link to={`/category/${category._id}`}>
        <Card.Img src={category.image} />
            <strong>{category.name}</strong>
      </Link>
    </Card>
  );
}

export default Category;
