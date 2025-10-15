import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Menu, Settings } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useProofGeneration } from '@/hooks/useProofGeneration';
import { BiometricButton } from '@/components/BiometricButton';
import { DitheredBackground } from '@/components/DitheredBackground';
import { ProgressLogger } from '@/components/ProgressLogger';
import { StatusCard } from '@/components/StatusCard';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/biometric';

const Auth = () => {
  const navigate = useNavigate();
  const [showLogs, setShowLogs] = useState(false);
  
  const { authenticate, isGenerating } = useProofGeneration();
  const { 
    biometricType, 
    authStatus, 
    logs, 
    lastAuthTime,
    isRegistered,
  } = useAuthStore();

  useEffect(() => {
    if (authStatus === 'success' && !isGenerating) {
      setTimeout(() => {
        navigate('/success');
      }, 1500);
    }
  }, [authStatus, isGenerating, navigate]);

  const handleAuth = async () => {
    if (!isRegistered) {
      navigate('/register');
      return;
    }
    setShowLogs(true);
    await authenticate();
  };

  return (
    <div className="relative min-h-screen bg-background">
      <DitheredBackground pattern="geometric" intensity={20} />
      
      <div className="relative z-10 min-h-screen flex flex-col p-6">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="icon">
            <Menu className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => navigate('/logs')}>
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-32 h-32 rounded-full halftone-overlay border-2 border-border bg-muted flex items-center justify-center"
          >
            <div className="text-4xl">👤</div>
          </motion.div>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              {isRegistered 
                ? 'Authenticate to continue'
                : 'Register your biometric first'
              }
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {biometricType && isRegistered ? (
              <BiometricButton
                type={biometricType}
                onPress={handleAuth}
                size="large"
                isLoading={isGenerating}
                disabled={isGenerating}
              />
            ) : (
              <Button onClick={() => navigate('/register')} size="lg">
                Register Biometric
              </Button>
            )}
          </motion.div>

          <div className="w-full max-w-md space-y-3">
            <StatusCard
              status={authStatus === 'authenticating' ? 'loading' : 'idle'}
              title={authStatus === 'authenticating' ? 'Authenticating...' : 'Ready'}
              description={
                lastAuthTime 
                  ? `Last auth: ${formatTimestamp(lastAuthTime)}`
                  : 'Never authenticated'
              }
            />
          </div>

          {showLogs && logs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md"
            >
              <ProgressLogger logs={logs} maxHeight="300px" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
