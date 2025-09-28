import { Link } from "react-router-dom";
import { Phone, Mail, MessageSquare, ExternalLink } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "Explore Destinations", path: "/destinations" },
    { name: "Plan Your Visit", path: "/plan-journey" },
    { name: "Local Marketplace", path: "/local-marketplace" },
    { name: "Verified Guides", path: "/guides" },
    { name: "Travel Guidelines", path: "/guidelines" },
    { name: "Contact Support", path: "/contact" },
  ];

  const officialLinks = [
    { name: "Govt. of Jharkhand", url: "https://www.jharkhand.gov.in/" },
    { name: "Ministry of Tourism", url: "https://tourism.gov.in/" },
    { name: "Forest Department", url: "https://forest.jharkhand.gov.in/" },
    { name: "Wildlife Board", url: "https://www.wii.gov.in/" },
    { name: "Incredible India", url: "https://www.incredibleindia.org/" },
    { name: "Jharkhand Tourism Registration Portal", url: "https://jrp-nine.vercel.app/" },
  ];

  return (
    <footer className="py-10 bg-gradient-to-br from-green-800 via-emerald-700 to-amber-700 relative overflow-hidden">
      {/* Background Pattern for Jharkhand Theme */}
      <div className="absolute inset-0 opacity-10">
        {/* Forest/Mountain silhouettes */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white/5 transform translate-x-32 translate-y-32"></div>
        <div className="absolute top-20 left-20 w-40 h-40 rounded-full bg-amber-400/10"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 rounded-full bg-green-400/15"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">J</span>
                </div>
                <div>
                  <div className="font-bold text-xl text-white">Jharkhand Tourism</div>
                  <div className="text-green-200 text-sm">Experience the Soul of India</div>
                </div>
              </div>
              <p className="text-white/90 leading-relaxed">
                Experience the Soul of India – Discover Jharkhand's hidden treasures, from
                thundering waterfalls to ancient tribal heritage. Your gateway to authentic
                wilderness adventures.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/15 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg">
                <h4 className="font-bold mb-3 text-amber-200">Tourism Helplines</h4>
                <div className="space-y-2 text-sm text-white/90">
                  <p className="flex items-center gap-2"><Phone size={14} /> 1800-123-TOUR (8687)</p>
                  <p className="flex items-center gap-2"><Phone size={14} /> Emergency: 112</p>
                  <p className="flex items-center gap-2"><Mail size={14} /> help@jharkhandtourism.gov.in</p>
                </div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm p-4 rounded-lg border border-white/20 shadow-lg">
                <h4 className="font-bold mb-3 text-amber-200">24/7 Support</h4>
                <div className="space-y-2 text-sm text-white/90">
                  <p>Tourist Information Centers</p>
                  <p className="flex items-center gap-2"><MessageSquare size={14} /> WhatsApp: +91-9876543210</p>
                  <p className="text-xs text-white/70">Available in Hindi, English & Local languages.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-200">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="flex items-center gap-2 text-white/80 hover:text-amber-200 hover:translate-x-1 transition-all duration-200">
                    <ExternalLink size={14} /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-amber-200">Official Links</h3>
            <ul className="space-y-3">
              {officialLinks.map(link => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/80 hover:text-amber-200 hover:translate-x-1 transition-all duration-200">
                    <ExternalLink size={14} /> {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 mt-12 text-sm text-white/80">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="mb-4 md:mb-0 text-center md:text-left">
              © 2025 Department of Tourism, Government of Jharkhand. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="hover:text-amber-200 transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-amber-200 transition-colors">Terms of Service</Link>
            </div>
          </div>
          
          {/* Jharkhand Pride Badge */}
          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="text-amber-300">🌿</span>
              <span className="text-sm font-medium">Proudly Showcasing Jharkhand's Natural Heritage</span>
              <span className="text-amber-300">🏔</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;