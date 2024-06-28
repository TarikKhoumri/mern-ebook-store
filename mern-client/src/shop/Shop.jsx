import React, { useEffect, useState } from "react";
import { Card } from "flowbite-react";
import { loadStripe } from "@stripe/stripe-js";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PVHx42Nhrh2BFv24CBlkdpEL738Sz3e4cLyyzbFBjzVUriJMKdC34ZClWx2we81BM4OxROS41VBW37A4rPSTphl00QUHq46op"
); // Replace with your Stripe public key
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substr(0, maxLength) + "...";
};
const Shop = () => {
  const [books, setBooks] = useState([]);
  const [expandedBookId, setExpandedBookId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);
  const handleBuyNow = async (price, bookTitle) => {
    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price, bookTitle }),
      }
    );

    const session = await response.json();

    if (session.id) {
      // Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error("Failed to create checkout session.");
    }
  };

  const toggleDescription = (bookId) => {
    if (expandedBookId === bookId) {
      setExpandedBookId(null);
    } else {
      setExpandedBookId(bookId);
    }
  };

  return (
    <div className="mt-28 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center">All Books are Here</h2>
      <div className="grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {books.map((book) => (
          <Card className="max-w-sm" key={book._id}>
            <img src={book.imageURL} alt="" className="h-96" />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {book.bookTitle}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {expandedBookId === book._id
                ? book.bookDescription
                : truncateText(book.bookDescription, 100)}
            </p>
            <p className="font-bold text-gray-900 dark:text-white">
              ${book.price}
            </p>
            <button
              className="bg-blue-700 font-semibold text-white py-2 rounded"
              onClick={() => handleBuyNow(book.price, book.bookTitle)}
            >
              Buy Now
            </button>
            <Link
              to={`/book/${book._id}`}
              className="text-gray-500 underline hover:text-gray-700"
            >
              ReadMore
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
