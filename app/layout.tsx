import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const redHat = localFont({
  src: "./fonts/RedHatText-VariableFont_wght.ttf",
  variable: "--font-redhat-sans",
  weight: "400 600 700",
});

export const metadata: Metadata = {
  title: "Product list with cart",
  description: "A challenge from frontendmentor.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHat.variable}`}>{children}</body>
    </html>
  );
}
