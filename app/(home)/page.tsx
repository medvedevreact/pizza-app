import { Categories } from "@/components/Categories";
import { Container } from "@/components/Container";
import { Products } from "@/components/Products";

import { prisma } from "@/prisma/prisma-client";

export const metadata = {
  title: "EL PIZZA | Главная страница",
  description: "Главная страница, пиццерия EL PIZZA, Королёв",
};

export default async function Home() {
  const pizzas = await prisma.products.findMany({
    where: {
      categoryId: 1,
    },
    include: {
      items: true,
    },
  });
  const snacks = await prisma.products.findMany({
    where: {
      categoryId: 2,
    },
    include: {
      items: true,
    },
  });
  const drinks = await prisma.products.findMany({
    where: {
      categoryId: 3,
    },
    include: {
      items: true,
    },
  });
  const categories = await prisma.categories.findMany();

  return (
    <div className="flex flex-col ">
      <Categories categories={categories} className="sticky top-0 z-10" />

      <Container>
        <Products products={pizzas} />
        <Products products={snacks} />
        <Products products={drinks} />
      </Container>
    </div>
  );
}
