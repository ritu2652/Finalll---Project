import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Page from "@app/contact/page";
import "@testing-library/jest-dom";

describe("Page Component", () => {
  it("renders the form with all fields", () => {
    render(<Page />);

    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contact Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email ID/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  it("shows validation errors for empty fields on form submission", async () => {
    render(<Page />);

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Age is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Address is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  it("shows specific validation errors for invalid inputs", async () => {
    render(<Page />);

    fireEvent.input(screen.getByLabelText(/Age/i), {
      target: { value: "-1" },
    });
    fireEvent.input(screen.getByLabelText(/Contact Number/i), {
      target: { value: "123" },
    });
    fireEvent.input(screen.getByLabelText(/Email ID/i), {
      target: { value: "invalid-email" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(screen.getByText(/Age must be a positive number/i)).toBeInTheDocument();
      expect(screen.getByText(/Contact number must be 10 digits/i)).toBeInTheDocument();
      expect(screen.getByText(/Invalid email format/i)).toBeInTheDocument();
    });
  });

  it("submits the form successfully when all fields are valid", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Page />);

    fireEvent.input(screen.getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByLabelText(/Age/i), {
      target: { value: "30" },
    });
    fireEvent.input(screen.getByLabelText(/Contact Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.input(screen.getByLabelText(/Address/i), {
      target: { value: "123 Main Street" },
    });
    fireEvent.input(screen.getByLabelText(/Email ID/i), {
      target: { value: "john.doe@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Form submitted successfully!");
    });

    alertMock.mockRestore();
  });
});
