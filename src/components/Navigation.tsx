import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, MapPin, Users, ShoppingBag, User, Landmark, Calendar as CalendarIcon } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations", icon: <MapPin className="w-4 h-4 inline mr-1" /> },
    { name: "Cultural Heritage", path: "/culture", icon: <Landmark className="w-4 h-4 inline mr-1" /> },
    { name: "Local Marketplace", path: "/local-marketplace", icon: <ShoppingBag className="w-4 h-4 inline mr-1" /> },
    { name: "Guides", path: "/guides", icon: <Users className="w-4 h-4 inline mr-1" /> },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 hero-gradient rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground leading-tight">Jharkhand Tourism</span>
              <span className="text-xs text-muted-foreground">Experience the Soul of India</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-sm font-medium transition-smooth hover:text-accent px-3 py-2 text-foreground"
              >
                {item.icon} {item.name}
              </Link>
            ))}
            <Link to="/plan-journey">
              <Button variant="default" className="hero-gradient text-white shadow-nature px-6">
                Plan Your Adventure
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full p-0.5 hero-gradient">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <User className="h-5 w-5" strokeWidth={2.5} />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Dashboard</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm font-medium px-3 py-2 rounded-lg transition-smooth hover:bg-muted text-foreground"
                >
                  {item.icon} {item.name}
                </Link>
              ))}
              <Link to="/plan-journey" onClick={() => setIsMenuOpen(false)}>
                <Button className="hero-gradient text-white shadow-nature w-full mt-4">
                  Plan Your Adventure
                </Button>
              </Link>

              <div className="border-t border-border pt-4 mt-4 space-y-4">
                 <Link to="#" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium px-3 py-2 rounded-lg text-foreground hover:bg-muted">
                    Dashboard
                 </Link>
                 <Link to="#" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium px-3 py-2 rounded-lg text-foreground hover:bg-muted">
                    Settings
                 </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

