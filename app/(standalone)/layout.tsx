import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Mitchell Hornsby",
  description: "Portfolio app for Mitchell Hornsby",
};

/**
 * Bare root layout for pages that render on their own, without the nav, background or footer
 */
export default function StandaloneLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
