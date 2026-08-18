import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X, CheckCircle2, AlertCircle, AlertTriangle, Info } from 'lucide-react';

const ToastContext = createContext();

// Global listener store for standalone toast calls
let globalToastHandler = null;

export const toast = {
    success: (msg) => globalToastHandler?.(msg, 'success'),
    error: (msg) => globalToastHandler?.(msg, 'error'),
    warning: (msg) => globalToastHandler?.(msg, 'warning'),
    info: (msg) => globalToastHandler?.(msg, 'info'),
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        return toast;
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4500);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    useEffect(() => {
        globalToastHandler = addToast;
        return () => {
            globalToastHandler = null;
        };
    }, [addToast]);

    const contextValue = {
        success: (msg) => addToast(msg, 'success'),
        error: (msg) => addToast(msg, 'error'),
        warning: (msg) => addToast(msg, 'warning'),
        info: (msg) => addToast(msg, 'info'),
    };

    return (
        <ToastContext.Provider value={contextValue}>
            {children}
            <div className="fixed top-20 right-4 z-[99999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full sm:w-auto">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`flex items-start gap-3 px-4 py-3.5 rounded-2xl shadow-2xl min-w-[300px] max-w-md pointer-events-auto transition-all transform animate-[slideIn_0.3s_ease-out] backdrop-blur-md border ${
                            t.type === 'success'
                                ? 'bg-emerald-50/95 text-emerald-900 border-emerald-300 shadow-emerald-900/10'
                                : t.type === 'error'
                                ? 'bg-rose-50/95 text-rose-900 border-rose-300 shadow-rose-900/10'
                                : t.type === 'warning'
                                ? 'bg-amber-50/95 text-amber-900 border-amber-300 shadow-amber-900/10'
                                : 'bg-purple-50/95 text-purple-900 border-purple-300 shadow-purple-900/10'
                        }`}
                    >
                        {t.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />}
                        {t.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />}
                        {t.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />}
                        {t.type === 'info' && <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />}

                        <div className="flex-1 text-sm font-medium leading-snug">
                            {t.message}
                        </div>

                        <button
                            onClick={() => removeToast(t.id)}
                            className="p-1 -mr-1 hover:bg-black/5 rounded-lg transition-colors shrink-0 text-gray-400 hover:text-gray-700"
                            aria-label="Close notification"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
