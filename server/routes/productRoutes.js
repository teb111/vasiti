import express, { Router } from "express";
const router = express.Router();
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProducts,
  getProduct,
} from "../controller/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getProduct);
router.route("/add").post(addProduct);
router.route("/edit/:id").put(editProduct);
router.route("/delete/:id").delete(deleteProduct);

export default router;
