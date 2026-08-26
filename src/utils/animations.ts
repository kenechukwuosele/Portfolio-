import { Variants } from 'motion/react';

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    } 
  }
};

export const headingReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 18
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

export const cardVariant: Variants = {
  hidden: { 
    opacity: 0, 
    y: 24,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.55, 
      ease: [0.21, 0.47, 0.32, 0.98] 
    } 
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.94
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  }
};

export const defaultViewport = {
  once: true,
  amount: 0.15,
  margin: '-40px'
};
