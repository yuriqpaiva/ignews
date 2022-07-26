import { render, screen } from "@testing-library/react";
import { Header } from ".";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

jest.mock("next-auth/react", () => ({
  useSession() {
    return {
      data: null,
      status: "unauthenticated",
    };
  },
}));

describe("Header component", () => {
  it("should renders correctly", () => {
    render(<Header />);

    screen.logTestingPlaygroundURL();

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Posts")).toBeInTheDocument();
  });
});
