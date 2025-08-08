import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ToastProvider } from '@/components/ui/use-toast';
import { AuthProvider } from "@/context/AuthContext";
import ClientLayout from "@/components/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlipZon - E-commerce",
  description: "E-commerce site with role-based access",
   icons: {
    icon: "/favicon.ico", // ✅ Path from public folder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ClientLayout> {children}</ClientLayout>
        </AuthProvider>
        
      </body>
    </html>
  );
}
