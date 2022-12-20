const mongoose = require("mongoose");
const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    shortid: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      validate: [isEmail, "please enter a valid email"],
    },
    password: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    business_name: {
      type: String,
      required: true,
    },

    country: {
      type: String,
      required: true,
      default: "",
      enum: [
        "Nigeria",
        "Cote D'Ivoire",
        "Gambia",
        "Ghana",
        "Liberia",
        "Kenya",
        "Rwanda",
        "Tanzania",
        "Uganda",
        "Sierra Leone",
        "United Kingdom",
      ],
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
