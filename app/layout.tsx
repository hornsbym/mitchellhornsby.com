import type { Metadata } from "next";
import { Sora, Quicksand } from "next/font/google";
import "./globals.css";
import NavDrawer from "./components/layouts/NavDrawer/NavDrawer";
import Script from "next/script";

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
  icons: {

  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='sm:!scroll-smooth'>
      <head>
        <Script id="gtag-0" strategy="lazyOnload" async src="https://www.googletagmanager.com/gtag/js?id=G-MFQP93LYRQ"></Script>
        <Script id="gtag-0" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-MFQP93LYRQ');
          `}
        </Script>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨🏻‍💻</text></svg>" />
      </head>
      <body className={`
        ${sora.variable} 
        ${quicksand.variable}
        min-h-screen
      `}>
        <NavDrawer drawerWidth={25}>
          {children}
        </NavDrawer>
      </body>
    </html>
  );
}
