import type { Metadata } from "next";
import { AdminProvider } from "@/contexts/AdminContext";

export const metadata: Metadata = {
  title: "Admin Dashboard - Elecxo",
  description: "Elecxo e-commerce admin dashboard for managing products, orders, and customers.",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
}
