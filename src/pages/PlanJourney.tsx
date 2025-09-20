import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin, Users, Clock, Phone, Mail, MessageSquare, CheckCircle, Star } from "lucide-react";

const journeyTypes = [
  {
    title: "Adventure Package",
    duration: "5-7 Days",
    highlights: ["Waterfall trekking", "Wildlife safari", "Rock climbing", "Camping"],
    price: "From ₹15,000"
  },
  {
    title: "Cultural Experience",
    duration: "3-5 Days", 
    highlights: ["Village homestays", "Tribal festivals", "Craft workshops", "Local cuisine"],
    price: "From ₹12,000"
  },
  {
    title: "Nature Retreat",
    duration: "4-6 Days",
    highlights: ["Hill stations", "Forest walks", "Bird watching", "Photography"],
    price: "From ₹10,000"
  },
  {
    title: "Family Vacation",
    duration: "3-4 Days",
    highlights: ["Kid-friendly spots", "Cultural sites", "Easy treks", "Local markets"],
    price: "From ₹8,000"
  }
];

const whyChooseUs = [
  {
    icon: Star,
    title: "Expert Local Guides",
    description: "Native guides with deep cultural knowledge and years of experience"
  },
  {
    icon: CheckCircle,
    title: "Customized Itineraries", 
    description: "Personalized tours designed according to your interests and preferences"
  },
  {
    icon: Users,
    title: "Small Group Tours",
    description: "Intimate experiences with maximum 8-10 people per group"
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock assistance during your entire journey"
  }
];

const PlanJourney = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Plan Your <span className="text-accent">Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Create your perfect Jharkhand adventure with our expert guidance. 
              From customized itineraries to local experiences, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Planning Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Tell Us About Your Trip</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" placeholder="Enter your full name" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="Enter your email" className="mt-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" placeholder="Enter your phone number" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select number of travelers" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3-5">3-5 People</SelectItem>
                          <SelectItem value="6-10">6-10 People</SelectItem>
                          <SelectItem value="10+">More than 10</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="startDate">Preferred Start Date</Label>
                      <Input id="startDate" type="date" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="duration">Trip Duration</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2-3">2-3 Days</SelectItem>
                          <SelectItem value="4-5">4-5 Days</SelectItem>
                          <SelectItem value="6-7">6-7 Days</SelectItem>
                          <SelectItem value="8+">More than a week</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="interests">Interests & Preferences</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="What interests you most?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adventure">Adventure & Trekking</SelectItem>
                        <SelectItem value="culture">Cultural Experiences</SelectItem>
                        <SelectItem value="nature">Nature & Wildlife</SelectItem>
                        <SelectItem value="photography">Photography Tours</SelectItem>
                        <SelectItem value="family">Family Vacation</SelectItem>
                        <SelectItem value="mixed">Mix of Everything</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="budget">Budget Range (per person)</Label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="budget">₹5,000 - ₹10,000</SelectItem>
                        <SelectItem value="mid">₹10,000 - ₹20,000</SelectItem>
                        <SelectItem value="premium">₹20,000 - ₹35,000</SelectItem>
                        <SelectItem value="luxury">₹35,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Special Requests or Questions</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us about any specific requirements, dietary restrictions, or questions you have..."
                      className="mt-2 min-h-[100px]"
                    />
                  </div>

                  <Button size="lg" className="w-full hero-gradient text-white shadow-nature">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Send Planning Request
                  </Button>
                </form>
              </CardContent>
            </Card>
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
                <h3 className="text-lg font-semibold text-foreground mb-4">Why Choose Us?</h3>
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
          </div>
        </div>

        {/* Journey Packages */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Popular <span className="text-accent">Journey Packages</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from our carefully curated packages or let us create a custom itinerary for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeyTypes.map((journey, index) => (
              <Card key={index} className="group hover:shadow-nature transition-smooth hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="font-bold text-foreground mb-2 group-hover:text-accent transition-smooth">
                      {journey.title}
                    </h3>
                    <div className="flex items-center justify-center space-x-1 text-muted-foreground mb-4">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{journey.duration}</span>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      {journey.highlights.map((highlight, highlightIndex) => (
                        <div key={highlightIndex} className="flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-accent" />
                          <span className="text-xs text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                    
                    <p className="font-bold text-lg text-accent mb-4">{journey.price}</p>
                    
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                      Select Package
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlanJourney;