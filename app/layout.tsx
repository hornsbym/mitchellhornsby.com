import type { Metadata } from "next";
import { Sora, Quicksand } from "next/font/google";
import "./globals.css";
import NavDrawer from "./components/layouts/NavDrawer/NavDrawer";

const sora = Sora(
  {
    variable: '--sora-font',
    subsets: ['latin'],
  }
);

const quicksand = Quicksand(
  {
    variable: '--quicksand-font',
    subsets: ['latin'],
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
        ${sora.variable} 
        ${quicksand.variable}
        min-h-screen
      `}>
        <NavDrawer>
          {children}
        </NavDrawer>
      </body>
    </html>
  );
}
