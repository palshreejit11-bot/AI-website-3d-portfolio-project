

import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white tracking-wider">
          SYNAPSE<span className="text-cyan-400">DIGITAL</span>
        </a>
        <nav>
          <a href="#contact" className="px-4 py-2 text-sm font-medium text-gray-300 rounded-md hover:text-white hover:bg-cyan-600 transition-colors duration-300 border border-cyan-500">
            Get In Touch
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;