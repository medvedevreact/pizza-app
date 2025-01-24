"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useUserStore } from "@/store/user";
import { auth } from "@/configs/firebase.config";
import toast from "react-hot-toast";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  className,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setUser } = useUserStore((state) => state);

  const toggleForm = () => setIsLogin(!isLogin);

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают.");
      setIsLoading(false);
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        sendEmailVerification(user)
          .then(() => {
            setUser(user);
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            onClose();
            toast.success(
              "Вы успешно зарегистрировались. Пожалуйста, проверьте свою почту для верификации."
            );
          })
          .catch((error) => {
            toast.error("Ошибка при отправке письма для верификации.");
          })
          .finally(() => setIsLoading(false));
      })
      .catch((error) => {
        toast.error("Ошибка при регистрации.");
        setIsLoading(false);
      });
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setUser(user);
        setEmail("");
        setPassword("");
        onClose();
        toast.success("Вы успешно вошли.");
      })
      .catch((error) => {
        toast.error("Ошибка при входе.");
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50",
        className
      )}
    >
      <div className="bg-white p-8 z-20 rounded-lg shadow-lg w-96 relative">
        <button
          className="absolute top-3 right-3 text-red-500"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-2xl mb-4">{isLogin ? "Вход" : "Регистрация"}</h2>
        <form onSubmit={isLogin ? handleSignIn : handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Пароль</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700">Подтвердите пароль</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <Button
              type="submit"
              disabled={isLoading}
              className={`flex items-center justify-center ${
                isLogin ? "w-[120px]" : "w-[176px]"
              }`}
            >
              {isLoading ? (
                <div className="border-4 border-t-4 border-gray-700 border-t-white rounded-full w-6 h-6 animate-spin"></div>
              ) : isLogin ? (
                "Войти"
              ) : (
                "Зарегистрироваться"
              )}
            </Button>

            <button
              type="button"
              className="text-blue-500"
              onClick={toggleForm}
            >
              {isLogin ? "Зарегистрироваться" : "Войти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
