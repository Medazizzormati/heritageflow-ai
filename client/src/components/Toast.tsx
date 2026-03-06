import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

let toastId = 0;
const toastListeners: Set<(toast: ToastMessage) => void> = new Set();

export const showToast = (message: string, type: ToastType = 'info', duration = 3000) => {
  const id = `toast-${++toastId}`;
  const toast: ToastMessage = { id, message, type, duration };
  toastListeners.forEach(listener => listener(toast));
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (toast: ToastMessage) => {
      setToasts(prev => [...prev, toast]);
      
      if (toast.duration && toast.duration > 0) {
        const timer = setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== toast.id));
        }, toast.duration);
        
        return () => clearTimeout(timer);
      }
    };

    toastListeners.add(handleToast);
    return () => {
      toastListeners.delete(handleToast);
    };
  }, []);

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleRemoveToast = (id: string) => {
    removeToast(id);
  };

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getBgColor = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-900/20 border-green-700/50';
      case 'error':
        return 'bg-red-900/20 border-red-700/50';
      case 'warning':
        return 'bg-amber-900/20 border-amber-700/50';
      case 'info':
      default:
        return 'bg-cyan-900/20 border-cyan-700/50';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg border backdrop-blur-sm ${getBgColor(toast.type)} animate-in fade-in slide-in-from-bottom-4 duration-300`}
        >
          {getIcon(toast.type)}
          <span className="text-sm text-slate-200 flex-1">{toast.message}</span>
          <button
            onClick={() => handleRemoveToast(toast.id)}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
