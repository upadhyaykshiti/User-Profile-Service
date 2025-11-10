
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";

jest.mock("axios", () => {
  const mockAxios = {
    post: jest.fn(),
    get: jest.fn(),
    create: jest.fn(function () {
      return mockAxios;
    }),
  };
  return mockAxios;
});

import Register from "../components/Register";

describe("RegisterForm", () => {
  test("registers successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "User registered" },
    });

    render(<Register onSwitch={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/register"),
        expect.any(Object)
      )
    );
  });
});
