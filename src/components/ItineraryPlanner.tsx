import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Calendar,
  MapPin, 
  Users, 
  Clock, 
  DollarSign, 
  Utensils, 
  Car, 
  Heart, 
  Shield,
  Backpack,
  Loader2,
  CheckCircle,
  Star
} from "lucide-react";

interface ItineraryFormData {
  // Basic Info
  fullName: string;
  email: string;
  phone: string;
  
  // Trip Details
  startDate: string;
  numberOfDays: string;
  travelPace: string;
  
  // Destinations & Interests
  preferredRegions: string[];
  interests: string[];
  mustSeeAttractions: string;
  
  // Accommodation
  accommodationType: string;
  accommodationBudget: string;
  accommodationLocation: string;
  requiredAmenities: string[];
  
  // Budget
  totalBudget: string;
  budgetBreakdown: {
    transport: string;
    accommodation: string;
    food: string;
    activities: string;
    shopping: string;
  };
  
  // Travel Style
  travelCompanions: string;
  groupSize: string;
  travelStyle: string;
  
  // Transportation
  transportMode: string;
  needLocalTransfers: boolean;
  
  // Health & Safety
  specialNeeds: string;
  emergencyContact: string;
  
  // Food Preferences
  dietaryRestrictions: string[];
  foodPreference: string;
  localCuisineInterest: string;
  
  // Additional Info
  specialRequests: string;
}

interface ItineraryDay {
  day: number;
  date: string;
  location: string;
  activities: string[];
  meals: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  accommodation: string;
  transportation: string;
  budget: string | {
    total?: string;
    accommodation?: string;
    food?: string;
    activities?: string;
    transportation?: string;
  };
  notes: string;
}

const ItineraryPlanner = () => {
  const [formData, setFormData] = useState<ItineraryFormData>({
    fullName: "",
    email: "",
    phone: "",
    startDate: "",
    numberOfDays: "",
    travelPace: "",
    preferredRegions: [],
    interests: [],
    mustSeeAttractions: "",
    accommodationType: "",
    accommodationBudget: "",
    accommodationLocation: "",
    requiredAmenities: [],
    totalBudget: "",
    budgetBreakdown: {
      transport: "",
      accommodation: "",
      food: "",
      activities: "",
      shopping: ""
    },
    travelCompanions: "",
    groupSize: "",
    travelStyle: "",
    transportMode: "",
    needLocalTransfers: false,
    specialNeeds: "",
    emergencyContact: "",
    dietaryRestrictions: [],
    foodPreference: "",
    localCuisineInterest: "",
    specialRequests: ""
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<ItineraryDay[]>([]);
  const [showItinerary, setShowItinerary] = useState(false);
  const { toast } = useToast();

  const jharkhnadRegions = [
    "Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Deoghar", "Hazaribagh", 
    "Giridih", "Ramgarh", "Netarhat", "Betla National Park", "Parasnath Hill"
  ];

  const interestOptions = [
    "Nature & Wildlife", "Cultural Heritage", "Adventure Sports", "Photography",
    "Tribal Culture", "Waterfalls", "Hill Stations", "Historical Sites",
    "Temples & Spirituality", "Local Crafts", "Mining Heritage", "Festivals"
  ];

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev as any)[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleArrayChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev as any)[field], value]
        : (prev as any)[field].filter((item: string) => item !== value)
    }));
  };

  const generateItinerary = async () => {
    if (!formData.fullName || !formData.email || !formData.numberOfDays || !formData.startDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Email, Start Date, and Number of Days).",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-itinerary', {
        body: formData,
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to generate itinerary");
      }

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid itinerary data received");
      }

      setGeneratedItinerary(data);
      setShowItinerary(true);

      toast({
        title: "Itinerary Generated!",
        description: `Your ${formData.numberOfDays}-day Jharkhand adventure is ready!`,
      });
    } catch (error) {
      console.error("Error generating itinerary:", error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate itinerary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Comprehensive Planning Form */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-foreground flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-accent" />
            Complete Itinerary Planner
          </CardTitle>
          <p className="text-muted-foreground">
            Help us create your perfect Jharkhand adventure with detailed preferences
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Users className="w-5 h-5 mr-2 text-accent" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input 
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>
          </div>

          {/* Trip Duration & Timing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Clock className="w-5 h-5 mr-2 text-accent" />
              Trip Duration & Timing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date *</Label>
                <Input 
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="numberOfDays">Number of Days *</Label>
                <Select 
                  value={formData.numberOfDays}
                  onValueChange={(value) => handleInputChange('numberOfDays', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    {[2,3,4,5,6,7,8,9,10,12,14].map(days => (
                      <SelectItem key={days} value={days.toString()}>{days} Days</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="travelPace">Travel Pace</Label>
                <Select 
                  value={formData.travelPace}
                  onValueChange={(value) => handleInputChange('travelPace', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select pace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relaxed">Relaxed & Slow</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="fast">Fast-Paced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {formData.startDate && formData.numberOfDays && (
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Trip Duration:</strong> {formData.startDate} to {
                    new Date(new Date(formData.startDate).getTime() + (parseInt(formData.numberOfDays) - 1) * 24 * 60 * 60 * 1000)
                      .toISOString().split('T')[0]
                  } ({formData.numberOfDays} days)
                </p>
              </div>
            )}
          </div>

          {/* Destinations & Interests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-accent" />
              Destinations & Interests
            </h3>
            
            <div>
              <Label>Preferred Regions in Jharkhand</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {jharkhnadRegions.map((region) => (
                  <div key={region} className="flex items-center space-x-2">
                    <Checkbox 
                      id={region}
                      checked={formData.preferredRegions.includes(region)}
                      onCheckedChange={(checked) => handleArrayChange('preferredRegions', region, checked as boolean)}
                    />
                    <Label htmlFor={region} className="text-sm">{region}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label>What Interests You Most?</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                {interestOptions.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <Checkbox 
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onCheckedChange={(checked) => handleArrayChange('interests', interest, checked as boolean)}
                    />
                    <Label htmlFor={interest} className="text-sm">{interest}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="mustSeeAttractions">Must-See Attractions or Specific Requests</Label>
              <Textarea 
                id="mustSeeAttractions"
                value={formData.mustSeeAttractions}
                onChange={(e) => handleInputChange('mustSeeAttractions', e.target.value)}
                placeholder="List any specific places you want to visit or experiences you want to have..."
                className="mt-2"
              />
            </div>
          </div>

          {/* Travel Companions & Style */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Heart className="w-5 h-5 mr-2 text-accent" />
              Travel Companions & Style
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="travelCompanions">Travel Companions</Label>
                <Select 
                  value={formData.travelCompanions}
                  onValueChange={(value) => handleInputChange('travelCompanions', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Who's traveling?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo Travel</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="family">Family with Kids</SelectItem>
                    <SelectItem value="friends">Friends Group</SelectItem>
                    <SelectItem value="extended_family">Extended Family</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="groupSize">Group Size</Label>
                <Select 
                  value={formData.groupSize}
                  onValueChange={(value) => handleInputChange('groupSize', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Number of people" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Person</SelectItem>
                    <SelectItem value="2">2 People</SelectItem>
                    <SelectItem value="3-4">3-4 People</SelectItem>
                    <SelectItem value="5-8">5-8 People</SelectItem>
                    <SelectItem value="9+">9+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="travelStyle">Travel Style</Label>
                <Select 
                  value={formData.travelStyle}
                  onValueChange={(value) => handleInputChange('travelStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Your style?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="luxury">Luxury & Comfort</SelectItem>
                    <SelectItem value="mid_range">Mid-Range</SelectItem>
                    <SelectItem value="budget">Budget-Friendly</SelectItem>
                    <SelectItem value="adventure">Adventure & Rustic</SelectItem>
                    <SelectItem value="cultural">Cultural Immersion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Budget Planning */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-accent" />
              Budget Planning
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="totalBudget">Total Budget Per Person</Label>
                <Select 
                  value={formData.totalBudget}
                  onValueChange={(value) => handleInputChange('totalBudget', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</SelectItem>
                    <SelectItem value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</SelectItem>
                    <SelectItem value="₹20,000 - ₹35,000">₹20,000 - ₹35,000</SelectItem>
                    <SelectItem value="₹35,000 - ₹50,000">₹35,000 - ₹50,000</SelectItem>
                    <SelectItem value="₹50,000+">₹50,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label>Budget Priority Distribution</Label>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <Select 
                    value={formData.budgetBreakdown.accommodation}
                    onValueChange={(value) => handleInputChange('budgetBreakdown.accommodation', value)}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Accommodation %" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20%">20% - Basic</SelectItem>
                      <SelectItem value="30%">30% - Standard</SelectItem>
                      <SelectItem value="40%">40% - Comfortable</SelectItem>
                      <SelectItem value="50%">50% - Luxury</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select 
                    value={formData.budgetBreakdown.activities}
                    onValueChange={(value) => handleInputChange('budgetBreakdown.activities', value)}
                  >
                    <SelectTrigger className="text-xs">
                      <SelectValue placeholder="Activities %" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20%">20% - Few activities</SelectItem>
                      <SelectItem value="30%">30% - Moderate</SelectItem>
                      <SelectItem value="40%">40% - Activity-rich</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Accommodation & Transportation */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Car className="w-5 h-5 mr-2 text-accent" />
              Accommodation & Transportation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accommodationType">Accommodation Type</Label>
                <Select 
                  value={formData.accommodationType}
                  onValueChange={(value) => handleInputChange('accommodationType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accommodation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget_hotel">Budget Hotel</SelectItem>
                    <SelectItem value="mid_range_hotel">Mid-Range Hotel</SelectItem>
                    <SelectItem value="luxury_hotel">Luxury Hotel</SelectItem>
                    <SelectItem value="resort">Resort</SelectItem>
                    <SelectItem value="guesthouse">Guest House</SelectItem>
                    <SelectItem value="homestay">Homestay</SelectItem>
                    <SelectItem value="camping">Camping</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="transportMode">Transportation Mode</Label>
                <Select 
                  value={formData.transportMode}
                  onValueChange={(value) => handleInputChange('transportMode', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select transport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="private_car">Private Car</SelectItem>
                    <SelectItem value="rental_car">Rental Car</SelectItem>
                    <SelectItem value="public_transport">Public Transport</SelectItem>
                    <SelectItem value="taxi_cab">Taxi/Cab</SelectItem>
                    <SelectItem value="bike_rental">Bike Rental</SelectItem>
                    <SelectItem value="mix">Mixed Transportation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Food Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Utensils className="w-5 h-5 mr-2 text-accent" />
              Food Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="foodPreference">Food Preference</Label>
                <Select 
                  value={formData.foodPreference}
                  onValueChange={(value) => handleInputChange('foodPreference', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="non_vegetarian">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="jain">Jain Food</SelectItem>
                    <SelectItem value="mixed">Mixed (Everything)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="localCuisineInterest">Local Cuisine Interest</Label>
                <Select 
                  value={formData.localCuisineInterest}
                  onValueChange={(value) => handleInputChange('localCuisineInterest', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How interested?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="very_high">Very High - Foodie Experience</SelectItem>
                    <SelectItem value="high">High - Love Local Food</SelectItem>
                    <SelectItem value="moderate">Moderate - Some Local Dishes</SelectItem>
                    <SelectItem value="low">Low - Familiar Food Preferred</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Dietary Restrictions</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {['No Onion', 'No Garlic', 'Gluten-Free', 'Lactose-Free', 'Nut Allergy', 'Spice Sensitivity'].map((restriction) => (
                  <div key={restriction} className="flex items-center space-x-2">
                    <Checkbox 
                      id={restriction}
                      checked={formData.dietaryRestrictions.includes(restriction)}
                      onCheckedChange={(checked) => handleArrayChange('dietaryRestrictions', restriction, checked as boolean)}
                    />
                    <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center">
              <Shield className="w-5 h-5 mr-2 text-accent" />
              Special Requirements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="specialNeeds">Special Needs/Accessibility</Label>
                <Textarea 
                  id="specialNeeds"
                  value={formData.specialNeeds}
                  onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                  placeholder="Wheelchair access, elderly-friendly, medical needs, etc."
                />
              </div>
              <div>
                <Label htmlFor="specialRequests">Additional Special Requests</Label>
                <Textarea 
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                  placeholder="Photography focus, festival participation, any other specific requests..."
                />
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <div className="flex justify-center pt-6">
            <Button 
              onClick={generateItinerary}
              disabled={isGenerating}
              size="lg"
              className="hero-gradient text-white shadow-nature px-12 py-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Your Perfect Itinerary...
                </>
              ) : (
                <>
                  <Star className="w-5 h-5 mr-2" />
                  Generate My Jharkhand Itinerary
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Itinerary Display */}
      {showItinerary && generatedItinerary.length > 0 && (
        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-accent" />
              Your Personalized {formData.numberOfDays}-Day Jharkhand Itinerary
            </CardTitle>
            <p className="text-muted-foreground">
              Crafted specially for {formData.fullName} • Generated with AI precision
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {generatedItinerary.map((day, index) => (
                <Card key={index} className="border-l-4 border-l-accent shadow-card">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Day Header */}
                      <div className="lg:col-span-2 text-center lg:text-left">
                        <div className="hero-gradient text-white rounded-lg p-4">
                          <div className="font-bold text-lg">Day {day.day}</div>
                          <div className="text-sm opacity-90">{day.date}</div>
                          <div className="text-xs font-medium mt-1">{day.location}</div>
                        </div>
                      </div>
                      
                      {/* Activities */}
                      <div className="lg:col-span-4">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-accent" />
                          Activities
                        </h4>
                        <ul className="space-y-2">
                          {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="text-sm text-muted-foreground flex items-start">
                              <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-accent flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Meals */}
                      <div className="lg:col-span-3">
                        <h4 className="font-semibold text-foreground mb-3 flex items-center">
                          <Utensils className="w-4 h-4 mr-2 text-accent" />
                          Meals
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="font-medium">Breakfast:</span> {day.meals.breakfast}</div>
                          <div><span className="font-medium">Lunch:</span> {day.meals.lunch}</div>
                          <div><span className="font-medium">Dinner:</span> {day.meals.dinner}</div>
                        </div>
                      </div>
                      
                      {/* Logistics */}
                      <div className="lg:col-span-3">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-medium text-foreground text-sm mb-1">Accommodation</h5>
                            <p className="text-xs text-muted-foreground">{day.accommodation}</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-foreground text-sm mb-1">Transportation</h5>
                            <p className="text-xs text-muted-foreground">{day.transportation}</p>
                          </div>
                          <div className="hero-gradient text-white rounded p-2 text-center">
                            <div className="text-xs opacity-90">Daily Budget</div>
                            <div className="font-bold text-sm leading-snug">
  {typeof day.budget === "string"
    ? day.budget
    : typeof day.budget === "object" && day.budget?.total
    ? day.budget.total
    : "₹3,000 - ₹5,000"}
</div>

                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Notes */}
                    {day.notes && (
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <h5 className="font-medium text-foreground text-sm mb-1 flex items-center">
                          <Star className="w-3 h-3 mr-1 text-accent" />
                          Travel Tips
                        </h5>
                        <p className="text-xs text-muted-foreground">{day.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
              
              {/* Summary & Next Steps */}
              <Card className="hero-gradient text-white">
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Your Jharkhand Adventure Awaits! 🎉</h3>
                  <p className="text-sm opacity-90 mb-4">
                    This personalized itinerary is crafted based on your preferences. 
                    Our team will contact you within 24 hours to finalize bookings and arrangements.
                  </p>
                  
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ItineraryPlanner;
