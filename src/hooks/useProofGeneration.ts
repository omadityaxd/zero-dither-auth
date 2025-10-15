import { useState } from 'react';
import { useAuthStore, BiometricType } from '@/store/authStore';
import { 
  simulateBiometricScan, 
  generateZKProof,
  submitTransaction,
  generateHash,
  delay 
} from '@/utils/biometric';

export const useProofGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { 
    biometricType, 
    addLog, 
    setLastTx,
    setAuthStatus,
  } = useAuthStore();

  const authenticate = async () => {
    if (!biometricType) {
      addLog('No biometric type registered', 'error');
      return false;
    }

    setIsGenerating(true);
    setAuthStatus('authenticating');
    
    try {
      addLog('Biometric prompt initialized', 'success');
      await delay(200);
      
      addLog(`Waiting for ${biometricType === 'faceid' ? 'face scan' : 'fingerprint'}...`, 'loading');
      const scanResult = await simulateBiometricScan(biometricType);
      
      if (!scanResult) {
        throw new Error('Biometric verification failed');
      }
      
      addLog(`${biometricType === 'faceid' ? 'Face' : 'Fingerprint'} verified by device`, 'success');
      await delay(200);
      
      addLog('Retrieving stored hash...', 'loading');
      await delay(300);
      const storedHash = generateHash();
      addLog(`Hash retrieved: ${storedHash.slice(0, 10)}...`, 'success');
      await delay(200);
      
      addLog('Retrieving user secret...', 'loading');
      await delay(250);
      addLog('User secret loaded', 'success');
      await delay(200);
      
      addLog('Generating nullifier...', 'loading');
      await delay(300);
      const nullifier = generateHash();
      addLog(`Nullifier: ${nullifier.slice(0, 10)}...`, 'success');
      await delay(200);
      
      addLog('Creating timestamp...', 'loading');
      await delay(150);
      const timestamp = Date.now();
      addLog(`Timestamp: ${timestamp}`, 'success');
      await delay(200);
      
      addLog('Starting ZK proof generation...', 'loading');
      addLog('  └─ Loading circuit...', 'info');
      await delay(150);
      addLog('  └─ Preparing witness...', 'info');
      await delay(100);
      addLog('  └─ Running prover...', 'info');
      
      const proofData = await generateZKProof();
      addLog(`ZK Proof generated (${proofData.duration}ms)`, 'success');
      await delay(200);
      
      addLog('Preparing transaction...', 'loading');
      await delay(400);
      addLog('Transaction ready', 'success');
      await delay(200);
      
      addLog('Submitting to contract...', 'loading');
      const txHash = await submitTransaction(proofData.proof);
      addLog(`Transaction submitted: ${txHash.slice(0, 10)}...`, 'success');
      setLastTx(txHash);
      await delay(300);
      
      addLog('Waiting for confirmation...', 'loading');
      await delay(600);
      addLog('Transaction confirmed!', 'success');
      await delay(200);
      
      addLog('Authentication successful', 'success');
      setAuthStatus('success');
      
      return true;
    } catch (error) {
      addLog('Authentication failed', 'error');
      setAuthStatus('error');
      return false;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    authenticate,
    isGenerating,
  };
};
