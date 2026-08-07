import type { Metadata } from "next";
import { Toaster } from "sonner";
import ThemeProvider from "@/components/providers/ThemeProvider";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI Job Portal",
  description:
    "AI-powered Job Portal built with Next.js, Express, MongoDB and Google Gemini.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang= "en" >
      <body className="min-h-screen bg-slate-50 text-slate-900" >  
      <ThemeProvider>
      {children }
      </ThemeProvider>
      < Toaster
  position = "top-right"
  richColors
  closeButton
    />
    </body>
    </html>
  );
}
