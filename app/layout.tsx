import "./globals.css";
import { Toaster } from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["cyrillic"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/Logo.png" />
      </head>
      <body className={montserrat.className}>
        <NextTopLoader showSpinner={false} color="#FF0000" />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
