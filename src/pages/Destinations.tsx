import { useState, useMemo, useEffect, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import DestinationVideo from "@/assets/destination-video.mp4";

// Component-specific styles are included in the <style> tag below
const CarouselStyles = () => (
  <style>{`
    .carousel-container {
      perspective: 1000px;
      position: relative;
      width: 280px;
      height: 400px;
      margin: 0 auto;
    }

    .carousel {
      width: 100%;
      height: 100%;
      position: absolute;
      transform-style: preserve-3d;
      transition: transform 1s;
    }

    .carousel-card {
      position: absolute;
      width: 280px;
      height: 400px;
      border-radius: 12px;
      overflow: hidden;
      backface-visibility: hidden;
      transition: opacity 1s, transform 1s;
    }
  `}</style>
);

const allDestinations = [
  {
    id: 1,
    name: "Jonha Falls",
    location: "Ranchi",
    category: "Waterfall",
    image: "/jonhafalls.jpg",
    description: "A beautiful, hanging valley waterfall surrounded by lush forests.",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Netarhat",
    location: "Latehar",
    category: "Hill Station",
    image: "/netarhat.jpg",
    description: "Known as the 'Queen of Chotanagpur', famous for its stunning sunrises and sunsets.",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Betla National Park",
    location: "Latehar",
    category: "National Park",
    image: "/betlanationalpark.jpg",
    description: "One of India's earliest tiger reserves, offering rich biodiversity.",
    rating: 4.6,
  },
  {
    id: 4,
    name: "Dassam Falls",
    location: "Ranchi",
    category: "Waterfall",
    image: "/dassamfalls.jpg",
    description: "A spectacular waterfall where the Kanchi River plunges from 144 feet.",
    rating: 4.4,
  },
  {
    id: 5,
    name: "Jagannath Temple",
    location: "Ranchi",
    category: "Temple",
    image: "/jagannathtemple.jpg",
    description: "A 17th-century temple built in the Kalinga architectural style.",
    rating: 4.7,
  },
  {
    id: 6,
    name: "Sita Falls",
    location: "Ranchi",
    category: "Waterfall",
    image: "/sitafalls.jpg",
    description: "A serene and lesser-known waterfall, offering a tranquil escape.",
    rating: 4.3,
  },
  {
    id: 7,
    name: "Bhagwan Birsa Biological Park",
    location: "Ranchi",
    category: "Zoo / Biological Park",
    image: "/birsazoo.jpg",
    description: "A sprawling zoo and botanical garden with a wide variety of fauna.",
    rating: 4.5,
  },
  {
    id: 8,
    name: "Tagore Hill",
    location: "Ranchi",
    category: "Hill / Landmark",
    image: "/tagorehill.jpg",
    description: "A historic hill associated with the Tagore family, offering panoramic views.",
    rating: 4.2,
  },
  {
    id: 9,
    name: "Nakshatra Van",
    location: "Ranchi",
    category: "Park / Garden",
    image: "/nakshatravan.jpg",
    description: "A unique park where trees are planted according to zodiac signs.",
    rating: 4.3,
  }
];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");
  const [activeIndex, setActiveIndex] = useState(0);

  const categories = ["All", ...new Set(allDestinations.map((dest) => dest.category))];

  const finalDestinations = useMemo(() => {
    let filtered = allDestinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortOrder) {
      case "name-asc":
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case "rating-desc":
        return filtered.sort((a, b) => b.rating - a.rating);
      case "location-asc":
        return filtered.sort((a, b) => a.location.localeCompare(b.location));
      default:
        return filtered;
    }
  }, [searchTerm, selectedCategory, sortOrder]);

  // Reset active index if the list of destinations changes
  useEffect(() => {
    setActiveIndex(0);
  }, [finalDestinations]);
  
  // Auto-scrolling logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % finalDestinations.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [finalDestinations.length]);

  const getCardStyle = (index: number) => {
    const offset = index - activeIndex;
    const total = finalDestinations.length;
    
    // Normalize offset to handle wrapping around the carousel
    let normalizedOffset = offset;
    if (offset > total / 2) {
      normalizedOffset = offset - total;
    } else if (offset < -total / 2) {
      normalizedOffset = offset + total;
    }

    const isVisible = Math.abs(normalizedOffset) <= 2; // Show current, 2 left, 2 right

    const translateX = normalizedOffset * 150; // Horizontal spacing
    const rotateY = normalizedOffset * -25; // 3D rotation angle
    const scale = 1 - Math.abs(normalizedOffset) * 0.2;
    const zIndex = 100 - Math.abs(normalizedOffset);
    const opacity = isVisible ? 1 : 0;

    return {
      transform: `translateX(${translateX}px) rotateY(${rotateY}deg) scale(${scale})`,
      zIndex,
      opacity,
    };
  };

  return (
    <>
      <CarouselStyles />
      <div className="relative min-h-screen">
        <section className="relative h-[600px]">
          <video src={DestinationVideo} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
            <Navigation />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Explore <span className="text-yellow-400">Destinations</span>
            </h1>
            <p className="text-lg max-w-3xl text-white">
              Discover the most breathtaking places in Jharkhand, from majestic waterfalls to wildlife sanctuaries and serene hill stations.
            </p>
          </div>
        </section>

        <section className="bg-cream-100 py-12 relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-12 max-w-2xl mx-auto">
              <Input
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                  <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
                  <SelectItem value="location-asc">Location (A-Z)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* 3D Auto-scrolling Carousel */}
            <div className="carousel-container">
              {finalDestinations.map((destination, index) => (
                <div key={destination.id} className="carousel-card" style={getCardStyle(index)}>
                   <Card className="w-full h-full flex flex-col bg-card/80 backdrop-blur-sm shadow-lg">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="p-4 flex flex-col justify-between flex-1">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                          <div className="flex items-center text-sm text-muted-foreground mb-2">
                            <MapPin className="w-4 h-4 mr-1.5" /> {destination.location}
                          </div>
                           <p className="text-sm text-muted-foreground h-12 overflow-hidden">{destination.description}</p>
                        </div>
                        <Link to={`/destinations/${destination.id}`} className="w-full mt-4">
                          <Button variant="outline" className="w-full">
                            Learn More
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                </div>
              ))}
            </div>
            
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Destinations;