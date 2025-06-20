"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Toast as ToastType, useToast } from "@/contexts/ToastContext";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from "@/components/ui/Icons";

interface ToastProps {
  toast: ToastType;
}

const Toast: React.FC<ToastProps> = ({ toast }) => {
  const { isKhmer } = useLanguage();
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      removeToast(toast.id);
    }, 300); // Match animation duration
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-start gap-3 p-4 rounded-md shadow-lg border-l-4 bg-white";
    
    switch (toast.type) {
      case "success":
        return `${baseStyles} border-l-green-500`;
      case "error":
        return `${baseStyles} border-l-red-500`;
      case "warning":
        return `${baseStyles} border-l-yellow-500`;
      case "info":
        return `${baseStyles} border-l-teal-500`;
      default:
        return `${baseStyles} border-l-gray-500`;
    }
  };

  const getIcon = () => {
    const iconClass = "w-5 h-5 flex-shrink-0 mt-0.5";
    
    switch (toast.type) {
      case "success":
        return <CheckCircleIcon className={`${iconClass} text-green-500`} />;
      case "error":
        return <XCircleIcon className={`${iconClass} text-red-500`} />;
      case "warning":
        return <ExclamationTriangleIcon className={`${iconClass} text-yellow-500`} />;
      case "info":
        return <InformationCircleIcon className={`${iconClass} text-teal-500`} />;
      default:
        return <InformationCircleIcon className={`${iconClass} text-gray-500`} />;
    }
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isExiting
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
      role="alert"
      aria-live={toast.type === "error" ? "assertive" : "polite"}
    >
      <div className={getToastStyles()}>
        {getIcon()}
        
        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm font-semibold text-gray-900 ${
              isKhmer ? "font-khmer" : "font-rubik"
            }`}
          >
            {toast.title}
          </h4>
          
          {toast.message && (
            <p
              className={`mt-1 text-sm text-gray-600 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {toast.message}
            </p>
          )}
          
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className={`mt-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors duration-200 ${
                isKhmer ? "font-khmer" : "font-rubik"
              }`}
            >
              {toast.action.label}
            </button>
          )}
        </div>
        
        <button
          onClick={handleClose}
          className="flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-md hover:bg-gray-100"
          aria-label="Close notification"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
