import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  setShowEnquiry: (show: boolean) => void;
}

const Hero: React.FC<HeroProps> = ({ setShowEnquiry }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
            <span className="block text-amber-400">Capturing Life's</span>
            <span className="block">Precious Moments</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Professional photography services that transform ordinary moments into extraordinary memories. Let us tell your story through our lens.
          </p>
          
          <button 
            onClick={() => setShowEnquiry(true)}
            className="group relative inline-flex items-center overflow-hidden rounded-full bg-amber-500 px-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span className="absolute -end-full transition-all group-hover:end-4">
              <ChevronRight />
            </span>
            <span className="text-sm font-medium transition-all group-hover:me-4">
              Get Enquiry Now
            </span>
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#services" className="text-white/70 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;