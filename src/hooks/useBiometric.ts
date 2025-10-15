import { useState } from 'react';
import { useAuthStore, BiometricType } from '@/store/authStore';
import { 
  simulateBiometricScan, 
  generateCommitment, 
  generateHash,
  submitTransaction,
  delay 
} from '@/utils/biometric';

export const useBiometric = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { 
    biometricType, 
    addLog, 
    setCommitment, 
    setLastTx, 
    setRegistered,
    setAuthStatus,
  } = useAuthStore();

  const registerBiometric = async (type: BiometricType) => {
    setIsProcessing(true);
    setAuthStatus('registering');
    
    try {
      addLog('Biometric API initialized', 'success');
      await delay(300);
      
      addLog(`Scanning ${type === 'faceid' ? 'face' : 'fingerprint'}...`, 'loading');
      const scanResult = await simulateBiometricScan(type);
      
      if (!scanResult) {
        throw new Error('Biometric scan failed');
      }
      
      addLog(`${type === 'faceid' ? 'Face' : 'Fingerprint'} captured`, 'success');
      await delay(200);
      
      addLog('Generating biometric hash...', 'loading');
      await delay(400);
      const bioHash = generateHash();
      addLog(`Hash created: ${bioHash.slice(0, 10)}...`, 'success');
      await delay(200);
      
      addLog('Generating user secret...', 'loading');
      await delay(300);
      const userSecret = generateHash();
      addLog(`User secret: ${userSecret.slice(0, 10)}...`, 'success');
      await delay(200);
      
      addLog('Creating commitment...', 'loading');
      await delay(500);
      const commitment = generateCommitment();
      setCommitment(commitment);
      addLog(`Commitment generated: ${commitment.slice(0, 10)}...`, 'success');
      await delay(200);
      
      addLog('Stored locally in secure storage', 'success');
      await delay(200);
      
      addLog('Preparing transaction...', 'loading');
      await delay(400);
      const txHash = await submitTransaction(commitment);
      setLastTx(txHash);
      addLog(`Transaction submitted: ${txHash.slice(0, 10)}...`, 'success');
      await delay(200);
      
      addLog('Ready for authentication', 'success');
      setRegistered(true);
      setAuthStatus('success');
      
      return true;
    } catch (error) {
      addLog('Registration failed', 'error');
      setAuthStatus('error');
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    registerBiometric,
    isProcessing,
    biometricType,
  };
};
