import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "@/components/Footer";

describe("Footer", () => {
  it("Renders component", () => {
    const { container } = render(<Footer />);
    const footerElement = container.querySelector("footer");
    expect(footerElement).toMatchSnapshot();
  });
});
