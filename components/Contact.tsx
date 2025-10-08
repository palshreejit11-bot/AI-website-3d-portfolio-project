
import React from 'react';
import SectionWrapper, { MotionItem } from './SectionWrapper';

const Contact: React.FC = () => {
  return (
    <SectionWrapper id="contact" className="bg-gray-900/30">
      <div className="max-w-3xl mx-auto text-center">
        <MotionItem>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Have an idea? <br/> Let's build it together.
          </h2>
        </MotionItem>
        <MotionItem>
          <p className="text-lg text-gray-400 mb-8">
            We're currently available for new projects. Reach out to discuss how we can help you achieve your goals and bring your vision to life.
          </p>
        </MotionItem>
        <MotionItem>
          <a href="mailto:hello@abstract.dev" className="inline-block px-10 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-600/30">
            hello@abstract.dev
          </a>
        </MotionItem>
      </div>
    </SectionWrapper>
  );
};

export default Contact;
