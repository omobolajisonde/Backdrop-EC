const mongoose = require("mongoose");

const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://localhost:27017/Backdrop";

module.exports = async function () {
  await mongoose.connect(DATABASE_URI);
};
