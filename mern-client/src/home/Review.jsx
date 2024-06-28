import  { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Avatar } from 'flowbite-react';
import { FaStar } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import proPic from "../assets/profile-icon-png-898.png";
import { Pagination } from "swiper/modules";
import ReviewForm from "../components/ReviewForm";

const Review = () => {
  const renderStars = (stars) => {
    let starElements = [];
    for (let i = stars; i > 0; i--) {
      starElements.push(<FaStar key={i} />);
    }
    return starElements;
  };
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews/all-reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const handleAddReviewClick = () => {
    setShowReviewForm(true);
  };

  const handleReviewFormClose = () => {
    setShowReviewForm(false);
  };

  return (
    <div className="my-12 px-4 lg:px-24">
      <h2 className="text-5xl font-bold text-center mb-10 leading-snug">
        Our Customers
      </h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className="shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border">
              <div className="space-y-6">
                <div className="text-amber-500 flex gap-2">
                  { renderStars( review.stars)}
                </div>
                <div className="mt-7">
                  <p className="mb-5">
                    {review.comment || "No comment provided."}
                  </p>
                  <Avatar img={proPic} alt={`avatar of ${review.name}`} rounded className="w-10 mb-4" />
                  <h5 className="text-lg font-medium">{review.name}</h5>
                  <p className="text-base">{review.position || "Customer"}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button onClick={handleAddReviewClick} className="py-2 px-4 bg-green-500 text-white rounded mt-4">
        Add Review
      </button>
      {showReviewForm && <ReviewForm onClose={handleReviewFormClose} />}
    </div>
  );
};

export default Review;
