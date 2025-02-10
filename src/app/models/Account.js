const mongoose = require("mongoose");
const formatJSONOutput = require("./formatJSONOutput");

// ACCOUNT SCHEMA
const accountSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },
    contactEmail: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    profileImage: {
      type: String,
    },
    // Identifier linked to external payment provider (Stripe)
    billingId: {
      type: String,
      unique: true, // Ensures uniqueness for Stripe customer IDs
      sparse: true, // Allows null values while keeping uniqueness
      validate: function (value) {
        return value.includes("cus_");
      },
    },
    // Plan identifier corresponding to billing subscription
    priceId: {
      type: String,
      validate: function (value) {
        return value.includes("price_");
      },
    },
    // Determines if the account has active privileges
    isAuthorized: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

accountSchema.plugin(formatJSONOutput);

module.exports =
  mongoose.models.Account || mongoose.model("Account", accountSchema);
