const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_description: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      default: "",
      required: true,
      enum: [
        "phones & accessories",
        "fashion",
        "electronics",
        "computing",
        "groceries",
        "health & beauty",
      ],
    },
    quantity: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
