import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const braven = localFont({
  src: "/fonts/BravenRegular.ttf",
  variable: "--font-braven",
});

export const metadata: Metadata = {
  title: "Dr. Shinto Rajappan",
  description: "Portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${braven.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
