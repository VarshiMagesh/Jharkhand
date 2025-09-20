import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Users, Camera, TreePine } from "lucide-react";
import hundruFalls from "@/assets/hundru-falls.jpg";
import netarhatHills from "@/assets/netarhat-hills.jpg";
import betlaPark from "@/assets/betla-national-park.jpg";

const allDestinations = [
  {
    id: 1,
    name: "Hundru Falls",
    location: "Ranchi",
    image: hundruFalls,
    rating: 4.8,
    duration: "Half Day",
    category: "Waterfalls",
    icon: Camera,
    description: "Experience the majestic 98-meter waterfall cascading through dense forests. Perfect for photography and nature walks.",
    highlights: ["98m high waterfall", "Dense forest trails", "Photography spots", "Picnic areas"],
    bestTime: "October to March"
  },
  {
    id: 2,
    name: "Netarhat Hills",
    location: "Latehar", 
    image: netarhatHills,
    rating: 4.7,
    duration: "2 Days",
    category: "Hill Stations",
    icon: TreePine,
    description: "Known as the 'Queen of Chotanagpur', offering stunning sunrise and sunset views with cool pleasant weather.",
    highlights: ["Sunrise & sunset points", "Cool climate", "Pine forests", "Trekking trails"],
    bestTime: "September to February"
  },
  {
    id: 3,
    name: "Betla National Park",
    location: "Palamau",
    image: betlaPark,
    rating: 4.6,
    duration: "Full Day",
    category: "Wildlife",
    icon: Users,
    description: "Wildlife sanctuary home to tigers, elephants, and diverse flora and fauna. Experience jungle safaris and nature walks.",
    highlights: ["Tiger reserve", "Elephant sightings", "Jungle safari", "Bird watching"],
    bestTime: "November to April"
  },
];

const Destinations = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Explore <span className="text-accent">Destinations</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Discover the most breathtaking places in Jharkhand, from majestic waterfalls 
              to wildlife sanctuaries and serene hill stations.
            </p>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {allDestinations.map((destination) => (
              <Card
                key={destination.id}
                className="group overflow-hidden shadow-card hover:shadow-nature transition-smooth hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="hero-gradient text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <destination.icon className="w-4 h-4" />
                      <span>{destination.category}</span>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{destination.rating}</span>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-smooth">
                      {destination.name}
                    </h3>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{destination.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4">
                    {destination.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {destination.highlights.slice(0, 3).map((highlight, index) => (
                        <span
                          key={index}
                          className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-full"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Best Time */}
                  <div className="text-xs text-muted-foreground mb-4">
                    <strong>Best Time:</strong> {destination.bestTime}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                    >
                      Learn More
                    </Button>
                    <Button
                      className="flex-1 hero-gradient text-white shadow-nature"
                    >
                      Plan Visit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Plan Your Adventure?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our expert guides help you create the perfect itinerary for your Jharkhand journey
          </p>
          <Button size="lg" className="hero-gradient text-white shadow-nature">
            Start Planning Your Journey
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Destinations;