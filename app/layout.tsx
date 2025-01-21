import "./globals.css";
import { Toaster } from "react-hot-toast";

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
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
