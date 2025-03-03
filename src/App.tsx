import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import EnquiryForm from './components/EnquiryForm';
import AdminPanel from './admin/AdminPanel';

function App() {
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if URL has admin parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdmin(true);
    }
  }, []);

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white relative">
      <Navbar scrolled={scrolled} />
      <Hero setShowEnquiry={setShowEnquiry} />
      <Services />
      <Gallery />
      <Pricing />
      <Footer setShowEnquiry={setShowEnquiry} />
      
      {showEnquiry && (
        <EnquiryForm onClose={() => setShowEnquiry(false)} />
      )}
    </div>
  );
}

export default App;