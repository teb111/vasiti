import React, { useEffect, useState } from "react";
import {
  Col,
  Image,
  ListGroup,
  Row,
  Button,
  Form,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { listProductDetails } from "../action/productAction";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function ProductScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const addToCartHandler = () => {
    // this redirects us to cart page with the specific product id and the product qty chosen by the user
    // e.g http://localhost:3000/cart/601f29cd01dda224a093eb0e
    navigate(`/cart/${id}`, { replace: true });
  };

  return (
    <>
      <Header />
      <Container>
        <Link className="btn btn-dark my-3 rounded" to="/">
          Go Back
        </Link>
        {loading ? (
          <h2>loading....</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Row>
              <Col md={6}>
                <Image
                  src={product?.product_varities?.[0].images?.[0]}
                  alt={product.product_name}
                  fluid
                ></Image>
                <Row
                  style={{
                    marginTop: "10px",
                  }}
                >
                  <Col md={6}>
                    <h5>More Images &gt; &gt;</h5>
                    <Image
                      src={product?.product_varities?.[0].images?.[1]}
                      alt={product.product_name}
                      fluid
                      width="80"
                      height="80"
                    ></Image>{" "}
                    &nbsp;
                    <Image
                      src={product?.product_varities?.[0].images?.[2]}
                      alt={product.product_name}
                      fluid
                      width="80"
                      height="80"
                    ></Image>
                  </Col>
                </Row>
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>{product.product_name}</h3>
                  </ListGroup.Item>
                  <ListGroup.Item></ListGroup.Item>

                  <ListGroup.Item>
                    Description : <p>{product?.product_description}</p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>
                          <strong>
                            ${product?.product_varities?.[0].price}
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Size:</Col>
                        <Col>
                          <strong>{product?.product_varities?.[0].size}</strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>{product?.product_varities?.[0].quantity}</Col>
                      </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
}
