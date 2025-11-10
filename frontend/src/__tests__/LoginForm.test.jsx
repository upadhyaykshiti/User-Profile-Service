
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

import Login from "../components/Login";

describe("LoginForm", () => {
  test("logs in successfully", async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: "Logged in successfully", token: "abc123" },
    });

    render(<Login onLogin={() => {}} onSwitch={() => {}} />);
    fireEvent.change(screen.getByPlaceholderText(/enter your email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter your password/i), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() =>
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
        expect.any(Object)
      )
    );
  });
});
