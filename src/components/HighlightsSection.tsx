import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules"; // Removed Navigation

import "swiper/css";
// Removed navigation css import

import waterfallsImg from "@/assets/wtf.jpg";
import tribalImg from "@/assets/th.jpg";
import wildlifeImg from "@/assets/ws.jpg";
import adventureImg from "@/assets/at.jpg";
import paraglidingImg from "@/assets/paragliding.jpg";
import bananaBoatImg from "@/assets/banana-boat.jpg";
import trekkingImg from "@/assets/trekking.jpg";

const HighlightsSection = () => {
  const highlights = [
    {
      title: "Majestic Waterfalls",
      description: "Dassam, Hundru, Jonha—discover cascading wonders hidden in pristine forests.",
      path: "/destinations?category=waterfalls",
      image: waterfallsImg,
      button: "EXPLORE",
    },
    {
      title: "Tribal Heritage",
      description: "Experience living culture through authentic festivals, crafts, and traditions.",
      path: "/culture",
      image: tribalImg,
      button: "LEARN MORE",
    },
    {
      title: "Paragliding",
      description: "Soar over the scenic, hilly terrain of Patratu Valley in this thrilling sky adventure.",
      path: "/destinations?category=adventure",
      image: paraglidingImg,
      button: "FLY HIGH",
    },
    {
      title: "Banana Boat Ride",
      description: "Enjoy fun water sports like Banana Boat Rides, Jet Skiing, and more at Patratu Lake.",
      path: "/destinations?category=adventure",
      image: bananaBoatImg,
      button: "GET WET",
    },
    {
      title: "Trekking & Nature",
      description: "Hike through lush hills and forest trails in the famous Patratu Valley.",
      path: "/destinations?category=adventure",
      image: trekkingImg,
      button: "EXPLORE TRAILS",
    },
    {
      title: "Wildlife Sanctuaries",
      description: "Spot elephants, tigers, and rare birds in their natural habitat.",
      path: "/destinations?category=wildlife",
      image: wildlifeImg,
      button: "DISCOVER",
    },
    {
      title: "Adventure Trails",
      description: "Trekking, rock climbing, and forest expeditions for thrill seekers.",
      path: "/destinations?category=adventure",
      image: adventureImg,
      button: "JOIN NOW",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white">Highlights</h2>
        </div>

        <Swiper
          modules={[Autoplay]} // Removed Navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          className="pb-12"
        >
          {highlights.map((highlight, index) => (
            <SwiperSlide key={index}>
              <Card className="carousel-card shadow-xl hover:shadow-2xl transition-all duration-300">
                <div
                  className="carousel-card-image"
                  style={{ backgroundImage: `url(${highlight.image})` }}
                />
                <div className="carousel-card-content text-center flex flex-col justify-center items-center px-6 py-6">
                  <h3 className="text-2xl font-semibold mb-3 text-green-900">{highlight.title}</h3>
                  <p className="mb-4 text-gray-800">{highlight.description}</p>
                  <Link
                    to={highlight.path}
                    className="inline-block bg-green-800 text-white font-medium px-5 py-2 rounded-full hover:bg-green-600 transition"
                  >
                    {highlight.button}
                  </Link>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default HighlightsSection;
