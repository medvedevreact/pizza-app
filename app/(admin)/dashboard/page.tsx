"use client";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { getAllOrders } from "@/app/actions";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { useUserStore } from "@/store/user";
import { adminList } from "@/constants/adminList";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [topUsers, setTopUsers] = useState({});
  const router = useRouter();

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const redirectTimeout = setTimeout(() => {
      if (!adminList.includes(String(user?.email))) {
        router.push("/");
      }
    }, 750);

    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user?.uid) {
      fetchOrders();
      const intervalId = setInterval(fetchOrders, 60000);

      return () => clearInterval(intervalId);
    }
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate >= oneMonthAgo;
      });

      const userPurchaseCount = filteredOrders.reduce((acc, order) => {
        if (acc[order.userEmail]) {
          acc[order.userEmail]++;
        } else {
          acc[order.userEmail] = 1;
        }
        return acc;
      }, {});

      setTopUsers(userPurchaseCount);
    }
  }, [orders]);

  if (loading || !user || ordersLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-[705px]">
          <div className="border-4 border-t-4 border-gray-200 border-t-orange-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4">Загрузка...</p>
        </div>
      </Container>
    );
  }

  const topThreeUsers = Object.entries(topUsers)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="w-full py-[40px] lg:flex-row flex-col flex gap-[60px]">
      <div className="flex-grow">
        <h1 className="text-2xl font-semibold mb-4">Список заказов:</h1>
        {orders.length === 0 ? (
          <p className="text-md font-semibold">Список заказов пока пуст.</p>
        ) : (
          <div className="overflow-y-auto max-h-[60vh]">
            <Accordion
              type="single"
              collapsible
              className="space-y-4 px-[10px] py-[10px]"
            >
              {orders.map((order) => {
                const parsedItems = JSON.parse(order.items);

                return (
                  <AccordionItem
                    key={order.id}
                    value={String(order.id)}
                    className="border-none"
                  >
                    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-semibold text-xl">
                          Заказ <br className="md:hidden block" />#{order.id}
                        </h3>
                        <p className="text-sm text-gray-500 sm:block">
                          {new Date(order.created_at).toLocaleDateString()},{" "}
                          <br className="md:hidden block" />
                          {new Date(order.created_at).toLocaleTimeString()}
                        </p>
                        <p className="text-sm text-gray-500 bg-gray-200 rounded-full px-4 py-2">
                          {order.paymentMethod === "card"
                            ? "Карта"
                            : "Наличные"}
                        </p>
                      </div>
                      <AccordionTrigger className="ml-2" />
                    </div>
                    <AccordionContent className="bg-gray-50 rounded-lg shadow-inner p-4 mt-2">
                      <div className="mb-4">
                        <p className="text-sm text-gray-600">
                          <strong>Клиент:</strong> {order.userFirstname}{" "}
                          {order.userLastname}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Email:</strong> {order.userEmail}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Телефон:</strong> {order.userPhone}
                        </p>
                      </div>
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
                                    {item.categoryId === 1
                                      ? `${item.pizzaSize} см, ${item.pizzaType}`
                                      : `${item.desc}`}
                                  </p>
                                  {item?.ingredients?.length > 0 && (
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
                            <p className="text-sm text-gray-500 mt-2">
                              <strong>Комментарий:</strong> {order.comment}
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
          </div>
        )}
      </div>

      <div className="lg:w-[400px] h-full w-full">
        <h2 className="text-2xl font-semibold  mb-4">
          Топ пользователи по количеству заказов за последний месяц:
        </h2>
        <Table className="bg-white rounded-md">
          <TableCaption>*Показываются три самых активных клиента</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Количество заказов</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topThreeUsers.map(([email, count], index) => (
              <TableRow key={index}>
                <TableCell className="cursor-pointer">{email}</TableCell>
                <TableCell className="cursor-pointer">{count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
