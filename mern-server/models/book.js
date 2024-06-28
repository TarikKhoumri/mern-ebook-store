const { ObjectId } = require("mongodb");

class Book {
  constructor(db) {
    this.collection = db.collection("books");
  }

  async insertOne(data) {
    return this.collection.insertOne(data);
  }

  async find(query = {}) {
    return this.collection.find(query).toArray();
  }

  async findOneById(id) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async updateOne(id, data) {
    return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  }

  async deleteOne(id) {
    return this.collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = Book;
