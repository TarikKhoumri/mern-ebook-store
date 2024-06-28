const { ObjectId } = require("mongodb");

class Review {
  constructor(db) {
    this.collection = db.collection("reviews");
  }

  async insertOne(data) {
    return this.collection.insertOne(data);
  }

  async find(query = {}) {
    return this.collection.find(query).toArray();
  }
}

module.exports = Review;
