import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Camera, 
  Clock, 
  MapPin, 
  Star, 
  Calendar, 
  DollarSign, 
  ArrowLeft, 
  ExternalLink, 
  Eye,
  Map as MapIcon
} from "lucide-react";

interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  image: string;
  description: string;
  fullDescription: string;
  highlights: string[];
  timings: string;
  bestTime: string;
  entryFee: string;
  gallery: string[];
  mapEmbedUrl: string;
  panoramaEmbedUrl: string | null;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: "Jonha Falls",
    location: "Ranchi",
    category: "Waterfall",
    image: "/jonhafalls.jpg",
    description: "A beautiful, hanging valley waterfall surrounded by lush forests.",
    fullDescription: "Jonha Falls is a waterfall located in the Ranchi district of the Indian state of Jharkhand. Situated on the edge of the Ranchi plateau, it is an example of a hanging valley waterfall. To admire the fall, one must descend around 750 steps. There is also a Buddhist shrine here, with a temple dedicated to Lord Gautama Buddha.",
    highlights: ["Picturesque scenery", "Buddhist shrine", "750 steps down"],
    timings: "8:00 AM - 4:00 PM",
    bestTime: "October to February",
    entryFee: "Free (Parking fees may apply)",
    gallery: ["/jonhafalls.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3663.267898604803!2d85.61020549999999!3d23.3423069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f45588d35ee645%3A0x3293be91dcc1eb17!2sJonha%20Falls!5e0!3m2!1sen!2sin!4v1758380102602!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/a2525130c1ba4d8fb87030021919b1d1?utm_campaign=embed&utm_source=other&heading=0&pitch=0&field-of-view=75&size=medium"
  },
  {
    id: 2,
    name: "Netarhat",
    location: "Latehar",
    category: "Hill Station",
    image: "/netarhat.jpg",
    description: "Known as the 'Queen of Chotanagpur', famous for its stunning sunrises and sunsets.",
    fullDescription: "Netarhat is a popular hill station in the Latehar district of Jharkhand. Situated at an altitude of 3,696 feet, it is renowned for its serene environment, lush green forests, and picturesque landscapes, especially the views from Magnolia Point at sunset and Koel View Point at sunrise.",
    highlights: ["Magnolia Point (Sunset)", "Koel View Point (Sunrise)", "Netarhat Residential School"],
    timings: "Open 24 hours (viewpoints best at dawn/dusk)",
    bestTime: "October to March",
    entryFee: "Free",
    gallery: ["/netarhat.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58549.09594597022!2d84.1892121886978!3d23.485034946567637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b08073b9e73e9%3A0x27447d0d1c7e558f!2sNetarhat%2C%20Jharkhand%20835218!5e0!3m2!1sen!2sin!4v1758380218985!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/7ee3601bdcfb4457ad21873277c5db22?utm_campaign=embed&utm_source=other&heading=-61&pitch=-5.5&field-of-view=75&size=medium"
  },
  {
    id: 3,
    name: "Betla National Park",
    location: "Latehar",
    category: "National Park",
    image: "/betlanationalpark.jpg",
    description: "One of India's earliest tiger reserves, offering rich biodiversity and wildlife safaris.",
    fullDescription: "Betla National Park is a national park located on the Chota Nagpur Plateau in the Latehar district. It was one of the first nine tiger reserves established in India under Project Tiger. The park boasts a wide variety of wildlife, including elephants, tigers, leopards, and deer, and offers jeep safaris for visitors.",
    highlights: ["Jeep Safaris", "Tiger and Elephant sightings", "Palamu Forts"],
    timings: "6:00 AM - 5:00 PM (Safari timings vary)",
    bestTime: "October to April",
    entryFee: "Varies for entry, vehicle, and guide.",
    gallery: ["/betlanationalpark.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29184.506529685255!2d84.15838299357637!3d23.887373389666564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398b8379e9a69063%3A0x6c76abbdcc05d0ce!2sBetla%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1758380307117!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/f9be11f6745e45c6b07159b31d94aba0?utm_campaign=embed&utm_source=other&heading=-200.76&pitch=22.51&field-of-view=75&size=medium"
  },
  {
    id: 4,
    name: "Dassam Falls",
    location: "Ranchi",
    category: "Waterfall",
    image: "/dassamfalls.jpg",
    description: "A spectacular waterfall where the Kanchi River plunges from a height of 144 feet.",
    fullDescription: "Dassam Falls, also known as Dassam Ghagh, is located near Taimara village in the Ranchi district. The water of the Kanchi River cascades down from a height of about 44 meters (144 ft), creating a stunning view. It is a popular picnic spot, but swimming is prohibited due to the strong currents.",
    highlights: ["144-foot drop", "Natural rock formations", "Popular picnic spot"],
    timings: "9:00 AM - 5:00 PM",
    bestTime: "October to February",
    entryFee: "Nominal fee for entry and parking.",
    gallery: ["/dassamfalls.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3668.7297215278627!2d85.46411212433888!3d23.14355251180454!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5056e67b9e4a3%3A0x25570e4d2a5836ee!2sDassam%20Falls!5e0!3m2!1sen!2sin!4v1758380383272!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/2702a395280a43d6a38fd74f77c4b37e?utm_campaign=embed&utm_source=other&heading=-463.36&pitch=-12.75&field-of-view=75&size=medium"
  },
  {
    id: 5,
    name: "Jagannath Temple",
    location: "Ranchi",
    category: "Temple",
    image: "/jagannathtemple.jpg",
    description: "A 17th-century temple built in the Kalinga architectural style, resembling the famous Puri temple.",
    fullDescription: "The Jagannath Temple in Ranchi was built in 1691 by king Ani Nath Shahdeo. It is located on a small hillock in the Jagannathpur area and is a smaller replica of the famous Jagannath Temple in Puri. The annual Rath Yatra festival held here is a major attraction, drawing thousands of devotees.",
    highlights: ["Kalinga Architecture", "Annual Rath Yatra", "Panoramic city view"],
    timings: "5:00 AM - 12:00 PM, 4:00 PM - 9:00 PM",
    bestTime: "During the Rath Yatra festival (June/July)",
    entryFee: "Free",
    gallery: ["/jagannathtemple.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29548.022337508693!2d85.60574497175944!3d22.220994218140223!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a1e353c8e07436d%3A0xb9d4fc164a74ce34!2sJagannathpur%2C%20Jharkhand%20833203!5e0!3m2!1sen!2sin!4v1758380438228!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/55436d1cbf6149ca9d95a831a8c64bee?utm_campaign=embed&utm_source=other&heading=-343.21&pitch=10.13&field-of-view=75&size=medium"
  },
  {
    id: 6,
    name: "Sita Falls",
    location: "Ranchi",
    category: "Waterfall",
    image: "/sitafalls.jpg",
    description: "A serene and lesser-known waterfall, offering a tranquil escape into nature.",
    fullDescription: "Sita Falls is located near Ranchi and is formed by the rivulets of the Radu River. It's a relatively unexplored and peaceful spot, ideal for those looking to avoid the crowds found at more popular falls. The surrounding dense forests add to its natural charm.",
    highlights: ["Tranquil atmosphere", "Scenic beauty", "Ideal for nature walks"],
    timings: "9:00 AM - 5:00 PM",
    bestTime: "October to February",
    entryFee: "Free",
    gallery: ["/sitafalls.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.2250860513846!2d85.64204006005222!3d23.341799948572636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f455454f574ffb%3A0x434a065098e91bf0!2sSita%20Falls!5e0!3m2!1sen!2sin!4v1758380518596!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/c785e817c04a45d1b317fff3c0b24072?utm_campaign=embed&utm_source=other&heading=-227.14&pitch=-8.29&field-of-view=74&size=medium"
  },
  {
    id: 7,
    name: "Bhagwan Birsa Biological Park",
    location: "Ranchi",
    category: "Zoo / Biological Park",
    image: "/birsazoo.jpg",
    description: "A sprawling zoo and botanical garden housing a wide variety of flora and fauna.",
    fullDescription: "Located on the Ranchi-Patna highway, the Bhagwan Birsa Biological Park is a well-maintained zoological garden. It's divided into two sections by the highway: the larger zoological section and a smaller botanical section. It's a popular spot for families and wildlife enthusiasts, featuring a boating facility in its artificial lake.",
    highlights: ["Diverse animal species", "Boating facility", "Botanical garden"],
    timings: "9:00 AM - 5:00 PM (Closed on Mondays)",
    bestTime: "October to March",
    entryFee: "Nominal fee for adults, children, and cameras.",
    gallery: ["/birsazoo.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.924580760875!2d85.45262807434946!3d23.463184799743978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4fb201192ee93%3A0x41461501d203da8e!2sBhagwan%20Birsa%20Biological%20Park!5e0!3m2!1sen!2sin!4v1758380580127!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/4c9c78e958bd4e9ba3a98ca2743d39f5?utm_campaign=embed&utm_source=other&heading=-121.46&pitch=-3.49&field-of-view=75&size=medium"
  },
  {
    id: 8,
    name: "Tagore Hill",
    location: "Ranchi",
    category: "Hill / Landmark",
    image: "/tagorehill.jpg",
    description: "A historic hill associated with the Tagore family, offering panoramic views of Ranchi.",
    fullDescription: "Tagore Hill is a scenic spot in Ranchi named after the famous poet Rabrindranath Tagore. His elder brother, Jyotirindranath Tagore, built a house (Shanti Dham) here and spent his last years on this hill. It's a place of historical significance and offers a breathtaking 360-degree view of the city.",
    highlights: ["Connection to Rabindranath Tagore", "Panoramic city view", "Ramakrishna Mission ashram"],
    timings: "Open 24 hours (best during daylight)",
    bestTime: "October to March",
    entryFee: "Free",
    gallery: ["/tagorehill.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.6312243658253!2d85.3354987743474!3d23.401554602081152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e1496994ac09%3A0xb41a61fed030697a!2sTagore%20Hill!5e0!3m2!1sen!2sin!4v1758380694645!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/0ab230fe8f4e48dfb3f9d9c9862ae986?utm_campaign=embed&utm_source=other&heading=-325.26&pitch=16.56&field-of-view=75&size=medium"
  },
  {
    id: 9,
    name: "Nakshatra Van",
    location: "Ranchi",
    category: "Park / Garden",
    image: "/nakshatravan.jpg",
    description: "A unique park where trees are planted according to zodiac signs and astrological beliefs.",
    fullDescription: "Nakshatra Van is a park created by the Jharkhand Forest Department near the Governor's House. The park is designed based on the concept of Nakshatras (lunar mansions in Hindu astrology), with each Nakshatra associated with a specific tree that is believed to be sacred. It's a beautiful blend of astrology, botany, and leisure, featuring a musical fountain.",
    highlights: ["Unique astrological concept", "Musical fountain", "Well-maintained pathways"],
    timings: "9:30 AM - 6:30 PM (Closed on Mondays)",
    bestTime: "Throughout the year",
    entryFee: "Nominal entry fee.",
    gallery: ["/nakshatravan.jpg"],
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3662.193150929567!2d85.31820747434672!3d23.381228802850742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e118fbedf5ed%3A0x5d066ca940714a51!2sNakshatra%20Van!5e0!3m2!1sen!2sin!4v1758380744931!5m2!1sen!2sin0",
    panoramaEmbedUrl: "https://momento360.com/e/u/4f62b449086a40b7a44c424bdf2ee2b0?utm_campaign=embed&utm_source=other&heading=-351.05&pitch=6.7&field-of-view=75&size=medium"
  }
];

export default function DestinationDetailPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [activeTab, setActiveTab] = useState("experience");

  useEffect(() => {
    if (id) {
      const destinationId = parseInt(id, 10);
      const found = destinations.find((d) => d.id === destinationId);
      setDestination(found || null);
    }
  }, [id]);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center glass-card border-white/10 p-12 rounded-2xl">
            <h1 className="text-2xl font-semibold mb-4">Destination Not Found</h1>
            <Link to="/destinations">
              <Button className="gradient-nature shadow-nature">Back to Destinations</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      
      {/* Hero Section with Immersive Image */}
      <section className="relative h-screen overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Back Button */}
        <Link 
          to="/destinations" 
          className="absolute top-24 left-8 z-10 glass-card border-white/20 p-3 rounded-full hover:gradient-nature transition-all group"
        >
          <ArrowLeft className="w-5 h-5 text-white group-hover:text-white" />
        </Link>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-16">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <Badge className="gradient-earth text-white mb-4 px-4 py-2 text-sm">
                {destination.category}
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                {destination.name}
              </h1>
              <div className="flex items-center space-x-4 text-white/90 mb-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{destination.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-accent fill-current" />
                  <span className="text-lg">4.5</span>
                </div>
              </div>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                {destination.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gradient-nature shadow-nature text-lg px-8"
                  onClick={() => setActiveTab("experience")}
                >
                  <Eye className="w-5 h-5 mr-2" />
                  Experience 360°
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="glass-card border-white/30 text hover:gradient-nature text-lg px-8"
                  onClick={() => setActiveTab("location")}
                >
                  <MapIcon className="w-5 h-5 mr-2" />
                  View on Map
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Main Content Area */}
              <div className="flex-1">
                <TabsList className="grid w-full grid-cols-3 mb-8 glass-card border-white/10 p-1">
                  <TabsTrigger 
                    value="experience" 
                    className="data-[state=active]:gradient-nature data-[state=active]:text-white"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    360° Experience
                  </TabsTrigger>
                  <TabsTrigger 
                    value="details"
                    className="data-[state=active]:gradient-nature data-[state=active]:text-white"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Visit Details
                  </TabsTrigger>
                  <TabsTrigger 
                    value="location"
                    className="data-[state=active]:gradient-nature data-[state=active]:text-white"
                  >
                    <MapIcon className="w-4 h-4 mr-2" />
                    Location
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="experience" className="space-y-8">
                  <Card className="glass-card border-white/10 overflow-hidden">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                        <Eye className="w-6 h-6 text-primary" />
                        <span>Immersive 360° View</span>
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Experience {destination.name} like never before with our interactive 360° panorama
                      </p>
                    </CardHeader>
                    <CardContent className="p-0">
                      {destination.panoramaEmbedUrl ? (
                        <div className="aspect-video w-full bg-muted/20">
                          <iframe
                            src={destination.panoramaEmbedUrl}
                            title={`${destination.name} 360° View`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            className="rounded-b-lg"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video w-full bg-muted/20 flex items-center justify-center rounded-b-lg">
                          <div className="text-center">
                            <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <p className="text-muted-foreground">360° view coming soon</p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-white/10">
                    <CardHeader>
                      <CardTitle>About This Destination</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {destination.fullDescription}
                      </p>
                      
                      <div>
                        <h4 className="font-semibold text-primary mb-3 flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Key Highlights
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {destination.highlights.map((highlight, index) => (
                            <div
                              key={index}
                              className="glass-card border-white/10 p-3 rounded-lg"
                            >
                              <span className="text-sm">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="details" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span>Best Time to Visit</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg">{destination.bestTime}</p>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Clock className="w-5 h-5 text-primary" />
                          <span>Opening Hours</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg">{destination.timings}</p>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <DollarSign className="w-5 h-5 text-primary" />
                          <span>Entry Fee</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg">{destination.entryFee}</p>
                      </CardContent>
                    </Card>

                    <Card className="glass-card border-white/10">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <MapPin className="w-5 h-5 text-primary" />
                          <span>Location</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-lg">{destination.location}, Jharkhand</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="location">
                  <Card className="glass-card border-white/10 overflow-hidden">
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl flex items-center justify-center space-x-2">
                        <MapIcon className="w-6 h-6 text-primary" />
                        <span>Interactive Map</span>
                      </CardTitle>
                      <p className="text-muted-foreground">
                        Get directions and explore the area around {destination.name}
                      </p>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="aspect-video w-full bg-muted/20">
                        <iframe
                          src={destination.mapEmbedUrl}
                          title={`${destination.name} Map`}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          className="rounded-b-lg"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>

              {/* Sidebar */}
              <div className="lg:w-80 space-y-6">
                <Card className="glass-card border-white/10 sticky top-24">
                                    <CardContent className="space-y-4">
                                        
                    <div className="pt-4 border-t border-white/10">
                      <h4 className="font-semibold mb-3">Quick Info</h4>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span className="text-foreground">{destination.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating:</span>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-accent fill-current" />
                            <span className="text-foreground">4.5</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span>Entry:</span>
                          <span className="text-foreground">
                            {destination.entryFee.includes('Free') ? 'Free' : 'Paid'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}