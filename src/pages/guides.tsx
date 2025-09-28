import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Star, Search, MapPin, Languages, BookMarked, IndianRupee, Clock, Users, CheckCircle, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

// --- IMPORT YOUR IMAGE ---
import guidesBanner from "@/assets/vfg.png"; // Use @ which is an alias for src

interface Guide {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  description: string;
  specialties: string[];
  languages: string[];
  experience_years: number;
  cost_per_day: number;
  cost_per_hour: number;
  average_rating: number;
  total_reviews: number;
  profile_image_url: string;
  location: string;
  is_active: boolean;
}

interface BookingFormData {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  number_of_travelers: number;
  tour_duration: string;
  booking_date: Date | undefined;
  special_requests: string;
}

const Guides = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    number_of_travelers: 1,
    tour_duration: "2-3",
    booking_date: new Date(),
    special_requests: ""
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  // Fetch guides from Supabase
  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_applications')
        .select('*')
        .eq('service_type', 'guide')
        .eq('is_active', true)
        .eq('status', 'approved');

      if (error) throw error;
      setGuides(data || []);
    } catch (error) {
      console.error('Error fetching guides:', error);
      toast({
        title: "Error",
        description: "Failed to load guides. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Get all unique specialties and languages
  const allSpecialties = useMemo(() => {
    const specialties = new Set<string>();
    guides.forEach(guide => {
      guide.specialties?.forEach(specialty => specialties.add(specialty));
    });
    return Array.from(specialties);
  }, [guides]);

  const allLanguages = useMemo(() => {
    const languages = new Set<string>();
    guides.forEach(guide => {
      guide.languages?.forEach(language => languages.add(language));
    });
    return Array.from(languages);
  }, [guides]);

  const handleBookNowClick = (guide: Guide) => {
    setSelectedGuide(guide);
    setBookingModalOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide || !formData.booking_date) return;

    setBookingLoading(true);
    try {
      // Calculate total cost
      const numberOfDays = formData.tour_duration === '8+' ? 7 : parseInt(formData.tour_duration.split('-')[0], 10);
      const totalCost = selectedGuide.cost_per_day * numberOfDays;

      const { data, error } = await supabase
        .from('guide_bookings')
        .insert([
          {
            guide_id: selectedGuide.id,
            customer_name: formData.customer_name,
            customer_email: formData.customer_email,
            customer_phone: formData.customer_phone,
            number_of_travelers: formData.number_of_travelers,
            tour_duration: formData.tour_duration,
            booking_date: formData.booking_date.toISOString().split('T')[0],
            total_cost: totalCost,
            special_requests: formData.special_requests || null
          }
        ])
        .select()
        .single();

      if (error) throw error;

      setBookingDetails({
        guideName: selectedGuide.name,
        date: formData.booking_date,
        duration: formData.tour_duration,
        totalCost: totalCost,
        bookingId: data.id
      });

      setBookingModalOpen(false);
      setConfirmationModalOpen(true);
      
      // Reset form
      setFormData({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        number_of_travelers: 1,
        tour_duration: "2-3",
        booking_date: new Date(),
        special_requests: ""
      });

      toast({
        title: "Booking Submitted!",
        description: "Your booking request has been submitted successfully. The guide will contact you soon.",
      });

    } catch (error) {
      console.error('Error creating booking:', error);
      toast({
        title: "Error",
        description: "Failed to submit booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  // UPI payment helper (added)
  const handlePayViaUpi = () => {
    if (!selectedGuide) {
      toast({
        title: "No guide selected",
        description: "Select a guide and open the booking modal to calculate the amount.",
        variant: "destructive",
      });
      return;
    }
    // Calculate the same estimated cost
    let numberOfDays = 0;
    if (formData.tour_duration === '8+') {
      numberOfDays = 7;
    } else {
      numberOfDays = parseInt(formData.tour_duration.split('-')[0], 10);
    }
    const amount = selectedGuide.cost_per_day * (isNaN(numberOfDays) ? 1 : numberOfDays);

    // Navigate to the same UPI route pattern used in LocalMarketplace
    navigate(
      `/upi?amount=${amount}&description=${encodeURIComponent('Guide Booking')}&type=guide&name=${encodeURIComponent(selectedGuide.name)}`
    );
  };

  const totalCost = useMemo(() => {
    if (!selectedGuide) return 0;
    let numberOfDays = 0;
    if (formData.tour_duration === '8+') {
      numberOfDays = 7;
    } else {
      numberOfDays = parseInt(formData.tour_duration.split('-')[0], 10);
    }
    const cost = selectedGuide.cost_per_day * numberOfDays;
    return isNaN(cost) ? '0.00' : cost.toFixed(2);
  }, [selectedGuide, formData.tour_duration]);

  const filteredGuides = useMemo(() => {
    return guides.filter(guide => {
      const nameMatch = guide.name.toLowerCase().includes(searchTerm.toLowerCase());
      const specialtyMatch = specialtyFilter === 'all' || guide.specialties?.includes(specialtyFilter);
      const languageMatch = languageFilter === 'all' || guide.languages?.includes(languageFilter);
      return nameMatch && specialtyMatch && languageMatch;
    });
  }, [guides, searchTerm, specialtyFilter, languageFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <header className="pt-0 pb-0 px-0">
        <img
          src={guidesBanner}
          alt="Verified Guides Banner"
          className="w-full object-cover"
          style={{ height: "520px" }}
        />
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
                <SelectTrigger className="w-full md:w-[180px]">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {allSpecialties.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={languageFilter} onValueChange={setLanguageFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Languages className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  {allLanguages.map(l => (
                    <SelectItem key={l} value={l}>{l}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {filteredGuides.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No guides found matching your criteria.</p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSpecialtyFilter("all");
                setLanguageFilter("all");
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="overflow-hidden group hover:shadow-lg transition-shadow flex flex-col">
                <div className="relative">
                  <img 
                    src={guide.profile_image_url} 
                    alt={guide.name} 
                    className="w-full h-64 object-cover" 
                  />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-sm font-semibold">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span>{guide.average_rating?.toFixed(1) || '0.0'}</span>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{guide.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {guide.experience_years} years of experience | {guide.total_reviews} reviews
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{guide.location}</p>
                  
                  {guide.specialties && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.specialties.map(spec => (
                        <Badge key={spec} variant="secondary">{spec}</Badge>
                      ))}
                    </div>
                  )}
                  
                  {guide.languages && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {guide.languages.map(lang => (
                        <Badge key={lang} variant="outline">{lang}</Badge>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{guide.description}</p>
                  
                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Per Day:</span>
                      <span className="font-bold flex items-center">
                        <IndianRupee size={16} />{guide.cost_per_day}
                      </span>
                    </div>
                    <Button 
                      className="w-full hero-gradient text-white shadow-nature" 
                      onClick={() => handleBookNowClick(guide)}
                    >
                      <BookMarked className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Dialog open={isBookingModalOpen} onOpenChange={setBookingModalOpen}>
        <DialogContent className="bg-background sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedGuide && (
            <>
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold">Book Your Tour with {selectedGuide.name}</DialogTitle>
                <DialogDescription>Please fill out the details below to schedule your tour.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4">
                <div className="space-y-4">
                  <Input 
                    placeholder="Full Name" 
                    required 
                    value={formData.customer_name}
                    onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                  />
                  <Input 
                    type="email" 
                    placeholder="Email Address" 
                    required 
                    value={formData.customer_email}
                    onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                  />
                  <Input 
                    placeholder="Phone Number" 
                    required 
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                  />
                  <Select 
                    value={formData.number_of_travelers.toString()} 
                    onValueChange={(value) => setFormData({...formData, number_of_travelers: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <Users className="w-4 h-4 mr-2" />
                      <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Traveler</SelectItem>
                      <SelectItem value="2">2 Travelers</SelectItem>
                      <SelectItem value="3">3 Travelers</SelectItem>
                      <SelectItem value="4">4 Travelers</SelectItem>
                      <SelectItem value="5">5+ Travelers</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.tour_duration} 
                    onValueChange={(value) => setFormData({...formData, tour_duration: value})}
                  >
                    <SelectTrigger>
                      <Clock className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Select duration"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-3">2-3 Days</SelectItem>
                      <SelectItem value="4-5">4-5 Days</SelectItem>
                      <SelectItem value="6-7">6-7 Days</SelectItem>
                      <SelectItem value="8+">More than a week</SelectItem>
                    </SelectContent>
                  </Select>
                  <Textarea 
                    placeholder="Special requests or requirements (optional)"
                    value={formData.special_requests}
                    onChange={(e) => setFormData({...formData, special_requests: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <Calendar 
                    mode="single" 
                    selected={formData.booking_date} 
                    onSelect={(date) => setFormData({...formData, booking_date: date})} 
                    className="rounded-md border self-center"
                    disabled={(date) => date < new Date()}
                  />
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="text-lg font-semibold mb-2">Total Estimated Cost</h4>
                    <div className="text-4xl font-bold text-accent flex items-center">
                      <IndianRupee /> {totalCost}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      for a {formData.tour_duration.replace('-', ' to ').replace('+', '')} day tour starting {formData.booking_date?.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Payment via UPI (added) + existing Confirm Booking */}
                <div className="md:col-span-2 space-y-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handlePayViaUpi}
                    disabled={!selectedGuide}
                  >
                    Pay via UPI - ₹{totalCost}
                  </Button>

                </div>
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
               <p className="text-muted-foreground mb-4">
                 {bookingDetails.guideName} will contact you within 2 hours to confirm availability and details.
               </p>
               <div className="bg-muted p-4 rounded-lg mb-4">
                 <p className="text-sm"><strong>Booking ID:</strong> {bookingDetails.bookingId?.slice(0, 8)}</p>
                 <p className="text-sm"><strong>Total Cost:</strong> ₹{bookingDetails.totalCost}</p>
               </div>

               {/* Pay after booking (added) */}
               <Button
                 className="w-full mb-2 hero-gradient text-white"
                 onClick={() =>
                   navigate(
                     `/upi?amount=${bookingDetails.totalCost}&description=${encodeURIComponent('Guide Booking')}&type=guide&name=${encodeURIComponent(bookingDetails.guideName)}`
                   )
                 }
               >
                 Pay Now via UPI - ₹{bookingDetails.totalCost}
               </Button>

               <Button className="w-full mt-2" onClick={() => setConfirmationModalOpen(false)}>Close</Button>
             </div>
           )}
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Guides;
