import React from "react";
import Slider from "react-slick";
import Category from "./Category";
import { getData } from "../context/DataContext";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const { data } = getData();
  const navigate = useNavigate();

  const SamplePrevArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`} style={{ zIndex: 3 }}>
      <AiOutlineArrowLeft
        className="arrows"
        style={{
          ...style,
          display: "block",
          borderRadius: "50%",
          background: "#f53347",
          color: "white",
          position: "absolute",
          padding: "8px",
          left: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f53347")}
      />
    </div>
  );

  const SampleNextArrow = ({ className, style, onClick }) => (
    <div onClick={onClick} className={`arrow ${className}`}>
      <AiOutlineArrowRight
        className="arrows"
        style={{
          ...style,
          display: "block",
          borderRadius: "50%",
          background: "#f53347",
          color: "white",
          position: "absolute",
          padding: "8px",
          right: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#555")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f53347")}
      />
    </div>
  );

  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <>
      <Slider {...settings}>
        {data?.slice(0, 7).map((item, index) => (
          <div key={index} className="relative w-full h-screen md:h-[600px]">
            {/* Background gradients */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] z-0" />
            <div className="absolute inset-0 bg-gradient-to-l from-white/30 via-white/10 to-transparent z-0" />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center w-full h-full px-4 md:px-10">
              {/* Left text */}
              <div className="space-y-3 md:space-y-6 max-w-[500px] text-center md:text-left">
                <h3 className="text-red-500 font-semibold font-sans text-xs md:text-sm">
                  Powering your world with the best in electronics
                </h3>
                <h1 className="text-xl md:text-4xl font-bold uppercase line-clamp-2 md:line-clamp-3 text-white">
                  {item.title}
                </h1>
                <p className="line-clamp-3 text-gray-200 text-sm md:text-base md:pr-7">
                  {item.description}
                </p>
                <button
                  onClick={() => navigate(`/products/${item.id}`, { state: { product: item } })}
                  className="bg-gradient-to-r from-red-500 to-purple-500 text-white px-4 py-2 rounded-md cursor-pointer mt-2 text-sm md:text-base"
                >
                  Shop Now
                </button>
              </div>

              {/* Right image */}
              <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded-full w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[550px] md:h-[550px] object-cover 
                             transform transition-transform duration-300 hover:scale-105 shadow-xl md:shadow-2xl shadow-red-400"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Category section */}
      <Category />
    </>
  );
};

export default Carousel;
