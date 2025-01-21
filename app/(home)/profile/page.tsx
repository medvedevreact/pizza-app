"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { ProfileOrders } from "@/components/ProfileOrders";
import { useUserStore } from "@/store/user";
import { getOrders } from "@/app/actions";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      if (!user) {
        router.push("/");
      }
    }, 2000);

    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [user, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders(user?.uid);
        setOrders(data);
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user?.uid) {
      fetchOrders();
    }
  }, [user]);

  if (loading || !user || ordersLoading) {
    return (
      <Container>
        <div className="flex flex-col items-center justify-center h-[600px]">
          <div className="border-4 border-t-4 border-gray-200 border-t-orange-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4">Загрузка...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <ProfileOrders orders={orders} />
    </Container>
  );
}
