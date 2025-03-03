import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  notIncluded: string[];
  popular: boolean;
  color: 'amber' | 'neutral';
}

interface CMSContextType {
  galleryImages: GalleryImage[];
  pricingPlans: PricingPlan[];
  updateGalleryImages: (images: GalleryImage[]) => void;
  updatePricingPlans: (plans: PricingPlan[]) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [pricingPlans, setPricingPlans] = useState<PricingPlan[]>([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('framesoflife_gallery');
    if (savedImages) {
      setGalleryImages(JSON.parse(savedImages));
    }

    const savedPlans = localStorage.getItem('framesoflife_pricing');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    }
  }, []);

  const updateGalleryImages = (images: GalleryImage[]) => {
    setGalleryImages(images);
    localStorage.setItem('framesoflife_gallery', JSON.stringify(images));
  };

  const updatePricingPlans = (plans: PricingPlan[]) => {
    setPricingPlans(plans);
    localStorage.setItem('framesoflife_pricing', JSON.stringify(plans));
  };

  return (
    <CMSContext.Provider value={{ 
      galleryImages, 
      pricingPlans, 
      updateGalleryImages, 
      updatePricingPlans 
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};