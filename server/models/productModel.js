import mongoose from "mongoose";

const varietiesSchema = mongoose.Schema({
  size: { type: String, required: true },
  color: { type: String, required: true },
  quantity: { type: Number, required: true },
  images: [],
  price: { type: String, required: true },
});

const productSchema = mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },

    product_description: {
      type: String,
      required: true,
    },

    product_varities: [varietiesSchema],
  },
  {
    timestamps: true, // serves as date_uploaded and date_edited,
  }
);

const Products = mongoose.model("Product", productSchema);

export default Products;
