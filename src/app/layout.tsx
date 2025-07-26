import type { Metadata } from "next";
import { Source_Code_Pro } from "next/font/google";
import "./globals.css";

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Endpointer",
  description: "You ship: API, We ship: Cloud Credits / Raspberry PI worth $30",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceCodePro.className} antialiased bg-gray-900 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
