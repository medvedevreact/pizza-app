"use client";
import React, { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { fetchProducts } from "@/services/products";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

interface SearchInputProps {
  className?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const router = useRouter();

  const debouncedFetchData = useCallback(
    debounce(async (inputValue) => {
      const data = await fetchProducts(inputValue);
      setSearchedProducts(data);
    }, 500),
    [setSearchedProducts]
  );

  useEffect(() => {
    if (inputValue) {
      debouncedFetchData(inputValue);
    } else {
      setSearchedProducts([]);
    }
  }, [inputValue, debouncedFetchData]);

  return (
    <div
      className={cn(
        "w-full max-w-[600px] relative lg:block hidden relative z-20",
        className
      )}
    >
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-30 ">
        <Search className="h-4 w-4 text-gray-400 " />{" "}
      </div>
      <input
        type="text"
        className="h-[40px] bg-gray-100 pl-10 pr-4 w-full rounded-md outline-none z-20 relative"
        placeholder="Введите название..."
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && searchedProducts?.length > 0 && (
        <div>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-10 "></div>
          <ul className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-md shadow-md z-20">
            {searchedProducts.map((el) => (
              <div
                onClick={() => {
                  router.push(`/product/${el.id}`);
                  setSearchedProducts([]);
                  setInputValue("");
                }}
                key={el.id}
                className="px-4 py-2 hover:bg-gray-100 flex items-center gap-4 cursor-pointer rounded-sm"
              >
                <img className="w-[40px]" src={el.img} alt="" />
                <p>{el.title}</p>
              </div>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
