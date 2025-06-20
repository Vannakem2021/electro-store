"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { ExclamationTriangleIcon, HomeIcon, ArrowPathIcon } from "@/components/ui/Icons";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: "page" | "section" | "global";
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === "production") {
      // Example: Send to error reporting service
      // errorReportingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI based on level
      const { level = "section" } = this.props;

      if (level === "section") {
        return (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-md border border-gray-200">
            <ExclamationTriangleIcon className="w-12 h-12 text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2 font-rubik">
              Something went wrong
            </h3>
            <p className="text-sm text-gray-600 text-center mb-4 font-rubik">
              We encountered an error while loading this section.
            </p>
            <button
              onClick={this.handleRetry}
              className="inline-flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors duration-200 font-rubik font-medium"
            >
              <ArrowPathIcon className="w-4 h-4" />
              Try Again
            </button>
          </div>
        );
      }

      // Page or global level error
      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <ExclamationTriangleIcon className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4 font-rubik">
                Oops! Something went wrong
              </h1>
              <p className="text-gray-600 mb-6 font-rubik">
                We encountered an unexpected error. Don't worry, our team has been notified and we're working to fix it.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors duration-200 font-rubik font-medium"
              >
                <ArrowPathIcon className="w-5 h-5" />
                Try Again
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-teal-700 text-teal-700 rounded-md hover:bg-teal-700 hover:text-white transition-colors duration-200 font-rubik font-medium"
              >
                <HomeIcon className="w-5 h-5" />
                Go Home
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-8 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 font-rubik">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-4 bg-gray-100 rounded-md text-xs text-gray-700 overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
