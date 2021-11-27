import asyncHandler from "express-async-handler";
import Products from "../models/productModel.js";

//get Product and it's varieties
// route GET /api/product
const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({});
  res.json(products);
});

//get Product by id
// route GET /api/product/:id
const getProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//add a Product and it's varieties
// route POST /api/product/add

const addProduct = asyncHandler(async (req, res) => {
  const { product_name, product_description, product_varities } = req.body;

  const { size, color, quantity, images, price } = product_varities[0];

  const product_exists = await Products.findOne({ product_name });

  if (product_exists) {
    throw new Error("Product already Exists");
  }

  const newProduct = await Products.create({
    product_name,
    product_description,
    product_varities: {
      size,
      color,
      quantity,
      images,
      price,
    },
  });

  if (newProduct) {
    res.status(201).json(newProduct);
  } else {
    res.status(400);
    throw new Error("Something went wrong");
  }
});

const editProduct = asyncHandler(async (req, res) => {
  const product = await Products.findOne({ _id: req.params.id });

  const { product_name, product_description, product_varities } = req.body;

  const { size, color, quantity, images, price } = product_varities[0];

  if (product) {
    product.product_name = product_name;
    product.product_description = product_description;
    product.product_varities = {
      size,
      color,
      quantity,
      images,
      price,
    };
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    console.log("An error occured");
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product Deleted Succesfully" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProduct, addProduct, editProduct, deleteProduct };
