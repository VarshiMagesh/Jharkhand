import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Droplets } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto pt-20">
        <div className="animate-fade-in">
          <p className="text-lg md:text-xl text-accent font-medium mb-4 tracking-wide">
            Experience the Soul of India
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Jharkhand's
            <span className="block text-accent">Hidden Treasures</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
            India's best-kept secret awaits. From thundering waterfalls to ancient temples, 
            experience destinations most travelers never discover. Your gateway to authentic tribal culture and untouched wilderness.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="hero-gradient text-white shadow-nature px-8 py-3 text-lg group">
              Explore Hidden Gems
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            {/* 👇 THIS BUTTON HAS BEEN UPDATED 👇 */}
            <Button variant="outline" className="bg-white/20 border-white text-white hover:bg-white hover:text-primary px-8 py-3 text-lg backdrop-blur-sm">
              Plan Your Adventure
            </Button>
          </div>

          <div className="inline-flex items-center gap-8 text-sm bg-black/20 backdrop-blur-sm rounded-full px-8 py-4 mb-8">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" />
              <span>Over 200+ unexplored destinations</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent" />
              <span>15+ tribal communities</span>
            </div>
            <div className="hidden md:block w-px h-4 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-accent" />
              <span>50+ pristine waterfalls</span>
            </div>
          </div>

          <p className="text-sm opacity-80">
            Join thousands discovering what guidebooks miss
          </p>
          <p className="text-xs opacity-60 mt-2">
            Official tourism portal with verified information and 24/7 helpline support.
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;