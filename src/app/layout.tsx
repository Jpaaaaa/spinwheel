import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import BackgroundBlobs from "@/components/layout/BackgroundBlobs";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import PageTransition from "@/components/PageTransition";
import AuthSessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Draw Master — Professional Spin Wheel Raffles",
    template: "%s | Draw Master",
  },
  description:
    "Fair, fast, and official spin wheel raffles for events and organisations. Trusted since 2019.",
  icons: {
    icon: "/logo/drawmaster.png",
    apple: "/logo/drawmaster.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jakarta.variable} relative flex min-h-screen min-h-[100dvh] flex-col font-sans text-slate-700 antialiased`}
      >
        <AuthSessionProvider>
          <PageTransition>
            <BackgroundBlobs />
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <Footer />
          </PageTransition>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
