import React, { useRef, ReactNode } from 'react';
// Fix: Import `Variants` type from framer-motion.
import { motion, useInView, Variants } from 'framer-motion';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionWrapper: React.FC<Props> = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section id={id} ref={ref} className={`py-20 lg:py-32 ${className}`}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
};

// Fix: Refactored MotionItem to use a standard functional component definition with an explicit props interface.
// This helps TypeScript correctly infer the component's props, including children and special props like `key`.
interface MotionItemProps {
  children: ReactNode;
  className?: string;
}

export const MotionItem: React.FC<MotionItemProps> = ({ children, className }) => {
  // Fix: Explicitly type variants with the `Variants` type from framer-motion.
  // This helps TypeScript correctly infer the type of `transition: { type: 'spring' }`
  // and resolves the "Type 'string' is not assignable to type 'AnimationGeneratorType'" error.
  const variants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  };

  return <motion.div variants={variants} className={className}>{children}</motion.div>;
};


export default SectionWrapper;