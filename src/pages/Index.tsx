import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import HighlightsSection from "@/components/HighlightsSection";
import DestinationsGrid from "@/components/DestinationsGrid";
import FestivalsSection from "@/components/FestivalsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";

// Import the background image
import heroImage from "@/assets/hero-jharkhand.jpg";

const Index = () => {
  return (
    // This div is now responsible for the background
    <div 
      className="min-h-screen bg-cover bg-fixed bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <Navigation />
      {/* We no longer need the top padding on the main element */}
      <main>
        <HeroSection />
        <HighlightsSection />
        <DestinationsGrid />
        <FestivalsSection />
        <TestimonialsSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;