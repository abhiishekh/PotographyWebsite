import React from 'react';
import { Camera, Film, Paintbrush, Users, Heart, Image } from 'lucide-react';

const services = [
  {
    title: 'Candid Photography',
    description: 'Capture authentic moments as they unfold naturally, preserving genuine emotions and interactions.',
    icon: Camera,
  },
  {
    title: 'Cinematic Photography',
    description: 'Dramatic, film-inspired imagery that tells a compelling visual story with artistic flair.',
    icon: Film,
  },
  {
    title: 'Professional Editing',
    description: 'Expert post-processing to enhance your photos while maintaining a natural, timeless look.',
    icon: Paintbrush,
  },
  {
    title: 'Event Coverage',
    description: 'Comprehensive photography for weddings, corporate events, and special celebrations.',
    icon: Users,
  },
  {
    title: 'Portrait Sessions',
    description: 'Stunning individual or family portraits that capture personality and create lasting memories.',
    icon: Heart,
  },
  {
    title: 'Photography Training',
    description: 'Learn professional techniques and develop your own unique photographic style.',
    icon: Image,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-neutral-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">
            <span className="text-amber-500">Our</span> Services
          </h2>
          <div className="w-24 h-1 bg-amber-500 mx-auto"></div>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            We offer a wide range of professional photography services to meet your needs,
            from candid moments to cinematic storytelling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-neutral-800 rounded-lg p-6 shadow-lg transition-all duration-300 hover:shadow-amber-500/20 hover:-translate-y-2 group"
            >
              <div className="w-14 h-14 rounded-full bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors duration-300">
                <service.icon className="text-amber-500" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-amber-400 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;