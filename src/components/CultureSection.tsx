import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Palette, Utensils, Calendar } from "lucide-react";
import tribalCulture from "@/assets/tribal-culture.jpg";

const culturalHighlights = [
  {
    icon: Music,
    title: "Traditional Music & Dance",
    description: "Experience vibrant folk performances including Jhumar, Paika, and Chhau dance forms.",
  },
  {
    icon: Palette,
    title: "Tribal Art & Crafts",
    description: "Discover beautiful handicrafts, bamboo work, and traditional tribal paintings.",
  },
  {
    icon: Utensils,
    title: "Local Cuisine",
    description: "Savor authentic flavors with traditional dishes like Dhuska, Pittha, and tribal delicacies.",
  },
  {
    icon: Calendar,
    title: "Festivals & Events",
    description: "Join colorful celebrations like Sarhul, Karma, and other tribal festivals.",
  },
];

const CultureSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Rich <span className="text-accent">Cultural</span> Heritage
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Immerse yourself in the vibrant traditions of Jharkhand's tribal communities. 
              From ancient dance forms to exquisite craftsmanship, discover a living culture 
              that has been preserved for generations.
            </p>

            {/* Cultural Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {culturalHighlights.map((item, index) => (
                <Card key={index} className="border-none shadow-none bg-background/50 hover:bg-background transition-smooth">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="hero-gradient p-2 rounded-lg">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button size="lg" className="hero-gradient text-white shadow-nature">
              Explore Cultural Tours
            </Button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-nature">
              <img
                src={tribalCulture}
                alt="Traditional Jharkhand Culture"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Floating Card */}
              <Card className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Cultural Festival</h4>
                      <p className="text-sm text-muted-foreground">Join traditional celebrations</p>
                    </div>
                    <Button size="sm" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 hero-gradient rounded-full opacity-20 blur-xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-full blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CultureSection;