import { Container } from "@/components/Container";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
  title: "EL PIZZA | Оформление заказа",
  description: "Оформление заказа, пиццерия EL PIZZA, Королёв",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Header hasSearch={false} className="border-gray-200" />

      <Container>{children}</Container>
      <Footer />
    </main>
  );
}
