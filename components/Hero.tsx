import React from 'react';
// Fix: Import `Variants` type from framer-motion.
import { motion, Variants } from 'framer-motion';
import GeometricShape from './GeometricShape';

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  // Fix: Explicitly type itemVariants with the `Variants` type from framer-motion.
  // This helps TypeScript correctly infer the type of `transition: { type: 'spring' }`
  // and resolves the "Type 'string' is not assignable to type 'AnimationGeneratorType'" error.
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-4 tracking-tighter">
            Precision Code. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Visionary Design.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            We partner with modern startups to build high-end, scalable, and beautifully designed digital solutions that drive growth and innovation.
          </motion.p>
          <motion.a 
            variants={itemVariants} 
            href="#portfolio" 
            className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/30"
          >
            Explore Our Work
          </motion.a>
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0 opacity-40">
        <GeometricShape />
      </div>
    </section>
  );
};

export default Hero;