const Post = require("../models/post");

async function addPost(req, res, db) {
  const postModel = new Post(db);
  const newPost = req.body;
  const result = await postModel.insertOne(newPost);
  res.send(result);
}

async function getAllPosts(req, res, db) {
  const postModel = new Post(db);
  const posts = await postModel.find();
  res.send(posts);
}

module.exports = {
  addPost,
  getAllPosts,
};
