import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    const toast = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        info: (msg) => addToast(msg, 'info')
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div className="fixed top-24 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl min-w-[250px] max-w-sm pointer-events-auto transition-all transform animate-[slideIn_0.3s_ease-out]
              ${t.type === 'success' ? 'bg-green-50 text-green-800 border-l-4 border-green-500' : ''}
              ${t.type === 'error' ? 'bg-red-50 text-red-800 border-l-4 border-red-500' : ''}
              ${t.type === 'info' ? 'bg-blue-50 text-blue-800 border-l-4 border-blue-500' : ''}
            `}
                    >
                        {t.type === 'success' && <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />}
                        {t.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
                        {t.type === 'info' && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                        <span className="flex-1 text-sm font-medium font-inter">{t.message}</span>
                        <button
                            onClick={() => removeToast(t.id)}
                            className="p-1 hover:bg-black/5 rounded-full transition-colors shrink-0"
                        >
                            <X className="w-4 h-4 opacity-50 hover:opacity-100" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
