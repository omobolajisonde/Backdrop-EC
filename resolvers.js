const axios = require("axios");
const levenshtein = require("fast-levenshtein");

const User = require("./models/userModel");
const Account = require("./models/accountModel");
const catchAsync = require("./utils/catchAsync");

const { SECRET_KEY } = process.env;

const resolvers = {
  Query: {
    hello: () => "Welcome to Backdrop!",
    getAccountName: catchAsync(async (_, args) => {
      const { bank_code, account_number } = args;
      const user = await Account.findOne({
        user_bank_code: bank_code,
        user_account_number: account_number,
      });
      if (user) {
        return user.user_account_name;
      } else return null;
    }),
  },

  Mutation: {
    addBankAccount: catchAsync(async (_, args) => {
      const { user_account_number, user_bank_code, user_account_name } =
        args.accountDetails;
      const response = await axios({
        baseURL: "https://api.paystack.co",
        // `url` is the server URL that will be used for the request
        url: `/bank/resolve?account_number=${user_account_number}&bank_code=${user_bank_code}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${SECRET_KEY}`,
        },
      });
      const api_account_name = response.data.data.account_name;
      const distance = levenshtein.get(
        user_account_name.toLowerCase(),
        api_account_name.toLowerCase()
      );
      console.log(distance);
      if (distance <= 2) {
        const user = await User.findOne({ email: args.email });
        if (!user) throw new Error("User not found!");
        user.is_verified = true;
        await user.save();
        await Account.create({
          user_id: user._id,
          user_account_name,
          user_account_number,
          user_bank_code,
        });
        return true;
      }
      return false;
    }),
  },
};

module.exports = resolvers;
