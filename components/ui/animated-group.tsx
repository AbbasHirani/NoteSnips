'use client';
import { ReactNode } from 'react';
import { motion, Variants, MotionProps } from 'motion/react';
import React from 'react';

export type PresetType =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'blur'
  | 'blur-slide'
  | 'zoom'
  | 'flip'
  | 'bounce'
  | 'rotate'
  | 'swing';

export type AnimatedGroupProps = {
  children: ReactNode;
  className?: string;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
  preset?: PresetType;
  as?: keyof React.JSX.IntrinsicElements;
  asChild?: keyof React.JSX.IntrinsicElements;
};

// Create properly typed motion components
type MotionElementProps = MotionProps & React.HTMLAttributes<HTMLElement>;

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  slide: {
    hidden: { y: 20 },
    visible: { y: 0 },
  },
  scale: {
    hidden: { scale: 0.8 },
    visible: { scale: 1 },
  },
  blur: {
    hidden: { filter: 'blur(4px)' },
    visible: { filter: 'blur(0px)' },
  },
  'blur-slide': {
    hidden: { filter: 'blur(4px)', y: 20 },
    visible: { filter: 'blur(0px)', y: 0 },
  },
  zoom: {
    hidden: { scale: 0.5 },
    visible: {
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    },
  },
  flip: {
    hidden: { rotateX: -90 },
    visible: {
      rotateX: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
    },
  },
  bounce: {
    hidden: { y: -50 },
    visible: {
      y: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
    },
  },
  rotate: {
    hidden: { rotate: -180 },
    visible: {
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 200, damping: 15 },
    },
  },
  swing: {
    hidden: { rotate: -10 },
    visible: {
      rotate: 0,
      transition: { type: 'spring' as const, stiffness: 300, damping: 8 },
    },
  },
};

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
});

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = 'div',
  asChild = 'div',
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  };
  
  const containerVariants = variants?.container || selectedVariants.container;
  const itemVariants = variants?.item || selectedVariants.item;

  // Create motion components with proper typing
  const getMotionComponent = (tag: keyof React.JSX.IntrinsicElements) => {
    switch (tag) {
      case 'div':
        return motion.div as React.FC<MotionElementProps>;
      case 'section':
        return motion.section as React.FC<MotionElementProps>;
      case 'article':
        return motion.article as React.FC<MotionElementProps>;
      case 'span':
        return motion.span as React.FC<MotionElementProps>;
      case 'p':
        return motion.p as React.FC<MotionElementProps>;
      case 'h1':
        return motion.h1 as React.FC<MotionElementProps>;
      case 'h2':
        return motion.h2 as React.FC<MotionElementProps>;
      case 'h3':
        return motion.h3 as React.FC<MotionElementProps>;
      case 'h4':
        return motion.h4 as React.FC<MotionElementProps>;
      case 'h5':
        return motion.h5 as React.FC<MotionElementProps>;
      case 'h6':
        return motion.h6 as React.FC<MotionElementProps>;
      case 'ul':
        return motion.ul as React.FC<MotionElementProps>;
      case 'ol':
        return motion.ol as React.FC<MotionElementProps>;
      case 'li':
        return motion.li as React.FC<MotionElementProps>;
      case 'nav':
        return motion.nav as React.FC<MotionElementProps>;
      case 'header':
        return motion.header as React.FC<MotionElementProps>;
      case 'footer':
        return motion.footer as React.FC<MotionElementProps>;
      case 'main':
        return motion.main as React.FC<MotionElementProps>;
      case 'aside':
        return motion.aside as React.FC<MotionElementProps>;
      default:
        return motion.div as React.FC<MotionElementProps>;
    }
  };

  const MotionComponent = React.useMemo(
    () => getMotionComponent(as),
    [as]
  );
  
  const MotionChild = React.useMemo(
    () => getMotionComponent(asChild),
    [asChild]
  );

  return (
    <MotionComponent
      initial='hidden'
      animate='visible'
      variants={containerVariants}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <MotionChild key={index} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  );
}

export { AnimatedGroup };
