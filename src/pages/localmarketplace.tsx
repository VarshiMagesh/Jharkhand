import { useState, useMemo, useEffect } from "react";
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
import { ShoppingBag, Star, MapPin, Truck, Heart, Award, Filter, ShoppingCart } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// --- INTERFACES ---
interface MarketplaceItem {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  type: 'Handicraft' | 'Produce' | 'Textile';
  rating: number;
  reviews: number;
  description: string | null;
  features: string[];
  in_stock: boolean;
  shipping_time: string;
  artisan: string | null;
  village: string | null;
  producer: string | null;
  location: string | null;
  weight: string | null;
  image_path: string | null;
}

// --- DATA FETCHING FUNCTIONS ---
const fetchMarketplaceItems = async (): Promise<MarketplaceItem[]> => {
  const { data, error } = await supabase
    .from('marketplace')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching marketplace items:', error);
    return [];
  }

  return (data || []).map(item => ({
    ...item,
    type: item.type as 'Handicraft' | 'Produce' | 'Textile'
  }));
};

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return '/placeholder.svg';
  const { data } = supabase.storage.from('marketplace-images').getPublicUrl(imagePath);
  return data.publicUrl;
};

const ProductCard = ({ item }: { item: MarketplaceItem }) => {
  const [quantity, setQuantity] = useState(1);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const discount = item.original_price ? Math.round(((item.original_price - item.price) / item.original_price) * 100) : 0;
  
 

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
      <div className="aspect-square overflow-hidden relative">
        <img src={getImageUrl(item.image_path)} alt={item.name} className="w-full h-full object-cover" />
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
            {discount > 0 && item.original_price && <span className="text-sm text-muted-foreground line-through">₹{item.original_price}</span>}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1"><Truck className="w-3 h-3" />{item.shipping_time}</div>
        </div>
        <Dialog onOpenChange={() => setQuantity(1)}>
          <DialogTrigger asChild><Button className="w-full" disabled={!item.in_stock}><ShoppingBag className="w-4 h-4 mr-2" />{item.in_stock ? "Add to Cart" : "Out of Stock"}</Button></DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add to Cart</DialogTitle>
              <DialogDescription>Select quantity and add to your cart</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-accent/5 rounded-lg">
                <img src={getImageUrl(item.image_path)} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">by {item.artisan || item.producer}</div>
                  <div className="text-sm font-semibold text-primary">₹{item.price}</div>
                </div>
              </div>
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="1" 
                  max="10" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                />
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-semibold text-primary">₹{item.price * quantity}</span>
              </div>
              <Button
                className="w-full"
                
              >
                Add to Cart - ₹{item.price * quantity}
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
  const [allProducts, setAllProducts] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  

  // Fetch products on component mount
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchMarketplaceItems();
      setAllProducts(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(allProducts.map(p => p.category))];
  }, [allProducts]);

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
  }, [allProducts, searchTerm, selectedCategories, priceRange, minRating, sortOrder]);

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
        
        {/* Cart Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsCartOpen(true)}
            className="rounded-full h-14 w-14 shadow-lg"
            size="icon"
          >
            <ShoppingCart className="w-6 h-6" />
            
          </Button>
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
            
            {loading ? (
              <div className="text-center py-20">
                <p className="text-lg">Loading products...</p>
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
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
      
      {/* Cart Component */}
      
      
      <Footer />
    </div>
  );
}
