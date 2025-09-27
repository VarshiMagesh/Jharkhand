import { useState, useMemo } from "react";
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
import { MapPin, Star, Clock, Users, Camera, TreePine } from "lucide-react";
import { Link } from "react-router-dom";
import DestinationVideo from "@/assets/destination-video.mp4";

// Import your image assets

const allDestinations = [
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
    icon: Camera,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: TreePine,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: Users,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: Camera,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: Users,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: Camera,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: Users,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: Camera,
    rating: 4.5,
    duration: "2-3 hours"
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
    icon: TreePine,
    rating: 4.5,
    duration: "2-3 hours"
  }
];
const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("default");

  const categories = ["All", ...new Set(allDestinations.map((dest) => dest.category))];

  const finalDestinations = useMemo(() => {
    return allDestinations.filter((dest) => {
      const matchesSearch =
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "All" || dest.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="relative min-h-screen">
      {/* Top section with video */}
      <section className="relative h-[600px]">
        <video
          src={DestinationVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-4">
          <Navigation />

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Explore <span className="text-yellow-400">Destinations</span>
          </h1>
          <p className="text-lg max-w-3xl text-white">
            Discover the most breathtaking places in Jharkhand, from majestic waterfalls to wildlife sanctuaries and serene hill stations.
          </p>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Cream background for destination cards */}
      <section className="bg-cream-100 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search & Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 max-w-2xl mx-auto">
            <Input
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                <SelectItem value="rating-desc">Rating (High to Low)</SelectItem>
                <SelectItem value="location-asc">Location (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Destination Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {finalDestinations.map((destination) => (
              <Card key={destination.id} className="overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent>
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 mr-1" /> {destination.location}
                  </div>
                  <p className="text-sm text-muted-foreground">{destination.description}</p>
                  <Link to={`/destinations/${destination.id}`}>
                    <Button variant="outline" className="mt-4 w-full">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;