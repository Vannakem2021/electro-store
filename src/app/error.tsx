"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  ExclamationTriangleIcon,
  HomeIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
} from "@/components/ui/Icons";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Global error:", error);

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error);
    }
  }, [error]);

  const handleRetry = () => {
    reset();
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleReportIssue = () => {
    // You could implement a feedback form or redirect to support
    const subject = encodeURIComponent("Error Report - Elecxo");
    const body = encodeURIComponent(
      `I encountered an error on Elecxo:\n\nError: ${error.message}\n\nPage: ${window.location.href}\n\nPlease help resolve this issue.`
    );
    window.open(`mailto:support@elecxo.com?subject=${subject}&body=${body}`);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <div className="mb-8">
          <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">
            An unexpected error occurred. Please try again or contact support if
            the problem persists.
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <button
            onClick={handleRetry}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors duration-200 font-medium"
          >
            <ArrowPathIcon className="w-5 h-5" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-teal-700 text-teal-700 rounded-md hover:bg-teal-700 hover:text-white transition-colors duration-200 font-medium"
          >
            <HomeIcon className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={handleReportIssue}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
          >
            <ChatBubbleLeftRightIcon className="w-5 h-5" />
            Report Issue
          </button>
        </div>

        {/* Error ID for support */}
        {error.digest && (
          <div className="text-xs text-gray-500 mb-4">
            <p>Error ID: {error.digest}</p>
          </div>
        )}

        {/* Development error details */}
        {process.env.NODE_ENV === "development" && (
          <details className="text-left">
            <summary className="cursor-pointer text-sm text-gray-500">
              Error Details (Development)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded-md text-xs text-gray-700 overflow-auto">
              {error.message}
              {error.stack && `\n\nStack trace:\n${error.stack}`}
            </pre>
          </details>
        )}

        {/* Help text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            If this issue persists, please contact our support team at
            support@elecxo.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
