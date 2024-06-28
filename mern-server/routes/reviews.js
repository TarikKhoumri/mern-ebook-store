const express = require("express");
const router = express.Router();
const { createReview, getAllReviews } = require("../controllers/reviewsController");
const connectToDatabase = require("../configs/database");

router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

router.post("/create-review", (req, res) => createReview(req, res, req.db));
router.get("/all-reviews", (req, res) => getAllReviews(req, res, req.db));

module.exports = router;
