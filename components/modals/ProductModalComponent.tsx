"use client";
import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface ProductModalProps {
  product: any;
}

export const ProductModalComponent: React.FC<ProductModalProps> = ({
  product,
}) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className="flex max-w-[960px] min-h-[400px] bg-white flex-col md:flex-row overflow-y-auto">
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex items-center w-full max-w-[400px]">
          <img
            className="w-full h-auto"
            src={product.img}
            alt={product.title}
          />
        </div>
        <div className="bg-[rgb(240,240,240)] flex-grow p-4 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
            <p className="mb-4">{product.desc}</p>
          </div>
          <Button className="w-full" variant="destructive">
            + Добавить за {product.items[0].price} Р
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
