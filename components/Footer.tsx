import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer
      className={cn(
        "bg-[rgb(228,228,228)] text-gray-800 py-6 text-center",
        className
      )}
    >
      <div className="social-icons flex justify-center mb-4">
        <a href="#" className="mx-4 hover:text-orange-400">
          Facebook
        </a>
        <a href="#" className="mx-4 hover:text-orange-400">
          Instagram
        </a>
        <a href="#" className="mx-4 hover:text-orange-400">
          Twitter
        </a>
      </div>
      <p className="mb-2">&copy; 2025 El Pizza. Все права защищены.</p>
      <p>
        Контакты:{" "}
        <a href="mailto:info@elpizza.com" className="hover:text-orange-400">
          info@elpizza.com
        </a>{" "}
        | Телефон: +123 456 7890
      </p>
    </footer>
  );
};
