import { motion } from 'framer-motion';
import { Fingerprint, ScanFace } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BiometricType } from '@/store/authStore';

interface BiometricTypeSelectorProps {
  selected: BiometricType | null;
  onSelect: (type: BiometricType) => void;
}

export const BiometricTypeSelector = ({ selected, onSelect }: BiometricTypeSelectorProps) => {
  const types: Array<{ type: BiometricType; label: string; icon: typeof Fingerprint }> = [
    { type: 'touchid', label: 'Touch ID', icon: Fingerprint },
    { type: 'faceid', label: 'Face ID', icon: ScanFace },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-md">
      {types.map(({ type, label, icon: Icon }) => (
        <motion.button
          key={type}
          onClick={() => onSelect(type)}
          className={cn(
            'relative p-8 rounded-lg border-2 transition-all',
            'flex flex-col items-center justify-center gap-4',
            'hover:border-primary halftone-overlay',
            selected === type
              ? 'border-primary bg-primary/5'
              : 'border-border bg-card'
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon className={cn(
            'w-12 h-12 transition-colors',
            selected === type ? 'text-primary' : 'text-muted-foreground'
          )} />
          <span className={cn(
            'font-medium',
            selected === type ? 'text-foreground' : 'text-muted-foreground'
          )}>
            {label}
          </span>
          
          {selected === type && (
            <motion.div
              layoutId="selector"
              className="absolute inset-0 border-2 border-accent rounded-lg pointer-events-none"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
};
