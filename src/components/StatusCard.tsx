import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatusCardProps {
  status: 'idle' | 'loading' | 'success' | 'error';
  title: string;
  description?: string;
  className?: string;
}

export const StatusCard = ({ status, title, description, className }: StatusCardProps) => {
  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle2 className="w-6 h-6 text-accent" />;
      case 'loading':
        return <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-destructive" />;
      default:
        return null;
    }
  };

  const getBorderColor = () => {
    switch (status) {
      case 'success':
        return 'border-accent';
      case 'error':
        return 'border-destructive';
      default:
        return 'border-border';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'p-6 rounded-lg border-2 bg-card',
        getBorderColor(),
        className
      )}
    >
      <div className="flex items-start gap-4">
        {getIcon()}
        <div className="flex-1">
          <h3 className="font-semibold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
