const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter the name"],
  },
  description: {
    type: String,
    required: [true, "Please Enter the Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Price"],
    maxLength: [8, "Price Cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter the product Category"],
  },
  stock: {
    type: Number,
    required: [true, "Please Enter the Stock"],
    maxLength: [4, "Stock cannot exceed 4 digit"],
    default: 1,
  },
  noOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
