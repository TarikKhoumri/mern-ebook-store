import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiCalendar, FiUser } from 'react-icons/fi';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/all-posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center mt-10">Website News</h1>
      {posts.map(item => (
        <div key={item.id} className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
          <div className="flex items-center text-gray-500 mb-2">
            <FiCalendar className="mr-1" /> {item.datePuc}
          </div>
          <p className="text-gray-600">{item.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
