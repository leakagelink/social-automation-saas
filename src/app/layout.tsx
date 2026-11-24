import type { Metadata } from "next";
import { DM_Sans, Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { buildMetadata } from "@/lib/socialflow";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = buildMetadata(
  "SocialFlow — Your social presence, in one flow",
  "SocialFlow brings social content planning, automation, reels and ads into one workspace.",
  "/"
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${manrope.variable} font-sans`}>
        {children}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}