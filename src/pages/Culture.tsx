import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Palette, Utensils, Calendar, Users, Heart, Camera, Trophy } from "lucide-react";
import tribalCulture from "@/assets/tribal-culture.jpg";

const culturalAspects = [
  {
    icon: Music,
    title: "Traditional Music & Dance",
    description: "Experience vibrant folk performances including Jhumar, Paika, and Chhau dance forms that tell stories of ancient traditions.",
    details: ["Jhumar - Community celebration dance", "Paika - Martial dance form", "Chhau - Masked dance drama", "Karma - Harvest festival dance"]
  },
  {
    icon: Palette,
    title: "Tribal Art & Crafts",
    description: "Discover beautiful handicrafts, bamboo work, and traditional tribal paintings that showcase indigenous artistry.",
    details: ["Madhubani-style paintings", "Bamboo craft items", "Traditional jewelry", "Tribal sculptures"]
  },
  {
    icon: Utensils,
    title: "Local Cuisine",
    description: "Savor authentic flavors with traditional dishes like Dhuska, Pittha, and tribal delicacies prepared with local ingredients.",
    details: ["Dhuska - Deep-fried rice pancake", "Pittha - Steamed rice cake", "Handia - Traditional rice beer", "Tribal forest vegetables"]
  },
  {
    icon: Calendar,
    title: "Festivals & Events",
    description: "Join colorful celebrations like Sarhul, Karma, and other tribal festivals that honor nature and ancestors.",
    details: ["Sarhul - Spring festival", "Karma - Monsoon celebration", "Sohrai - Harvest festival", "Tusu Parab - Winter festival"]
  },
];

const culturalExperiences = [
  {
    icon: Users,
    title: "Village Homestays",
    description: "Stay with local families and experience authentic tribal life"
  },
  {
    icon: Heart,
    title: "Cultural Immersion",
    description: "Participate in daily activities and traditional practices"
  },
  {
    icon: Camera,
    title: "Photography Tours",
    description: "Capture vibrant festivals and cultural ceremonies"
  },
  {
    icon: Trophy,
    title: "Craft Workshops",
    description: "Learn traditional arts and crafts from master artisans"
  },
];

const Culture = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Cultural <span className="text-accent">Heritage</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Immerse yourself in the vibrant traditions of Jharkhand's tribal communities. 
              Discover a living culture that has been preserved for generations.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Culture Image */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden shadow-nature max-w-4xl mx-auto">
            <img
              src={tribalCulture}
              alt="Jharkhand Tribal Culture"
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 overlay-gradient" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Living Traditions of Jharkhand
                </h2>
                <p className="text-lg opacity-90 max-w-2xl">
                  Where ancient customs meet modern curiosity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cultural Aspects Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore <span className="text-accent">Cultural Aspects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive deep into the rich cultural tapestry that makes Jharkhand unique
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalAspects.map((aspect, index) => (
              <Card key={index} className="group overflow-hidden shadow-card hover:shadow-nature transition-smooth">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="hero-gradient p-3 rounded-xl group-hover:scale-110 transition-smooth">
                      <aspect.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">
                        {aspect.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {aspect.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {aspect.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-accent rounded-full" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-6 group-hover:bg-primary group-hover:text-primary-foreground transition-smooth"
                  >
                    Explore More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Experiences */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cultural <span className="text-accent">Experiences</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Immerse yourself in authentic cultural activities and create lasting memories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalExperiences.map((experience, index) => (
              <Card key={index} className="group text-center hover:shadow-nature transition-smooth hover:scale-105">
                <CardContent className="p-6">
                  <div className="hero-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-smooth">
                    <experience.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">
                    {experience.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {experience.description}
                  </p>
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
            Ready to Experience Jharkhand Culture?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our cultural tours and connect with the indigenous communities of Jharkhand
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="hero-gradient text-white shadow-nature">
              Book Cultural Tour
            </Button>
            <Button size="lg" variant="outline">
              Download Culture Guide
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Culture;