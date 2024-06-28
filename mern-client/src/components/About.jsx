const About = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center mt-8">About Our Book Store</h1>
      <div className="text-gray-700 mb-8">
        <p className="mb-4">
          Welcome to our book store! We are dedicated to providing a wide selection of books
          for all ages and interests. Our store is a place where book lovers can explore
          new titles, discover hidden gems, and connect with fellow readers.
        </p>
        <p className="mb-4">
          Our mission is to promote literacy and a love for reading by offering a diverse
          range of books that inspire, educate, and entertain. We believe that books have
          the power to transform lives and enrich communities.
        </p>
        <p className="mb-4">
          Whether you're looking for the latest bestseller, a classic novel, or a children's
          book, we have something for everyone. Our knowledgeable staff is here to help you
          find the perfect book for every occasion.
        </p>
        <p>
          Thank you for choosing our book store. We look forward to serving you and
          sharing our passion for books with you!
        </p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form>
          <label className="block mb-2">Name:</label>
          <input type="text" className="border rounded-md px-4 py-2 mb-4 w-full" placeholder="Your Name" />
          <label className="block mb-2">Email:</label>
          <input type="email" className="border rounded-md px-4 py-2 mb-4 w-full" placeholder="Your Email" />
          <label className="block mb-2">Message:</label>
          <textarea className="border rounded-md px-4 py-2 mb-4 w-full" rows="4" placeholder="Your Message"></textarea>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default About;
