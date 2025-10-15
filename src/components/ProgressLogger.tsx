import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, AlertCircle, Info } from 'lucide-react';
import { LogEntry } from '@/store/authStore';
import { cn } from '@/lib/utils';

interface ProgressLoggerProps {
  logs: LogEntry[];
  maxHeight?: string;
  className?: string;
}

export const ProgressLogger = ({ logs, maxHeight = '400px', className }: ProgressLoggerProps) => {
  const getIcon = (type: LogEntry['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-4 h-4 text-accent" />;
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Info className="w-4 h-4 text-muted-foreground" />;
    }
  };

  return (
    <div 
      className={cn(
        'w-full bg-card border border-border rounded-lg overflow-hidden',
        className
      )}
      style={{ maxHeight }}
    >
      <div className="bg-secondary px-4 py-2 border-b border-border">
        <h3 className="text-sm font-mono font-semibold">System Logs</h3>
      </div>
      
      <div className="p-4 overflow-y-auto" style={{ maxHeight: `calc(${maxHeight} - 48px)` }}>
        <AnimatePresence initial={false}>
          {logs.length === 0 ? (
            <div className="text-sm text-muted-foreground text-center py-8">
              No logs yet
            </div>
          ) : (
            <div className="space-y-2">
              {logs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-2 terminal-text"
                >
                  <span className="mt-0.5">{getIcon(log.type)}</span>
                  <span className={cn(
                    log.type === 'error' && 'text-destructive',
                    log.type === 'success' && 'text-accent'
                  )}>
                    {log.message}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
