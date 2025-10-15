import { motion } from 'framer-motion';
import { Fingerprint, ScanFace } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BiometricType } from '@/store/authStore';

interface BiometricButtonProps {
  type: BiometricType;
  onPress: () => void;
  size?: 'default' | 'large';
  disabled?: boolean;
  isLoading?: boolean;
}

export const BiometricButton = ({ 
  type, 
  onPress, 
  size = 'default',
  disabled = false,
  isLoading = false,
}: BiometricButtonProps) => {
  const Icon = type === 'faceid' ? ScanFace : Fingerprint;
  const isLarge = size === 'large';

  return (
    <motion.button
      onClick={onPress}
      disabled={disabled || isLoading}
      className={cn(
        'relative rounded-full border-2 border-primary bg-background',
        'flex items-center justify-center gap-3',
        'transition-all duration-300',
        'hover:bg-primary hover:text-primary-foreground',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'halftone-overlay',
        isLarge ? 'w-64 h-64' : 'w-40 h-40'
      )}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      animate={isLoading ? {
        scale: [1, 1.05, 1],
      } : {}}
      transition={{
        duration: 1.5,
        repeat: isLoading ? Infinity : 0,
      }}
    >
      <div className="flex flex-col items-center gap-3">
        <Icon className={isLarge ? 'w-16 h-16' : 'w-12 h-12'} />
        {!isLarge && (
          <span className="text-sm font-medium">
            {type === 'faceid' ? 'Face ID' : 'Touch ID'}
          </span>
        )}
      </div>
      
      {isLoading && (
        <motion.div
          className="absolute inset-0 border-2 border-accent rounded-full"
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 1.2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
      )}
    </motion.button>
  );
};
