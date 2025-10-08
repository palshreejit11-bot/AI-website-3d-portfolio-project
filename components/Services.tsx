
import React from 'react';
import SectionWrapper, { MotionItem } from './SectionWrapper';

const services = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: 'Frontend Development',
    description: 'Crafting responsive, high-performance web applications with modern frameworks like React and TypeScript.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user interfaces that provide a seamless user experience and drive engagement.',
  },
  {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9" />
        </svg>
    ),
    title: 'API Integration',
    description: 'Connecting your applications to third-party services and building robust, scalable backend integrations.',
  },
   {
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
    ),
    title: 'Cloud Solutions',
    description: 'Leveraging cloud platforms like AWS and Vercel to build and deploy scalable, resilient, and cost-effective infrastructure.',
  },
];

const Services: React.FC = () => {
  return (
    <SectionWrapper id="services">
      <MotionItem>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">What We Build</h2>
        <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
          From concept to deployment, we provide end-to-end technical services that turn your vision into reality.
        </p>
      </MotionItem>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {services.map((service, index) => (
          <MotionItem key={index}>
            <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800 h-full transition-all duration-300 hover:border-indigo-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          </MotionItem>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Services;
