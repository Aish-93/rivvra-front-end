import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./testimonial.css"; // keeping your styles

const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      position: "CEO, TechCorp",
      image: "https://via.placeholder.com/60",
      quote: "Rivvra has transformed our business! The support and features are top-notch. Highly recommended!",
    },
    {
      name: "Sarah Smith",
      position: "Founder, DesignWave",
      image: "https://via.placeholder.com/60",
      quote: "Amazing experience! The platform is intuitive and the customer service is outstanding.",
    },
    {
      name: "Michael Lee",
      position: "Manager, FinTrack",
      image: "https://via.placeholder.com/60",
      quote: "Great value for the price. Rivvra's tools helped us streamline our workflow effectively.",
    },
    {
      name: "Emily Johnson",
      position: "Marketing Lead, GrowthHub",
      image: "https://via.placeholder.com/60",
      quote: "I absolutely love using Rivvra. It's user-friendly and incredibly efficient!",
    },
    {
      name: "David Brown",
      position: "CTO, InnovateX",
      image: "https://via.placeholder.com/60",
      quote: "Switching to Rivvra was the best decision we've made for our operations!",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 2500);
  //   return () => clearInterval(interval);
  // }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  // Handle visible cards — pick 3 cards
  const getVisibleCards = () => {
    const visibleCards = [];
    for (let i = 0; i < 3; i++) {
      visibleCards.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visibleCards;
  };

  return (
    <div className="mainCardHolder py-16 px-8 relative">
      <h1 className="flex justify-center m-10  ">What Our client Says</h1>
      <div className="flex justify-center gap-8 ">
        {getVisibleCards().map((testimonial, index) => (
          <div
            key={index}
            className="testimonialCard bg-white shadow-2xl rounded-2xl p-6 w-80 flex flex-col items-center text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{testimonial.position}</p>
            <p className="text-gray-700">{testimonial.quote}</p>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        <FaChevronLeft />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Testimonials;
