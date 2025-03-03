import React from 'react';
import { Camera, Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

interface FooterProps {
  setShowEnquiry: (show: boolean) => void;
}

const Footer: React.FC<FooterProps> = ({ setShowEnquiry }) => {
  return (
    <footer id="contact" className="bg-neutral-900 border-t border-neutral-800">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Camera className="text-amber-500" />
              <span className="font-serif text-xl font-bold">
                <span className="text-amber-500">Frames</span>
                <span className="text-white">of</span>
                <span className="text-amber-500">Life</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Capturing life's precious moments with artistic vision and technical excellence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Services', 'Gallery', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Services</h3>
            <ul className="space-y-2">
              {['Candid Photography', 'Cinematic Photography', 'Professional Editing', 'Event Coverage', 'Portrait Sessions'].map((item) => (
                <li key={item}>
                  <a 
                    href="#services" 
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 shrink-0 mt-1" size={18} />
                <span className="text-gray-400">123 Photography Lane, Creative City, 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500 shrink-0" size={18} />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-amber-500 shrink-0" size={18} />
                <span className="text-gray-400">info@framesoflife.com</span>
              </li>
            </ul>
            <button 
              onClick={() => setShowEnquiry(true)}
              className="mt-4 inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
            >
              Get Enquiry Now
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-12 pt-6 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Frames of Life. All rights reserved.</p>
          <a 
            href="?admin=true" 
            className="text-gray-500 hover:text-amber-500 transition-colors text-sm mt-2 inline-block"
          >
            Admin Login
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;