import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function HomeLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen flex flex-col">
      {" "}
      <Header />
      <div className="flex-grow">{children}</div>
      {modal}
      <Footer />
    </main>
  );
}
