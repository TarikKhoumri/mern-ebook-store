const express = require("express");
const router = express.Router();
const { addPost, getAllPosts } = require("../controllers/postsController");
const connectToDatabase = require("../configs/database");

router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

router.post("/add-post", (req, res) => addPost(req, res, req.db));
router.get("/all-posts", (req, res) => getAllPosts(req, res, req.db));

module.exports = router;
