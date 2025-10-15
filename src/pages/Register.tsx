import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore, BiometricType } from '@/store/authStore';
import { useBiometric } from '@/hooks/useBiometric';
import { BiometricTypeSelector } from '@/components/BiometricTypeSelector';
import { BiometricButton } from '@/components/BiometricButton';
import { ProgressLogger } from '@/components/ProgressLogger';
import { Button } from '@/components/ui/button';

const Register = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<BiometricType | null>(null);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showLogs, setShowLogs] = useState(false);
  
  const { registerBiometric, isProcessing } = useBiometric();
  const { logs, isRegistered, setBiometricType } = useAuthStore();

  useEffect(() => {
    if (isRegistered && step === 2) {
      setTimeout(() => {
        setStep(3);
        setTimeout(() => {
          navigate('/auth');
        }, 2000);
      }, 1000);
    }
  }, [isRegistered, step, navigate]);

  const handleSelectType = (type: BiometricType) => {
    setSelectedType(type);
    setBiometricType(type);
  };

  const handleStartScan = async () => {
    if (!selectedType) return;
    setStep(2);
    setShowLogs(true);
    await registerBiometric(selectedType);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <span className="text-sm font-mono text-muted-foreground">
            Step {step}/3
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-8"
        >
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Register Biometric</h1>
            <p className="text-muted-foreground">
              {step === 1 && 'Choose your authentication method'}
              {step === 2 && 'Scanning and generating proof...'}
              {step === 3 && 'Registration complete!'}
            </p>
          </div>

          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <BiometricTypeSelector
                selected={selectedType}
                onSelect={handleSelectType}
              />

              {selectedType && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-center"
                >
                  <Button
                    onClick={handleStartScan}
                    size="lg"
                    disabled={isProcessing}
                  >
                    Scan {selectedType === 'faceid' ? 'Face' : 'Fingerprint'}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 2 && selectedType && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-8"
            >
              <BiometricButton
                type={selectedType}
                onPress={() => {}}
                size="large"
                isLoading={isProcessing}
                disabled
              />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', bounce: 0.5 }}
                className="text-6xl mb-4"
              >
                ✓
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Success!</h2>
              <p className="text-muted-foreground">
                Redirecting to authentication...
              </p>
            </motion.div>
          )}

          {(step === 2 || step === 3) && logs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ProgressLogger logs={logs} maxHeight="300px" />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
