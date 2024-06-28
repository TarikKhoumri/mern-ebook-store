import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ onClose, onAddReview }) => {
  const [review, setReview] = useState({
    name: '',
    email: '',
    stars: 0,
    comment: '',
    position: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:5000/api/payments/create-review', review);
      onAddReview(response.data);
      setSuccessMessage('Review added successfully!');
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
        setIsSubmitting(false);
      }, 2000); // Hide success message after 2 seconds
    } catch (error) {
      console.error('Error adding review:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl mb-4">Add Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={review.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={review.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Stars</label>
            <input
              type="number"
              name="stars"
              value={review.stars}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
              min="1"
              max="5"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Comment</label>
            <textarea
              name="comment"
              value={review.comment}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={review.position}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-4 py-2 px-4 bg-gray-500 text-white rounded"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-blue-500 text-white rounded"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="text-green-500 mt-4">{successMessage}</div>
        )}
      </div>
    </div>
  );
};

export default ReviewForm;
