
import React from 'react';
import SectionWrapper, { MotionItem } from './SectionWrapper';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'QuantumLeap AI',
    description: 'A platform for startups to leverage machine learning models through a simple, intuitive API.',
    image: 'https://picsum.photos/seed/quantum/800/600',
    tags: ['React', 'TypeScript', 'Node.js', 'AWS'],
    link: '#',
  },
  {
    title: 'Nova Financials',
    description: 'A sleek, modern dashboard for personal finance tracking and investment analysis.',
    image: 'https://picsum.photos/seed/nova/800/600',
    tags: ['Next.js', 'Tailwind CSS', 'GraphQL', 'Vercel'],
    link: '#',
  },
  {
    title: 'Synergy Connect',
    description: 'A collaborative project management tool designed for remote teams with real-time updates.',
    image: 'https://picsum.photos/seed/synergy/800/600',
    tags: ['React', 'Firebase', 'Framer Motion'],
    link: '#',
  },
];

const Portfolio: React.FC = () => {
  return (
    <SectionWrapper id="portfolio" className="bg-gray-900/30">
      <MotionItem>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Featured Work</h2>
        <p className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12">
          We've helped ambitious startups launch and scale their digital products. Here's a glimpse of our impact.
        </p>
      </MotionItem>
      <div className="space-y-16">
        {projects.map((project, index) => (
          <MotionItem key={index}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className={`order-2 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                <h3 className="text-2xl font-bold text-indigo-400 mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-gray-800 text-indigo-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <a href={project.link} className="text-white font-medium hover:text-indigo-400 transition-colors group">
                  View Project <span className="inline-block transform group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
              <div className={`order-1 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                <motion.div 
                  className="rounded-lg overflow-hidden border-2 border-gray-800 shadow-2xl"
                  whileHover={{
                    scale: 1.05,
                    borderColor: 'rgb(99 102 241)', // Tailwind's indigo-500
                    boxShadow: '0 25px 50px -12px rgb(99 102 241 / 0.25)',
                    transition: { duration: 0.3 } 
                  }}
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover"/>
                </motion.div>
              </div>
            </div>
          </MotionItem>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Portfolio;