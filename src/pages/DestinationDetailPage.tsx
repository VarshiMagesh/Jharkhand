import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera } from "lucide-react";

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const destinationId = parseInt(id, 10);
      const found = destinations.find((d) => d.id === destinationId);
      setDestination(found || null);
    }
  }, [id]);

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4">Destination Not Found</h1>
            <Link to="/destinations"><Button>Back to Destinations</Button></Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />
      <main id="main" className="flex-1">
        <section className="relative h-[60vh] overflow-hidden">
          <img src={destination.image} alt={destination.name} className="w-full h-full object-cover"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-8 left-8 text-white">
            <Badge className="bg-accent text-accent-foreground mb-2">{destination.category}</Badge>
            <h1 className="text-4xl font-bold">{destination.name}</h1>
            <p className="text-lg text-white/90 max-w-2xl">{destination.description}</p>
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-12">
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Visit Details</TabsTrigger>
                    <TabsTrigger value="location">Location</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                    <Card>
                        <CardHeader><CardTitle>View {destination.name}</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            {/* The 360 view is now here */}
                            {destination.panoramaEmbedUrl && (
                                <div className="aspect-video w-full overflow-hidden rounded-lg">
                                    <iframe
                                        src={destination.panoramaEmbedUrl}
                                        title={`${destination.name} 360° View`}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                    ></iframe>
                                </div>
                            )}
                            <p className="text-muted-foreground leading-relaxed">
                                {destination.fullDescription}
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="details">
                    <Card>
                        <CardHeader><CardTitle>Visiting Information</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div><h4 className="font-medium text-primary">Best Time to Visit</h4><p>{destination.bestTime}</p></div>
                            <div><h4 className="font-medium text-primary">Timings</h4><p>{destination.timings}</p></div>
                            <div><h4 className="font-medium text-primary">Entry Fee</h4><p>{destination.entryFee}</p></div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="location">
                    <Card>
                        <CardHeader><CardTitle>Location & Map</CardTitle></CardHeader>
                        <CardContent className="aspect-video">
                            <iframe
                                src={destination.mapEmbedUrl}
                                title={`${destination.name} Map`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}