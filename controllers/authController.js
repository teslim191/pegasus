const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const shortid = require("shortid");

module.exports = {
  // register page
  registerPage: (req, res) => {
    res.render("register");
  },
  //   register user
  registerUser: async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
      phone,
      business_name,
      country,
    } = req.body;
    let validPassword =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,12}$/;

    try {
      if (
        !first_name ||
        !last_name ||
        !email ||
        !password ||
        !phone ||
        !business_name ||
        !country
      ) {
        // res.status(400).json({ message: "please enter all required fields" });
        req.session.msg = {
          type: "danger",
          message: "please enter required fields",
        };
        res.redirect("/auth/register");
      } else if (password.length < 8 || password.length > 12) {
        req.session.msg = {
          type: "danger",
          message: "password should be between 8 and 12 characters",
        };
        res.redirect("/auth/register");
      } else if (!validPassword.test(password)) {
        req.session.msg = {
          type: "danger",
          message:
            "password should contain atleast one number and one special character",
        };
        res.redirect("/auth/register");
      } else {
        let user = await User.findOne({ email });
        if (user) {
          req.session.msg = {
            type: "danger",
            message: "user already exists",
          };
          res.redirect("/auth/register");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedpassword = await bcrypt.hash(password, salt);
          user = await User.create({
            first_name,
            last_name,
            shortid: shortid.generate(),
            email,
            password: hashedpassword,
            phone,
            business_name,
            country,
          });
          req.session.msg = {
            type: "success",
            message: "Account created, you can login",
          };
          res.redirect("/auth/register");
        }
      }
    } catch (error) {
      console.log(error);
      // res.status(500).json({ error: "server error" });
      res.render("error/500");
    }
  },
  //   login page
  loginPage: async (req, res) => {
    res.render("login");
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        req.session.msg = {
          type: "danger",
          message: "please enter required fields",
        };
        res.redirect("/auth/login");
      } else {
        let user = await User.findOne({ email });
        if (!user) {
          req.session.msg = {
            type: "danger",
            message: "user does not exist",
          };
          res.redirect("/auth/login");
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            req.session.msg = {
              type: "danger",
              message: "incorrect password",
            };
            res.redirect("/auth/login");
          } else {
            req.session.user = user;
            // req.flash("success_msg", "account created successfully")
            res.redirect("/dashboard");
            req.session.msg = {
              type: "success",
              message: `welcome ${user.first_name}`,
            };
            // res.json({ welcome: `logged in as ${user.first_name}` });
          }
        }
      }
    } catch (error) {
      // console.log(error);
      res.render('error/500')
    }
  },
};
