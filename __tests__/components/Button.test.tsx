import Button from "@/components/ui/Button";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  it("should render with the correct label", () => {
    render(<Button label="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("should be disabled", () => {
    render(<Button disabled={true} label="Disabled Button" />);
    expect(screen.getByText("Disabled Button")).toBeDisabled();
  });

  it("should be of type submit", () => {
    render(<Button label="Submit Button" type="submit" />);
    expect(screen.getByText("Submit Button")).toHaveAttribute("type", "submit");
  });

  it("should call onClick when button is pressed", async () => {
    const onClickFn = jest.fn();
    render(<Button label="Click Me" onClick={onClickFn} />);

    const button = screen.getByText("Click Me");
    await userEvent.click(button);
    expect(onClickFn).toHaveBeenCalled();
  });

  it("should not call onClick if button is disabled", async () => {
    const onClickFn = jest.fn();
    render(<Button label="Click Me" onClick={onClickFn} disabled={true} />);

    const button = screen.getByText("Click Me");
    await fireEvent.click(button);

    expect(onClickFn).not.toHaveBeenCalled();
  });

  it("should have correct class for primary variant", () => {
    render(<Button label="Primary" variant="primary" />);
    const button = screen.getByText("Primary");
    expect(button).toHaveClass("bg-blue-500");
  });
});
