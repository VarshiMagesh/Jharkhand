import Navigation from "@/components/Navigation";
import ItineraryPlanner from "@/components/ItineraryPlanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Star, CheckCircle, Users, Clock } from "lucide-react";
import Footer from "@/components/Footer";

const whyChooseUs = [
  {
    icon: Star,
    title: "AI-Powered Planning",
    description: "Advanced AI creates personalized itineraries based on your exact preferences"
  },
  {
    icon: CheckCircle,
    title: "Local Expertise", 
    description: "Deep knowledge of Jharkhand's hidden gems and authentic experiences"
  },
  {
    icon: Users,
    title: "24/7 Support",
    description: "Round-the-clock assistance during your entire journey"
  },
  {
    icon: Clock,
    title: "Instant Generation",
    description: "Get your complete itinerary in minutes, not days"
  }
];

const PlanJourney = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 nature-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              AI-Powered <span className="text-accent">Itinerary Planner</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Experience the future of travel planning. Our advanced AI creates personalized Jharkhand adventures 
              based on your exact preferences, interests, and budget in minutes.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">500+</div>
                <div className="text-sm text-muted-foreground">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">10K+</div>
                <div className="text-sm text-muted-foreground">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">95%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2 Min</div>
                <div className="text-sm text-muted-foreground">Planning Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Itinerary Planner */}
          <div className="lg:col-span-3">
            <ItineraryPlanner />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Contact Info */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Need Help?</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Call Us</p>
                      <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-medium text-foreground">Email Us</p>
                      <p className="text-sm text-muted-foreground">info@jharkhhandtourism.com</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Why Choose Us */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose Our AI Planner?</h3>
                <div className="space-y-4">
                  {whyChooseUs.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="hero-gradient p-1 rounded-full">
                        <item.icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Process Steps */}
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">How It Works</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">1</div>
                    <span className="text-sm text-muted-foreground">Fill detailed preferences</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">2</div>
                    <span className="text-sm text-muted-foreground">AI generates itinerary</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">3</div>
                    <span className="text-sm text-muted-foreground">Review & customize</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-accent text-accent-foreground rounded-full flex items-center justify-center text-xs font-bold">4</div>
                    <span className="text-sm text-muted-foreground">Book & enjoy!</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        {/* Trust Indicators */}
        <section className="mt-16">
          <Card className="hero-gradient text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Trusted by Thousands of Travelers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold">4.9/5</div>
                  <div className="text-sm opacity-90">Average Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">48 Hours</div>
                  <div className="text-sm opacity-90">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Customizable</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
              <Footer />

    </div>
  );
};

export default PlanJourney;