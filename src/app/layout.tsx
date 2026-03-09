import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { Navbar } from "@/components/ui/Navbar";

const nunito = Nunito({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800", "900"] 
});

export const metadata: Metadata = {
  title: "Beli Shop | Magical Toys & Games",
  description: "Discover our magical collection of toys, puzzles, action figures, and educational games for all ages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className} min-h-screen bg-[#F0F8FF] text-slate-900 antialiased selection:bg-yellow-300 selection:text-slate-900`}>
        <QueryProvider>
          <Navbar />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
