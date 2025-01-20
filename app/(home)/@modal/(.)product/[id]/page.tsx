import { PizzaModalComponent } from "@/components/modals/PizzaModalComponent";
import { ProductModalComponent } from "@/components/modals/ProductModalComponent";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

export default async function ProductModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

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
    <>
      {product.categoryId === 1 ? (
        <PizzaModalComponent product={product} />
      ) : (
        <ProductModalComponent product={product} />
      )}
    </>
  );
}
