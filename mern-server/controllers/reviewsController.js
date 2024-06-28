const Review = require("../models/review");

async function createReview(req, res, db) {
  const reviewModel = new Review(db);
  const review = req.body;
  const result = await reviewModel.insertOne(review);
  res.send(result);
}

async function getAllReviews(req, res, db) {
  const reviewModel = new Review(db);
  const reviews = await reviewModel.find();
  res.send(reviews);
}

module.exports = {
  createReview,
  getAllReviews,
};
