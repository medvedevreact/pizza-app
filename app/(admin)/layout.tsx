import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Header
        hasCart={false}
        hasProfile={false}
        hasSearch={false}
        className="border-gray-200"
      />

      <Container>{children}</Container>
      <Footer />
    </main>
  );
}
