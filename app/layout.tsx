import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { EventProvider } from "@/lib/EventContext";
import { AuthProvider } from "@/lib/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Group Inventory Management Platform",
  description: "Enterprise-grade platform for MICE events and destination weddings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          <EventProvider>
            {children}
          </EventProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
