import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway, Syne } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const braven = localFont({
  src: "/fonts/BravenRegular.ttf",
  variable: "--font-braven",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});
const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
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
      <body
        className={`${braven.variable} ${raleway.variable} ${syne.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ReactLenis root>
          <Navbar />
          {children}
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
