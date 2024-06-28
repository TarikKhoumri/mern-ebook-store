import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PVHx42Nhrh2BFv24CBlkdpEL738Sz3e4cLyyzbFBjzVUriJMKdC34ZClWx2we81BM4OxROS41VBW37A4rPSTphl00QUHq46op');

export const SingleBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null); // Use null as initial state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/book/${id}`)
      .then(res => {
        if (!res.ok) {
          console.log(res)
        }
        return res.json();
      })
      .then(data => {
        setBook(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
        console.error('Error fetching book:', error);
      });
  }, [id]);

  const handleBuyNow = async (price, bookTitle) => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5000/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ price, bookTitle }),
    });

    const session = await response.json();

    if (session.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } else {
      console.error('Failed to create checkout session.');
    }
  };

  if (loading) {
    return <div className='mt-28 px-4 lg:px-24'>Loading...</div>;
  }

  if (error) {
    return <div className='mt-28 px-4 lg:px-24'>Error: {error.message}</div>;
  }

  if (!book) {
    return <div className='mt-28 px-4 lg:px-24'>No book found</div>;
  }

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div>
            <img src={book.imageURL} alt={book.bookTitle} className="h-auto w-full lg:h-96 object-cover rounded-lg shadow-md" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{book.bookTitle}</h1>
            <p className="text-gray-700 mb-4">Author: {book.authorName}</p>
            <p className="text-gray-700 mb-4">Description: {book.bookDescription}</p>
            <p className="text-gray-700 mb-4">Category: {book.category}</p>
            <p className="text-gray-700 mb-4">Price: ${book.price}</p>
            <button
              className="bg-blue-700 font-semibold text-white py-2 rounded"
              onClick={() => handleBuyNow(book.price, book.bookTitle)}
            >
              Buy Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
