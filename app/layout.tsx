import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "500",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "500",
// });
const poppins = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pro Elite Holdings",
  description:
    " Our platform delivers unmatched security, expert support, and a seamless  trading experience tailored for your success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className}   antialiased scroll-smooth bg-[#0f172a]`}
      >
        <Toaster richColors position="top-right" closeButton />
        {children}
      </body>
    </html>
  );
}
