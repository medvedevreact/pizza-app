"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { ProfileOrders } from "@/components/ProfileOrders";
import { useUserStore } from "@/store/user";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    const redirectTimeout = setTimeout(() => {
      if (!user) {
        router.push("/");
      }
    }, 1000);

    return () => {
      clearTimeout(loaderTimeout);
      clearTimeout(redirectTimeout);
    };
  }, [user, router]);

  if (loading || !user) {
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
      <ProfileOrders userId={user?.uid} />
    </Container>
  );
}
