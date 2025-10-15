import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ProgressLogger } from '@/components/ProgressLogger';
import { Button } from '@/components/ui/button';
import { formatTimestamp } from '@/utils/biometric';

const Logs = () => {
  const navigate = useNavigate();
  const { logs, clearLogs } = useAuthStore();

  const handleExport = () => {
    const logText = logs.map(log => 
      `[${formatTimestamp(log.timestamp)}] ${log.message}`
    ).join('\n');
    
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `proveyourself-logs-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all logs?')) {
      clearLogs();
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/auth')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">System Logs</h1>
          <div className="w-20" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {logs.length > 0 ? (
            <>
              <ProgressLogger 
                logs={logs} 
                maxHeight="calc(100vh - 250px)"
                className="mb-4"
              />
              
              <div className="flex gap-3">
                <Button
                  onClick={handleExport}
                  variant="outline"
                  className="flex-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
                
                <Button
                  onClick={handleClear}
                  variant="outline"
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear Logs
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">No logs available</p>
              <Button onClick={() => navigate('/auth')}>
                Go to Authentication
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Logs;
