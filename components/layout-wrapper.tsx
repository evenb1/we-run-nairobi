"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Define which paths should NOT have the global Navbar/Footer
  const isRunPage = pathname.startsWith("/runs/");

  return (
    <>
      {!isRunPage && <Navbar />}
      <main>{children}</main>
      {!isRunPage && <Footer />}
    </>
  );
}