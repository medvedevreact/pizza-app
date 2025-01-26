import React from "react";
import { render } from "@testing-library/react";
import { Container } from "@/components/Container";

describe("Container", () => {
  it("Renders component", () => {
    const { container } = render(<Container>Test Content</Container>);
    const containerElement = container.querySelector("div");
    expect(containerElement).toMatchSnapshot();
  });
});
