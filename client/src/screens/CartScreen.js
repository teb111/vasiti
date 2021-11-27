import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../action/cartAction";
import Header from "../components/Header";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id));
    }
  }, [id]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/checkout", { replace: true });
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col md={8}>
            <h1>Shopping Cart</h1>

            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={item?.product_varities?.[0].images?.[0]}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item?.product_varities?.[0].price}</Col>
                    <Col md={2}>
                      Qty: {item?.product_varities?.[0].quantity}
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>
                    SubTotal (
                    {cartItems.reduce(
                      (acc, item) =>
                        acc + Number(item?.product_varities?.[0].quantity),
                      0
                    )}
                    ) item(s){" "}
                  </h2>
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
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed to checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;
