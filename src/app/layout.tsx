import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { getSession } from "@/lib/auth";
import Navigation from "@/components/Navigation";
import BubbleBackground from "@/components/BubbleBackground";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dhanvanthari Ayurveda Hospital",
  description: "Authentic Ayurvedic Healing, Panchakarma & Classical Therapies in Chikkaballapur",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      <body style={{ position: 'relative', overflowX: 'hidden' }}>
        {/* Light Green Floating Bubbles Background for Every Page */}
        <BubbleBackground />
        
        {/* Dynamic Navigation Bar */}
        <Navigation session={session} />
        
        <main style={{ minHeight: 'calc(100vh - 70px)', position: 'relative', zIndex: 1 }}>
          {children}
        </main>
      </body>
    </html>
  );
}
