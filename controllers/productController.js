const mongoose = require("mongoose");
const Product = require("../models/Product");
const User = require("../models/User");

module.exports = {
  addProductPage: async (req, res) => {
    let user = await User.findById(req.session.user);
    res.render("addProducts", {
      layout: "dashboard",
      first_name: user.first_name,
      id: user.shortid,
      business_name: user.business_name,
    });
  },
  addProduct: async (req, res) => {
    const {
      product_name,
      product_description,
      product_price,
      product_category,
      quantity,
    } = req.body;

    try {
      let product = new Product({
        product_name,
        product_description,
        product_price,
        product_category,
        quantity,
        user: req.session.user,
      });
      if (req.file) {
        product.product_image = req.file.path;
      }
      product.save((err, product) => {
        if (err) {
          // console.log(err);
          req.session.msg = {
            type: "danger",
            message: "all fields are required",
          };
          res.redirect("/add-product");
        } else {
          req.session.msg = {
            type: "success",
            message: "product added successfully",
          };
          res.redirect("/add-product");
        }
      });
    } catch (error) {
      res.render("error/500");
    }
  },
  //   all vendors product
  getAllUserProducts: async (req, res) => {
    try {
      let user = await User.findById(req.session.user)
      let product = await Product.find({ user: req.session.user })
        .sort({ createdAt: -1 })
        .lean();
      if (!product) {
        res.render("error/404");
      } else {
        res.render("storeFront", {
          layout: "dashboard",
          product,
          first_name: user.first_name,
          id: user.shortid,
          business_name: user.business_name,

        });
      }
    } catch (error) {
      res.render("error/500");
    }
  },
  // render edit page
  editPage: async (req, res) => {
    try {
      let user = await User.findOne(req.session.user);
      const product = await Product.findOne({
        _id: req.params.id,
      }).lean();

      if (!product) {
        return res.render("error/404");
      }

      if (product.user != req.session.user._id) {
        res.redirect("/");
      } else {
        res.render("edit", {
          product,
          layout: 'dashboard'
        });
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },
  // update products
  editProduct: async (req, res) => {
    try {
      let product = await Product.findById(req.params.id).lean();
      let user = await User.findOne(req.session.user);
      const product_name = req.body.product_name
      const product_description = req.body.product_description
      const product_price = req.body.product_price
      const product_image = req.file.path
      const  product_category = req.body.product_category
      const  quantity = req.body.quantity

      if (!product) {
        res.render('error/404')
      } else if (req.session.user._id != product.user) {
        // res.redirect('/products')
        req.session.msg = {
          type: "danger",
          message: "you cannot edit this product",
        };
        res.redirect("/storefront");
      } else {
        product = await Product.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              product_name,
              product_description,
              product_price,
              product_image,
              product_category,
              quantity,
            }
          },
  
          {
            new: true,
            runValidators: true,
          }
        );
        req.session.msg = {
          type: "success",
          message: "product updated successfully",
        };
        res.redirect("/storefront");
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },
  // remove a prdocut from the database
  deleteProduct: async (req, res) => {
    try {
      let product = await Product.findById({
        _id: req.params.id,
      }).lean();
      let user = await User.findOne(req.session.user);

      if (!product) {
        req.session.msg = {
          type: "danger",
          message: "product does not exist",
        };
        res.redirect("/storefront");
      } else if (user.id != product.user) {
        // res.redirect('/products')
        req.session.msg = {
          type: "danger",
          message: "you cannot edit product",
        };
        res.redirect("/storefront");
      } else {
        product = await Product.findByIdAndDelete({ _id: req.params.id });
        req.session.msg = {
          type: "success",
          message: "product deleted successfully",
        };
        res.redirect("/storefront");
      }
    } catch (err) {
      console.error(err);
      return res.render("error/500");
    }
  },
  // get products of vendors by their ID
  getProductsById: async (req, res) => {
    try {
      let user = await User.findOne({shortid: req.params.shortid})
      let product = await Product.find({user}).lean()
  
      if (!product) {
        return res.render('error/404')
      }else {
        res.render('product', {
          product
        })
        console.log(product)
        // res.json(product)
      }
    } catch (err) {
      console.error(err)
      res.render('error/404')
    }
  },
  getAllProducts: async(req, res) => {
    try {
      let products = await Product.find().lean()
      if (!products) {
        return res.render('error/404')
      }
      else{
        res.render('products',{
          products
        })
      }
      
    } catch (error) {
      res.render('error/500')
    }
  }
};
