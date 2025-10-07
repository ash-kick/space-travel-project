import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";

function Hello() {
     return <h1>Hello, World!</h1>;
}

test("renders greeting", () => {
     render(<Hello />);
     expect(screen.getByText(/hello, world!/i)).toBeInTheDocument();
});
