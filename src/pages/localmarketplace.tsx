import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag, Star, MapPin, Truck, Heart, Award, Filter } from "lucide-react";

// --- INTERFACES ---
interface Product {
  id: string;
  type: 'Handicraft' | 'Produce' | 'Textile';
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  image: string;
  features: string[];
  inStock: boolean;
  shippingTime: string;
}
interface Handicraft extends Product {
  artisan: string;
  village: string;
}
interface Produce extends Product {
  producer: string;
  location: string;
  weight: string;
}
interface Textile extends Product {
  artisan: string;
  village: string;
}

// --- DATA ---
const allProducts: (Handicraft | Produce | Textile)[] = [
  { id: 'h1', type: 'Handicraft', name: "Sohrai Tribal Wall Art", artisan: "Kumari Devi", village: "Hazaribagh", price: 2500, originalPrice: 3000, category: "Art", rating: 4.9, reviews: 47, description: "Authentic Sohrai art painted on canvas.", image: "/sohrai-tribal-wall-art.jpg", features: ["Handmade", "Natural pigments"], inStock: true, shippingTime: "5-7 days" },
  { id: 'h2', type: 'Handicraft', name: "Dokra Metal Craft Elephant", artisan: "Raman Singh", village: "Khunti", price: 1800, originalPrice: 2200, category: "Metal Craft", rating: 4.7, reviews: 32, description: "Beautiful Dokra metal craft elephant.", image: "/dokra-metal-craft-elephant.jpg", features: ["Lost-wax technique", "Brass alloy"], inStock: true, shippingTime: "3-5 days" },
  { id: 'h3', type: 'Handicraft', name: "Bamboo Basket Set", artisan: "Santoshi Devi", village: "Gumla", price: 850, originalPrice: 1000, category: "Bamboo Craft", rating: 4.8, reviews: 28, description: "Set of 3 handwoven bamboo baskets.", image: "/bamboo-basket-set.jpg", features: ["Set of 3", "Eco-friendly"], inStock: true, shippingTime: "4-6 days" },
  { id: 'p1', type: 'Produce', name: "Organic Jharkhand Honey", producer: "Tribal Cooperative", location: "Saranda Forest", price: 450, originalPrice: 500, category: "Food", rating: 4.9, reviews: 156, description: "Pure, raw honey harvested from pristine forests.", image: "/organic-jharkhand-honey.jpg", features: ["100% Pure", "Raw & Unprocessed"], inStock: true, weight: "500g", shippingTime: "2-3 days" },
  { id: 'p2', type: 'Produce', name: "Tribal Herbal Tea Blend", producer: "Jharkhand Herbals", location: "Netarhat Hills", price: 320, originalPrice: 380, category: "Herbal", rating: 4.6, reviews: 89, description: "Aromatic herbal tea blend with medicinal properties.", image: "/tribal-herbal-tea-blend.jpg", features: ["Wild herbs", "Caffeine-free"], inStock: true, weight: "100g", shippingTime: "3-4 days" },
  { id: 'p3', type: 'Produce', name: "Jharkhand Red Rice", producer: "Farmers Collective", location: "Ranchi", price: 180, originalPrice: 220, category: "Food", rating: 4.7, reviews: 203, description: "Nutritious red rice grown organically.", image: "/red-rice-jharkhand.jpg", features: ["Organic", "High nutrition"], inStock: true, weight: "1kg", shippingTime: "2-4 days" },
  { id: 'p4', type: 'Produce', name: "Local Jharkhand Snacks", producer: "Local Kitchens", location: "Statewide", price: 250, originalPrice: 280, category: "Food", rating: 4.5, reviews: 112, description: "A curated box of traditional Jharkhand snacks.", image: "/snacks.jpg", features: ["Assorted snacks", "Authentic taste"], inStock: true, weight: "400g", shippingTime: "3-5 days" },
  { id: 't1', type: 'Textile', name: "Tussar Silk Saree", artisan: "Weaver Collective", village: "Bhagalpur", price: 4500, originalPrice: 5200, category: "Textile", rating: 4.8, reviews: 67, description: "Elegant Tussar silk saree with traditional motifs.", image: "/tussar-silk-saree.jpg", features: ["Pure Tussar silk", "Handwoven"], inStock: true, shippingTime: "7-10 days" },
  { id: 't2', type: 'Textile', name: "Tribal Print Cotton Dupatta", artisan: "Madhuri Devi", village: "Dumka", price: 650, originalPrice: 800, category: "Textile", rating: 4.6, reviews: 41, description: "Beautiful cotton dupatta with authentic tribal prints.", image: "/tribal-print-cotton-dupatta.jpg", features: ["Pure cotton", "Tribal prints"], inStock: true, shippingTime: "4-6 days" },
];

const categories = [...new Set(allProducts.map(p => p.category))];

const ProductCard = ({ item }: { item: any }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {discount > 0 && <Badge className="absolute top-2 right-2 bg-red-500 text-white">{discount}% OFF</Badge>}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary">{item.category}</Badge>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{item.rating}</span>
            <span className="text-xs text-muted-foreground">({item.reviews})</span>
          </div>
        </div>
        <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
        <CardDescription className="flex items-center gap-1 text-xs mb-2">
          <span>by {item.artisan || item.producer}</span><span className="text-muted-foreground">•</span><MapPin className="w-3 h-3" /><span>{item.village || item.location}</span>
        </CardDescription>
        <p className="text-sm text-muted-foreground h-10 mb-3">{item.description}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {item.features.map((feature: string, idx: number) => (<Badge key={idx} variant="outline" className="text-xs">{feature}</Badge>))}
        </div>
        <div className="flex-grow"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">₹{item.price}</span>
            {item.weight && <span className="text-xs text-muted-foreground">({item.weight})</span>}
            {discount > 0 && <span className="text-sm text-muted-foreground line-through">₹{item.originalPrice}</span>}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1"><Truck className="w-3 h-3" />{item.shippingTime}</div>
        </div>
        <Dialog onOpenChange={() => setQuantity(1)}>
          <DialogTrigger asChild><Button className="w-full" disabled={!item.inStock}><ShoppingBag className="w-4 h-4 mr-2" />{item.inStock ? "Add to Cart" : "Out of Stock"}</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Purchase {item.name}</DialogTitle>
              <DialogDescription>Complete your order details</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">by {item.artisan || item.producer}</div>
                  <div className="text-sm font-semibold text-primary">₹{item.price}</div>
                </div>
              </div>
              <div><Label htmlFor="quantity">Quantity</Label><Input id="quantity" type="number" min="1" max="5" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} /></div>
              <div><Label htmlFor="address">Delivery Address</Label><Textarea id="address" placeholder="Enter your complete address..." /></div>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"><span className="font-medium">Total Amount:</span><span className="text-lg font-semibold text-primary">₹{item.price * quantity}</span></div>
              <Button
                className="w-full"
                onClick={() =>
                  navigate(`/upi?amount=${item.price * quantity}&description=Product Purchase&type=product&name=${encodeURIComponent(item.name)}`)
                }
              >
                Place Order - ₹{item.price * quantity}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

export default function LocalMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);
  const [minRating, setMinRating] = useState(0);
  const [sortOrder, setSortOrder] = useState("relevance");

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];
    if (searchTerm) {
      products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedCategories.length > 0) {
      products = products.filter(p => selectedCategories.includes(p.category));
    }
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (minRating > 0) {
      products = products.filter(p => p.rating >= minRating);
    }
    if (sortOrder === "price-asc") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "price-desc") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortOrder === "rating-desc") {
      products.sort((a, b) => b.rating - a.rating);
    }
    return products;
  }, [searchTerm, selectedCategories, priceRange, minRating, sortOrder]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navigation />
      
      <header className="bg-slate-50 pt-24 pb-12 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="text-gray-800">Local</span>
          <span style={{ color: '#F58B2E' }}> Marketplace</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Explore authentic handicrafts and produce, sourced directly from the artisans and farmers of Jharkhand.
        </p>
        <div className="flex items-center justify-center gap-x-6 gap-y-2 flex-wrap mt-8 text-sm text-gray-500">
          <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-orange-500" /><span>Authentic products</span></div>
          <div className="flex items-center gap-1.5"><Heart className="w-4 h-4 text-orange-500" /><span>Support local artisans</span></div>
          <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-orange-500" /><span>Direct from source</span></div>
        </div>
      </header>

      {/* MODIFIED MAIN SECTION */}
      <main id="main" className="flex-1 w-full py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <h3 className="text-xl font-semibold mb-4 flex items-center"><Filter className="w-5 h-5 mr-2" />Filters</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={category} onCheckedChange={() => handleCategoryChange(category)} checked={selectedCategories.includes(category)} />
                        <Label htmlFor={category} className="font-normal cursor-pointer">{category}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Price Range</h4>
                  <Slider value={priceRange} onValueChange={(value) => setPriceRange(value as [number, number])} max={6000} step={100} />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Rating</h4>
                  <div className="flex space-x-2">
                    {[4, 3, 2, 1].map(rating => (
                      <Button key={rating} variant={minRating === rating ? "default" : "outline"} size="sm" onClick={() => setMinRating(minRating === rating ? 0 : rating)}>
                        {rating} <Star className="w-3 h-3 ml-1 fill-current" />+
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-xs"
              />
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Customer Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAndSortedProducts.map((item) => <ProductCard key={item.id} item={item} />)}
                </div>
            ) : (
                <div className="text-center py-20 text-muted-foreground bg-gray-50 rounded-lg">
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}