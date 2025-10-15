import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DitheredBackgroundProps {
  pattern?: 'halftone' | 'geometric' | 'gradient';
  intensity?: number;
  animated?: boolean;
  className?: string;
}

export const DitheredBackground = ({ 
  pattern = 'halftone', 
  intensity = 70,
  animated = false,
  className 
}: DitheredBackgroundProps) => {
  const Component = animated ? motion.div : 'div';
  
  const animationProps = animated ? {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  } : {};

  const getPatternStyle = () => {
    switch (pattern) {
      case 'halftone':
        return {
          backgroundImage: `radial-gradient(circle, hsl(var(--dither-dot) / ${intensity / 100}) 1.5px, transparent 1.5px)`,
          backgroundSize: '8px 8px',
        };
      case 'geometric':
        return {
          backgroundImage: `linear-gradient(45deg, hsl(var(--dither-dot) / ${intensity / 200}) 25%, transparent 25%), 
                           linear-gradient(-45deg, hsl(var(--dither-dot) / ${intensity / 200}) 25%, transparent 25%)`,
          backgroundSize: '20px 20px',
        };
      case 'gradient':
        return {
          background: `linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted) / ${intensity / 100}))`,
        };
      default:
        return {};
    }
  };

  return (
    <Component
      className={cn('absolute inset-0 pointer-events-none', className)}
      style={getPatternStyle()}
      {...animationProps}
    />
  );
};
