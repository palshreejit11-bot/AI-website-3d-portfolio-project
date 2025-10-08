import React from 'react';
import SectionWrapper from './SectionWrapper';

const Services: React.FC = () => {
  return (
    <SectionWrapper id="services">
      {/* 
        This section is now visually represented by the interactive 3D nodes in the canvas.
        It is kept in the DOM to reserve vertical scroll space and maintain the page structure
        for navigation and scrolling behavior. The main canvas animations are timed
        to occur as the user scrolls through this section's vertical space. 
      */}
      <div className="h-[100vh]" />
    </SectionWrapper>
  );
};

export default Services;
