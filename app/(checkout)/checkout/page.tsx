"use client";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckoutCart } from "@/components/CheckoutCart";
import { CheckoutPersonal } from "@/components/CheckoutPersonal";
import { CheckoutTotal } from "@/components/CheckoutTotal";
import { useCartStore } from "@/store/cart";
import { createOrder } from "@/app/actions";
import { useUserStore } from "@/store/user";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const schema = z.object({
  firstname: z.string().min(2, "Введите своё имя"),
  lastname: z.string().min(2, "Введите свою фамилию"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Неверный формат номера телефона"),
  comment: z
    .string()

    .optional(),
});

export default function Checkout() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      comment: "",
    },
  });

  const { totalPrice, cartItems, resetCart } = useCartStore((state) => state);
  const { user } = useUserStore((state) => state);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const router = useRouter();

  const handlePaymentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      await createOrder({
        userId: String(user?.uid),
        userEmail: user?.email,
        userPhone: data.phone,
        userFirstname: data.firstname,
        userLastname: data.lastname,
        comment: data?.comment || "",
        paymentMethod,
        items: JSON.stringify(cartItems),
        totalAmount: totalPrice,
      });
      toast.success("Вы успешно оформили заказ.");
      router.push("/profile");
      setTimeout(() => {
        form.reset();
        resetCart();
      }, 500);
    } catch (err) {
      toast.error("При оформлении заказа произошла ошибка");
      console.error("Error creating order:", err);
    }
  };
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="py-10">
          <h1 className="text-3xl font-semibold mb-10">Оформление заказа</h1>
          <div className="flex w-full gap-10 flex-col lg:flex-row">
            <div className="flex-grow">
              <CheckoutCart />
              <CheckoutPersonal />
            </div>
            <CheckoutTotal
              totalPrice={totalPrice}
              paymentMethod={paymentMethod}
              handlePaymentChange={handlePaymentChange}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
