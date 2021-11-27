import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Message from "../components/Message";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import Header from "../components/Header";

export default function CheckoutScreen() {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <>
      <Header />

      <Container>
        <h1>Order 61a23e81b298a100048461f3</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Shipping</h2>
                <p>
                  <strong>Name: </strong> John Doe
                </p>

                {/* remember the populate we did in the backend orderController */}
                <p>
                  <strong>Email: </strong>
                  <a href="#">john@gmail.com</a>
                </p>
                <p>
                  <strong>Address:</strong>
                  10, Bentely street, Chicago, 100001, USA
                </p>

                <Message variant="danger">Not Delivered</Message>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method:</strong>
                  Skrill
                </p>

                <Message variant="danger">Not Paid</Message>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Order Items</h2>
                <ListGroup variant="flush">
                  {cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item?.product_varities?.[0].images?.[0]}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          Qty: {item?.product_varities?.[0].quantity}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>
                      $
                      {cartItems
                        .reduce(
                          (acc, item) =>
                            acc +
                            Number(item?.product_varities?.[0].quantity) *
                              Number(item?.product_varities?.[0].price),
                          0
                        )
                        .toFixed(2)}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col>$20</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>$15</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>$626</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
