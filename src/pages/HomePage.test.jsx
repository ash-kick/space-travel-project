import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import HomePage from "./HomePage";

describe("HomePage", () => {
     test("renders default (Home)", () => {
          render(<HomePage />);
          expect(screen.getByRole("heading", { level: 2, name: /home page/i })).toBeInTheDocument();
     });

     test("renders all 5 sections", () => {
          render(<HomePage />);
          const heading3s = screen.getAllByRole("heading", { level: 3 });
          expect(heading3s).toHaveLength(5);
     });
});
