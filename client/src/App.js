import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />}></Route>
          <Route path="/product/:id" element={<ProductScreen />}></Route>
          <Route path="/cart/:id" element={<CartScreen />} exact />
          <Route path="/checkout" element={<CheckoutScreen />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
