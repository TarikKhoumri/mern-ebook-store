const Book = require("../models/book");

async function uploadBook(req, res, db) {
  const bookModel = new Book(db);
  const data = req.body;
  const result = await bookModel.insertOne(data);
  res.send(result);
}

async function getAllBooks(req, res, db) {
  const bookModel = new Book(db);
  let query = {};
  if (req.query?.category) {
    query = { category: req.query.category };
  }
  const result = await bookModel.find(query);
  res.send(result);
}

async function updateBook(req, res, db) {
  const bookModel = new Book(db);
  const id = req.params.id;
  const updateBookData = req.body;
  const result = await bookModel.updateOne(id, updateBookData);
  res.send(result);
}

async function deleteBook(req, res, db) {
  const bookModel = new Book(db);
  const id = req.params.id;
  const result = await bookModel.deleteOne(id);
  res.send(result);
}

async function getBookById(req, res, db) {
  const bookModel = new Book(db);
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(400).send("Invalid ID format");
  }

  const result = await bookModel.findOneById(id);
  if (!result) {
    return res.status(404).send("Book not found");
  }

  res.send(result);
}

module.exports = {
  uploadBook,
  getAllBooks,
  updateBook,
  deleteBook,
  getBookById,
};
