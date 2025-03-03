import React, { useState, useEffect } from 'react';
import { Camera, Upload, Trash2, Save, LogOut, Plus, X } from 'lucide-react';
import AdminGallery from './AdminGallery';
import AdminPricing from './AdminPricing';

type Tab = 'gallery' | 'pricing';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // For demo purposes, we'll use localStorage to simulate authentication
  useEffect(() => {
    const auth = localStorage.getItem('framesoflife_auth');
    if (auth === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for demo purposes
    if (username === 'admin' && password === 'password') {
      localStorage.setItem('framesoflife_auth', 'authenticated');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Try admin/password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('framesoflife_auth');
    setIsAuthenticated(false);
  };

  const exitAdmin = () => {
    window.location.href = window.location.pathname;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
        <div className="bg-neutral-800 rounded-lg p-8 w-full max-w-md border border-neutral-700">
          <div className="flex items-center justify-center mb-8">
            <Camera className="text-amber-500 mr-2" size={32} />
            <h1 className="text-2xl font-bold text-white font-serif">
              <span className="text-amber-500">Frames</span>
              <span className="text-white">of</span>
              <span className="text-amber-500">Life</span>
              <span className="text-white ml-2">Admin</span>
            </h1>
          </div>
          
          {error && (
            <div className="bg-red-900/30 border border-red-800 text-red-200 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                placeholder="admin"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                placeholder="password"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-md transition-colors"
            >
              Login
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={exitAdmin}
                className="text-gray-400 hover:text-amber-500 text-sm"
              >
                Return to Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* Header */}
      <header className="bg-black py-4 border-b border-neutral-800">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center">
            <Camera className="text-amber-500 mr-2" size={24} />
            <h1 className="text-xl font-bold text-white font-serif">
              <span className="text-amber-500">Frames</span>
              <span className="text-white">of</span>
              <span className="text-amber-500">Life</span>
              <span className="text-white ml-2">Admin</span>
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={exitAdmin}
              className="text-gray-300 hover:text-white transition-colors flex items-center"
            >
              <span className="mr-2">Exit Admin</span>
              <X size={18} />
            </button>
            
            <button 
              onClick={handleLogout}
              className="text-gray-300 hover:text-white transition-colors flex items-center"
            >
              <span className="mr-2">Logout</span>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8">
        {/* Tabs */}
        <div className="flex border-b border-neutral-700 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'gallery' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('gallery')}
          >
            Gallery Management
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'pricing' 
                ? 'text-amber-500 border-b-2 border-amber-500' 
                : 'text-gray-400 hover:text-white'
            }`}
            onClick={() => setActiveTab('pricing')}
          >
            Pricing Management
          </button>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'gallery' && <AdminGallery />}
        {activeTab === 'pricing' && <AdminPricing />}
      </div>
    </div>
  );
};

export default AdminPanel;