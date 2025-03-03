import React, { useState, useEffect } from 'react';
import { Upload, Trash2, Edit, Plus, X, Check } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const AdminGallery: React.FC = () => {
  // In a real application, this would come from an API
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [newImageCategory, setNewImageCategory] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

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
      localStorage.setItem('framesoflife_gallery', JSON.stringify(defaultImages));
    }
  }, []);

  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('framesoflife_gallery', JSON.stringify(images));
  }, [images]);

  const handleAddImage = () => {
    if (!newImageUrl || !newImageAlt || !newImageCategory) return;
    
    const newImage: GalleryImage = {
      id: Date.now().toString(),
      src: newImageUrl,
      alt: newImageAlt,
      category: newImageCategory
    };
    
    setImages([...images, newImage]);
    setNewImageUrl('');
    setNewImageAlt('');
    setNewImageCategory('');
    setShowAddForm(false);
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter(image => image.id !== id));
  };

  const handleEditImage = (image: GalleryImage) => {
    setEditingImage(image);
  };

  const handleUpdateImage = () => {
    if (!editingImage) return;
    
    setImages(images.map(img => 
      img.id === editingImage.id ? editingImage : img
    ));
    
    setEditingImage(null);
  };

  const categories = ['Wedding', 'Portrait', 'Landscape', 'Urban', 'Travel', 'Food', 'Event', 'Family', 'Commercial'];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Gallery Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Image
        </button>
      </div>
      
      {showAddForm && (
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Add New Image</h3>
            <button 
              onClick={() => setShowAddForm(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Enter a valid URL for the image (e.g., from Unsplash)
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  placeholder="Wedding photography"
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newImageCategory}
                  onChange={(e) => setNewImageCategory(e.target.value)}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Preview
              </label>
              <div className="flex-1 bg-neutral-900 border border-neutral-700 rounded-md flex items-center justify-center overflow-hidden">
                {newImageUrl ? (
                  <img 
                    src={newImageUrl} 
                    alt={newImageAlt || 'Preview'} 
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                    }}
                  />
                ) : (
                  <div className="text-gray-500">Image preview will appear here</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-300 hover:text-white mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleAddImage}
              disabled={!newImageUrl || !newImageAlt || !newImageCategory}
              className={`px-4 py-2 rounded-md flex items-center ${
                !newImageUrl || !newImageAlt || !newImageCategory
                  ? 'bg-neutral-700 text-gray-400 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-black'
              }`}
            >
              <Check size={18} className="mr-2" />
              Add Image
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <div 
            key={image.id} 
            className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden"
          >
            {editingImage && editingImage.id === image.id ? (
              <div className="p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingImage.src}
                    onChange={(e) => setEditingImage({...editingImage, src: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white text-sm"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={editingImage.alt}
                    onChange={(e) => setEditingImage({...editingImage, alt: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white text-sm"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={editingImage.category}
                    onChange={(e) => setEditingImage({...editingImage, category: e.target.value})}
                    className="w-full px-3 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <button
                    onClick={() => setEditingImage(null)}
                    className="px-3 py-1 text-gray-300 hover:text-white mr-2 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateImage}
                    className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-black rounded-md text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
                    }}
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-amber-400 text-sm font-medium">{image.category}</span>
                      <h3 className="text-white font-medium">{image.alt}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEditImage(image)}
                        className="text-gray-400 hover:text-amber-500 transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteImage(image.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm truncate">{image.src}</p>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="text-center py-12 bg-neutral-800 rounded-lg border border-neutral-700">
          <p className="text-gray-400">No images in the gallery. Add some images to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;