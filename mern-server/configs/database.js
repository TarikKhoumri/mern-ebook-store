const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://mern-book-store:jo7BN6b1oXS0u3zm@cluster0.umtzvh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let dbClient;

const connectToDatabase = async () => {
  if (!dbClient) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    await client.connect();
    dbClient = client;
  }
  return dbClient.db("BookInventory");
};

module.exports = connectToDatabase;
