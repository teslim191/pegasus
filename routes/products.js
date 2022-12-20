const express = require("express");
const {
  addProduct,
  getAllUserProducts,
  editProduct,
  deleteProduct,
  editPage,
} = require("../controllers/productController");
const upload = require("../middleware/upload");
const Product = require("../models/Product");
const User = require("../models/User");
const router = express();

const apicache = require('apicache')

// initialise cache middleware
const cache = apicache.middleware

// add a product
router.post("/add-product", upload.single("product_image"), addProduct);

// get all products of a vendor
router.get("/", cache('1 minutes'), getAllUserProducts);

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.get('/editpage/:id', cache('1 minutes'), editPage)

// edit products of a vendor
router.put("/:id", upload.single('product_image'), editProduct);

// delete products of a vendor
router.delete("/delete/:id", deleteProduct);

module.exports = router;
