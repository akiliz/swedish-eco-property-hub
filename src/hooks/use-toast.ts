
import { useState, useEffect, useCallback } from "react";

// Define the Toast type
export type Toast = {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "destructive" | "success";
};

// Custom hook to manage toasts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    ({ title, description, action, variant = "default" }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prevToasts) => [...prevToasts, { id, title, description, action, variant }]);
      return id;
    },
    []
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  return {
    toast,
    dismiss,
    toasts,
  };
}

// For direct import use
export const toast = ({ title, description, action, variant = "default" }: Omit<Toast, "id">) => {
  console.log("Toast:", { title, description });
  // This is a simplified version just for logging
  return Math.random().toString(36).substring(2, 9);
};
