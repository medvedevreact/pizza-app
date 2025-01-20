import React from "react";
import { render, screen } from "@testing-library/react";
import { WhiteBlock } from "@/components/WhiteBlock";

describe("WhiteBlock", () => {
  it("Renders component", () => {
    render(<WhiteBlock>Content</WhiteBlock>);
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("Renders with title", () => {
    render(<WhiteBlock title="Test Title">Content</WhiteBlock>);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });
});
