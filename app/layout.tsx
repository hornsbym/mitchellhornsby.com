import type { Metadata } from "next";
import { Sora, Quicksand } from "next/font/google";
import "./globals.css";

// Pull in public fonts from Google
const sora = Sora(
  {
    variable: '--sora-font',
    subsets: ['latin']
  }
);

const quicksand = Quicksand(
  {
    variable: '--quicksand-font',
    subsets: ['latin']
  }
);

export const metadata: Metadata = {
  title: "Mitchell Hornsby",
  description: "Portfolio app for Mitchell Hornsby",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`
        ${sora.className} 
        ${quicksand.className}
        bg-gradient-to-l 
        from-background 
        to-background 
        via-background_gradient
        `}>{children}</body>
    </html>
  );
}
