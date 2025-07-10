import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import { ModalProvider } from "@/context/ModalContext";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scrid",
  description: "Recycle smart, earn smarter",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <Navbar />
          <LoginModal />
          <SignupModal />
          {children}
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
