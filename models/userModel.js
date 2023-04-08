const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email address!"],
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email address!"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: {} }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
