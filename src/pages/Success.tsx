import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { formatHash } from '@/utils/biometric';

const Success = () => {
  const navigate = useNavigate();
  const { lastTxHash } = useAuthStore();

  const mockTransactionData = {
    block: Math.floor(Math.random() * 1000000) + 18000000,
    gasUsed: Math.floor(Math.random() * 100000) + 200000,
    time: (Math.random() * 2 + 2).toFixed(1),
  };

  const handleViewEtherscan = () => {
    if (lastTxHash) {
      window.open(`https://etherscan.io/tx/${lastTxHash}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            bounce: 0.5,
            delay: 0.2,
          }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
              className="w-24 h-24 rounded-full bg-accent flex items-center justify-center"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
            >
              <svg
                className="w-12 h-12 text-background"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                />
              </svg>
            </motion.div>
            
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0 border-2 border-accent rounded-full"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  delay: 0.5 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-3xl font-bold mb-2">Authentication Successful</h1>
          <p className="text-muted-foreground">
            Your proof has been verified and submitted
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-card border border-border rounded-lg p-6 space-y-4"
        >
          <h3 className="font-semibold text-sm text-muted-foreground">
            Transaction Details
          </h3>
          
          <div className="space-y-3 text-left">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Hash:</span>
              <span className="text-sm font-mono">
                {lastTxHash ? formatHash(lastTxHash) : 'N/A'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Block:</span>
              <span className="text-sm font-mono">
                {mockTransactionData.block.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Gas Used:</span>
              <span className="text-sm font-mono">
                {mockTransactionData.gasUsed.toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Time:</span>
              <span className="text-sm font-mono">
                {mockTransactionData.time}s
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <Button
            onClick={handleViewEtherscan}
            variant="outline"
            className="w-full"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on Etherscan
          </Button>
          
          <Button
            onClick={() => navigate('/auth')}
            className="w-full"
          >
            Done
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Success;
