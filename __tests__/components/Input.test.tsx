import Input from "@/components/ui/Input";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";

describe("Input component", () => {
  it("should render", () => {
    render(<Input id="test" label="test" type="text" />);
    expect(screen.getByLabelText("test")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should be disabled", () => {
    render(<Input id="test" label="test" type="text" disabled={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
  });

  it("should have minLength and maxLength attributes", () => {
    render(
      <Input id="test" label="test" type="text" minLength={3} maxLength={10} />
    );
    expect(screen.getByRole("textbox")).toHaveAttribute("minLength", "3");
    expect(screen.getByRole("textbox")).toHaveAttribute("maxLength", "10");
  });

  it("should have minValue and maxValue attributes", () => {
    render(
      <Input id="test" label="test" type="number" minValue={3} maxValue={10} />
    );
    expect(screen.getByRole("spinbutton")).toHaveAttribute("min", "3");
    expect(screen.getByRole("spinbutton")).toHaveAttribute("max", "10");
  });

  it("should be required", () => {
    render(<Input label="test" id="test" required={true} type="text" />);
    expect(screen.getByRole("textbox")).toHaveAttribute("required");
  });
});
