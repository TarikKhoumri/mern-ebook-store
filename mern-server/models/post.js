const { ObjectId } = require("mongodb");

class Post {
  constructor(db) {
    this.collection = db.collection("posts");
  }

  async insertOne(data) {
    return this.collection.insertOne(data);
  }

  async find(query = {}) {
    return this.collection.find(query).toArray();
  }
}

module.exports = Post;
