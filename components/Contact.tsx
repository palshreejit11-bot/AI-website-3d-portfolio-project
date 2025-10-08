

import React from 'react';
import SectionWrapper from './SectionWrapper';

const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact">
      {/* 
        This section is now visually represented by the interactive 3D nodes in the canvas.
        It is kept in the DOM to reserve vertical scroll space for the final animation state.
      */}
      <div className="h-[50vh]" />
    </SectionWrapper>
  );
};

export default Contact;