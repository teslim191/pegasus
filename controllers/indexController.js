const mongoose = require("mongoose");
const User = require("../models/User");
const Account = require("../models/Account");

module.exports = {
  getCurrentUser: async (req, res) => {
    try {
      let user = await User.findById(req.session.user);
      if (!user) {
        res.render("error/404");
        // res.status(404).json({ error: "user does not exist" });
      } else {
        res.render("overview", {
          first_name: user.first_name,
          id: user.shortid,
          business_name: user.business_name,
          layout: "dashboard",
        });
      }
    } catch (error) {
      res.render("error/500");
      // console.log(error);
    }
  },
  // overview page
  getOverviewPage: async (req, res) => {
    let user = await User.findById(req.session.user).lean();
    res.render("overview", {
      layout: "dashboard",
      first_name: user.first_name,
      id: user.shortid,
      business_name: user.business_name,
    });
  },
  // logout user
  logoutUser: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.redirect("/auth/login");
    });
  },

  accountSettings: async (req, res) => {
    const {
      business_type,
      product_type,
      address,
      bank_name,
      acct_number,
      BVN,
    } = req.body;
    try {
      // let account = await Account.findById({user: req.session.user._id}).lean();
      if (
        !business_type ||
        !product_type ||
        !address ||
        !bank_name ||
        !acct_number ||
        !BVN
      ) {
        req.session.msg = {
          type: "danger",
          message: "All fields are required",
        };
        res.redirect("/account-setting");
      } else {
        let account = await Account.findOne({ acct_number });
        if (account) {
          req.session.msg = {
            type: "danger",
            message: "Account already complete",
          };
          res.redirect("/account-setting");
        } else {
          account = await Account.create({
            business_type,
            product_type,
            address,
            bank_name,
            acct_number,
            BVN,
            user: req.session.user._id,
          });
          account.save();
          req.session.msg = {
            type: "success",
            message: "Account Completed Successfully",
          };
          res.redirect("/account-setting");
        }
      }
    } catch (error) {
      console.log(error);
      res.render("error/500");
    }
  },
  // account settings page
  accountSettingsPage: async (req, res) => {
    let user = await User.findById(req.session.user);
    if (!user) {
      res.render("error/404");
    } else {
      res.render("account-settings", {
        first_name: user.first_name,
        id: user.shortid,
        business_name: user.business_name,
        layout: "dashboard",
      });
    }
  },
};
