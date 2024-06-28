const express = require("express");
const router = express.Router();
const { uploadBook, getAllBooks, updateBook, deleteBook, getBookById } = require("../controllers/booksController");
const connectToDatabase = require("../configs/database");

router.use(async (req, res, next) => {
  req.db = await connectToDatabase();
  next();
});

router.post("/upload-book", (req, res) => uploadBook(req, res, req.db));
router.get("/all-books", (req, res) => getAllBooks(req, res, req.db));
router.patch("/book/:id", (req, res) => updateBook(req, res, req.db));
router.delete("/book/:id", (req, res) => deleteBook(req, res, req.db));
router.get("/book/:id", (req, res) => getBookById(req, res, req.db));

module.exports = router;
