import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";
import { PizzaPageComponent } from "@/components/PizzaPageComponent";
import { ProductPageComponent } from "@/components/ProductPageComponent";
import { Container } from "@/components/Container";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const product = await prisma.products.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="py-[40px]">
      {product.categoryId === 1 ? (
        <PizzaPageComponent product={product} />
      ) : (
        <ProductPageComponent product={product} />
      )}
    </Container>
  );
}
