const express = require("express");
const { getProductsById, getAllProducts } = require("../controllers/productController");
const router = express();

const apicache = require('apicache')

// initialise cache middleware
const cache = apicache.middleware

// order products of individual vendor
router.get('/:shortid', cache('1 minutes'), getProductsById)

// order products of all vendor
router.get('/', cache('1 minutes'), getAllProducts)





  module.exports = router;