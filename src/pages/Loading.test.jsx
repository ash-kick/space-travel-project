import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import Loading from "./Loading";

describe("Loading", () => {
     test("renders loading text with elipsis", () => {
          render(<Loading />);
          expect(screen.getByText(/loading\s*\.\.\./i)).toBeInTheDocument();
     });
});
