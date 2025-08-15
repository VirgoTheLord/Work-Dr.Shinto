import type { Metadata } from "next";
import localFont from "next/font/local";
import { Raleway, Syne } from "next/font/google";
import { ReactLenis } from "lenis/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import PageWrapper from "@/components/PageWrapper";
import { AnimationProvider } from "@/context/AnimationContext";

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
  title: "Dr. Shinto Rajappan, MD | Clinical Oncologist",
  description:
    "Explore the professional portfolio of Dr. Shinto Rajappan, a dedicated clinical oncologist. Showcasing his research, publications, and professional experience.",
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
          <AnimationProvider>
            <PageWrapper>
              <Navbar />
              {children}
            </PageWrapper>
          </AnimationProvider>
        </ReactLenis>
      </body>
    </html>
  );
}
