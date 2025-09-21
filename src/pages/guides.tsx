import { useState, useMemo } from "react";
import Navigation from "../components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Star, Search, MapPin, Languages, BookMarked, X, IndianRupee, Clock, Users, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "../components/ui/use-toast";

// Import the guide images
import guideRajesh from "../assets/guide-rajesh.jpg";
import guidePriya from "../assets/guide-priya.jpg";
import guideArjun from "../assets/guide-arjun.jpg";

const guidesData = [
  {
    name: "Rajesh Kumar",
    image: guideRajesh,
    specialties: ["Wildlife", "Trekking"],
    languages: ["Hindi", "English"],
    experience: 12,
    rating: 4.9,
    reviews: 142,
    bio: "A passionate wildlife expert and certified mountaineer. Rajesh has been guiding treks through Jharkhand's national parks for over a decade, revealing hidden trails and rare animal sightings.",
    cost: { perDay: 3000, perHour: 500, groupDiscount: "10% off for groups of 5 or more." },
    sampleReviews: [
      { user: "Ankit S.", rating: 5, comment: "Rajesh's knowledge of the jungle is incredible! We saw so many rare birds and even a leopard from a distance. Highly recommended for wildlife lovers." },
      { user: "Maria G.", rating: 5, comment: "The best trekking guide I've ever had. Very professional, safety-conscious, and shared amazing stories about the local flora and fauna." },
      { user: "Vikram P.", rating: 4, comment: "A great guide for the Parasnath Hill trek. Was a bit fast-paced for our family, but his expertise was undeniable. Pointed out things we never would have seen." },
      { user: "Chloe W.", rating: 5, comment: "Absolutely fantastic! Rajesh is patient and his passion for conservation is inspiring. The entire trip was seamless and unforgettable." },
    ]
  },
  {
    name: "Priya Singh",
    image: guidePriya,
    specialties: ["Culture", "History", "Cuisine"],
    languages: ["English", "Hindi", "Santhali"],
    experience: 8,
    rating: 5.0,
    reviews: 98,
    bio: "Priya offers immersive cultural tours, connecting travelers with local artisans and ancient heritage sites. Her knowledge of tribal history and cuisine is unmatched.",
    cost: { perDay: 2500, perHour: 400, groupDiscount: "15% off for cultural workshops." },
    sampleReviews: [
      { user: "David L.", rating: 5, comment: "Priya made history come alive. Her passion is contagious! The visit to the ancient temples was the highlight of our trip." },
      { user: "Sunita M.", rating: 5, comment: "Felt like I was visiting family. Priya is so warm and welcoming, and the home-cooked meal she arranged was the best food I had in Jharkhand." },
      { user: "Aditya B.", rating: 5, comment: "If you want an authentic cultural experience, look no further. Priya's ability to speak Santhali opened up so many doors and conversations for us. Truly special." },
    ]
  },
  {
    name: "Arjun Mahto",
    image: guideArjun,
    specialties: ["History", "Photography"],
    languages: ["Hindi", "Bengali"],
    experience: 20,
    rating: 4.8,
    reviews: 210,
    bio: "With 20 years of experience, Arjun is a master storyteller who brings historical sites to life. He specializes in photography tours, helping you capture the perfect shot.",
    cost: { perDay: 2800, perHour: 450, groupDiscount: "Special rates for photography groups." },
    sampleReviews: [
      { user: "Kenji T.", rating: 5, comment: "Arjun knows all the best spots for photos. My portfolio has never looked better. He understands light and composition perfectly." },
      { user: "Fatima K.", rating: 4, comment: "A very patient and knowledgeable guide. His stories about the historical sites were fascinating. The pace was a little slow at times, but overall a great experience." },
      { user: "Rohan V.", rating: 5, comment: "A living encyclopedia of Jharkhand's history. Arjun's experience is evident in every story he tells. A true professional." },
      { user: "Isabelle D.", rating: 5, comment: "Helped me capture the soul of Jharkhand through my lens. Arjun is more than a guide; he's a mentor for any visiting photographer." },
      { user: "Sameer J.", rating: 5, comment: "Incredible tour. Arjun's deep connection to his land and its history is palpable. I learned so much and got amazing pictures." },
    ]
  },
];

const allSpecialties = ["Wildlife", "Trekking", "Culture", "History", "Cuisine", "Photography"];
const allLanguages = ["Hindi", "English", "Santhali", "Bengali"];

const Guides = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedGuide, setSelectedGuide] = useState<any | null>(null);
  const [isReviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [isCostModalOpen, setCostModalOpen] = useState(false);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any | null>(null);

  const [bookingDate, setBookingDate] = useState<Date | undefined>(new Date());
  const [tourDuration, setTourDuration] = useState("2-3");
  const { toast } = useToast();

  const handleReviewsClick = (guide) => {
    setSelectedGuide(guide);
    setReviewsModalOpen(true);
  };

  const handleCostClick = (guide) => {
    setSelectedGuide(guide);
    setCostModalOpen(true);
  };
  
  const handleBookNowClick = (guide) => {
    setSelectedGuide(guide);
    setBookingModalOpen(true);
  };
  
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingDetails({
      guideName: selectedGuide.name,
      date: bookingDate,
      duration: tourDuration
    });
    setBookingModalOpen(false);
    setConfirmationModalOpen(true);
  };

  const totalCost = useMemo(() => {
    if (!selectedGuide) return 0;
    let numberOfDays = 0;
    if (tourDuration === '8+') {
      numberOfDays = 7;
    } else {
      numberOfDays = parseInt(tourDuration.split('-')[0], 10);
    }
    const cost = selectedGuide.cost.perDay * numberOfDays;
    return cost.toFixed(2);
  }, [selectedGuide, tourDuration]);

  const filteredGuides = useMemo(() => {
    return guidesData.filter(guide => {
      const nameMatch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
      const specialtyMatch = specialtyFilter === 'all' || guide.specialties.includes(specialtyFilter);
      const languageMatch = languageFilter === 'all' || guide.languages.includes(languageFilter);
      return nameMatch && specialtyMatch && languageMatch;
    });
  }, [searchTerm, specialtyFilter, languageFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <header className="relative pt-28 pb-16 bg-gradient-to-b from-slate-50 to-background overflow-hidden">
        <div className="absolute inset-0 -z-10">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="text-accent">Verified Guides</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore Jharkhand with our certified, experienced, and passionate local guides. Find the perfect expert for your adventure.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        <Card className="mb-12 shadow-sm">
          <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search guide by name..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
                <SelectTrigger className="w-full md:w-[180px]"><MapPin className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter by specialty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {allSpecialties.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full md:w-[180px]"><Languages className="h-4 w-4 mr-2" /><SelectValue placeholder="Filter by language" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {allLanguages.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGuides.map((guide) => (
            <Card key={guide.name} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
              <div className="relative">
                <img src={guide.image} alt={guide.name} className="w-full h-64 object-cover" />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-semibold">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span>{guide.rating.toFixed(1)}</span>
                </div>
              </div>
              <CardContent className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-foreground mb-2">{guide.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{guide.experience} years of experience | {guide.reviews} reviews</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.specialties.map(spec => <Badge key={spec} variant="secondary">{spec}</Badge>)}
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.languages.map(lang => <Badge key={lang} variant="outline">{lang}</Badge>)}
                </div>
                <p className="text-muted-foreground text-sm mb-6 h-20 overflow-hidden">{guide.bio}</p>
                <div className="mt-auto space-y-3">
                  <div className="flex gap-2">
                     <Button variant="outline" className="w-full" onClick={() => handleReviewsClick(guide)}>Reviews</Button>
                     <Button variant="outline" className="w-full" onClick={() => handleCostClick(guide)}>Cost Details</Button>
                  </div>
                  <Button className="w-full hero-gradient text-white shadow-nature" onClick={() => handleBookNowClick(guide)}>
                    <BookMarked className="w-4 h-4 mr-2" />
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Dialog open={isReviewsModalOpen} onOpenChange={setReviewsModalOpen}>
        <DialogContent className="bg-background sm:max-w-xl">
          {selectedGuide && (
            <>
              <DialogHeader><DialogTitle className="text-2xl">Reviews for {selectedGuide.name}</DialogTitle><DialogDescription className="text-base">Read what other travelers have to say.</DialogDescription></DialogHeader>
              <div className="py-4 space-y-6 max-h-[60vh] overflow-y-auto">
                {selectedGuide.sampleReviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />)}
                        {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-muted-foreground/50" />)}
                      </div>
                      <span className="font-bold text-lg">{review.user}</span>
                    </div>
                    <p className="text-muted-foreground italic text-base">"{review.comment}"</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isCostModalOpen} onOpenChange={setCostModalOpen}>
       <DialogContent className="bg-background sm:max-w-lg">
          {selectedGuide && (
            <>
              <DialogHeader><DialogTitle className="text-2xl">Cost Details for {selectedGuide.name}</DialogTitle><DialogDescription className="text-base">Pricing and package information.</DialogDescription></DialogHeader>
              <div className="py-4 space-y-4 text-base">
                 <div className="flex justify-between items-center"><p className="text-muted-foreground">Cost per Day:</p><p className="font-bold text-lg flex items-center"><IndianRupee size={18} />{selectedGuide.cost.perDay}</p></div>
                 <div className="flex justify-between items-center"><p className="text-muted-foreground">Cost per Hour:</p><p className="font-bold text-lg flex items-center"><IndianRupee size={18} />{selectedGuide.cost.perHour}</p></div>
                 <div className="mt-6 pt-4 border-t"><p className="font-semibold text-lg">Group Discounts:</p><p className="text-muted-foreground text-base">{selectedGuide.cost.groupDiscount}</p></div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isBookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="bg-background sm:max-w-4xl">
          {selectedGuide && (
            <>
              <DialogHeader><DialogTitle className="text-3xl font-bold">Book Your Tour with {selectedGuide.name}</DialogTitle><DialogDescription>Please fill out the details below to schedule your tour.</DialogDescription></DialogHeader>
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="space-y-4">
                  <Input placeholder="Full Name" required /><Input type="email" placeholder="Email Address" required /><Input placeholder="Phone Number" required />
                  <Select defaultValue="1"><SelectTrigger><Users className="w-4 h-4 mr-2" /><SelectValue/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Traveler</SelectItem><SelectItem value="2">2 Travelers</SelectItem><SelectItem value="3">3 Travelers</SelectItem><SelectItem value="4">4 Travelers</SelectItem><SelectItem value="5">5+ Travelers</SelectItem>
                    </SelectContent>
                  </Select>
                   <Select value={tourDuration} onValueChange={setTourDuration}>
                    <SelectTrigger><Clock className="w-4 h-4 mr-2" /><SelectValue placeholder="Select duration"/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-3">2-3 Days</SelectItem><SelectItem value="4-5">4-5 Days</SelectItem><SelectItem value="6-7">6-7 Days</SelectItem><SelectItem value="8+">More than a week</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col">
                   <Calendar mode="single" selected={bookingDate} onSelect={setBookingDate} className="rounded-md border self-center"/>
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-lg font-semibold mb-2">Total Estimated Cost</h4>
                      <div className="text-4xl font-bold text-accent flex items-center"><IndianRupee /> {totalCost}</div>
                      <p className="text-sm text-muted-foreground">for a {tourDuration.replace('-', ' to ').replace('+', '')} day tour starting {bookingDate?.toLocaleDateString()}</p>
                    </div>
                </div>
                 <div className="md:col-span-2"><Button type="submit" size="lg" className="w-full hero-gradient text-white shadow-nature">Confirm Booking</Button></div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={isConfirmationModalOpen} onOpenChange={setConfirmationModalOpen}>
        <DialogContent className="bg-background sm:max-w-md">
           {bookingDetails && (
              <div className="text-center p-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Booking Request Submitted!</h2>
                <p className="text-muted-foreground mb-6">
                  {bookingDetails.guideName} will contact you within 2 hours to confirm availability and details.
                </p>
                <Button className="w-full mt-6" onClick={() => setConfirmationModalOpen(false)}>Close</Button>
              </div>
           )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Guides;
