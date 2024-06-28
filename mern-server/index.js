const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PVHx42Nhrh2BFv207rIdRNzDaRuzeoVpQWPPyjCg4wB5ESPlnv5iHSIlp8ikH6ieNKkjNcpNCP0LyF512tdhz5q00GHBtU7tm'); // Replace with your Stripe secret key

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// MongoDB configuration
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://mern-book-store:jo7BN6b1oXS0u3zm@cluster0.umtzvh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // References to collections
    const bookCollections = client.db("BookInventory").collection("books");
    const reviewsCollection = client.db("BookInventory").collection("reviews");
    const postsCollection = client.db("BookInventory").collection("posts");

    // Insert a book to db: Post Method
    app.post("/upload-book", async (req, res) => {
      const data = req.body;
      const result = await bookCollections.insertOne(data);
      res.send(result);
    });

    // Get all books & find by a category from db
    app.get("/all-books", async (req, res) => {
      let query = {};
      if (req.query?.category) {
        query = { category: req.query.category };
      }
      const result = await bookCollections.find(query).toArray();
      res.send(result);
    });

    // Update a book method
    app.patch("/book/:id", async (req, res) => {
      const id = req.params.id;
      const updateBookData = req.body;
      const filter = { _id: new ObjectId(id) };
      const updatedDoc = { $set: { ...updateBookData } };
      const options = { upsert: false };

      const result = await bookCollections.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // Delete an item from db
    app.delete("/book/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.deleteOne(filter);
      res.send(result);
    });

    // Get a single book data
    app.get("/book/:id", async (req, res) => {
      const id = req.params.id;

      // Ensure the ID is a valid ObjectId
      if (!ObjectId.isValid(id)) {
        return res.status(400).send("Invalid ID format");
      }

      const filter = { _id: new ObjectId(id) };
      const result = await bookCollections.findOne(filter);

      if (!result) {
        return res.status(404).send("Book not found");
      }

      res.send(result);
    });

    // Create a new review
    app.post("/create-review", async (req, res) => {
      const review = req.body;
      const result = await reviewsCollection.insertOne(review);
      res.send(result);
    });

    // Get all reviews
    app.get("/all-reviews", async (req, res) => {
      const reviews = await reviewsCollection.find().toArray();
      res.send(reviews);
    });

    // Get all posts
    app.get("/all-posts", async (req, res) => {
      const posts = await postsCollection.find().toArray();
      res.send(posts);
    });

    // Add a new post
    app.post("/add-post", async (req, res) => {
      const newPost = req.body;
      const result = await postsCollection.insertOne(newPost);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.post("/create-checkout-session", async (req, res) => {
    const { price, bookTitle } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: bookTitle,
              },
              unit_amount: price * 100, // Convert dollars to cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:3000/success', // Replace with your success URL
        cancel_url: 'http://localhost:3000/cancel', // Replace with your cancel URL
      });
  
      res.json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/orders", async (req, res) => {
    try {
      const charges = await stripe.charges.list({
        limit: 100,
      });
      res.json(charges.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
