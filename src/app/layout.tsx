import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/sonner"


const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GPU Task Manager",
  description: "GPU Task Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.className} bg-background text-foreground`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            <main className="flex-1 p-6">{children}</main>
            <Toaster />
          </div>
        </div>
      </body>
    </html>
  );
}