import { Link } from "react-router-dom"; 
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Droplets } from "lucide-react";

// Import your video
import heroVideo from "@/assets/hero-jharkhand.mp4";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay for readability */}
      <div />

      {/* Foreground Content */}

    </section>
  );
};

export default HeroSection;
