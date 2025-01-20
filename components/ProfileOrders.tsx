import { getOrders } from "@/app/actions";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

export const ProfileOrders = ({ userId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getOrders(userId);
      setOrders(data);
    };

    fetchOrders();
  }, [userId]);

  const reversedOrders = orders.slice().reverse();

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-semibold mb-4">Мои заказы:</h1>
      {orders.length === 0 ? (
        <p className="text-md font-semibold ">
          Ваша история заказов пока пуста. Но всегда <br /> есть время начать.
        </p>
      ) : (
        <Accordion type="single" collapsible className="space-y-4 py-[40px]">
          {reversedOrders.map((order) => {
            const parsedItems = JSON.parse(order.items);

            return (
              <AccordionItem
                key={order.id}
                value={String(order.id)}
                className="border-none"
              >
                <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-semibold text-xl">Заказ #{order.id}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 bg-gray-200 rounded-full px-4 py-2">
                      {order.paymentMethod === "card" ? "Карта" : "Наличные"}
                    </p>
                  </div>
                  <AccordionTrigger className="ml-2" />
                </div>
                <AccordionContent className="bg-gray-50 rounded-lg shadow-inner p-4 mt-2">
                  {parsedItems.length > 0 ? (
                    <>
                      {parsedItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-col items-center justify-between bg-white border p-4 rounded-lg shadow-sm relative mb-4"
                        >
                          <div className="flex items-center space-x-4 w-full mb-3">
                            <img
                              src={item.img}
                              alt={item.title}
                              className="w-16 h-16 rounded-full"
                            />
                            <div>
                              <h3 className="text-base font-semibold sm:text-lg">
                                {item.title}
                              </h3>
                              <p className="text-xs text-gray-600 sm:text-sm">
                                {item.pizzaSize} см, {item.pizzaType}
                              </p>
                              {item?.ingredients.length > 0 && (
                                <p className="text-xs text-gray-600 sm:text-sm">
                                  +{" "}
                                  {item.ingredients
                                    .map((ing) => ing.name)
                                    .join(", ")}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="h-[1px] w-full bg-gray-200 mb-3"></div>
                          <div className="flex items-center space-x-4 justify-between w-full">
                            <p className="text-sm font-semibold sm:text-md">
                              {item.price} ₽
                            </p>
                            <div className="flex items-center space-x-2">
                              <p className="text-sm">{item.quantity} шт.</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="font-semibold text-right mt-4">
                        Итого: {order.totalAmount} ₽
                      </p>
                      {order.comment && (
                        <p className="text-sm text-gray-500">
                          Комментарий: {order.comment}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Нет товаров в этом заказе.
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};
