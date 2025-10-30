import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Management System",
  description: "Simple post management application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
