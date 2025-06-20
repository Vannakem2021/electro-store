"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useToast } from "@/contexts/ToastContext";
import Toast from "./Toast";

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof window === "undefined") {
    return null;
  }

  if (toasts.length === 0) {
    return null;
  }

  return createPortal(
    <div
      className="fixed bottom-4 right-4 z-50 space-y-3 max-w-sm w-full flex flex-col-reverse sm:bottom-6 sm:right-6"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body
  );
};

export default ToastContainer;
