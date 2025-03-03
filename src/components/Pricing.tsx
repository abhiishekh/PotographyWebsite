import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

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

const Pricing = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([
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
      color: 'neutral',
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
      color: 'amber',
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
      color: 'neutral',
    },
  ]);

  // Load pricing plans from localStorage on component mount
  useEffect(() => {
    const savedPlans = localStorage.getItem('framesoflife_pricing');
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    }
  }, []);

  return (
    <section id="pricing" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            <span className="text-amber-500">Our</span> Pricing
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Choose the perfect photography package that suits your needs and budget.
            All packages can be customized to meet your specific requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
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
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-amber-400' : 'text-white'}`}>
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-white">${plan.price}</span>
                  <span className="text-gray-400 ml-1">/package</span>
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <button 
                  className={`w-full py-2 px-4 rounded-md font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-amber-500 hover:bg-amber-600 text-black' 
                      : 'bg-neutral-700 hover:bg-neutral-600 text-white'
                  }`}
                >
                  Book Now
                </button>
              </div>
              
              <div className="p-6 bg-neutral-900">
                <p className="font-medium text-white mb-4">What's included:</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-green-500 shrink-0 mt-0.5 mr-2" size={18} />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.notIncluded.length > 0 && (
                  <>
                    <p className="font-medium text-white mb-4">Not included:</p>
                    <ul className="space-y-3">
                      {plan.notIncluded.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <X className="text-red-500 shrink-0 mt-0.5 mr-2" size={18} />
                          <span className="text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-6">
            Need a custom package? Contact us for a personalized quote.
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center text-amber-500 hover:text-amber-400 transition-colors"
          >
            Get a Custom Quote
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 h-4 w-4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;