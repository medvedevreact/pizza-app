import type { Metadata } from "next";
import { prisma } from "@/prisma/prisma-client";
import { PizzaModalComponent } from "@/components/modals/PizzaModalComponent";
import { ProductModalComponent } from "@/components/modals/ProductModalComponent";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const product = await prisma.products.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) {
    return {
      title: "Продукт не найден",
    };
  }

  return {
    title: `EL PIZZA | ${product.title}`,
  };
}

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
