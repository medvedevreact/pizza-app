import React from "react";
import { render, screen } from "@testing-library/react";
import { ProductPageComponent } from "@/components/ProductPageComponent";

const product = {
  id: 6,
  title: "Картофель фри",
  desc: "Запеченная в печи картошечка — привычный вкус и мало масла. В составе пряные специи",
  img: "https://media.dodostatic.net/image/r:584x584/11eed646b7ac9c38ba256320dd31c4d5.avif",
  items: [
    {
      id: 24,
      productId: 6,
      price: 199,
      pizzaSize: null,
      created_at: new Date(),
    },
  ],
};

describe("ProductPageComponent", () => {
  it("Renders Component", () => {
    render(<ProductPageComponent product={product} />);

    expect(screen.getByText("Картофель фри")).toBeInTheDocument();

    expect(
      screen.getByText(
        "Запеченная в печи картошечка — привычный вкус и мало масла. В составе пряные специи"
      )
    ).toBeInTheDocument();

    expect(screen.getByText("+ Добавить за 199 Р")).toBeInTheDocument();

    const imgElement = screen.getByAltText("Картофель фри");
    expect(imgElement).toHaveAttribute("src", product.img);
  });
});
