import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

// Import Swiper styles (already in your index.css but good practice here)
import "swiper/css";
import "swiper/css/navigation";

// Import images from assets
import chhauImg from "@/assets/dance-chhau.jpg";
import sohraiImg from "@/assets/festival-sohrai.jpg";
import paikaImg from "@/assets/dance-paika.jpg";
import karmaImg from "@/assets/festival-karma.jpg";

const FestivalsSection = () => {
  const festivals = [
    {
      name: "Chhau Dance",
      description: "A semi-classical Indian dance with martial and folk traditions.",
      path: "/culture",
      image: chhauImg,
      button: "LEARN MORE",
    },
    {
      name: "Sohrai Festival",
      description: "A major harvest festival where walls are decorated with intricate murals.",
      path: "/culture",
      image: sohraiImg,
      button: "LEARN MORE",
    },
    {
      name: "Paika Dance",
      description: "A powerful martial folk dance that re-enacts ancient battles.",
      path: "/culture",
      image: paikaImg,
      button: "LEARN MORE",
    },
    {
      name: "Karma Festival",
      description: "A celebration of nature, with folk songs and dances.",
      path: "/culture",
      image: karmaImg,
      button: "LEARN MORE",
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Festivals & Culture
          </h2>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          loop={true}
          className="pb-12"
        >
          {festivals.map((festival, index) => (
            <SwiperSlide key={index}>
              <Card className="carousel-card shadow-xl hover:shadow-2xl transition-all duration-300">
                <div
                  className="carousel-card-image"
                  style={{ backgroundImage: `url(${festival.image})` }}
                />
                <div className="carousel-card-content text-center flex flex-col justify-center items-center px-6 py-6">
                  <h3 className="text-2xl font-semibold mb-3 text-foreground">{festival.name}</h3>
                  <p className="mb-4 text-muted-foreground">{festival.description}</p>
                  <Link
                    to={festival.path}
                    className="inline-block bg-primary text-primary-foreground font-medium px-5 py-2 rounded-full hover:bg-primary/80 transition"
                  >
                    {festival.button}
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

export default FestivalsSection;