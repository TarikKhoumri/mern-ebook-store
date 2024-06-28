const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;

// Create an Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const booksRoutes = require("./routes/books");
const reviewsRoutes = require("./routes/reviews");
const postsRoutes = require("./routes/posts");
const paymentsRoutes = require("./routes/payments");

// Use routes
app.use("/api/books", booksRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/posts", postsRoutes);
app.use("/api/payments", paymentsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
