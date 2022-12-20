const mongoose = require("mongoose");


const AccountSchema = new mongoose.Schema(
  {

    business_type: {
      type: String,
      required: true,
      default: "",
      enum: ["not registered", "registered"],
    },
    product_type: {
      type: String,
      required: true,
      default: "",
      enum: [
        "phones & accessories",
        "fashion",
        "electronics",
        "computing",
        "groceries",
        "health & beauty",
      ],
    },
    address: {
      type: String,
      required: true
    },
    bank_name: {
      type: String,
      required: true,
      default: 'GTBank'
    },
    acct_number: {
      type: String,
      max: 10,
      required:true
    },
    BVN: {
      type: String,
      max: 11,
      required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", AccountSchema);
