import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.product_varities[0].images[0]}
          variant="top"
          loading="lazy"
          height="190"
        />
      </Link>

      <Card.Body as="div">
        <Link to={`/product/${product._id}`}>
          <strong>{product.product_name}</strong>
        </Link>

        <Card.Text as="h3">${product.product_varities[0].price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
