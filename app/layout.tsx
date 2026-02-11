import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/layout/navbar"; // <--- Import this
import { Footer } from "@/components/layout/footer";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Run Nairobi",
  description: "Join the city's most vibrant community of pavement pounders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased selection:bg-orange-500 selection:text-white",
          oswald.variable,
          inter.variable
        )}
      >
        <Navbar /> 
        {children}
        <Footer />
      </body>
    </html>
  );
}