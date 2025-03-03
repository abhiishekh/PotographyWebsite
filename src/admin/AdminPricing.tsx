import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus, Check, X } from 'lucide-react';

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

const AdminPricing: React.FC = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [newNotIncluded, setNewNotIncluded] = useState('');

  // Load pricing plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('framesoflife_pricing');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      // Default pricing plans if none are saved
      const defaultPlans = [
        {
          id: '1',
          name: 'Basic',
          price: 199,
          description: 'Perfect for small events and personal portraits',
          features: [
            '2-hour photo session',
            '50 edited digital photos',
            'Online gallery',
            'Personal use license',
            '1 photographer',
          ],
          notIncluded: [
            'Printed photos',
            'Express delivery',
            'Multiple locations',
          ],
          popular: false,
          color: 'neutral' as const,
        },
        {
          id: '2',
          name: 'Premium',
          price: 499,
          description: 'Ideal for weddings and special celebrations',
          features: [
            '6-hour photo session',
            '200 edited digital photos',
            'Online gallery',
            'Personal use license',
            '2 photographers',
            'Printed photo album (20 pages)',
            'Multiple locations',
          ],
          notIncluded: [
            'Express delivery',
          ],
          popular: true,
          color: 'amber' as const,
        },
        {
          id: '3',
          name: 'Professional',
          price: 999,
          description: 'Complete coverage for major events',
          features: [
            'Full-day photo session (10 hours)',
            '500+ edited digital photos',
            'Online gallery',
            'Commercial use license',
            '2 photographers',
            'Deluxe printed photo album (40 pages)',
            'Multiple locations',
            'Express delivery (3 days)',
            'Drone aerial photography',
          ],
          notIncluded: [],
          popular: false,
          color: 'neutral' as const,
        },
      ];
      setPlans(defaultPlans);
      localStorage.setItem('framesoflife_pricing', JSON.stringify(defaultPlans));
    }
  }, []);

  // Save pricing plans to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('framesoflife_pricing', JSON.stringify(plans));
  }, [plans]);

  const handleAddPlan = () => {
    const newPlan: PricingPlan = {
      id: Date.now().toString(),
      name: 'New Package',
      price: 0,
      description: 'Package description',
      features: ['Feature 1'],
      notIncluded: [],
      popular: false,
      color: 'neutral',
    };
    
    setEditingPlan(newPlan);
    setShowAddForm(true);
  };

  const handleSaveNewPlan = () => {
    if (!editingPlan) return;
    
    if (!editingPlan.id.includes('new-')) {
      // Editing existing plan
      setPlans(plans.map(plan => 
        plan.id === editingPlan.id ? editingPlan : plan
      ));
    } else {
      // Adding new plan
      const newPlan = {
        ...editingPlan,
        id: Date.now().toString(),
      };
      setPlans([...plans, newPlan]);
    }
    
    setEditingPlan(null);
    setShowAddForm(false);
  };

  const handleDeletePlan = (id: string) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const handleEditPlan = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setShowAddForm(true);
  };

  const handleAddFeature = () => {
    if (!editingPlan || !newFeature) return;
    
    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, newFeature]
    });
    
    setNewFeature('');
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingPlan) return;
    
    const newFeatures = [...editingPlan.features];
    newFeatures.splice(index, 1);
    
    setEditingPlan({
      ...editingPlan,
      features: newFeatures
    });
  };

  const handleAddNotIncluded = () => {
    if (!editingPlan || !newNotIncluded) return;
    
    setEditingPlan({
      ...editingPlan,
      notIncluded: [...editingPlan.notIncluded, newNotIncluded]
    });
    
    setNewNotIncluded('');
  };

  const handleRemoveNotIncluded = (index: number) => {
    if (!editingPlan) return;
    
    const newNotIncluded = [...editingPlan.notIncluded];
    newNotIncluded.splice(index, 1);
    
    setEditingPlan({
      ...editingPlan,
      notIncluded: newNotIncluded
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pricing Management</h2>
        <button
          onClick={handleAddPlan}
          className="bg-amber-500 hover:bg-amber-600 text-black px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add New Package
        </button>
      </div>
      
      {showAddForm && editingPlan && (
        <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">
              {editingPlan.id.includes('new-') ? 'Add New Package' : 'Edit Package'}
            </h3>
            <button 
              onClick={() => {
                setEditingPlan(null);
                setShowAddForm(false);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Package Name
                </label>
                <input
                  type="text"
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price ($)
                </label>
                <input
                  type="number"
                  value={editingPlan.price}
                  onChange={(e) => setEditingPlan({...editingPlan, price: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white resize-none"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="popular"
                  checked={editingPlan.popular}
                  onChange={(e) => setEditingPlan({...editingPlan, popular: e.target.checked})}
                  className="h-4 w-4 text-amber-500 focus:ring-amber-500 border-neutral-600 rounded"
                />
                <label htmlFor="popular" className="ml-2 block text-sm text-gray-300">
                  Mark as Popular
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Color Theme
                </label>
                <select
                  value={editingPlan.color}
                  onChange={(e) => setEditingPlan({...editingPlan, color: e.target.value as 'amber' | 'neutral'})}
                  className="w-full px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                >
                  <option value="neutral">Neutral</option>
                  <option value="amber">Gold</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Features Included
                </label>
                <ul className="space-y-2 mb-3">
                  {editingPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between bg-neutral-700 px-3 py-2 rounded-md">
                      <span className="text-gray-200">{feature}</span>
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature"
                    className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                  <button
                    onClick={handleAddFeature}
                    disabled={!newFeature}
                    className={`px-4 py-2 rounded-r-md ${
                      !newFeature
                        ? 'bg-neutral-600 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-600 text-black'
                    }`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Not Included
                </label>
                <ul className="space-y-2 mb-3">
                  {editingPlan.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center justify-between bg-neutral-700 px-3 py-2 rounded-md">
                      <span className="text-gray-200">{item}</span>
                      <button
                        onClick={() => handleRemoveNotIncluded(index)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex">
                  <input
                    type="text"
                    value={newNotIncluded}
                    onChange={(e) => setNewNotIncluded(e.target.value)}
                    placeholder="Add not included item"
                    className="flex-1 px-4 py-2 bg-neutral-700 border border-neutral-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-amber-500 text-white"
                  />
                  <button
                    onClick={handleAddNotIncluded}
                    disabled={!newNotIncluded}
                    className={`px-4 py-2 rounded-r-md ${
                      !newNotIncluded
                        ? 'bg-neutral-600 text-gray-400 cursor-not-allowed'
                        : 'bg-amber-500 hover:bg-amber-600 text-black'
                    }`}
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                setEditingPlan(null);
                setShowAddForm(false);
              }}
              className="px-4 py-2 text-gray-300 hover:text-white mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNewPlan}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-md flex items-center"
            >
              <Check size={18} className="mr-2" />
              Save Package
            </button>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
              plan.popular 
                ? 'border-2 border-amber-500 shadow-lg shadow-amber-500/20' 
                : 'border border-neutral-700'
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 right-0 bg-amber-500 text-black font-medium py-1 px-4 text-sm">
                Most Popular
              </div>
            )}
            
            <div className="p-6 bg-neutral-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-amber-400' : 'text-white'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-3xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400 ml-1">/package</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleEditPlan(plan)}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    onClick={() => handleDeletePlan(plan.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-400 mb-4">{plan.description}</p>
            </div>
            
            <div className="p-6 bg-neutral-900">
              <p className="font-medium text-white mb-2">Features:</p>
              <ul className="space-y-1 text-sm text-gray-300 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="text-green-500 shrink-0 mt-0.5 mr-2" size={14} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {plan.notIncluded.length > 0 && (
                <>
                  <p className="font-medium text-white mb-2">Not included:</p>
                  <ul className="space-y-1 text-sm text-gray-400">
                    {plan.notIncluded.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <X className="text-red-500 shrink-0 mt-0.5 mr-2" size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {plans.length === 0 && (
        <div className="text-center py-12 bg-neutral-800 rounded-lg border border-neutral-700">
          <p className="text-gray-400">No pricing packages available. Add some packages to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AdminPricing;