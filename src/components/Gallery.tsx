import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('framesoflife_gallery');
    if (savedImages) {
      setImages(JSON.parse(savedImages));
    } else {
      // Default images if none are saved
      const defaultImages = [
        {
          id: '1',
          src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          alt: "Wedding photography",
          category: "Wedding"
        },
        {
          id: '2',
          src: "https://images.unsplash.com/photo-1551316679-9c6ae9dec224?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          alt: "Portrait photography",
          category: "Portrait"
        },
        {
          id: '3',
          src: "https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          alt: "Landscape photography",
          category: "Landscape"
        },
        {
          id: '4',
          src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          alt: "Urban photography",
          category: "Urban"
        },
        {
          id: '5',
          src: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          alt: "Travel photography",
          category: "Travel"
        },
        {
          id: '6',
          src: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          alt: "Food photography",
          category: "Food"
        },
      ];
      setImages(defaultImages);
    }
  }, []);

  return (
    <section id="gallery" className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            <span className="text-amber-500">Our</span> Gallery
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Browse through some of our favorite works and get inspired for your next photoshoot.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden rounded-lg group cursor-pointer"
              onClick={() => setSelectedImage(image.src)}
            >
              <div className="aspect-w-4 aspect-h-3">
                <img 
                  src={image.src} 
                  alt={image.alt} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-amber-400 text-sm font-medium">{image.category}</span>
                <h3 className="text-white text-lg font-bold">{image.alt}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged gallery image" 
            className="max-w-full max-h-[90vh] object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
            }}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;