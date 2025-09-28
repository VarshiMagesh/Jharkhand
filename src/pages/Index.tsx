import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import FestivalsSection from "@/components/FestivalsSection";
import WeeklyWeather from "@/components/WeeklyWeather";
import VideoGrid from "@/components/VideoGrid";
// import TestimonialsSection from "@/components/TestimonialsSection"; // This line is removed
import Footer from "@/components/Footer1";

// Import the background image
import heroImage from "@/assets/hero-jharkhand.jpg";

const Index = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <Navigation />
      <main>
        <HeroSection />
        <HighlightsSection />
        <FestivalsSection />
        <WeeklyWeather />
        <VideoGrid />
        {/* <TestimonialsSection /> was here */}
        <Footer />
      </main>
    </div>
  );
};

export default Index;