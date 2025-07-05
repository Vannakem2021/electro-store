"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAdmin } from "@/contexts/AdminContext";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  breadcrumbs,
}) => {
  const { isAuthenticated, isLoading } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      // Redirect to admin login if not authenticated
      router.push("/admin/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-rubik">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${
                sidebarCollapsed ? "-translate-x-full" : "translate-x-0"
              }`
            : `fixed inset-y-0 left-0 z-30 transition-all duration-300 ease-in-out ${
                sidebarCollapsed ? "w-16" : "w-64"
              }`
        }`}
      >
        <AdminSidebar
          collapsed={!isMobile && sidebarCollapsed}
          onToggle={toggleSidebar}
        />
      </div>

      {/* Mobile sidebar overlay */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}

      {/* Main content with left margin to account for fixed sidebar */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Header */}
        <AdminHeader onSidebarToggle={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {/* Page header with title and breadcrumbs */}
          {(title || breadcrumbs) && (
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              {breadcrumbs && (
                <nav className="flex items-center space-x-2 text-sm mb-2 font-rubik">
                  {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={index}>
                      {index > 0 && <span className="text-gray-400">/</span>}
                      {crumb.href ? (
                        <a
                          href={crumb.href}
                          className="text-gray-600 hover:text-teal-600 transition-colors duration-200"
                        >
                          {crumb.label}
                        </a>
                      ) : (
                        <span className="text-gray-900 font-medium">
                          {crumb.label}
                        </span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              )}
              {title && (
                <h1 className="text-2xl font-bold text-gray-900 font-rubik">
                  {title}
                </h1>
              )}
            </div>
          )}

          {/* Page content */}
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
