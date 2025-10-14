import type { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { getSession } from "@/lib/auth";
import SiteHeader from "../components/SiteHeader";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader sessionEmail={session?.email || null} />
        <main className="container py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
