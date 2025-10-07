import { render, screen } from "@testing-library/react";
import { test, expect, describe } from "vitest";
import NotFound from "./NotFound";
import { Link, MemoryRouter } from "react-router-dom";

describe("Page Not Found", () => {
     test("Renders page not found message", () => {
          render(
               <MemoryRouter>
                    <NotFound />
               </MemoryRouter>
          );
          expect(screen.getByText(/page\s*not\s*found/i)).toBeInTheDocument();
     });

     test("Homepage redirect link renders on page", () => {
          render(
               <MemoryRouter>
                    <NotFound />
               </MemoryRouter>
          );
          const homePageLink = screen.getByRole("link", { name: /homepage/i });
          expect(homePageLink).toBeInTheDocument;
          expect(homePageLink).toHaveAttribute("href", "/");
     });
});
