"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import Image from "next/image";
import Logo from "../public/img/Logo.png";
import { Button } from "./ui/button";
import { SearchInput } from "./SearchInput";
import { AuthModal } from "./modals/AuthModal";
import { useUserStore } from "@/store/user";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/configs/firebase.config";
import { ShoppingCart, User } from "lucide-react";
import { Cart } from "./Cart";
import Link from "next/link";

interface HeaderProps {
  className?: string;
  hasSearch?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ className, hasSearch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleSignOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUser(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  };

  return (
    <header className={cn(`h-[150px]`, className)}>
      <Container
        className={`flex items-center justify-between py-8 ${
          hasSearch === false ? "border-b border-gray-300" : ""
        }`}
      >
        <Link href={"/"}>
          <div className="flex items-center mr-4 cursor-pointer">
            <Image src={Logo} alt="Логотип" width={70} height={70} />
            <h1 className="md:text-3xl text-xl ">El PIZZA</h1>
          </div>
        </Link>
        {hasSearch && <SearchInput />}

        {isLoading ? (
          <div className="flex items-center gap-1 cursor-pointer">
            <Button className=" w-[100px]" variant="destructive" disabled>
              Загрузка...
            </Button>
            <Cart>
              <ShoppingCart className="text-orange-500" />
            </Cart>
          </div>
        ) : user ? (
          <div className="flex items-center gap-3 cursor-pointer">
            <Link href="/profile">
              <User className="text-orange-500 cursor-pointer" />
            </Link>
            <Button
              className=" w-[100px]"
              variant="destructive"
              onClick={handleSignOut}
            >
              Выйти
            </Button>
            <Cart>
              <ShoppingCart className="text-orange-500" />
            </Cart>
          </div>
        ) : (
          <div className="flex items-center gap-3 cursor-pointer">
            <Button
              className=" w-[100px]"
              variant="destructive"
              onClick={openModal}
            >
              Войти
            </Button>
            <Cart>
              <ShoppingCart className="text-orange-500" />
            </Cart>
          </div>
        )}
      </Container>
      {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={closeModal} />}
    </header>
  );
};
