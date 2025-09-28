import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import FestivalsSection from "@/components/FestivalsSection";
import WeeklyWeather from "@/components/WeeklyWeather";
import VideoGrid from "@/components/VideoGrid";
import Footer from "@/components/Footer"; // 1. Changed this from Footer1 to Footer

import heroImage from "@/assets/hero-jharkhand.jpg";

const Index = () => {
  return (
    <>
      <div 
        className="bg-cover bg-fixed bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <HighlightsSection />
          <FestivalsSection />
          <WeeklyWeather />
          <VideoGrid />
        </main>
      </div>
      <Footer /> {/* 2. This will now render your new, stylish footer */}
    </>
  );
};

export default Index;