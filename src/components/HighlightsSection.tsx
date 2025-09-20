import { Link } from "react-router-dom"; // 👈 Make sure to import Link
import { Droplets, Users, TreePine, Mountain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HighlightsSection = () => {
  const highlights = [
    {
      icon: Droplets,
      title: "Majestic Waterfalls",
      description: "Dassam, Hundru, Jonha—discover cascading wonders hidden in pristine forests.",
      // Link to destinations, specifying the "waterfalls" category
      path: "/destinations?category=waterfalls"
    },
    {
      icon: Users,
      title: "Tribal Heritage",
      description: "Experience living culture through authentic festivals, crafts, and traditions.",
      // This links to its own page
      path: "/culture"
    },
    {
      icon: TreePine,
      title: "Wildlife Sanctuaries",
      description: "Spot elephants, tigers, and rare birds in their natural habitat.",
      // Link to destinations, specifying the "wildlife" category
      path: "/destinations?category=wildlife"
    },
    {
      icon: Mountain,
      title: "Adventure Trails",
      description: "Trekking, rock climbing, and forest expeditions for thrill seekers.",
       // Link to destinations, specifying the "adventure" category
      path: "/destinations?category=adventure"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          {/* 👇 Heading is now bigger (text-4xl -> text-5xl) */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Highlights
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              // 👇 The entire card is now wrapped in a Link
              <Link to={highlight.path} key={index}>
                <Card 
                  className="group hover:shadow-nature transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-black/20 backdrop-blur-sm border-white/20 h-full"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 hero-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {highlight.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {highlight.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HighlightsSection;