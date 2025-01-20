import React from "react";
import { useFormContext } from "react-hook-form";
import { WhiteBlock } from "./WhiteBlock";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export const CheckoutPersonal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <WhiteBlock title="2. Персональные данные">
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <div>
          <Label htmlFor="firstname">Имя</Label>
          <Input
            className="mb-2"
            id="firstname"
            placeholder="Введите ваше имя..."
            {...register("firstname")}
          />
          {errors.firstname && (
            <span className="text-red-600">
              {errors.firstname.message as string}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="lastname">Фамилия</Label>
          <Input
            className="mb-2"
            id="lastname"
            placeholder="Введите вашу фамилию..."
            {...register("lastname")}
          />
          {errors.lastname && (
            <span className="text-red-600">
              {errors.lastname.message as string}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Телефон</Label>
          <Input
            className="mb-2"
            id="phone"
            placeholder="Введите ваш телефон..."
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-red-600 ">
              {errors.phone.message as string}
            </span>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Комментарий к заказу (опционально)</Label>
          <Textarea
            placeholder="Здесь вы можете добавить комментарий к заказу..."
            className="mb-2 min-h-[200px]"
            {...register("comment")}
          />
          {errors.comment && (
            <span className="text-red-600 ">
              {errors.comment.message as string}
            </span>
          )}
        </div>
      </div>
    </WhiteBlock>
  );
};
