import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import { NotificationProvider } from "./components/Notification"; 
import Header from "./components/Header"; // ✅ import your Header
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VideoHub",
  description: "Upload and explore videos with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NotificationProvider>
          <Providers>
            <Header />   {/* ✅ now shows on all pages */}
            {children}
                    <Toaster position="top-right" reverseOrder={false} />

          </Providers>
        </NotificationProvider>
      </body>
    </html>
  );
}
