
import React from 'react';
import SectionWrapper, { MotionItem } from './SectionWrapper';

const About: React.FC = () => {
  return (
    <SectionWrapper id="about">
      <div className="max-w-4xl mx-auto text-center">
        <MotionItem>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Philosophy</h2>
          <p className="text-lg text-gray-400 mb-8">
            We believe in a deeply collaborative process, working as an extension of your team. Our approach is rooted in three core principles: user-centric design, engineering excellence, and scalable architecture. We don't just write code; we architect solutions that are built to last and designed to perform.
          </p>
        </MotionItem>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <MotionItem>
                <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h3 className="text-xl font-bold text-indigo-400 mb-2">Innovation</h3>
                    <p className="text-gray-400">Pushing boundaries with the latest technologies to create cutting-edge solutions.</p>
                </div>
            </MotionItem>
            <MotionItem>
                <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h3 className="text-xl font-bold text-indigo-400 mb-2">Performance</h3>
                    <p className="text-gray-400">Optimizing for speed and efficiency to deliver a flawless user experience.</p>
                </div>
            </MotionItem>
            <MotionItem>
                <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-800">
                    <h3 className="text-xl font-bold text-indigo-400 mb-2">Scalability</h3>
                    <p className="text-gray-400">Building robust systems that grow with your business and adapt to future needs.</p>
                </div>
            </MotionItem>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
