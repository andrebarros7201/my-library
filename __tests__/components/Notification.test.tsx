import { fireEvent, render, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Notification from "@/components/ui/Notification";
import notificationSlice from "@/redux/slices/notificationSlice";
import { ReactElement } from "react";
import userEvent from "@testing-library/user-event";
import { exitCode } from "process";

describe("Notification component", () => {
  function renderWithRedux(
    ui: ReactElement,
    {
      initialState = {},
      store = configureStore({
        reducer: { notification: notificationSlice },
        preloadedState: initialState,
      }),
    } = {}
  ) {
    return render(<Provider store={store}>{ui}</Provider>);
  }
  it("should not be visible", () => {
    const { container } = renderWithRedux(<Notification />, {
      initialState: { notification: { isVisible: null, notification: null } },
    });

    expect(container).toBeEmptyDOMElement();
  });

  it("should render notification if visible", () => {
    renderWithRedux(<Notification />, {
      initialState: {
        notification: {
          isVisible: true,
          notification: { type: "success", message: "I'm visible!" },
        },
      },
    });
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("should close the notification", async () => {
    const user = userEvent.setup();
    const { container } = renderWithRedux(<Notification />, {
      initialState: {
        notification: {
          isVisible: true,
          notification: { type: "success", message: "I'm visible!" },
        },
      },
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "X" })); // User clicks the close button

    expect(container).toBeEmptyDOMElement();
  });

  it("should return a success notification", () => {
    renderWithRedux(<Notification />, {
      initialState: {
        notification: {
          isVisible: true,
          notification: {
            type: "success",
            message: "Success",
          },
        },
      },
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByTestId("notification")).toHaveClass("bg-green-500");
    expect(screen.getByTestId("notification")).not.toHaveClass("bg-red-500");
    expect(screen.getByRole("heading", { name: "success" }));
    expect(screen.getByText("Success"));
  });

  it("should return an error notification", () => {
    renderWithRedux(<Notification />, {
      initialState: {
        notification: {
          isVisible: true,
          notification: {
            type: "error",
            message: "Error",
          },
        },
      },
    });

    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByTestId("notification")).toHaveClass("bg-red-500");
    expect(screen.getByTestId("notification")).not.toHaveClass("bg-green-500");
    expect(screen.getByRole("heading", { name: "error" }));
    expect(screen.getByText("Error"));
  });
});
