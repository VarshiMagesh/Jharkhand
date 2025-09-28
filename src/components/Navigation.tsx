import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, Users, ShoppingBag, Landmark } from "lucide-react";
import logo from "../assets/logo.jpg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations", icon: <MapPin className="w-4 h-4 inline mr-1" /> },
    { name: "Cultural Heritage", path: "/culture", icon: <Landmark className="w-4 h-4 inline mr-1" /> },
    { name: "Local Marketplace", path: "/local-marketplace", icon: <ShoppingBag className="w-4 h-4 inline mr-1" /> },
    { name: "Guides", path: "/guides", icon: <Users className="w-4 h-4 inline mr-1" /> },
    { name: "Plan your adventure", path: "/plan-journey" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 font-sans">
      <nav className="bg-green-900/70 backdrop-blur-lg border border-green-800/50 rounded-full shadow-xl w-full max-w-6xl px-4 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full object-cover" />
            <div className="flex flex-col">
              <span className="font-bold text-sm text-white leading-tight">Jharkhand Tourism</span>
              <span className="text-xs text-orange-200">Experience the Soul of India</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.slice(0, -1).map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium transition-all px-3 py-2 text-orange-200 hover:text-white rounded-full flex items-center"
              >
                {item.icon} {item.name}
              </Link>
            ))}
            <Link to="/plan-journey">
              <Button variant="default" className="hero-gradient text-white shadow-nature px-6">
                Plan Your Adventure
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-800/50 animate-fade-in flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium px-3 py-2 rounded-lg text-orange-200 hover:text-white flex items-center"
              >
                {item.icon} {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
