const express = require("express");
const {
  getCurrentUser,
  logoutUser,
  accountSettings,
  accountSettingsPage,
  getOverviewPage,
} = require("../controllers/indexController");
const {
  addProductPage,
  getAllUserProducts,
  editProduct,
} = require("../controllers/productController");
const { ensureAuth } = require("../middleware/auth");
const router = express();
const apicache = require('apicache')
const Product = require('../models/Product')

// initialise cache middleware
const cache = apicache.middleware

// get dashboard of user
router.get("/dashboard",ensureAuth, getCurrentUser);

// get the overview
router.get("/overview", cache('1 minutes'), ensureAuth, getOverviewPage);

// get add product page
router.get("/add-product", ensureAuth, addProductPage);

// display products of vendors
router.get("/storefront", cache('1 minutes'), ensureAuth, getAllUserProducts);

// logout
router.get("/logout", logoutUser);

// account-settings page
router.get("/account-setting", ensureAuth, accountSettingsPage);

// complete account settings
router.post("/account-settings", ensureAuth, accountSettings);

router.get('/', (req, res) => {
    res.render('index')
})

// payment
router.get('/payment/:id', async(req, res) => {
    try {
        let product = await Product.findById({_id: req.params.id}).lean()
        if (!product) {
            res.render('error/404')
        }
        else{
            res.render('payment', {
                amount: product.product_price
            })
        }
        
    } catch (error) {
        console.log(error)
    }
    
  })

//   router.get("/:id", ensureAuth, cache("10 minutes"), async (req, res) => {
//     try {
//       let product = await Product.findById({ _id: req.params.id });
//       if (!product) {
//         res.status(400).json({ error: "No products found" });
//       } else {
//           let user = req.session.user;    
//         res.render("order", {
//           user_name: user.name,
//           user_email: user.email,
//           product_id: product._id,
//           product_name: product.product_name,
//           product_description: product.product_description,
//           product_amount: parseFloat(product.product_amount),
//           product_image: product.product_image
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   });

module.exports = router;
