import Button from "@/components/ui/Button";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("should render with the correct label", () => {
    render(<Button label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
