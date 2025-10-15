import { BiometricType } from '@/store/authStore';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const generateHash = (): string => {
  const chars = '0123456789abcdef';
  let hash = '0x';
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
};

export const generateCommitment = (): string => {
  return generateHash();
};

export const generateNullifier = (): string => {
  return generateHash();
};

export const generateTxHash = (): string => {
  return generateHash();
};

export const simulateBiometricScan = async (type: BiometricType): Promise<boolean> => {
  // Simulate biometric prompt
  await delay(800);
  
  // In a real app, this would call native biometric APIs
  // For web demo, we simulate success
  return true;
};

export const generateZKProof = async (): Promise<{
  proof: string;
  nullifier: string;
  timestamp: number;
  duration: number;
}> => {
  const startTime = Date.now();
  
  // Simulate proof generation steps
  await delay(150); // Load circuit
  await delay(100); // Prepare witness
  await delay(150); // Run prover
  
  const duration = Date.now() - startTime;
  
  return {
    proof: generateHash(),
    nullifier: generateNullifier(),
    timestamp: Date.now(),
    duration,
  };
};

export const submitTransaction = async (proof: string): Promise<string> => {
  await delay(800); // Simulate blockchain submission
  return generateTxHash();
};

export const formatHash = (hash: string, length: number = 8): string => {
  if (!hash) return '';
  return `${hash.slice(0, length)}...${hash.slice(-4)}`;
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
