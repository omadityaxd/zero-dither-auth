import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DitheredBackground } from '@/components/DitheredBackground';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      <DitheredBackground pattern="halftone" intensity={30} animated />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-md w-full text-center space-y-8"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative p-8 rounded-full border-2 border-primary halftone-overlay bg-background">
            <Lock className="w-16 h-16" />
            <motion.div
              className="absolute inset-0 border-2 border-accent rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">ProveYourself</h1>
          <p className="text-xl text-muted-foreground">
            Zero-Knowledge Biometric Authentication
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground max-w-sm mx-auto">
          <p>Your biometric data never leaves your device.</p>
          <p>Prove your identity without revealing who you are.</p>
        </div>

        <div className="space-y-3 pt-4">
          <Button
            onClick={() => navigate('/register')}
            size="lg"
            className="w-full max-w-xs"
          >
            Get Started
          </Button>
          
          <Button
            onClick={() => navigate('/auth')}
            variant="ghost"
            size="sm"
            className="w-full max-w-xs"
          >
            Skip to Demo
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;
