import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import image1 from "../assets/images/9.jpg";
import image2 from "../assets/images/8.jpg";
import image3 from "../assets/images/17.jpg";
import image4 from "../assets/images/42.jpeg";

const Home = () => {
  const images = [image1, image2, image3, image4];

  return (
    <div className="fixed top-[90px] w-full h-[calc(100vh-60px)] flex justify-center items-center">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000 }}
        loop
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Home;
