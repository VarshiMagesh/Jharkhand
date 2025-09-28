import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Star, MapPin, Truck, Award, Brush, Utensils, Leaf, Shirt, Gem, X } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// --- IMPORT YOUR IMAGE ---
import marketplaceBanner from "@/assets/mkd.png";

// --- INTERFACES & TYPES ---
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

type Filters = {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
};

const initialFilters: Filters = {
  categories: [],
  priceRange: [0, 6000],
  minRating: 0,
};

// --- DATA FETCHING & HELPERS ---
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
  return (data || []).map(item => ({ ...item, type: item.type as 'Handicraft' | 'Produce' | 'Textile' }));
};

const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return '/placeholder.svg';
  const { data } = supabase.storage.from('marketplace-images').getPublicUrl(imagePath);
  return data.publicUrl;
};

const categoryIcons: { [key: string]: React.ElementType } = {
  "Art": Brush,
  "Metal Craft": Gem,
  "Food": Utensils,
  "Herbal": Leaf,
  "Textile": Shirt,
};

// --- CHILD COMPONENTS ---
const ProductCard = ({ item, onAddToCart }: { item: MarketplaceItem, onAddToCart: (item: MarketplaceItem, quantity: number) => void }) => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const discount = item.original_price ? Math.round(((item.original_price - item.price) / item.original_price) * 100) : 0;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col group bg-white">
      <div className="aspect-square overflow-hidden relative">
        <img src={getImageUrl(item.image_path)} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
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
          <DialogTrigger asChild>
            <Button className="w-full" disabled={!item.in_stock}><ShoppingBag className="w-4 h-4 mr-2" />{item.in_stock ? "Add to Cart" : "Out of Stock"}</Button>
          </DialogTrigger>
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
                <Input id="quantity" type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} />
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                <span className="font-medium">Total:</span>
                <span className="text-lg font-semibold text-primary">₹{item.price * quantity}</span>
              </div>
              <Button className="w-full" onClick={() => onAddToCart(item, quantity)}>Add to Cart - ₹{item.price * quantity}</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </Card>
  );
};

// --- FILTER SIDEBAR ---
const FilterSidebar = ({ allCategories, currentFilters, onApplyFilters }: { allCategories: string[], currentFilters: Filters, onApplyFilters: (filters: Filters) => void }) => {
  const [tempCategories, setTempCategories] = useState<string[]>(currentFilters.categories);
  const [tempPriceRange, setTempPriceRange] = useState<[number, number]>(currentFilters.priceRange);
  const [tempMinRating, setTempMinRating] = useState<number>(currentFilters.minRating);

  useEffect(() => {
    setTempCategories(currentFilters.categories);
    setTempPriceRange(currentFilters.priceRange);
    setTempMinRating(currentFilters.minRating);
  }, [currentFilters]);

  const handleCategoryClick = (category: string) => {
    setTempCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const handleRatingClick = (rating: number) => {
    setTempMinRating(prev => prev === rating ? 0 : rating);
  };

  const handleClear = () => {
    setTempCategories(initialFilters.categories);
    setTempPriceRange(initialFilters.priceRange);
    setTempMinRating(initialFilters.minRating);
  };

  const handleApply = () => {
    onApplyFilters({
      categories: tempCategories,
      priceRange: tempPriceRange,
      minRating: tempMinRating,
    });
  };

  const ratingOptions = [4, 3, 2, 1];

  return (
    <Card className="shadow-md bg-[#FAF7F2] border-[#E8E0D5]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-[#F58B2E]">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Category */}
        <div>
          <Label className="text-lg font-semibold text-[#5C3A21] mb-3 block">Category</Label>
          <div className="flex flex-wrap gap-2">
            {allCategories.map(category => {
              const Icon = categoryIcons[category] || Award;
              const isSelected = tempCategories.includes(category);
              return (
                <Button key={category} onClick={() => handleCategoryClick(category)} variant={isSelected ? "default" : "outline"} className={`rounded-full h-9 px-4 ${isSelected ? 'bg-[#F58B2E] text-white border-[#F58B2E]' : 'bg-white/50 border-[#E8E0D5] text-gray-700 hover:bg-orange-50'}`}>
                  <Icon className="w-4 h-4 mr-2" /> {category}
                </Button>
              )
            })}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-lg font-semibold text-[#5C3A21] mb-2 block">Price Range</Label>
          <Slider 
            value={tempPriceRange} 
            onValueChange={(value) => setTempPriceRange(value as [number, number])} 
            max={6000} 
            step={100} 
            className="[&>span:first-child]:h-2 [&>span:first-child>span]:bg-gradient-to-r [&>span:first-child>span]:from-[#F58B2E] [&>span:first-child>span]:to-[#FFAD60] [&>a]:w-6 [&>a]:h-6 [&>a]:bg-white [&>a]:border-2 [&>a]:border-[#F58B2E] [&>a]:relative [&>a:before]:content-['₹'] [&>a:before]:absolute [&>a:before]:inset-0 [&>a:before]:flex [&>a:before]:items-center [&>a:before]:justify-center [&>a:before]:text-sm [&>a:before]:font-bold [&>a:before]:text-[#F58B2E]"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>₹{tempPriceRange[0]}</span>
            <span>₹{tempPriceRange[1]}</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <Label className="text-lg font-semibold text-[#5C3A21] mb-3 block">Rating</Label>
          <div className="space-y-2">
            {ratingOptions.map(rating => {
              const isSelected = tempMinRating === rating;
              return (
                <Button key={rating} onClick={() => handleRatingClick(rating)} variant={isSelected ? "default" : "outline"} className={`w-full justify-start h-11 ${isSelected ? 'bg-[#F58B2E] text-white border-[#F58B2E]' : 'bg-white/50 border-[#E8E0D5] text-gray-700 hover:bg-orange-50'}`}>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    ))}
                    <span className="ml-2 text-sm font-medium">& up</span>
                  </div>
                </Button>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <Button onClick={handleClear} variant="ghost" className="w-1/3 text-gray-600 hover:bg-gray-200">
            <X className="w-4 h-4 mr-2"/>
            Clear
          </Button>
          <Button onClick={handleApply} className="w-2/3 text-lg h-12 bg-[#F58B2E] hover:bg-[#D7782C]">
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function LocalMarketplacePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [sortOrder, setSortOrder] = useState("relevance");
  const [allProducts, setAllProducts] = useState<MarketplaceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<{item: MarketplaceItem, quantity: number}[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const products = await fetchMarketplaceItems();
      setAllProducts(products);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const allCategories = useMemo(() => [...new Set(allProducts.map(p => p.category))], [allProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let products = [...allProducts];
    if (searchTerm) products = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filters.categories.length > 0) products = products.filter(p => filters.categories.includes(p.category));
    products = products.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
    if (filters.minRating > 0) products = products.filter(p => p.rating >= filters.minRating);
    if (sortOrder === "price-asc") products.sort((a, b) => a.price - b.price);
    else if (sortOrder === "price-desc") products.sort((a, b) => b.price - a.price);
    else if (sortOrder === "rating-desc") products.sort((a, b) => b.rating - a.rating);
    return products;
  }, [allProducts, searchTerm, filters, sortOrder]);

  const handleAddToCart = (item: MarketplaceItem, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(p => p.item.id === item.id);
      if (existing) return prev.map(p => p.item.id === item.id ? {...p, quantity: p.quantity + quantity} : p);
      return [...prev, { item, quantity }];
    });
    toast({ title: "Added to cart", description: `${item.name} x${quantity}` });
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    // You can send cart data to backend here before redirect
    const totalAmount = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);
    toast({ title: "Redirecting to UPI", description: `Total ₹${totalAmount}` });
    navigate("/upi", { state: { totalAmount } });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800 font-sans">
      <Navigation />

      <header className="pt-0 pb-0 px-0">
        <img src={marketplaceBanner} alt="Local Marketplace Banner" className="w-full h-96 object-cover" />
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto py-10 px-4 bg-gradient-to-b from-[#FAF7F2] to-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <FilterSidebar allCategories={allCategories} currentFilters={filters} onApplyFilters={setFilters} />
          </aside>

          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
<Input type="text"
placeholder="Search products..."
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="w-full sm:max-w-xs"
/>
<Select value={sortOrder} onValueChange={setSortOrder}>
<SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Sort by" /></SelectTrigger>
<SelectContent>
<SelectItem value="relevance">Relevance</SelectItem>
<SelectItem value="price-asc">Price: Low to High</SelectItem>
<SelectItem value="price-desc">Price: High to Low</SelectItem>
<SelectItem value="rating-desc">Customer Rating</SelectItem>
</SelectContent>
</Select>
</div>

php-template
Copy code
        {loading ? (
          <div className="text-center py-20"><p className="text-lg">Loading products...</p></div>
        ) : filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts.map((item) => (
              <ProductCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground bg-gray-50 rounded-lg">
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try adjusting your search or filters.</p>
          </div>
        )}

        {/* Cart & Checkout Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-80 z-50 border border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Cart</h3>
            <div className="max-h-48 overflow-y-auto mb-2">
              {cart.map(({ item, quantity }) => (
                <div key={item.id} className="flex justify-between items-center mb-1">
                  <span className="text-sm">{item.name} x{quantity}</span>
                  <span className="text-sm font-medium">₹{item.price * quantity}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-semibold mb-3">
              <span>Total</span>
              <span>₹{cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0)}</span>
            </div>
            <Button className="w-full bg-[#F58B2E] hover:bg-[#D7782C]" onClick={handleCheckout}>
              Pay via UPI
            </Button>
          </div>
        )}
      </div>
    </div>
  </main>

  <Footer />
</div>
);
}