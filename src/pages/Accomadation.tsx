import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Star, MapPin, Heart, Filter, Search, Mountain, ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const JharkhandStays = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceRange, setPriceRange] = useState([500, 25000]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [propertyType, setPropertyType] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState({});

  // Authentic Jharkhand accommodations data matching Airbnb style
  const accommodations = [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
      ],
      title: "Room in Ranchi",
      subtitle: "Stay with Raunak",
      description: "Couple Friendly-Cheap & Best",
      dates: "2-7 Oct",
      price: 8787,
      originalPrice: null,
      rating: 5.0,
      reviews: 19,
      isGuestFavorite: true,
      host: {
        name: "Raunak",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      location: "Ranchi",
      type: "Room"
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop"
      ],
      title: "Room in Ranchi",
      subtitle: "Stay with Raunak · Service",
      description: "Larang a luxury villa in Ranchi",
      dates: "3-8 Oct",
      price: 21112,
      originalPrice: null,
      rating: 5.0,
      reviews: 17,
      isGuestFavorite: true,
      host: {
        name: "Ranauk",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      location: "Ranchi",
      type: "Room"
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop"
      ],
      title: "Home in Deoghar",
      subtitle: "Peaceful Stay Near Baba...",
      description: "1 bed",
      dates: "2-7 Oct",
      price: 6943,
      originalPrice: null,
      rating: 5.0,
      reviews: 4,
      isGuestFavorite: true,
      host: {
        name: "Sunita",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      location: "Deoghar",
      type: "Home"
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
      ],
      title: "Villa in Netarhat",
      subtitle: "Stay with Vikram",
      description: "Hilltop retreat with sunrise views",
      dates: "5-10 Oct",
      price: 15200,
      originalPrice: null,
      rating: 4.9,
      reviews: 23,
      isGuestFavorite: true,
      host: {
        name: "Vikram",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      location: "Netarhat",
      type: "Villa"
    },
    {
      id: 5,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
      ],
      title: "Cottage in Jamshedpur",
      subtitle: "Stay with Anita",
      description: "Lakeside cottage near Dimna Lake",
      dates: "1-6 Oct",
      price: 9500,
      originalPrice: null,
      rating: 4.8,
      reviews: 31,
      isGuestFavorite: false,
      host: {
        name: "Anita",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face"
      },
      location: "Jamshedpur",
      type: "Cottage"
    },
    {
      id: 6,
      images: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      ],
      title: "Lodge in Hazaribagh",
      subtitle: "Stay with Forest Dept",
      description: "Wildlife sanctuary experience",
      dates: "4-9 Oct",
      price: 12800,
      originalPrice: null,
      rating: 4.7,
      reviews: 15,
      isGuestFavorite: true,
      host: {
        name: "Forest Dept",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      location: "Hazaribagh",
      type: "Lodge"
    },
    {
      id: 7,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop"
      ],
      title: "Homestay in Khunti",
      subtitle: "Stay with Birsa Community",
      description: "Traditional tribal experience",
      dates: "6-11 Oct",
      price: 4500,
      originalPrice: null,
      rating: 4.9,
      reviews: 27,
      isGuestFavorite: true,
      host: {
        name: "Birsa Community",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
      },
      location: "Khunti",
      type: "Homestay"
    },
    {
      id: 8,
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
      ],
      title: "Resort in Palamu",
      subtitle: "Stay with Ramesh",
      description: "Eco resort near Betla National Park",
      dates: "3-8 Oct",
      price: 18900,
      originalPrice: null,
      rating: 4.8,
      reviews: 19,
      isGuestFavorite: false,
      host: {
        name: "Ramesh",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      location: "Palamu",
      type: "Resort"
    }
  ];

  const locations = ["All", "Ranchi", "Jamshedpur", "Dhanbad", "Palamu", "Netarhat", "Hazaribagh", "Khunti", "Deoghar"];
  const propertyTypes = ["All", "Room", "Home", "Villa", "Cottage", "Lodge", "Homestay", "Resort"];
  const amenityOptions = ["WiFi", "Kitchen", "Parking", "AC", "Pool", "Garden", "Mountain view", "Lake view"];

  const filteredAccommodations = useMemo(() => {
    return accommodations.filter(acc => {
      const matchesSearch = acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          acc.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = selectedLocation === "" || selectedLocation === "All" || acc.location === selectedLocation;
      const matchesPrice = acc.price >= priceRange[0] && acc.price <= priceRange[1];
      const matchesType = propertyType === "" || propertyType === "All" || acc.type === propertyType;
      
      return matchesSearch && matchesLocation && matchesPrice && matchesType;
    });
  }, [searchQuery, selectedLocation, priceRange, propertyType]);

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const nextImage = (accommodationId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [accommodationId]: ((prev[accommodationId] || 0) + 1) % accommodations.find(acc => acc.id === accommodationId).images.length
    }));
  };

  const prevImage = (accommodationId) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [accommodationId]: ((prev[accommodationId] || 0) - 1 + accommodations.find(acc => acc.id === accommodationId).images.length) % accommodations.find(acc => acc.id === accommodationId).images.length
    }));
  };

  const getCurrentImage = (accommodation) => {
    return accommodation.images[currentImageIndex[accommodation.id] || 0];
  };

  const getImageDots = (accommodation) => {
    return accommodation.images.map((_, index) => (
      <div
        key={index}
        className={`w-1.5 h-1.5 rounded-full ${
          index === (currentImageIndex[accommodation.id] || 0) ? 'bg-white' : 'bg-white/50'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Airbnb Header */}
      <Navigation />

      {/* Spacer between Navigation and Search Bar */}
      <div className="h-16" />

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search destinations"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-3 rounded-full border-gray-300 shadow-lg"
            />
          </div>
          <Button variant="outline" className="rounded-full" onClick={() => setShowFilters(true)}>
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center space-x-4 mb-8">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-40 rounded-full">
              <SelectValue placeholder="Where" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>{location}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-40 rounded-full">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {propertyTypes.map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAccommodations.map((accommodation) => (
            <div key={accommodation.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative mb-3">
                <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
                  <img
                    src={getCurrentImage(accommodation)}
                    alt={accommodation.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  
                  {/* Guest Favorite Badge */}
                  {accommodation.isGuestFavorite && (
                    <div className="absolute top-3 left-3 bg-white rounded-full px-3 py-1 shadow-md">
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-sm flex items-center justify-center">
                          <span className="text-white text-xs font-bold">🏆</span>
                        </div>
                        <span className="text-xs font-medium text-gray-900">Guest favourite</span>
                      </div>
                    </div>
                  )}

                  {/* Heart Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 p-2 hover:bg-black/10"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleFavorite(accommodation.id);
                    }}
                  >
                    <Heart 
                      className={`w-5 h-5 ${favorites.includes(accommodation.id) ? 'fill-red-500 text-red-500' : 'text-white fill-black/20'}`} 
                    />
                  </Button>

                  {/* Navigation Arrows */}
                  {accommodation.images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 p-1 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.preventDefault();
                          prevImage(accommodation.id);
                        }}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-white/80 hover:bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.preventDefault();
                          nextImage(accommodation.id);
                        }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </>
                  )}

                  {/* Image Dots */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    {getImageDots(accommodation)}
                  </div>

                  {/* Host Avatar */}
                  <div className="absolute bottom-3 left-3">
                    <img
                      src={accommodation.host.avatar}
                      alt={accommodation.host.name}
                      className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1">
                {/* Title and Rating */}
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {accommodation.title}
                  </h3>
                  <div className="flex items-center ml-2">
                    <Star className="w-3 h-3 text-black fill-current" />
                    <span className="text-sm font-normal ml-1">{accommodation.rating} ({accommodation.reviews})</span>
                  </div>
                </div>

                {/* Subtitle */}
                <p className="text-gray-600 text-sm">
                  {accommodation.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-600 text-sm">
                  {accommodation.description}
                </p>

                {/* Dates */}
                <p className="text-gray-600 text-sm">
                  {accommodation.dates}
                </p>

                {/* Price */}
                <div className="pt-1">
                  <span className="font-semibold text-gray-900">₹{accommodation.price.toLocaleString('en-IN')}</span>
                  <span className="text-gray-600"> for 5 nights</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters Dialog */}
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
              <DialogDescription>
                Customize your search preferences
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Price Range (₹ per night)</Label>
                <div className="mt-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={25000}
                    min={500}
                    step={500}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-1">
                    <span>₹{priceRange[0].toLocaleString('en-IN')}</span>
                    <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
        {/* Footer */}
        <Footer />
    </div>
  );
};

export default JharkhandStays;