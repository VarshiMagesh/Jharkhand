import React, { useState } from 'react';
import logo from "../assets/logo.jpg";

// --- Navigation Component ---
export default function Navigation() {
  const [activePage, setActivePage] = useState("Home");
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Cultural Heritage", path: "/culture" },
    { name: "Local Marketplace", path: "/local-marketplace" },
    { name: "Guides", path: "/guides" },
    { name: "Plan your adventure", path: "/plan-journey" },
  ];

  const handleNavClick = (name) => {
    setActivePage(name);
  };

  return (
    // Wrapper to help center the nav
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 font-sans">
      <nav className="bg-green-900/70 backdrop-blur-lg border border-green-800/50 rounded-full shadow-xl">
        <div className="flex items-center justify-between h-14 px-4 space-x-6">
          {/* Logo */}
          <a href="" onClick={() => handleNavClick("Home")} className="flex items-center justify-center w-10 h-10 rounded-full bg-black/20 group">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full object-cover" />
          </a>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.path}
                onClick={() => handleNavClick(item.name)}
                className={`text-sm font-medium transition-all duration-300 px-4 py-2 rounded-full ${
                  activePage === item.name 
                  ? 'text-white' 
                  : 'text-orange-200 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
