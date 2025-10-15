import { create } from 'zustand';

export type BiometricType = 'touchid' | 'faceid';
export type AuthStatus = 'idle' | 'registering' | 'authenticating' | 'success' | 'error';

export interface LogEntry {
  id: string;
  timestamp: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'loading';
}

export interface AuthState {
  biometricType: BiometricType | null;
  isRegistered: boolean;
  authStatus: AuthStatus;
  logs: LogEntry[];
  commitment: string | null;
  lastTxHash: string | null;
  lastAuthTime: number | null;
  
  setBiometricType: (type: BiometricType) => void;
  setRegistered: (registered: boolean) => void;
  setAuthStatus: (status: AuthStatus) => void;
  addLog: (message: string, type?: LogEntry['type']) => void;
  clearLogs: () => void;
  setCommitment: (commitment: string) => void;
  setLastTx: (txHash: string) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  biometricType: null,
  isRegistered: false,
  authStatus: 'idle',
  logs: [],
  commitment: null,
  lastTxHash: null,
  lastAuthTime: null,
  
  setBiometricType: (type) => set({ biometricType: type }),
  setRegistered: (registered) => set({ isRegistered: registered }),
  setAuthStatus: (status) => set({ authStatus: status }),
  
  addLog: (message, type = 'info') => set((state) => ({
    logs: [...state.logs, {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
      message,
      type,
    }],
  })),
  
  clearLogs: () => set({ logs: [] }),
  
  setCommitment: (commitment) => set({ commitment }),
  
  setLastTx: (txHash) => set({ 
    lastTxHash: txHash, 
    lastAuthTime: Date.now() 
  }),
  
  reset: () => set({
    biometricType: null,
    isRegistered: false,
    authStatus: 'idle',
    logs: [],
    commitment: null,
    lastTxHash: null,
    lastAuthTime: null,
  }),
}));
