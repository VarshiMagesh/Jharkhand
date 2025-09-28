import DomeGallery from "@/components/DomeGallery";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer3";
import HeroBanner from "@/components/HeroBanner.tsx";

const Index = () => {
  return (
    <div className="relative w-full min-h-screen bg-background">
      <Navigation />
      <HeroBanner />
      <div className="h-screen">
        <DomeGallery />
      </div>
      <Footer />
    </div>
  );
};

export default Index;