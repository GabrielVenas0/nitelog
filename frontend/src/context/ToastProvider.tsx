import { useEffect, useState,  createContext } from 'react';
import { createPortal } from 'react-dom';
import { toastEvents } from '@/utility';
import type { Toast_With_ID, ToastType } from '@/types/toast';
import { Toast } from '@/components/ui/Toast';


const ToastContext = createContext({});
export function ToastProvider({ children }: { children: React.ReactNode }){
    const [toasts, setToasts] = useState<Toast_With_ID[]>([]);

    const addToast = (Toast: ToastType) => {
        const id = Date.now();
        setToasts(prev => [...prev, {
            id,
            status: Toast.status,
            description: Toast.description,
            from: Toast.from,
            duration_ms: Toast.duration_ms,
            direction: Toast.direction
        }]);

        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, Toast.duration_ms);
    };

    useEffect(() => {
        toastEvents.subscribe(addToast);
    }, []);

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      {createPortal(
        <div className="fixed inset-0 z-50 flex flex-col items-end justify-end p-4 gap-2 pointer-events-none">
          {toasts.map((t) => (
            <Toast key={t.id} props={t}></Toast>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};