import React, { useRef, ReactNode, createContext, useContext } from 'react';
// Fix: Import `Variants` type from framer-motion.
import { motion, useInView, Variants, useScroll, useTransform, MotionValue } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

// Create a context to hold the scroll progress for a section
const SectionScrollContext = createContext<MotionValue<number> | null>(null);

const SectionWrapper: React.FC<Props> = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Track scroll progress within this component
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'] // Track from when the top of the element enters the bottom of the viewport to when the bottom leaves the top
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section id={id} ref={ref} className={`py-20 lg:py-32 ${className}`}>
      <SectionScrollContext.Provider value={scrollYProgress}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="container mx-auto px-6"
        >
          {children}
        </motion.div>
      </SectionScrollContext.Provider>
    </section>
  );
};

// Fix: Refactored MotionItem to use a standard functional component definition with an explicit props interface.
// This helps TypeScript correctly infer the component's props, including children and special props like `key`.
interface MotionItemProps {
  children: ReactNode;
  className?: string;
  parallax?: boolean;
}

export const MotionItem: React.FC<MotionItemProps> = ({ children, className, parallax = false }) => {
  const scrollYProgress = useContext(SectionScrollContext);
  
  // Apply a parallax effect if the prop is true and context is available
  const y = (parallax && scrollYProgress) 
    ? useTransform(scrollYProgress, [0, 1], ['-25%', '25%']) 
    : undefined;

  // Fix: Explicitly type variants with the `Variants` type from framer-motion.
  // This helps TypeScript correctly infer the type of `transition: { type: 'spring' }`
  // and resolves the "Type 'string' is not assignable to type 'AnimationGeneratorType'" error.
  const variants: Variants = {
    hidden: { y: 75, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { type: 'spring', stiffness: 90, damping: 15 } 
    },
  };

  return <motion.div variants={variants} className={className} style={{ y }}>{children}</motion.div>;
};


export default SectionWrapper;