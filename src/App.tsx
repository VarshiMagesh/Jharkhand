import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Destinations from "./pages/Destinations";
import Culture from "./pages/Culture";
import PlanJourney from "./pages/PlanJourney";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LocalMarketplace from "./pages/localmarketplace";
import Guides from "./pages/guides";

// 👇 1. Import the new component
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* 👇 2. Place the component here */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/plan-journey" element={<PlanJourney />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/local-marketplace" element={<LocalMarketplace />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;