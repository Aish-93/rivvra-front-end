
import React,{useState,useEffect} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./testimonial.css"

const Testimonials  =() =>{


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
      ];

      const [currentIndex, setCurrentIndex] = useState(0);
      useEffect(() => {
        const interval = setInterval(nextSlide, 2000);
        return () => clearInterval(interval);
      }, [])

      const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      };
    
      const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        );
      };

    return(
<>
<div className="mt-20 mainCardHolder py-16 px-6 shadow-2xl rounded-lg max-w-6xl mx-auto relative">
        <h2 className="text-5xl font-bold text-gray-500 mb-10">What Our Customers Say</h2>
        <div className="relative flex items-center justify-center">
          <button
            className="absolute left-0 text-gray-500 hover:text-blue-700 p-2 text-3xl"
            onClick={prevSlide}
          >
            <FaChevronLeft />
          </button>
          <div className="flex overflow-hidden w-full justify-center">
            <div
              className="bg-blue-50 p-8 rounded-2xl shadow-xl cards text-center transform transition-transform duration-500 border-l-4 border-blue-500"
            >
              <p className="text-gray-800 text-lg italic mb-4">"{testimonials[currentIndex].quote}"</p>
              <div className="flex items-center justify-center gap-4">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} className="rounded-full w-20 h-20 border-4 border-blue-500 shadow-lg" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-600 text-sm">{testimonials[currentIndex].position}</p>
                </div>
              </div>
            </div>
          </div>
          <button
            className="absolute right-0 text-blue-500 hover:text-blue-700 p-2 text-3xl"
            onClick={nextSlide}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
</>
    )
};

export default Testimonials;