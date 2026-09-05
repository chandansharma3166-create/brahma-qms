import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PWARegister from "../components/PWARegister";

export const metadata: Metadata = {
  title: "Brahma QMS — NEET Question Management System",
  description: "Minimalist, high-performance question management and revision engine for NEET aspirants",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Brahma QMS",
  },
};

export const viewport: Viewport = {
  themeColor: "#4a7c59",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex bg-sage-50 text-sage-900 min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <PWARegister />
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}