import { Link } from "react-router-dom"; // This is already correctly imported
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const DestinationsGrid = () => {
  const destinations = [
    {
      id: 1,
      name: "Jonha Falls",
      image: "/jonhafalls.jpg",
      description: "A quick glimpse. Find details, routes, and safety tips in Destinations.",
    },
    {
      id: 2,
      name: "Betla National Park",
      image: "/betlanationalpark.jpg",
      description: "A quick glimpse. Find details, routes, and safety tips in Destinations.",
    },
    {
      id: 3,
      name: "Netarhat Hills",
      image: "/netarhat.jpg",
      description: "A quick glimpse. Find details, routes, and safety tips in Destinations.",
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Featured Destinations
          </h2>
          <Link to="/destinations">
            <Button variant="ghost" className="text-accent hover:text-accent-foreground">
              See all
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300 bg-black/20 backdrop-blur-sm border-white/20">
              <div className="relative overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {destination.name}
                </h3>
                
                <p className="text-white/80 mb-4 leading-relaxed">
                  {destination.description}
                </p>
                
                {/* === MODIFICATION START === */}
                <Link to={`/destinations/${destination.id}`}>
                  <Button variant="ghost" className="text-accent hover:text-accent-foreground p-0">
                    View more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                {/* === MODIFICATION END === */}

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsGrid;