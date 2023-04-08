const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    user_account_number: {
      type: String,
      required: true,
      unique: true,
    },
    user_bank_code: {
      type: String,
      required: true,
    },
    user_account_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: {} }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
