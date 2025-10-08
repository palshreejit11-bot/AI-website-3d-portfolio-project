
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GeometricShape from './components/GeometricShape';

const App: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] text-gray-200 min-h-screen custom-scrollbar relative overflow-hidden">
      <div className="aurora-background">
        <div className="aurora-shape1"></div>
        <div className="aurora-shape2"></div>
      </div>
      <div className="fixed inset-0 z-0 opacity-40">
        <GeometricShape />
      </div>
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