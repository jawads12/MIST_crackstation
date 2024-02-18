const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
