

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GeometricShape from './components/GeometricShape';
import { motion, useScroll, useTransform } from 'framer-motion';

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const midgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen custom-scrollbar relative overflow-x-hidden">
      <div className="aurora-background">
        <div className="aurora-shape1"></div>
        <div className="aurora-shape2"></div>
      </div>
      <div className="fixed inset-0 z-0 opacity-50">
        <GeometricShape />
      </div>

      {/* Mid-ground decorative element with parallax scroll */}
      <motion.div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{ y: midgroundY }}
      >
        <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-900/10 blur-3xl opacity-60"></div>
      </motion.div>

      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;